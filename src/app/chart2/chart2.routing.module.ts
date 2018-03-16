import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Chart2Component } from './chart2.component';

const Chart1Routes: Routes = [
    { path: '', component: Chart2Component, data: { title: 'Dashboard' } },
];

@NgModule({
    imports: [
        RouterModule.forChild(Chart1Routes),
    ],
    exports: [
        RouterModule
    ]
})
export class Chart2RoutingModule { }
