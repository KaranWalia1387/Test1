

$(document).ready(function () {
    $('input[type="text"],textarea').blur(function () {
        $(this).val($.trim($(this).val()));
    });

    $("input[type=text][class=Phone]").bind('blur', function (e) {        
        var value = $(this).val();
        if ($(this).val() != '') {
           
            var formatvalue = $(this).val();
            if ((formatvalue.length < 14) || !(formatvalue.lastIndexOf('-') == 9)) {
                alert("Please enter a valid 10 digit " + this.title + "");
                return false;
            }
            var threenumsum = parseInt(formatvalue.charAt(1)) + parseInt(formatvalue.charAt(2)) + parseInt(formatvalue.charAt(3));
            if (threenumsum <= 1) {
                alert("Please enter a valid 10 digit " + this.title + "");
                return false;
            }
            if (formatvalue.charAt(1) == 0) {
                alert("Please enter a valid 10 digit " + this.title + "");
                return false;
            }
        }
        else {
            if ($(this)[0].id == 'txtCustomerService' || $(this)[0].id == 'txtBillingEnquiries') {
                if ($(this)[0].id == 'txtCustomerService') {
                    $('#txtCustomerService').val('');
                    return true;
                }
                if ($(this)[0].id == 'txtBillingEnquiries') {
                    $('#txtBillingEnquiries').val('');
                    return true;
                }
            }
        }
            
        
    });

    $("input[type=button],input[type=submit]").click(function () {
        $("input[type=text][class=Phone]").each(function () {            
                if ($(this).val() != '') {
                  
                    var value = $(this).val();
                    var controlid = $(this)[0].id;
                    if ((value.length < 14) || !(value.lastIndexOf('-') == 9)) {
                        alert("Please enter a valid 10 digit " + this.title + "");
                        return false;
                    }
                    var threenumsum = parseInt(value.charAt(1)) + parseInt(value.charAt(2)) + parseInt(value.charAt(3));
                    if (threenumsum <= 1) {
                        alert("Please enter a valid 10 digit " + this.title + "");
                        return false;
                    }
                    if (value.charAt(1) == 0) {
                        alert("Please enter a valid 10 digit " + this.title + "");
                        return false;
                    }
                }
                else {
                    if ($(this)[0].id == 'txtCustomerService' || $(this)[0].id == 'txtBillingEnquiries') {
                        if($(this)[0].id=='txtCustomerService')
                        {
                            $('#txtCustomerService').val('');
                            return true;
                        }
                        if ($(this)[0].id == 'txtBillingEnquiries') {
                            $('#txtBillingEnquiries').val('');
                            return true;
                        }
                    }
                }
            
        });
    });


    //***************************************************
    try {
        $('.summernote')
            .summernote({
                //toolbar: [
                //  ['style', ['bold', 'italic', 'underline', 'clear']]
                //],
                //placeholder: 'Leave a comment ...',
                callbacks: {
                    onKeydown: function(e) {
                        var t = e.currentTarget.innerText;
                        if (t.trim().length >= 1000) {
                            //delete key
                            if (e.keyCode != 8 && e.keyCode != 46) {
                                e.preventDefault();
                                alert(" More than 1000 characters not allowed");
                            }
                        }
                    },
                    onKeyup: function(e) {
                        var t = e.currentTarget.innerText;
                        // $('#maxContentPost').text(400 - t.trim().length);
                    },
                    onPaste: function(e) {
                        var t = e.currentTarget.innerText;
                        var bufferText = ((e.originalEvent || e).clipboardData || window.clipboardData).getData('Text');
                        e.preventDefault();
                        var all = t + bufferText;
                        if (all.length > 1000) {
                            alert(" More than 1000 characters not allowed");
                        }
                        var reaminaingText = all.trim().substring(0, 1000);
                        document.execCommand('insertText', false, reaminaingText);

                        var value = $('.summernote').summernote('code').replace(/<\/?[^>]+(>|$)/g, "");
                        value = value.substring(0, 999);
                        $('.summernote').summernote('code', '');
                        $('.summernote').summernote('code', value);

                        //document.execCommand('insertText', false, all.trim().substring(0, 1000));

                        // $('#maxContentPost').text(400 - t.length);
                    }
                }
            });
    } catch (e) {
        console.log("Eror in summernote code block : " + e.message);
    }
    //***************************************************

});

