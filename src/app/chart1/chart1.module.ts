import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { GraphComponent } from './../visuals/rm-graph/rm-graph.component';
import { AxisComponent } from './../visuals/rm-axis/rm-axis.component';
import { AreaComponent } from './../visuals/rm-area/rm-area.component';
import { PointsComponent } from './../visuals/rm-points/rm-points.component';
import { TimelineComponent } from './../visuals/rm-timeline/rm-timeline.component';

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
        AxisComponent,
        AreaComponent,
        PointsComponent,
        TimelineComponent,
        Chart1Component
    ],
    exports: [
        Chart1Component
    ],
})
export class Chart1Module { }
