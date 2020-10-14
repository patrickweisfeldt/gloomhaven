import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditComponent } from './edit/edit.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
	{ path: 'edit', component: EditComponent },
	{ path: '', component: HomeComponent, pathMatch: 'full' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
