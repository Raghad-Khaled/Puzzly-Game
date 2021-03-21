<?php

class Database {
	private $_connection;
	private static $_instance; //The single instance
	private $_host = "localhost";
	private $_username = "root";
	private $_password = "";
	private $_database = "micro";
	//private $_username = "id15997440_raghad";
	//private $_password = "r0Us|b>p>[y4Y<ee";
	//private $_database = "id15997440_micro";


	/*
	Get an instance of the Database
	@return Instance
	*/
	public static function getInstance() {
		if(self::$_instance === null) { // If no instance then make one
			self::$_instance = new self();
		}
		return self::$_instance;
	}

	// Constructor
	private function __construct() {
		$this->_connection = new mysqli($this->_host, $this->_username,$this->_password, $this->_database);
		
		// Error handling
		$data=$this->_connection;
		//var_dump( $data);
		if(mysqli_connect_error()) {
			trigger_error("Failed to conencto to MySQL: " .mysqli_connect_error(),E_USER_ERROR);
		}
		
	}


	// Get mysqli connection
	public function getConnection() {
		return $this->_connection;
	}
}

?>