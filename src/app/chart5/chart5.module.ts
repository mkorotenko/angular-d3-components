import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AreaChartComponent } from './../visuals/area-chart/area-chart.component';
import { Chart5Component } from './chart5.component';

import { Chart5RoutingModule } from './chart5.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Chart5RoutingModule,
    ],
    declarations: [
        AreaChartComponent,
        Chart5Component
    ],
    exports: [
        Chart5Component
    ],
})
export class Chart5Module { }
