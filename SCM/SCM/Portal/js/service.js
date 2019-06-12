var lastopenid = '#TableBill';
var selected = '0';
var arrholidaylst;
var pay = "";
$(document).ready(function () {

    inner = 1;

    $('#txtContact').mask('(000) 000-0000');
    $('#txtAlternatePhone').mask('(000) 000-0000');
    $('#txtHomePhone').mask('(000) 000-0000');
    $('#txtBusinessPhone').mask('(000) 000-0000');
    $('#txtMOHomePhone').mask('(000) 000-0000');
    $('#txtMOBusinessPhone').mask('(000) 000-0000');
    $('#txtTHomePhone').mask('(000) 000-0000');
    $('#txtTBusinessPhone').mask('(000) 000-0000');
    
    $('#verifyHead').hide()
    
    refresh();
    $(window).on('resize', refresh);

    hideshowdiv($('#ddl_Reason').val());

    arrholidaylst = $('#hdnHolidayLst').val().split(',');
    $('#btnRemoveFile').hide();
    $('.serviceforms input[type=text]:not(#txtDateOfMoving,#txtMODateofmoving,#txtTODateOfMoving,#txtTDateOfMoving,#txtBusinessPhone,#txtEmailAddress,#txtHomePhone,#txtMOBusinessPhone,#txtMOEmailAddress,#txtMOHomePhone,#txtTBusinessPhone,#txtTEmailAddress,#txtTHomePhone)').val('');
    $('input:checkbox').removeAttr('checked');
    $("#ddl_Reason").bind('change keyup', function (e) {
        selected = $(this).val();
        hideshowdiv(selected);
    });

    function hideshowdiv(selected)
    {
        switch (selected) {
            case '30':
                $('#li_stp5').hide();
                $('#b_stp6').html("5.");
                index = 1;
                $(".breadcrumb_new li").removeClass('active');
                $(".breadcrumb_new li:eq(0)").addClass('active');
                getMoveInData();
                getMoveInSAPData();
                $("#TableService1").hide();
                $("#TableService2").hide();
                $("#divMoveOutLhs").hide();
                $("#divMoveOutRhs").hide();
                $("#divServiceLhs").hide();
                $("#divServiceRhs").hide();
                $("#divMoveInLhs").show();
                $("#divMoveInRhs").show();

                $("#divMoveIn").css('display', 'table');
                $("#divOther").css('display', 'none');
                //  $(".hide_move_in").hide();
                $(".hide_move_in_next").hide();
                $(".hide_title_inner").hide();
                $('#divMoveInLhs input[type="text"],#divMoveInLhs select').removeClass("errorbox")
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

                $("#divMoveIn").css('display', 'none');
                $("#divOther").css('display', 'table');
                $(".hide_move_in").show();
                $(".hide_move_in_next").show();
                $(".hide_title_inner").show();
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

                $("#divMoveIn").css('display', 'none');
                $("#divOther").css('display', 'table');
                $(".hide_move_in").show();
                $(".hide_move_in_next").show();
                $(".hide_title_inner").show();
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
                $("#divOther").css('display', 'table');
                $(".hide_move_in").show();
                $(".hide_move_in_next").show();
                $(".hide_title_inner").show();
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

    $('#Step5div').hide(); $('#Step5').hide();
    $("#Step5_title").hide();
   

 

    //This method is created to check if more than one required field is mandatory then give a alert 'All fields required on service-request.aspx page' 
    //We are using this method only on service-request.aspx
    function validateServicePage2(selected) {
        var status = '';
        switch (selected) {
            case '30':
                status = ValidateAllPageFieldsSingleMessage('divMoveInLhs') && checkHtml('txt_Comments');
                if (status == true) {
                }
                return status;
                break;
            case '31':
                status = ValidateAllPageFieldsSingleMessage('divMoveOutLhs') && checkHtml('txt_Comments');
                if (status == true) {
                }
                return status;
                break;
            case '34':
                status = ValidateAllPageFieldsSingleMessage('divServiceLhs') && checkHtml('txt_Comments');
                if (status == true) {
                }
                return status;
                break;
            default:
                status = ValidateAllPageFieldsSingleMessage('r1,r') && checkHtml('txt_Comments') && checkScheduleTime();//0004653: Html tag must not allowed for Service/Connect me text fields.
                if (status == true) {
                }
                return status
                break;
        }
    }

    var src = '';
    var status = false;
    var Phstatus = false;

    
    $('#btnSaveChanges').click(function () {
        loader.showloader();

       

        var selected = $('#ddl_Reason option:selected').val();
        status = validateServicePage2(selected);
        if (status == true) {

            var email = $('#txtTEmailAddress').val();
            //var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            //if ($('#txtTEmailAddress').val() != "") {
              
            //    toastr.error("Please enter a valid Emailid");
            //    $('#txtTEmailAddress').val().focus();
            //    return false;
            //}


            var email = $('#txtTEmailAddress').val();
            var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
            if ($('#txtTEmailAddress').val().length == 0) {
                loader.hideloader();
                toastr.error('cannot be blank');
                $('#txtTEmailAddress').val().focus();
                return false;
            }
            else {
                if (!filter.test(email)) {
                    loader.hideloader();
                    toastr.error($('#mailtext').html());
                   
                    $('#txtTEmailAddress').focus();
                    
                    return false;
                }
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
                                //alert('Field Not Saved');
                                toastr.error($("#lblNotSent").text());
                            }

                        },
                        error: function (data, status, e) {

                            toastr.error(e);
                            //alert(e);
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

        //$("span[id=errorMsg]").remove();
        var parameter = { json: createServiceReqParam() };
        $.ajax({
            type: "POST",
            url: "service-request.aspx/SaveServiceRequest",
            data: JSON.stringify(parameter),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError
        });

    }

    function getMoveInSAPData() {
        $.ajax({
            type: "POST",
            url: "service-request.aspx/LoadSAPData",
            
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var arrayItem = $.parseJSON(data.d);
                for (var j = 0; j < arrayItem.length; j++) {
                    if (arrayItem[j]["UtilityAccountNumber"] == $('#ContentPlaceHolder1_lblAccountno').text()) {
                        var Address = arrayItem[j]["Properties"].split(',');
                        var SCZ = Address[1].split(' ');
                        var streetadd = Address[0].split(' ');
                        $("#txtStreetNo").val(streetadd[0]);
                        var streetname = '';
                        for (var i = 1 ; i < streetadd.length; i++) {
                            streetname += streetadd[i] + ' ';
                        }
                        $("#txtStreetName").val(streetname);                    
                        $("#txtCity").val(SCZ[1]);                      
                        //$("#txtState2").val(arrayItem[0].City);
                        //tr5q$("#txtZip").val(SCZ[3].replace(',', ''));
                    }
                }
                            },
            error: function () {

            }
        });

    }
    function getMoveInData() {
        //var parameter = { '':'' };
        $.ajax({
            type: "POST",
            url: "service-request.aspx/LoadMoveInData",
           
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var arrayItem = $.parseJSON(data.d);
                $("#txtFirstName").val(arrayItem.Table[0].FirstName);
                $("#txtLastName").val(arrayItem.Table[0].LastName);
                $("#txtAltEmailId").val(arrayItem.Table[0].EmailId);
              
                if (arrayItem.Table[0].FirstName == null)
                {
                    $("#txtLastNameMovIn").val(arrayItem.Table[0].LastName);
                }
                
                $('#txtPrimaryPhone').mask('(000) 000-0000');
                $('#txtAlternatNum').mask('(000) 000-0000');
             
                $("#txtPrimaryPhone").val(arrayItem.Table[0].MobilePhone);
                $("#txtAlternatNum").val(arrayItem.Table[0].HomePhone);
                $("#txtPrimaryPhone").trigger('input');
                $("#txtAlternatNum").trigger('input');
            },
            error: function () {

            }
        });

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
        $('#ddl_Reason option').eq(0).prop('selected', true);
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
        //$("#txtMOState").val('');

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
    }

    function Reload() {
        $.ajax({
            type: "POST",
            url: "service-request.aspx/LoadWebData",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function success(response) {
                var result = $.parseJSON(response.d).Table;
                //$('#txtName').val(result[0].FirstName + ' ' + result[0].LastName);
                $('#txtName').val(result[0].LastName);
                $('#txtMOBusinessPhone').val(result[0].HomePhone != null ? result[0].HomePhone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : result[0].HomePhone);
                $('#txtBusinessPhone').val(result[0].HomePhone != null ? result[0].HomePhone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : result[0].HomePhone);
                $('#txtTBusinessPhone').val(result[0].HomePhone != null ? result[0].HomePhone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : result[0].HomePhone);
                // $('#txtTHomePhone').val(result[0].MobilePhone); 
                $('#txtTHomePhone').val(result[0].MobilePhone != null ? result[0].MobilePhone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : result[0].MobilePhone);
                $('#txtMOHomePhone').val(result[0].MobilePhone != null ? result[0].MobilePhone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : result[0].MobilePhone);
                $('#txtHomePhone').val(result[0].MobilePhone != null ? result[0].MobilePhone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : result[0].MobilePhone);
                $('#txtAlternatePhone').val(result[0].HomePhone != null ? result[0].HomePhone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : result[0].HomePhone);
                $('#txtTEmailAddress').val(result[0].EmailId);
                $('#txtEmailAddress').val(result[0].EmailId);
                $('#txtMOEmailAddress').val(result[0].EmailId);
                $('#txtContact').val(result[0].MobilePhone != null ? result[0].MobilePhone.replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3") : result[0].MobilePhone);
                $('#lblAccountno').val(result[0].UtilityAccountNumber);
                var date = new Date();
                var year1 = date.getFullYear().toString();
                var datenew = date.getDate();
                var month1 = date.getMonth();
            
                var date1 = new Date(year1, month1, datenew);
             

                var selecteddate1 = get_next_weekday(date1);
                var selecteddate = (((selecteddate1.getMonth()+1) < 10 ? ("0" + (selecteddate1.getMonth()+1)) : (selecteddate1.getMonth()+1)) + '/' + (((selecteddate1.getDate()) < 10) ? ("0" + (selecteddate1.getDate())) : (selecteddate1.getDate())) + '/' + selecteddate1.getFullYear().toString().substr(2, 2));

                $('#txtDate').val(selecteddate);
            },
            error: OnErrorCS,
        });
    }
    function get_next_weekday(date) {
        var tomorrow = new Date(date.setDate(date.getDate() + 1))
        return tomorrow.getDay() % 6
        ? tomorrow
        : get_next_weekday(tomorrow)
    }

    function OnErrorCS(response) {
       
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
        return false;
    }

    function OnSuccess(data, status) {
        if (data.d == null || data.d == undefined) {
            toastr.error($("#lblNotSent").text());
            //var selecteddate = (((date.getMonth() + 1) < 10 ? ("0" + (date.getMonth() + 1)) : (date.getMonth() + 1)) + '/' + (((date.getMonth() + 1) < 10) ? ("0" + (date.getDate() + 1)) : (date.getDate() + 1)) + '/' + date.getFullYear().toString().substr(2, 2));
            //$('#txtDate').val(selecteddate);
            loader.hideloader();
            resetForm();
            Reset();
            Reload();
        }
        else {
            var res = JSON.parse(data.d);
            if (parseInt(res.Table[0].Status) > 0) {
                toastr.success(res.Table[0].Message);
            
                resetForm();
                Reset();
                Reload();
            }
            else {
            
                toastr.error($("#lblNotSent").text());
            }
            resetForm();
            Reset();
            Reload();
           
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
        p += "&Name=" + strarr[1];
        //p += "&Phone=" + strarr[2];
        p += "&businessphone=" + strarr[2];        
        p += "&Pets=" + strarr[3];
        p += "&LockedGate=" + strarr[4];
        //p += "&BusinessPhone=" + strarr[5];//Bug 6351
        p += "&homephone=" + strarr[5];        
        return p.toString();
    }

    function createServiceReqParam() {
        var param = 'Reason=' +escape($('#ddl_Reason').find(":selected").text());
        param += "&ReasonId=" + $('#ddl_Reason').val();
        if ($('#txt_Comments').val().trim().length != 0)
        { param += "&MessageBody=" + escape($('#txt_Comments').val().trim()); }
        else
        { param += "&MessageBody=" + 'Message Not Given'; }
        param += "&IsShow=0 &IsPreLogin=0";
        param += "&ServiceAccountNumber=" + $('#ContentPlaceHolder1_lblAccountno').text();
        if (src != '') {
            param += "&AttachmentName=" + escape((src));
        }
        //Parameters handling based on request type START
        switch ($('#ddl_Reason').val()) {
            case "30":
                var str = escape($('#txtStreetNo').val().trim()) + '|' + escape($('#txtStreetName').val().trim()) + '|' +escape($('#txtCity').val()) + '|' + escape($('#txtState').val().trim()) + '|' + escape($('#txtZipCode').val().trim()) + '|' + escape($('#txtDateOfMoving').val().trim());
                param += (GetAddressFeilds(str));
                if ($('#txtUnitNo').val().trim().length != 0) {
                    param += "&UnitNo=" + escape($('#txtUnitNo').val().trim());
                }

                str = escape($('#txtMStreetNo').val().trim()) + '|' + escape($('#txtMStreetName').val().trim()) + '|' + escape($('#txtMCity').val().trim()) + '|' + escape($('#txtMState').val().trim()) + '|' +escape($('#txtMZipCode').val().trim());
                param += (GetMailingAddressFeilds(str));
                if ($('#txtMUnitNo').val().trim().length != 0) {
                    param += "&MailingUnitNo=" + escape($('#txtUnitNo').val().trim());
                }
                // get only number from phone number
                var txtHomePhone = $('#txtHomePhone').val() != '' ? escape(parseInt($('#txtHomePhone').val().replace(/[^0-9\.]/g, ''), 10)) : escape($('#txtHomePhone').val());
                var txtBusinessPhone = $('#txtBusinessPhone').val() != '' ? escape(parseInt($('#txtBusinessPhone').val().replace(/[^0-9\.]/g, ''), 10)) : escape($('#txtBusinessPhone').val());
                str = txtHomePhone + '|' + txtBusinessPhone + '|' + escape($('#txtEmailAddress').val());
                param += (GetContactFeilds(str));
                break;

            case "31":
                param += "&MovingOutDate=" + escape($('#txtMODateofmoving').val());
                // get only number from phone number
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
                param += "&MovingOutDate=" + escape($('#txtTODateOfMoving').val().trim());
                str = escape($('#txtTStreetNo').val().trim()) + '|' + escape($('#txtTStreetName').val().trim()) + '|' + escape($('#txtTCity').val().trim()) + '|' + escape($('#txtTState').val().trim()) + '|' + escape($('#txtTZipCode').val().trim()) + '|' + escape($('#txtTDateOfMoving').val().trim());
                param += (GetAddressFeilds(str));
                //if ($('#txtTMod').val().trim().length != 0){  //Not Mandatory
                param += "&Mod=" + escape($('#txtTMod').val().trim()); 
                //}
                if ($('#txtTUnitNo').val().trim().length != 0)
                { param += "&UnitNo=" + escape($('#txtTUnitNo').val().trim()); }
                // get only number from phone number
                var txtTHomePhone = $('#txtTHomePhone').val() != '' ? parseInt($('#txtTHomePhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtTHomePhone').val();
                var txtTBusinessPhone = $('#txtTBusinessPhone').val() != '' ? parseInt($('#txtTBusinessPhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtTBusinessPhone').val();
                str = escape(txtTHomePhone) + '|' + escape($('#txtTBusinessPhone').val()) + '|' + escape($('#txtTEmailAddress').val());
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
                param += "&DateTime=" + escape($('#txtDate').val().trim()) + ' ' + $('#ddlHours').find(":selected").text() + ':' + $('#ddlMin').find(":selected").text() + $('#ddlAmpm').find(":selected").text();
                // get only number from phone number
                var txtContact = $('#txtContact').val() != '' ? parseInt($('#txtContact').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtContact').val();
                var txtAlternatePhone = $('#txtAlternatePhone').val() != '' ? parseInt($('#txtAlternatePhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtAlternatePhone').val();
                str = escape($('#txtDate').val().trim()) + '|' + escape($('#txtName').val().trim()) + '|' + escape(txtContact) + '|' + (($('#chk_Pets').attr('checked')) ? "1" : "0") + '|' + (($('#chk_Locked_gates').attr('checked')) ? "1" : "0") + '|' + escape(txtAlternatePhone);
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
    
   

    $('#BtnSumit').click(function (e) {

       






        try {
            e.preventDefault();
          
            loader.showloader();

            if (ValidateAllPageFieldsSingleMessage('DivSteps') && checkHtml('txt_Comments')) {
               
                

                //var ssnval = $('#TxtSclSecrityNo').val().replace(/-/g, '');
                //if (ssnval == "000000000") {
                //    $('#TxtSclSecrityNo').val("");
                //    error.showerror("#TxtSclSecrityNo", $('#TxtSclSecrityNo').attr("validatemessage"));                  
                //    loader.hideloader();
                //    return false;
                //}
                //else {
                //    if (ssnval.length < 9) {
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
                                    submitServiceRequest1();
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
                    else {
                        loader.hideloader();
                    }
                }
                else { src = ''; submitServiceRequest1(); }
            }
            else {
                loader.hideloader();
            }
        }
        catch (e) {
            console.log(e);
        }
    })
    function submitServiceRequest1() {
        var aaa = createParameters();
        aaa = aaa.replace('UtilityAccountNumber=', '');
        aaa = aaa.replace('name=', 'CustName=');
        if (src != '') {
            aaa+= "&AttachmentName=" + escape((src));
        }
        var parameter = { json: aaa };

        $.ajax({
            type: "POST",
            url: "Service-Request.aspx/SubmitForm",
            data: JSON.stringify(parameter),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess1,
            error: OnError1
        })
        //
    }
    function OnSuccess1(data, status) {
        try {
            if (data.d == null || data.d == undefined) {
                toastr.error($("#lblNotSent").text());
                loader.hideloader();

            }
            else {
                var res = JSON.parse(data.d);
                if (parseInt(res.Table[0].Status) > 0) {
                    //if (pay != "")
                    toastr.success(res.Table[0].Message);
                  

                }
                else {
                    toastr.error($("#lblNotSent").text());
                    return false;
                }
                resetForm();
                Reset();
                loader.hideloader();
                setTimeout(function () { location.reload(1); }, 6000);
            }
        } catch (e) {
            loader.hideloader();
         
        }
    }

    function OnError1(request, status, error) {
        toastr.error($("#lblNotSent").text());

        loader.hideloader();
    }
});

$(window).load(function () {
    try {

        $('#TxtDateOfBirth').val('');// clear text field on page load
        $('#txtDOB').val('');

        var lblchoosefile = $('#lblChooseFile').text();
        $('#lblFileupload')[0].firstChild.textContent = lblchoosefile;
        //document.getElementById("ddl_Reason")[0].textContent = $('#lblSelect').text();
        $('#btnRemoveFile').hide();
     
    }
    catch (ex) {
        console.log(ex.message);
    }

    $("select").each(function () {
        var s = this;
        for (i = 0; i < s.length; i++) {
            s.options[i].title = s.options[i].text;

        }
        if (s.selectedIndex > -1)
            s.onmousemove = function () {
                s.title = s.options[s.selectedIndex].text;
            };
    });

   
     
    

});

function refresh() {
    
    if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
        $("#devices").addClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
        $("#devices").addClass('inner_uni2');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
        $("#devices").addClass('inner_uni3');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
        $("#devices").addClass('inner_uni4');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
    }
    else {
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }

}

function Count(text, long) {
    var maxlength = new Number(long); // Change number to your max length.
    if (text.value.length > maxlength) {
        text.value = text.value.substring(0, maxlength);
    
        toastr.warning(" More than " + long + "Character not allowed");  //more than 100/1000 character not allowed
    }
}

function File_OnChange(e) {
    var filename = $(e).val().replace(/^.*[\\\/]/, '');
    if (filename != "") {
        $("#nofile").html(filename);
        $('#btnRemoveFile').show();
    }
}
function removeFile() {
    $('#flupload').val('');
    var control = $("#flupload");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    $("#nofile").html($('#nofile').attr('title'));
    return false;
}


function checkScheduleTime() {
    var $firstTime = new Date('1/1/1900 9:00:00 AM');
    var $secondTime = new Date('1/1/1900 5:00:00 PM');
    $dt = '1/1/1900' + ' ' + $("#ddlHours").val() + ":" + $("#ddlMin").val() + " " + $("#ddlAmpm").val();
    var startTimeObject = new Date();
    startTimeObject.setHours($("#ddlHours").val(), $("#ddlMin").val(), 0)
    $result = (new Date($dt) >= $firstTime) && ((new Date($dt)) <= $secondTime);
  
    if ($result != true) {
        error.showerror("#ddlAmpm", $('#IDTimeBand').text());
        $("#ddlHours").addClass('errorbox');
        $("#ddlMin").addClass('errorbox');
      
        return false;
    }
    else {
        $("#ddlHours").removeClass('errorbox');
        $("#ddlMin").removeClass('errorbox');
        $("#ddlAmpm").removeClass('errorbox');
        $("#ddlAmpm").w2tag('');
        return true;
    }
   
}

function chkPhone() {
    if (($('#txtContact').val().length < 14) || !($('#txtContact').val().lastIndexOf('-') == 9)) {
        toastr.warning("Please provide a 10 digit Primary Phone.");
        $('#txtContact').focus(); return false;
    }
    else {
        $('#hdnFlag').val('save');
        return true;
    }
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
        toastr.warning($('#IDWorkingDay').text());
        sender._selectedDate = d;
        sender._textbox.set_Value(sender._selectedDate.format(sender._format));
    }
    if (!checkforholiday(sender._selectedDate)) {
        toastr.warning($('#IDDateHoliday').text());
        sender._selectedDate = d;
        sender._textbox.set_Value(sender._selectedDate.format(sender._format));
        return false;
    }
}

////This function is used for Moving Date.
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
    if (sender._selectedDate < d) {
        toastr.warning($('#IDFutureDate').text());
        sender._selectedDate = d;
        sender._textbox.set_Value(sender._selectedDate.format(sender._format));
        return false;
    }
    if (!checkforholiday(sender._selectedDate)) {
        sender._selectedDate = d;
        sender._textbox.set_Value(sender._selectedDate.format(sender._format));
        toastr.warning($('#IDDateHoliday').text());
        return false;
    }
    var movein = $("#txtTODateOfMoving").val();
    var moveout = $("#txtTDateOfMoving").val();
    if (movein.trim() != '' && moveout.trim() != '') {
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
        }
        $('#txt' + varMailing + 'UnitNo').val($('#txt' + varAddress + 'UnitNo').val());

        if ($('#txt' + varAddress + 'StreetNo').val() != '') {
            $('#txt' + varMailing + 'StreetNo').removeClass('errorbox');
        }
        $('#txt' + varMailing + 'StreetNo').val($('#txt' + varAddress + 'StreetNo').val());

        if ($('#txt' + varAddress + 'StreetName').val() != '') {
            $('#txt' + varMailing + 'StreetName').removeClass('errorbox');
        }
        $('#txt' + varMailing + 'StreetName').val($('#txt' + varAddress + 'StreetName').val());

        if ($('#txt' + varAddress + 'City').val() != '') {
            $('#txt' + varMailing + 'City').removeClass('errorbox');
        }
        $('#txt' + varMailing + 'City').val($('#txt' + varAddress + 'City').val());

        if ($('#txt' + varAddress + 'State').val() != '') {
            $('#txt' + varMailing + 'State').removeClass('errorbox');
        }
        $('#txt' + varMailing + 'State').val($('#txt' + varAddress + 'State').val());

        if ($('#txt' + varAddress + 'ZipCode').val() != '') {
            $('#txt' + varMailing + 'ZipCode').removeClass('errorbox');
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
