var templateData = '';

function File_OnChange(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    $("#nofile").html(filename);
    if (sender.value != "") {
        $('#btnRemoveFile').show();
    }
    else {
        $('#btnRemoveFile').hide();
    }
    //for IE
    if (navigator.appName == 'Microsoft Internet Explorer') {
        $('#summernote').summernote('code', $('#summernote').summernote('code'));
    }
}

function removeFile() {
    //$('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    $("#nofile").html('No File Chosen');
    return false;
}

function IsFileValidForUpload() {
    for (var i = 0; i < $("#fileupd").get(0).files.length; i++) {
        var fileName = $("#fileupd").get(0).files[i].name;
        var nameArr = $("#fileupd").get(0).files[i].name.split('.');
        if (nameArr[nameArr.length - 1] == 'gif' || nameArr[nameArr.length - 1] == 'png' || nameArr[nameArr.length - 1] == 'bmp' || nameArr[nameArr.length - 1] == 'jpg' || nameArr[nameArr.length - 1] == 'jpeg' || nameArr[nameArr.length - 1] == 'txt' || nameArr[nameArr.length - 1] == 'rtf')
            return true;
        else {
            if (nameArr[nameArr.length - 1] == 'exe') {
                return false;
            }
            else if (nameArr[nameArr.length - 1] == 'dll') {
                return false;
            }
            return false;
        }
    }
    return true;
}

function showhideeditor(opt) {
    if (opt == 1) {
        $(".email").show();
        $(".texttype").removeClass('hide');
        $('#txtMessage').addClass('hide');
        AddMandatoryAttributeToElement('#txtmsgsubject');
        AddMandatoryAttributeToElement('#ContentPlaceHolder1_rightpanel_txtEditor');
        RemoveMandatoryAttributeFromElement('#txtMessage');

       
        getLength();
    }
    else {
        $(".email").hide();
        $(".texttype").removeClass('hide');
        AddMandatoryAttributeToElement('#txtMessage');
        RemoveMandatoryAttributeFromElement('#ContentPlaceHolder1_rightpanel_txtEditor');
        RemoveMandatoryAttributeFromElement('#txtmsgsubject');

        //************************
        var msgType = $('#ddlMessageMode').val();
        if (msgType == 0) {
            $('.mstType').attr("ValidateMessage", "Please enter Text Message");
            $('.mstType').attr("onKeyUp", "Count(this,140)");
        }
        else if (msgType == 2) {
            $('.mstType').attr("ValidateMessage", "Please enter Push Message");
            $('.mstType').attr("onKeyUp", "Count(this,200)");
        }
        else {
            $('.mstType').attr("ValidateMessage", "Please enter IVR message");
            $('.mstType').attr("onKeyUp", "Count(this,140)");
        }
        //***********************
        getLength();
    }
        
}

