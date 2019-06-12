var offset;

function loaddata()
{
    loader.showloader();
    var param = { Mode: "0", Offset: offset };
    $.ajax({
        type: "POST",
        url: "SchedulerMaintenance.aspx/LoadData",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            if (status == "success") {
                var datetime = JSON.parse(data.d)[0].MDate.split('T');               
                var date = datetime[0].split('-');
                $('#txtDate').val(date[1] + '/' + date[2] + '/' + date[0]);   
                $('#txtTime').val(datetime[1].substr(0, 5));
                $('#txtDurationtime').val(JSON.parse(data.d)[0].MDuration);
                $('#chkbxenable').prop('checked',JSON.parse(data.d)[0].IsEnable);
                $('#summernote').summernote('code', JSON.parse(data.d)[0].MDetail);
                loader.hideloader();

            }
            else {
                alert('Data not loaded');
                return false;
                loader.hideloader();
            }
        }
    });
}

$(document).ready(function () {
    $('#summernote').summernote();
    var date = new Date();
     offset = date.getTimezoneOffset();
    loaddata();

    $('#btnSave').click(function () {

        if (ValidateCongPage('divMaintenance')) {

            if (ValidateDateFormat($('#txtDate').val()) != true) {
                alert('Please provide date in MM/DD/YYYY format.');
                $('#txtDate').focus();
                return false;
            }
            if (validateTime($('#txtTime').val()) != true) {
                $('#txtTime').focus();
                return false;
            }
            if (isNaN($('#txtDurationtime').val()) == true) {
                alert('Please provide Duration in min only.');
                $('#txtDurationtime').focus();
                return false;
            }
            if (($('#txtDurationtime').val() == 0) || ($('#txtDurationtime').val() == '') || (parseInt($('#txtDurationtime').val()) < 0)) {
                alert('Duration cannot be zero or empty.');
                $('#txtDurationtime').focus();
                return false;
            }
            var isenable = $('#chkbxenable').is(":checked");
          


            loader.showloader();
            var param = { Time: $('#txtTime').val(), Date: $('#txtDate').val(), Duration: $('#txtDurationtime').val(), Content: $('#summernote').summernote('code'), IsEnable: isenable, Offset: offset };
            $.ajax({
                type: "POST",
                url: "SchedulerMaintenance.aspx/SaveData",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data, status) {
                    if (JSON.parse(data.d)[0].STATUS == 1) {
                        alert('Scheduler for Maintenance saved successfully');
                    }
                    else {
                        alert('Scheduler for Maintenance did not submitted');
                        return false;
                    }
                }
            });
            loader.hideloader();


        }
        else { return false; }

    });

    $('#btnClear').click(function () {
        $('#summernote').summernote('code', '');
        $("form input:text").val(''); //For All TextBoxes on the page.
        $("form input:checkbox").attr('Checked', false); //For All Checkboxes on the page.
        $("form select").each(function () { $(this)[0].selectedIndex = 0; }); //For All Dropdownlists and Listboxes on the page makes 0 as selected index.
        $("form textarea").val(''); //For All Textareas on the page.
        return false;

    });
});

function ValidateDateFormat(dt) {
    var date_regex = /^(0[1-9]|1[0-2])\/(0[1-9]|1\d|2\d|3[01])\/(19|20)\d{2}$/;
    if (!(date_regex.test(dt))) {
        return false;
    }
    else {

        return true;
    }
}

function validateTime(strTime) {
    var timRegX = /^(\d{1,2}):(\d{2})?$/;

    var timArr = strTime.match(timRegX);
    if (strTime == "") {
        alert('Please provide Scheduler Maintenance Time.');
        return false;
    }
    if (timArr == null) {
        alert("Time is not in a valid format.");
        $('#txtTime').focus();
        return false;
    }
    hour = timArr[1];
    minute = timArr[2];



    if (hour < 0 || hour > 23 || hour == undefined) {
     
        alert("Hour must be between 0 and 23");
        $('#txtTime').focus();
        return false;
    }

    if (minute < 0 || minute > 59 || minute == undefined) {
        alert("Minute must be between 0 and 59.");
        $('#txtTime').focus();
        return false;
    }
   

    var dt = Date.parse($('#txtDate').val() + ' ' + $('#txtTime').val());
    var d = new Date(dt);
    if (d < (new Date())) {
        alert('Scheduler cannot be configured for past date and time');
        $('#txtTime').focus();
        return false;
    }
    return true;
}

function getalertmessage(obj) {
    var msg = "";
    if ($(obj).attr('ValidateMessage') != undefined) {
        msg = $(obj).attr('ValidateMessage');
        if (msg == '') {
            msg = "Please enter " + $(obj).attr('title');
        }
    }
  
    else {
        msg = "Please enter " + $(obj).attr('title');
    }
    return " " + msg;
}

function ValidateCongPage(tblid) {
    var isvalid = true;
    var cnt = 0;
    var ctrlObj = $('#' + tblid + ' [mandatory="1"]');
    $(ctrlObj).each(function () {
        if ($(this).val() == '' && ($(this).css('display') != 'none')) {
            cnt++;
        }
    });
    if (cnt > 1) {
        alert('Please fill all mandatory fields.');
        return false;
    }
    $(ctrlObj).each(function () {

        if ($(this).val() == '') {
            if ((this.tagName).toLowerCase() == 'input') {
                // alert('Please enter ' + this.title + '.');
                alert(getalertmessage($(this)));
            }
            else if ((this.tagName).toLowerCase() == 'select') {
                alert('Please select ' + this.title + '.');
            }
            $(this).focus();
            isvalid = false;
            return false;
            //  }
        }

       
        var content = $('#summernote').summernote('code');
        if (content == '') {
            alert('Please enter content.');
            $(this).focus();
            isvalid = false;
            return false;
        }
    });
    return isvalid;
}