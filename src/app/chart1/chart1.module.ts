import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AreaChartComponent } from './../visuals/area-chart/area-chart.component';
import { Chart1Component } from './chart1.component';

import { Chart1RoutingModule } from './chart1.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Chart1RoutingModule,
    ],
    declarations: [
        AreaChartComponent,
        Chart1Component
    ],
    exports: [
        Chart1Component
    ],
})
export class Chart1Module { }
