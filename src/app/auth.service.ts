import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class AuthService {

	constructor(
		private db: AngularFirestore,
		private fireAuth: AngularFireAuth,
		private router: Router
	) {
		this.user$ = this.fireAuth.authState;
	}

	get loggedIn(): Promise<boolean> {
		return this.user$.pipe( first(), map(user => !!user) ).toPromise();
	}

	user$: Observable<User>;

	register(formData: any): void {
		this.fireAuth.createUserWithEmailAndPassword(formData.email, formData.password)
			.then(user => {
				this.db.collection('users').doc(user.user.uid).set({});
				this.router.navigate(['/campaigns']);
			});
	}

	signIn(formData: any): void {
		this.fireAuth.signInWithEmailAndPassword(formData.email, formData.password)
			.then(() => this.router.navigate(['/campaigns']));
	}

	signOut(): void {
		this.fireAuth.signOut()
			.then(() => this.router.navigate(['/login']));
	}

}
