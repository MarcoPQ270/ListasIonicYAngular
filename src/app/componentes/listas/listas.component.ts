import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})

export class ListasComponent implements OnInit {

  @ViewChild(IonList, {static: true}) lista: IonList;
  @Input() terminada = true;


  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) { }

  ngOnInit() {}
  ListaSeleccionada(lista: Lista) {
    console.log(lista);

    if (this.terminada) {
      this.router.navigateByUrl(`/tabs/tab2/agregar/${lista.id}`);
    } else {
      this.router.navigateByUrl(`/tabs/tab1/agregar/${lista.id}`);
    }

  }

  borrarLista(lista: Lista) {
    this.deseosService.borrarLista(lista);
  }
  async editarLista(lista: Lista) {

      // Hacemos uso de la navegacion ya que con esta linea nos envia a esta pantalla llamada agregar
      // this.router.navigateByUrl(this.router.url + '/agregar');  // declaramos una constante para Enviar el alert y a este le agregaremos los parametros, como por ejemplo
      const alert = await this.alertController.create({
        // parametros del alertController
        header: 'Editar Lista',
        inputs: [
          {
            // parametros del input
            name: 'Titulo',
            type: 'text',
            value: lista.titulo,
            placeholder: 'Titulo a la nueva lista'
          }
        ],
        // parametros del boton
        buttons: [
          {
            text: 'Cancelar',
            role: 'cancel',
            handler: () => {
              console.log('Cancelar');
              this.lista.closeSlidingItems();
            }
          },
            {
              text: 'Actualizar',
              handler: (data) => {
              console.log(data);
              if (data.Titulo.length === 0) {
                    return;
                }
                // Se crea la lista que viene desde el servicio con la data y el titulo asignado
              lista.titulo = data.Titulo;
              // se hace la redireccion con el id de la lista
              this.deseosService.GuardaStorage();
              this.lista.closeSlidingItems();
              }
            }
        ]
      });
      // se presenta la alerta
      alert.present();
    }

}
