import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable } from 'rxjs';

import { Campaign } from './models';

@Injectable({
	providedIn: 'root'
})
export class StateService {

	constructor() { }

	private readonly _campaigns: BehaviorSubject<Campaign[]> = new BehaviorSubject( [] );

	public readonly campaigns$: Observable<Campaign[]> = this._campaigns.asObservable();

	private get campaigns(): Campaign[] {
		return this._campaigns.getValue();
	}

	private set campaigns(value: Campaign[]) {
		value.sort((a: Campaign, b: Campaign) => a.name < b.name ? -1 : 1);
		window.localStorage.setItem('gloom', JSON.stringify(value));
		this._campaigns.next(value);
	}

	private readonly _editingCampaign: BehaviorSubject<Campaign> = new BehaviorSubject( null );

	public readonly editingCampaign$: Observable<Campaign> = this._editingCampaign.asObservable();

	private get editingCampaign(): Campaign {
		return this._editingCampaign.getValue();
	}

	private set editingCampaign(value: Campaign) {
		this._editingCampaign.next(value);
	}

	addCampaign(campaign: Campaign): void {
		this.campaigns = [...this.campaigns, campaign];
	}

	editCampaign(campaign: Campaign): void {
		this.editingCampaign = campaign;
	}

	loadState(): void {
		const data = window.localStorage.getItem('gloom');
		this.campaigns = data ?
			JSON.parse(data).map(campaign => new Campaign(campaign)) :
			[];
	}

	saveEdits(): void {
		this.campaigns = [
			...this.campaigns.filter(c => c.name !== this.editingCampaign.name),
			this.editingCampaign
		];
		this.editingCampaign = null;
	}

	updateCampaign(campaign: Campaign): void {
		this.campaigns = [
			...this.campaigns.filter(c => c.name !== campaign.name),
			campaign
		];
	}

}
