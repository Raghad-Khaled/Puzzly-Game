<?php
include 'control.php';  // Using database connection file here

$id=filter_input(INPUT_GET,'level',FILTER_SANITIZE_NUMBER_INT);
$Quation=new Quation;
$result=$Quation->getQuationwithId($id);

$data=mysqli_fetch_assoc($result);

$result2=$Quation->getBlocksforQuation($id);
session_start();
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
</head>

<!-- <div class="progress m-3">
    <div class="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style="width: 75%"></div>
</div> -->

<!-- <div class="fullscreen-bg">
    <video loop muted autoplay  poster="images/background.PNG" class="fullscreen-bg__video">
        
        <source src="images/abstract_line1.mp4" type="video/mp4">
        
    </video>
</div> -->

<section class="container row">
   
     <div class="col-4">
      
         <div class="row">
            <div style="width: 50px; margin-top: 10px;" class="col-4">
            <?php if($id != 10) {?>
                <img src="https://img.icons8.com/cute-clipart/64/000000/<?=$id?>-circle-c.png"/>
                <?php }else{
                   ?>
              <img src="https://img.icons8.com/plasticine/64/000000/10-circled.png"/>
                   <?php }?>
            </div>
        <div style="margin: 20px 0px;" class="col-5 text-white row display-6 justify-content-center border border-white rounded-pill" id="countdown"></div>

        <div class="col-3 font-weight-bold text-center text-white "  style="margin-top: 5px;">
         #Coins  <div class="display-6" id="playerscore"><?=$_SESSION["Score"]?></div>
        </div>
        <!-- <div style=" margin-top: 7px; width: 64px;" class="col-3 text-center font-weight-bold">
            <img  src="https://img.icons8.com/nolan/64/star.png"/>  20
        </div> -->
         </div>

         <div class="row">
        <div style="width: 250px;" class="Quation">
            <img src="https://img.icons8.com/ultraviolet/250/000000/speech-bubble.png"/>
            <div class="centered font-weight-bold"><?=$data['question']?></div>
         </div>
        </div>
       
     </div>
     
        <div class="col-6 ">
           <div class="row answer">
        <div class="divdrop" id="order1" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="divdrop " id="order2" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
        <div class="divdrop" id="order3" ondrop="drop(event)" ondragover="allowDrop(event)"></div>
           </div>
        <div class="answer row">
            <button id="check" type="button" class="btn btn-danger">Check The Instruction</button>
        </div>
       
        </div>
       
        <div class="col-2 ">
            <table class="table  table-info m-3 ">
                <thead>
                  <tr class="text-color">
                    <th scope="col">Regs</th>
                    <th scope="col">value</th>
                  </tr>
                </thead>
                <tbody >
                  <tr class="text-color">
                    <th scope="row">ax</th>
                    <td id="ax"><?=$data['ax']?></td>
                  </tr>
                  <tr class="text-color">
                    <th scope="row">bx</th>
                    <td id="bx"><?=$data['bx']?></td>
                  </tr>
                  <tr class="text-color">
                    <th scope="row">cx</th>
                    <td id="cx"><?=$data['cx']?></td>
                  </tr>
                  <tr class="text-color">
                    <th scope="row">dx</th>
                    <td id="dx"><?=$data['dx']?></td>
                  </tr>
                </tbody>
              </table>
              <div class="answer row" style="margin-left:10px">
                <button type="button" id="Hintbtn" class="btn btn-light btnHint" data-toggle="modal" data-target="#Hint">Hint</button>
                </div>
              
        </div>
</section>
<hr class="hr-dark">
<section>
    <div class="row " id="carry">
  
        
        <div  class="block3"></div>
        <div  class="block3"></div>
        <div   class="block3"></div>
        <div  class="block3"></div>
        <div   class="block3"></div>
        <div  class="block3"></div>
        <div  class="block3"></div>

        <div   class="block3"></div>
        <div  class="block3"></div>
        <div  class="block3"></div>
        <div   class="block3"></div>
        <div  class="block3"></div>
        <div   class="block3"></div>
        <div  class="block3"></div>
        <div  class="block3"></div>
       
    </div>


    <!-- <div  class="row" id="Larrow" style="display: none;" >
        <div class="arrow2 ">
            <img src="https://img.icons8.com/nolan/60/long-arrow-left.png"/>
        </div >
    </div>

    <div  class="row" id="Rarrow" style="display: none;" >
        <div class="arrow2 ">
            <img src="https://img.icons8.com/nolan/60/long-arrow-right--v1.png"/>
        </div >
    </div> -->
