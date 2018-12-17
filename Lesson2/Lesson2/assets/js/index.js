import {Menu} from "./Menu.js";
import {MenuItem} from "./MenuItem.js";
import {SubMenuItem} from "./SubMenuItem.js";


//ЗАДАНИЯ 1 и 2
//Globals
var doc = document;
var appId1 = doc.getElementById('app-1');


fetch("http://localhost:3000/assets/js/menuItems.json").then((response) => {
    if (response.ok) {
        return response.json();
    }


}).then((resJSON) => {
        let menuItemsObj = {};
        resJSON.menuItems.map((item, index) => {
           console.log(item.subItems);
            if(item.subItems){
                let menuSubItemsObj ={};
                item.subItems.map((subitem, subindex) => {
                    menuSubItemsObj[subindex] = new SubMenuItem(subitem.subItemHref, subitem.subItemName);
                });
                console.log(menuSubItemsObj);
                menuItemsObj[index] = new MenuItem(item.itemHref, item.itemName, menuSubItemsObj);

            }else {
                menuItemsObj[index] = new MenuItem(item.itemHref, item.itemName);
            }
        });
        console.log(menuItemsObj);
        let menu = new Menu('my-menu', 'menu-class', menuItemsObj);
        appId1.innerHTML = menu.render();
    }
);


// var subItem1 = new SubMenuItem("/catalog/ctegory-1", "Категоря 1");
// var subItem2 = new SubMenuItem("/catalog/ctegory-2", "Категоря 2");

// var menuItem1 = new MenuItem("/", "Главная", {});
// var menuItem2 = new MenuItem("/catalog/", "Каталог", {0: subItem1, 1: subItem2});
// var menuItem3 = new MenuItem("/gallery/", "Галерея", {});


// //Funcs
// var appMaker1 = (e) => {
//
//
//
// };


// appId1.addEventListener('mouseenter', menu.remove);
// doc.addEventListener('DOMContentLoaded', appMaker1);