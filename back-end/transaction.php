<?php
require_once "ORM.php";

// REST for Transaction
function route($method, $urlData, $paramData) {
	
    $transaction = new Transaction();
    
    // Анализ URL
    // GET/transaction/{customerId}/{transactionId}     - Getting a transaction:
    if ($method === 'GET' && count($urlData) === 2) {
        $request = array(
            'customerId' => (int)htmlspecialchars($urlData[0]),
            'transactionId' => (int)htmlspecialchars($urlData[1])
        );   
    $response = $transaction->getTransaction($request);
    }

    // GET/transaction/{customerId}                 - Getting transaction by filters:
    elseif ($method === 'GET' && count($urlData) === 1) {
        $request = array(
            'customerId' => (int)htmlspecialchars($urlData[0]),
            'amount' => (float)htmlspecialchars($paramData['amount']),
            'date' => htmlspecialchars($paramData['date'])
        );   
    $response = $transaction->getFiltrTransaction($request);
    }

    // POST/transaction/{customerId}/{amount}      - Adding a transaction:
    elseif ($method === 'POST' && count($urlData) === 2) {
        $request = array(
            'customerId' => (int)htmlspecialchars($urlData[0]),
            'amount' => (float)htmlspecialchars($urlData[1])
        );
    $response = $transaction->addTransaction($request);
    }

    // PUT/transaction/{transactionId}/{amount}      - Updating a transaction:
    elseif ($method === 'PUT' && count($urlData) === 2) {
        $request = array(
            'transactionId' => (int)htmlspecialchars($urlData[0]),
            'amount' => (float)htmlspecialchars($urlData[1])
        );
    $response = $transaction->updateTransaction($request);
    }   

    // DELETE/transaction/{customerId}/{transactionId}      - Deleting a transaction:
    elseif ($method === 'DELETE' && count($urlData) === 2) {
        $request = array(
            'customerId' => (int)htmlspecialchars($urlData[0]),
            'transactionId' => (int)htmlspecialchars($urlData[1])
        );
    $response = $transaction->delTransaction($request);
    }
    
    // Returning an error
    else {
        $response = array('message' => 'Bad Request');
    }
    
    echo json_encode($response);
    return;
}
?>