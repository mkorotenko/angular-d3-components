import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { LineGraphComponent } from './../visuals/line-graph/line-graph.component';
import { Chart4Component } from './chart4.component';

import { Chart4RoutingModule } from './chart4.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Chart4RoutingModule,
    ],
    declarations: [
        LineGraphComponent,
        Chart4Component
    ],
    exports: [
        Chart4Component
    ],
})
export class Chart4Module { }
