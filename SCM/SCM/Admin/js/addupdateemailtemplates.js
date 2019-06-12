var TemplateType
$(document).ready(function () {
    $('#summernote').summernote();
    AddMandatoryAttributeToElement('#summernote');
    loader.showloader();
    $.ajax({
        type: "POST",
        url: "configure-emailtemplate.aspx/GetTemplates",        
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            loader.hideloader();
            var data = JSON.parse(response.d);
            $('#ddlChooseTemplate').append($('<option></option>').val('').html('Select Template'))
            for (var i = 0; i < data.length; i++) {
                $('#ddlChooseTemplate').append($('<option></option>').val(data[i].TemplateId).html(data[i].TemplateName));
            }
            $('#ddlChooseTemplate').val('');            
        },
        failure: function (response) {
        }
    });

    $('#ddlChooseTemplate').change(function () {
        loader.showloader();
        var selected = $('#ddlChooseTemplate').val();
        $('#summernote').summernote('code', '');
        if ($("#ddlChooseTemplate :selected").text() == 'Select Template')
        {            
            $('#txtSubject').val('');
            //$find("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").set_content('');
            $('#summernote').summernote('code', '');
        }
        var param = { templateID: selected };
        $.ajax({
            type: "POST",           
            url: "configure-emailtemplate.aspx/GetTemplateDetails",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                loader.hideloader();
                var v = JSON.parse(response.d);
                $('#txtSubject').val(v[0].Subject);
                $('#summernote').summernote('code', v[0].Message);
                //$find("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").set_content(v[0].Message);
            },
            failure: function (response) {
                loader.hideloader();
            }
        });
    })




    $('#btnSave').click(function () {
        if (ValidatePage('emaildiv')) {

            var t = $('#summernote').summernote('code');
            
            if (t == "") {
                alert("Please enter Message");
                return false;
            }
            loader.showloader();
            var selected = $('#ddlChooseTemplate').val();
            var param = {
                templateID: selected,
                templateName: $("#ddlChooseTemplate :selected").text(),
                templateSubj: $('#txtSubject').val(),
                Message:  $('#summernote').summernote('code') //$find("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").get_content()
            };
            $.ajax({
                type: "POST",
                url: "configure-emailtemplate.aspx/UpdateTemplateDetails",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    loader.hideloader();
                    if (JSON.parse(response.d)[0].STATUS == 1)
                        alert('Template has been saved successfully')
                },
                failure: function (response) {
                    loader.hideloader();
                }
            });
        }
    })

    $('#btnClear').click(function () {
        $('#ddlChooseTemplate').val('');
        $('#txtSubject').val('');
        $('#summernote').summernote('code', '');
        //$find("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").set_content('');
    })
});

$('div').on("click", ".addbtn", function (event) {
    event.preventDefault();
    $('#emailTestDetails').hide();
   
    if ($("#ddlChooseTemplate option:selected").val() == "") {
        alert("Please select Template");
        //$('.close').trigger('click');        
        $('#ddlChooseTemplate').focus();
        return false;
        $('#emailTestDetails').hide();

    }
    else {
        clearFields();
        TemplateType = $("#ddlChooseTemplate option:selected").text();       
        divShow (TemplateType);
        $('#emailTestDetails').show();
    }
    
});

function divShow(value)
{
    switch (value) {
        case 'Forgot Password':
            $('#divForgotPassword').show();
            $('#divUserId').hide();
            $('#divComments').hide();
            $('#divUpdateEmail').hide();
            $('#divRegisterLink').hide();
            $('#divRegisterLink').hide();
            $('#divMonth').hide();
            $('#divYear').hide();
            $('#divPrimaryPhone').hide();
            break;
        case 'Forgot UserID':
            $('#divUserId').show();
            $('#divForgotPassword').hide();
            $('#divComments').hide();
            $('#divUpdateEmail').hide();
            $('#divRegisterLink').hide();
            $('#divRegisterLink').hide();
            $('#divMonth').hide();
            $('#divYear').hide();
            $('#divPrimaryPhone').hide();
            break;
        case 'Other Login Problem':
            $('#divComments').show();
            $('#divForgotPassword').hide();
            $('#divUserId').hide();           
            $('#divUpdateEmail').hide();
            $('#divRegisterLink').hide();
            $('#divRegisterLink').hide();
            $('#divMonth').hide();
            $('#divYear').hide();
            $('#divPrimaryPhone').hide();
            break;
        case 'Email Address Update':
            $('#divUpdateEmail').show();
            $('#divForgotPassword').hide();
            $('#divUserId').hide();
            $('#divComments').hide();           
            $('#divRegisterLink').hide();
            $('#divRegisterLink').hide();
            $('#divMonth').hide();
            $('#divYear').hide();
            $('#divPrimaryPhone').hide();
            break;
        case 'Registration':
            $('#divRegisterLink').show();
            $('#divForgotPassword').hide();
            $('#divUserId').hide();
            $('#divComments').hide();
            $('#divUpdateEmail').hide();                     
            $('#divMonth').hide();
            $('#divYear').hide();
            $('#divPrimaryPhone').hide();
            break; 
        
        case 'Marketing Preference': 
            $('#divMonth').show();
            $('#divYear').show();
            $('#divForgotPassword').hide();
            $('#divUserId').hide();
            $('#divComments').hide();
            $('#divUpdateEmail').hide();
            $('#divRegisterLink').hide();
            $('#divRegisterLink').hide();           
            $('#divPrimaryPhone').hide();
            break;
        case 'Primary Phone Update':
            $('#divPrimaryPhone').show();
            $('#divForgotPassword').hide();
            $('#divUserId').hide();
            $('#divComments').hide();
            $('#divUpdateEmail').hide();
            $('#divRegisterLink').hide();
            $('#divRegisterLink').hide();
            $('#divMonth').hide();
            $('#divYear').hide();            
            break;
        default:
            $('#divForgotPassword').hide();
            $('#divUserId').hide();
            $('#divComments').hide();
            $('#divUpdateEmail').hide();
            $('#divRegisterLink').hide();
            $('#divRegisterLink').hide();
            $('#divMonth').hide();
            $('#divYear').hide();
            $('#divPrimaryPhone').hide();
    }
}

