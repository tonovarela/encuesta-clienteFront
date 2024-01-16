import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResponseRespuestas } from '../interfaces/responseRespuestas';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
   http = inject(HttpClient);
   readonly url = environment.URL_ROOT;
  constructor() { }

  listar(estrellas:number){
    return this.http.get<ResponseRespuestas>(`${this.url}/respuesta/${estrellas}`);
  }

}
