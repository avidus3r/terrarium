'use strict';

const EventEmmiter = require('events');

class _EventEmmiter extends EventEmmiter {}

const _Events = new _EventEmmiter();

_Events.on('live', function(lifeform){
    //should have arg of species type
    console.log('New life created', lifeform.name);
    setInterval(() => {
        lifeform._age++;
        this.emit('age:lifeform', lifeform);
    },1000);

    if (lifeform._lifeSpan > 0 && lifeform._age >= lifeform._lifeSpan)
        this.emit('die', lifeform);
});

_Events.on('age', function(age, cb) {
    age++;
    cb(age);
    if(age%10 === 0) this.emit('decade');
    if(age%100 === 0) this.emit('century');
});

_Events.on('manifestation', function(lifeform){
   lifeform.manifest();
});

_Events.on('age:lifeform', function(lifeform) {
    if (lifeform.age === 1) {

    }
    if (lifeform._autoSelfReplicate && lifeform._age % lifeform._replicationRate === 0) this.emit('reproduce', lifeform);
    if(lifeform.age === lifeform.evolutionTime) this.emit('evolve', lifeform);
});

/**
 * Reproduce Event Handler
 * @param {Object} manifestation
 */
_Events.on('reproduce', function(lifeform){
    //should have instance of species
    //should affect ttl props of instance of species
    let newLifeform = new lifeform.constructor();
    newLifeform.type = lifeform.type;
    newLifeform.name = lifeform.name;
    newLifeform.manifest();
});

_Events.on('evolve', function(lifeform){
    //should trigger manifest
    //should trigger die
    console.log(lifeform.name,'is evolving');
    switch(lifeform.evolvesTo) {
        case "Zooplankton":
            let Zooplankton = require('./Zooplankton');
            let z = new Zooplankton();
            z.type = 'zooplankton';
            z.name = 'copepod';
            z.manifest();
            break;
        case "PrimaryConsumers":
            let PrimaryConsumers = require('./PrimaryConsumers');
            let p = new PrimaryConsumers();
            p.type = 'primaryConsumers';
            p.name = 'fish';
            p.manifest();
            break;
    }
});

_Events.on('die', function(lifeform){

});

module.exports = _Events;

