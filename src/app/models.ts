import { DocumentReference } from '@angular/fire/firestore';


export class Campaign {

	city: Event[];
	eventSelected: Event;
	firestoreDocRef: DocumentReference;
	name: string;
	road: Event[];

	constructor(data: CampaignInterface = {}) {

		this.name = data.name || 'Anonymous Campaign';

		const cities = data.city || [...Array(81).keys()].map(i => {
			return { number: i + 1 };
		});
		this.city = cities.map(event => new Event({ ...event, type: 'City' }));

		const roads = data.road || [...Array(69).keys()].map(i => {
			return { number: i + 1 };
		});
		this.road = roads.map(event => new Event({ ...event, type: 'Road' }));

		this.firestoreDocRef = data.docRef || null;

	}

	private _selectEvent(events: Event[]): Event {
		const selectable: Event[] = events
			.filter(e => e.active)
			.filter(e => !e.complete);
		shuffle(selectable);
		return selectable[0];
	}

	clearEvent(): void {
		this.eventSelected = null;
	}

	completeEvent(completed: boolean): void {
		this.eventSelected.seen = true;
		this.eventSelected.complete = completed;
		this.clearEvent();
	}

	deleteFromDB(): void {
		this.firestoreDocRef.delete();
	}

	selectCityEvent(): void {
		this.eventSelected = this._selectEvent(this.city);
	}

	selectRoadEvent(): void {
		this.eventSelected = this._selectEvent(this.road);
	}

	toPlainObject(): CampaignInterface {
		return {
			name: this.name,
			city: this.city.map( event => event.toPlainObject() ),
			road: this.road.map( event => event.toPlainObject() )
		};
	}

	updateDB(): void {
		this.firestoreDocRef.update(this.toPlainObject());
	}

	get urlName(): string {
		return this.name.split(' ').join('-');
	}

}

export class Event {

	active: boolean;
	complete: boolean;
	number: number;
	seen: boolean;
	type: 'City' | 'Road';

	constructor(data: any) {
		this.number = data.number;
		this.active = data.active || data.number <= 30;
		this.seen = data.seen || false;
		this.complete = data.complete || false;
		this.type = data.type;
	}

	toPlainObject(): object {
		return {
			active: this.active,
			complete: this.complete,
			number: this.number,
			seen: this.seen,
			type: this.type
		};
	}

}

export interface CampaignInterface {
	name?: string;
	city?: object[];
	docRef?: DocumentReference;
	road?: object[];
}

function shuffle(array: Event[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
