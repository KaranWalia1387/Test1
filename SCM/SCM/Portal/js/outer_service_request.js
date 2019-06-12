var lastopenid = '#TableBill';
var selected = '0';
var arrholidaylst;
var status = false;
var src = '';
$(document).ready(function () {
    arrholidaylst = $('#hdnHolidayLst').val().split(',');
    hideshowdiv($('#ddl_Reason').val());
    $('#btnRemoveFile').hide();
    $('.serviceforms input[type=text]:not(#txtDateOfMoving,#txtMODateofmoving,#txtTODateOfMoving,#txtTDateOfMoving,#txtBusinessPhone,#txtEmailAddress,#txtHomePhone,#txtMOBusinessPhone,#txtMOEmailAddress,#txtMOHomePhone,#txtTBusinessPhone,#txtTEmailAddress,#txtTHomePhone)').val('');
    $('input:checkbox').removeAttr('checked');
    
    toastr.options = {
        "closeButton": true,
        "debug": false,
        "newestOnTop": false,
        "progressBar": false,
        "onclick": null,
        "positionClass": "toast-top-right",
        "preventDuplicates": true,
        "showDuration": "300",
        "hideDuration": "1000",
        "timeOut": "2000",
        "extendedTimeOut": "1000",
        "showEasing": "swing",
        "hideEasing": "swing",
        "showMethod": "fadeIn",
        "hideMethod": "fadeOut"
    }
    $('#ddl_Reason').change(function () {
        selected = $(this).val();
        hideshowdiv(selected);

    });

    function hideshowdiv(selected)
    {
        $('#divAccountNumber input[type="text"]').removeClass("errorbox");
        switch (selected) {
            case '30':
                $('#li_stp5').hide();
                $('#b_stp6').html("5.");
                index = 1;
                $(".breadcrumb_new li").removeClass('active');
                $(".breadcrumb_new li:eq(0)").addClass('active');
                $("#TableService1").hide();
                $("#TableService2").hide();
                $("#divMoveOutLhs").hide();
                $("#divMoveOutRhs").hide();
                $("#divServiceLhs").hide();
                $("#divServiceRhs").hide();
                $("#divMoveInLhs").show();
                $("#divMoveInRhs").show();

                $("#divMoveIn").css('display', 'block');
                $("#divOther").css('display', 'none');
               // $(".hide_move_in").hide();
                $(".hide_move_in_next").hide();
                $(".hide_title_inner").hide();
                $('#divMoveInLhs input[type="text"],#divMoveInLhs select').removeClass("errorbox")
                //  $('#div_Attachement').hide();
                break;

            case '31':
                $("#TableService1").hide();
                $("#TableService2").hide();
                $("#divMoveInLhs").hide();
                $("#divMoveInRhs").hide();
                $("#divServiceLhs").hide();
                $("#divServiceRhs").hide();
                $("#divMoveOutLhs").show();
                $("#divMoveOutRhs").show();
               // $('#div_Attachement').show();
                $("#divMoveIn").css('display', 'none');
                $("#divOther").css('display', 'block');
                $('#divMoveOutLhs input[type="text"],#divMoveOutLhs select').removeClass("errorbox")
                break;

            case '34':
                $("#TableService1").hide();
                $("#TableService2").hide();
                $("#divMoveInLhs").hide();
                $("#divMoveInRhs").hide();
                $("#divMoveOutLhs").hide();
                $("#divMoveOutRhs").hide();
                $("#divServiceLhs").show();
                $("#divServiceRhs").show();
               // $('#div_Attachement').show();
                $("#divMoveIn").css('display', 'none');
                $("#divOther").css('display', 'block');
                $('#divServiceLhs input[type="text"],#divServiceLhs select').removeClass("errorbox")
                break;

            default:
                $("#divMoveInLhs").hide();
                $("#divMoveInRhs").hide();
                $("#divMoveOutLhs").hide();
                $("#divMoveOutRhs").hide();
                $("#divServiceLhs").hide();
                $("#divServiceRhs").hide();
                $("#TableService1").show();
                $("#TableService2").show();

                $("#divMoveIn").css('display', 'none');
                $("#divOther").css('display', 'block');

                $('#r1 input[type="text"],#r input[type="text"],#r select,#r select').removeClass('errorbox');
                break;
        }
    }

    $('#autoFill').click(function () {
        if ($(this).is(":checked")) {
            $('#txtTMStreetNo').val($('#txtTStreetNo').val());
            $('#txtTMMod').val($('#txtTMod').val());
            $('#txtTMStreetName').val($('#txtTStreetName').val());
            $('#txtTMUnitNo').val($('#txtTUnitNo').val());
            $('#txtTMCity').val($('#txtTCity').val());
            $('#txtTMState').val($('#txtTState').val());
            $('#txtTMZipCode').val($('#txtTZipCode').val());
        }
        else {

            $('#txtTMStreetNo').val('');
            $('#txtTMMod').val('');
            $('#txtTMStreetName').val('');
            $('#txtTMUnitNo').val('');
            $('#txtTMCity').val('');
            $('#txtTMState').val('');
            $('#txtTMZipCode').val('');

        }
    });
   //This method is created to check if more than one required field is mandatory then give a alert 'All fields required on service-request.aspx page' 
    //We are using this method only on service-request.aspx
    function validateServicePage2(selected) {
        status = '';
        switch (selected) {
            case '30':
                status = ValidateAllPageFieldsSingleMessage('divAccountNumber,divMoveInLhs') && checkHtml('txt_Comments') && ValidPhoneNo('txtHomePhone') && ValidEmailId('txtEmailAddress') && ValidPhoneNo('txtBusinessPhone') && checkNumber('txtAccountNo');
                if (status == true) {
                }
                return status;
               
            case '31':
                status = ValidateAllPageFieldsSingleMessage('divAccountNumber,divMoveOutLhs') && ValidateAllPageFieldsSingleMessage('divMoveOutRhs') && checkHtml('txt_Comments') && ValidPhoneNo('txtMOHomePhone') && ValidEmailId('txtMOEmailAddress') && ValidPhoneNo('txtMOBusinessPhone') && checkNumber('txtAccountNo');
                if (status == true) {
                }
                return status;
               
            case '34':
                status = ValidateAllPageFieldsSingleMessage('divAccountNumber,divServiceLhs') && ValidateAllPageFieldsSingleMessage('divServiceRhs') && checkHtml('txt_Comments') && ValidPhoneNo('txtTHomePhone') && ValidEmailId('txtTEmailAddress') && ValidPhoneNo('txtTBusinessPhone') && checkNumber('txtAccountNo');
                if (status == true) {
                }
                return status;
               
            default:
                status = ValidateAllPageFieldsSingleMessage('r1,r2') && checkHtml('txt_Comments') && checkNumber('txtAccountNo');//0004653: Html tag must not allowed for Service/Connect me text fields.
                if (status == true) {
                }
                return status;
               
        }
    }

    


    $('#btnSaveChanges').click(function () {

       
        loader.showloader();
        src = "";
        var selected = $('#ddl_Reason option:selected').val();   
        status=validateServicePage2(selected);
        if (status == true || status == "true") {
            if (grecaptcha.getResponse().length == 0) {
                loader.hideloader();
                //alert('Please select Captcha');
                 toastr.error($('#spnValidation_Msg_Captcha').text());
             
                return false;
            }

            if ($('#flupload').val() != '') {
                if (GetFileSize('flupload') == true) {
                    $.ajaxFileUpload({
                        type: "POST",
                        fileElementId: 'flupload',
                        url: "Upload.ashx?Path=Notification",
                        secureuri: false,
                        cache: false,
                        contentType: 'text/plain',
                        dataType: "text",
                        success: function (data, status) {
                            src = data;
                            if (data != '') {
                                submitServiceRequest();
                            }
                            else {
                                toastr.error($("#lblNotSent").text());

                            }

                        },
                        error: function (data, status, e) {
                            toastr.error(e);

                        }
                    });
                }
                else { loader.hideloader(); }
            }
            else { src = ''; submitServiceRequest(); }
            
        }
        else {
            loader.hideloader();
            $("#txtTODateOfMoving").blur();//Removing Focus on todate after submit(as per marketing sheet)
        
        }
    });

    function submitServiceRequest() {
      
            var parameter = { json: createServiceReqParam() };
            $.ajax({
                type: "POST",
                url: "outer-service-request.aspx/SaveServiceRequest",
                data: JSON.stringify(parameter),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            })
        //
    }

    function resetForm() {

        $(".ajax__calendar_active").removeClass('ajax__calendar_active');

        $("#divMoveInLhs").hide();
        $("#divMoveInRhs").hide();
        $("#divMoveOutLhs").hide();
        $("#divMoveOutRhs").hide();
        $("#divServiceLhs").hide();
        $("#divServiceRhs").hide();
        $("#TableService1").show();
        $("#TableService2").show(); 
        $('#chk_Locked_gates').attr('checked', false);
        $('#chk_Pets').attr('checked', false);
        $('#ddl_Reason option').eq(0).prop('selected', true).trigger('change');
        $('#txt_Comments').val('');
        $('#flupload').val(''); $('#btnRemoveFile').hide();
        $("#nofile").html($('#nofile').attr('title'));

        $('#chkMoveIn').attr('checked', false);
        $("#txtMod").val('');
        $("#txtStreetNo").val('');
        $("#txtStreetName").val('');
        $("#txtCity").val('');
        $("#txtZipCode").val('');
        $("#txtUnitNo").val('');
        $("#txtState").val('');

        $("#txtMMod").val('');
        $("#txtMStreetNo").val('');
        $("#txtMStreetNo").val('');
        $("#txtMStreetName").val('');
        $("#txtMCity").val('');
        $("#txtMZipCode").val('');
        $("#txtMUnitNo").val('');
        $("#txtMState").val('');

        $("#txtMOMod").val('');
        $("#txtMOStreetNo").val('');
        $("#txtMOStreetNo").val('');
        $("#txtMOStreetName").val('');
        $("#txtMOCity").val('');
        $("#txtMOZipCode").val('');
        $("#txtMOUnitNo").val('');
        $("#txtMOState").val('');

        $("#txtTMod").val('');
        $("#txtTStreetNo").val('');
        $("#txtTStreetNo").val('');
        $("#txtTStreetName").val('');
        $("#txtTCity").val('');
        $("#txtTZipCode").val('');
        $("#txtTUnitNo").val('');
        $("#txtTState").val('');

        $('#autoFillAddress').attr('checked', false);

        $("#txtTMMod").val('');
        $("#txtTMStreetNo").val('');
        $("#txtTMStreetNo").val('');
        $("#txtTMStreetName").val('');
        $("#txtTMCity").val('');
        $("#txtTMZipCode").val('');
        $("#txtTMUnitNo").val('');
        $("#txtTMState").val('');

        $("#txtAccountNo").val('');
        $("#txtHomePhone").val('');
        $("#txtBusinessPhone").val('');
        $("#txtEmailAddress").val('');
        $("#txtDateOfMoving").val('');

        $('select').removeClass('errorbox');
        $('input').removeClass('errorbox');
        $('textarea').removeClass('errorbox');
    }

    function Reset() {
        $("#TableService1").find("input:text").val('');
        $("#TableService2").find("input:text").val('');
        $("#divMoveInLhs").find("input:text").val('');
        $("#divMoveInRhs").find("input:text").val('');
        $("#divContactInfo").find("input:text").val('');
        $("#divMoveOutLhs").find("input:text").val('');
        $("#divServiceLhs").find("input:text").val('');

        $("form input:text").val(''); //For All TextBoxes on the page.
        $("form input:checkbox").attr('Checked', false); //For All Checkboxes on the page.
        $("form select").each(function () { $(this)[0].selectedIndex = 0; }); //For All Dropdownlists and Listboxes on the page makes 0 as selected index.
        $("form textarea").val(''); //For All Textareas on the page.
        grecaptcha.reset();//To Reset Captcha after success
        return false;
    }


    function OnSuccess(data, status) {
        if (data.d == null || data.d == undefined) {
            toastr.error($("#lblNotSent").text());
            loader.hideloader();
            resetForm();
            Reset();
        }
        else {
            var res = JSON.parse(data.d);
            if (parseInt(res.Table[0].Status) > 0) {
                toastr.success(res.Table[0].Message);
                resetForm();
                Reset();
            }
            else {
                toastr.error($("#lblNotSent").text());
          

            }
            resetForm();
            Reset();
            loader.hideloader();
        }
    }

    function OnError(request, status, error) {
        toastr.error($("#lblNotSent").text());
        resetForm();
        Reset();
        loader.hideloader();
    }

    //Function to create parameters to submit service request data.
    

    function GetMailingAddressFeilds(str) {
        var strarr = str.split('|');
        var p = '';
        p += "&MailingStreetNo=" + strarr[0];
        p += "&MailingStreetName=" + strarr[1];
        p += "&MailingCity=" + strarr[2];
        p += "&MailingState=" + strarr[3];
        p += "&MailingZipCode=" + strarr[4];
        return p.toString();
    }

    function GetContactFeilds(str) {
        var strarr = str.split('|');
        var p = '';
        p += "&HomePhone=" + strarr[0];
        p += "&BusinessPhone=" + strarr[1];
        p += "&EmailAddress=" + strarr[2];
        p += "&FromEMail=" + strarr[2];
        return p.toString();
    }

    function GetAddressFeilds(str) {
        var strarr = str.split('|');
        var p = '';
        p += "&StreetNo=" + strarr[0];
        p += "&StreetName=" + strarr[1];
        p += "&City=" + strarr[2];
        p += "&State=" + strarr[3];
        p += "&ZipCode=" + strarr[4];
        p += "&MovingInDate=" + strarr[5];
        return p.toString();
    }

    function GetGeneralFeilds(str) {
        var strarr = str.split('|');
        var p = '';
        p += "&FirstName=" + strarr[1];
        //p += "&Phone=" + strarr[2];
        p += "&BusinessPhone=" + strarr[2];        
        p += "&Pets=" + strarr[3];
        p += "&LockedGate=" + strarr[4];
        p += "&homephone=" + strarr[5];//Bug 6351
        
        //p += "&BusinessPhone=" + strarr[5];//Bug 6351
        //p += "&MiddleName=" + strarr[6];
        //p += "&LastName=" + strarr[6];
        p += "&Name=" + strarr[6];
        return p.toString();
    }

    function createServiceReqParam() {
        var param = 'Reason=' + escape($('#ddl_Reason').find(":selected").text());
        param += "&ReasonId=" + $('#ddl_Reason').val();


        if ($('#txt_Comments').val().trim().length != 0)
        { param += "&MessageBody=" + escape($('#txt_Comments').val().trim()); }
        else
        { param += "&MessageBody=" + 'Message Not Given'; }
        param += "&IsShow=0&IsPreLogin=1";     
        param += "&UtilityAccountNumber=" + escape($('#txtAccountNo').val().trim());
        param += "&DateTime=" + escape($('#txtDate').val().trim()) + ' ' + $('#ddlHours').find(":selected").text() + ':' + $('#ddlMin').find(":selected").text() + $('#ddlAmpm').find(":selected").text();
        if (src != '') {
            param += "&AttachmentName=" + escape(src);
        }
        //Parameters handling based on request type START
        switch ($('#ddl_Reason').val()) {
            case "30":
                var str = escape($('#txtStreetNo').val().trim()) + '|' + escape($('#txtStreetName').val().trim()) + '|' + escape($('#txtCity').val()) + '|' + escape($('#txtState').val().trim()) + '|' + escape($('#txtZipCode').val().trim()) + '|' + escape($('#txtDateOfMoving').val().trim());
                param += (GetAddressFeilds(str));
                if ($('#txtUnitNo').val().trim().length != 0) {
                    param += "&UnitNo=" + escape($('#txtUnitNo').val().trim());
                }

                str = escape($('#txtMStreetNo').val().trim()) + '|' + escape($('#txtMStreetName').val().trim()) + '|' + escape($('#txtMCity').val().trim()) + '|' + escape($('#txtMState').val().trim()) + '|' +  escape($('#txtMZipCode').val().trim());
                param += (GetMailingAddressFeilds(str));
                if ($('#txtMUnitNo').val().trim().length != 0) {
                    param += "&MailingUnitNo=" +  escape($('#txtUnitNo').val().trim());
                }
                // get only number from phone number
                var txtHomePhone = $('#txtHomePhone').val() != '' ? parseInt($('#txtHomePhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtHomePhone').val();
                var txtBusinessPhone = $('#txtBusinessPhone').val() != '' ? parseInt($('#txtBusinessPhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtBusinessPhone').val();
                // str = $('#txtHomePhone').val() + '|' + $('#txtBusinessPhone').val() + '|' + $('#txtEmailAddress').val();
                str = escape(txtHomePhone) + '|' + escape(txtBusinessPhone) + '|' + escape($('#txtEmailAddress').val());
                param += (GetContactFeilds(str));
                break;

            case "31":
                param += "&MovingOutDate=" + escape($('#txtMODateofmoving').val());
                var txtMOHomePhone = $('#txtMOHomePhone').val() != '' ? parseInt($('#txtMOHomePhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtMOHomePhone').val();
                var txtMOBusinessPhone = $('#txtMOBusinessPhone').val() != '' ? parseInt($('#txtMOBusinessPhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtMOBusinessPhone').val();

                str = escape(txtMOHomePhone) + '|' + escape(txtMOBusinessPhone) + '|' + escape($('#txtMOEmailAddress').val());
                param += (GetContactFeilds(str));
                str = escape($('#txtMOStreetNo').val()) + '|' + escape($('#txtMOStreetName').val()) + '|' + escape($('#txtMOCity').val()) + '|' + escape($('#txtMOState').val()) + '|' + escape($('#txtMOZipCode').val());
                param += (GetMailingAddressFeilds(str));
                if ($('#txtMOUnitNo').val().trim().length != 0) {
                    param += "&MailingUnitNo=" + escape($('#txtMOUnitNo').val());
                }
                break;

            case "34":
                param += "&MovingOutDate=" + escape($('#txtTDateOfMoving').val().trim());
                param += "&streetno=" + escape($('#txtTStreetNo').val());
                param += "&streetname=" + escape($('#txtTStreetName').val());
                param += "&city=" + escape($('#txtTCity').val());
                param += "&state=" + escape($('#txtTState').val());
                param += "&zipcode=" + escape($('#txtTZipCode').val());
              //  param += "&Customername=" + $('#txtLastNameMovIn').val();
                param += "&unitno=" + $('#txtTUnitNo').val();
            
             //   param += "&DOB=" + $('#TxtDateOfBirth').val();
              //  str = escape($('#txtTStreetNo').val().trim()) + '|' + escape($('#txtTStreetName').val().trim()) + '|' + escape($('#txtTCity').val().trim()) + '|' + escape($('#txtTState').val().trim()) + '|' + escape($('#txtTZipCode').val().trim()) + '|' + escape($('#txtTDateOfMoving').val().trim());
            //    param += (GetAddressFeilds(str));
                //if ($('#txtTMod').val().trim().length != 0) { //Not Mandatory
                param += "&Mod=" + escape($('#txtTMod').val().trim());
                //}
               
                //{ param += "&UnitNo=" + escape($('#txtTUnitNo').val().trim()); }
                var txtTHomePhone = $('#txtTHomePhone').val() != '' ? parseInt($('#txtTHomePhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtTHomePhone').val();
                var txtTBusinessPhone = $('#txtTBusinessPhone').val() != '' ? parseInt($('#txtTBusinessPhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtTBusinessPhone').val();
                str = escape(txtTHomePhone) + '|' + escape(txtTBusinessPhone) + '|' + escape($('#txtTEmailAddress').val());
                param += (GetContactFeilds(str));
                str = escape($('#txtTMStreetNo').val()) + '|' + escape($('#txtTMStreetName').val()) + '|' + escape($('#txtTMCity').val()) + '|' + escape($('#txtTMState').val()) + '|' + escape($('#txtTMZipCode').val());
                param += (GetMailingAddressFeilds(str));
                //if ($('#txtTMMod').val().trim().length != 0) { //Not Mandatory
                param += "&MailingMod=" + escape($('#txtTMod').val().trim());
                //}
                if ($('#txtTMUnitNo').val().trim().length != 0) {
                    param += "&MailingUnitNo=" + escape($('#txtTUnitNo').val().trim());
                }
                break;

            default:
                var txtContact = $('#txtContact').val() != '' ? parseInt($('#txtContact').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtContact').val();
                var txtAlternatePhone = $('#txtAlternatePhone').val() != '' ? parseInt($('#txtAlternatePhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtAlternatePhone').val();
                str = escape($('#txtDate').val().trim()) + '|' + escape($('#txtName').val().trim()) + '|' + escape(txtContact) + '|' + (($('#chk_Pets').attr('checked')) ? "1" : "0") + '|' + (($('#chk_Locked_gates').attr('checked')) ? "1" : "0") + '|' + escape(txtAlternatePhone) + '|' + escape($('#txtLastName').val().trim());
                param += (GetGeneralFeilds(str));
        }
        //END
        return param;
    }
    $('#chkMoveIn').change(function () {
        setMailingAddress(this);
    });
    $('#chkTransfer').change(function () {
        setMailingAddress(this);
    });
    $('#autoFillAddress').change(function () {
        setMailingAddress(this);
    });


    // move in request
    $('#BtnSumit').click(function (e) {
        try {
            src = "";
            e.preventDefault();
            loader.showloader();
            debugger;
            if (ValidateAllPageFieldsSingleMessage('divAccountNumber,DivSteps') && checkHtml('txt_Comments')) {
                if (grecaptcha.getResponse().length == 0) {
                   // toastr.error("Enter Valid Captcha");
                    toastr.error($('#spnValidation_Msg_Captcha').text());
                    loader.hideloader();
                    return false;
                }
              
                //var ssnval = $('#TxtSclSecrityNo').val().replace(/-/g, '');
                //if (ssnval == "000000000") {
                //    $('#TxtSclSecrityNo').val("");
                //    error.showerror("#TxtSclSecrityNo", $('#TxtSclSecrityNo').attr("validatemessage"));
                //    loader.hideloader();
                //    return false;
                //}
                //else {
                //    if (ssnval.length > 10 ) {
                //        error.showerror("#TxtSclSecrityNo", $('#TxtSclSecrityNo').attr("validatemessage"));
                //        $('#TxtSclSecrityNo').focus().attr("backgroundColor", "red");
                //        loader.hideloader();
                //        return false;
                //    }                   
                //}

                if ($('#flupload').val() != '') {
                    if (GetFileSize('flupload') == true) {
                        $.ajaxFileUpload({
                            type: "POST",
                            fileElementId: 'flupload',
                            url: "Upload.ashx",
                            secureuri: false,
                            cache: false,
                            contentType: 'text/plain',
                            dataType: "text",
                            success: function (data, status) {
                                src = data;
                                if (data != '') {
                                    payment();
                                }
                                else {

                                    toastr.error($("#lblNotSent").text());
                                }

                            },
                            error: function (data, status, e) {
                                toastr.error(e);
                                //alert(e);
                            }
                        });
                    }
                }
                else { src = ''; payment(); }
            }
            else {
                loader.hideloader();
                return false;
            }
        }
        catch (e) {
            console.log(e);
        }
    });
   
    function payment() {
      

        submitServiceRequest1();

        //var param = "36438|369|1|1.00|11.00|0.00|0.00|9|5EBB5F15-B391-4F6D-8602-97109313C863|0|PADMO|pacedemo8330100rnpsmspjc";

        //var result = NewOneTimePayment.PayBill(param).value;
        //if (result.Rows[0].Status == "1") {
        //    submitServiceRequest1();
        //}
        //else {
        //    toastr.error(result.Rows[0].Message);
        //   // submitServiceRequest1();
        //}

    }

    function submitServiceRequest1() {
        param = createParameters();
        if (src != '') {
            param += "&AttachmentName=" + escape((src));
        }
        var parameter = { json: param };
        $.ajax({
            type: "POST",
            url: "outer-service-request.aspx/SubmitForm",
            data: JSON.stringify(parameter),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessService,
            error: OnErrorService
        })
        //
    }
    function OnSuccessService(data, status) {
        try {
            if (data.d == null || data.d == undefined) {
                toastr.error($("#lblNotSent").text());
                loader.hideloader();

            }
            else {
                var res = JSON.parse(data.d);
                if (parseInt(res.Table[0].Status) > 0) {
                    //if (pay != "" && pay.length > 0) {
                    //    toastr.success(res.Table[0].Message + pay[0] + pay[1] + pay[2]);
                    //    window.location.href = "default.aspx";
                    //}
                    //else {
                    toastr.success(res.Table[0].Message);
                    //window.location.href = "default.aspx";

                    // }

                }
                else {
                    toastr.error($("#lblNotSent").text());
                }

                loader.hideloader();
                resetForm();
                Reset();
                $('.div_step4 select').prop('disabled', false).val('');
                $('.div_step4 input').prop('disabled', false).val('');
            }
        } catch (e) {
            loader.hideloader();
            // toastr.show("Your request has been submitted successfully");
        }
    }

    function OnErrorService(request, status, error) {
        toastr.error($("#lblNotSent").text());

        loader.hideloader();
    }
 

   
});

$(window).load(function () {
    $('#TxtDateOfBirth,#txtDOB').val('');// clear text field on page load

})

function validateDefault() {
    var $result1;
    var f = false;
    var ctrlObj = k('#r' + ' input[type=text][value=][mandatory="1"],textarea[mandatory="1"][value=],select[mandatory="1"][value=]');
    $('#r' + ' input[type=text],select[mandatory="1"],textarea[mandatory="1"]').each(function () {
        if ($(this).val().trim().length == 0)
            $(this).val('');
        $(this).css("border", '');
    });

    if (ctrlObj.length > 1) {
        $('#errorMsg').css('display', 'block');
        $('#errorMsg').html($('#IDMandatory').text()).delay(5000).fadeOut(1000);
        for (i = 0; i < ctrlObj.length; i++) {
            $(ctrlObj[i]).removeAttr('class');
            $('.w2ui-tag-body').hide();
        }
        for (i = 0; i < ctrlObj.length; i++) {
            ctrlObj[i].className = "errorbox";
        }
        return false;
    }
    else if (ctrlObj.length == 0) {
        var $firstTime = new Date('1/1/1900 9:00:00 AM');
        var $secondTime = new Date('1/1/1900 5:00:00 PM');
        $dt = '1/1/1900' + ' ' + $("#ddlHours").val() + ":" + $("#ddlMin").val() + " " + $("#ddlAmpm").val();
        var startTimeObject = new Date();
        startTimeObject.setHours($("#ddlHours").val(), $("#ddlMin").val(), 0)
        $result = (new Date($dt) >= $firstTime) && ((new Date($dt)) <= $secondTime);
        $result1 = validatePhoneNumber();
        if ($result1 == true) {
            if ($result != true) {
                error.showerror("#ddlMin,#ddlHours,#ddlAmpm", '');
                $('#errorMsg').css('display', 'block');
                $('#errorMsg').html($('#IDTimeBand').text()).delay(5000).fadeOut(1000);
                return false;
            }
            return true;
        }
        else
            return false;
    }
    else {
        if (ctrlObj[0].tagName.toLowerCase() == "input") {
            error.showerror(ctrlObj[0], $('#IDEnterText').text() + " " + ctrlObj[0].title);
            return false;
        }
        else {
            error.showerror(ctrlObj[0], $('#IDSelectText').text() + ' a ' + ctrlObj[0].title);
            return false;
        }
    }
    return true;
}

function File_OnChange(sender) {
    $('#btnRemoveFile').show();
}

function removeFile() {
    $('#flupload').val('');
    var control = $("#flupload");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

function chkPhone() {
    if (($('#txtContact').val().length < 14) || !($('#txtContact').val().lastIndexOf('-') == 9)) {
       // w2alert("Please provide a 10 digit Primary Phone.");
        toastr.warning("Please provide a 10 digit Primary Phone.");
        $('#txtContact').focus();
        return false;
    }
    else {
        $('#hdnFlag').val('save');
        return true;
    }
}

function validatePhoneNumber() {
    var result = true;
    if ($("#txtContact").val() != '') {
        if (($("#txtContact").val().length < 14) || !($("#txtContact").val().lastIndexOf('-') == 9)) {
            error.showerror("#txtContact", 'Please provide a 10 digit Primary Phone.'); $('#txtContact').focus();
            result = false;
        }
        var threenumsum = parseInt($("#txtContact").val().charAt(1)) + parseInt($("#txtContact").val().charAt(2)) + parseInt($("#txtContact").val().charAt(3));
        if (result == "true" && threenumsum <= 1) {
            error.showerror("#txtContact", 'Invalid Primary Phone.'); $('#txtContact').focus();
            result = false;
        }        
        if (result == "true" && parseInt($("#txtContact").val().charAt(1)) == 0) {
            error.showerror("#txtContact", 'Please provide a 10 digit Primary Phone.'); $('#txtContact').focus();
            result = false;
        }
    }
    if ($("#txtAlternatePhone").val() != '') {
        if (($("#txtAlternatePhone").val().length < 14) || !($("#txtAlternatePhone").val().lastIndexOf('-') == 9)) {
            error.showerror("#txtAlternatePhone", 'Please provide a 10 digit Secondary Phone.'); $('#txtAlternatePhone').focus();
            result = false;
        }
        var threenumsum = parseInt($("#txtAlternatePhone").val().charAt(1)) + parseInt($("#txtAlternatePhone").val().charAt(2)) + parseInt($("#txtAlternatePhone").val().charAt(3));
        if (result == "true" && threenumsum <= 1) {
            error.showerror("#txtAlternatePhone", 'Invalid Secondary Phone.'); $('#txtAlternatePhone').focus();
            result = false;
        }

        if (result == "true" && parseInt($("#txtAlternatePhone").val().charAt(1)) == 0) {
            error.showerror("#txtAlternatePhone", 'Please provide a 10 digit Secondary Phone.'); $('#txtAlternatePhone').focus();
            result = false;
        }
    }
    return result;
}

function validphoneno(e, id) {
    var code = e.which || event.keyCode;
    if (code != 8) {
        if ($('#' + id).val().length == 3 || $('#' + id).val().length == 7) {
            $('#' + id).val($('#' + id).val() + '-');
        }
    }
}

//This function is used for Schedule Date.
function checkForPreviousDate(sender, args) {
    
        DT = $('#hdnMoveDate').val().split("-");
        var d = new Date(DT[0], DT[2], DT[1]);
        if (sender._selectedDate.getTimezoneOffset() > 350) {
            if (sender._selectedDate.getDay() == 5 || sender._selectedDate.getDay() == 6) {
                toastr.warning($('#IDWeekday').text());
                sender._selectedDate = d;
                sender._textbox.set_Value(sender._selectedDate.format(sender._format));
                return;
            }

        }
        else if (sender._selectedDate.getDay() == 6 || sender._selectedDate.getDay() == 0) {
            {
                toastr.warning($('#IDWeekday').text());
                sender._selectedDate = d;
                sender._textbox.set_Value(sender._selectedDate.format(sender._format));
                return;

            }
        }
        if (sender._selectedDate < d) {
            toastr.warning($('#IDWorkingDay').text())
           // w2alert($('#IDWorkingDay').text());
            sender._selectedDate = d;
            sender._textbox.set_Value(sender._selectedDate.format(sender._format));
        }
        if (!checkforholiday(sender._selectedDate)) {
           toastr.warning($('#IDDateHoliday').text())
           // w2alert($('#IDDateHoliday').text());
            sender._selectedDate = d;
            sender._textbox.set_Value(sender._selectedDate.format(sender._format));
            return false;
        }
   
}

//This function is used for Moving Date.
function checkForMoveDate(sender, args) {
    DT = $('#hdnMoveDate').val().split("-");
    var d = new Date(DT[0], DT[2], DT[1]);
    if (sender._selectedDate.getTimezoneOffset() > 350) {
        if (sender._selectedDate.getDay() == 5 || sender._selectedDate.getDay() == 6) {
            toastr.warning($('#IDWeekday').text());
            sender._selectedDate = d;
            sender._textbox.set_Value(sender._selectedDate.format(sender._format));
            return;
        }

    }
    else if (sender._selectedDate.getDay() == 6 || sender._selectedDate.getDay() == 0) {
        {
            toastr.warning($('#IDWeekday').text());
            sender._selectedDate = d;
            sender._textbox.set_Value(sender._selectedDate.format(sender._format));
            return;

        }
    }
    if ($('#ddl_Reason').val()=="34"){
    if (sender._selectedDate < d) {
        toastr.warning($('#IDFutureDate').text())
        //w2alert($('#IDFutureDate').text());
        sender._selectedDate = d;
        sender._textbox.set_Value(sender._selectedDate.format(sender._format));
        return false;
    }
    }
    if (!checkforholiday(sender._selectedDate)) {
        sender._selectedDate = d;
        sender._textbox.set_Value(sender._selectedDate.format(sender._format));
        toastr.warning($('#IDDateHoliday').text())
        $('#txtMODateofmoving').val('');
        $('#txtTODateOfMoving').val('');
        //w2alert($('#IDDateHoliday').text());
        return false;
    }
    var movein = $("#txtTODateOfMoving").val();
    var moveout = $("#txtTDateOfMoving").val();
    if (movein.trim() != '' && moveout.trim() != '')
    {
        if (!checkMoveInOutValidation(movein, moveout)) {
            if (sender._id == "Cal_TODateOfMoving") {
                sender._selectedDate = new Date(moveout);
                sender._textbox.set_Value(sender._selectedDate.format(sender._format));
                toastr.warning($("#msgMoveInOut").text());
                return false;
            }
            if (sender._id == "Cal_TDateOfMoving") {
                sender._selectedDate = new Date(movein);
                sender._textbox.set_Value(sender._selectedDate.format(sender._format));
                toastr.warning($("#msgMoveInOut").text());
                return false;
            }
        }
    }
}

function checkMoveInOutValidation(inDate, outDate) {
    var moveindate = new Date(inDate);
    var moveoutdate = new Date(outDate);
    var isValid = true;
    if (moveindate > moveoutdate) {
        isValid = false;
    }
    return isValid;
}

function checkforholiday(selecteddate) {
    var date = new Date(selecteddate);
    selecteddate = ((date.getMonth() > 9 ? (date.getMonth() + 1) : '0' + ((date.getMonth() + 1))) + '/' + (date.getDate() > 9 ? (date.getDate()) : '0' + (date.getDate())) + '/' + (date.getFullYear()));
    var isholiday = true;
    for (var i = 0; i < arrholidaylst.length; i++) {
        if (selecteddate == arrholidaylst[i]) {
            isholiday = false;
        }
    }
    return isholiday;
}

function setMailingAddress(objthis) {
    var varMailing = null;
    var varAddress = null;
    switch (selected) {
        case '30':
            varAddress = '';
            varMailing = 'M';
            break;
        case '34':
            varAddress = 'T';
            varMailing = 'TM';
            $('#txtTMMod').val($('#txtTMod').val());
            break;
    }
    if (objthis.checked) {       
        $('#txt' + varMailing + 'UnitNo').attr('readonly', 'readonly');
        $('#txt' + varMailing + 'StreetNo').attr('readonly', 'readonly');
        $('#txt' + varMailing + 'StreetName').attr('readonly', 'readonly');
        $('#txt' + varMailing + 'City').attr('readonly', 'readonly');
        $('#txt' + varMailing + 'State').attr('readonly', 'readonly');
        $('#txt' + varMailing + 'ZipCode').attr('readonly', 'readonly');

        if ($('#txt' + varAddress + 'UnitNo').val() != '') {
            $('#txt' + varMailing + 'UnitNo').removeClass('errorbox');
            error.hideerror($('#txt' + varMailing + 'UnitNo'));
        }
        $('#txt' + varMailing + 'UnitNo').val($('#txt' + varAddress + 'UnitNo').val());

        if ($('#txt' + varAddress + 'StreetNo').val() != '') {
            $('#txt' + varMailing + 'StreetNo').removeClass('errorbox');
            error.hideerror($('#txt' + varMailing + 'StreetNo'));
        }
        $('#txt' + varMailing + 'StreetNo').val($('#txt' + varAddress + 'StreetNo').val());

        if ($('#txt' + varAddress + 'StreetName').val() != '') {
            $('#txt' + varMailing + 'StreetName').removeClass('errorbox');
            error.hideerror($('#txt' + varMailing + 'StreetName'));
        }
        $('#txt' + varMailing + 'StreetName').val($('#txt' + varAddress + 'StreetName').val());

        if ($('#txt' + varAddress + 'City').val() != '') {
            $('#txt' + varMailing + 'City').removeClass('errorbox');
            error.hideerror($('#txt' + varMailing + 'City'));
        }
        $('#txt' + varMailing + 'City').val($('#txt' + varAddress + 'City').val());

        if ($('#txt' + varAddress + 'State').val() != '') {
            $('#txt' + varMailing + 'State').removeClass('errorbox');
            error.hideerror($('#txt' + varMailing + 'State'));
        }
        $('#txt' + varMailing + 'State').val($('#txt' + varAddress + 'State').val());

        if ($('#txt' + varAddress + 'ZipCode').val() != '') {
            $('#txt' + varMailing + 'ZipCode').removeClass('errorbox');
            error.hideerror($('#txt' + varMailing + 'ZipCode'));
        }
        $('#txt' + varMailing + 'ZipCode').val($('#txt' + varAddress + 'ZipCode').val());

       
    }
    else {
        $('#txt' + varMailing + 'UnitNo').prop('readonly', false);
        $('#txt' + varMailing + 'StreetNo').prop('readonly', false);
        $('#txt' + varMailing + 'StreetName').prop('readonly', false);
        $('#txt' + varMailing + 'City').prop('readonly', false);
        $('#txt' + varMailing + 'State').prop('readonly', false);
        $('#txt' + varMailing + 'ZipCode').prop('readonly', false);
        if (varMailing == 'TM') {
            $('#txt' + varMailing + 'ZipCode').val('');
        }
        $('.mailing').val('');
    }
}


// to check if entered phone no is correct #12714
function ValidPhoneNo(phone) {
    var obj = $('#' + phone);
    var s = $(obj).val();
    if (s == '') {
        return true;
    }
    else {
        var phoneno = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;
        if (s.match(phoneno)) {
            return true;
        }
        else {
            error.showerror(obj, 'Please Enter valid Phone No ');
            $(obj).val('');
            $(obj).focus();
            return false;
        }

    }


}

// to check if entered email id is correct #12714
function ValidEmailId(email) {
    var obj = $('#' + email);
    var s = $(obj).val();
    if (s == '') {
        return true;
    }
    else if (isNaN(s)) {
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
        if (filter.test(s)) {
            return true;
        }
        else {
            error.showerror(obj, 'Please Enter valid Email ID.');
            $(obj).val('');
            $(obj).focus();
            return false;
        }

    }
    else {
        error.showerror(obj, 'Please Enter valid Email ID.');
        $(obj).val('');
        $(obj).focus();
        return false;

    }

}

// reset move in fields 
function resetStep() {
    try {
        //  $('.div_Steps').hide();
        $('#Step1').show();
        $('.div_isanyadlt').hide();
        $('#BtnBack').hide();
        $('#li_stp5').show();
        $('.div_step4 select').attr('readonly', false).val('');
        $('.div_step4 input').attr('readonly', false).val('');
        $($('input[type="radio"][name="Served"]')[1]).prop("checked", true)
        $($('input[type="radio"][name="rdo_typeAddr"]')[0]).prop('checked', true).trigger("change")
        $($('input[type="radio"][name="rdo_mode"]')[0]).prop("checked", true)
        $('input[name="ServiceRequest$rdo_AdltLving"][value="0"]').prop('checked', true);
        //$('#IsMobileNo1').prop("checked", true);
        $('#IsMobileNo1').prop("checked", true).trigger("change");
        index = 0;
        isLastStep = false;
        payStatus = 0;
        pay = "";
        $('.breadcrumb_nav_main ul li').removeClass("completed").removeClass("active")
        $($('.breadcrumb_nav_main ul li')[index]).addClass('active');
        $("#btnSaveChanges1").show();
        $("#Button1").hide();
        $("#BtnBack").hide();
        $("#ImgCard").show();
        $('#ImgVisa').hide();
        $('#Imgamex').hide();
        $('#ImgMaster').hide();
        $('#ImgDiscov').hide();
        $('#hdnCardtype').val('');

        $("#txtAlternatNum").val('');
        $("#txtPrimaryPhone").val('');
        $("#txtCardNo").val('');
        $("#txtSecurity").val('');
        resetfields();

    }
    catch (e) {
        console.log(e);
    }


}

function resetfields() {
    try {
        $('input.reset').each(function () {
            $(this).val("");
        })
        $('select.reset').each(function () {
            $("select#" + this.id)[0].selectedIndex = 0;
        })

    } catch (e) {
        console.log(e);
    }
}

function validateRecaptcha() {
    try{
        if (grecaptcha.getResponse().length == 0) {
            toastr.error($('#spnValidation_Msg_Captcha').text());
           // toastr.error("Enter Valid Captcha");
            loader.hideloader();
            return false;
        }
    }
    catch (e) {
        console.log(e);
    }
}

