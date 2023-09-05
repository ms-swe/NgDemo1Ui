import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StopsRoutingModule } from './stops-routing.module';
import { StopListComponent } from './stop-list/stop-list.component';
import { StopListItemComponent } from './stop-list-item/stop-list-item.component';


@NgModule({
  declarations: [
    StopListComponent,
    StopListItemComponent
  ],
  imports: [
    CommonModule,
    StopsRoutingModule
  ]
})
export class StopsModule { }