function sendEmail()
{
    try
    {
        var TemplateName = $("#ddlChooseTemplate option:selected").text();
        if (ValidatePageSelf('emailTestDetails') && ValidateEmail(TemplateName)) {
            loader.showloader();        
            var param = {
                EmailId: $('#txtemail').val() == undefined ? '' : $('#txtemail').val(),
                uName: $('#txtUserId').val() == undefined ? '' : $('#txtUserId').val(),
                Forgotpassworldlink: $('#txtforgotpassworldlink').val() == undefined ? '' : $('#txtforgotpassworldlink').val(),
                token: '',
                FullName: $('#txtusername').val() == undefined ? '' : $('#txtusername').val(),
                Comments: $('#txtComments').val() == undefined ? '' : $('#txtComments').val(),
                CustomerVerificationID: '',
                EmailTemplate: $("#ddlChooseTemplate :selected").text(),
                TemplateId: $("#ddlChooseTemplate option:selected").val(),
                UpdateEmail: $('#txtUpdateEmail').val() == undefined ? '' : $('#txtUpdateEmail').val(),
                RegistrationLink: $('#txtRegistrationLink').val() == undefined ? '' : $('#txtRegistrationLink').val(),
                PrimaryPhoneNumber: $('#txtPrimaryPhone').val() == undefined ? '' : $('#txtPrimaryPhone').val(),
                Month: $('#txtMonth').val(),
                Year: $('#txtYear').val(),
            };
            $.ajax({
                type: "POST",
                url: "configure-emailtemplate.aspx/SendEmailTemplate",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (response) {
                    loader.hideloader();                
                    $('#emailTestDetails').modal('toggle');
                    if (response.d == "Success") {
                        alert('Mail sent Successfully')
                    }
                    else {
                        alert('Mail send failed. Please try again');
                    }
                    $('#summernote').summernote('code', '');
                    //$find("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").set_content('');

                    //  Reset();               

                    //if (JSON.parse(response.d)[0].STATUS == 1)
                    //    alert('Template Updated Successfully.')
                },
                failure: function (response) {
                    loader.hideloader();
                    $('#summernote').summernote('code', '');
                    //$find("ContentPlaceHolder1_rightpanel_editordesc_ctl02_ctl00").set_content('');
                    Reset();               
                    $('#emailTestDetails').modal('toggle');
                }
            });
        }
        else
        { return false;}
    }
    catch (err) { err.message;}


}