// To show mandatory message only once 
function ValidateAllPageFieldsSingleMessage(tblid) {
    $('#' + tblid + ' input[type=text],input[type=password],textarea,select').each(function () {
        if ($(this).val().trim().length == 0)
            $(this).val('');
        $(this).removeClass('errorbox');
    });
    var ctrlObj = $('#' + tblid + ' [value=][mandatory="1"],textarea[mandatory=1][value=]');//Bug 7444
    if (ctrlObj.length > 1) {
        ctrlObj[0].focus();
        $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
        $('#errorMsg').html('Please enter all the mandatory information.');
        $('.w2ui-tag-body').hide();
        for (var i = 0; i < ctrlObj.length; i++) {
            // ctrlObj[i].className = "";
            ctrlObj[i].className = "errorbox";
        }
        // w2alert('Please enter all mandatory fields.');
        return false;
    }
    else if (ctrlObj.length == 1) {
        if (ctrlObj[0].tagName.toLowerCase() == 'select') {
            // error.showerror(ctrlObj[0], "Please select " + ctrlObj[0].title);
            $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
            $('#errorMsg').html("Please select " + ctrlObj[0].title);
            ctrlObj[0].className = "errorbox";
            return false;
        }
        else {
            if (ctrlObj[0].title == "Mobile number") {
           
                $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
                $('#errorMsg').html('Please enter your 10 digit primary phone number');
                ctrlObj[0].className = "errorbox";
                ctrlObj[0].focus();
                return false;
            }
            else {
              
                $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
                $('#errorMsg').html("Please enter " + ctrlObj[0].title);
                ctrlObj[0].className = "errorbox";
                ctrlObj[0].focus();
                return false;
            }
           
        }
    }
    else if (ctrlObj.length == 0) {
        return true;
    }
}

function getmessage(obj) {
    var msg = "";
    if ($(obj).attr('ValidateMessage') != undefined) {
        msg = $(obj).attr('ValidateMessage');
        if (msg == '') {
            msg = $(obj).attr('title');
        }
    }
    else if ($(obj).attr('placeholder') != undefined && (obj.localName != 'textarea')) {
        msg = $(obj).attr('placeholder');
    }
    else {
        msg = $(obj).attr('title');
    }
    return " " + msg;
}


//Function to prevent editing Payment Locations for same weekday and same time. Bug # 25392.
function ValidateDayTime()
{
    var fromDay = $("#payDaysFrom").val(), toDay = $("#payDaysTo").val();
    var fromTimeHr = $("#payTimeFromHr").val(), toTimeHr = $("#payTimeToHr").val();
    var fromTimeMin = $("#payTimeFromMin").val(), toTimeMin = $("#payTimeToMin").val();
    var fromTime = $("#payTimeFrom").val(), toTime = $("#payTimeTo").val();
    if(fromDay == toDay)//same day incorrect time slots are as follows
    {
        if (fromTimeHr == toTimeHr && fromTimeMin == toTimeMin && fromTime == toTime) // Same day same time(Mon to Mon 10:00am to 10:00am) is not a valid time.
        {
            alert('To and From Day and Time cannot be same');
            return false;
        }
        else if (parseInt(fromTimeHr) !=12 && parseInt(toTimeHr)!=12 && fromTime == 'PM' && toTime == 'AM')// Same day time format like 11:00PM to 6:00AM is not valid.
        {
            alert('Invalid payment timings selected for same day');
            return false;
        }
        else if (parseInt(fromTimeHr) > parseInt(toTimeHr) && fromTime == toTime)//Same day time format like 11:00PM to 10:59PM is not vaid.
        {
            alert('Invalid payment timings selected');
            return false;
        }
        else
            return true;
    }
    else
    {
        return true;
    }
   
}

