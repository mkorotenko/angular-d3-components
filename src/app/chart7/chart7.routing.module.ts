import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { Chart7Component } from './chart7.component';

const Chart7Routes: Routes = [
    { path: '', component: Chart7Component, data: { title: 'Line chart' } },
];

@NgModule({
    imports: [
        RouterModule.forChild(Chart7Routes),
    ],
    exports: [
        RouterModule
    ]
})
export class Chart7RoutingModule { }
