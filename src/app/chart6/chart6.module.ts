import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { TimelineChartComponent } from './../visuals/timeline-chart/timeline-chart.component';
import { Chart6Component } from './chart6.component';

import { Chart6RoutingModule } from './chart6.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Chart6RoutingModule,
    ],
    declarations: [
        TimelineChartComponent,
        Chart6Component
    ],
    exports: [
        Chart6Component
    ],
})
export class Chart6Module { }
