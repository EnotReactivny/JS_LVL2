$(document).ready(function(){
	var menu = new Menu('my_class', 'my_menu');
	menu.render('append');

	$('.hide_menu').on('click', function(){

		$('.hide_menu + ul').toggle("slow");
	})
})
/*
* описания классов
*/
function Container()
{
  this.id = "";
  this.className = "";
  this.htmlCode = "123";
}

Container.prototype.render = function()
{
   return this.htmlCode;
}

function Menu(my_id, my_class){
   Container.call(this);
   this.id = my_id;
   this.className = my_class;
   
   this.items = [];
}

Menu.prototype = Object.create(Container.prototype);
Menu.prototype.constructor = Menu;

Menu.prototype.render = function(receptor){	
	$.get({
		url: "https://api.myjson.com/bins/vgl9a",
		dataType: 'json',
		context: this,
		success: function(respond) {
			var result = "<ul class='" +this.className+"' id='"+this.id+"'>";
			var menu_items = [];

			respond.menu_items.map((item,index)=>{
				menu_items[index] = new MenuItem(item.href, item.title);
			})

			menu_items.map(item=>{
				if(item instanceof MenuItem) {
					result += item.render();					
				}
			})

			result +="</ul>";

			$("#" + receptor).append(result);
		},
		error: function() {

		}
	})	
}

function MenuItem(my_href, my_name){
   Container.call(this);
   this.className = "menu-item";
   this.href = my_href;
   this.itemName = my_name;
}

MenuItem.prototype = Object.create(Container.prototype);
MenuItem.prototype.constructor = MenuItem;

MenuItem.prototype.render = function(){
	return "<li class='"+this.className+"' href='"+ this.href +"'>" + this.itemName + "</li>";
}
