import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RatingModule, RatingRateEvent } from 'primeng/rating';
import { RespuestasService } from '../../services/respuestas.service';
import { Respuesta } from '../../interfaces/responseRespuestas';
import { ActivatedRoute } from '@angular/router';
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
    this.activateRoute.params.subscribe(({identificador})=>{
      //Todo Validar el identificador
      this.identificador= identificador
    })


  }
  activateRoute = inject(ActivatedRoute);
  identificador :string="";
  esVisibleCajaComentarios=false;
  respuestasService = inject(RespuestasService);
  registroDatos :boolean =false;
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
  formGroup = new FormGroup({ calificacion: new FormControl('',[Validators.required]),comentarios:new FormControl('') });

  onRate(event: RatingRateEvent) {
    this.etiquetaView = this.etiquetas[event.value - 1];
    const estrellas = event.value;
    this.respuestasService.listar(estrellas).subscribe(response => {
      this.respuestas = response.respuestas;
      this.respuestasSeleccionadas = [];
    });


  }

  onChangeRespuesta(respuesta:Respuesta) {
    const valor = respuesta.id_respuesta.toString();
    if (this.respuestasSeleccionadas.includes(valor)) {
      this.respuestasSeleccionadas = this.respuestasSeleccionadas.filter((item) => item !== valor);
    } else {
      this.respuestasSeleccionadas.push(valor);
    }   
  }

  registrarCalificacion(){
    const registro = {...this.formGroup.value,respuestas:this.respuestasSeleccionadas,identificador:this.identificador};
    console.log(registro);
    this.registroDatos=true;

  }

}
