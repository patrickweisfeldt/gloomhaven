import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Observable } from 'rxjs';
import { pluck } from 'rxjs/operators';

import { Campaign } from '../models';


@Component({
	selector: 'app-edit',
	templateUrl: './edit.component.html',
	styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

	constructor(private route: ActivatedRoute) { }

	campaign$: Observable<Campaign>;

	ngOnInit(): void {
		this.campaign$ = this.route.data.pipe( pluck('campaign') );
	}

}
