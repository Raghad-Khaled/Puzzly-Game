

<?php


require('Database.php');

class Quation
{
  private $_conn;

  public function __construct()
  {
    $DB_opt = Database::getInstance();
    $this->_conn = $DB_opt->getConnection();
  }


  
  public function getBlocksforQuation($id){
    $qury = "SELECT content,ID FROM `blocks`,`conn` where blockid=ID and gameid=$id";
    //echo $qury;
    return $result = mysqli_query($this->_conn, $qury);
  }

  public function getQuationwithId($id){
    $qury = "SELECT * FROM game WHERE ID =$id";
    //echo $qury;
    return $result = mysqli_query($this->_conn, $qury);
  }

  

}


?>