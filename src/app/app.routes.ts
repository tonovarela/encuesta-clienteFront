import { Routes } from '@angular/router';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';

export const routes: Routes = [
    { path: 'encuesta/:identificador', component: EncuestaComponent },
    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: 'notfound' }];
