import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StopListComponent } from './stop-list/stop-list.component';

const routes: Routes = [
  {
    path: 'stops',
    component: StopListComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StopsRoutingModule {}
