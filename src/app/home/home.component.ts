import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Campaign } from '../models';
import { StateService } from '../state.service';

@Component({
	selector: 'app-home',
	templateUrl: './home.component.html',
	styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

	constructor(private state: StateService) { }

	campaignName: string;

	campaigns$: Observable<Campaign[]>;

	completeEvent(campaign: Campaign, completed: boolean): void {
		campaign.completeEvent(completed);
		this.state.updateCampaign(campaign);
	}

	createCampaign(): void {
		this.state.addCampaign(new Campaign({ name: this.campaignName }));
		this.campaignName = '';
	}

	editCampaign(campaign: Campaign): void {
		this.state.editCampaign(campaign);
	}

	ngOnInit(): void {
		this.campaigns$ = this.state.campaigns$;
		this.state.loadState();
	}

	selectCityEvent(campaign: Campaign): void {
		campaign.selectCityEvent();
	}

	selectRoadEvent(campaign: Campaign): void {
		campaign.selectRoadEvent();
	}

}
