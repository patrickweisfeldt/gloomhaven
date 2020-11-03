import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
	selector: 'app-delete-campaign',
	templateUrl: './delete-campaign.component.html',
	styleUrls: ['./delete-campaign.component.css']
})
export class DeleteCampaignComponent {

	constructor(private modalRef: BsModalRef) { }

	event: EventEmitter<boolean> = new EventEmitter();

	submit(response: boolean): void {
		this.event.emit(response);
		this.modalRef.hide();
	}

}
