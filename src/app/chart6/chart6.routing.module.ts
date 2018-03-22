import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Chart6Component } from './chart6.component';

const Chart6Routes: Routes = [
    { path: '', component: Chart6Component, data: { title: 'Line chart' } },
];

@NgModule({
    imports: [
        RouterModule.forChild(Chart6Routes),
    ],
    exports: [
        RouterModule
    ]
})
export class Chart6RoutingModule { }
