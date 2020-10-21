export class Campaign {

	city: Event[];
	eventSelected: Event;
	name: string;
	road: Event[];

	constructor(config: any = {}) {

		this.name = config.name || 'Anonymous Campaign';
		this.city = config.city || [...Array(81).keys()].map(i => {
			return {
				active: i <= 29,
				complete: false,
				number: i + 1,
				seen: false,
				type: 'City'
			};
		});
		this.road = config.road || [...Array(69).keys()].map(i => {
			return {
				active: i <= 29,
				complete: false,
				number: i + 1,
				seen: false,
				type: 'Road'
			};
		});

		// Ensure old campaigns are updated to include event types
		this.city.map(event => {
			event.type = 'City';
			return event;
		});
		this.road.map(event => {
			event.type = 'Road';
			return event;
		});

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

	selectCityEvent(): void {
		this.eventSelected = this._selectEvent(this.city);
	}

	selectRoadEvent(): void {
		this.eventSelected = this._selectEvent(this.road);
	}

}

export interface Event {
	active: boolean;
	complete: boolean;
	number: number;
	seen: boolean;
	type: 'City' | 'Road';
}

export function shuffle(array: Event[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
