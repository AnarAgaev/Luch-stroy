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
				if ( false ) {
					alert ("Необходимо выбрать тип постройки!");
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
					$('#win-5').css('display','none');
					$('#win-1').css('display','block');
					







					alert('Тест отправлен. Менеджер связется с Вами в ближайшее время.');
					$('.background-modal').fadeOut(150);
					$('body').toggleClass('lock');
			    	$('#custom-test').toggleClass('show');


				}
				break;
		}
	});
});