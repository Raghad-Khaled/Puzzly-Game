var slider = (function() {
    /* Setup some defaults */
    var windowTransitionSize = 1028;
    var winSize = windowSize();
    var manualInit = false;

    /* Setup a global variable determining whether auto-advancing sliders should
    preceed. The only time they won't, is on hover. */
    var shouldAdvance = true;

    // Setup default class names
    var itemClass = ".carousel-item";

    /* Options that can only be set when the src call is made via 'data-'
     * options. */
    var dataOnlyOptions = {
        'manualInit': 'data-manualInit',
    };
    var validOptions = {
        'numActiveItems': 'data-activeItems',
        'indicatorLinks': 'data-indicatorLinks',
        'itemInFocus': 'data-itemInFocus',
        'interval': 'data-interval',
    };
    var options = {
        'default': {
            'indicatorLinks': true,
            'itemInFocus': 1,
            'numActiveItems':  5,
            'interval': 3000
        },
    };

    /* Parse the script params and set the defaults. */
    getScriptParams();

    /* Initialize each slider on the page once the page finishes loading. */
    $(document).ready(function() {
        if(! manualInit) {
            var list = $(".slider");
            if($(list).length > 1) {
                $(list).each(function(){
                    initializeSlider($(this).attr('id'));
                });
            } else {
                initializeSlider($($('.slider')[0]).attr('id'));
            }
        }
    });

    /* Get the item currently in focus for a specific sliderID. */
    function focusedItemIndex(sliderID) {
        return options[sliderID].indexOfFocusedItem;
    }

    /* Initialize a slider by setting up default values, displaying the slider,
     * and adding click listeners for each control method. */
    function initializeSlider(id,opts) {
        /* An ID must be provided. Return here if it isn't. */
        if(! id) {
            console.log("The slider class and an id must be set for the slider!");
            return;
        }

        /* Set options for this slider. If no options or invalid options are
         * provided, use the defaults. */
        setOptions(id,opts);

        /* Hide the controls if the total number of items is less than the
         * number of items to be displayed. */
        if(options[id].numActiveItems >= $(`#${id} ${itemClass}`).length && windowSize()) {
            $(`#${id} .carousel-control-prev`).hide();
            $(`#${id} .carousel-control-next`).hide();
        }

        /* Set the index if one of the items has the sliderFocus CSS class */
        var idx = $('#'+id+' .sliderFocus').index();
        if(idx < 0) {
            idx = 0;
        }

        /* Setup the slider */
        changeSlider(idx,id);

        /* Create click listeners for the slider controls, each item in the
         * slider and optionally for the indicators. */
        controlsListeners(id);
        itemListener(id);
        if(options[id].indicatorLinks) {
            addIndicatorListeners(id);
        }
        
        /* If the slider has the class of "slide", the user wants the slider to
        automatically increment every interval. */
        if($("#"+id).hasClass("slide")) {
            setupAutoSlide(id); 
        }
    }
    /* Change the number of visible items in the slider on
     * window resize if necessary */
    window.onresize = function() {
        var newWinSize = windowSize();
        if(newWinSize != winSize) {
            var list = $(".slider");
            if($(list).length > 1) {
                $(list).each(function(){
                    changeSlider(0,$(this).attr('id'));
                });
            } else {
                changeSlider(0);
            }
            winSize = ! winSize;
        }
    };

    /* Setup a slider to automatically advance. */
    function setupAutoSlide(sliderID) {
        /* Pause auto advance if the user hovers over the slider. */
        $(`#${sliderID}`).hover(() => { shouldAdvance = false},() => { shouldAdvance = true; });

        /* Setup an interval to automatically advance except on hover. */
        setInterval(() => {
           if(shouldAdvance) { 
            changeSlider('+',sliderID);
           }
        },options[sliderID].interval);
    }

    /* Parse input and override defaults if the caller specifies values */
    function getScriptParams() {
        var scriptOpts = {};
        var scripts = document.getElementsByTagName('script');
        var scriptName  = scripts[scripts.length-1];

        /* Override any defaults for values that can only be set globally via
         * the 'data-' calls and not on a per slider basis. */
        for(opt in dataOnlyOptions) {
            var attr = $(scriptName).attr(dataOnlyOptions[opt]);
            if (typeof attr !== typeof undefined && attr !== false) {
                    if(attr === 'true') {
                        eval(opt+'='+true);
                    } else {
                        eval(opt+'='+false);
                    }
            }
        }

        /* Define each option that can be called via the 'data-' calls or at
         * slider initialization in order to setup the default values. */
        for(opt in validOptions) {
            scriptOpts[opt] = $(scriptName).attr(validOptions[opt]);
        }
        setOptions('default',scriptOpts);
    }

    function setOptions(id,opts) {
        if(! id) return;
        var myOpts = opts || {};

        /* Initialize the options object entry for this id if it isn't already
         * defined. */
        if(! options[id]) {
            options[id] = {};
        }

        /* Cycle through each valid option and see if it has been overridden by
         * a user specified value */
        for(opt in validOptions) {
            var attr = myOpts[opt];
            if (typeof attr !== typeof undefined && attr !== false) {
                if(attr === 'false') {
                    options[id][opt] = false;
                } else {
                    if(opt == 'numActiveItems') {
                        if(! Number.isInteger(parseInt(attr))) {
                            attr = 3;
                        } else {
                            attr = parseInt(attr);
                        }
                    } else if(opt == 'itemInFocus') {
                        if(! Number.isInteger(parseInt(attr)) || attr > options[id].numActiveItems || attr < 1) {
                            attr = 1;
                        } else {
                            attr = parseInt(attr);
                        }
                    }
                    options[id][opt]= attr;
                }
            } else {
                /* Use the default if another value isn't specified. */
                options[id][opt] = options['default'][opt];
            }
        }
    }

    /* Setup a click listener for slider controls.*/
    function controlsListeners(sliderID) {
        $('#'+sliderID+' .carousel-control-prev').click(function(event) {
            /* Stop the click from doing the default action. */
            event.preventDefault();
            event.stopPropagation();
            changeSlider('-',sliderID);
        });

        $('#'+sliderID+' .carousel-control-next').click(function(event) {
            /* Stop the click from doing the default action. */
            event.preventDefault();
            event.stopPropagation();
            changeSlider('+',sliderID);
        });
    }

    /* Setup a click listener for each item so if a user clicks on it, it 
     * becomes the item in focus. */
    function itemListener(sliderID) {
        $('#'+sliderID+' .carousel-inner').on('click',itemClass,function(event) {
            /* Stop the click from doing the default action. */
            event.preventDefault();
            event.stopPropagation();

            var openLinkDelay = 600;
            var openNewWindow = false;

            /* Determine where in the list of items we are */
            var index = $(this).index();

            /* Determine the number of items and the number of items that are
             * permanent. These may be different because temporary items are
             * added to the list so the slider will appear continuous. */
            var len = $(`#${sliderID} .carousel-inner ${itemClass}`).length;
            var absLen = $(`#${sliderID} .carousel-inner ${itemClass}`).not('.start-temp').not('.end-temp').length;

            /* If the absolute length is different than the current length (i.e.
             * if there are temporary items right now) */
            if(absLen < len) {
                /* Get the number of items that were temporarily added to the end. We
                 * need this to adjust the index. */
                var numEndTemp = len - $(`#${sliderID} .carousel-inner ${itemClass}`).not('.start-temp').length;

                /* Adjust the index location if there were extra items added to 
                 * the end.*/
                index = index - (numEndTemp);

                /* Update the index to reflect the actual location of the item if a
                 * temporary item was clicked on. */
                if($(this).hasClass('start-temp')) {
                    index = len - numEndTemp  + index;
                }
                else if($(this).hasClass('end-temp')) {
                    index = index - absLen;
                }
            }

            /* If the item has a link defined, set the url variable so it can be followed */
            if($(this).attr('data-href') !== null) {
                var url = $(this).attr('data-href');
                if($(this).hasClass('focused')) {
                    openLinkDelay = 0;
                }
                if($(this).attr("target") === "_blank") {
                    openNewWindow = true;
                }
            }

            /* Update the item in focus */
            changeSlider(index,sliderID);

            /* If the item has a link attached to it, follow it. If the item wasn't
             * previously in focus, follow the link after a short delay to allow
             * the item to come into focus. */
            if(url) {
                setTimeout(function(){
                    /* If the user set target="_blank", open the link in a new window. */
                    if(openNewWindow) {
                        window.open(url);
                    } else {
                        window.location.href = url
                    }
                },openLinkDelay);
            }
        });
    }

    /* Add a click listener for indicators */
    function addIndicatorListeners(id) {
        if(id) {
            var sliderID = id;
        } else {
            var sliderID = $($('.slider')[0]).attr('id');
        }
        $('#'+sliderID+' .carousel-indicators li').click(function(event) {
            /* Stop the click from doing the default action. */
            event.preventDefault();
            event.stopPropagation();

            /* Get the slider ID to use to change the item in focus */
            changeSlider($(this).index(),sliderID);
        });
    }
    /* Return 1 if the window size is larger than the transition size, 
     * 0 otherwise. */
    function windowSize() {
        return $(window).width() > windowTransitionSize ? 1: 0;
    }

    /* Slider javascript */ 
    function changeSlider(num,sliderID) {
        /* Only change the slider if the number and slider are defined. */
        if(num == null || sliderID == null) return;

        var sliderItem = `#${sliderID} ${itemClass}`;
        var controls   = ['#'+sliderID+' .carousel-control-prev','#'+sliderID+' .carousel-control-next'];
        var indicators = '#'+sliderID+' .carousel-indicators';
        var inner      = '#'+sliderID+' .carousel-inner';

        /* Define the focused item for future use */
        var activeItem = sliderItem+'.active.focused';

        /* Get the number of items. */
        var len = $(sliderItem).not('.start-temp').not('.end-temp').length;

        /* Define the offset */
        var offset = function() {
            if(len < options[sliderID].numActiveItems) {
                return 0;
            } else {
                return 1 - options[sliderID].itemInFocus;
            }
        };

        /* Save the current scroll position to restore it later. */
        var y = window.pageYOffset;

        /* Remove temporary items from the slider */
        $(sliderItem).remove('.start-temp');
        $(sliderItem).remove('.end-temp');

        /* Set the active slide number if only told to increment/decrement. Have to
         * do this here before the focused class is removed from the previously
         * selected element. */
        if(num == '-') {
            num = $(activeItem).index() -1;
        } else if(num == '+') {
            num = $(activeItem).index() +1;
        }

        /* Reset the style for the previous slider item */
        $(activeItem).removeClass('focused');

        /* Set the current item to wrap around if necessary */
        if(num < 0) {
            num = len + num;
        } else if(num >= len) {
            num = num - len;
        }

        /* Hide the controls if there is only one item. */
        if(len == 1) {
            controls.forEach(control => $(control).hide());
        }

        /* Set the correct indicator to active */
        $(indicators).find('li').removeClass('active');
        $(indicators).find('li').eq(num).addClass('active');

        /* Deactivate all items */
        $(sliderItem).removeClass('active');

        /* If the window size is greater than or equal to windowTransitionSize, activate the correct number of items */
        if($( window ).width() >= windowTransitionSize) {
            var prepend = [];
            for(var i = offset(); i < options[sliderID].numActiveItems + offset() ; i++) {
                var imgNum = (num + i);
                if(i >= len) {
                    break;
                }
                if(imgNum < 0) {
                    prepend.push($(sliderItem).not('.start-temp').eq(imgNum + len).clone().addClass('start-temp active'));
                } else if(imgNum < len ) {
                    $(sliderItem).not('.start-temp').eq(imgNum).addClass('active');
                    if(prepend.length > 0) {
                        prepend.reverse();
                        $(prepend).each(function(index) {
                            $(prepend[index]).prependTo(inner);
                        });
                        prepend = [];
                    }
                } else if(imgNum == len) {
                    if(len > options[sliderID].numActiveItems -1) {
                        $(sliderItem).eq(imgNum % len).clone().appendTo(inner);
                        $(sliderItem).eq($(sliderItem).length - 1).addClass('end-temp active');
                    } else {
                        $(sliderItem).not('.start-temp').eq(imgNum % len).addClass('active');
                    }
                } else {
                    /* if imgNum > len */
                    $(sliderItem).eq(imgNum % len).clone().appendTo(inner);
                    $(sliderItem).eq($(sliderItem).length - 1).addClass('active end-temp');
                }
            }
            /* If the window size is less than windowTransitionSize, activate 1 item */
        } else {
            $(sliderItem).eq(num).addClass('active');
        }

        /* Add the focused class to the current item. */
        $(sliderItem).not('.start-temp').eq(num).addClass('focused');

        /* Save off the item index currently in focus */
        options[sliderID].indexOfFocusedItem = num;

        /* Trigger the changeSlider custom event. */
        $('#'+sliderID).trigger("changeSlider");

        /* Scroll to the initial Y position */
        window.scrollTo(0, y);
    }
    /* Make the initialize function and current item index function publicly
     * available via the module.init call. */
    return {
        init: initializeSlider,
        focusedItemIndex: focusedItemIndex,
    };
})();
//////////////////////////////////////////////////

