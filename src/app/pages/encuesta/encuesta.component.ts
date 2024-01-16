import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule, RatingRateEvent } from 'primeng/rating';

import { Respuesta } from '../../interfaces/responseRespuestas';
import { ActivatedRoute, Router } from '@angular/router';

import { RespuestasService, EncuestaService } from '../../services';
import { RegistroEncuesta } from '../../interfaces/registroEncuesta';
import { firstValueFrom } from 'rxjs';



interface EtiquetaView {
  etiqueta: string;
  sugerencia: string;
}

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RatingModule],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css',
})
export class EncuestaComponent implements OnInit {
  ngOnInit(): void {
    this.validarEncuesta();
  }



  encuestaService = inject(EncuestaService);
  respuestasService = inject(RespuestasService);


  activateRoute = inject(ActivatedRoute);
  identificador: string = "";
  nombreTrabajo: string = "";
  esVisibleCajaComentarios = false;
  router = inject(Router);
  registroDatos: boolean = false;
  formBuilder = inject(FormBuilder);
  public respuestas: Respuesta[] = [];
  respuestasSeleccionadas: string[] = [];
  colorStar = { background: 'yellow', width: '100px', height: '100px' };
  etiquetas: EtiquetaView[] = [
    { etiqueta: 'DECEPCIONANTE ', sugerencia: "¿Qué SALIO MAL?" },
    { etiqueta: 'BASTANTE MAL. ', sugerencia: "¿Qué SALIO MAL?" },
    { etiqueta: 'REGULAR.', sugerencia: "¿Qué SALIO MAL?" },
    { etiqueta: 'BASTANTE BIEN.', sugerencia: "¿Qué SE PUEDE MEJORAR?" },
    { etiqueta: 'PERFECTO', sugerencia: "" }];

  etiquetaView: EtiquetaView | undefined = undefined;
  formGroup = new FormGroup({ calificacion: new FormControl('', [Validators.required]), comentarios: new FormControl('') });

  onRate(event: RatingRateEvent) {
    this.etiquetaView = this.etiquetas[event.value - 1];
    const estrellas = event.value;
    this.respuestasService.listar(estrellas).subscribe(response => {
      this.respuestas = response.respuestas;
      this.respuestasSeleccionadas = [];
    });
  }

  async validarEncuesta() {
    const parametros: any = await firstValueFrom(this.activateRoute.params);
    const identificador = parametros.identificador;
    if (identificador === undefined) {
      //Salir
      return;
    }
    firstValueFrom(this.encuestaService.porReferencia(identificador))
      .then(response => {
        const referencia = response.referencia;
        if (referencia.contesto === 1) {
          this.encuestaService.mensajeError = "Esta encuesta ya ha sido respondida";          
          this.router.navigate(['error']);
          
          return;
        }
        this.identificador = identificador;        
        this.nombreTrabajo = referencia.nombreTrabajo;
      })
      .catch(error => {
        this.encuestaService.mensajeError = error.error.message;        
        this.router.navigate(['error']);
        
      });

  }

  onChangeRespuesta(respuesta: Respuesta) {
    const valor = respuesta.id_respuesta.toString();
    if (this.respuestasSeleccionadas.includes(valor)) {
      this.respuestasSeleccionadas = this.respuestasSeleccionadas.filter((item) => item !== valor);
    } else {
      this.respuestasSeleccionadas.push(valor);
    }
  }

  registrarCalificacion() {
    const { calificacion, comentarios } = this.formGroup.value
    const registro: RegistroEncuesta = {
      comentarios: comentarios || '',
      estrella: Number(calificacion) || 1,
      respuestas: this.respuestasSeleccionadas,
      referencia: this.identificador
    };
    firstValueFrom(this.encuestaService.registrar(registro)).then(response => {
      console.log(response);
      this.registroDatos = true;
    }).catch(error => {
      this.encuestaService.mensajeError = error.error.mensaje;
      this.router.navigate(['error']);
      
    });





  }

}
