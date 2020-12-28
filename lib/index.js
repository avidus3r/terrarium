'use strict';

import World from './World.js';

const earth = new World();
earth.create();

// const mars = require('./lib/World');
// mars.create();
import * as _ from 'underscore';
const space = [];
//for (let i = 0; i < size; i++) {
let size = 1000;
for(let i=0;i<size;i++){
    space.push(Array(100000).fill('00'));
    if(space.length === size){
        console.log('array "space" has ' + space.length + ' items of ' + space[0].length + ' items each');
        console.log('byte size of "space" is: ' + (process.memoryUsage().heapTotal / 1000000));
    }

}