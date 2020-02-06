import { NgModule } from '@angular/core';
import { FiltrocompletadoPipe } from './filtrocompletado.pipe';

@NgModule({
  declarations: [FiltrocompletadoPipe],
  exports: [FiltrocompletadoPipe]
})
export class PipesModule { }