function AddMandatoryAttributeToEditor(elemet) {
    var attr = $(elemet).attr('mandatory');
    // For some browsers, 'attr' is undefined; for others,'attr' is false.  Check for both.
    if (typeof attr == typeof undefined || attr == false) {
        var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;position:absolute; right: 22px;top: 0;">*</span>';
        $(elemet).attr('mandatory', '1');
        $(elemet).after(mandatoryHtml);
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
    // var txtbxlength = (textbox == 0 || textbox == 2 || textbox == 3) ? 140 : 1000;
    var txtbxlength = 0;
    if (textbox == 0  || textbox == 3)
    {
        txtbxlength = 140;
    }
    else if (textbox == 2)
    {
        txtbxlength = 200;
    }
    else
    {
        txtbxlength = 1000;
    }
    document.getElementById("spanTxt").innerHTML = "Max Characters:" + txtbxlength;
    document.getElementById("spanTxt").style = "display:block; color: red;";
    var txtMessage = $("#txtMessage").val();
    if (txtMessage.trim().length >= txtbxlength) {
        $("#txtMessage").val(txtMessage.substring(0, txtbxlength));
    }
}

$(document).ready(function () {

    $('#ddltypeofmessage').prepend('<option selected="true" value="">--Message Type--</option>');
    $('#ddltypeofmessage').val('');
    $(".sidebar_outbox").addClass('active');
    $('#collapseOne').show();

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
            url: "" + $('#filehandlerpath').val() + "Path=Notification",
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

    $("#ddlcity").change(function (i, obj) {
        if (!($('#ddlcity').val() == null || $('#ddlcity').val() == '')) {
            var ddlcity = $('#ddlcity option:selected');
            if ($(ddlcity).attr('key') == 'Zipcode') {
                $('#hdnCity').val(ddlcity.attr('cityid'));
                $('#hdnZip').val(ddlcity.val());
            }
            else {
                $('#hdnCity').val($(ddlcity).val());
            }
        }
        // to make the value of textbox empty
        if ($('#txtcustomername').val().length > 0) {
            $('#txtcustomername').val('');
        }
    });
    function OnSuccess(data, status) {
        if (parseInt(data.d) > 0)
            
            alert('Your message has been sent successfully');
        else
            alert('Message not sent.');
        // $.unblockUI();
        loader.hideloader();
        resetForm();
        removeFile();
    }
    function OnError(request, status, error) {
        alert(request.statusText);
        loader.hideloader();
    }

    function validateconfiguration() {
        var isvalid = (ValidatePage('outboxmsg') && GetFileSize('fileupd'))
        if (isvalid == false) return false;
        if ($('#ddlMessageMode').val() == 1) {
            var value = $('#summernote').summernote('code').replace(/<\/?[^>]+(>|$)/g, ""); //objEditor.get_content();
            if (value.length > 1000) {
                alert("Maximum 1000 characters allowed");
                value = value.substring(0, 999);
                $('#summernote').summernote('code', '');
                $('#summernote').summernote('code', value);
                isvalid = false;
            }
        }
        else if ($('#ddlMessageMode').val() == 2) {
            var value = $('#txtMessage').val();
            if (value.length > 200) {
                alert("Maximum 200 characters allowed");
                //$('#txtMessage').val(value);
                $('#txtMessage').val($('#txtMessage').val().substring(0, 200));

                isvalid = false;
            }
        }

        else {
            var value = $('#txtMessage').val();
            if (value.length > 140) {
                alert("Maximum 140 characters allowed");
                //$('#txtMessage').val(value);
                $('#txtMessage').val($('#txtMessage').val().substring(0, 140));

                isvalid = false;
            }
        }
        //else if ($('#ddlMessageMode').val() == 0 || $('#ddlMessageMode').val() == 2 || $('#ddlMessageMode').val() == 3) {

           
        //    var value = $('#txtMessage').val();
        //    if(value.length > 140)
        //    {
        //        alert("Maximum 140 characters allowed");                
        //        //$('#txtMessage').val(value);
        //        $('#txtMessage').val($('#txtMessage').val().substring(0, 140));

        //        isvalid = false;
        //    }
        //}
        var value1 = $('#summernote').summernote('code').replace(/<\/?[^>]+(>|$)/g, "");
        if (value1 == "" && ($('#ddlMessageMode').val()) == "1") {
            //alert('Please Enter Message');
            alert('Please enter Message body');
            isvalid = false;
        }
        return isvalid;
    }

    $('#btnSubmitReply').click(function () {
        try
        {
            if (validateconfiguration() == true) {         
                if (!IsFileValidForUpload()) {
                    alert('Invalid file type select; file extentions allowed are : gif, png, bmp, jpg, jpeg, txt and rtf.');
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
       
    

        $('#txtcustomername').keydown(function (e) {
            // not allowing back slash (\)
            if (e.keyCode == 220) {
                e.preventDefault();
            }
        });
        $('#txtMessage').on('input propertychange', function () {
            var mode = $("#ddlMessageMode").val();
            var txtbxlength = (mode == 0 || mode == 2 || mode == 3) ? 140 : 500;
            CharLimit(this, txtbxlength);
        });
     
        //loader.hideloader();
        }
        catch (e) {
            loader.hideloader();
            alert(e.message);
        }
    });


    function resetForm() {
       
        $('#ddltypeofmessage').val('');
        $('#radioAccountType').val('');
        $('#ddlcity').val('');
        if ($("#ddlMessageMode").val() == "1") {
            $('#summernote').summernote('code', '');

            $("#txtmsgsubject").val('');
            $('#ddlcity').val('');
            showhideeditor('0');
        }
        else { $('textarea').val(''); }
        $('#ddlMessageMode').val('');
        $("#txtcustomername").val('');
        $("#contactnumber").text('');
        $('#txtMessage').val('');
        
        $('#txtmsgsubject').val('');
    }
    //END R&D

    showhideeditor($("#ddlMessageMode").val());
    $('#btnRemoveFile').hide();
  
    $("#ddltypeofmessage").change(function () {
        try{
            if ($("#ddltypeofmessage").val() != "" && $("#ddlMessageMode").val() != "") {
                loader.showloader();
                resetMessageField();
                GetData();
                loader.hideloader();
             //   $("#btnSubmitReply").removeAttr("disabled");
            }
        } catch (e) {
            loader.hideloader();
            console.log(e.message);
        }

    })


    $("#ddlMessageMode").change(function () {
        try{
            if ($("#ddltypeofmessage").val() != "" && $("#ddlMessageMode").val() != "") {
                loader.showloader();
                showhideeditor($("#ddlMessageMode").val());
                resetMessageField();
                GetData();
                loader.hideloader();

            }
        } catch (e) {
            loader.hideloader();
            console.log(e.message);
        }

    })
});

function LoadMessage(typeNotification, name, type) {
    $('#chkall').attr('checked', false);
    $('.btnSave').show();
    $('.MailListing').show();
    $('#MessageBody').hide();
    $('.btnputback').hide();
    $('#btnBack').hide();
    $('#btnReply').hide();
    $('#msgReply').hide();
    $('#btnPrevious').hide();
    $('#btnNext').hide();
    $('#divHeader').show();
    ismsgopen = false;
    $("#notification>ul>li.active").removeClass("active");
    var value = Notification_Inbox.LoadMessages('', type, '').value;
    $('#ulNotificatons').text('');
    $('#ulNotificatons').empty();
    $('#ulNotificatons').append(value);
    $('#lblHeading').text('');
    $('#lblHeading').text(name);
    if (type != '9')
        $('#lblFromTo').text('From');
    else
        $('#lblFromTo').text('To');
    $('.MailListing').show();
    $('.MessageBody').hide();
    if (value == '')
        $('#divHeader').hide();
    else {
        $('#divHeader').show();
    }
    var result = Notification_Inbox.UnreadMessage().value;
    if (result != null) {
        for (var i = 0; i < result.Rows.length; i++) {
            $('#unReadOutage').text(result.Rows[i].Outage != '0' ? '(' + '' + result.Rows[i].Outage + ' )' : '');
            $('#unReadInbox').text(result.Rows[i].Inbox != '0' ? '(' + '' + result.Rows[i].Inbox + ' )' : '');
            $('#unReadConnectMe').text(result.Rows[i].ConnectMe != '0' ? '(' + '' + result.Rows[i].ConnectMe + ' )' : '');
            $('#unReadService').text(result.Rows[i].Service != '0' ? '(' + '' + result.Rows[i].Service + ' )' : '');
            $('#unReadBilling').text(result.Rows[i].Billing != '0' ? '(' + '' + result.Rows[i].Billing + ' )' : '');
            $('#unReadDemandResponse').text(result.Rows[i].DemandResponse != '0' ? '(' + '' + result.Rows[i].DemandResponse + ' )' : '');
        }
    }
    $(".sidebar_" + typeNotification + "_inner").addClass('active');
    if (type == '12') {
        $('.btnputback').show();
        $('.btnSave').hide();
    }
    if (type == '9') {
        $('.btnputback').show();
        $('.btnSave').hide();
    }
    var arrchkbox = $('.MailListing input');
    arrmsgids = new Array();
    for (var i = 0; i < $(arrchkbox).length; i++) {
        arrmsgids[i] = $(arrchkbox)[i].id;
    }
}

$('#outbox').click(function () {
    window.location.href = "Notification-outbox.aspx";
});

$('#outage').click(function () {
    
    window.location.href = "Notification-Inbox.aspx?typenoti=outage&name=Outage&type=1";
});

$('#connectme').click(function () {
  
    window.location.href = "Notification-Inbox.aspx?typenoti=connectme&name=Connect Me&type=2";
});

$('#service').click(function () {
 
    window.location.href = "Notification-Inbox.aspx?typenoti=service&name=Service&type=3";
});

$('#billing').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=billing&name=Billing&type=4";
});

$('#demandresponse').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=demandresponse&name=Demand Response&type=5";
});

