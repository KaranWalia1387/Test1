//#5455
try {
    $.noConflict();
    $('[data-toggle="popover1"]').popover();
}
catch (e) { console.log('script.js' + e.message); }