let clicked=false;
var seconds = 30;
var timing = setInterval(
  function () {
      if(!clicked){
    seconds=seconds-1;
      
    
      if(seconds<=0){
        $("#Time").modal('show');
        clicked=true;
    }

    if (seconds < 10 && seconds>0) seconds="0"+seconds;

    
}
    document.getElementById("countdown").innerHTML =  seconds + " s"; // putting number of days, hours, minutes and seconds in div, 
  }, 1000);
///////////////  

function allowDrop(ev) {
    ev.preventDefault();
}
  
  function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}
  
  function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}
///////ADD///////
function halfAdder(a, b){
    const sum = xor(a,b);
    const carry = and(a,b);
    return [sum, carry];
  }
  function fullAdder(a, b, carry){
    halfAdd = halfAdder(a,b);
    const sum = xor(carry, halfAdd[0]);
    carry = and(carry, halfAdd[0]);
    carry = or(carry, halfAdd[1]);
    return [sum, carry];
  }
  function xor(a, b){return (a === b ? 0 : 1);}
  function and(a, b){return a == 1 && b == 1 ? 1 : 0;}
  function or(a, b){return (a || b);}

  function addBinary(a, b){

    let sum = '';
    let carry = '';
  
    for(var i = a.length-1;i>=0; i--){
      if(i == a.length-1){
        //half add the first pair
        const halfAdd1 = halfAdder(a[i],b[i]);
        sum = halfAdd1[0]+sum;
        carry = halfAdd1[1];
      }else{
        //full add the rest
        const fullAdd = fullAdder(a[i],b[i],carry);
        sum = fullAdd[0]+sum;
        carry = fullAdd[1];
      }
    }
  
    return carry ? carry + sum : sum;
  }
