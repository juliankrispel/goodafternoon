$(document).ready(function(){
    // Global Namespace for Good Afternoon
    var GA = {}
    
    GA.toggleInfo = function(){
        $('body').toggleClass('showInfo');
    }
    
    $('#wtf').on({
        click: GA.toggleInfo
    });
    
    $('.info .close').on({
        click: GA.toggleInfo
    });
});