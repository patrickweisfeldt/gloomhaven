import { Component, EventEmitter } from '@angular/core';

import { BsModalRef } from 'ngx-bootstrap/modal';


@Component({
	selector: 'app-add-event',
	templateUrl: './add-event.component.html',
	styleUrls: ['./add-event.component.css']
})
export class AddEventComponent {

	constructor(private modalRef: BsModalRef) { }

	event: EventEmitter<AddEventData> = new EventEmitter();

	number: number | 'Select Event Number' = 'Select Event Number';

	numberOptions: number[] = [...Array(81).keys()].map(i => i + 1);

	city: boolean = false;

	road: boolean = false;

	close(): void {
		this.number = null;
		this.city = false;
		this.road = false;
		this.modalRef.hide();
	}

	submit(): void {
		this.event.emit({
			number: +this.number,
			city: this.city,
			road: this.road
		});
		this.close();
	}

}

export interface AddEventData {
	number: number;
	city: boolean;
	road: boolean;
}
