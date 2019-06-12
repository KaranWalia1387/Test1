$(document).ready(function () {
    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/Setbanners",
        data: '{PlaceHolderID: "' + 6 + '" }',//for EV
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            var image1
            var result = JSON.parse((response.d)).split(',');
            result[0] == "" ? $('#IDBannerEV').attr('src', "images/no_img.png") : $('#IDBannerEV').attr('src', result[0]);
            result[1] == "" ? $('#IDBannerEVI').attr('src', "images/no_img.png") : $('#IDBannerEVI').attr('src', result[1]);
            $('#IDBannerEV').error(function () {
                $(this).attr('src', 'images/no_img.png');
            });
            $('#IDBannerEVI').error(function () {
                $(this).attr('src', 'images/no_img.png');
            });
        },
        error: function (request, status, error) {
            loader.hideloader();
        }
    })
});

$(document).ready(function () {
    $('.active').removeClass('active');
    $('.icon_ev_sidebar').addClass('active');

    ChangeSlider();
});

function ChangeSlider() {
    var _txt = $("#txt_SliderVal");
    var _txt_slider = $("#dvSlider").val(_txt).slider({
        min: 46,
        max: 101,
        range: "min",
        value: _txt.val(),
        slide: function (event, ui) {
            _txt.val(ui.value - 1);
        }
    });

    $("#txt_SliderVal").change(function () {
        _txt_slider.slider("value", this.value);
    });
}