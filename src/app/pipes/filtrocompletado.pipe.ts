import { Pipe, PipeTransform } from '@angular/core';
import { Lista } from '../models/lista.model';

@Pipe({
  name: 'filtrocompletado',
  pure: false
})
export class FiltrocompletadoPipe implements PipeTransform {

  transform(listas: Lista[], completada: boolean = true): Lista[] {


    return listas.filter(lista => lista.terminada === completada);

  }

}
