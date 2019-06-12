$(document).ready(function () {
    $('input[type="text"],textarea').blur(function () {
        $(this).val($.trim($(this).val()));
    });
});

// To show mandatory message only once 
function ValidateAllPageFieldsSingleMessage(tblid) {
    try
    {
        $('#' + tblid + ' input[type=text],input[type=password],textarea,select').each(function () {
            if ($(this).val().trim().length == 0)
                $(this).val('');
            $(this).removeClass('errorbox');
        });
        //var ctrlObj = $('#' + tblid + ' input[type=text][value=][mandatory="1"],input[type=password][value=][mandatory="1"],textarea[mandatory="1"][value=],select[mandatory="1"][value=],input[type=hidden][value=][mandatory="1"]');//Bug 7444
        var ctrlObj = $('#' + tblid + ' [value=][mandatory="1"],textarea[mandatory=1][value=]');//Bug 7444
        if (ctrlObj.length > 1) {
            ctrlObj[0].focus();
            //$('#errorMsg').css('display', 'block');
            //$("<span id='errorMsg'></span>").insertBefore("#" + tblid);
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
                    //error.showerror(ctrlObj[0], "Please enter your 10 digit primary phone number");
                    $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
                    $('#errorMsg').html('Please enter your 10 digit primary phone number');
                    ctrlObj[0].className = "errorbox";
                    ctrlObj[0].focus();
                    return false;
                }
                else {
                    //error.showerror(ctrlObj[0], "Please enter " + ctrlObj[0].title);
                    $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
                    $('#errorMsg').html("Please enter " + ctrlObj[0].title);
                    ctrlObj[0].className = "errorbox";
                    ctrlObj[0].focus();
                    return false;
                }
                $('#errorMsg').hide();
                return false;
            }
        }
        else if (ctrlObj.length == 0) {
            return true;
        }
    }
    catch(e)
    {
        console.log(e.message);
    }
}


//REQUIRED FEILD VALIDATION
//function ValidatePage(tblid) {

//    var ctrlObj = $('#' + tblid + ' [mandatory="1"][value=]');
//    if (ctrlObj.length > 0) {
//        if ((ctrlObj[0].tagName).toLowerCase() == 'input') {
//            alert('Please Enter ' + ctrlObj[0].title + '.') + 'S';
//        }
//        else if ((ctrlObj[0].tagName).toLowerCase() == 'textarea') { alert('Please Enter ' + ctrlObj[0].title + '.') + 'S'; }
//        else { alert('Please Select ' + ctrlObj[0].title + '.') + 'S'; }
//        $(ctrlObj[0]).focus();
//        return false;
//    }
//    return true;
//}
function ValidatePage(tblid) {
    var isvalid = true;
    var ctrlObj = $('#' + tblid + ' [mandatory="1"]');
    $(ctrlObj).each(function () {
        if ($(this).val() == '') {
            if ((this.tagName).toLowerCase() == 'input') {
                alert('Please Enter ' + this.title + '.');
            }
            else if ((this.tagName).toLowerCase() == 'textarea') { alert('Please Enter ' + this.title + '.'); }
            else { alert('Please Select ' + this.title + '.'); }
            $(this).focus();
            isvalid = false;
            return false;
        }
    });
    return isvalid;
}

function ValidatePageByTab(tblid) {
    var isvalid = true;
    var ctrlObj = $('#' + tblid + ' [mandatory="1"]');
    for (var i = 0; i < ctrlObj.length; i++) {
        for (var j = (i+1); j < ctrlObj.length; j++) {
            if (ctrlObj[i].tabIndex > ctrlObj[j].tabIndex)
            {
                var temp = ctrlObj[i];
                ctrlObj[i] = ctrlObj[j];
                ctrlObj[j] = temp;
            }
        }

    }
        $(ctrlObj).each(function () {
            if ($(this).val() == '') {
                if ((this.tagName).toLowerCase() == 'input') {
                    alert('Please Enter ' + this.title + '.');
                    $(this).addClass("red-border");
                }
                else if ((this.tagName).toLowerCase() == 'textarea') { alert('Please Enter ' + this.title + '.'); }
                else { alert('Please Select ' + this.title + '.'); }
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
        alert($(obj[0]).attr('Title') + ' and ' + $(obj[1]).attr('Title') + ' are not same.');
        $(obj[0]).val(''); $(obj[1]).val(''); $(obj[0]).focus(); return false;
    }
    return true;
}

//VALIDATION FOR EMAIL 
//Here parameter obj is the object of the textbox through which this function calls.  
function EmailValidator(obj) {
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    if (filter.test(obj.value)) { return true; }
    else { alert('Plese Enter valid email address'); obj.value = ''; obj.focus(); return false; }
}


//VALIDATION FOR URL e.g:http://www.smartusys.com and http://smartusys.com
//Here parameter obj is the object of the textbox through which this function calls.  
function isValidURL(obj) {
    var RegExp = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;
    if (RegExp.test(obj.value)) {
        return true;
    } else {
        alert('Please Enter Valid URL');
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

//RESET 
function Reset() {
    $("form input:text").val(''); //For All TextBoxes on the page.
    $("form input:checkbox").attr('Checked', false); //For All Checkboxes on the page.
    $("form select").each(function () { $(this)[0].selectedIndex = 0; }); //For All Dropdownlists and Listboxes on the page makes 0 as selected index.
    $("form textarea").val(''); //For All Textareas on the page.
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

