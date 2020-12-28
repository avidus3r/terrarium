'use strict';

import Life from './Life.js';

export default class Zooplankton extends Life {
    constructor(name, type, lifeSpan, energy, predators, prey, autotrophic, reproductionRate, evolvesTo, autoSelfReplicate, replicationRate, age, evolutionTime, id) {
        const _id = Math.floor((1+Math.random()) * 0x100) + '-' + Math.floor((1+Math.random()) * 0x1000) + '-' + Math.floor((1+Math.random()) * 0x10) + '-' + Math.floor((1+Math.random()) * 0x10000);
        const created = Date.now();
        super(_id, id, created, name, type, lifeSpan, energy, predators, prey, autotrophic, reproductionRate, evolvesTo, autoSelfReplicate, replicationRate, age, evolutionTime);
        this._id = id || _id;
        this._name = name;
        this._type = type;
        this._lifeSpan = 50;
        this._energy = 100;
        this._predators = ['SecondaryConsumers'];
        this._prey = ['Phytoplankton'];
        this._autotrophic = false;
        this._reproductionRate = 10;
        this._evolvesTo = 'PrimaryConsumers';
        this._autoSelfReplicate = autoSelfReplicate;
        this._replicationRate = 10;
        this._age = 0;
        this._evolutionTime = 15;
    }
    manifest(){
        super.live();
    }
}