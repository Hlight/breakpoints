$(function(){

    $(window).bind('exitBreakpoint320',function() {
        console.log('exitBreakpoint320');
    });
    $(window).bind('enterBreakpoint320',function() {
        console.log('enterBreakpoint320');
    });

    $(window).bind('exitBreakpoint480',function() {
        console.log('exitBreakpoint480');
    });
    $(window).bind('enterBreakpoint480',function() {
        console.log('enterBreakpoint480');
    });
    $(window).bind('exitBreakpoint768',function() {
        console.log('exitBreakpoint768');
    });
    $(window).bind('enterBreakpoint768',function() {
        console.log('enterBreakpoint768');
    });

    $(window).bind('exitBreakpoint1024',function() {
        console.log('exitBreakpoint1024');
    });
    $(window).bind('enterBreakpoint1024',function() {
        console.log('enterBreakpoint1024');
    });

    $(window).setBreakpoints();

});
