$(document).ready(function(){  


	// показываем colback при клике по кнопке
	$('#colback_modal_btn, #colback_modal_btn_head').on('click', function(e){
		$('.modal_background').addClass('show');
    	$('.colback_modal').removeClass('hide').addClass('show');

    	/* для маленьких по ширине экранов приклеиваем модальное окно к верху 
    	страницы через css a в js проскролим страницу к началу */
    	if (window.innerHeight < 690) $('html, body').animate({scrollTop: 0},500);
	});

	// показываем feedback при клике по кнопке
	$('#feedback_modal_btn').on('click', function(e){
		$('.modal_background').addClass('show');
    	$('.feedback_modal').removeClass('hide').addClass('show');

    	/* для маленьких по ширине экранов приклеиваем модальное окно к верху 
    	страницы через css a в js проскролим страницу к началу */
    	if (window.innerHeight < 825) $('html, body').animate({scrollTop: 0},500);
	});

	// скрываем модальное окно при клике по крестику
	$('.modal_close').on('click', function(e){
		$('.modal_background').removeClass('show');
    	$(this).parent().removeClass('show').addClass('hide');
	});



	// прокрутить к началу страницы при клике по кнопке стрелка вверх
	$('#go_to_top').on('click', function(e){
		$('html, body').animate({scrollTop: 0},500);
    	return false;
	});
	
	// аккардеон в левом сайдабере
	$('#nav_list a').on("click", function(e) {
		e.stopPropagation();
		e.preventDefault();
		if($(this).next('.submenu').length > 0){ // если есть дочки, то мы в верхнем меню, значит проверяем открыто ли меню или нет
			
			if($(this).next('.submenu').css('display') == 'none'){
				$('.submenu').not($(this).parents('.submenu')).slideUp(300);
				$('.cross-sidebar').not($(this).children('.cross-sidebar')).css({transform:'rotate(-315deg)'});
				$(this).next('.submenu').slideDown(300);
				$(this).children('.cross-sidebar').css({transform:'rotate(0deg)'});
			} else window.location.href = $(this).attr('href');
		} else window.location.href = $(this).attr('href'); // если дочек нет, то сразу переходим по ссылке
	});

	$('.cross-sidebar').on('click',function(e){
		if($(this).parent('a').next('.submenu').css('display') == 'block'){
			e.stopPropagation();
			e.preventDefault();

			$(this).parent('a').next('.submenu').slideUp(300);
			$(this).css({transform:'rotate(-315deg)'});
		}
	});
	
	


	//Эффект расохдящегося круга
	$('.ripple').click(function(e){
		var ink, d, x, y;

		//создаём .ink элемент, если еще не создан
		if ($(this).children('.ink').length == 0){
			$(this).prepend("<span class='ink'></span>");
		}

		//сбрасываем класс отвечаюищй за анимацию
		ink = $(this).children('.ink');
		ink.removeClass('animate'); 
		
		//рассчитываем размеры .ink элемента
		if(!ink.height() && !ink.width()) {
			d = Math.max($(this).outerWidth(), $(this).outerHeight());
			ink.css({height: d, width: d});
		}

		//получим начальные координаты, т.к. центр .ink нужно поместить в точку клика
		x = e.pageX - $(this).offset().left - ink.width()/2;
		y = e.pageY - $(this).offset().top - ink.height()/2;
		//установим координаты и запустим анимацию
		ink.css({top: y+'px', left: x+'px'}).addClass('animate');
	});

	
	
	/* Переключение между описанием и документацией на странице продукта */
	$('.toggle').on('click', 'a', function(e){
		e.stopPropagation();
		e.preventDefault();
		switch($(this).index()){
			case 0:
				$("#prod_descript").fadeIn(0);
				$("#prod_docs").fadeOut(0);
				$(this).attr('class','active');
				$(this).next().removeClass('active');
				break;
			case 1:
				$("#prod_docs").fadeIn(0);
				$("#prod_descript").fadeOut(0);
				$(this).attr('class','active');
				$(this).prev().removeClass('active');
				break;
		}
	});
	
	
	
	
	/* Выбираем значения фильтрации */
	$('.select').on('click', function(e){
		$('.select').not( $(this) ).removeClass('open');
		$('.select').children('div').slideUp(20);
		if($(this).children('div').css('display') == 'none'){
			$(this).addClass('open');
			$(this).children('div').slideDown(100);
		}
		else{
			$(this).removeClass('open');
			$(this).children('div').slideUp(20);
			$(this).children('font').text( $(this).children('div').children('label').children('input[type="radio"]:checked').val() );
		}
	});
	

	
	
	/* Галерея */
	$(function() {
		const speed = 400;
		var img,position = 0,images_box,current,imgW,end=true,indent,indentPrew,startPosPrew=0, finishPosPrew, body_prewie, imgPrevW, prewie, colvo;
		img = $('.body_galary .images a img'); // коллекция картинок
		images_box = $('.body_galary .images'); // блок с картинками
		
		$('.image_galary').append('<div class="body_prewie"></div>'); // добавим контейнер для превью картинок
		for(var i=0; i < img.length; i++){ // добавим картинки в контейнер для превьюшек
			$('.body_prewie').append('<div class="prew"><img src="'+img.eq(i).attr('src')+'"></div>');
		}
		$('.body_prewie .prew').eq(0).attr('class','prew active'); // делаем первое превью активным

		// клик по кнопке вправо
		$( '.right' ).on( 'click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			
			if(end){
				end=false;
				current = parseInt(images_box.css('marginLeft')); // текущее значение маржин лефт блока с картинками
				imgW = parseInt(img.eq(position).css('width')); // ширина активной каритинки
				indent = current - imgW; // куда будем двигать 
				position++;
				
				if(position < img.length){
					images_box.animate({
						marginLeft: indent + 'px'
					}, speed,  function() {end = true;});
				} 
				else{
					position = 0;
					images_box.animate({
						marginLeft: '0px'
					}, speed,  function() {end = true;});
				}
				active_prev(position);
			}
		});
		
		
		// клик по кнопке влево
		$( '.left' ).on( 'click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			
			if(end){
				current = parseInt(images_box.css('marginLeft')); // текущее значение маржин лефт блока с картинками
				imgW = parseInt(img.eq(position).css('width')); // ширина активной каритинки
				indent = current + imgW; // куда будем двигать 
				position--;
				end=false;
				
				if(position == -1){
					indent = parseInt(img.last().css('width')) - parseInt(images_box.css('width'));
					position = img.length -1;
					images_box.animate({
						marginLeft: indent + 'px'
					}, speed,  function() {end = true;});
				} 
				else{
					images_box.animate({
						marginLeft: indent + 'px'
					}, speed,  function() {end = true;});
				}
				active_prev(position);
			}
		});
		
		// функция для подсвечивания превьюшки картинки и смещения контейнера с превью
		function active_prev(pos){
			$('.body_prewie .prew').removeClass('active');
			$('.body_prewie .prew').eq(pos).attr('class','prew active');
			
			prewie = $('.body_prewie .prew img'); // коллекция картинок превьюшек
			body_prewie = parseInt($('.image_galary').css('width')); // ширина блока с превьюшками
			imgPrevW = parseInt(prewie.css('width')); // ширина картинки превьюшки
			colvo = Math.floor(body_prewie / imgPrevW); // количество картинок влезающий в видимую область блока
			finishPosPrew = (startPosPrew + colvo) - 1;
			if (position >= finishPosPrew && position != (prewie.length -1)){
				if((startPosPrew + colvo) < prewie.length){
					++startPosPrew;
					indentPrew = parseInt($('.body_prewie').css('marginLeft')) - imgPrevW;
					$('.body_prewie').animate({
						marginLeft: indentPrew + 'px'
					}, speed);
				}
			}
			if((position - startPosPrew) == 1 || (position - startPosPrew) == 0){
				if(parseInt($('.body_prewie').css('marginLeft')) != 0){
					--startPosPrew;
					indentPrew = parseInt($('.body_prewie').css('marginLeft')) + imgPrevW;
					$('.body_prewie').animate({
						marginLeft: indentPrew + 'px'
					}, speed);
				}
			}
			if(position == 0){ // если последний слайд, двигаем в начало
				startPosPrew = 0;
				$('.body_prewie').animate({
					marginLeft: '0px'
				}, speed);
			}
			if(position == (prewie.length -1)){ // если последний слайд, двигаем в начало
				startPosPrew = (prewie.length - colvo);
				var stepsW = (prewie.length - colvo) * imgPrevW;
				$('.body_prewie').animate({
					marginLeft: '-' + stepsW + 'px'
				}, speed);
			}
		}
		
		// обрабатываем клик по превьюшке
		$( '.body_prewie .prew' ).on( 'click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			
			if(end){
				end=false;
				indent = 0;
				position = $(this).index();
				if(position != 0){
					for(var p = 0; p < position; p++){
						indent = indent - parseInt(img.eq(p).css('width'));
					}
				}
				images_box.animate({
					marginLeft: indent + 'px'
				}, speed,  function() {end = true;});
				active_prev(position);
			}
		});
		
		// клик по кнопке открывать
		$( '.open' ).on( 'click', function(e) {
			e.stopPropagation();
			e.preventDefault();
			img.eq(position).trigger('click'); 
		});
		
	});
	
	
	
	/* Новый слайдер на глваной */
	$(function() {
		const speed = 500;
		var img,
			images_box,
			pictW,
			end=true,
			currentM,
			btnActive = 1,
			imgActive = 1,
			clickPosition,
			stackPosition,
			pictW = 1200, // руками задать необходимую ширину слайдера, иначе в мозиле баг
			pointW = 30, // руками задать необходимую ширину слайдера, иначе в мозиле баг
			pointMarginW = 10; // руками задать необходимую ширину mfrgin справа у копки, иначе в мозиле баг

		
		img = $('.slider_img'); // коллекция картинок
		images_box = $('.images_container'); // блок с картинками

		$('.slider_castom').css('width', pictW + 'px');
		$('.slider_img').css('width', pictW + 'px');/* ширина всех картинок по ширине слайдера */
		$('.images_container').css('width', ( pictW * img.length ) + 'px');/* ширина контейнера для картинок по количеству картинок */

		// добавляем уникальные ид картинкам, что бы при клике по кнопке переходить к картинке с нужным ид
		for(var i=0; i < img.length; i++){
			img[i].id = 'slide_img' + ( i + 1 );
		}
		
		$('.slider_castom').append('<ul class="control_points" id="control_points"></ul>');// добавим контейнер для кнопок переключения слайдов
		for(var i=0; i < img.length; i++){ // добавим кнопки в контейнер
			$('.control_points').append('<li id="btn' + (i + 1) + '"></li>');
		}
		$('.control_points li').eq(0).attr('class','active');// делаем первую кнопку активной
		$('.control_points').css('marginLeft', '-' + (((pointW * $('.control_points li').length) - pointMarginW) / 2) + 'px');// двигаем блок с контролами в цент слайдера

		$('.slider_img:last').prependTo('.images_container '); // после инициализации сразу ставим последню картинку в начало
		currentM = -pictW; // текущее положение (marginLeft) минус ширина одной картинки
		images_box.css('marginLeft',currentM); // ставим текущее положение блока обёртки в минус ширина одной картинки

		// клик по левой кнопке
		$('.slider_castom .left').on('click', function(e){
			slider_left_btn_click();
		});
		
		function slider_left_btn_click(){
			if(end) {
				end=false;
				currentM = currentM + pictW;
				images_box.animate({
					marginLeft: currentM
				}, speed,  function () {
					end = true;
					$('.slider_img:last').prependTo('.images_container');
					currentM = currentM - pictW;
					images_box.css('marginLeft',currentM);
				});

				// переключаем цвет кнопок
				if(btnActive > 1 ) {
					--btnActive;
					--imgActive;
				} 
				else {
					btnActive = img.length;
					imgActive = img.length;
				}
				//активируем нужную кнопку и деактивируем все остальные
				$('.control_points li').removeClass('active');
				$('.control_points #btn' + btnActive).attr('class','active');
			}
		}

		
		// клик по правой кнопке
		$('.slider_castom .right').on('click', function(e){
			
			// для слайдов из двух картинок всегда двигаем вправо
			if (img.length == 2) slider_left_btn_click(); 
			else {
				if(end) {
					end=false;
					currentM = currentM - pictW;
					images_box.animate({
						marginLeft: currentM
					}, speed,  function () {
						end = true;
						$('.slider_img:first').appendTo('.images_container');
						currentM = currentM + pictW;
						images_box.css('marginLeft',currentM);
					});

					// переключаем цвет кнопок
					if(btnActive < ( img.length ) ) {
						++btnActive;
						++imgActive;
					} 
					else {
						btnActive = 1;
						imgActive = 1;
					}
					//активируем нужную кнопку и деактивируем все остальные
					$('.control_points li').removeClass('active');
					$('.control_points #btn' + btnActive).attr('class','active');
				}
			}
		});
		
		
		// обработка клика по контроллеру
		$('.control_points li').on('click', function(e){
			if(end) {
				end=false;
				clickPosition = $(this).attr('id').split('btn')[1];
				stackPosition = $('#slide_img' + clickPosition).index(); // получаем индекс нужной картинки в наборе
				currentM = -stackPosition * pictW;
				
				images_box.animate({
					marginLeft: currentM
				}, speed,  function () {
					end = true;
					
					if (parseInt(images_box.css('marginLeft')) == 0) {
						$('.slider_img:last').prependTo('.images_container');
						currentM = currentM - pictW;
						images_box.css('marginLeft',currentM);
					}
					
					if( ( (img.length - 1) * pictW ) == -parseInt(currentM) ){
						for(var s=2; s < img.length; s++){
							$('.slider_img:first').appendTo('.images_container');
							currentM = currentM + pictW;
							images_box.css('marginLeft',currentM);
						}
					}
					
					btnActive = clickPosition;
					imgActive = clickPosition;
					//активируем нужную кнопку и деактивируем все остальные
					$('.control_points li').removeClass('active');
					$('.control_points #btn' + clickPosition).attr('class','active');
				});
			}
		});
		
	});
	
	
	
	
	
});