function ValidatePage(tblid) {
    var editorMessagetext = "Message body";
    var isvalid = true;
    var ctrlObj = [];
    var ctrls = $('#' + tblid + ' [mandatory="1"]');
    for (j = 0; j < ctrls.length; j++) {
        if ($('#' + ctrls[j].id).hasClass('ajax__htmleditor_editor_base')) {
            var contrlid = $('#' + ctrls[j].id);
            var editortext = $find(contrlid[0].id).get_content();
            if (editortext == "") {
                ctrlObj.push(ctrls[j]);
            }
        }
        else if (($(ctrls[j])[0].tagName).toLowerCase() == 'div') {
            
                if ($('#' + ctrls[j].id).summernote('code').trim() == "") {
                    ctrlObj.push(ctrls[j]);
                }
        }
       
        else {
            if ($('#' + ctrls[j].id).val() == "" || $('#' + ctrls[j].id).val() == null || $('#' + ctrls[j].id).val()==undefined) {
                ctrlObj.push(ctrls[j]);
            }
        }
       
    }
    

    if (ctrlObj.length > 1) {
        alert('Please enter all the mandatory information');
        return false;
    }
    else if (ctrlObj.length == 1) {
        if ($(ctrlObj).attr('id') != undefined) {
            if ($(ctrlObj).val() == ''||$(ctrlObj).val()==null) {
                if (($(ctrlObj)[0].tagName).toLowerCase() == 'input') {
                    // alert('Please enter ' + $(ctrlObj)[0].title);
                    alert(getmessage(ctrlObj));
                }
                else if (($(ctrlObj)[0].tagName).toLowerCase() == 'div') {

                    if ($('#' + ctrlObj[0].id).summernote('code').trim() == "") {
                        if ($(ctrlObj).attr('ValidateMessage')!= "" && $(ctrlObj).attr('ValidateMessage')!= undefined)
                            alert($(ctrlObj).attr('ValidateMessage'));
                        else
                            alert("Please enter " + editorMessagetext);
                       
                       
                    }
                    else {
                        var objEditor = $find($(ctrlObj).attr('id')).get_content();
                        if (objEditor == "") {
                            alert("Please enter " + editorMessagetext);
                        }
                    }
                }
                else if (($(ctrlObj)[0].tagName).toLowerCase() == 'textarea') {
                    //alert('Please enter ' + $(ctrlObj)[0].title + '');
                    alert(getmessage(ctrlObj));
                }
                else {
                   // alert('Please select ' + $(ctrlObj)[0].title + '');
                    alert(getmessage(ctrlObj));
                }
                $(ctrlObj).focus();
                isvalid = false;
                return false;
            }
            return isvalid;
        }
    }
    else if (ctrlObj.length == 0) {
        return true;
    }
}


function ValidatePageByTab(tblid) {
    var isvalid = true;
    var ctrlObj = $('#' + tblid + ' [mandatory="1"]');
    for (var i = 0; i < ctrlObj.length; i++) {
        for (var j = (i + 1) ; j < ctrlObj.length; j++) {
            if (ctrlObj[i].tabIndex > ctrlObj[j].tabIndex) {
                var temp = ctrlObj[i];
                ctrlObj[i] = ctrlObj[j];
                ctrlObj[j] = temp;
            }
        }

    }
    $(ctrlObj).each(function () {
        if ($(this).val() == '') {
            if ((this.tagName).toLowerCase() == 'input') {
                alert('Please enter ' + this.title + '');
                $(this).addClass("red-border");
            }
            else if ((this.tagName).toLowerCase() == 'textarea') { alert('Please enter ' + this.title + ''); }
            else { alert('Please select ' + this.title + ''); }
            $(this).focus();
            isvalid = false;
            return false;
        } else {
            $(this).removeClass("red-border");
        }
    });
    return isvalid;
}


