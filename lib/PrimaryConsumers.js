'use strict';

import Life from './Life.js';

export default class PrimaryConsumers extends Life {
    constructor(name, type, lifeSpan, energy, predators, prey, autotrophic, reproductionRate, evolvesTo, autoSelfReplicate, replicationRate, age, evolutionTime) {
        const id = Math.floor((1+Math.random()) * 0x100) + '-' + Math.floor((1+Math.random()) * 0x1000) + '-' + Math.floor((1+Math.random()) * 0x10) + '-' + Math.floor((1+Math.random()) * 0x10000);
        const created = Date.now();
        super(id, created, name, type, lifeSpan, energy, predators, prey, autotrophic, reproductionRate, evolvesTo, autoSelfReplicate, replicationRate, age, evolutionTime);
        this._name = name;
        this._type = type;
        this._lifeSpan = -1;
        this._energy = 100;
        this._predators = ['PrimaryConsumers'];
        this._prey = ['Zooplankton', 'Phytoplankton'];
        this._autotrophic = true;
        this._reproductionRate = 10;
        this._evolvesTo = 'SecondaryConsumers';
        this._autoSelfReplicate = autoSelfReplicate;
        this._replicationRate = 10;
        this._age = 0;
        this._evolutionTime = 9;
    }
    manifest(){
        super.live();
    }
}