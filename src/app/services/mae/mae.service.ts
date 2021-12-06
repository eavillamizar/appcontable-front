import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Mae } from 'src/models/mae.models';

@Injectable({
  providedIn: 'root',
})
export class MaeService {
  url='http://localhost:3000/api/maes';
  maes: Mae[] = []; // variable o lista donde se almacenan los Maes (Cuentas Maestras o el Contexto que estas trabajando).Array en memoria
  maeUpdated = new Subject<Mae[]>(); // variable = new Subject<tipo: arreglo de Post>()

  constructor(private router: Router, private http: HttpClient) {}

  addMae(mae: Mae) {
     this.http
      .post<{ message: string }>(this.url, mae)
      .subscribe((response) => {
        console.log(response);
        this.maes.push(mae); // agrega
        // Generar notificacion de actualizacion a los componentes suscritos al Subject, por medio del metodo .next()
        this.maeUpdated.next([...this.maes]); // copia_lista = [...nombreListaOriginal]
        this.router.navigate(['/']);
      });
  }

  getMaes() {
    this.http
      .get<any>(this.url)
      .pipe(map((maesData) => {
        return maesData.map(
          (mae: {
            _id: string;
            nombre: string;
            codigo: string;
          }) =>{
            return {
              id: mae._id,
              nombre: mae.nombre,
              codigo: mae.codigo,
            };
          }
        );
        })
      )
      .subscribe((response) => {    //Se ejecuta el subscribe (peticion) esperando una respuesta
      console.log(response); // Recibe la respuesta y da un mensaje
      this.maes = response;  //Para manejar en memoria de lo que se optiene de la peticion osea la lista ya transformada
      this.maeUpdated.next([...this.maes]); // Para realizar la actualizacion de la lista y generamos la notificacion de que la lista se actualizó
    });

  }
  /*getMaes() {
    this.http
      .get<any>(this.url)
      .pipe(
        map((maesData) => {
          return maesData.map(
            (mae: {
              _id: string;
              codigo: string;
              nombre: string;
            }) => {
              return {
                id: mae._id,
                codigo: mae.codigo,
                nombre: mae.nombre,
              };
            }
          );
        })
      )
      .subscribe((response) => {
        console.log(response);
        this.maes = response;
        this.maeUpdated.next([...this.maes]);
      });
  }*/

  deleteMae(id: string) {
    this.http.delete(`${this.url}/${id}`).subscribe((response) => {
      console.log(response);
      const maesFiltered = this.maes.filter((mae) => mae.id != id);  // De la lista maes filtreme todos los maes con _id diferente al id que llega arriba como entrada.
      this.maes = maesFiltered; // Generamos la nueva lista mae sin el elemento que eliminamos.
      this.maeUpdated.next([...this.maes]);  //Generamos la notificacion de que la lista se actualizó.
    });
  }

  updateMae(mae: Mae, id: string) {
    this.http.put(`${this.url}/${id}`, mae).subscribe((response) => {  //Se hace la peticion al backend "this.http.put(`${this.url}/${id}`, mae)" y se suscribe para que cuando exista una respuesta realice ciertas tareas.
      const newMaes = [...this.maes];  //se crea una copia de la lista (Mae) y se guarda en una constante.
      const oldMaeIndex = newMaes.findIndex((mae) => mae.id === id); // Buscaremos el indice de ese elemento en la lista que es el que estamos actualizando. llamamos a la copia que hicimos y utilizamos una funcion llamada findIndex, Esa funcion basada en una condicion, nos devuelve el indice de ese objeto.
      newMaes[oldMaeIndex] = mae;
      this.maeUpdated.next([...this.maes]); //Se genera la notificacion
      this.router.navigate(['/']);  // Redireccion hacia la ruta raiz.
    });
  }

  getMae(id:string) {
    return this.http.get<{_id:string, codigo:string, nombre:string}>(`${this.url}/${id}`);
  }

  getMaesUpdateListener(){
    return this.maeUpdated.asObservable();
  }

}
