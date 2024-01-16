import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, OnInit, inject } from '@angular/core';
import { EncuestaService } from '../../services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  standalone: true,
  imports: [
    CommonModule,
  ],
  templateUrl: './errorPage.component.html',
  styleUrl: './errorPage.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ErrorPageComponent implements OnInit {
  ngOnInit(): void {
    this.mensaje = this.encuestService.mensajeError;
    if (this.encuestService.mensajeError.length == 0) {
      this.router.navigateByUrl("notfound")

    }
  }
  mensaje = "";
  router = inject(Router);
  encuestService = inject(EncuestaService)

}
