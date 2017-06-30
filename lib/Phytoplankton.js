'use strict';

const Life = require('./Life');

class Phytoplankton extends Life {
    constructor(name, type, lifeSpan, energy, predators, prey, autotrophic, reproductionRate, evolvesTo, autoSelfReplicate, replicationRate, age, evolutionTime) {
        const id = Math.floor((1+Math.random()) * 0x100) + '-' + Math.floor((1+Math.random()) * 0x1000) + '-' + Math.floor((1+Math.random()) * 0x10) + '-' + Math.floor((1+Math.random()) * 0x10000);
        const created = Date.now();
        super(id, created, name, type, lifeSpan, energy, predators, prey, autotrophic, reproductionRate, evolvesTo, autoSelfReplicate, replicationRate, age, evolutionTime);
        this._name = name;
        this._type = type;
        this._lifeSpan = -1;
        this._energy = 100;
        this._predators = ['Zooplankton'];
        this._prey = null;
        this._autotrophic = true;
        this._reproductionRate = 10;
        this._evolvesTo = 'Zooplankton';
        this._autoSelfReplicate = autoSelfReplicate;
        this._replicationRate = 10;
        this._age = 0;
        this._evolutionTime = 15;
        this._instincs = {
            survivability: 0,
            adaptability: 0,
            hostility: 0,
            agressiveness: 0
        };
    }
    manifest(){
        super.live();
    }
}

module.exports = Phytoplankton;