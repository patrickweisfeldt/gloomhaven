import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';

import { CollapseModule } from 'ngx-bootstrap/collapse';
import { ModalModule } from 'ngx-bootstrap/modal';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddEventComponent } from './add-event/add-event.component';
import { CampaignsComponent } from './campaigns/campaigns.component';
import { DeleteCampaignComponent } from './delete-campaign/delete-campaign.component';
import { EditComponent } from './edit/edit.component';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { NewCampaignComponent } from './new-campaign/new-campaign.component';
import { RegisterComponent } from './register/register.component';


const firebaseConfig = {
	apiKey: 'AIzaSyA9FRe3S25vTzYCOWPJyauSpvWKKgG-Pu0',
	authDomain: 'gloom-c8e6c.firebaseapp.com',
	databaseURL: 'https://gloom-c8e6c.firebaseio.com',
	projectId: 'gloom-c8e6c',
	storageBucket: 'gloom-c8e6c.appspot.com',
	messagingSenderId: '258777583336',
	appId: '1:258777583336:web:a93f983c1336884293c35d',
	measurementId: 'G-YMDX1RK6YF'
};


@NgModule({
	declarations: [
		AppComponent,
		AddEventComponent,
		CampaignsComponent,
		DeleteCampaignComponent,
		EditComponent,
		LoginComponent,
		NavbarComponent,
		NewCampaignComponent,
		RegisterComponent
	],
	imports: [
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		AppRoutingModule,
		BrowserModule,
		BrowserAnimationsModule,
		CollapseModule.forRoot(),
		FormsModule,
		ModalModule.forRoot(),
		ReactiveFormsModule,
		RouterModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
