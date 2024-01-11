import { Routes } from '@angular/router';
import { EncuestaComponent } from '../pages/encuesta/encuesta.component';

export const routes: Routes = [{
    path: 'encuesta/:identificador',
    component: EncuestaComponent,
}, { path: '**', redirectTo: '/encuesta', pathMatch: 'full' }];
