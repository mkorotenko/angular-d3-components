import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'chart1', pathMatch: 'full' },
    { path: 'chart1', loadChildren: './chart1/chart1.module#Chart1Module' },
    { path: 'chart2', loadChildren: './chart2/chart2.module#Chart2Module' },
    { path: 'chart3', loadChildren: './chart3/chart3.module#Chart3Module' },
    { path: '**', component: PageNotFoundComponent, data: { title: 'Not found', previousPage: 'reports', hideRightMenu: true } }
];

@NgModule({
    imports: [
        RouterModule.forRoot(
            appRoutes,
            // {
            //     enableTracing: true, // <-- debugging purposes only
            // }
        )
    ],
    exports: [
        RouterModule
    ],
})
export class AppRoutingModule { }
