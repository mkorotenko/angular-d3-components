import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { TimelineChartComponent } from './../visuals/timeline-chart/timeline-chart.component';
import { GraphComponent } from './../visuals/rm-graph/rm-graph.component';
import { Chart1Component } from './chart1.component';

import { Chart1RoutingModule } from './chart1.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Chart1RoutingModule,
    ],
    declarations: [
        GraphComponent,
        Chart1Component
    ],
    exports: [
        Chart1Component
    ],
})
export class Chart1Module { }
