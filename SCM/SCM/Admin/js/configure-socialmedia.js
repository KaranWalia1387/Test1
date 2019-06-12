var dt_result;
var dt_ContactInformation;
var dt_saveresult;
var Contact, Email, BillingContact, BillingEmail, UtilityName, Logo, MapId, Copyright, CopyrightSpanish, DefaultLoginPage, ChartType, ChartOrientation, WaterAllocationSource, IsExternalCrashLog, IsModernStyle, MailConfiguration;
var src = '';
var srcportal = '';
var hdfRemovefile = 1;
var rdesri = document.getElementsByName('rdesri');
var rdGoogle = document.getElementsByName('rdGoogle');
var rdBing = document.getElementsByName('rdBing');
var ImageSource = '';

$(document).ready(function () {
    loaddata();
    $("#btnClear").click(function () {
        $("#txtFbUrl").val('');
        $("#txtTwitterUrl").val('');
        $("#txtYoutubeUrl").val('');
        $("#txtLinkedInUrl").val('');
        $('#txtTwitterWidgetId').val('');

        $("#txtCustomerService").val('');
        $("#txtEmail").val('');
        $("#txtBillingEnquiries").val('');
        $("#txtBillingEmail").val('');
        $("#txtUtilityName").val('');
        $("#txtCopyRight").val('');
        $("#txtCopyRightSpanish").val('');
        removeFile();
        removeFileportal();
    });

    $("#AddSocialMediaBtn").click(function () {
        submit();
    });
});

function loaddata() {
    try {
        $("#txtFbUrl").val('');
        $("#txtTwitterUrl").val('');
        $("#txtYoutubeUrl").val('');
        $("#txtLinkedInUrl").val('');
        $('#txtTwitterWidgetId').val('');

        var Mode = 0;
        var param = { 'mode': Mode };
        $.ajax({
            type: "POST",
            url: "configure-socialmedia.aspx/LoadData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            data: JSON.stringify(param),
            success: function (data) {
                data = data.d;
                var result = $.parseJSON(data);
                dt_result = result.Table;
                var rbchecked = '';
                if (dt_result != null) {
                    var fb = dt_result[0]["FbUrl"];
                    $("#txtFbUrl").val(dt_result[0]["Facebook"]);
                    $("#txtTwitterUrl").val(dt_result[0]["Twitter"]);
                    $("#txtYoutubeUrl").val(dt_result[0]["Youtube"]);
                    $("#txtLinkedInUrl").val(dt_result[0]["LinkedIn"]);
                    $('#txtTwitterWidgetId').val(dt_result[0]["TwitterWidgetId"]);
                    var customerService = dt_result[0]["CustomerServiceNumber"] != null ? dt_result[0]["CustomerServiceNumber"].replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : dt_result[0]["CustomerServiceNumber"];
                    $("#txtCustomerService").val(customerService);
                    $("#txtEmail").val(dt_result[0]["CustomerServiceEmail"]);
                    var billingEnquiries = '';
                    if (dt_result[0]["BillingEnquiriesNumber"] != null) {
                        billingEnquiries = dt_result[0]["BillingEnquiriesNumber"].replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3")
                    }
                    else {
                        billingEnquiries = dt_result[0]["BillingEnquiriesNumber"];
                    }
                    $("#txtBillingEnquiries").val(billingEnquiries);
                    $("#txtBillingEmail").val(dt_result[0]["BillingEnquiriesEmail"]);
                    $("#txtUtilityName").val(dt_result[0]["UtilityName"]);
                }
            },
            error: function (request, status, error) {

            }
        });
    }
    catch (e) { }
}

function submit() {
    try {
    

        if (ValidateEmail() && ValidateBillingEmail() && ContactNoLengthBilling() && ContactNoLengthCustomerService()) {
            fillData();
            var Mode = 1;
            if (hdfRemovefile == 0) { src = ''; }
            src = (src == "") ? null : src;
            var param = {
                fbUrl: $("#txtFbUrl").val(), twitterUrl: $("#txtTwitterUrl").val(),
                youtubeUrl: $("#txtYoutubeUrl").val(), linkedInUrl: $("#txtLinkedInUrl").val(), mode: Mode, twitterWidgetId: $('#txtTwitterWidgetId').val(),
                Contact: Contact, EMail: Email, BillingContact: BillingContact, BillingEmail: BillingEmail, UtilityName: UtilityName              
            };
            loader.showloader();

            $.ajax({
                type: "POST",
                url: "configure-socialmedia.aspx/Savedata",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccessEdit,
                failure: function (response) {
                    loader.hideloader();
                    console.log(response.responseText);
                }
            });
        }
    }
    catch (e) {
        loader.hideloader();
        console.log(e.message);
    }
}

function OnSuccessEdit(data, status) {
    var result = JSON.parse(data.d);
    loader.hideloader();

    //  var res = $.parseJSON(response);
    if (result > 0) {

        alert('Utility Information has been saved successfully');
    }
    else { alert('saved failed'); }
}

