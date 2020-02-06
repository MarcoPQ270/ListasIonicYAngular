import { Component, OnInit, ɵConsole } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';
import { ListaItem } from '../../models/lista-item.model';
import { ConditionalExpr } from '@angular/compiler';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {
  // creamos una propiedad lista de tipo Lista
  lista: Lista;
  nombreItem = '';
  // Inyectamos en el constructor los servicios que usaremos, el servicio de deseos y el route para la direccion
  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute) {
              // definimos una constante que va leer loq ue trae el url que llega
              const listaId = this.route.snapshot.paramMap.get('listaId');
              // imprimimos el id de la lista
              console.log(listaId);
              // Inicializamos la lista y la igualamos al metodo que esta en el deseoService
              this.lista = this.deseosService.ObtenerLista(listaId);
              // Imprimimos toda la informacion que nos trae la lista
              console.log(this.lista);

              }

  ngOnInit() {
  }
    // creamos un nuevo metodo para agreagar un item
    agregarItem() {
      // verificamos que la lista no venga vacia
      if (this.nombreItem.length === 0) {
      // en caso de estar vacia no retnamos nada
          return;
      }
      // creamos una nueva constante que sera igual a una nueva lista de items y le pasamos como parametro el nombre del item
      const nuevoItem = new ListaItem(this.nombreItem);
      // agregamos el nuevo item
      this.lista.items.push(nuevoItem);
      // Despues de ser agregada dejamos la variale vacia
      this.nombreItem = '';
      // guardamos los item en el storage
      this.deseosService.GuardaStorage();
    }

    CambioCheck(item: ListaItem) {
      console.log(item);
      const pendiente = this.lista.items.filter(itemData => !itemData.completado).length;
      console.log({pendiente});
      if (pendiente === 0) {
        this.lista.terminadaEn = new Date();
        this.lista.terminada = true;
      } else {
        this.lista.terminadaEn = null;
        this.lista.terminada = false;
      }
      this.deseosService.GuardaStorage();
    }

    borrar(i: number) {
        this.lista.items.splice( i, 1);
        this.deseosService.GuardaStorage();
    }


}