function ValidatePageSelf(tblid) {
    var editorMessagetext = "message";
    var isvalid = true;
    var ctrlObj = [];
    var ctrls = $('#' + tblid + ' input:visible,textarea:visible');
    for (j = 0; j < ctrls.length; j++) {
        if ($('#' + ctrls[j].id).hasClass('ajax__htmleditor_editor_base')) {
            var contrlid = $('#' + ctrls[j].id);
            var editortext = $find(contrlid[0].id).get_content();
            if (editortext == "") {
                ctrlObj.push(ctrls[j]);
            }
        }
        //else if (($(ctrls[j])[0].tagName).toLowerCase() == 'div') {
            
        //    if ($('#' + ctrls[j].id).summernote('code') == "") {
        //        ctrlObj.push(ctrls[j]);
        //    }
        //}
       
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
                     alert('Please enter ' + $(ctrlObj)[0].title);
                   // alert(getmessage(ctrlObj));
                }
                else if (($(ctrlObj)[0].tagName).toLowerCase() == 'div') {
                    
                        var objEditor = $find($(ctrlObj).attr('id')).get_content();
                        if (objEditor == "") {
                            alert("Please enter " + editorMessagetext);
                        }
                }
                else if (($(ctrlObj)[0].tagName).toLowerCase() == 'textarea') {
                    alert('Please enter ' + $(ctrlObj)[0].title + '');
                    //alert(getmessage(ctrlObj));
                }
                else {
                     alert('Please select ' + $(ctrlObj)[0].title + '');
                    //alert(getmessage(ctrlObj));
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



function ValidateEmail(tempname) {
    var name = $('#txtusername').val();
    var email = $('#txtemail').val();
    var updateemail = $('#txtUpdateEmail').val();
    var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/;
    var myRegExp = /^(?:(?:https?|ftp|http):\/\/)(?:\S+(?::\S*)?@)?(?:(?!10(?:\.\d{1,3}){3})(?!127(?:\.\d{1,3}){3})(?!169\.254(?:\.\d{1,3}){2})(?!192\.168(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]+-?)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/[^\s]*)?$/i;
    //if (name.trim().length == 0) {
    //    alert('Please enter Name');
    //    $('#txtusername').addClass('errorbox');
    //    $('#txtusername').focus();
    //    return false;
    //}   
    //else if (email.trim().length == 0) {
    //    alert('Please enter Email');
    //    $('#txtemail').addClass('errorbox');
    //    $('#txtemail').focus();
    //    return false;
    //}


    if (!filter.test(email) &&  (email.trim().length > 0)) {
        alert("Please enter a valid Email");
        $('#txtemail').addClass('errorbox');
        $('#txtemail').focus();
        return false;
       
    }
    else if (tempname == 'Forgot Password') {
       
        var urlToValidate = $('#txtforgotpassworldlink').val();
        if (!myRegExp.test(urlToValidate) && (urlToValidate.trim().length>0)) {
            alert('Please enter valid URL');            
            $('#txtforgotpassworldlink').focus();
            return false;
        }
    }
    //else if (tempname == 'Forgot UserID') {
    //    if ($('#txtUserId').val() == "") {
        //        alert('Please enter Username');
    //        $('#txtUserId').focus();
    //        return false;
    //    }
    //}
    //else if (tempname == 'Other Login Problem') {
    //    if ($('#txtComments').val() == "") {
    //        alert('Please write comments');
    //        $('#txtComments').focus();
    //        return false;
    //    }
    //}
    
    //else if (tempname == 'Email Address Update') {
    //    if ($('#txtUpdateEmail').val() == "") {
    //        alert('Please enter updated email');
    //        $('#txtUpdateEmail').focus();
    //        return false;
    //    }
        else if (!filter.test(updateemail) && ($('#txtUpdateEmail').val().trim().length>0)) {
                alert("Please enter valid Email");
                $('#txtUpdateEmail').addClass('errorbox');
                $('#txtUpdateEmail').focus();
                return false;
            }
        
    //   }
    //**********************************************
    else if (tempname == 'Registration') {
        if ($('#txtRegistrationLink').val() == "") {
            alert('Please enter Url');
            $('#txtRegistrationLink').focus();
            return false;
        }
        else
        {
            var urlToValidate = $('#txtRegistrationLink').val();
            if (!myRegExp.test(urlToValidate) && ($('#txtRegistrationLink').val().trim().length>0)) {
                alert('Please enter valid URL');
                $('#txtRegistrationLink').focus();
                return false;
            }
        }
       }

    //***************************************************************************************
    //else if (tempname == 'Marketing Preference') {
    //    if ($('#txtMonth').val() == "") {
    //        alert('Please enter month name');
    //        $('#txtMonth').focus();
    //        return false;
    //    }
    //    if ($('#txtYear').val() == "") {
    //        alert('Please enter year');
    //        $('#txtYear').focus();
    //        return false;
    //    }
    //}
    //else if (tempname == 'Primary Phone Update') {
    //    if ($('#txtPrimaryPhone').val() == "") {
    //        alert('Please enter primary phone number');
    //        $('#txtPrimaryPhone').focus();
    //        return false;
    //    }
        
    //}
    return true;
   
}

function clearFields()
{
    $('#txtusername').val(''); 
    $('#txtemail').val('');
    $('#txtforgotpassworldlink').val(''); 
    $('#txtUserId').val('');
    $('#txtComments').val('');
    $('#txtUpdateEmail').val('');
    $('#txtRegistrationLink').val('');
    $('#txtMonth').val('');
    $('#txtYear').val('');
    $('#txtPrimaryPhone').val('');
}
