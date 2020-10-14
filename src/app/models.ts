export class Campaign {

	city: Event[];
	name: string;
	road: Event[];

	constructor(name: string) {

		this.name = name;

		this.city = [];
		for (let i = 1; i < 82; i++) {
			const event: Event = {
				active: true,
				complete: false,
				number: i,
				seen: false
			};
			if (i > 30) { event.active = false; }
			this.city.push(event);
		}

		this.road = [];
		for (let i = 1; i < 70; i++) {
			const event: Event = {
				active: true,
				complete: false,
				number: i,
				seen: false
			};
			if (i > 30) { event.active = false; }
			this.road.push(event);
		}

	}

}

export interface Event {
	active: boolean;
	complete: boolean;
	number: number;
	seen: boolean;
}

export function shuffle(array: Event[]): void {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
}
