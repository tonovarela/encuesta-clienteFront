import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<div class="card ">
  <div class="d-flex justify-content-center ">
      <h1>Recurso no encontrado</h1>
  </div>
</div>`,
  styleUrl: './notfound.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent { }
