import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Chart3Component } from './chart3.component';

const Chart1Routes: Routes = [
    { path: '', component: Chart3Component, data: { title: 'Hexagonal' } },
];

@NgModule({
    imports: [
        RouterModule.forChild(Chart1Routes),
    ],
    exports: [
        RouterModule
    ]
})
export class Chart3RoutingModule { }
