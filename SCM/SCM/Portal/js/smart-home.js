$(document).ready(function () {
    $('#SmartHome').addClass('active');
    setStatus();
});
function setStatus() {
    var img = $('.SmartHomeStatus').attr('alt') == "1" ? "on" : "off"
    $('.SmartHomeStatus').attr('src', 'images/' + img + '_button.png');

    var img1 = $('.SmartHomeStatus1').attr('alt') == "1" ? "on" : "off"
    $('.SmartHomeStatus1').attr('src', 'images/' + img1 + '_button.png');

    var img2 = $('.SmartHomeStatus2').attr('alt') == "1" ? "on" : "off"
    $('.SmartHomeStatus2').attr('src', 'images/' + img2 + '_button.png');
}


$('.SmartHomeStatus, .SmartHomeStatus1, .SmartHomeStatus2').click(function () {
        $(this).attr('alt', $(this).attr('alt') == "1" ? "0" : "1");
        setStatus();
});

