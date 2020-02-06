import { Injectable } from '@angular/core';
import { Lista } from '../models/lista.model';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class DeseosService {
// se define una lista como un array vacio
  lista: Lista[] = [];

  constructor() {

    // console.log('Servicio Iniciado');
    // const lista1 = new Lista('Recolectar gemas del infinito');
    // const lista2 = new Lista('Heroes a desaparecer');
    // this.lista.push(lista1, lista2)
    // console.log(lista1, lista2);

    this.CargarStorage();
   }
   // Creamos una funcion para crear una lista cual pedira como parametro un titulo
   CrearLista(Titulo: string) {
   // definimos unas constante llmada lista la cual sera igual a una lista de tipo lista la cual recibe como parametro un titulo
    const lista = new Lista(Titulo);
   // invocamos la lista y le agregamos la propiedad push, push añade uno o más elementos al final de un array y devuelve la nueva longitud del array.
    this.lista.push(lista);
  // invocamos la funcion de guardarStorage para que se almacene
    this.GuardaStorage();
  // retornamos la lista con el id
    return lista.id;
   }
   borrarLista(lista: Lista) {
    this.lista = this.lista.filter(listaData => listaData.id !== lista.id);
    this.GuardaStorage();
  }

  // definimos una funcion de ObtenerLista la cual recibira como parametro un Id de tipo String o Number
   ObtenerLista(id: string | number) {
     // hacemos que el id pase a ser de tipo number
      id = Number(id);
      // retornamos la lista y comparamos que el id sea igual al id que recibe
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
