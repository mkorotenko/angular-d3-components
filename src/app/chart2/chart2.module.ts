import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { D3Service, D3_DIRECTIVES } from './../d3';

import { GraphComponent } from './../visuals/graph/graph.component';
import { SHARED_VISUALS } from './../visuals/shared';
import { Chart2Component } from './chart2.component';

import { Chart2RoutingModule } from './chart2.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Chart2RoutingModule,
    ],
    declarations: [
         GraphComponent,
         ...SHARED_VISUALS,
         ...D3_DIRECTIVES,
        Chart2Component
    ],
    providers: [D3Service],
    exports: [
        Chart2Component
    ],
})
export class Chart2Module { }
