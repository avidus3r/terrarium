'use strict';

import EventBus from './EventBus.js';
import * as _ from 'underscore';
import Utils from '../utils/Utils.js';
import Phytoplankton from './Phytoplankton.js';
import PrimaryConsumers from './PrimaryConsumers.js';
import Zooplankton from './Zooplankton.js';

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
		this.createSpace(100000).then((space) => {
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
			space.push(new Array(size));
			fulfill(space);
			//for (let i = 0; i < size; i++) {
            /*
            let i = 0;
			setInterval(() => {
                i++;
			    space.push(new Array(size));
                console.log(space);
                if (i === (size - 1)) {
                    fulfill(space);
                }
			}, 100);
			*/
			//}
		});
	}
	spawnLife (){
		setInterval(() => {
			this.time++;
			EventBus.emit('age', this.age, (age) => {
				this.age = age;
			});
			if(this.lifeforms.length) {
				console.log(this.lifeforms[0].id, this.lifeforms[0].type, this.lifeforms[0].name, this.lifeforms.length);	
			}
			
			//console.log('The world is ' + this.time + ' years old and contains ' + this.lifeforms.length + ' lifeforms');
		}, 1000);
		EventBus.on('decade',() =>{
			/*console.log('decade has passed');
			this.lifeforms.forEach((lifeform) => {
				console.log(lifeform.id);
				console.log(lifeform.type);
				console.log(lifeform.name);
				//console.log(lifeform.physicalForm);
			});*/
		});
		EventBus.on('century',() =>{
			console.log('century has passed');
			this.lifeforms.forEach((lifeform) => {
				console.log(lifeform.id);
				console.log(lifeform.physicalForm);
			});
		});
		EventBus.on('lifeCreated', (lifeform) => {
			this.lifeforms.push(lifeform);
		});
		EventBus.on('die',(lifeformId) =>{
			let del = this.lifeforms.find(l => {
				return l.id === lifeformId;
			});
			this.lifeforms.splice(this.lifeforms.indexOf(del), 1);
		});
		if (this.lifeforms.length === 0) {
			let lifeform = new LifeForms.phytoplankton();
			lifeform.autoSelfReplicate = true;
			lifeform.type = 'phytoplankton';
			lifeform.name = 'green algae';
			EventBus.emit('manifestation', lifeform);
			//this.lifeforms.push(lifeform);
		}
	}
};