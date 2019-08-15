//xử lý active cho menu
$(document).ready(()=>{   
    var path = window.location.pathname;
   // var pgurl = window.location.href.substr(window.location.href.lastIndexOf("/"));
    var pgurl = path.substr(0,path.indexOf("/", 1));
    //console.log(path)
    //console.log(pgurl)
    $("#ftco-nav ul li a").each(function(){     
        if($(this).attr("href") === pgurl || $(this).attr("href") === path || $(this).attr("href") == '' )
        $(this).parent().addClass("active");
    })
})

$(document).ready(() =>{
    $(".form-check-input").change(function() {       
        if(this.checked) {            
            $('.star-rating').submit();                      
        }
    });
    // $('.form-check-input').click(function() {       
    //     if ($(this).is(':checked')) {
    //         var path = window.location.pathname + '/start';           
    //         window.location.pathname = path;            
    //     }
    // });

    $("#search-keyword").keypress( function(event) {
        if (event.keyCode === 13){
            $('.search-form').submit();            
        }
    }) 

    // hiden notify
    hiddenNotify(".close-btn");
    
    setTimeout(function(){ 
        $(".close-btn").parent().css({'display':'none'})
    }, 7000);

    // hidden parent (hidden message notify)
    function hiddenNotify(close_btn_selector){
        $(close_btn_selector).on('click', function(){
            $(this).parent().css({'display':'none'});
        })    
    } 
})


jQuery(document).ready(function($){
    // browser window scroll (in pixels) after which the "back to top" link is shown
    var offset = 300,
    //browser window scroll (in pixels) after which the "back to top" link opacity is reduced
    offset_opacity = 1200,
    //duration of the top scrolling animation (in ms)
    scroll_top_duration = 700,
    //grab the "back to top" link
    $back_to_top = $('.cd-top');
    //hide or show the "back to top" link
    $(window).scroll(function(){
        ( $(this).scrollTop() > offset ) ? $back_to_top.addClass('cd-is-visible') : $back_to_top.removeClass('cd-is-visible cd-fade-out');
        if( $(this).scrollTop() > offset_opacity ){
            $back_to_top.addClass('cd-fade-out');
        }
    });
    //smooth scroll to top
    $back_to_top.on('click', function(event){
        event.preventDefault();
        $('body,html').animate({
            scrollTop: 0 ,
            }, scroll_top_duration
        );
    });
});