$('#sentitem').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=sent&name=Sent&type=8";
});

$('#trash').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=trash&name=Trash&type=9";
});

$('#saved').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=saved&name=Saved&type=12";
});

$('#allmail').click(function () {
    window.location.href = "Notification-Inbox.aspx?typenoti=allMail&name=All Mail&type=11";
});

function GetData() {
    try{
        var selected = $("#ddltypeofmessage").val();
        var param = { templateid: selected };
        $.ajax({
            type: "POST",
            url: "Notification-Outbox.aspx/GetTemplateData",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                data = data.d;
                templateData = $.parseJSON(data);
                ConvertData();
                switch ($("#ddlMessageMode").val()) {
                    case "0":
                        if (templateData[0].IsText) {
                            $("#txtMessage").val(templateData[0].TextMessage)
                        }
                        break;
                    case "1":
                        if (templateData[0].IsEMail) {
                            $("#txtmsgsubject").val(templateData[0].EmailSubject);
                            $('#summernote').summernote('code', (templateData[0].EmailBody));
                        }
                        break;
                    case "2":
                        if (templateData[0].IsPush) {
                            $("#txtMessage").val(templateData[0].PushMessage);
                        }
                        break;
                    case "3":
                        if (templateData[0].IsIVR) {
                            $("#txtMessage").val(templateData[0].IVRMessage);
                        }
                        break;
                }
           
            },
            error:function (request, status, error) { loader.hideloader(); }
        })
    } catch (e) {
        console.log(e.message);
        loader.hideloader();
    }
}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(templateData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        templateData['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function resetMessageField() {
    $("#txtMessage").val('');
    $("#txtmsgsubject").val('');
    $('#summernote').summernote('code', '');
}
