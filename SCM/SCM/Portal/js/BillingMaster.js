
$(window).load(function () {
    changeactivelinkcolor();


    $.ajax({
        type: "POST",
        url: "Dashboard.aspx/Setbanners",
        data: '{PlaceHolderID: "' + 3 + '" }',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            JSON.parse(response.d) == null ? $('#IDBannerBilling').attr('src', "images/no_img.png") : $('#IDBannerBilling').attr('src', JSON.parse(response.d));
            $('#IDBannerBilling').error(function () {
                $(this).attr('src', 'images/no_img.png');
            });
        },
        error: function (request, status, error) {
            loader.hideloader();
        }
    });
});

function printarea() {
    var printContents = document.getElementsByClassName('total_bills')[0].innerHTML;
    var originalContents = document.body.innerHTML;
    document.body.innerHTML = printContents;
    window.print();
    document.body.innerHTML = originalContents;
}