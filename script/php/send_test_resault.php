<?php
/* ---------- Данный скрпт отправляет рузультаты заполенного теста на емайл заказчика ---------- */
$EMAIL = 'anar.n.agaev@gmail.com';

if ( isset($_POST['type_of_house']) and 
     isset($_POST['budget']) and 
     isset($_POST['meters']) and
     isset($_POST['warming']) and 
     isset($_POST['foundation']) and
     isset($_POST['present']) and
     isset($_POST['phone']) and
     isset($_POST['mail']) ) {
	
	$type_of_house = htmlspecialchars(strip_tags(trim($_POST['type_of_house'])));
	$budget = htmlspecialchars(strip_tags(trim($_POST['budget'])));
	$meters = htmlspecialchars(strip_tags(trim($_POST['meters'])));
	$warming = htmlspecialchars(strip_tags(trim($_POST['warming'])));
	$foundation = htmlspecialchars(strip_tags(trim($_POST['foundation'])));
	$present = htmlspecialchars(strip_tags(trim($_POST['present'])));
	$phone = htmlspecialchars(strip_tags(trim($_POST['phone'])));
	$mail = htmlspecialchars(strip_tags(trim($_POST['mail'])));
	
	$MESSAGE = "Здравствуйте. Новое сообщение с сайта Ярлуч.рф. Посетитель заполнил тест.\r\n\n";
	$MESSAGE .= "---------------------------------\r\n";
	$MESSAGE .= "Данные из теста:\r\n";
	$MESSAGE .= "Тип постройки : ".$type_of_house."\r\n";
	$MESSAGE .= "Примерный бюджет: ".$budget."\r\n";
	$MESSAGE .= "Примерная полезная площадь: ".$meters."\r\n";
	$MESSAGE .= "Вариант утепления: ".$warming."\r\n";
	$MESSAGE .= "Тип фундамента: ".$foundation."\r\n";
	$MESSAGE .= "Выбранный подарок: ".$present."\r\n";
	$MESSAGE .= "Указанный телефон: ".$phone."\r\n";
	$MESSAGE .= "Указанный адрес электронной почты: ".$mail."\r\n";
	$MESSAGE .= "---------------------------------\r\n\n\n";
	$MESSAGE .= "Не отвечайте на данной сообщение так как оно сформированно автоматически на сервере сайта. Для контакта с посетителем используйте данные из заполненного тест.\r\n\n";
	$SUBJECT = "Сообщение от посетителя сайта Ярлуч.рф";
	$SUBJECT = "=?utf-8?b?". base64_encode($SUBJECT) ."?=";
	$FROM = "Ярлуч.рф";
	$FROM = "=?utf-8?b?". base64_encode($FROM) ."?=";	
	$HEADER = "Content-type: text/plain; charset=utf-8\r\n";
	$HEADER .= "From: ".$FROM."<info@ярлуч.рф>\r\n";
	$HEADER .= "MIME-Version: 1.0\r\n"; 
	$HEADER .= "Date: ".date('D, d M Y h:i:s O'); 
	
	if(mail($EMAIL, $SUBJECT, $MESSAGE, $HEADER)) echo 'true';
	else echo 'false';
}
else echo 'false';	
?>