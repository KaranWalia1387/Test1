var dt_saveresult;
var TemplateTable = {};
var databindtogrid;
var Tables, templateData;
var mode = '3';
var GridHeight = '320px';
var qrStr;
var mode = 3;
var TemplateId = "", Description = '', Status = '';
var src = '';
var hdfRemovefile = 1;

function ValidateAll() {
    var errMsg = "Please fill mandatory fields";
    var countcheckbox = 0;
    var temname = $('#txtTemplateName').val();
    if (temname.trim().length == 0 || temname == '') {
        alert(errMsg);
        $('#txtTemplateName').addClass('errorbox');
        $('#txtTemplateName').focus();
        return false;
    }
    $('input[name="mode"]:not(:checked)').each(function () {
        ++countcheckbox;
    });
    if (countcheckbox == 4) {
        alert('Please select mode');
        return false;
    }
    if ($('#Chktext').is(":checked")) {
        var text = $('#txttext').val();
        if (text == '' || text.trim().length == 0) {
            alert('Please Enter text message');
            $('#txttext').addClass('errorbox');
            $('#txttext').focus();
            return false;
        }
    }
    if ($('#ChkPush').is(':checked')) {
        var push = $('#txtPush').val();
        if (push == '' || push.trim().length == 0) {
            alert('Please enter push message');
            $('#txtPush').addClass('errorbox');
            $('#txtPush').focus();
            return false;
        }
    }
    if ($('#ChkEmail').is(':checked')) {
        var sub = $('#txtSubject').val();
        if (sub == '' || sub.trim().length == 0) {
            alert('Plesase Enter Subject');
            $('#txtSubject').addClass('errorbox');
            $('#txtSubject').focus();
            return false;
        }
        else if ($('#summernote').summernote('code') == '') {
            alert('Please Enter message body');
            return false;
        }
    }
    return true;
}

function submitData() {
    if (ValidateAll()) {
        try {
            var Action = 0;
            var mode = '';
            var tempname = $("#txtTemplateName").val();
            $('input[name="mode"]:checked').each(function () {
                mode += this.value + ',';
            });
            if (hdfRemovefile == 0) { src = ''; }
            var status = 1;
            var user = 0;
            var templateid = TemplateId != "" ? TemplateId : "";
            if (templateid != "") { Action = 2; } else { Action = 0; }
            var param = {
                'action': Action, 'name': tempname, 'status': status, 'templateId': templateid, 'TextMessage': $('#txttext').val(), 'mode': mode, 'user': user, 'PushMessage': $('#txtPush').val(), 'EMailSubject': $('#txtSubject').val(), 'EMailBody': $('#summernote').summernote('code'), 'src': src

            };
            $.ajax({
                type: "POST",
                url: "crm-add-template.aspx/SaveData",
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                data: JSON.stringify(param),
                success: function (data) {
                    data = data.d;
                    var result = $.parseJSON(data);
                    reset();
                    if (Action == 0 && result.Table[0]["STATUS"] == 1) {
                        alert('Template saved successfully');
                        window.location.href = 'crm-template.aspx';
                    }
                    else if (Action == 2 && result.Table[0]["STATUS"] == 1) {
                        alert('Template updated successfully');
                        window.location.href = 'crm-template.aspx';
                    }
                    else {
                        alert("Template already exists");
                    }

                },
                error: function (request, status, error) { //alert('Error!! ' + request.statusText); 
                }
            });
        }
        catch (e) { }
    }
    else { }
}

$(document).ready(function () {
    try {
        $('#summernote').summernote();
        $("#btnRemoveFile").hide();
        var qrStr;
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < 1; i++) {
            var pair = vars[i].split('=');
            qrStr = decodeURIComponent(pair[1]);

        }
        if (qrStr > 0) {
            TemplateId = qrStr;
            var param1 = { 'iMode': 3, 'templateid': qrStr };
            Getdata(Error, param1);
        }
        else {
        }

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

    $('#btnClear').click(function () {
        reset();
    })
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
    }
}

