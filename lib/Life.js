'use strict';

const Events = require('./events');
const Utils = require('../utils/asciiIDGenerator');

class Life {
    constructor(id, created, name, type, lifeSpan, energy, predators, prey, autotrophic = false, reproductionRate, evolvesTo, autoSelfReplicate, replicationRate, age, evolutionTime, physicalForm){
        this._id                = id;
        this._created           = created;
        this._name              = name;
        this._type              = type;
        this._lifeSpan          = lifeSpan;
        this._energy            = energy;
        this._predators         = predators;
        this._prey              = prey;
        this._autotrophic       = autotrophic;
        this._reproductionRate  = reproductionRate;
        this._evolvesTo         = evolvesTo;
        this._autoSelfReplicate = autoSelfReplicate;
        this._replicationRate   = replicationRate;
        this._age               = age;
        this._evolutionTime     = evolutionTime;
        this._physicalForm      = physicalForm;
    }
    set id(id) {
        this._id = id;
    }
    get id() {
        return this._id;
    }
    set created(created) {
        this._created = created;
    }
    get created() {
        return this._created;
    }
    set name(name) {
        this._name = name;
    }
    get name () {
        return this._name;
    }
    set type(type) {
        this._type = type;
    }
    get type () {
        return this._type;
    }
    set lifeSpan(lifeSpan) {
        this._lifeSpan = lifeSpan;
    }
    get lifeSpan() {
        return this._lifeSpan;
    }
    set energy(energy) {
        this._energy = energy;
    }
    get energy() {
        return this._energy;
    }
    set predators(predators) {
        this._predators = predators;
    }
    get predators() {
        return this._predators;
    }
    set prey(prey) {
        this._prey = prey;
    }
    get prey() {
        return this._prey;
    }
    set autotrophic(autotrophic) {
        this._autotrophic = autotrophic;
    }
    get autotrophic() {
        return this._autotrophic;
    }
    set reproductionRate(reproductionRate) {
        this._reproductionRate = reproductionRate;
    }
    get reproductionRate() {
        return this._reproductionRate;
    }
    set evolvesTo(evolvesTo) {
        this._evolvesTo = evolvesTo;
    }
    get evolvesTo() {
        return this._evolvesTo;
    }
    set autoSelfReplicate(autoSelfReplicate) {
        this._autoSelfReplicate = autoSelfReplicate;
    }
    get autoSelfReplicate() {
        return this._autoSelfReplicate;
    }
    set replicationRate(replicationRate) {
        this._replicationRate = replicationRate;
    }
    get replicationRate() {
        return this._replicationRate;
    }
    set age(age) {
        this._age = age;
    }
    get age() {
        return this._age;
    }
    set evolutionTime(evolutionTime) {
        this._evolutionTime = evolutionTime;
    }
    get evolutionTime() {
        return this._evolutionTime;
    }
    set physicalForm(physicalForm) {
        this._physicalForm = physicalForm;
    }
    get physicalForm() {
        return this._physicalForm;
    }
    createPhysicalForm() {
        let chars = this.id.replace('-',' ').split('');
        chars.slice(0, Math.floor(chars.length));
        chars.push('x', ' ', 'o', ' ',' ','#','x', 'o', ' ',' ','@','#','x', 'o', ' ', ' ', '_',' ', ' ', ' ','o', 'x', ' ', '_', ' ','@', ' ',' ','#','_', ' ', ' ','@','#',' ','#');
        Utils.shuffle(chars);
        const width = this.type === 'phytoplankton' ? 20 : (this.type === 'zooplankton' ? 25 : 15);
        const height = this.type === 'phytoplankton' ? 10 : (this.type === 'zooplankton' ? 15 : 5);

        let grid = new Utils.Grid(width, height);

        for (let x = 0; x < grid.width; x++){
            for (let y = 0; y < grid.height; y++){
                if (x === 0 || x === grid.width-1) {
                    grid.set(new Utils.Vector(x, y), '|');
                }
                else if(x > 0 && x < grid.width-1 && y === 0 || y === grid.height-1){
                    grid.set(new Utils.Vector(x, y), '-');
                }
                else {
                    let rand = Math.floor(Math.random() * chars.length);
                    grid.set(new Utils.Vector(x, y), chars[rand]);
                }
            }
        }
        return grid.toString();
    }

    live() {
        this.physicalForm = this.createPhysicalForm();
        Events.emit('lifeCreated', this);
        Events.emit('live', this);
    }
}

module.exports = Life;