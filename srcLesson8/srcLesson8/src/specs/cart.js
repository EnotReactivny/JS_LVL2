'use strict'

describe('Корзина товаров',()=>{
	let basket = new Basket();
	let cart;

	basket.basket_items = [
		{
			"id_product":123,
			"price": 100
		}
	];

	let getCart = (callback) => {
		$.ajax({
			type:"GET",
			url:"https://api.myjson.com/bins/o74am",
			contentType: 'application/json',
			dataType: "json",
			success: callback
		});
	}

//Проверка урл запроса

	it("проверка URL AJAX запроса", ()=> {
		//Создаем функцию-шпион
		spyOn($, 'ajax')		
		let callback = jasmine.createSpy();

		//Вызываем функцию с AJAX запросом
		getCart(callback);

		console.log('test ajax call', $.ajax.calls.mostRecent());
		expect ($.ajax.calls.mostRecent().args[0]['url']).toEqual('https://api.myjson.com/bins/o74am');

	})


//Проверка успешности запроса

	it("проверка успешности запроса, выполнен callback", function(){
		//вызываем функцию-шпион
		spyOn($, "ajax").and.callFake((options)=>{
			options.success();
		})

		let callback = jasmine.createSpy();

		//Вызываем функцию с AJAX запросом
		getCart(callback);
		expect(callback).toHaveBeenCalled();
	})


	it('тест сборки содержимого корзины 1', ()=>{
		expect(basket.basket_items.length).toBe(1);
	})

	it('тест сборки содержимого корзины 2', ()=>{
		expect(basket.basket_items[0]).toEqual({
			"id_product": 123,
			"price": 100
		})
	})
})