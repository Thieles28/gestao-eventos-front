import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {Evento} from '../model/evento';

@Injectable({
  providedIn: 'root',
})
export class EventoService {
  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) {
  }

  cadastrarEvento(evento: Evento): Observable<Evento> {
    return this.http.post<Evento>(`${this.baseUrl}/eventos`, evento);
  }

  listarEventos(): Observable<Array<Evento>> {
    return this.http.get<Array<Evento>>(`${this.baseUrl}/eventos`);
  }

  consultarEvento(id: Number): Observable<Evento> {
    return this.http.get<Evento>(`${this.baseUrl}/eventos/${id}`);
  }

  atualizarEvento(id: Number, evento: Evento): Observable<Evento> {
    return this.http.put<Evento>(`${this.baseUrl}/eventos/${id}`, evento);
  }

  removerEvento(id: Number): Observable<Evento> {
    return this.http.delete<Evento>(`${this.baseUrl}/eventos/${id}`);
  }
}