////////////////
function getVal(str){
    let reges=str.toLowerCase();
    document.getElementById('first').getElementsByClassName("block4")[0].style.display="block"; //Show the arrow and the register in block4
    
    document.getElementById('first').getElementsByClassName("arrow")[0].style.display="block";
    let firstlet=reges.slice(0, 1);
    regname=String(firstlet+"x");   
    let regvalue=document.getElementById(regname);
    let result= regvalue.innerHTML
    if(reges.slice(1, 2)=='h'){

    document.getElementById('first').getElementsByClassName("block4")[0].innerHTML=reges+"="+result.slice(0, 2)+'H';
    
     let bin= hex2bin8(result.slice(0, 2));
     show8(bin,'first');
     return [0,bin];
    }
    else if(reges.slice(1, 2)=='l'){
        
        document.getElementById('first').getElementsByClassName("block4")[0].innerHTML=reges+"="+result.slice(2, 4)+'H';

        let bin= hex2bin8(result.slice(2,4));
        show8(bin,'first');
        return [0,bin];
    }
    else{
        document.getElementById('first').getElementsByClassName("block4")[0].innerHTML=reges+"="+result+'H';
        let bin= hex2bin16(result);
        show16(bin,'first');
        return [1,bin];
    }
}

function hex2bin8(hex){
    return ("00000000" + (parseInt(hex, 16)).toString(2)).substr(-8);
}