//COMPARE VALIDATION
//Here tblid is the id of the parent table
//Append group attribute with value compare in both elements. 
function CompareValidator(tblid) {
    var obj = $('#' + tblid + ' input[group=compare]');
    var value1 = $(obj[0]).val();
    var value2 = $(obj[1]).val();
    if (value1 != value2) {
        alert($(obj[0]).attr('Title') + ' and ' + $(obj[1]).attr('Title') + ' are not same');
        $(obj[0]).val(''); $(obj[1]).val(''); $(obj[0]).focus(); return false;
    }
    return true;
}

//VALIDATION FOR EMAIL 
//Here parameter obj is the object of the textbox through which this function calls.  
function EmailValidator(obj) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(obj.value)) { return true; }
    else { alert('Plese enter a valid Email'); obj.value = ''; obj.focus(); return false; }
}


//VALIDATION FOR URL e.g:http://www.smartusys.com and http://smartusys.com
//Here parameter obj is the object of the textbox through which this function calls.  
function isValidURL(obj) {
    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (RegExp.test(obj.value)) {
        return true;
    } else {
        alert('Please enter Valid URL');
        obj.value = '';
        obj.focus();
        return false;
    }
}

//VALIDATE SPECIAL CHARACTERS ON KEYPRESS AND ALSO WORKS FOR ALPHANUMERICITY
function ValidateForSpecialCharacter(e) {
    var code = e.which || event.keyCode;
    if (!(code == 8 || code == 32 || code == 127 || (code >= 48 && code <= 57) || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)))
        return false;
}

//VALIDATE NUMERICITY ON KEYPRESS
function IsNumeric(e) {
    var code = e.which || event.keyCode;
    if (!((code >= 48 && code <= 57) || code == 8 || code == 127))
    { return false; }
    return true;
}

//VALIDATE NUMERICITY ON KEYPRESS(decimal is allowed,it only accepts only one decimal and values upto 2 decimal place.)
//Here obg is the object of textbox.
function IsNumeric1(e, obj) {
    var code = e.which || event.keyCode;
    if (code == 8 || code == 127) { return true; }
    if (code == 46) {
        if (obj.value.indexOf('.') < 0) {
            return true;
        }
        else { return false; }
    }
    if (!(code >= 48 && code <= 57))
    { return false; }
    else {
        if (obj.value.indexOf('.') > 0) {
            if (obj.value.substring(obj.value.indexOf('.') + 1).length < 2) { return true; }
            else { return false; }
        }
        else { return true; }
    }
}

//VALIDATE ALPHA ONKEYPRESS
function IsAlpha(e) {
    var code = e.which || event.keyCode;
    if (!(code == 8 || code == 32 || code == 127 || (code >= 65 && code <= 90) || (code >= 97 && code <= 122)))
        return false;
}

//RESET all fields in form which are not disabled

function Reset() {
    try {
        var ctrls = $("form input:text,textarea,checkbox,:password").not(':hidden')
        $.each(ctrls, function () {
            if (!$(this).is('[disabled]')) { // will not reset disabled field
                $(this).val('');
            }
        });
        $find("ContentPlaceHolder1_rightpanel_txtEditor").set_content('');
        
    } catch (e) {

    }
    return false;
}

//RANGE VALIDATOR
//Just append 3 attributes i.e range="validate" ,min="something"(minimum value)
//max="something"(maximum value) in the element and call that function.
function IsOfRange() {
    var obj = $("form input[range=validate]");
    var value = parseInt(obj.val());
    var min = parseInt(obj.attr('min'));
    var max = parseInt(obj.attr('max'));
    if (!(value >= min && value <= max)) { return false; }
    else { return true; }
}

//LENGTH VALIDATION
function CountDescription(obj, long) {
    var maxlength = new Number(long);
    if (obj.value.length >= maxlength) {
        return false;
    }
}

// FOR DATE VALIDATION 


