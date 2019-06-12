var CampaignTable = {};
var TemplateTable = {};
var databindtogrid;
var Tables, templateData;
var databindtogrid;
var Tables, CampaignData;
var mode = '2';
var GridHeight = '320px';
var qrStr;
var mode = 2;
var CampaignId, CampaignTypeId = '', SegmentId = '', CampaignName = '', Description = '', Status = '', Frequency = '', Recurring = '', TemplateId = '';

$(document).ready(function () {
    $('#summernote').summernote();

    try {
        var qrStr;
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < 1; i++) {
            var pair = vars[i].split('=');
            qrStr = decodeURIComponent(pair[1]);
        }
        if (qrStr > 0) {
            $('#lblHeaderText').html('Update Campaign');
            $('#btnSaveCreateCampaign').html('Update');
            var param = { 'iMode': 2, 'CampaignID': qrStr };
            CallAjax(Error, param);
        }
        else {
            $('#lblHeaderText').html('Add Campaign');
            $('#btnSaveCreateCampaign').html('Save');
        }

        $('#Chktext').change(function () {
            checkboxclick();
        });

        $('#ChkEmail').change(function () {
            checkboxclick();
        });

        $('#ChkPush').change(function () {
            checkboxclick();
        });

        $('#ChkIVR').change(function () {
            checkboxclick();
        });

        $("#ddlLoadTemplate").change(function () {
            LoadCommunication();
        });

        $("#checkbox_div input:radio").click(function () {
            if ($('input:radio[name=myRadio]:checked').val() == 'One Time') {
                $("#recurring").hide();
                $("#ddlFrequency").removeAttr('mandatory')
                $('#ddlFrequency option:selected').val('');
                $("#date").show();
            }
            else {
                $("#recurring").show();
                if ($('#ddlFrequency option:selected').text() == 'Daily') {
                    $("#weekly").hide();
                    $("#monthly").hide();
                    $("#date").show();
                    $("#datetimepicker4").attr('mandatory')
                }
                else {
                    $("#date").hide();
                    $("#datetimepicker4").removeAttr('mandatory');
                }
            }
        });

        $('#ddlFrequency').change(function () {
            if ($('#ddlFrequency option:selected').text() == 'Daily') {
                $("#weekly").hide();
                $("#monthly").hide();
                $("#MonthDate").hide();
                $("#date").show();
                $("#datetimepicker4").attr('mandatory')
            } else if ($('#ddlFrequency option:selected').text() == 'Weekly') {
                $("#weekly").show();
                $("#monthly").hide();
                $("#date").hide();
                $("#MonthDate").hide();
                $("#datetimepicker4").removeAttr('mandatory');
            }
            else if ($('#ddlFrequency option:selected').text() == 'Monthly') {
                $("#monthly").show();
                $("#weekly").hide();
                $("#date").hide();
                $("#MonthDate").show();
                $("#datetimepicker4").removeAttr('mandatory')
            }
            else if ($('#ddlFrequency option:selected').text() == 'Yearly') {
                $("#monthly").hide();
                $("#weekly").hide();
                $("#MonthDate").hide();
                $("#date").show();
                $("#datetimepicker4").attr('mandatory');
            }
        });

        $('#btnSaveCreateCampaign').click(function () {
            var month = '';
            var week = '';
            if ($('input:radio[name=myRadio]:checked').val() == 'One Time') {
                $("#datetimepicker4").attr('mandatory');
            }
            else {
                $("#datetimepicker4").removeAttr('mandatory');
            }
            // ValidatePage('altrnte');
            $('input[name="week"]:checked').each(function () {
                week += this.value + '|';
            });

            $('input[name="month"]:checked').each(function () {
                month += this.value + '|';
            });

            $('#hdnWeekly').val(week);
            $('#hdnMonthly').val(month);
            if (ValidateAll('altrnte') && ValidatePage('altrnte') && CompaignValidation() && templatevalidation()) {
                SaveCompaign();
                savedata();
            }
            //SaveCompaign();
            //if (templatevalidation())
            //savedata();
        })

    }
    catch (e) {
        console.log(e.message);
    }

});

