import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

import { AuthService } from '../auth.service';
import { StateService } from '../state.service';
import { AddEventComponent, AddEventData } from '../add-event/add-event.component';
import { DeleteCampaignComponent } from '../delete-campaign/delete-campaign.component';
import { NewCampaignComponent } from '../new-campaign/new-campaign.component';
import { Campaign } from '../models';


@Component({
	selector: 'app-campaigns',
	templateUrl: './campaigns.component.html',
	styleUrls: ['./campaigns.component.css']
})
export class CampaignsComponent implements OnInit {

	constructor(
		private auth: AuthService,
		private modal: BsModalService,
		private state: StateService
	) { }

	campaignName: string;

	campaigns$: Observable<Campaign[]>;

	modalRef: BsModalRef;

	completeEvent(campaign: Campaign, completed: boolean): void {
		campaign.completeEvent(completed);
		campaign.updateDB();
	}

	createCampaign(): void {
		this.state.addCampaign(new Campaign({ name: this.campaignName }));
		this.campaignName = '';
	}

	ngOnInit(): void {
		this.campaigns$ = this.state.campaigns$;
	}

	openAddEventModal(campaign: Campaign): void {
		this.modalRef = this.modal.show(AddEventComponent, { class: 'modal-sm' });
		this.modalRef.content.event.subscribe((data: AddEventData) => {
			if (data.city) {
				const event = campaign.city.find(e => e.number === data.number);
				if (event) { event.active = true; }
			}
			if (data.road) {
				const event = campaign.road.find(e => e.number === data.number);
				if (event) { event.active = true; }
			}
			campaign.updateDB();
		});
	}

	openDeleteCampaignModal(campaign: Campaign): void {
		this.modalRef = this.modal.show(DeleteCampaignComponent, { class: 'modal-sm' });
		this.modalRef.content.event.subscribe((response: boolean) => {
			if (response) { campaign.deleteFromDB(); }
		});
	}

	openNewCampaignModal(): void {
		this.modalRef = this.modal.show(NewCampaignComponent, { class: 'modal-sm' });
		this.modalRef.content.event.subscribe((name: string) => {
			if (name) { this.state.addCampaign(new Campaign({ name })); }
		});
	}

	signOut(): void {
		this.auth.signOut();
	}

}
