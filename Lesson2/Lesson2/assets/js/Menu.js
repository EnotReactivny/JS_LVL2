import {Container} from "./Container.js";
import {MenuItem} from "./MenuItem.js";

export class Menu extends Container {


    constructor(myId, myClass, myItems) {


        super(myId, myClass, myItems);

        this.id = myId;
        this.className = myClass;
        this.items = myItems;
    }

    render() {
        let result = '<ul class = "' + this.className + '" id = "' + this.id + '" >';
        for (let item in this.items) {
            if (this.items[item] instanceof MenuItem) {
                result += this.items[item].render();

            }

        }
        result += '</ul>';
        return result;

    }

    remove() {
        let thisElem = document.getElementById(this.id);
        thisElem.remove();


    }


}

