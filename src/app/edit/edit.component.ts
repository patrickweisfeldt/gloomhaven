import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { Campaign } from '../models';
import { StateService } from '../state.service';

@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

	constructor(private state: StateService) { }

	campaign$: Observable<Campaign>;

	ngOnInit(): void {
		this.campaign$ = this.state.editingCampaign$;
	}

	saveEdits(): void {
		this.state.saveEdits();
	}

}
