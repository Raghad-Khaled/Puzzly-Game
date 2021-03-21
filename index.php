<?php
session_start();
$_SESSION["Score"] = 0;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Microprocessor Game</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta1/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-giJF6kkoqNQ00vy+HMDP7azOuL0xtbfIcaT9wjKHr8RbDVddVHyTfAAsrekwKmP1" crossorigin="anonymous">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css">
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="style.css" />
    <link rel="icon" href="images/micro.png">
    <style>

.fullscreen-bg {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  z-index: -100;
}

.fullscreen-bg__video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

    @media (min-aspect-ratio: 16/9) {
    .fullscreen-bg__video {
      height: 300%;
      top: -100%;
    }
  }
  
  @media (max-aspect-ratio: 16/9) {
    .fullscreen-bg__video {
      width: 300%;
      left: -100%;
    }
  }
  @media only screen and (max-width: 767px) {
    
   
    .fullscreen-bg {
        background: url('images/micro.png') center center / cover no-repeat;
      }
    
      .fullscreen-bg__video {
        display: none;
    }
}
    </style>
</head>
<body>
    <!-- Button trigger modal -->
    <div class="fullscreen-bg">
        <video loop muted autoplay  poster="images/micro.png" class="fullscreen-bg__video">
            
            <source src="images/microchip_server_system.mp4" type="video/mp4">
            
        </video>
    </div>

    <div  class="display-1 text-white text-center">
     Puzzly Game
    </div>
    <div class="display-5 m-3 text-white text-center">
   Let's learn some Instructions in Assembly!
    </div>

    <a href="game.php?level=1" role="button"  class="btn btn-light btn-lg" style="margin-left:46%; margin-top: 50px;" >Start</a>

    <p class="text-white text-center font-weight-bold font-italic" style="margin-top: 12%;">
        This game has 10 Levels. In each level you have a mission 
        <br> use the blocks in the buttom to complete the instruction that Do your mession 
        <br> then Hit the red Buttom to get the Acttion for your instruction
        <br>Be carfule you have only 30s to complete the mission    
    </p>


    <audio autoplay controls loop style="display:none" >
  <source src="images/background.mp3" type="audio/mpeg">
</audio>
<!-- <iframe src="https://www.bensound.com/bensound-music/bensound-moose.mp3" allow="autoplay" style="display:none" id="iframeAudio"> </iframe> -->
 

<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<script></script>
</body>
</html>