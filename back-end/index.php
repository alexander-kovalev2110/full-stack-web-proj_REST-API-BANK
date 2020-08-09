<?php

// Получение параметров из тела запроса
function getParamData($param) {

    $data = array();                    // Ассоциативный массив с параметрами
    $exploded = explode('&', $param);   // Преобразуем строку с параметрами в массив элементов: имя => значение   
    foreach($exploded as $pair) {
        $item = explode('=', $pair);
        if (count($item) == 2) {
            $data[urldecode($item[0])] = urldecode($item[1]);
        };
    };
    return $data;
}

// Разбираем url
// Структура запроса:     url_adress/method/router/url_data
// Пример: 					.../GET/customer/name/password

$url = (isset($_SERVER['REQUEST_URI'])) ? $_SERVER['REQUEST_URI'] : '';
$url = rtrim($url, '/');        // Удаляем спецсимволы в конце строки, включая последний '/'

// Выделяем из строки запроса параметры, если они есть (.../?{param})
$paramData = array();           // Параметры из тела запроса
$n = strpos($url, '?');
if ($n > 0) {
    $paramData = getParamData(substr($url, $n+1));  // Преобразуем url-подстроку с параметрами в ассоц-ый массив
    $url = substr($url, 0, $n); // url-строка без параметров
    $url = rtrim($url, '/');    // Удаляем последний '/'            
};

$urls = explode('/', $url);     // Преобразуем url-строку в массив url-элементов
if ($urls[0] === '') $urls = array_slice($urls, 1);      //  Удаляем превый элемент, если он пустой

// Определяем метод, роутер и url-data
$method = $urls[1];
$router = $urls[2];
$urlData = array_slice($urls, 3);

// Подключаем файл-роутер и запускаем главную функцию
include_once $router . '.php';	// Файл-роутер: "customer.php" или "trunsaction.php"
route($method, $urlData, $paramData);

?>
