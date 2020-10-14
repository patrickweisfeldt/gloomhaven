import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Campaign, Event, shuffle } from '../models';
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

	eventData: any;

	eventSelected: boolean = false;

	completeEvent(campaign: Campaign, completed: boolean): void {
		let event: Event;
		if (this.eventData.type === 'City') {
			event = campaign.city.find(e => e.number === this.eventData.event.number);
		} else {
			event = campaign.road.find(e => e.number === this.eventData.event.number);
		}
		event.seen = true;
		if (completed) { event.complete = true; }
		this.state.updateEvent(campaign);
		this.eventSelected = false;
		this.eventData = null;
	}

	createCampaign(): void {
		this.state.addCampaign(new Campaign(this.campaignName));
		this.campaignName = '';
	}

	editCampaign(campaign: Campaign): void {
		this.state.editCampaign(campaign);
	}

	ngOnInit(): void {
		this.campaigns$ = this.state.campaigns$;
		this.state.loadState();
	}

	pickCityEvent(campaign: Campaign): void {
		this.eventSelected = true;
		this.eventData = { type: 'City', event: this.selectRandomEvent(campaign.city) };
	}

	pickRoadEvent(campaign: Campaign): void {
		this.eventSelected = true;
		this.eventData = { type: 'Road', event: this.selectRandomEvent(campaign.road) };
	}

	selectRandomEvent(events: Event[]): Event {
		const selectable: Event[] = events
			.filter(e => e.active)
			.filter(e => !e.complete);
		shuffle(selectable);
		return selectable[0];
	}

}
