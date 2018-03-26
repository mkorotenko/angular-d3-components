import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

// import { TimelineChartComponent } from './../visuals/timeline-chart/timeline-chart.component';
import { AreaChartComponent } from './../visuals/area-chart/area-chart.component';
import { Chart7Component } from './chart7.component';

import { Chart7RoutingModule } from './chart7.routing.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        Chart7RoutingModule,
    ],
    declarations: [
        AreaChartComponent,
        Chart7Component
    ],
    exports: [
        Chart7Component
    ],
})
export class Chart7Module { }
