import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

import { AuthService } from '../auth.service';


@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy, OnInit {

	constructor(private auth: AuthService) { }

	authErrors: any;

	signInForm: FormGroup = new FormGroup({
		email: new FormControl('',
			[ Validators.email, Validators.required, this.authResponseEmailValidator.bind(this) ]
		),
		password: new FormControl('',
			[ Validators.required, this.authResponsePasswordValidator.bind(this) ]
		)
	});

	subscription: Subscription = new Subscription();

	get email(): AbstractControl {
		return this.signInForm.get('email');
	}

	get password(): AbstractControl {
		return this.signInForm.get('password');
	}

	@ViewChild('emailInput') emailInput: ElementRef;

	@ViewChild('passwordInput') passwordInput: ElementRef;

	@ViewChild('submitButton') submitButton: ElementRef;

	authResponseEmailValidator(control: FormControl): ValidationErrors | null {
		if (this.authErrors && this.authErrors.type === 'email') {
			this.emailInput.nativeElement.focus();
			return { emailNotFound: true };
		} else { return null; }
	}

	authResponsePasswordValidator(control: FormControl): ValidationErrors | null {
		if (this.authErrors && this.authErrors.type === 'password') {
			this.passwordInput.nativeElement.focus();
			return { wrongPassword: true };
		} else { return null; }
	}

	clearAuthErrors(type: string): void {
		if (this.authErrors && this.authErrors.type === type) {
			this.authErrors = null;
			this.email.updateValueAndValidity();
			this.password.updateValueAndValidity();
		}
	}

	ngOnDestroy(): void {
		this.subscription.unsubscribe();
	}

	ngOnInit(): void {
		this.subscription.add(this.auth.authErrors$.subscribe(error => {
			let type: string;
			switch (error.code) {
				case 'auth/user-not-found':
					type = 'email';
					break;
				case 'auth/wrong-password':
					type = 'password';
					break;
			}
			this.authErrors = { type, error };
			this.email.updateValueAndValidity();
			this.password.updateValueAndValidity();
		}));
	}

	signIn(): void {
		this.submitButton.nativeElement.focus();
		this.auth.signIn(this.signInForm.value);
	}

}
