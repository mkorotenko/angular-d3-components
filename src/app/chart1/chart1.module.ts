import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { D3Service, D3_DIRECTIVES } from './../d3';

import { HexagonalGraphComponent } from './../visuals/hexagonal/hexagonal-graph.component';
import { SHARED_VISUALS } from './../visuals/shared';
import { Chart1Component } from './chart1.component';

import { Chart1RoutingModule } from './chart1.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Chart1RoutingModule,
    ],
    declarations: [
         HexagonalGraphComponent,
         ...SHARED_VISUALS,
         ...D3_DIRECTIVES,
        Chart1Component
    ],
    providers: [D3Service],
    exports: [
        Chart1Component
    ],
})
export class Chart1Module { }
