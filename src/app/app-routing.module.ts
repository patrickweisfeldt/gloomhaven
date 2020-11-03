import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from './auth.guard';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';


const routes: Routes = [
	{
		path: 'campaigns',
		component: CampaignsComponent,
		canActivate: [AuthGuard],
		data: { requireLogin: true, redirectTo: '/login' }
	},
	{
		path: 'edit/:name',
		component: EditComponent,
		canActivate: [AuthGuard],
		resolve: { campaign: AuthGuard },
		data: { requireLogin: true, redirectTo: '/login' }
	},
	{
		path: 'login',
		component: LoginComponent,
		canActivate: [AuthGuard],
		data: { requireLogin: false, redirectTo: '/campaigns' }
	},
	{
		path: 'register',
		component: RegisterComponent,
		canActivate: [AuthGuard],
		data: { requireLogin: false, redirectTo: '/campaigns' }
	},
	{
		path: '',
		pathMatch: 'full',
		redirectTo: '/login'
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
