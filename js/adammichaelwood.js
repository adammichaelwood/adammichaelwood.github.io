// Liberty.me Mockups JS

// Bird fade in


$('.bird-fade-control').hover(function() {
    $('.bird-fade-contain').find("img:last").fadeToggle();
});

$("#bird-div").css({'height':($("#bird-bw").height()+'px')});