function isDate(txtDate) {
    var currVal = txtDate;
    if (currVal == '')
        return false;

    var rxDatePattern = /^(\d{1,2})(\/|-)(\d{1,2})(\/|-)(\d{4})$/; //Declare Regex
    var dtArray = currVal.match(rxDatePattern); // is format OK?

    if (dtArray == null)
        return false;

    //Checks for mm/dd/yyyy format.
    dtMonth = dtArray[1];
    dtDay = dtArray[3];
    dtYear = dtArray[5];

    if (dtMonth < 1 || dtMonth > 12)
        return false;
    else if (dtDay < 1 || dtDay > 31)
        return false;
    else if ((dtMonth == 4 || dtMonth == 6 || dtMonth == 9 || dtMonth == 11) && dtDay == 31)
        return false;
    else if (dtMonth == 2) {
        var isleap = (dtYear % 4 == 0 && (dtYear % 100 != 0 || dtYear % 400 == 0));
        if (dtDay > 29 || (dtDay == 29 && !isleap))
            return false;
    }
    return true;
}

//For Prevent the button click event of pdf button click on hit enter button 
$('input').keypress(function (event) {

    if (event.keyCode == 13) {
        event.preventDefault();

    }
})

function validateFloatKeyPress(el, evt) {
    var specialKeys = new Array();
    specialKeys.push(8); //Backspace
    specialKeys.push(9); //Tab
    specialKeys.push(46); //Delete
    specialKeys.push(36); //Home
    specialKeys.push(35); //End
    specialKeys.push(37); //Left
    specialKeys.push(39); //Right
    evt = (evt) ? evt : window.event;
    var charCode = (evt.which) ? evt.which : evt.keyCode;
    if (specialKeys.indexOf(charCode) != -1) {
        return true;
    }

    var number = el.value.split('.');
    if (charCode != 46 && charCode > 31 && (charCode < 48 || charCode > 57)) {
        return false;
    }
    //just one dot (thanks ddlab)
    if (number.length > 1 && charCode == 46) {
        return false;
    }
    //get the carat position
    var caratPos = getSelectionStart(el);
    var dotPos = el.value.indexOf(".");
    if (caratPos > dotPos && dotPos > -1 && (number[1].length > 1)) {
        return false;
    }
    return true;
}


function getSelectionStart(o) {
    if (o.createTextRange) {
        var r = document.selection.createRange().duplicate()
        r.moveEnd('character', o.value.length)
        if (r.text == '') return o.value.length
        return o.value.lastIndexOf(r.text)
    } else return o.selectionStart
}



function validphoneno(e, obj) {
    var code = e.which || event.keyCode;
    if (code != 8) {
        //if ($(obj).val().length == 3 || $(obj).val().length == 7) {
        //    $(obj).val($(obj).val() + '-');
        //}
        $(obj).val($(obj).val().replace(/^(\d{3})(\d{3})(\d)+$/, "($1) $2-$3"));
    }
}


