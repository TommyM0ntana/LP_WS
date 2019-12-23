

    $(document).ready(function(){
    
        var view = $("#tslshow");
    var move = "300px";
    var sliderLimit = -300;
    
    $("#rightArrow").click(function(){
    
        var currentPosition = parseInt(view.css("left"));
        if (currentPosition >= sliderLimit) view.stop(false,true).animate({left:"-="+move},{ duration: 400})
    
    });
    
    $("#leftArrow").click(function(){
    
        var currentPosition = parseInt(view.css("left"));
        if (currentPosition < 0) view.stop(false,true).animate({left:"+="+move},{ duration: 400});
    
    });
        
    
    });
           
        
        