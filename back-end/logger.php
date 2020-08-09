<?php

// Creating a log file - log.txt 
// Format: date,transaction_name,request,response
// Example: {"date":23.07.2020.11:32:58,"transaction":add_cust,"request":{"name":"Sid","pw":"Sid"},"response":{"customerId":"17"}}  
class Logger {
    public $lg;
    public $row = '';
    
    public function __construct($transaction) {
        $this->lg = fopen('log.txt', 'a');
        $this->row = '{"date":'.date("d.m.Y.H:i:s", time()).      // { Date
                      ',"transaction":'.$transaction.',';         // , Transaction ,
    }
    
    public function setRequest($request) {
        $this->row .= '"request":'.json_encode($request).',';     // {Request} ,
    }   

    public function setResponse($response) {
        $this->row .= '"response":'.json_encode($response)."}\n"; // {Response} } \n
        fwrite($this->lg, $this->row);  
        fclose($this->lg);
    }    
}
?>