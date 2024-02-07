import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { clientes, tipoTarjeta } from '../models/Clientes-model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private httpClient: HttpClient) { }
  //clientes
getClientes(): Observable<clientes[]>{

  return this.httpClient.get<clientes[]>('http://localhost:8080/API/clientes/list').pipe(map(res => res ));
  
}
saveClientes(request: any): Observable<any>{

  return this.httpClient.post<any>('http://localhost:8080/API/clientes/save',request).pipe(map(res => res ));
  
}
updateClientes(request: any): Observable<any>{

  return this.httpClient.put<any>('http://localhost:8080/API/clientes/update',request).pipe(map(res => res ));
  
}
//tipo tarjeta
getTipoTarjeta(): Observable<tipoTarjeta[]>{

  return this.httpClient.get<tipoTarjeta[]>('http://localhost:8080/API/tipoTarjeta/list').pipe(map(res => res ));
  
}
saveTipoTarjeta(request: any): Observable<any>{

  return this.httpClient.post<any>('http://localhost:8080/API/tipoTarjeta/save',request).pipe(map(res => res ));
  
}
updateTipoTarjeta(request: any): Observable<any>{

  return this.httpClient.put<any>('http://localhost:8080/API/tipoTarjeta/update',request).pipe(map(res => res ));
  
}


}
