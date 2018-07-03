$(document).ready(function(){ 

	// показываем тест при клике по кнопкам
	$('#fulfill_dream, #get_sale').on('click', function(e){
		$('.background-modal').fadeIn(150);
		$('body').toggleClass('lock');
    	$('#custom-test').toggleClass('show');
	});

	// валидация формы и отправка аяксом на почту
	$('.right-side_button').on('click', function(e){
		switch ( $(this).attr('id') ) {
			case 'btn-1':
				if ( $('#win-1 input[type="radio"]:checked').val() === undefined ) {
					alert ("Необходимо выбрать тип постройки!");
				}
				else {
					$('#win-1').css('display','none');
					$('#win-2').css('display','block');
				}
				break;

			case 'btn-2':
				if ( $( "#amount" ).val() == '100000 руб.') {
					alert ("Необходимо указать примерный бюджет!");
				}
				else if ( $( "#sqr" ).val() == '10 м2') {
					alert ("Необходимо указать полезную площадь!");
				}
				else {
					$('#win-2').css('display','none');
					$('#win-3').css('display','block');
				}
				break;

			case 'btn-3':
				if ( $('#win-3 input[type="radio"]:checked').val() === undefined ) {
					alert ("Необходимо выбрать вариант утепления!");
				}
				else {
					$('#win-3').css('display','none');
					$('#win-4').css('display','block');
				}
				break;

			case 'btn-4':
				if ( $('#win-4 input[type="radio"]:checked').val() === undefined ) {
					alert ("Необходимо выбрать тип фундамента!");
				}
				else {
					$('#win-4').css('display','none');
					$('#win-5').css('display','block');
				}
				break;

			case 'btn-5':
				if ( $('#win-5 input[type="radio"]:checked').val() === undefined ) {
					alert ("Пожалуйста выберите подарок!");
				}
				else if ( $('#phone').val() == "" ) {
					alert ("Пожалуйста укажите Ваш телефон!");
					$('#phone').focus();
				}
				else if ( $('#mail').val() == "" ) {
					alert ("Необходимо указать адрес электронной почты!");
					$('#mail').focus();
				}
				else {

					$.ajax({
						type: "POST",
						cache: false ,
						url: "/script/php/send_test_resault.php",
						data: {	type_of_house: $('input[name=type-of_house]:checked').val(), // тип дома 
								budget : $( '#amount' ).val(), // примерная стоимость
								meters : $( '#sqr' ).val(), // примерная площадь
								warming: $('input[name=warming]:checked').val(), // тип утепления
								foundation: $('input[name=type-of_foundation]:checked').val(), // тип фундамента
								present: $('input[name=present]:checked').val(), // выбринный подарок
								phone: $('#phone').val(), // телефон
								mail: $('#mail').val() // мэйл
							  },
						dataType: "text",
						async: true,
						success: function(data){
							if(data == 'true'){
								$('#win-5').css('display','none');
								$('#win-1').css('display','block');
								alert('Тест отправлен. Менеджер связется с Вами в ближайшее время.');
								$('.background-modal').fadeOut(150);
								$('body').toggleClass('lock');
						    	$('#custom-test').toggleClass('show');

								type_of_house: $('input[name=type-of_house]').prop('checked', false); // тип дома
								$( '#amount' ).val('100000 руб.'); // примерная стоимость
								$( '#sqr' ).val('10 м2'); // примерная площадь
								$('input[name=warming]').prop('checked', false); // тип утепления
								$('input[name=type-of_foundation]').prop('checked', false); // тип фундамента
								$('input[name=present]').prop('checked', false); // выбринный подарок
								$('#phone').val(''); // телефон
								$('#mail').val(''); // мэйл
							}
							else alert('К сожалению во время отправки резульатов теста произошла ошибка. Повторите попытку немного позже');
						}
					});
				}
				break;
		}
	});

	// скролл для примерная стоимость
	$( function() {
		$( "#slider-amount" ).slider({
		  range: "min",
		  value: 100000,
		  min: 100000,
		  max: 3000000,
		  slide: function( event, ui ) {
		    $( "#amount" ).val( ui.value + " руб.");
		  }
		});
		$( "#amount" ).val($( "#slider-amount" ).slider( "value" ) + " руб.");
	} );

	// скролл для примерная площадь
	$( function() {
		$( "#slider-sqr" ).slider({
		  range: "min",
		  value: 10,
		  min: 10,
		  max: 250,
		  slide: function( event, ui ) {
		    $( "#sqr" ).val( ui.value + " м2");
		  }
		});
		$( "#sqr" ).val($( "#slider-sqr" ).slider( "value" ) + " м2");
	} );

});



