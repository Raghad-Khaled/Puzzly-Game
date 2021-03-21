<?php
session_start();
$_SESSION['Score']=$_SESSION['Score']+10;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <title>Microprocessor Game</title>
    <link rel="icon" href="images/micro.png">
    <style>
        body{
    background-image: url("images/win.jpg");
    /* Set a specific height */
    min-height: 550px; 
  
    /* Create the parallax scrolling effect */
    background-attachment: fixed;
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    justify-content: center;
}
.center {
position: absolute;
top: 60%;
transform: translate(-50%, -50%);
color:  #f4d779;
margin-left:50%;
width:400px;

}
.center2 {
position: absolute;
top: 90%;
transform: translate(-50%, -50%);
color:  #f4d779;
margin-left:50%;
width:400px;

}
.center2 a{
    color: #f4d779;
}
    </style>
</head>
<body>
    <div class="container center text-center"  >
        <div class ="" >
            <img src="https://img.icons8.com/fluent/100/000000/stack-of-coins.png"/>
        </div>
        <div class =" display-4" >
           <?=$_SESSION['Score'] ?>
        </div>
        
    </div>

    <div class="container center2 text-center"  >
        
        <a  href="index.php" class=" display-6">
         Play Again 
        </a>
    </div>
    <audio autoplay controls loop style="display:none" >
  <source src="images/background.mp3" type="audio/mpeg">
</audio>
    
</body>
</html>