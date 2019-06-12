/********************************************************************************
**************************** V A L I D A T I O N . J S ****************************
*************************** D a t e d : 29 - 08 - 2013  ***************************
***************************** written by: Sachin Jain **************************/
var d = '';
$(document).ready(function () {
    d = new Date();
    //trimming all extra white space from start,end and between
    $('input[type="text"],textarea').blur(function () {
       
        //$(this).val($(this).val().replace(/ +(?= )/g,''));
    });
    
    // To Avoid White Space
    $('input[type="text"],textarea').keyup(function () {
        var valu = $(this).val();
        var result = /[a-zA-Z0-9!@#$%&*()]/.test(valu);
        if (result == false)
            valu = $(this).val("");
    });
    //Binding Numeric key validation
    $('[numeric=1]').keypress(function (e) {
        try {
            var code = e.which || event.keyCode;
            return (code >= 48 && code <= 57) || code == 8 || code == 127;
        }
        catch (e)
        { }
    });

    //fixed length of textarea cntrol
    $('.txtComment').attr('maxlength', '256');

    //show length remaining of string data 
    $('.txtComment').keyup(function () {
        var charlen = ($('.txtComment').val()).length;
        var total = $('.txtComment').attr("maxlength");
        if (charlen <= total)
        {
            var remain = parseInt(total) - parseInt(charlen);
            $('.lblcharacter').html(remain + " Character remaining..")
        }
       
    });

    //Handling Contact keypad(U.S. Code)
    $('[contact=1]').attr('maxlength', '12');
    $('[contact=1]').keypress(function (e) {
        try {
            var code = e.which || event.keyCode;
            if (code != 8) {
                if ($(this).val().length == 3 || $(this).val().length == 7) {
                    $(this).val($(this).val() + '-');
                }
            }
        }
        catch (e)
        { }
    });

    $('[validate="1"]').click(function () {
        return validateControl($(this).attr('control'));
    });

    //removing mandatory notification 
    $('[mandatory="1"]').change(function () {
        if ($(this).val() != "" && $(this).val() != null) {
            $(this).removeClass('messageError');
        }

    });

});



function validateControl(objID, getMessage) {
  
    try {
        var obj = (objID == null || objID == 'undefined') ? $(document) : $('#' + objID);
        var msg = '';
        var returnFlag = true;
        var focusObject = null;

        //Handling all mandatory fields
        var controlArr = $(obj).find('[mandatory="1"][value=],select[mandatory="1"][value=0]');
        if (controlArr.length > 0) {
            returnFlag = false;
            controlArr.each(function (i) {
                switch (controlArr[i].tagName.toLowerCase()) {
                    case 'input':
                    case 'textarea': msg += 'Please enter ' + controlArr[i].title + '\n'; break;
                    case 'select': msg += 'Please select ' + controlArr[i].title + '\n'; break;
                }
                $(controlArr[i]).addClass('messageError');
                $(controlArr[i]).css('color','red');
            });
            focusObject = controlArr[0];
        }


        //Validating Contact Control
        var contactArr = $(obj).find('[contact="1"]');
        if (contactArr.length > 0) {
            focusObject = (focusObject == null ? contactArr[0] : focusObject);
            returnFlag = false;
            contactArr.each(function () {
                if (!(($(this).val().indexOf('-') == 3) && ($(this).val().lastIndexOf('-') == 7))) {
                    msg += 'Please enter ' + this.title + ' in 123-456-7890 format\n';
                }
            });
        }

        //Finally Result
        if (!returnFlag) {
            focusObject.focus();

            //If GetMessage==true, returns error message string
            if (getMessage) {
                return msg;
            }
            else {
                //alert(msg);
            }
        }
        return returnFlag;
    }
    catch (e)
    { }
}
function validateControlA(objID, getMessage) {
   
    try {
        var obj = (objID == null || objID == 'undefined') ? $(document) : $('#' + objID);
        var msg = '';
        var returnFlag = true;
        var focusObject = null;

        //Handling all mandatory fields
        var controlArr = $(obj).find('[mandatory="1"],select[mandatory="1"][value=0]');
        if (controlArr.length > 0) {
            returnFlag = false;

            controlArr.each(function (i) {
                if (controlArr[i].value == "") {
                   
                    switch (controlArr[i].tagName.toLowerCase()) {
                        case 'input':
                        case 'textarea': msg += 'Please enter ' + controlArr[i].title + '\n'; break;
                        case 'select': msg += 'Please select ' + controlArr[i].title + '\n'; break;
                    }
                    $(controlArr[i]).addClass('messageError');
                    returnFlag = false;
                }
                else {
                   
                    returnFlag = true;
                }
            });
            focusObject = controlArr[0];
        }


        //Validating Contact Control
        var contactArr = $(obj).find('[contact="1"]');
        if (contactArr.length > 0) {
            focusObject = (focusObject == null ? contactArr[0] : focusObject);
            returnFlag = false;
            contactArr.each(function () {
                if (!(($(this).val().indexOf('-') == 3) && ($(this).val().lastIndexOf('-') == 7))) {
                    msg += 'Please enter ' + this.title + ' in 123-456-7890 format\n';
                }
            });
        }

        //Finally Result
        if (!returnFlag) {
            focusObject.focus();

            //If GetMessage==true, returns error message string
            if (getMessage) {
                return msg;
            }
            else {
                //alert(msg);
            }
        }
        return returnFlag;
    }
    catch (e)
    { }
}
//validation for clear fields
function validateClear(objID) {
    
    try {
        

        var obj = (objID == null || objID == 'undefined') ? $(document) : $('#' + objID);
        var ClearControl = $(obj).find('input[type="text"][disabled!="disabled"][clear!="1"] ,textarea[disabled!="disabled"] ,select,input[type="password"][disabled!="disabled"]');
        if (ClearControl.length > 0) {
            returnFlag = false;
            ClearControl.each(function (i) {
                switch (ClearControl[i].tagName.toLowerCase()) {
                    case 'input': $(ClearControl[i]).val(''); break;
                    case 'textarea': $(ClearControl[i]).val(''); break;
                    case 'select': $(ClearControl[i]).val('0'); break;
                }
            });
        }
        return false;

    }
    catch (e)
    { }
}

function validateDate(startdate, enddate) {
    
    try {
        
        var startDate = new Date(startdate.val());
        var endDate = new Date(enddate.val());
        if (startDate <= endDate) {
            if (endDate <= new Date(d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear()) && startDate <= new Date(d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear()))
            { return true; }

        }
        else {
            alert('Start date should not be greater than End date');

            
            enddate.val('');
            enddate.focus();
            return false;
        }
    }
    catch (e)
    { }
}


function validateComCanDate(startdate, enddate, objID) {
    
    
     try{
        
        var startDate = new Date(startdate);
        var endDate = new Date(enddate);
        if (endDate >= startDate) {
            if (endDate <= new Date(d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear()) && startDate <= new Date(d.getMonth() + 1 + '/' + d.getDate() + '/' + d.getFullYear()))
            { return true; }
            else {
                alert('Date should not be greater than current date');
                enddate.val('');
                enddate.focus();
                return;
            }

        }
        else {
            alert(objID+ ' date / time should not be less than WO Start date');
            return false;
        }
    }
    catch (e)
    { }
}