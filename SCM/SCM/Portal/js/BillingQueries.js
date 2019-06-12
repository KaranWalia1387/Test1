function File_OnChange(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    if (filename != "") {
        $("#nofile").html(filename);
        $('#btnRemoveFile').show();
    }
}

function removeFile() {
    $('#flupload').val('');
    var control = $("#flupload");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    $("#nofile").html($('#nofile').attr('title'));
    return false;
}
$(function () {
    $("textarea[maxlength]").bind('input propertychange', function () {
        var maxLength = $(this).attr('maxlength');
        //I'm guessing JavaScript is treating a newline as one character rather than two so when I try to insert a "max length" string into the database I get an error.
        //Detect how many newlines are in the textarea, then be sure to count them twice as part of the length of the input.
        var newlines = ($(this).val().match(/\n/g) || []).length
        if ($(this).val().length + newlines > maxLength) {
            $(this).val($(this).val().substring(0, maxLength - newlines));
        }
    })
});
$(document).ready(function () {

    

    $('#billQuery').click(function () {

        var currentYear = new Date().getFullYear();
        var currentmonth = new Date().getMonth();
        var currentDate = new Date().getDate();
        $('#MyDateLabelId').text(currentmonth+1+'/'+currentDate+'/'+currentYear);
    });

    //$("a[globalize='ML_BILLING_Navigation_ConnectMe']")
    //    .click(function() {
    //        $('#billQuery_contact').show();
    //    });

    //$('#billQuery').click(function(){
    //    $('#billQuery_contact').show();
    //});
    var src = '';

    //$('#btnclosepopup').click(function () {
    //    resetForm();
    //});

$('#btnSubmit').click(function () {

    if (ValidateAllPageFieldsSingleMessage('popup_area')) {

        //if ($('#txtSubject').val() == '') {
        //    toastr.warning($('#IDSubject').text());
        //    $('#txtSubject').focus();

        //    return false;
        //}
        //else if ($('#txtComment').val() == '') {
        //    toastr.warning($('#IDComment').text());
        //    $('#txtComment').focus();
        //    return false;
        //}
        loader.showloader();
        if ($('#flupload').val() != '') {
            if (GetFileSize('flupload') == true) {
                $.ajaxFileUpload({
                    type: "POST",
                    fileElementId: 'flupload',
                    url: "Upload.ashx?Path=Notification",
                    secureuri: false,
                    cache: false,
                    contentType: 'text/plain',
                    dataType: "text",
                    success: function (data, status) {
                        src = data;
                        if (data != '') {
                            submitQuery();
                            resetForm();
                        }
                        else {
                            toastr.error($("#IDFileFailed").text());
                        }

                    },
                    error: function (data, status, e) {
                        toastr.error(e);

                    }
                });
            }
            else { loader.hideloader(); }
        }
        else { src = ''; submitQuery(); resetForm(); }
    }
    else { return false;}
});

// function for encoding html tags
function htmlEncode(value) {
    return $('<div/>').text(value).html();
}

function createReqParam() {
    var param = 'Subject=' + $('#txtSubject');
    param += "&MessageBody=" +htmlEncode($('#txtComment'));
   
    if (src != '') {
        param += "&AttachmentName=" + escape(src);
    }
}

function submitQuery() {
    //  if (status == true) {
    //var parameter = { json: createReqParam() };
    
    var parameter = { Subject: $('#txtSubject').val(), MessageBody: htmlEncode($('#txtComment').val()), AttachmentName: escape(src), serviceaccountnumber: $('#ddlAddress').val().split(':')[6] };
   
    
    $.ajax({
        type: "POST",
        url: "BillDashboard.aspx/SaveQuery",
        data: JSON.stringify(parameter),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            var dataset = JSON.parse(data.d);
           
            //$('#txt_Subject').removeAttr("readonly");
            if ((dataset != null)&&(dataset.Table[0]["Status"])) {
                toastr.success(dataset.Table[0]["Message"])
            }
            else {
                toastr.error($('#IDCommentFailed').text());
            }
            loader.hideloader();
        },
        error: function (request, status, error) {
            toastr.error('Error ' + request.statusText)
            loader.hideloader();
        }
    });
    //
}
});

function resetForm() {
   // $('#txt_Subject').attr('mandatory', '1');
    $('#txtSubject').val('');
    $('#txtComment').val('');
    $('#flupload').val(''); $('#btnRemoveFile').hide();
    $("#nofile").html($('#nofile').attr('title'));
    $('#billQuery_contact').hide();
    $('.icon_dispute_bill').removeClass('active');

}