import { Injectable } from '@angular/core';
import { HttpClient  } from '@angular/common/http';

@Injectable()
export class ItemService {

  itensUrl = 'http://localhost:8080/itens';

  constructor(private http: HttpClient) { }

  listar(){
    return this.http.get<any[]>(this.itensUrl);
  }

  adicionar(item:any){
    return this.http.post(this.itensUrl, item);
  }

  editar(item:any, itemId){
    return this.http.put(this.itensUrl+"/"+itemId, item);
  }

  excluir(itemId){
    return this.http.delete(this.itensUrl+"/"+itemId);
  }

  buscar(itemId){
    return this.http.get<any[]>(this.itensUrl+"/"+itemId);
  }
}
