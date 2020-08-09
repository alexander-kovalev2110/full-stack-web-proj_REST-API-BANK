<?php
require_once "ORM.php";

// REST for customer
function route($method, $urlData, $paramData) {
  
    $customer = new Customer();
    
    // Анализ URL
    // GET/customer/{name}/{password}      - Login
    if ($method === 'GET' && count($urlData) === 2) {
        $request = array(
            'name' => htmlspecialchars($urlData[0]),
            'pw' => htmlspecialchars($urlData[1])
        );
    
    $response = $customer->getCustomer($request);
    }
    
    // POST/customer/{name}/{password}      - Adding of a customer
    elseif ($method === 'POST' && count($urlData) === 2) {
        $request = array(
            'name' => htmlspecialchars($urlData[0]),
            'pw' => htmlspecialchars($urlData[1])
        );
    
    $response = $customer->addCustomer($request);
    }

    // Returning an error
    else {
        $response = array('message' => 'Bad Request');
    }
    
    echo json_encode($response);
    return;
}
?>