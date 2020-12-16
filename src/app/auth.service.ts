import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'firebase';

import { Observable, Subject } from 'rxjs';
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

	private _authErrors: Subject<any> = new Subject();

	readonly authErrors$: Observable<any> = this._authErrors.asObservable();

	get loggedIn(): Promise<boolean> {
		return this.user$.pipe( first(), map(user => !!user) ).toPromise();
	}

	user$: Observable<User>;

	emailValidator(email: string): Promise<string[]> {
		return this.fireAuth.fetchSignInMethodsForEmail(email);
	}

	register(formData: any): void {
		this.fireAuth.createUserWithEmailAndPassword(formData.email, formData.password)
			.then(user => {
				this.db.collection('users').doc(user.user.uid).set({});
				this.router.navigate(['/campaigns']);
			});
	}

	signIn(formData: any): void {
		this.fireAuth.signInWithEmailAndPassword(formData.email, formData.password)
			.catch(error => this._authErrors.next(error))
			.then(() => this.router.navigate(['/campaigns']));
	}

	signOut(): void {
		this.fireAuth.signOut()
			.then(() => this.router.navigate(['/login']));
	}

}
