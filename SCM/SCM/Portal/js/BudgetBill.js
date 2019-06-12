function refresh() {
    //var zoom = $('#zoom');
    var device = $('#devices');
    //zoom.text(window.detectZoom.zoom().toFixed(2));
    //device.text(window.detectZoom.device().toFixed(2));
    if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
        $("#devices").addClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
        $("#devices").addClass('inner_uni2');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
        $("#devices").addClass('inner_uni3');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
        $("#devices").addClass('inner_uni4');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
    }
    else {
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }

}
$(document).ready(function () {
    refresh();
    $(window).on('resize', refresh);
});