$(document).ready(function(){
    var basket = new Basket();
    basket.render('#basket_wrapper');
    var review = new Review();
    review.render();

    $('.buyme').on('click', function(){
        //Поиск id товара
        var id_product =parseInt($(this).attr('id').split('_')[1]);
        //Количество добавляемого товара
        var quantity = 1;
        //Поиск цены товара
        var price = parseInt($(this).parent().find('.product-price').text());
        //Нашли данные о товаре и добавляем в корзину
        basket.add(id_product, quantity, price);
    });

    $(document).on('click', '.removeItem', function () {
        var id_product = parseInt($(this).attr('id').split('_')[1]);
        var quantity = 1;
        var pr = parseInt($('#good_' + id_product).parent().find('.product-price').text());
        var price = pr;
        basket.delete(id_product, quantity, price);
    });

    $('form').submit( function () {
        //собираем данные для добавления отзыва
        var id_prod = parseInt($(this).attr('id').split('_')[1]);
        var id_rev = parseInt($(this).attr('id').split('_')[1]);
        var id_user = 1;
        var text = $('#inputRev_' + id_rev).val();
        //Генерируем блок для вставки сообщения от сервера
        var approve = $('<div/>', {
            id: 'approve_' + id_rev
        })

        //Генерируем кнопку для публикации отзыва после модерации
        var approveButton = $('<button/>', {
            id: 'approveButton_' + id_rev,
            class: 'app',
            text: 'Опубликовать отзыв'
        })
        //Генерируем блок для вставки отзыва
        var reviewPublic = $('<div/>', {
            id: 'reviewPublic_' + id_rev
        })
        //Вставляем блок для вставки отзыва
        this.before(reviewPublic[0]);
        //После формы вставляем блок с ответом сервера и кнопку для админа, для публикации отзыва
        this.after(approve[0]);
        approve[0].after(approveButton[0]);
        review.addReview(id_prod, id_rev, id_user, text);
        return false;
    })

    //approve
    $(document).on('click', '.app', function () {

        // Достаем по нажатию на кнопку модерации, отзыв
        var id_rev = parseInt($(this).attr('id').split('_')[1]);
        var id = 'reviewPublic_' + id_rev;
        review.getReview(id, id_rev);

        // Удаляем блок и кнопку ддля модерации
        var app = '#approve_' + id_rev;
        var but = '#approveButton_' + id_rev;
        //$(app).remove();
        $(but).remove();
        //console.log($(this).attr('id'));
    })

    // delete
    $(document).on('click','.delReview', function () {
        // По нажатию на кнопку "Удалить отзыв" удаляем блок с отзывами (пока со всеми)
        var id_rev = parseInt($(this).parent().attr('class').split('_')[1]);
        var id = '#reviewPublic_' + id_rev;
        $(id).remove();
        review.delete(id_rev);
        console.log(id_rev);
    })
});