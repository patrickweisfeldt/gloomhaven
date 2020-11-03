import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { AuthService } from './auth.service';
import { Campaign, CampaignInterface } from './models';


@Injectable({
	providedIn: 'root'
})
export class StateService {

	constructor(
		private auth: AuthService,
		private db: AngularFirestore
	) {
		this.auth.user$.subscribe(user => {
			if (user) {
				this.campaignCollection = this.db.doc(`users/${user.uid}`).collection<CampaignInterface>('campaigns');
				this.campaignCollection.snapshotChanges().pipe(
					map(data => data.map(action => {
						const document = action.payload.doc;
						return new Campaign({ ...document.data(), docRef: document.ref });
					}))
				).subscribe(campaigns => this.campaigns = campaigns);
			}
		});
	}

	private readonly _campaigns: BehaviorSubject<Campaign[]> = new BehaviorSubject( [] );

	public readonly campaigns$: Observable<Campaign[]> = this._campaigns.asObservable();

	private get campaigns(): Campaign[] {
		return this._campaigns.getValue();
	}

	private set campaigns(value: Campaign[]) {
		value.sort((a: Campaign, b: Campaign) => a.name < b.name ? -1 : 1);
		this._campaigns.next(value);
	}

	campaignCollection: AngularFirestoreCollection<CampaignInterface>;

	addCampaign(campaign: Campaign): void {
		this.campaignCollection.add(campaign.toPlainObject());
	}

}
