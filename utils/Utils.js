'use strict';

const Utils = {};

/******************* Vector *******************/
function Vector(x, y) {
	this.x = x;
	this.y = y;
}
Vector.prototype.plus = function(other) {
	return new Vector(this.x + other.x, this.y + other.y);
};
/******************* Vector *******************/

/******************* Grid *******************/
function Grid(width, height) {
	this.space = new Array(width * height);
	this.width = width;
	this.height = height;
}
Grid.prototype.isInside = function(vector) {
	return vector.x >= 0 && vector.x < this.width &&
		vector.y >= 0 && vector.y < this.height;
};
Grid.prototype.get = function(vector) {
	return this.space[vector.x + this.width * vector.y];
};
Grid.prototype.set = function(vector, value) {
	this.space[vector.x + this.width * vector.y] = value;
};
Grid.prototype.forEach = function(f, context) {
	for (let y = 0; y < this.height; y++) {
		for (let x = 0; x < this.width; x++) {
			let value = this.space[x + y * this.width];
			if (value != null)
				f.call(context, value, new Vector(x, y));
		}
	}
};
Grid.prototype.toString = function() {
	let output = "";
	for (let y = 0; y < this.height; y++) {
		for (let x = 0; x < this.width; x++) {
			let element = this.get(new Vector(x, y));
			output += charFromElement(element);
		}
		output += "\n";
	}
	return output;
};

/**
 * charFromElement
 * @param {String} element
 * @returns (String)
 */
function charFromElement(element) {
	if (element == null)
		return " ";
	else
		return element;
}

function shuffle(a) {
	for (let i = a.length; i; i--) {
		let j = Math.floor(Math.random() * i);
		[a[i - 1], a[j]] = [a[j], a[i - 1]];
	}
}

function memorySizeOf(obj) {
    let bytes = 0;

    function sizeOf(obj) {
        if(obj !== null && obj !== undefined) {
            switch(typeof obj) {
                case 'number':
                    bytes += 8;
                    break;
                case 'string':
                    bytes += obj.length * 2;
                    break;
                case 'boolean':
                    bytes += 4;
                    break;
                case 'object':
                    let objClass = Object.prototype.toString.call(obj).slice(8, -1);
                    if(objClass === 'Object' || objClass === 'Array') {
                        for(let key in obj) {
                            if(!obj.hasOwnProperty(key)) continue;
                            sizeOf(obj[key]);
                        }
                    } else bytes += obj.toString().length * 2;
                    break;
            }
        }
        return bytes;
    };

    function formatByteSize(bytes) {
        if(bytes < 1024) return bytes + " bytes";
        else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
        else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
        else return(bytes / 1073741824).toFixed(3) + " GiB";
    };

    return formatByteSize(sizeOf(obj));
};

function Wall() {};

Utils.sizeof 	= memorySizeOf;
Utils.shuffle 	= shuffle;
Utils.Vector  	= Vector;
Utils.Grid    	= Grid;

export default Utils;