import {Container} from "./Container.js";
import {SubMenuItem} from "./SubMenuItem.js";

export class MenuItem extends Container {
    constructor(myHref, myName, subItems) {
        super();
        this.className = 'menu-item';
        this.subItemsClass = 'menu-sub-list';
        this.myHref = myHref;
        this.myName = myName;
        this.subItems = subItems;

    }

    render() {
        console.log(this.subItems);

        if (this.subItems) {
            let res = '<li class ="' + this.className + '"><a href = "' + this.myHref + '" >' +
                this.myName + '</a><ul class=" ' + this.subItemsClass + '">';
            for (let subItem in this.subItems) {
                if (this.subItems[subItem] instanceof SubMenuItem) {
                    res += this.subItems[subItem].render();



                }

            }
            res += '</ul>';
            res += '</li>';
            return res;


        }
        else {
            return '<li class ="' + this.className + '"><a href = "' + this.myHref + '" >' +
                this.myName + '</a></li>';
        }

    }

    remove() {
        let thisElem = document.getElementsByClassName(this.className);
        thisElem.remove();

    }

}