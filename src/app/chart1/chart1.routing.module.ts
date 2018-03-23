import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Chart1Component } from './chart1.component';

const Chart1Routes: Routes = [
    { path: '', component: Chart1Component, data: { title: 'Line chart' } },
];

@NgModule({
    imports: [
        RouterModule.forChild(Chart1Routes),
    ],
    exports: [
        RouterModule
    ]
})
export class Chart1RoutingModule { }
