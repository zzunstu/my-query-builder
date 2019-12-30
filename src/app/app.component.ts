import { Component } from '@angular/core';
import { QueryBuilderConfig, QueryBuilderClassNames } from 'angular2-query-builder';
import { FormBuilder, FormControl } from '@angular/forms';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})
export class AppComponent {
	public queryCtrl: FormControl;

	public selectedRuleSetID: number = 0;
	public defaultRuleSetID: number = 1;
	
		guid: number = 8;	
		
		queryString: string;
	
    public query: RuleSet = {
			condition: 'and',
			id: 1,
			rules: [
				{id: 2, field: 'age', operator: '<=', entity: 'physical'},
				{id: 3, field: 'birthday', operator: '=', value: new Date(), entity: 'nonphysical'},
				{
					condition: 'or',
					id: 4,
					rules: [
						{id: 5, field: 'gender', operator: '=', entity: 'physical'},
						{id: 6, field: 'occupation', operator: 'in', entity: 'nonphysical'},
						{id: 7, field: 'school', operator: 'is null', entity: 'nonphysical'},
						{id: 8, field: 'notes', operator: '=', entity: 'nonphysical'}
					]
				}
			]
		};
	
		public config: QueryBuilderConfig = {
			fields: {
				age: {name: 'Age', type: 'number'},
				gender: {
					name: 'Gender',
					type: 'category',
					options: [
						{name: 'Male', value: 'm'},
						{name: 'Female', value: 'f'}
					]
				},
				name: {name: 'Name', type: 'string'},
				notes: {name: 'Notes', type: 'textarea', operators: ['=', '!=']},
				educated: {name: 'College Degree?', type: 'boolean'},
				birthday: {name: 'Birthday', type: 'date', operators: ['=', '<=', '>'],
					defaultValue: (() => new Date())
				},
				school: {name: 'School', type: 'string', nullable: true},
				occupation: {
					name: 'Occupation',
					type: 'category',
					options: [
						{name: 'Student', value: 'student'},
						{name: 'Teacher', value: 'teacher'},
						{name: 'Unemployed', value: 'unemployed'},
						{name: 'Scientist', value: 'scientist'}
					]
				}
			},
			allowEmptyRulesets: true,
			addRuleSet: (parent: RuleSet) => {
				if(parent) {
          parent.rules.push({
						condition: 'or',
						id: ++this.guid,
						rules: [
							{ field: 'age', operator: '='}
						]
					})
				}
			},
			addRule: (parent: RuleSet) => {
				if(parent) {
					parent.rules.push({
						field: 'age',
						id: ++this.guid,
						operator: '='
					})
				}
			}
		};

		public myOptions: any[];
	
		constructor(
			private formBuilder: FormBuilder
		) {
			this.queryCtrl = this.formBuilder.control(this.query);

			this.myOptions = Object.keys(this.config.fields).map((k: any) => { 
				return {
					value: k,
					name: this.config.fields[k].name
				};
			});
		}

		private addClick() {
			this.query.rules.push({field: 'Age', operator: '='});
		}

		private click1(ruleset){
			console.log(ruleset);
		}

		private showQuery() {
			console.log(this.query);
		}

		private showSelected() {
			console.log(this.selectedRuleSetID !== 0 ? this.selectedRuleSetID : 'No selected');
		}

		private promote(ruleSet){
      for(let i = 0; i < this.query.rules.length; i++) {
				// let r: RuleSet = this.query.rules[i];
				// console.log(r);
        if(this.query.rules[i]["condition"] && this.query.rules[i]["id"] === ruleSet.id) {
					let rule: any = this.query.rules[i];
					rule.rules.forEach((it) => {
						this.query.rules.push(it);
					});
				}
			}

			this.query.rules = this.query.rules.filter((r: any) => {
        return r["id"] != ruleSet.id;
			});
		}

		private depromote(rule: Rule){
			console.log(rule);
			let flag: boolean = false;
			for(let i = 0; i < this.query.rules.length; i++) {
				// let r: RuleSet = this.query.rules[i];
				// console.log(r);
        if(this.query.rules[i]["condition"]) {
					let rule1: any = this.query.rules[i];

					if(rule1.rules.indexOf(rule) === -1){
						let dd: Rule = {
							id: rule.id,
							field: rule.field,
							operator: rule.operator,
							value: rule.value
						};
            flag = true;
						rule1.rules.unshift(dd);
				}
				}
			}

			if(flag) {
				this.query.rules = this.query.rules.filter((r: any) => {
					return r["id"] != rule.id;
				});
			}
		}

		private onChange(e){
			console.log(e);
			//var select: HTMLSelectElement = e.target;
			console.log(e.target.options[e.target.selectedIndex].value);

			// add to Ruleset
			let parentRuleSetID: number = this.selectedRuleSetID !== 0 ? this.selectedRuleSetID : this.defaultRuleSetID;

			//this.query.rules
		}

		private oncheck(e, id){
			 this.selectedRuleSetID = id;
			 console.log(e.value, id);
		}
}

export interface RuleSet {
	condition: string;
	id?: number;
	selected?: boolean;
	rules: Array<RuleSet | Rule>;
	collapsed?: boolean;
}

export interface Rule {
	field: string;
	id?: number;
	value?: any;
	operator?: string;
	entity?: string;
}