function hex2bin16(hex){
    return ("0000000000000000" + (parseInt(hex, 16)).toString(2)).substr(-16);
}
function show8(binarynum,blockid){
    for(let i=0;i<8;i++){
        document.getElementById(blockid).getElementsByClassName("block2")[i].style.display="block";
        document.getElementById(blockid).getElementsByClassName("block2")[i].textContent=binarynum.slice(i,i+1)
    }
}

function show16(binarynum,blockid){
    for(let i=0;i<16;i++){
        document.getElementById(blockid).getElementsByClassName("block2")[i].style.display="block";
        document.getElementById(blockid).getElementsByClassName("block2")[i].textContent=binarynum.slice(i,i+1)
    }
}

var SuperOP = [ "XOR", "AND", "OR"];



function applyOP(operation){
    
    for(let i=7;i>-1;i--){
         document.getElementById(i).style.display="block";
    }
  ///////////////
  if(SuperOP.includes(operation)){    
    for(let i=7;i>-1;i--){
        /*document.getElementById('first').getElementsByClassName("block2")[i].classList.add('markit');
        document.getElementById('second').getElementsByClassName("block2")[i].classList.add('markit');
        document.getElementById(i).classList.add('markit');*/
       task(i,operation);
        console.log('Done'+i);
       /*document.getElementById('first').getElementsByClassName("block2")[i].classList.remove('markit');
       document.getElementById('second').getElementsByClassName("block2")[i].classList.remove('markit');
       document.getElementById(i).classList.remove('markit');*/
    }
  }
  //////////////////////
  if(operation=='ADD'){
    for(let i=6;i>-1;i--){
        document.getElementById('carry').getElementsByClassName("block3")[i].style.display="block";
   }
    for(let i=7;i>-1;i--){
        
        task2(i);
        
    }
  }  

}


