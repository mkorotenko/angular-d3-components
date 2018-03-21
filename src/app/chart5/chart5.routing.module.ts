import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Chart5Component } from './chart5.component';

const Chart5Routes: Routes = [
    { path: '', component: Chart5Component, data: { title: 'Area chart' } },
];

@NgModule({
    imports: [
        RouterModule.forChild(Chart5Routes),
    ],
    exports: [
        RouterModule
    ]
})
export class Chart5RoutingModule { }
