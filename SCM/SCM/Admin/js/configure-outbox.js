function File_OnChange(sender) {

    //Bug ID: 0009152 Icon Removed if no item selected
    if (sender.value != "") {
        $('#btnRemoveFile').show();
    }
    else {
        $('#btnRemoveFile').hide();
    }
    //end comment
}

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

$(document).ready(function () {
    $('#summernote').summernote();

    Object.defineProperty(Date.prototype, 'YYYYMMDDHHMMSS', {
        value: function () {
            function pad2(n) {  // always returns a string
                return (n < 10 ? '0' : '') + n;
            }

            return this.getFullYear() +
                   pad2(this.getMonth() + 1) +
                   pad2(this.getDate()) +
                   pad2(this.getHours()) +
                   pad2(this.getMinutes()) +
                   pad2(this.getSeconds());
        }
    });

    function saveUloadedFile() {

        var data = new FormData();

        var files = $("#fileupd").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }
        var flName = '';
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            async: false,
            url: "../Upload.ashx?Path=Notification",
            contentType: false,
            processData: false,
            data: data,
            success: function (data) { flName = data; }
        });

        ajaxRequest.done(function (xhr, textStatus) {
            // Do other operation
        });

        return flName;
    }

    $('#btnSubmitReply').click(function () {


        if (validateconfiguration() == true) {
            if (!IsFileValidForUpload()) {
                alert('Invalid File Format.');
                return false;
            }

            loader.showloader();
            var placeholder = $('#ddltypeofmessage').val();
            var subject = $("#txtmsgsubject").val();
            var mailfrom = "2";
            var messageBody = ($("#ddlMessageMode").val() != "1") ? $("#txtMessage").val() : $('#summernote').summernote('code');
            var accountNumber = $("#AccountId").val();
            var cityId = "0";
            var zip = $("#hdnZip").val();
            var accountType = $("#radioAccountType").val();
            var attachmentPath = "Attachments";
            var src = "";
            var attachmentType = "";
            var messageMod = $("#ddlMessageMode").val();

            var file = document.getElementById('fileupd');
            if (file.files.length > 0) {
                src = saveUloadedFile();
                attachmentType = file.files[0].name.split('.')[1];
            }
            var param = "{placeHolderID:'" + placeholder + "',subject:'" + subject + "',mailFrom:'" + mailfrom + "',messageBody:'" + messageBody + "',accountNumber:'" + accountNumber + "',cityId:'" + cityId + "',zipCode:'" + zip + "',customerType:'" + accountType + "',attachmentPath:'Attachments',attachmentName:'" + src + "',attachmentType:'" + attachmentType + "',messageMode:'" + messageMod + "'}";
            $.ajax({
                type: "POST",
                url: "Notification-Outbox.aspx/CreateMessage",
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });
        }
    });

    function OnSuccess(data, status) {
        if (parseInt(data.d) > 0)
            alert('Message sent.');
        else
            alert('Message not sent.');
        // $.unblockUI();
        loader.hideloader();
        resetForm();
    }

    function OnError(request, status, error) {
        alert(request.statusText);
    }

    function resetForm() {
        $('#ddltypeofmessage > option').eq(0).attr('selected', 'selected')
        $('#radioAccountType > option').eq(0).attr('selected', 'selected')
        $('#ddlcity > option').eq(0).attr('selected', 'selected')
        if ($("#ddlMessageMode").val() == "1") {
            $('#summernote').summernote('code', '');

            $("#txtmsgsubject").val('');
            $('#ddlcity > option').eq(0).attr('selected', 'selected')
            showhideeditor('0');
        }
        else { $('textarea').val(''); }
        $('#ddlMessageMode > option').eq(0).attr('selected', 'selected')
        $("#txtcustomername").val('');
        $("#contactnumber").text('');

    }
    //END R&D

    showhideeditor($("#ddlMessageMode").val());
    //checkClientTimeZone();
    $('#btnRemoveFile').hide();
    $("#ddlMessageMode").change(function (i, obj) {
        var opt = $(this).val();
        showhideeditor(opt);

    });
    $("#ddlcity").change(function (i, obj) {
        var opt = $(this).val();
        $("#hdncityid").val(opt);
        $("#hdnzipcode").val($("#ddlZipCode").val());

    });
    $("#ddlZipCode").change(function (i, obj) {
        var opt = $(this).val();
        $("#hdnzipcode").val(opt);

    });

});

function IsFileValidForUpload() {

    for (var i = 0; i < $("#fileupd").get(0).files.length; i++) {

        var fileName = $("#fileupd").get(0).files[i].name;

        var nameArr = $("#fileupd").get(0).files[i].name.split('.');

        if (nameArr[nameArr.length - 1] == 'exe') {
            return false;
        }
        else if (nameArr[nameArr.length - 1] == 'dll') {
            return false;
        }
    }

    return true;
}

function showhideeditor(opt) {
    if (opt == 1) {
        $(".email").show();
        $(".texttype").addClass('hide');
        $("#txtMessage").removeAttr('mandatory', '1');
        $("#summernote").attr('mandatory', '1');
        $("#txtmsgsubject").attr('mandatory', '1');
        
    }
    else {
        $(".email").hide();
        $(".texttype").removeClass('hide');
        $("#txtMessage").attr('mandatory', '1');
        $("#summernote").removeAttr('mandatory');
        $("#txtmsgsubject").removeAttr('mandatory');//subject in mandatory only for email
        $("#txtMessage").maxlength(200);
        getLength();
    }
}

function ShowImage() {

    document.getElementById('txtcustomername').style.backgroundImage = 'url(../images/loader.gif)';
    document.getElementById('txtcustomername').style.backgroundRepeat = 'no-repeat';
    document.getElementById('txtcustomername').style.backgroundPosition = 'right';
}

function HideImage() {

    document.getElementById('txtcustomername').style.backgroundImage = 'none';
}

function getLength() {
    var textbox = $("#ddlMessageMode").val();
    var txtbxlength = (textbox == 0 || textbox == 2) ? 200 : 1000;
    document.getElementById("spanTxt").innerHTML = "Max Characters:" + txtbxlength;

    var txtMessage = $("#txtMessage").val();
    if (txtMessage.trim().length >= txtbxlength) {
        $("#txtMessage").val(txtMessage.substring(0, txtbxlength));
    }

}