import { Component, OnInit, ɵConsole } from '@angular/core';
import { DeseosService } from '../../services/deseos.service';
import { ActivatedRoute } from '@angular/router';
import { Lista } from '../../models/lista.model';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.page.html',
  styleUrls: ['./agregar.page.scss'],
})
export class AgregarPage implements OnInit {

  lista: Lista;
  constructor(private deseosService: DeseosService,
              private route: ActivatedRoute) {

              const listaId = this.route.snapshot.paramMap.get('listaId');
              console.log(listaId);

              this.lista = this.deseosService.ObtenerLista(listaId);

              console.log(this.lista);
              console.log('sale');

              }

  ngOnInit() {
  }

}
