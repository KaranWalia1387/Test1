$(document).ready(function () {

    $('#summernote').summernote({ height: 350 });

    bindData();
    $('#btnSave').click(function () {
        loader.showloader();
        //var editorControl = $get("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").control;
        var content = $('#summernote').summernote('code'); // editorControl.get_content();
        var param = { desc: content }
        $.ajax({
            type: "POST",
            url: "Configure-PrivacyPolicy.aspx/saveData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                var resp = (data.d);
                if (resp == 1) {
                    alert('Privacy Policy has been saved successfully');
                } else {
                    alert('Error - Retry !!!!!');
                }
                loader.hideloader();
            },
            error: function (request, status, error) {
                loader.hideloader();
            }
        });
    });

    $('#btnClear').click(function () {
        //var editorControl = $get("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").control;
        //editorControl.set_content('');
        $('#summernote').summernote('code', '');
    });
});

function bindData() {
    //var param = { id: 1234 }
    loader.showloader();
    $.ajax({
        type: "POST",
        url: "Configure-PrivacyPolicy.aspx/getData",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: JSON.stringify(param),
        success: function (data) {
            //var editorControl = $get("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").control;
            //editorControl.set_content(data.d);
            $('#summernote').summernote('code', data.d);
            loader.hideloader();
        },
        error: function (request, status, error) {
            loader.hideloader();
        }
    });
}

