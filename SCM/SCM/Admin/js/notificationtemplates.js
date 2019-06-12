var dt_saveresult;
var TemplateTable = {};
var databindtogrid;
var Tables, templateData;
var TemplateId = "", Description = '', Status = '';
var src = '';
var hdfRemovefile = 1;

function ValidateAll() {
    var countcheckbox = 0;
    var tempid = $('#ddlChooseTemplate').val();
    if (tempid == '') {
        alert('Please select Notification Template');
        $('ddlChooseTemplate').addClass('ddlChooseTemplate');
        $('ddlChooseTemplate').focus();
        return false;
    }
    $('input[name="mode"]:not(:checked)').each(function () {
        ++countcheckbox;
    });
    if (countcheckbox == 4) {
        alert('Please select a Mode');
        return false;
    }
    if ($('#Chktext').is(":checked")) {
        var text = $('#txttext').val();
        if (text == '' || text.trim().length == 0) {
            alert('Please enter Text Message');
            $('#txttext').addClass('errorbox');
            $('#txttext').focus();
            return false;
        }
    }
    if ($('#ChkPush').is(':checked')) {
        var push = $('#txtPush').val();
        if (push == '' || push.trim().length == 0) {
            alert('Please enter Push Message');
            $('#txtPush').addClass('errorbox');
            $('#txtPush').focus();
            return false;
        }
    }
    if ($('#ChkIVR').is(':checked')) {
        var push = $('#txtIvr').val();
        if (push == '' || push.trim().length == 0) {
            alert('Please enter IVR message');
            $('#txtIvr').addClass('errorbox');
            $('#txtIvr').focus();
            return false;
        }
    }
    if ($('#ChkEmail').is(':checked')) {
        var sub = $('#txtSubject').val();
        if (sub == '' || sub.trim().length == 0) {
            alert('Plesase enter Subject');
            $('#txtSubject').addClass('errorbox');
            $('#txtSubject').focus();
            return false;
        }
        else if ($('#summernote').summernote('code') == '') {
            alert('Please enter Message body');
            return false;
        }
    }   
    return true;
}

function bindddlTemplate()
{
    loader.showloader();
    $.ajax({
        type: "POST",
        url: "configure-notificationtemplates.aspx/GetTemplates",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            loader.hideloader();
            var data = JSON.parse(response.d);
            $('#ddlChooseTemplate').append($('<option></option>').val('').html('Select Template'))
            for (var i = 0; i < data.length; i++) {
                $('#ddlChooseTemplate').append($('<option></option>').val(data[i].TemplateID).html(data[i].TemplateType));
            }
            $('#ddlChooseTemplate').val('');
        },
        failure: function (response) {
        }
    });
}

function submitData() {    
    loader.showloader();
    if (ValidateAll()) {
        try {
            var markupStr = $('#summernote').summernote('code');
            var mode = '';
            var TemplateId = $("#ddlChooseTemplate").val();
            $('input[name="mode"]:checked').each(function () {
                mode += this.value + ',';
            });          
            if (hdfRemovefile == 0) { src = ''; }           
            var templateid = TemplateId != "" ? TemplateId : "";           
            var param = {
                'templateId': templateid, 'TextMessage': $('#txttext').val(), 'mode': mode, 'PushMessage': $('#txtPush').val(),'IVRMessage': $('#txtIvr').val(), 'EMailSubject': $('#txtSubject').val(), 'EMailBody': markupStr, 'src': src

            };
            $.ajax({
                type: "POST",
                url: "configure-notificationtemplates.aspx/SaveData",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(param),
                success: function (data) {
                    data = data.d;
                    var result = $.parseJSON(data);
                    Reset();                    
                    if (result.Table[0]["STATUS"] == 1) {
                        loader.hideloader();
                        alert('Notification Template has been saved successfully');
                        window.location.href = 'configure-notificationtemplates.aspx';
                    }                   

                },
                error: function (request, status, error) { //alert('Error!! ' + request.statusText); 
                }
            });
        }
        catch (e) { }
    }
    else { loader.hideloader(); }
}

$(document).ready(function () {
    $('#summernote').summernote();
    
    try {
        $("#btnRemoveFile").hide();        
    }
    catch (e) {
        console.log(e.message);
    }
    $('#Chktext').change(function () { checkboxclick(); });
    $('#ChkEmail').change(function () { checkboxclick(); });
    $('#ChkPush').change(function () { checkboxclick(); });
    $('#ChkIVR').change(function () { checkboxclick(); });
    $("#ddlMode").change(function () {
        var selectedVal = [];
        $('#ddlMode :selected').each(function (i, selected) {
            selectedVal[i] = $(selected).text();
        });
        $('#divemail').hide();
        $('#divtext').hide();
        $('#divpush').hide();
        $('#divivr').hide();
        for (var i = 0; i < selectedVal.length; i++) {
            showtestbox(selectedVal[i]);           
        }
    });
    debugger;
    bindddlTemplate();
    Getdata();
});

