function Review(){
    Container.call(this);
    this.id = 'review';
    this.text = '';
}

Review.prototype = Object.create(Container.prototype);
Review.prototype.constructor = Review;

//Рендеринг отзывов
Review.prototype.render = function(){ //function(recipient) - куда выводим
    var review_new = [];
    var sibRev = $('.buyme');
    for (let i = 0; i < sibRev.length; i++) {

    //Создаем див обёртку для отзывов товара с цыфровым индикатором в ID от товара
    var one_rev_div = $('<form/>', {
        id: sibRev[i].id + "_items",
        method: 'post',
        action: ''
    })
    //Создаем кнопку добавления отзыва с id товара
    var review_add = $('<button/>', {
        type: 'submit',
        id: 'add_' + sibRev[i].id.split('_')[1] + '_review',
        class: 'review_add',
        text: 'Добавить отзыв'
    })

    var inputRev = $('<textarea/>', {
        cols: 30,
        rows: 5,
        name: 'inputRev',
        id: 'inputRev_' + sibRev[i].id.split('_')[1]
    })

        inputRev.appendTo(one_rev_div);
        review_add.appendTo(one_rev_div);
        $(sibRev[i]).after(one_rev_div);
    }
}

//GET запрос к серверу, получение данных о отзывах
Review.prototype.getReview = function(id, id_rev){
    //var append_id = "#" + this.id + "_items";
    //Запрос к серверу на получение отзывов
    $.get({
        url: 'http://localhost:8080/review/' + id_rev,
        //получаем доступ к свойствам Review
        context: this,
        success: function(respond) {

            //Создаю div с данными отзывов
            var review_data = $('<div/>', {
                class: 'reviewData_' + id_rev,
            })
            respond.map((item,index)=>{
                console.log(id);
                var rev = new Review();
                rev.approve(item.id_product,item.id_review,item.id_user,item.text);
            })
            review_data.append("<p>" + respond[0].text + "</p>");
            review_data.append("<p class='delReview'>Удалить отзыв</p>");
            review_data.appendTo('#' + id);
        },
        dataType: "json"
    });
}

Review.prototype.addReview = function(id_product, id_review, id_user, text){

    //Переменная data хранит тело запроса post
    var data = {
        "id_product": id_product,
        "id_review": id_review,
        "id_user": id_user,
        "text": text
    }
    console.log(id_review);
    //Создаем запрос post
    $.post({
        //url запроса (см. сваггер или апи)
        url: 'http://localhost:8080/review/',
        // перепривязываем контекст, чтобы работать со свойствами класса Review
        context: this,
        //Отправляем заголовки
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //Тело запроса
        data: JSON.stringify(data),
        //Получаем ответ от сервера и работаем с ним
        success: function(respond) {
            this.refresh(respond, id_product);
        },
        error: function(jqXhr, textStatus, errorThrown){
            console.log(textStatus, jqXhr);
        }
    })
}

Review.prototype.approve = function(id_product, id_review, id_user, text) {
    //Переменная data хранит тело запроса post
    var data = {
        "id_product": id_product,
        "id_review": id_review,
        "id_user": id_user,
        "text": text
    }

    $.post({
        //url запроса (см. сваггер или апи)
        url: 'http://localhost:8080/review/approve',
        // перепривязываем контекст, чтобы работать со свойствами класса Review
        context: this,
        //Отправляем заголовки
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //Тело запроса
        data: JSON.stringify(data),
        //Получаем ответ от сервера и работаем с ним
        success: function(respond) {
            this.refresh(respond, id_product);
        },
        error: function(jqXhr, textStatus, errorThrown){
            console.log(textStatus, jqXhr);
        }
    })
}

Review.prototype.delete = function(answer) {
    var data = {
        "id_review": answer
    }
    console.log(answer);
    $.ajax({
        //url запроса (см. сваггер или апи)
        url: 'http://localhost:8080/review/' + answer,
        // перепривязываем контекст, чтобы работать со свойствами класса Review
        context: this,
        type: 'DELETE',
        //Отправляем заголовки
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //Тело запроса
        data: JSON.stringify(data),
        //Получаем ответ от сервера и работаем с ним
        success: function(respond) {
             console.log(respond);
            this.refresh(respond, answer);
        },
        error: function(jqXhr, textStatus, errorThrown){
            console.log(textStatus, jqXhr);
        }
    })
}

Review.prototype.refresh = function(answer, id){
    var reviews_div = $('#approve_' + id);
    //console.log(answer);
    //console.log(id);
    reviews_div.empty();
    reviews_div.append("<p>" + answer.message + "</p>");
}