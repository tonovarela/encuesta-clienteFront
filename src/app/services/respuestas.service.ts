import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { ResponseRespuestas } from '../interfaces/responseRespuestas';

@Injectable({
  providedIn: 'root'
})
export class RespuestasService {
   http = inject(HttpClient);
   readonly url = 'http://localhost:3000';
  constructor() { }

  listar(estrellas:number){
    return this.http.get<ResponseRespuestas>(`${this.url}/respuestas/${estrellas}`);
  }

}
