
var metas = document.getElementsByTagName('meta');
var i;
if (navigator.userAgent.match(/iPhone/i)) {
    for (i = 0; i < metas.length; i++) {
        if (metas[i].name == "viewport") {
            metas[i].content = "width=device-width, minimum-scale=1.0, maximum-scale=1.0";
        }
    }
    document.addEventListener("gesturestart", gestureStart, false);
}
function gestureStart() {
    for (i = 0; i < metas.length; i++) {
        if (metas[i].name == "viewport") {
            metas[i].content = "width=device-width, minimum-scale=0.25, maximum-scale=1.6";
        }
    }
}

function refresh() {
    //var zoom = $('#zoom');
    var device = $('#device');
    //zoom.text(window.detectZoom.zoom().toFixed(2));
    //device.text(window.detectZoom.device().toFixed(2));
    if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
        $("#device").addClass('inner_uni1');
        $("#device").removeClass('inner_mid_section_box1');
        $("#device").removeClass('inner_uni3');
        $("#device").removeClass('inner_uni5');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
        $("#device").removeClass('inner_uni1');
        $("#device").removeClass('inner_uni3');
        $("#device").removeClass('inner_uni5');
        $("#device").addClass('inner_mid_section_box1');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
        $("#device").removeClass('inner_uni1');
        $("#device").removeClass('inner_mid_section_box1');
        $("#device").removeClass('inner_uni5');
        $("#device").addClass('inner_uni3');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
        $("#device").removeClass('inner_uni1');
        $("#device").removeClass('inner_mid_section_box1');
        $("#device").removeClass('inner_uni3');
        $("#device").addClass('inner_uni5');
    }
    else {
        $("#device").removeClass('inner_uni1');
        $("#device").removeClass('inner_mid_section_box1');
        $("#device").removeClass('inner_uni3');
        $("#device").removeClass('inner_uni5');
    }

}


$("document").ready(function () {
    refresh();
    $(window).on('resize', refresh);
});

function myFunction() {
    document.getElementById("myDropdown").classList.toggle("show");
}

window.onclick = function (event) {
    if (!event.target.matches('.dropbtn')) {

        var dropdowns = document.getElementsByClassName("dropdown-content");
        var i;
        for (i = 0; i < dropdowns.length; i++) {
            var openDropdown = dropdowns[i];
            if (openDropdown.classList.contains('show')) {
                openDropdown.classList.remove('show');
            }
        }
    }
}
