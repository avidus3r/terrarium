'use strict';

let Events = require('./events');
let LifeForms = {phytoplankton: require('./Phytoplankton'), primaryConsumers: require('./PrimaryConsumers'), zooplankton: require('./Zooplankton')};

let World = {
    time: null,
    lifeforms: [],
    age: 0,
    create: function(){
        setInterval(() => {
            this.time++;
            Events.emit('age', this.age, (age) => {
                this.age = age;
            });
            console.log('The world is ' + this.time + ' years old and contains ' + this.lifeforms.length + ' lifeforms');
        }, 1000);
        Events.on('decade',() =>{
            console.log('decade has passed');
            this.lifeforms.forEach((lifeform) => {
                console.log(lifeform.id);
                console.log(lifeform.type);
                console.log(lifeform.name);
                console.log(lifeform.physicalForm);
            });
        });
        Events.on('century',() =>{
            console.log('century has passed');
            this.lifeforms.forEach((lifeform) => {
                console.log(lifeform.id);
                console.log(lifeform.physicalForm);
            });
        });
        Events.on('lifeCreated',(lifeform) =>{
            this.lifeforms.push(lifeform);
        });
        if (this.lifeforms.length === 0) {
            let lifeform = new LifeForms.phytoplankton();
            lifeform.autoSelfReplicate = true;
            lifeform.type = 'phytoplankton';
            lifeform.name = 'green algae';
            Events.emit('manifestation', lifeform);
            this.lifeforms.push(lifeform);
        }
    }
};

module.exports = World;