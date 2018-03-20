import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { D3Service, D3_DIRECTIVES } from './../d3';

import { HexagonalGraphComponent } from './../visuals/hexagonal/hexagonal-graph.component';
import { SHARED_VISUALS } from './../visuals/shared';
import { Chart3Component } from './chart3.component';

import { Chart3RoutingModule } from './chart3.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Chart3RoutingModule,
    ],
    declarations: [
         HexagonalGraphComponent,
         ...SHARED_VISUALS,
         ...D3_DIRECTIVES,
        Chart3Component
    ],
    providers: [D3Service],
    exports: [
        Chart3Component
    ],
})
export class Chart3Module { }