<div class="row " id="first">
    
    <div  id="sheftR" style="display: none;">
        <div class="text-center Zerro" >0</div>
        
    </div>
  
    <div  id="Rarrow" style="width: 50px; display: none;">
        <img src="https://img.icons8.com/ultraviolet/40/000000/right3.png"/>
    </div>
    <div   class="block2"></div>
    <div   class="block2"></div>
    <div  class="block2"></div>
    <div   class="block2"></div>
    <div  class="block2"></div>
    <div   class="block2"></div>
    <div  class="block2"></div>
    <div  class="block2"></div>

    <div   class="block2"></div>
    <div   class="block2"></div>
    <div  class="block2"></div>
    <div   class="block2"></div>
    <div  class="block2"></div>
    <div   class="block2"></div>
    <div  class="block2"></div>
    <div  class="block2"></div>
    <div  id="Larrow" style="width: 50px; display: none;">
    <img src="https://img.icons8.com/ultraviolet/40/000000/left3.png"/>
     </div>
    <div  class="arrow">
        <img src="https://img.icons8.com/cute-clipart/50/000000/reply-arrow.png"/>
    </div>
    <div class="block4"></div>
</div>

  <div class="row" id="second">
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>

    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div class="block2"></div>
    <div  class="arrow">
        <img src="https://img.icons8.com/cute-clipart/50/000000/reply-arrow.png"/>
    </div>
    <div class="block4"></div>
  </div>

  <hr id="line" style="display: none;">

  <div class="row" id="third" class="margin-top:10px;">
    <div id="0" class="block2"></div>
    <div id="1" class="block2"></div>
    <div id="2" class="block2"></div>
    <div id="3" class="block2"></div>
    <div id="4"  class="block2"></div>
    <div id="5" class="block2"></div>
    <div id="6" class="block2"></div>
    <div id="7" class="block2"></div>

    <div id="8" class="block2"></div>
    <div id="9" class="block2"></div>
    <div id="10" class="block2"></div>
    <div id="11" class="block2"></div>
    <div id="12" class="block2"></div>
    <div id="13" class="block2"></div>
    <div id="14" class="block2"></div>
    <div id="15" class="block2"></div>
  </div>
</section>


<div class="modal fade" id="Win" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop='static' data-keyboard='false' >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="row" style="width: 70px; margin: auto;" >
            <img src="https://img.icons8.com/office/16/000000/checked-checkbox--v2.gif"/> 
            </div>
        <div class="modal-header justify-content ">
          <h5 class="modal-title" style="margin-left: 190px;" id="exampleModalLongTitle">Greet job</h5>
        
          </button>
        </div>
        <?php if($id==10){?>
        <div class="modal-body">
          You Earned 10 Coins ,Go To See Your Score
        </div>
        <div class="modal-footer">
         
          <a type="button" href="gameover.php" role="button" id="winbutton" class="btn btn-primary">Show Score</a>
        </div>
       <?php } else{ ?>

        <div class="modal-body">
          You Earned 10 Coins ,Go to the Next Level
        </div>
        <div class="modal-footer">
         
          <a type="button" href="uplevel.php?level=<?=$id+1?>" role="button" id="winbutton" class="btn btn-primary">Next Level</a>
        </div>

        <?php } ?>

      </div>
    </div>
  </div>


  <div class="modal fade" id="Wrong" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop='static' data-keyboard='false' >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="row" style="width: 70px; margin: auto;" >
            <img src="https://img.icons8.com/emoji/48/000000/cross-mark-emoji.png"/>
            </div>
        <div class="modal-header justify-content ">
          <h5 class="modal-title" style="margin-left: 50px;" id="exampleModalLongTitle">This Instruction didn't Do what was required</h5>
        
          </button>
        </div>
        <div class="modal-body">
          You Lose 3 Coins, Try it Again.
        </div>
        <div class="modal-footer">
         
          <button type="button" id="Wrongbtn" class="btn btn-primary">Try Again</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="Long" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop='static' data-keyboard='false' >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="row" style="width: 70px; margin: auto;" >
            <img src="https://img.icons8.com/color/48/000000/error--v3.gif"/>
            </div>
        <div class="modal-header justify-content ">
          <h5 class="modal-title" style="margin-left: 150px;" id="exampleModalLongTitle">Constant Too Long</h5>
        
          </button>
        </div>
        <div class="modal-body">
            You Lose 5 Coins, Try it Again.
        </div>
        <div class="modal-footer">
         
          <button id="Longbtn" type="button" class="btn btn-primary">Try Again</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="Illegal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop='static' data-keyboard='false' >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="row" style="width: 70px; margin: auto;" >
            <img src="https://img.icons8.com/dusk/50/000000/error.png"/>
            </div>
        <div class="modal-header justify-content ">
          <h5 class="modal-title" style="margin-left: 150px;" id="exampleModalLongTitle">Illegal Instruction</h5>
        
          </button>
        </div>
        <div class="modal-body">
            You Lose 7 Coins, See The Hint it may Help
        </div>
        <div class="modal-footer">
         
          <button type="button" id="Illbtn" class="btn btn-primary">Try Again</button>
        </div>
      </div>
    </div>
  </div>

  <div class="modal fade" id="Time" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true" data-backdrop='static' data-keyboard='false' >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <div class="row" style="width: 70px; margin: auto;" >
            <img src="https://img.icons8.com/dusk/64/000000/alarm-clock--v2.gif"/>
            </div>
        <div class="modal-header justify-content ">
          <h5 class="modal-title" style="margin-left: 180px;" id="exampleModalLongTitle">Time Out</h5>
           
        </div>
        <div class="modal-body">
            You Lose 7 Coins, pls Be Faster
        </div>
        <div class="modal-footer">
         
          <button type="button" id="Timebtn" class="btn btn-primary">Try Again</button>
        </div>
      </div>
    </div>
  </div>



  <div class="modal fade" id="Hint" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true"  >
    <div class="modal-dialog modal-dialog-centered" role="document">
      <div class="modal-content">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        <div class="row" style="width: 70px; margin: auto;" >
            <img src="https://img.icons8.com/cute-clipart/100/000000/hint.png"/>
        </div>
        <div class="modal-header justify-content ">
          <h5 class="modal-title" style="margin-left: 210px;" id="exampleModalLongTitle">Hint</h5>
          
        </div>
        <div class="modal-body">
           <?=$data['hint']?>
           <?php if($data['image']) {?>
           <img  width="400px" src="images/<?=$data['image']?>"/>
           <?php } ?>
        </div>
        <div class="modal-footer">
            You Lose 2 Coins, Harry Up.
         
        </div>
      </div>
    </div>
  </div>

