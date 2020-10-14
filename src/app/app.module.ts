import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EditComponent } from './edit/edit.component';

@NgModule({
	declarations: [
		AppComponent,
		HomeComponent,
		EditComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [],
	bootstrap: [AppComponent]
})
export class AppModule { }
