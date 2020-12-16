import { Component } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors,
	Validators } from '@angular/forms';

import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';

import { AuthService } from '../auth.service';


@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.css']
})
export class RegisterComponent {

	constructor(private auth: AuthService) { }

	registerForm: FormGroup = new FormGroup({
		email: new FormControl('',
			[ Validators.email, Validators.required ],
			this.emailValidator.bind(this)
		),
		password: new FormControl('',
			[ Validators.minLength(6), Validators.required ]
		),
		confirmPassword: new FormControl('', Validators.required)
	}, this.passwordValidator);

	get email(): AbstractControl {
		return this.registerForm.get('email');
	}

	get password(): AbstractControl {
		return this.registerForm.get('password');
	}

	get confirmPassword(): AbstractControl {
		return this.registerForm.get('confirmPassword');
	}

	emailValidator(control: FormControl): Observable<ValidationErrors | null> {
		return timer(500).pipe(
			switchMap( () => this.auth.emailValidator(control.value) ),
			map( (result: string[]) => result.length ? { emailTaken: true } : null )
		);
	}

	passwordValidator(control: FormGroup): ValidationErrors | null {
		const password: AbstractControl = control.get('password');
		const confirm: AbstractControl = control.get('confirmPassword');
		return password && confirm && password.value !== confirm.value ?
			{ passwordMatch: true } : null;
	}

	register(): void {
		this.auth.register(this.registerForm.value);
	}

}
