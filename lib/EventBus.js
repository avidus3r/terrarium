import EventEmmiter from 'events';

class _EventEmitter extends EventEmmiter {}
const EventBus = new _EventEmitter();
import Zooplankton from './Zooplankton.js';
import PrimaryConsumers from './PrimaryConsumers.js';

EventBus.on('live', function(lifeform){
	//should have arg of species type
	console.log('New life created', lifeform.name);
	setInterval(() => {
		lifeform._age++;
		this.emit('age:lifeform', lifeform);
	},1000);
	
	if (lifeform._lifeSpan > 0 && lifeform._age >= lifeform._lifeSpan)
		this.emit('die', lifeform);
});

EventBus.on('age', function(age, cb) {
	age++;
	cb(age);
	if(age%10 === 0) this.emit('decade');
	if(age%100 === 0) this.emit('century');
});

EventBus.on('manifestation', function(lifeform){
	lifeform.manifest();
});

EventBus.on('age:lifeform', function(lifeform) {
	if (lifeform.age === 1) {
		
	}
	if(lifeform.age === lifeform.lifeSpan) this.emit('die', lifeform.id);
	if (lifeform._autoSelfReplicate && lifeform._age % lifeform._replicationRate === 0) this.emit('reproduce', lifeform);
	if(lifeform.age === lifeform.evolutionTime) this.emit('evolve', lifeform);
});

/**
 * Reproduce Event Handler
 * @param {Object} manifestation
 */
EventBus.on('reproduce', function(lifeform){
	//should have instance of species
	//should affect ttl props of instance of species
	let newLifeform = new lifeform.constructor();
	newLifeform.type = lifeform.type;
	newLifeform.name = lifeform.name;
	newLifeform.manifest();
});

EventBus.on('evolve', function(lifeform){
	//should trigger manifest
	//should trigger die
	let _lifeform = lifeform;
	this.emit('die', lifeform.id);
	console.log(_lifeform.name,'is evolving');
	switch(_lifeform.evolvesTo) {
		case "Zooplankton":
			let z = new Zooplankton();
			z.id = _lifeform.id;
			z.type = 'zooplankton';
			z.name = 'copepod';
			z.manifest();
			break;
		case "PrimaryConsumers":
			let p = new PrimaryConsumers();
			p.id = _lifeform.id;
			p.type = 'primaryConsumers';
			p.name = 'fish';
			p.manifest();
			break;
	}
});


//module.exports = EventBus;
export default EventBus;