function applyOP16(operation){
    
    for(let i=15;i>-1;i--){
         document.getElementById(i).style.display="block";
    }
  ///////////////
  if(SuperOP.includes(operation)){    
    for(let i=15;i>-1;i--){
       task16(i,operation);
    }
  }
  //////////////////////
  if(operation=='ADD'){
    for(let i=14;i>-1;i--){
        document.getElementById('carry').getElementsByClassName("block3")[i].style.display="block";
   }
    for(let i=15;i>-1;i--){
        
        task216(i);
        
    }
  }  

}


function task2(i) { 
    setTimeout(function() { 
            let index=7-i;
            document.getElementById('first').getElementsByClassName("block2")[index].classList.add('markit');
            document.getElementById('second').getElementsByClassName("block2")[index].classList.add('markit');
            document.getElementById(index).classList.add('markit');

            num1=document.getElementById('first').getElementsByClassName("block2")[index].textContent;
            num2=document.getElementById('second').getElementsByClassName("block2")[index].textContent;
            if(index!==7){
            car=document.getElementById('carry').getElementsByClassName("block3")[index].textContent;
            }else{
                car=0;
            }
            const fullAdd = fullAdder(parseInt(num1),parseInt(num2),parseInt(car));
            document.getElementById(index).textContent= fullAdd[0];
            if(index-1>=0){
            document.getElementById('carry').getElementsByClassName("block3")[index-1].textContent=fullAdd[1];
            document.getElementById('carry').getElementsByClassName("block3")[index-1].classList.add('markit');
        }
           // console.log(fullAdd[1]);
           if(i==7){
               ChecktheAns();
           }
    }, 2000*i ); 
} 


function task(i,operation) { 
setTimeout(function() { 
        let index=7-i;
        document.getElementById('first').getElementsByClassName("block2")[index].classList.add('markit');
        document.getElementById('second').getElementsByClassName("block2")[index].classList.add('markit');
        document.getElementById(index).classList.add('markit');

	    num1=document.getElementById('first').getElementsByClassName("block2")[index].textContent;
        num2=document.getElementById('second').getElementsByClassName("block2")[index].textContent;
        if(operation=='XOR')
        document.getElementById(index).textContent=parseInt(num1)^parseInt(num2);
        else if(operation=='OR'){
            document.getElementById(index).textContent=(parseInt(num1)||parseInt(num2));
            console.log('Or')
        }
        else if(operation=='AND'){
            document.getElementById(index).textContent=parseInt(num1)&&parseInt(num2);
        }
        if(i==7){
            ChecktheAns();
        }
}, 2000*i ); 
} 

