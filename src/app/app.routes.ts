import { Routes } from '@angular/router';
import { EncuestaComponent } from './pages/encuesta/encuesta.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { ErrorPageComponent } from './pages/errorPage/errorPage.component';

export const routes: Routes = [
    { path: 'encuesta/:identificador', component: EncuestaComponent },
    { path: 'notfound', component: NotfoundComponent },
    { path: 'error', component: ErrorPageComponent },
    { path: '**', redirectTo: 'notfound' }];
