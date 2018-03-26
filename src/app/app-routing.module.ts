import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { PageNotFoundComponent } from './not-found.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'chart1', pathMatch: 'full' },
    { path: 'chart1', loadChildren: './chart1/chart1.module#Chart1Module' },
    { path: 'chart2', loadChildren: './chart2/chart2.module#Chart2Module' },
    { path: 'chart3', loadChildren: './chart3/chart3.module#Chart3Module' },
    { path: 'chart4', loadChildren: './chart4/chart4.module#Chart4Module' },
    { path: 'chart5', loadChildren: './chart5/chart5.module#Chart5Module' },
    { path: 'chart6', loadChildren: './chart6/chart6.module#Chart6Module' },
    { path: 'chart7', loadChildren: './chart7/chart7.module#Chart7Module' },
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