function task16(i,operation) { 
    setTimeout(function() { 
            let index=15-i;
            document.getElementById('first').getElementsByClassName("block2")[index].classList.add('markit');
            document.getElementById('second').getElementsByClassName("block2")[index].classList.add('markit');
            document.getElementById(index).classList.add('markit');

            num1=document.getElementById('first').getElementsByClassName("block2")[index].textContent;
            num2=document.getElementById('second').getElementsByClassName("block2")[index].textContent;
            if(operation=='XOR')
            document.getElementById(index).textContent=parseInt(num1)^parseInt(num2);
            else if(operation=='OR'){
                document.getElementById(index).textContent=(parseInt(num1)||parseInt(num2));
                console.log('Or')
            }
            else if(operation=='AND'){
                document.getElementById(index).textContent=parseInt(num1)&&parseInt(num2);
            }
            if(i==15){
                ChecktheAns();
            }
    }, 2000*i ); 
    } 

    function task216(i) { 
        setTimeout(function() { 
                let index=15-i;
                document.getElementById('first').getElementsByClassName("block2")[index].classList.add('markit');
                document.getElementById('second').getElementsByClassName("block2")[index].classList.add('markit');
                document.getElementById(index).classList.add('markit');

                num1=document.getElementById('first').getElementsByClassName("block2")[index].textContent;
                num2=document.getElementById('second').getElementsByClassName("block2")[index].textContent;
                if(index!==15){
                car=document.getElementById('carry').getElementsByClassName("block3")[index].textContent;
                }else{
                    car=0;
                }
                const fullAdd = fullAdder(parseInt(num1),parseInt(num2),parseInt(car));
                document.getElementById(index).textContent= fullAdd[0];
                if(index-1>=0){
                document.getElementById('carry').getElementsByClassName("block3")[index-1].textContent=fullAdd[1];
                document.getElementById('carry').getElementsByClassName("block3")[index-1].classList.add('markit'); //to mark the carry
            }
               if(i==15){
                   ChecktheAns();
               }
        }, 2000*i ); 
    } 


 function funXOR(i){
     //sleep(1000)
        num1=document.getElementById('first').getElementsByClassName("block2")[i].textContent;
        num2=document.getElementById('second').getElementsByClassName("block2")[i].textContent;
        document.getElementById('third').getElementsByClassName("block2")[i].style.display="block";
        document.getElementById('third').getElementsByClassName("block2")[i].textContent=num1^num2;
}

 function appLyShift(operation,size){
    let number=document.getElementById("order3").getElementsByClassName("block")[0].textContent;
    
    
    if(operation=='SHL'){
    document.getElementById('Larrow').style.display="block";
    document.getElementById('sheftR').style.display="block";
    if(size==0){
    document.getElementById('sheftR').style.marginLeft="350px"
    for(let i=7;i>=0;i--){
        SHLFunc(i,parseInt(number),7);
    }
}else{
    document.getElementById('sheftR').style.marginLeft="700px"
    for(let i=15;i>=0;i--){
        SHLFunc(i,parseInt(number),15);
    }
}
}
else if(operation=='SHR'){
    document.getElementById('sheftR').style.marginLeft="-20px"
    document.getElementById('Rarrow').style.display="block";
    document.getElementById('sheftR').style.display="block";
    if(size==0){
    for(let i=7;i>=0;i--){
        SHRFunc(i,parseInt(number),7);
    }}
    else{
        for(let i=15;i>=0;i--){
            SHRFunc(i,parseInt(number),15);
        }
    }
    
}
}



function SHLFunc(i,number,size){
    setTimeout(function(){
    document.getElementById('first').getElementsByClassName("block2")[i].classList.add('markit');
    if(i>(size-number)){
        document.getElementById('first').getElementsByClassName("block2")[i].textContent='0';
       
    }
    else{
 let num=document.getElementById('first').getElementsByClassName("block2")[i+number].textContent
 document.getElementById('first').getElementsByClassName("block2")[i].textContent=num;
    }
    if(i==size){
        ChecktheAns();
     }
},1500*i);
}

function SHRFunc(i,number,size){
   
    //console.log(i);
    setTimeout(function(){
        index=size-i;
        document.getElementById('first').getElementsByClassName("block2")[index].classList.add('markit');
    if(index<(number)){
        document.getElementById('first').getElementsByClassName("block2")[index].textContent='0';
        console.log('0');
    }
    else{
 let num=document.getElementById('first').getElementsByClassName("block2")[index-number].textContent
 document.getElementById('first').getElementsByClassName("block2")[index].textContent=num;
    }
    if(i==size){
        console.log("in")
        ChecktheAns();
     }
},1500*i);
}

