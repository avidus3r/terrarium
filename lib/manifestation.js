'use strict';

class Manifestation{
    constructor(_species){
        this.id = Math.floor((1+Math.random()) * 0x100) + '-' + Math.floor((1+Math.random()) * 0x1000) + '-' + Math.floor((1+Math.random()) * 0x10) + '-' + Math.floor((1+Math.random()) * 0x10000);
        this.created = Date.now();
        this.manifestation = _species;
    }
    live() {
        console.log(this, this.manifestation);
        setInterval(() => {
            this._age++;
            console.log(this._id + ' is ' + this._age + ' seconds old');
        },1000);


    }
    die() {
        console.log('die: ', this.manifestation);
    }
};

module.exports = Manifestation;