function fillData() {
    // get only number from CustomerService
    var CustomerService = $('#txtCustomerService').val() != '' ? parseInt($('#txtCustomerService').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtCustomerService').val();
    Contact = CustomerService;
    Email = $("#txtEmail").val();
    var BillingEnquiries = $('#txtBillingEnquiries').val() != '' ? parseInt($('#txtBillingEnquiries').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtBillingEnquiries').val();
    BillingContact = BillingEnquiries;
    BillingEmail = $("#txtBillingEmail").val();
    UtilityName = $("#txtUtilityName").val(); 
};

function ValidateEmail() {
    var email = $('#txtEmail').val();
    if (email != '') {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/;
        if (filter.test(email)) {
            $('#input-email').removeClass("red-border");
            return true;
        }
        else {
            alert("Please enter a valid customer service email.");

            $('#txtEmail').focus();
            return false;
        }
    }
    else {
        return true;
    }
}

function ValidateBillingEmail() {
    var email = $('#txtBillingEmail').val();
    if (email != '') {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,10}|[0-9]{1,3})(\]?)$/;
        if (filter.test(email)) {
            $('#input-email').removeClass("red-border");
            return true;
        }
        else {
            alert("Please enter a valid billing enquiries  email.");

            $('#txtBillingEmail').focus();
            return false;
        }
    }
    else {
        return true;
    }

}

function removeFile() {

    src = '';

    hdfRemovefile = 0;
    $("#nofile").html('No File Chosen');
    $('#blah').val('');
    var control = $("#blah");
    control.replaceWith(control = control.clone(true));
    $('#blahimg').attr('src', ImageSource);
    $('#btnRemoveFile').hide();
}

function removeFileportal() {

    srcportal = '';

    hdfRemovefile = 0;
    $("#nofile1").html('No File Chosen');
    $("#nofile1").val('No File Chosen');
    $('#blah1').val('');
    var control = $("#blah1");
    control.replaceWith(control = control.clone(true));
    $('#blahimg1').attr('src', $('#hdnImageSource1').val());
    $('#btnRemoveFile1').hide();
}

function savedata() {
    if ($('#blah').val() != '') {
        $("#btnRemoveFile").show();
        if (GetFileSize('blah') == true) {
            $.ajaxFileUpload({
                type: "POST",
                fileElementId: 'blah',
                url: "" + $('#filehandlerpath').val() + "Path=UtilityLogo",
                secureuri: false,
                cache: false,
                contentType: 'text/plain',
                dataType: "text",
                success: function (data, status) {
                    src = data;
                    hdfRemovefile = 1;
                    PortalLogoUpload();
                },
                error: function (data, status, e) {

                    alert(e);
                }
            });
        }
    }
    else {
        src = ''; hdfRemovefile = 0;
        PortalLogoUpload();
    }

}

// for replacing distorted image with noimage
function imgError(image) {
    image.onerror = "";
    image.src = "../images/noimage.png";
    return true;
}

function readURL(input) {
    $('#blahimg').show();
    $('#btnRemoveFile').show();
    if (input.files && input.files[0]) {
        $("#nofile").html(input.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blahimg')
            .attr('src', e.target.result)
            .width(226)
            .height(40);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function readURLportal(input) {
    $('#blahimg1').show();
    $('#btnRemoveFile1').show();
    if (input.files && input.files[0]) {
        $("#nofile1").html(input.files[0].name);
        var reader = new FileReader();
        reader.onload = function (e) {
            $('.blahimg1')
            .attr('src', e.target.result)
            .width(226)
            .height(40);
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function GetFileSizePortalLogo() {
    try {
        if ($('#' + 'blah1').val() != '') {
            if ($('#blah1')[0].files != undefined) {
                if ($('#blah1')[0].files.length > 0) {
                    if (ValidateFileUpload($('#blah1')[0].value)) {
                        var fileSize = 0;
                        fileSize = $('#blah1')[0].files[0].size //size in kb
                        fileSize = fileSize / 1048576; //size in mb
                        if (fileSize > 5) {
                            alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
                            return false;
                        }
                        else
                            return true;
                    }
                    else {
                        alert("File extensions allowed: png ");
                        return false;
                    }
                }
                else
                    return true;
            }
            else
                return true;
        }
        else {
            return true;
        }
    }
    catch (e) {
        return false;
    }
}

function ContactNoLengthBilling() {
    if ($('#txtBillingEnquiries').val() != '') {
        if (($('#txtBillingEnquiries').val().length < 14) || !($('#txtBillingEnquiries').val().lastIndexOf('-') == 9)) {
            alert("Please enter 10 digit Billing Enquiries number.");
            $('#txtBillingEnquiries').focus();
            return false;
        }
        var threenumsum = parseInt($('#txtBillingEnquiries').val().charAt(1)) + parseInt($('#txtBillingEnquiries').val().charAt(2)) + parseInt($('#txtBillingEnquiries').val().charAt(3));
        if (threenumsum <= 1) {
            alert("Please enter a valid Billing Enquiries number");
            $('#txtBillingEnquiries').focus();
            return false;
        }
        if ($('#txtBillingEnquiries').val().charAt(1) == 0) {
            alert("Please enter a valid Billing Enquiries number");
            $('#txtBillingEnquiries').focus();
            return false;
        }

        return true;
    }
    else {
        return true;
    }
}

function ContactNoLengthCustomerService() {
    if ($('#txtCustomerService').val() != '') {
        if (($('#txtCustomerService').val().length < 14) || !($('#txtCustomerService').val().lastIndexOf('-') == 9)) {
            alert("Please enter 10 digit Customer Service number.");
            $('#txtCustomerService').focus();
            return false;
        }
        var threenumsum = parseInt($('#txtCustomerService').val().charAt(1)) + parseInt($('#txtCustomerService').val().charAt(2)) + parseInt($('#txtCustomerService').val().charAt(3));
        if (threenumsum <= 1) {
            alert("Please enter a valid Customer Service number");
            $('#txtCustomerService').focus();
            return false;
        }
        if ($('#txtCustomerService').val().charAt(1) == 0) {
            alert("Please enter a valid Customer Service number");
            $('#txtCustomerService').focus();
            return false;
        }

        return true;
    }
    else {
        return true;
    }
}