function SaveCompaign() {

    //$("#selector option:selected").val()
    //( string status, string Description,string TemplateId,string CampaignId) datetimepicker4

    //var id = GetParameterValues('compaignid');
    loader.showloader();
    var rec = 'true';
    if ($('input:radio[name=myRadio]').is(':checked')) {
        if ($('input:radio[name=myRadio]:checked').val() == 'One Time') {
            rec = 'false';
        }
    }
    //var param = { 'CampaignTypeId': $('#ddlType option:selected').val(), 'CampaignName': $('#txtCampaignName').val(), 'SegmentId': $('#ddlSegmentID option:selected').val(), 'Frequency': $('#ddlFrequency option:selected').val(), 'status': 'true', 'Description': $('#txtDescription').val(), 'TemplateId': $('#ddlLoad option:selected').val(), 'CampaignId': GetParameterValues('compaignid'), 'FrequencyItem': '1', 'hdnWeekly': '1', 'hdnMonthly': '1', 'Schedule': '1', 'Recurring': '1' }
    var param = { 'CampaignTypeId': $('#ddlType option:selected').val(), 'CampaignName': $('#txtCampaignName').val(), 'SegmentId': $('#ddlSegmentID option:selected').val(), 'Frequency': $('#ddlFrequency option:selected').val(), 'status': 'true', 'Description': $('#txtDescription').val(), 'TemplateId': $('#ddlLoadTemplate option:selected').val(), 'CampaignId': GetParameterValues('campaignid'), 'FrequencyItem': $('#ddlFrequency option:selected').text(), 'hdnWeekly': $('#hdnWeekly').val(), 'hdnMonthly': $('#hdnMonthly').val(), 'Schedule': $('#datetimepicker4').val(), 'Recurring': rec, 'MonthDate': $('#ddlDate option:selected').val() }
    $.ajax({
        async: true,
        type: "POST",
        url: "crm-create-campaign.aspx/SaveCreateCampaign",
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        data: JSON.stringify(param),
        success: function (data) {
            data = data.d;
            var result = $.parseJSON(data);
            reset();
            if (result.Table[0]["STATUS"] == 1) {
                alert(result.Table[0]["Message"]);
                window.location.href = 'crm-campaign-configuration.aspx';
            }
            else {
                alert(result.Table[0]["Message"]);
            }
            //else if (result.Table[0]["STATUS"] == 1)
            // { alert('Campaign updated successfully'); }

            loader.hideloader();

        },
        error: function (request, status, error) {
            loader.hideloader();//alert('Error!! ' + request.statusText); 
        }
    });
}

function GetParameterValues(param) {
    var urlparam = '';
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
        else return '';
    }
}