function checkboxclick() {
    $('#divemail').hide();
    $('#divtext').hide();
    $('#divpush').hide();
    $('#divivr').hide();
    $('input[name="mode"]:checked').each(function () {
        showtestbox(this.value);
    });

}

function showtestbox(value) {
    switch (value) {
        case 'Email':
            $('#divemail').show();
            break;
        case 'Text':
            $('#divtext').show();
            break;
        case 'Push':
            $('#divpush').show();
            break;
        case 'IVR':
            $('#divivr').show();
            break;
        default:
            $('#divemail').hide();
            $('#divtext').hide();
            $('#divpush').hide();
            $('#divivr').hide();
    }
}

function setcheck(value) {
    switch (value) {
        case 'Email':
            $('#ChkEmail').prop('checked', true);
            break;
        case 'Text':
            $('#Chktext').prop('checked', true);
            break;
        case 'Push':
            $('#ChkPush').prop('checked', true);
            break;
        case 'IVR':
            $('#ChkIVR').prop('checked', true);
            break;
        default:
            $('#ChkEmail').prop('checked', false);
            $('#Chktext').prop('checked', false);
            $('#ChkPush').prop('checked', false);
            $('#ChkIVR').prop('checked', false);
    }
}

function Getdata() {
    try {
        $('#ddlChooseTemplate').change(function () {
            loader.showloader();
            var selected = $('#ddlChooseTemplate').val();
            if (selected == ""){
                $('input[type=checkbox][name=mode]').prop('checked', false);
                $('#divemail').hide();
                $('#divtext').hide();
                $('#divpush').hide();
                $('#divivr').hide();
                loader.hideloader();
                return false;
            }
            var param = { templateid: selected };
            $.ajax({
                type: "POST",
                url: "configure-notificationtemplates.aspx/getTemplatadataById",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data) {
                    data = data.d;
                    templateData = $.parseJSON(data);
                    ConvertData();
                    $('#divemail').hide();
                    $('#divtext').hide();
                    $('#divpush').hide();
                    $('#divivr').hide();
                    if (TemplateTable.Tables[0].Rows['IsText'] == "1") {
                        setcheck('Text');
                        showtestbox('Text');
                        var isChecked = $('#Chktext:checked').val() ? true : false;
                        if (isChecked == true) {
                            $('#Chktext').prop('checked', true);
                        }

                    }
                    else {
                        var isChecked = $('#Chktext:checked').val() ? true : false;
                        if (isChecked == true) {
                            $('#Chktext').prop('checked', false);

                        }
                    }

                    if (TemplateTable.Tables[0].Rows['IsPush'] == "1") {
                        setcheck('Push');
                        showtestbox('Push');
                    }
                    else {
                        var isChecked = $('#ChkPush:checked').val() ? true : false;
                        if (isChecked == true) {
                            $('#ChkPush').prop('checked', false);

                        }
                    }

                    if (TemplateTable.Tables[0].Rows['IsIVR'] == "1") {
                        setcheck('IVR');
                        showtestbox('IVR');
                    }
                    else {
                        var isChecked = $('#ChkIVR:checked').val() ? true : false;
                        if (isChecked == true) {
                            $('#ChkIVR').prop('checked', false);

                        }
                    }

                    if (TemplateTable.Tables[0].Rows['IsEMail'] == "1") {
                        setcheck('Email');
                        showtestbox('Email');
                    }
                    else {
                        var isChecked = $('#ChkEmail:checked').val() ? true : false;
                        if (isChecked == true) {
                            $('#ChkEmail').prop('checked', false);
                        }
                    }

                    $('#txttext').val([TemplateTable.Tables[0].Rows["TextMessage"]]);
                    $('#txtPush').val(TemplateTable.Tables[0].Rows["PushMessage"]);
                    $('#txtSubject').val(TemplateTable.Tables[0].Rows['EmailSubject']);
                    TemplateTable.Tables[0].Rows['EmailBody'] == null ? "" : $('#summernote').summernote('code', TemplateTable.Tables[0].Rows['EmailBody']);//$find("ContentPlaceHolder1_rightpanel_txtEditor").set_content(TemplateTable.Tables[0].Rows['EmailBody']);
                    $("#txtIvr").val(TemplateTable.Tables[0].Rows["IVRMessage"]);
                    loader.hideloader();
                },
                error: function (request, status, error) { loader.hideloader(); } //alert('Error!! ' + request.statusText);
            })
        })
        
    }
    catch (e) { loader.hideloader(); }
}

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    src = '';
    $("#imageurl").hide();
    hdfRemovefile = 0;
    $('#btnRemoveFile').hide();
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
        TemplateTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function File_OnChange() {
    try {

        var files = $("#fileupd").get(0).files;
        $("#imageurl").hide();
        $("#btnRemoveFile").show();
        if (files.length > 0) {
            //Check file type
            var Extension = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == 'jpg') {
                return true;
            }
            else {
                alert("File extensions allowed: gif, png, bmp, jpg ,jpeg.");
                $("#fileupd").val('');
                return false; // Not valid file type
            }
        }
    }
    catch (e) { }
}