//This function is created to give summary of password in one alert rather than displaying multiple alert messages
function ValidatePassword2(password) {
    var re = '';
    var f = 0;
    if (password.length == 0) {
        alert('Please enter a password');
        return false;
    }
    if (password.length < 8) {
        f = 1;
    }
    re = /[0-9]/;
    if (!re.test(password)) {
        f = 1;
    }
    re = /[A-Z]/;
    if (!re.test(password)) {
        f = 1;
    }
    if (/^[a-zA-Z0-9 ]*$/.test(password) == true) {
        f = 1;
    }
    if (!(/^[a-zA-Z0-9@#$&%*!]*$/g.test(password) == true)) {
        // check if it contains special characters other than mentioned
        f = 1;
    }
    if (f == 1) {
        //alert('The entered Password does not meet minimum security requirements. Please enter a valid password. A password shall be at least 8 characters long and must contain minimum one capital letter, one numeric and one special character.')
        alert('The entered Password does not meet the minimum security requirements. Please enter a valid password. A password shall be at least 8 characters long and must contain minimum one capital letter, one numeric and one special character (@, #, $, &, %, *, !)')


        return false;
    }
   
    return true;
}




//Changes done on 05/20/2016
//This function is used for format phone number
function formatPhone(phonenum) {
    var phonenum = phonenum.replace(/[^\d]/g, '');
    var regexObj = /^(?:\(?([0-9]{3})\)?[-]?)?([0-9]{3})[-]?([0-9]{4})$/;
    if (regexObj.test(phonenum)) {
        if (phonenum.length > 9) {
            var phone = "";
            phone = phonenum.substring(0, 3) + "-" + phonenum.substring(3, 6) + "-" + phonenum.substring(6);
            return phone;
        }
        else {
            return phonenum;
        }
    }
    else {
        //invalid phone number
        return phonenum;
    }
}
// using on onblur="javascript:validPhone(this.value);"
function validPhone(phonenum, fieldId) {
    if ((phonenum.length < 14) || !(phonenum.lastIndexOf('-') == 9)) {       
        $('#' + fieldId).focus().attr("backgroundColor", "red");
        return false;
    }
    var threenumsum = parseInt(phonenum.charAt(1)) + parseInt(phonenum.charAt(2)) + parseInt(phonenum.charAt(3));
    if (threenumsum <= 1) {
        $('#' + fieldId).focus().attr("backgroundColor", "red");
        $('#' + fieldId).title
        return false;
    }
    if (phonenum.charAt(1) == 0) {
        $('#' + fieldId).focus().attr("backgroundColor", "red");
        return false;
    }
    if (phonenum.split('-')[1].length > 4) {
        $('#' + fieldId).focus().attr("backgroundColor", "red");
        return false;
    }
    return true;
}


function GetFileSize(fileid) {
    try {
        if ($("#" + fileid)[0].files.length != 0) {
            if (ValidateFileUpload1($("#" + fileid)[0].files[0].name)) {
                if ($("#" + fileid)[0].files != undefined) {
                    if ($("#" + fileid)[0].files.length > 0) {
                        var f = $("#" + fileid)[0].files[0];
                        var fileSize = 0;
                        fileSize = f.size || f.fileSize; //size in kb
                        fileSize = fileSize / 1048576; //size in mb
                        if (fileSize > 5) {
                            //alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
                            //w2alert($('#IDfilesize').text());
                            //toastr.warning($('#IDfilesize').text());
                            //alert('Invalid file type select; file extentions allowed are : gif, png, bmp, jpg, jpeg, txt and rtf.');
                            alert('The attachment size exceeds the allowable limit. Please upload files upto 5 MB.');
                            return false;
                        }
                        else
                            return true;
                    }
                    else
                        return true;
                }
                else
                    return true;
            }
            else {
                //alert("File extensions allowed: gif, png, bmp, jpg, jpeg, doc, docx, txt, xls, xlsx and rtf.");
                //w2alert($('#IDfileExt').text());
                //toastr.warning($('#IDfileExt').text());
                alert($('#IDfileExt').text().replace('###',$('#hdnFileExtension').val()));
                return false;
            }

        }
        return true;
    }
    catch (e) {
        return false;
    }
}

function ValidateFileUpload1(FileUploadPath) {

    if (FileUploadPath != '') {
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();


        //var ext = $('#hdnFileExtension').val().split(',');
        var ext = ($('#hdnFileExtension').val().replace(/ /g, '').split(','));
        var aa = ext.indexOf(Extension);
        if (ext.indexOf(Extension) != -1) {
            //if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "pdf" || Extension == "doc" ||
            //    Extension == "docx" || Extension == "txt" || Extension == "xls" || Extension == "xlsx" || Extension == "rtf" || Extension == 'jpg') {
            FileUploadPath == '';
            return true; // Valid file type
        }
        else {
            return false; // Not valid file type
        }
    }
    else
        return true;
}

function ValidateFileUpload(FileUploadPath) {

    if (FileUploadPath != '') {
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();


        var ext = $('#hdnFileExtension').val().split(',');
        var aa = ext.indexOf(Extension);
        if (ext.indexOf(Extension) != -1) {
            if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "pdf" || Extension == "doc" ||
                Extension == "docx" || Extension == "txt" || Extension == "xls" || Extension == "xlsx" || Extension == "rtf" || Extension == 'jpg') {
                FileUploadPath == '';
                return true;
            }
            else { return false; }// Valid file type
        }
        else {
            return false; // Not valid file type
        }
    }
    else
        return true;
}