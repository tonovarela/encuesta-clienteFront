import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-notfound',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>Recurso no encontrado</p>`,
  styleUrl: './notfound.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NotfoundComponent { }
