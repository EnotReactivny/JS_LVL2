import {Container} from "./Container.js";

export class SubMenuItem extends Container {
    constructor(myHref, myName, subItems) {
        super();
        this.className = 'menu-sub-item';

        this.myHref = myHref;
        this.myName = myName;
        this.subItems = subItems;

    }

    render() {



            return '<li class ="' + this.className + '"><a href = "' + this.myHref + '" >' +
                this.myName + '</a></li>';


    }

    remove() {
        let thisElem = document.getElementsByClassName(this.className);
        thisElem.remove();

    }


}