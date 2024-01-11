import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RatingModule, RatingRateEvent } from 'primeng/rating';
interface EtiquetaView {
  etiqueta: string;
  sugerencia: string;
}

@Component({
  selector: 'app-encuesta',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RatingModule
  ],
  templateUrl: './encuesta.component.html',
  styleUrl: './encuesta.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EncuestaComponent {
  colorStar = { background: 'yellow', width: '100px', height: '100px' };
  etiquetas: EtiquetaView[] = [{ etiqueta: 'DECEPCIONANTE ', sugerencia: "¿Qué SALIO MAL?" },
  { etiqueta: 'BASTANTE MAL. ', sugerencia: "¿Qué SALIO MAL?" },
  { etiqueta: 'REGULAR.', sugerencia: "¿Qué SALIO MAL?" },
  { etiqueta: 'BASTANTE BIEN.', sugerencia: "¿Qué SE PUEDE MEJORAR?" },
  { etiqueta: 'PERFECTO', sugerencia: "" }];
  etiquetaView: EtiquetaView | undefined = undefined;
  formGroup = new FormGroup({
    calificacion: new FormControl(0),

  });

  onRate(event: RatingRateEvent) {
    this.etiquetaView = this.etiquetas[event.value - 1];
    console.log(this.etiquetaView);
  }
}
