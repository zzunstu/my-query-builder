import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subject, Subscription, ReplaySubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
	selector: 'apx-tree',
	templateUrl: './tree.component.html',
	styleUrls: []
})

export class TreeComponent implements OnInit {

	ngOnInit(): void {
		console.log('my tree');
	}
}
