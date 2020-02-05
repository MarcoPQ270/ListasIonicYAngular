import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {

  lista: Lista[] = [];

  constructor() {

    // console.log('Servicio Iniciado');
    // const lista1 = new Lista('Recolectar gemas del infinito');
    // const lista2 = new Lista('Heroes a desaparecer');
    // this.lista.push(lista1, lista2)
    // console.log(lista1, lista2);

    this.CargarStorage();
   }
   CrearLista(Titulo: string) {
    const lista = new Lista(Titulo);
    this.lista.push(lista);
    this.GuardaStorage();

    return lista.id;
   }

   ObtenerLista(id: string | number) {
      id = Number(id);
      return this.lista.find(listaData => listaData.id === id);
   }
// Funcion para guardar la informacion en el local storage
   GuardaStorage() {
     // invocamos la porpiedad local storage y l easignamos la data pero para que pueda ser usada por el Local Storage tenemos que definirlo con un JSON.stringify
    localStorage.setItem('data', JSON.stringify(this.lista));
   }
   // funcion para cargar el Storage
   CargarStorage() {
     // validamos que la data exista
     if (localStorage.getItem('data')) {
       // de ser asi el valor de la data lo asignamos a nuestra lista
          this.lista = JSON.parse(localStorage.getItem('data'));
     } else {
       // de no estar la data regresamos un arreglo vacio
          this.lista = [];
     }
   }

}
