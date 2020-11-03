import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { User } from 'firebase';

import { AuthService } from '../auth.service';


@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

	constructor(private auth: AuthService) { }

	isCollapsed: boolean = true;

	user$: Observable<User>;

	ngOnInit(): void {
		this.user$ = this.auth.user$;
	}

	signOut(): void {
		this.auth.signOut();
	}

	toggleCollapse(): void {
		this.isCollapsed = !this.isCollapsed;
	}

}