function setcheck(value) {
    switch (value) {
        case 'Email':
            $('#ChkEmail').attr('checked', true);
            break;
        case 'Text':
            $('#Chktext').attr('checked', true);
            break;
        case 'Push':
            $('#ChkPush').attr('checked', true);
            break;
        case 'IVR':
            $('#ChkIVR').attr('checked', true);
            break;
    }
}

function Getdata(fnError, param1) {
    loader.showloader();
    $.ajax({
        type: "POST",
        url: "crm-add-template.aspx/getTemplatadataById",
        data: JSON.stringify(param1),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            data = data.d;
            templateData = $.parseJSON(data);
            ConvertData();
            $('#txtTemplateName').val(TemplateTable.Tables[0].Rows["Name"]);
            var arr = TemplateTable.Tables[0].Rows["Mode"].split(",");
            $('#divemail').hide();
            $('#divtext').hide();
            $('#divpush').hide();
            $('#divivr').hide();
            for (var i = 0; i < arr.length; i++) {
                setcheck(arr[i].trim());
                showtestbox(arr[i].trim());
            }
            $('#txttext').val([TemplateTable.Tables[0].Rows["TextMessage"]]);
            $('#txtPush').val(TemplateTable.Tables[0].Rows["PushMessage"]);
            $('#txtSubject').val(TemplateTable.Tables[0].Rows['EMailSubject']);
            TemplateTable.Tables[0].Rows['EMailBody'] == null ? "" : $('#summernote').summernote('code', TemplateTable.Tables[0].Rows['EMailBody']);         
            $("#txtDescription").val(TemplateTable.Tables[0].Rows["Description"]);
            var imgsrc = TemplateTable.Tables[0].Rows["AttachmentPath"];
            var strpath = '<a href="' + '../' + 'Attachments' + '/' + 'templates' + '/' + TemplateTable.Tables[0].Rows["AttachmentPath"] + '" style="text-decoration:none; padding-top:6px; color:#000; margin-left: 0px;" target="_blank">' + '<b>' + TemplateTable.Tables[0].Rows["AttachmentPath"] + '</b>' + '</a>';
            if (imgsrc != null) {
                $("#imageurl").append("<span>" + strpath + "</span>");
                $("#btnRemoveFile").show();

            }
            else {
                $("#imageurl").append('<span>' + '<b>No image available</b>' + '</span>');
                $("#btnRemoveFile").hide();
            }
            loader.hideloader();
        },
        error: fnError,
    })

}

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    src = '';
    $("#imageurl").hide();
    hdfRemovefile = 0;
    $('#btnRemoveFile').hide();
    $("#nofile").html('No File Chosen');
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

function reset() {
    $('#ChkEmail').attr('checked', false);
    $('#Chktext').attr('checked', false);
    $('#ChkPush').attr('checked', false);
    $('#ChkIVR').attr('checked', false);
    $("#txtTemplateName").val('');
    var selectedValue = 0;
    $('#txtDescription').val('');
    $('#txtPush').val('');
    $('#txttext').val('');
    $('#txtSubject').val('');
    $('#txtSubject').val('');
    $('#txtIvr').val('');
    $('#summernote').summernote('code', '');
    $("#imageurl").hide();
    $("#btnRemoveFile").hide();
}

function File_OnChange() {
    try {

        var files = $("#fileupd").get(0).files;
        
        $("#imageurl").hide();
        $("#btnRemoveFile").show();

        $("#nofile").html(files[0].name);
        if (files[0].name == "") {
            $('#btnRemoveFile').hide();
        }
        else {
            $('#btnRemoveFile').show();
        }

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

function savedata() {
    if ($('#fileupd').val() != '') {
        $("#btnRemoveFile").show();
        if (GetFileSize('fileupd') == true) {
            $.ajaxFileUpload({
                type: "POST",
                fileElementId: 'fileupd',
                url: "../Upload.ashx?Path=Templates",
                secureuri: false,
                cache: false,
                contentType: 'text/plain',
                dataType: "text",
                success: function (data, status) {
                    src = data;
                    hdfRemovefile = 1;
                    if (data != '') {
                        submitData();
                    }
                    else {
                        alert('Field Not Saved');
                    }

                },
                error: function (data, status, e) {

                    alert(e);
                }
            });
        }
    }
    else { src = ''; hdfRemovefile = 0; submitData(); }

}