function File_OnChange() {
    try {

        var files = $("#fileupd").get(0).files;

        if (files.length > 0) {
            //Check file type
            var Extension = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == 'jpg') {
                $("#imageurl").html(files[0].name);
                if (files.length > 0) {
                    $('#btnRemoveFile').show();
                }
                else {
                    $('#btnRemoveFile').hide();
                }
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

function ValidateAll(tblid) {
    debugger
    var errMsg = "Please enter all the mandatory information";
    var ctrlObj = $('#' + tblid + ' [mandatory="1"]');
    var count = 0;
    var focus = '';
    if (ctrlObj.length > 1) {
        $(ctrlObj).each(function () {
            if ($(this).val() == '') {
                //focus = $(this);
                count += 1;
            }
        });
        if (count > 1) {
            alert(errMsg);
            //$(focus).focus();
            return false;
        } else {
            return true;
        }
    }
    else {
        return true;
    }
}

function CompaignValidation() {
    if ($('input:radio[value="Recurring"]').is(':checked')) {
        if ($('#ddlFrequency')[0].selectedIndex == 0) {
            alert('Please Select Frequency');
            return false;
        }
        var frequency = $('#ddlFrequency option:selected').text();
        if (frequency == "Weekly") {
            var week = '';
            $('input[name="week"]:checked').each(function () { week += this.value + '|'; })
            if (week == '') {
                alert('Please Select Days');
                return false;
            }
        }
        else if (frequency == "Monthly") {
            var week = '';
            $('input[name="month"]:checked').each(function () { week += this.value + '|'; })
            if (week == '') {
                alert('Please Select Months');
                return false;
            }
            //if($('#ddlDate option:selected').val()=='')
            //{
            //    alert('Please Select Date');
            //    return false;
            //}
        }
    }
    return true;
}

function templatevalidation() {

    if ($("#ddlLoadTemplate").val() == '') {
        alert('Choose Template');
        return false;
    }
    if ($('#Chktext').is(':checked')) {
        if ($('#txtText').val() == "") {
            alert('Please Enter Text');
            $('#txtText').focus();
            return false;
        }
    }
    if ($('#ChkPush').is(':checked')) {
        if ($('#txtPush').val() == "") {
            alert('Please Enter Push');
            $('#txtPush').focus();
            return false;
        }
    }
    if ($('#ChkEmail').is(':checked')) {
        if ($('#txtSubject').val() == "") {
            alert('Please Enter Subject');
            $('#txtSubject').focus();
            return false;
        }
        var email = $('#summernote').summernote('code'); // $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl00").get_content();
        if (email == "") {
            alert('Please Emter Email');
            return false;
        }
    }
    return true;
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

function submitData() {
    try {
        // templatevalidation();
        var Action = 0;
        var mode = '';
        $('input[name="mode"]:checked').each(function () {
            mode += this.value + ',';
        });
        if (hdfRemovefile == 0) { src = ''; }
        var status = 1;
        var user = 0;
        var templateid = $('#ddlLoadTemplate option:selected').val();
        if (templateid != "") { Action = 2; } else { Action = 0; }
        var param = {
            'templateId': templateid, 'TextMessage': $('#txtText').val(), 'mode': mode, 'PushMessage': $('#txtPush').val(), 'EMailSubject': $('#txtSubject').val(), 'EMailBody': $('#summernote').summernote('code'), 'src': src
            // 'templateId': templateid, 'TextMessage': $('#txtDescription').val(), 'mode': mode, 'PushMessage': $('#txtPush').val() , 'EMailSubject': $('#txtSubject').val() , 'EMailBody': $find("ContentPlaceHolder1_rightpanel_txtEditor_ctl02_ctl01").get_content() , 'src': src
        };
        $.ajax({
            type: "POST",
            url: "crm-create-campaign.aspx/updatetemplate",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                var result = $.parseJSON(data);
                //reset();
                //if (Action == 0 && result.Table[0]["STATUS"] == 1)
                //    alert('Template saved successfully');
                //else if (Action == 2 && result.Table[0]["STATUS"] == 1)
                //{ alert('Template updated successfully'); }
            },
            error: function (request, status, error) { //alert('Error!! ' + request.statusText); 
            }
        });
    }
    catch (e) { alert(e.toString()); }

}

$(function () {
    var $select = $(".1-28");
    for (i = 1; i <= 28; i++) {
        if ($select.length > 1)
            $select.remove($('<option></option>').val(i).html(i));
    }

    for (i = 1; i <= 28; i++) {
        $select.append($('<option></option>').val(i).html(i));
    }
});

function LoadCommunication() {
    try {
        loader.showloader();
        $("#Chktext").prop("checked", false)
        $("#ChkEmail").prop("checked", false)
        $("#ChkPush").prop("checked", false)
        $("#ChkIVR").prop("checked", false)
        checkboxclick();
        
        var param1 = { 'iMode': 3, 'templateid': $('#ddlLoadTemplate option:selected').val() };
        $.ajax({
            type: "POST",
            url: "crm-add-template.aspx/getTemplatadataById",
            data: JSON.stringify(param1),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                data = data.d;
                templateData = $.parseJSON(data);
                ddlLoadTemplateData();
                var arr = TemplateTable.Tables[0].Rows["Mode"].split(",");
                $('#divemail').hide();
                $('#divtext').hide();
                $('#divpush').hide();
                $('#divivr').hide();
                for (var i = 0; i < arr.length; i++) {
                    $('[name=multiple]').val(["Multiple"]);
                    $("#ddlMode option[text='" + arr[i].trim() + "']").attr("selected", "true");
                    showtestbox(arr[i].trim());
                }
                $("#txtText").val(TemplateTable.Tables[0].Rows["TextMessage"]);
                // $('#txtDescription').val([TemplateTable.Tables[0].Rows["TextMessage"]]);
                $('#txtPush').val(TemplateTable.Tables[0].Rows["PushMessage"]);
                $('#txtSubject').val(TemplateTable.Tables[0].Rows['EMailSubject']);
                if (TemplateTable.Tables[0].Rows['EMailBody'] != null)
                    $('#summernote').summernote('code', TemplateTable.Tables[0].Rows['EMailBody']);
                var imgsrc = TemplateTable.Tables[0].Rows["AttachmentPath"];
                var strpath = '<a href="' + '../' + 'Attachments' + '/' + 'templates' + '/' + TemplateTable.Tables[0].Rows["AttachmentPath"] + '" style="text-decoration:none; padding-top:6px; color:#000; margin-left: 0px;" target="_blank">' + '<b>' + TemplateTable.Tables[0].Rows["AttachmentPath"] + '</b>' + '</a>';
                if (imgsrc != null) {
                    $("#imageurl").html('');
                    $("#imageurl").html ('<i>'+strpath + "</i>");
                    $("#btnRemoveFile").show();
                }
                else {
                    $("#imageurl").html('<i>No File Chosen</i>');
                    $("#btnRemoveFile").hide();
                }
                loader.hideloader();
            },
            error: function (e) {
                loader.hideloader();
            },
        })
    }
    catch (e) {
        alert(e.toString()); loader.hideloader();
    }
}

function checkarrayvalue(arr, value) {
    var ismatched = false;
    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == value) {
            ismatched = true;
            break;

        }
    }
    return ismatched;
}

