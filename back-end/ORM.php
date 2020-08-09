<?php
require_once "logger.php";

    define('DB_HOST', 'localhost');
    define('DB_USER', 'root');
    define('DB_PASSWORD', '');
    define('DB_NAME', 'phptest');

class ORM {    
    public $db;
    
    public function __construct() {
    $this->db = @new mysqli(DB_HOST, DB_USER, DB_PASSWORD, DB_NAME);
    if ($this->db->connect_errno) exit('DB connection error');
    $this->db->set_charset('utf8');         
    }
}

class Customer extends ORM {
    
    public function __construct() {
        parent::__construct();
    }

    public function addCustomer($request) {		// Adding of a customer
        $name = $request['name'];
        $pw = $request['pw'];

        $query = "INSERT INTO `phptest_customers` (`name`, `pw`)
                                        VALUES ('$name', MD5('$pw'))";
        $this->db->query($query);                                

        $result = $this->db->query("SELECT `customerId` FROM `phptest_customers` 
                            WHERE `name` = '$name' AND `pw` = MD5('$pw')");
        $table = [];
        while (($row = $result->fetch_assoc()) != false) {
            $table[] = $row;
        }
        if ($table[0]['customerId']) {
            $response = array('customerId' => $table[0]['customerId']);
        }
        else
            $response = array('message' => "Customer is already exist");  

        $this->db->close();
        
        $log = new Logger("add_cust");
        $log->setRequest($request);
        $log->setResponse($response);
           
        return $response;
    }
    
    public function getCustomer($request) {     		// Login
        $name = $request['name'];
        $pw = $request['pw'];
       
        $result = $this->db->query("SELECT `customerId` FROM `phptest_customers` 
                            WHERE `name` = '$name' AND `pw` = MD5('$pw')");
        $table = [];
        while (($row = $result->fetch_assoc()) != false) {
            $table[] = $row;
        }
        if ($table[0]['customerId']) {
            $response = array('customerId' => $table[0]['customerId']);
            $this->customerId = $table[0]['customerId'];
        }
        else
            $response = array('message' => "Customer is not exist");
        
        $this->db->close();
        
        $log = new Logger("login");
        $log->setRequest($request);
        $log->setResponse($response);
           
        return $response;        
    }
}

class Transaction extends ORM {
    
    public function __construct() {
        parent::__construct();
    }
    
    public function addTransaction($request) {			// Adding a transaction
        $customerId = $request['customerId'];
        $amount = $request['amount'];
        $time = time();

        $query = "INSERT INTO `phptest_transactions` (`customerId`, `amount`, `date`) 
                        VALUES ('$customerId', '$amount', '$time')";                        
        $this->db->query($query); 
      
        $result = $this->db->query("SELECT `transactionId`, `customerId`, `amount`, `date` 
                    FROM `phptest_transactions` 
                    WHERE `customerId` = '$customerId' AND `amount` = '$amount' AND `date` = '$time'");
        $i = 0;
        $response = [];
        while ($row = $result->fetch_assoc()) {
            $response[$i] = $row;
            $response[$i]['date'] = date("d.m.Y", $response[$i]['date']);
            $i++; 
        };
        if ($i == 0) $response = array('message' => "Transaction is not exist");

        $this->db->close();
        
        $log = new Logger("add_tr");
        $log->setRequest($request);
        $log->setResponse($response);        
        
        return $response; 
    }
    
    public function getTransaction($request) {			// Getting a transaction
        $customerId = $request['customerId'];
        $transactionId = $request['transactionId'];
        
        $result = $this->db->query("SELECT `transactionId`, `customerId`, `amount`, `date` 
                    FROM `phptest_transactions` 
                    WHERE `customerId` = '$customerId' AND `transactionId` = '$transactionId'");   
        $i = 0;
        $response = [];
        while ($row = $result->fetch_assoc()) {
            $response[$i] = $row;
            $response[$i]['date'] = date("d.m.Y", $response[$i]['date']);
            $i++; 
        };
        if ($i == 0) $response = array('message' => "Transaction is not exist");
        
        $this->db->close();
        
        $log = new Logger("get_tr");
        $log->setRequest($request);
        $log->setResponse($response);
        
        return $response;
    }

    public function getFiltrTransaction($request) {		// Getting transaction by filters
        $customerId = $request['customerId'];
        $amount = $request['amount'];
        $date = $request['date'];

        $query = "SELECT `transactionId`, `customerId`, `amount`, `date` 
                    FROM `phptest_transactions` 
                    WHERE `customerId` = '$customerId'";

        if ($amount > 0) {$query .= " AND `amount` = '$amount'";}
        if ($date != "") {$query .= " AND DATE(from_unixtime(`date`)) = DATE('$date')";}

        $result = $this->db->query($query);

        $i = 0;
        $response = [];
        while ($row = $result->fetch_assoc()) {
            $response[$i] = $row;
            $response[$i]['date'] = date("d.m.Y", $response[$i]['date']);
            $i++; 
        };
        if ($i == 0) $response = array('message' => "Transaction is not exist");
        
        $this->db->close();
        
        $log = new Logger("getflt_tr");
        $log->setRequest($request);
        $log->setResponse($response);

        return $response;
    }
    
    public function updateTransaction($request) {		// Updating a transaction
        $transactionId = $request['transactionId'];
        $amount = $request['amount'];
        
        $query = "UPDATE `phptest_transactions` 
                    SET `amount`='$amount' 
                    WHERE `transactionId` = '$transactionId'";
        $this->db->query($query);
        
        $result = $this->db->query("SELECT `transactionId`, `customerId`, `amount`, `date` 
                FROM `phptest_transactions` 
                WHERE `transactionId` = '$transactionId'");
        $i = 0;
        $response = [];
        while ($row = $result->fetch_assoc()) {
            $response[$i] = $row;
            $response[$i]['date'] = date("d.m.Y", $response[$i]['date']);
            $i++; 
        };
        if ($i == 0) $response = array('message' => "Transaction is not exist");
            
        $this->db->close();
        
        $log = new Logger("update_tr");
        $log->setRequest($request);
        $log->setResponse($response);
        
        return $response;
    }
    
    public function delTransaction($request) {				// Deleting a transaction
        $customerId = $request['customerId'];
        $transactionId = $request['transactionId'];

        $query = "SELECT `transactionId`, `customerId`, `amount`, `date` 
                FROM `phptest_transactions` 
                WHERE `customerId` = '$customerId' AND `transactionId` = '$transactionId'";

        $result = $this->db->query($query);
         
        if ($row = $result->fetch_assoc()) {
            $query = "DELETE FROM `phptest_transactions` WHERE `transactionId` = '$transactionId'";

            if ($this->db->query($query))
                $response = array('message' => "success");
            else
                $response = array('message' => "fail");
        }
        else
            $response = array('message' => "Transaction is not exist"); 
        
        $log = new Logger("del_tr");
        $log->setRequest($request);
        $log->setResponse($response);       
        
        $this->db->close();
        
        return $response;
    }
}
?>