<section id="ans"  style="display: none;" >
<div><?=$data['answer']?></div>
</section>

 <section class="Slidersection">
    <div class="row">
        <div class="col">
           
            <div id="test-slider2" class="slider carousel slide" data-ride="carousel">
                <!-- Indicators -->
                <!-- <ol class="carousel-indicators">
                    <li data-target="test-slider2" data-slide-to="0"></li>
                    <li data-target="test-slider2" data-slide-to="1"></li>
                    <li data-target="test-slider2" data-slide-to="2"></li>
                    <li data-target="test-slider2" data-slide-to="3"></li>
                </ol> -->
    
                <!-- Wrapper for slides -->
                <div class="carousel-inner" role="listbox">
                    
                <?php
                 while($block = mysqli_fetch_array($result2))  
                 {
                ?>
                    <div id="div1" class="carousel-item"  ondrop="drop(event)" ondragover="allowDrop(event)">    
                       <div class="block"  draggable="true" ondragstart="drag(event)" id="drag+<?=$block['ID']?>" ><?=$block['content']?></div>
                    </div>
              <?php }?>
                    <!-- <div id="div1" class="carousel-item"  ondrop="drop(event)" ondragover="allowDrop(event)">    
                        <div class="block"  draggable="true" ondragstart="drag(event)" id="drag2" >0AAAAH</div>
                    </div>

                    <div id="div1" class="carousel-item"  ondrop="drop(event)" ondragover="allowDrop(event)">    
                        <div class="block"  draggable="true" ondragstart="drag(event)" id="drag3" >DH,</div>
                    </div>

                    <div id="div1" class="carousel-item"  ondrop="drop(event)" ondragover="allowDrop(event)">    
                        <div class="block"  draggable="true" ondragstart="drag(event)" id="drag4" >1H</div>
                    </div>

                    <div id="div1" class="carousel-item"  ondrop="drop(event)" ondragover="allowDrop(event)">    
                        <div class="block"  draggable="true" ondragstart="drag(event)" id="drag5" >4</div>
                    </div> -->
                </div>
    
                <!-- Controls -->
                 <a class="carousel-control-prev" href="#test-slider2" role="button" data-slide="prev">
                  <i class="fa fa-chevron-left" style="background-color:white;" aria-hidden="true"></i>
                  <span class="sr-only">Previous</span>
                </a>
                <a class="carousel-control-next"  href="#test-slider2" role="button" data-slide="next">
                  <i class="fa fa-chevron-right" style="background-color:white;" aria-hidden="true"></i>
                  <span class="sr-only">Next</span>
                </a>
            </div>
        </div>
    </div>
</section>

<script src="https://code.jquery.com/jquery-3.2.1.min.js" ></script>
<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
<script type="text/javascript" src="script.js" data-manualInit="true" data-indicatorLinks="false" data-itemInFocus="2" data-interval="2000"></script>

<script type="text/javascript">
slider.init('test-slider1');
slider.init('test-slider2',{'itemInFocus': 1,'indicatorLinks': 'true'});

document.getElementById('Timebtn').addEventListener('click',()=>{
$.post("setsession.php",{data : 7});
location.reload();
});

document.getElementById('Longbtn').addEventListener('click',()=>{
$.post("setsession.php",{data : 5});
location.reload();
});

document.getElementById('Illbtn').addEventListener('click',()=>{
$.post("setsession.php",{data : 7});
location.reload();
});

document.getElementById('Wrongbtn').addEventListener('click',()=>{
$.post("setsession.php",{data : 3});
location.reload();
});

document.getElementById('Hintbtn').addEventListener('click',()=>{
$.post("setsession.php",{data : 2});
let S=document.getElementById('playerscore').textContent;
if(parseInt(S)-2>=0){
document.getElementById('playerscore').textContent=parseInt(S)-2;
}
});

</script>
</body>
</html>

