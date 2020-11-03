import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
	selector: 'app-new-campaign',
	templateUrl: './new-campaign.component.html',
	styleUrls: ['./new-campaign.component.css']
})
export class NewCampaignComponent {

	constructor(private modalRef: BsModalRef) { }

	event: EventEmitter<string> = new EventEmitter();

	name: string;

	close(): void {
		this.name = null;
		this.modalRef.hide();
	}

	submit(): void {
		this.event.emit(this.name);
		this.close();
	}

}
