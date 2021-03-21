<?php
session_start();
if($_SESSION['Score']-$_POST['data']>=0){
$_SESSION["Score"] = $_SESSION['Score']-$_POST['data'];
}

?>