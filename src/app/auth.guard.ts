import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Resolve, Router,
	RouterStateSnapshot, UrlTree } from '@angular/router';

import { EMPTY, Observable, of } from 'rxjs';
import { mergeMap, take } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { StateService } from './state.service';

import { Campaign } from './models';


@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate, Resolve<Campaign> {

	constructor(
		private auth: AuthService,
		private router: Router,
		private state: StateService
	) { }

	async canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Promise<boolean | UrlTree> {
		const loggedIn = await this.auth.loggedIn;
		if (route.data.requireLogin) {
			return loggedIn || this.router.parseUrl(route.data.redirectTo);
		} else {
			return !loggedIn || this.router.parseUrl(route.data.redirectTo);
		}
	}

	resolve(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot
	): Observable<Campaign> | Observable<never> {
		const name = route.paramMap.get('name');
		return this.state.campaigns$.pipe(
			take(1),
			mergeMap((campaigns: Campaign[]) => {
				const edit = campaigns.find((campaign: Campaign) => campaign.urlName === name);
				if (edit) {
					return of(edit);
				} else {
					this.router.navigate(['/campaigns']);
					return EMPTY;
				}
			})
		);
	}

}
