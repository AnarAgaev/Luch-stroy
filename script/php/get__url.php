<?php 
	/********
		The script take the current url of the user located page
	********/

  $CLIENT__URL = ''; // Пока результат пуст
  $default_port = 80; // Порт по-умолчанию
  // А не в защищенном-ли мы соединении?
  if (isset($_SERVER['HTTPS']) && ($_SERVER['HTTPS']=='on')) {
    // В защищенном! Добавим протокол...
    $CLIENT__URL .= 'https://';
    // ...и переназначим значение порта по-умолчанию
    $default_port = 443;
  } else {
    // Обычное соединение, обычный протокол
    $CLIENT__URL .= 'http://';
  }
  // Имя сервера, напр. site.com или www.site.com
  $CLIENT__URL .= $_SERVER['SERVER_NAME'];
  // А порт у нас по-умолчанию?
  if ($_SERVER['SERVER_PORT'] != $default_port) {
    // Если нет, то добавим порт в URL
    $CLIENT__URL .= ':'.$_SERVER['SERVER_PORT'];
  }
  // Последняя часть запроса (путь и GET-параметры).
  $CLIENT__URL .= $_SERVER['REQUEST_URI'];
  
  $PAGE__URL = $_SERVER['SERVER_NAME'].$_SERVER['REQUEST_URI'];
  
?>