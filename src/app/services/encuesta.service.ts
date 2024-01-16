import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { RegistroEncuesta } from '../interfaces/registroEncuesta';
import { ResponseReferencia } from '../interfaces/responseReferencia';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class EncuestaService {
  http = inject(HttpClient);
  mensajeError:string="";
  readonly url = environment.URL_ROOT;

  constructor() { }


  registrar(registroEncuesta: RegistroEncuesta) {
    return this.http.post<RegistroEncuesta>(`${this.url}/encuesta`, registroEncuesta);
  }

  porReferencia(identificador: string) {
    return this.http.get<ResponseReferencia>(`${this.url}/encuesta/${identificador}`);
  }

}