let allOP=["SHR","SHL","ADD","XOR","AND","OR",];
let allReg=["AX,","CX,","BX,","BL,","CH,","DH,","BH,","AL,","AH,","CL,","DL,","DX"];
let allNubers=["0A0H","0F000H","0AAAAH","0FH","16","4","1H","3H","2","8421H"] 


function Validation(ele1,ele2,ele3){
    //console.log(ele2.textContent);
    //console.log(ele3.textContent);
    //console.log(ele1.textContent);
    if(allOP.includes(ele1.textContent) && allReg.includes(ele2.textContent) && allNubers.includes(ele3.textContent)){
        return 1;
    }
    else{
        return 0;
    }

}
function ChecktheAns(){
    var ele1=document.getElementById("order1").getElementsByClassName("block")[0];
    var ele2=document.getElementById("order2").getElementsByClassName("block")[0];
    var ele3=document.getElementById("order3").getElementsByClassName("block")[0];
    let ans=ele1.textContent+" "+ele2.textContent+" "+ele3.textContent;
    //console.log(0+ans+0);
    let correctans=document.getElementById("ans").textContent;
    let Cans=correctans.substring(1);
    let correctans2=Cans.slice(0, -1)
    //console.log(correctans);
   
    if(ans==correctans2){
        $("#Win").modal('show');
    }else{
        $("#Wrong").modal('show');
    }
}
/*correct=ChecktheAns(ele1,ele2,ele3)
console.log(correct)
if(correct){
    alert("thant is right")
}else{
    alert("wrong answer try again")
}*/

let correctans=document.getElementById("ans").textContent;

//document.getElementById("order1").getElementsByClassName("block")[0].textContent;
var OP = [ "XOR", "AND", "OR","ADD"];
var checkbtn=document.getElementById('check');
checkbtn.addEventListener("click",()=>{
    clicked=true;
    var ele1=document.getElementById("order1").getElementsByClassName("block")[0];
    var ele2=document.getElementById("order2").getElementsByClassName("block")[0];
    var ele3=document.getElementById("order3").getElementsByClassName("block")[0];
    check =Validation(ele1,ele2,ele3);                                              //check that in ele1 operation and ele2 regester and ele number
    if(ele1 && ele2 && ele3&&check){
    let size= getVal(document.getElementById("order2").getElementsByClassName("block")[0].textContent.slice(0,2)); //register value
    let operation=document.getElementById("order1").getElementsByClassName("block")[0].textContent;

     if(OP.includes(operation)){
         //console.log(operation);
         let number=document.getElementById("order3").getElementsByClassName("block")[0].textContent;
         document.getElementById('second').getElementsByClassName("block4")[0].style.display="block"; //Show the arrow and the register in block4
         document.getElementById('second').getElementsByClassName("block4")[0].innerHTML=number;
         document.getElementById('second').getElementsByClassName("arrow")[0].style.display="block";
         //
             if(!size[0]){
                if(number.length<5){
         let binary= hex2bin8(number.slice(-3,-1));
         show8(binary,'second');
         document.getElementById('line').style.display="block";
         document.getElementById('line').classList.add("short");
          applyOP(operation)                                  //here we promise

                }else{
                    $("#Long").modal('show');
                }
         }else{
             //here we will fix 16 bit
             //if(size){
                number2 = number.replace('H', ''); 
                console.log(number2);
                let binary= hex2bin16(number2);
                //console.log(number2.slice(-4,0));
                show16(binary,'second');
                document.getElementById('line').style.display="block";
                document.getElementById('line').classList.add("long");
                 applyOP16(operation);
               //     }
                /*    else{
                        alert("Not Matching")
                    }*/
             
         }

        }//SHR SHL
        else if(operation=="SHL"||operation=="SHR"){
             appLyShift(operation,size[0]);        
        }
       /* myPromise.then(
            ChecktheAns(ele1,ele2,ele3)
        );*/
        
    }
    else{
        $("#Illegal").modal('show');
    }
})