function CallAjax(fnError, param) {
    loader.showloader();
    $.ajax({
        type: "POST",
        url: "crm-create-campaign.aspx/getCampaignDataById",
        data: JSON.stringify(param),
        //async: false,
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        //data: { id: 'k' },
        success: function (response, status, type) {
            CampaignData = $.parseJSON(response.d);
            ConvertData();
            $('#txtCampaignName').val(CampaignTable.Tables[0].Rows["Campaign"]);
            if (CampaignTable.Tables[0].Rows["Schedule"] != null) {
                
                var datetime = CampaignTable.Tables[0].Rows["Schedule"].split('T');
                var d = new Date(CampaignTable.Tables[0].Rows["Schedule"]);
                var date = datetime[0].split('-');
                date = date[1] + '/' + date[2] + '/' + date[0];
                var hours = d.getHours() > 12 ? d.getHours() - 12 : d.getHours();
                var am_pm = d.getHours() >= 12 ? "PM" : "AM";
                hours = hours < 10 ? "0" + hours : hours;
                var minutes = d.getMinutes() < 10 ? "0" + d.getMinutes() : d.getMinutes();
                //var seconds = date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
                time = date + " " + hours + ":" + minutes + " " + am_pm;
                $('#datetimepicker4').val(time);
            }
            // var datetime = CampaignTable.Tables[0].Rows["Schedule"].split('T');
            // var date = datetime[0].split('-');
            // $('#txtDate').val(date[1] + '/' + date[2] + '/' + date[0]);
            // $('#txtTime').val(datetime[1].substr(0, 5));


            $("#txtDescription").val(CampaignTable.Tables[0].Rows["Description"]);
            $("#ddlLoadTemplate option").each(function () {
                $('#templatevalue').val(CampaignTable.Tables[0].Rows["TemplateId"]);
                if ($(this).val() == CampaignTable.Tables[0].Rows["TemplateId"]) {
                    $(this).attr('selected', 'selected');
                    //$(".btn:first-child").text($(this).text());
                    //$(".btn:first-child").val($(this).val());

                }
            });
            LoadCommunication();
            var MonthDate = CampaignTable.Tables[0].Rows['MonthDate'];
            if (MonthDate != null) {
                $('#ddlDate').val(MonthDate).attr('selected', 'selected');
            }
            else
                $('#ddlDate').val(1).attr('selected', 'selected');
            if (CampaignTable.Tables[0].Rows["Recurring"] == 'Recurring') {
                $('input[value="Recurring"]').attr('checked', true);
                $("#recurring").show();
                var reccType = CampaignTable.Tables[0].Rows["Frequency"];
                if (reccType == 'Daily') {
                    $("#weekly").hide();
                    $("#monthly").hide();
                    $("#date").show();
                } else if (reccType == 'Weekly') {
                    $('input:radio[name=myRadio]:checked').val('Recurring');
                    $("#weekly").show();
                    $("#monthly").hide();
                    $("#date").hide();
                    if (CampaignTable.Tables[0].Rows["WeekDay"] != null) {
                        var weekdays = (CampaignTable.Tables[0].Rows["WeekDay"]).split('|');
                        $('#weekly input[type="checkbox"]').each(function () {
                            if (checkarrayvalue(weekdays, $(this).val())) {
                                $(this).prop('checked', true);
                            }
                        });
                    }
                }
                else if (reccType == 'Monthly') {
                    $('input:radio[name=myRadio]:checked').val('Recurring');
                    $("#monthly").show();
                    $("#MonthDate").show();
                    $("#weekly").hide();
                    $("#date").hide();
                    if (CampaignTable.Tables[0].Rows["MonthDay"] != null) {
                        var monthdays = (CampaignTable.Tables[0].Rows["MonthDay"]).split('|');
                        $('#monthly input[type="checkbox"]').each(function () {
                            if (checkarrayvalue(monthdays, $(this).val())) {
                                $(this).prop('checked', true);
                            }
                        });
                    }
                }
                else if (reccType == 'Yearly') {
                    $("#monthly").hide();
                    $("#weekly").hide();
                    $("#MonthDate").hide();
                    $("#date").show();
                    $("#datetimepicker4").attr('mandatory');
                    $('input:radio[name=myRadio]:checked').val('Recurring');
                    $('#ddlFrequency option:selected').val(3);
                }
                //var arr = TemplateTable.Tables[0].Rows["Mode"].split(",");
            }
            else if (CampaignTable.Tables[0].Rows["Recurring"] == 'One Time') {
                $("#date").show();
                $('input:radio[name=myRadio]:checked').val('One Time');
            }

            $("#ddlType option").each(function () {
                if ($(this).text() == CampaignTable.Tables[0].Rows["Type"]) {
                    $(this).attr('selected', 'selected');
                }
            });

            $("#ddlSegmentID option").each(function () {
                if ($(this).text() == CampaignTable.Tables[0].Rows["Segment"]) {
                    $(this).attr('selected', 'selected');
                }
            });

            $("#ddlFrequency option").each(function () {
                if ($(this).text() == CampaignTable.Tables[0].Rows["Frequency"]) {
                    $(this).attr('selected', 'selected');
                }
            });
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
   // $("#imageurl").hide();
    hdfRemovefile = 0;
    $('#btnRemoveFile').hide();
    $("#imageurl").html('<i>No File Chosen</i>');
}

function ConvertData() {
    try {
        Tables = new Array();
        $.map(CampaignData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        CampaignTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function ddlLoadTemplateData() {
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
    $('#txtCampaignName').val('');
    $('#txtCampaignCode').val('');
    $('#txtDescription').val('');
    $("#ddlType").val('');
    $("#ddlServiceType").val('');
    $('#ddlSegmentID option').eq(0).prop('selected', true);
    $('#ddlLoadTemplate option')[0].selected = true;
    $('#datetimepicker4').val('');
    $("#Chktext").prop("checked", false)
    $("#ChkEmail").prop("checked", false)
    $("#ChkPush").prop("checked", false)
    $("#ChkIVR").prop("checked", false)
    checkboxclick();
}

function Count(text, long) {
    var maxlength = new Number(long); // Change number to your max length.
    if (text.value.length > maxlength) {
        text.value = text.value.substring(0, maxlength);
        alert(" More than " + long + " characters not allowed");

    }
}

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
            $("#ChkEmail").prop("checked", true);
            $('#btnRemoveFile').hide();
            break;
        case 'Text':
            $('#divtext').show();
            $("#Chktext").prop("checked", true)
            break;
        case 'Push':
            $('#divpush').show();
            $("#ChkPush").prop("checked", true)
            break;
        case 'IVR':
            $('#divivr').show();
            $("#ChkIVR").prop("checked", true)
            break;
    }
}
