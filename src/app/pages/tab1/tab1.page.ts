import { Component } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
// Inyectamos en el constructor los servicios que vayamos a usar en la app
// DeseosService es el que nososotros creamos
// Router nos ayuda a movernos entre paginas
// Alert controller nos muestra una ventana de alerta
  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertController: AlertController) {
  }
// Agregamos el Async para especificar que esta es una funcion se transformara en una promesa
 async agregarLista() {

    // Hacemos uso de la navegacion ya que con esta linea nos envia a esta pantalla llamada agregar
    // this.router.navigateByUrl(this.router.url + '/agregar');

// declaramos una constante para Enviar el alert y a este le agregaremos los parametros, como por ejemplo
    const alert = await this.alertController.create({
      // parametros del alertController
      header: 'Nueva Lista',
      inputs: [
        {
          // parametros del input
          name: 'Titulo',
          type: 'text',
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
          }
        },
          {
            text: 'Guardar',
            handler: (data) => {
            console.log(data);
            if (data.Titulo.length === 0) {
                  return;
              }
              // Se crea la lista que viene desde el servicio con la data y el titulo asignado
            const listaId = this.deseosService.CrearLista(data.Titulo);
            this.router.navigateByUrl(`/tabs/tab1/agregar/${listaId}`);
            }
          }
      ]
    });
    // se presenta la alerta
    alert.present();
  }

}
