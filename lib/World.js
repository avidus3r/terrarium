'use strict';

import EventBus from './EventBus';
import * as _ from 'underscore';
import Phytoplankton from './Phytoplankton';
import PrimaryConsumers from './PrimaryConsumers';
import Zooplankton from './Zooplankton';

const LifeForms = {
	phytoplankton: Phytoplankton,
	primaryConsumers: PrimaryConsumers,
	zooplankton: Zooplankton
};

export default class World {
	constructor(){
		this.time = null;
		this.space = null;
		this.lifeforms = [];
		this.age = 0;
	}
	create(){
		let self = this;
		this.createSpace(1000).then((space) => {
			self.space = space;
			self.spawnLife();
		});
	}
	createSpace(size){
		return new Promise((fulfill, reject) => {
			/*const space = _.range(size).map(() => {
				return _.range(size).map(() => {
					return ' ';
				});
			});*/
			const space = [];
			
			for (let i = 0; i < size; i++) {
				space.push(new Array(size).fill(' '));
				if (i === (size - 1)) {
					fulfill(space);
				}
			}
		});
	}
	spawnLife (){
		setInterval(() => {
			this.time++;
			EventBus.emit('age', this.age, (age) => {
				this.age = age;
			});
			console.log('The world is ' + this.time + ' years old and contains ' + this.lifeforms.length + ' lifeforms');
		}, 1000);
		EventBus.on('decade',() =>{
			console.log('decade has passed');
			this.lifeforms.forEach((lifeform) => {
				console.log(lifeform.id);
				console.log(lifeform.type);
				console.log(lifeform.name);
				console.log(lifeform.physicalForm);
			});
		});
		EventBus.on('century',() =>{
			console.log('century has passed');
			this.lifeforms.forEach((lifeform) => {
				console.log(lifeform.id);
				console.log(lifeform.physicalForm);
			});
		});
		EventBus.on('lifeCreated',(lifeform) =>{
			this.lifeforms.push(lifeform);
		});
		if (this.lifeforms.length === 0) {
			let lifeform = new LifeForms.phytoplankton();
			lifeform.autoSelfReplicate = true;
			lifeform.type = 'phytoplankton';
			lifeform.name = 'green algae';
			EventBus.emit('manifestation', lifeform);
			this.lifeforms.push(lifeform);
		}
	}
};