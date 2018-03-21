import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Chart4Component } from './chart4.component';

const Chart4Routes: Routes = [
    { path: '', component: Chart4Component, data: { title: 'Line chart' } },
];

@NgModule({
    imports: [
        RouterModule.forChild(Chart4Routes),
    ],
    exports: [
        RouterModule
    ]
})
export class Chart4RoutingModule { }
