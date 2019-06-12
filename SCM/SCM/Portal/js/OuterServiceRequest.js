var index = 0;
var isLastStep = false;
var payStatus = 0;
var inner = 0;
$(document).ready(function () {
    try {
        // on page load
        //$('.div_Steps').hide();
        $('#Step1').show();
        $('.div_isanyadlt').hide();
        $('#BtnBack').hide();
        $('#li_stp5').show();
        $($('input[type="radio"][name="Served"]')[1]).prop("checked", true)



        //$('.breadcrumb_nav_main ul li').click(function () {
        //    $('.breadcrumb_nav_main ul li').removeClass('active');
        //    $(this).addClass('active');
        //   var i= $(this).index()
        //   $('.div_Steps').hide();
        //   i++;
        //    $('#Step' + i).show();


        //})




        $('input[type="radio"][name="Served"]').change(function () {
            if (this.checked && this.value == '1') {
                $('.div_AccntNo').show();
                $('#Step2').css('margin-bottom', '17px');
                $('#li_stp5').hide();
                $('#b_stp6').html("5");
                //$("#chk_billingAddress").prop("checked",true);

                //$('.div_step4 select').attr('readOnly', true);
                //$('.div_step4 input').attr('readOnly', true);

                $('.div_step4 select').prop('disabled', true);
                $('.div_step4 input').prop('disabled', true);
                
                AddMandatoryAttributeToElement($('#txtAccntNo'))

            }
            if (this.checked && this.value == '0') {
                $('.div_AccntNo').hide();
                $('#Step2').css('margin-bottom', '0px');
                $('#li_stp5').show();
                $('#b_stp6').html("6");
                // $("#chk_billingAddress").prop("checked", false);

                //$('.div_step4 select').attr('readonly', false);
                //$('.div_step4 input').attr('readonly', false);

                $('.div_step4 select').prop('disabled', false);
                $('.div_step4 input').prop('disabled', false);

                RemoveMandatoryAttributeFromElement($('#txtAccntNo'));

            }
        });

        $('#chk_billingAddress').change(function () {

            $('#txtStreetBillNo').removeClass('errorbox');
            $('#txtStreetName4').removeClass('errorbox');
            $('#ddl_addrType1').removeClass('errorbox');
            $('#TxtState4').removeClass('errorbox');
            $('#txtAptFlr4').removeClass('errorbox');
            $('#txtCity4').removeClass('errorbox');
            $('#txtZip4').removeClass('errorbox');
            $('.w2ui-tag').hide();
           // $('#txtZip4').hideerror();
            if (!$(this).prop("checked")) {

                //$('.div_step4 select').attr('readOnly', false).val('');
                //$('.div_step4 input').attr('readOnly', false).val('');

                $('.div_step4 select').prop('disabled', false).val('');
                $('.div_step4 input').prop('disabled', false).val('');
                

                //****************************************************
                $('#txtStreetBillNo').val('')
                $('#txtStreetName4').val('')
                $('#ddl_addrType1').val('')
                $('#TxtState4').val('')
                $('#txtAptFlr4').val('')
                $('#txtCity4').val('')
                $('#txtZip4').val('')

                //***************************************************
            }
            if ($(this).prop("checked")) {

                //$('.div_step4 select').attr('readOnly', true);
                //$('.div_step4 input').attr('readOnly', true);
                
                    $('.div_step4 select').prop('disabled', true).val('');
                    $('.div_step4 input').prop('disabled', true).val('');

                //$('#txtStreetBillNo').val($('#txtStreetNo3').val())
                //$('#txtStreetName4').val($('#txtStreetName3').val())
                //$('#ddl_addrType1').val($('#ddl_AddressType2').val())
                //$('#TxtState4').val($('#txtState').val())
                //$('#txtAptFlr4').val($('#txtAptFlr').val())
                //$('#txtCity4').val($('#txtCity3').val())
                //$('#txtZip4').val($('#txtZip3').val())

                if ($('#txtStreetNo3').val().length > 0)
                {
                    error.hideerror($('#txtStreetBillNo'));
                    $('#txtStreetBillNo').val($('#txtStreetNo3').val())
                }
                if ($('#txtStreetName3').val().length > 0)
                {
                    error.hideerror($('#txtStreetName4'));
                    $('#txtStreetName4').val($('#txtStreetName3').val())
                }
               
                if ($('#ddl_AddressType2').val()!='') {
                    error.hideerror($('#ddl_addrType1'));
                    $('#ddl_addrType1').val($('#ddl_AddressType2').val())
                }
                if ($('#txtState').val().length > 0) {
                    error.hideerror($('#TxtState4'));
                    $('#TxtState4').val($('#txtState').val())
                }

                if ($('#txtAptFlr').val().length > 0) {
                    error.hideerror($('#txtAptFlr4'));
                    $('#txtAptFlr4').val($('#txtAptFlr').val())
                }

                if ($('#txtCity3').val().length > 0) {
                    error.hideerror($('#txtCity4'));
                    $('#txtCity4').val($('#txtCity3').val())
                }
                if ($('#txtCity3').val().length > 0) {
                    error.hideerror($('#txtCity3'));
                    $('#txtZip4').val($('#txtZip3').val())
                }

            }
            $('#txtPOBox').attr('readonly', false);

        })

        $('input[type="radio"][name="rdo_typeAddr"]').change(function () {
            if (this.checked && this.value == '1') {

                $('.div_street').hide()
                $('.div_PO').show()
                $('.div_PO input').each(function (index,obj) {
                   
                        AddMandatoryAttributeToElement(this);
                    

                 
                })

                $('.div_street input').each(function () {
                    RemoveMandatoryAttributeFromElement(this)
                })
                $('.div_street select').each(function () {
                    RemoveMandatoryAttributeFromElement(this)
                })
            }
            if (this.checked && this.value == '0') {
                $('.div_street').show()
                $('.div_PO').hide()
                $('.div_street input').each(function (index, obj) {
                    if ($(obj).attr("id") != "txtAptFlr4") {
                        AddMandatoryAttributeToElement(this);
                    }
                   
                })
                $('.div_street select').each(function () {
                    AddMandatoryAttributeToElement(this)
                })

                $('.div_PO input').each(function () {
                    RemoveMandatoryAttributeFromElement(this)
                })

            }
        })

        $('#rdo_AdltLving').change(function () {
            if ($('#rdo_AdltLving :checked').val() == "1") {

                $('.div_isanyadlt').show();

                // AddMandatoryAttributeToElement($('#TxtFirstName1'))
                AddMandatoryAttributeToElement($('#TxtLastName1'))

            }
            else if ($('#rdo_AdltLving :checked').val() == "0") {
                $('.div_isanyadlt').hide();

                RemoveMandatoryAttributeFromElement($('#TxtFirstName1'));
                RemoveMandatoryAttributeFromElement($('#TxtLastName1'));


            }

        })

        $('input.IsMobile').on('change', function () {
            $('input.IsMobile').not(this).prop('checked', false);
        });



        $($('input[type="radio"][name="rdo_typeAddr"]')[0]).prop('checked', true).trigger("change")
        $($('input[type="radio"][name="rdo_mode"]')[0]).prop("checked", true)
        $('input[name="ServiceRequest$rdo_AdltLving"][value="0"]').prop('checked', true);
        $('#IsMobileNo1').prop("checked", true).trigger("change");

    }
    catch (e) {

    }

    //$('#btnSaveChanges1').click(function (e) {
    //    try {
    //        //if (inner == 1 && index == 4) {
    //        //    index++;
    //        //    payStatus = 1;
    //        //}
    //        //var r = false;
    //        //e.preventDefault();
    //        //if (index == 0) {
    //        //    index++;
    //        //}
    //        //index++;
    //        //var isExistingUser = $('input[type="radio"][name="Served"]:checked').val();
    //        //if (index == 2) {
    //        //    var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
    //        //    if (r == false) {
    //        //        index--;
    //        //        //toastr.error("Please enter all the mandatory info")
    //        //        return;
    //        //    }
    //        //}


    //        //if (index == 3) {
    //        //    var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
    //        //    if (r == false) {
    //        //        index--;
    //        //        // toastr.error("Please enter all the mandatory info")

    //        //        return;
    //        //    }
    //        //}

    //        //if (index == 4) {
    //        //    var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
    //        //    if (r == false) {
    //        //        index--;
    //        //        //  toastr.error("Please enter all the mandatory info")
    //        //        return;
    //        //    }
    //        //}


    //        //if (index == 5) {
    //        //    var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
    //        //    if (r == false) {
    //        //        index--;
    //        //        //toastr.error("Please enter all the mandatory info")

    //        //        return;
    //        //    }
    //        //}

    //        //if (index == 6 && isExistingUser == "0") {
    //        //    var r = ValidateAllPageFieldsSingleMessage('Step' + (index - 1));
    //        //    if (r == false) {
    //        //        index--;
    //        //        // toastr.error("Please enter all the mandatory info")
    //        //        return;
    //        //    }
    //        //}




    //        //if (isExistingUser == "1" && index == "5") {
    //        //    // an existing user
    //        //    index++;
    //        //    $('.div_Steps').hide();
    //        //    $('#Step' + (index)).show();

    //        //    $($('.breadcrumb_nav_main ul li')[index - 1]).addClass('completed');
    //        //    if (index == 5 || isExistingUser == "1") {

    //        //        $('#btnSaveChanges1').hide();
    //        //        $("#BtnSumit").show();
    //        //    }

    //        //}
    //        //else if (isExistingUser == "0" && index == "5" && payStatus == "0") {
    //        //    $('#btnSaveChanges1').hide();
    //        //    $('#Button1').show();

    //        //}
    //        //else if (isExistingUser == "0" && index == "6") {
    //        //    if (payStatus == "0") {
    //        //        index--;
    //        //        return;
    //        //    }
    //        //    else {
    //        //        $('.div_Steps').hide();
    //        //        $('#Step' + (index)).show();
    //        //        $($('.breadcrumb_nav_main ul li')[index - 1]).addClass('completed');
    //        //        $('#btnSaveChanges1').hide();
    //        //        $("#BtnSumit").show();

    //        //    }
    //        //    return;
    //        //}


    //        //// index changed hide/show continue button
    //        //if ((index == 6)) {
    //        //    $('#btnSaveChanges1').hide();
    //        //    $("#BtnSumit").show();

    //        //}
    //        //else {
    //        //    if (!(isExistingUser == "0" && index == "5")) {
    //        //        $('#btnSaveChanges1').show();
    //        //        $("#txtBankName").hide();
    //        //    }

    //        //}

    //        //$($('.breadcrumb_nav_main ul li')[index - 1]).addClass('completed')
    //        //if ((index) > 1) {

    //        //    $('#BtnBack').show();
    //        //}
    //        //else {
    //        //    $('#BtnBack').hide();

    //        //}

    //        //$('.div_Steps').hide();
    //        //$('#Step' + index).show();
    //    }
    //    catch (e) {
    //        console.log(e);
    //    }
    //})






});

function parseDMY(value) {
    var date = value.split("/");
    var d = parseInt(date[1], 10),
        m = parseInt(date[0], 10),
        y = parseInt(date[2], 10);
    return new Date(y, m - 1, d);
}

$(window).bind('mousewheel DOMMouseScroll', function (event) {
    $('.ui-autocomplete').hide();
});
$(window).scroll(function () {
    //alert('test message');
});

function createParameters() {
    try {
     var  param = "";
        //---contact info--
     param += "name=" + $('#txtFirstName').val() + $('#txtLastNameMovIn').val();
     if ($('#ddl_Reason').length > 0) {
         param += '&Reason=' + escape($('#ddl_Reason').find(":selected").text());
         param += "&ReasonId=" + $('#ddl_Reason').val();
       //  param += "&Subject=Move In";
     }
     else {
         param += 'Reason=Move In';
         param += "&ReasonId=30";
      //   param += "&Subject=Move In";
     }
     if ($('#txt_Comments').val().trim().length != 0)
     { param += "&MessageBody=" + escape($('#txt_Comments').val().trim()); }
     else
     { param += "&MessageBody=" + 'Message Not Given'; }

       //   param += "&Customername=" + $('#txtLastNameMovIn').val();
   //  param += "&newunitno=" + $('#txtTUnitNo').val();

         // param += "&DOB=" + $('#TxtDateOfBirth').val();
        //  param += "&UtilityAccountNumber=" + $('#txtAccountNo').val();
     if ($('#txtPrimaryPhone').val() != "")
         param += "&businessphone=" + parseInt($('#txtPrimaryPhone').val().replace(/[^0-9\.]/g, ''), 10);
        if ($('#txtAlternatNum').val() != "")
        param += "&HomePhone=" + parseInt($('#txtAlternatNum').val().replace(/[^0-9\.]/g, ''), 10);
        param += "&MovingInDate=" + $('#txtScheduleDate').val();
        param += "&DateOfBirth=" + $('#TxtDateOfBirth').val();
        param += "&FromEMail=" + $('#txtAltEmailId').val();
        param += "&SSNNumber=" + parseInt($('#TxtSclSecrityNo').val().replace(/[^0-9\.]/g, ''), 10).toString();
        param += "&IsMobileContactPhone=" + ($('#IsMobileNo1').prop('checked') ? $('#IsMobileNo1').val() : "0");
        param += "&IsMobileAlternatePhone=" + ($('#IsMobileNo2').prop('checked') ? $('#IsMobileNo2').val() : "0");
        param += "&IsShow=0";
        // any other adult living
        param += "&IsOtherAdults=" + $('#rdo_AdltLving :checked').val();
        param += "&MFirstName=" + $('#TxtFirstName1').val();
        param += "&MLastName=" + $('#TxtLastName1').val();
        if ($('#txtSSN').val()!="")
        param += "&MSSNNumber=" + parseInt($('#txtSSN').val().replace(/[^0-9\.]/g, ''), 10);
        param += "&MDateOfBirth=" + $('#txtDOB').val();
        param += "&MRelationship=" + escape($('#ddl_Relation').val());
        
        if (inner == 1) {
            param += "&IsPreLogin=0";
        }
        else {
            param += "&IsPreLogin=1";
            param += "&UtilityAccountNumber=" + $('#txtAccountNo').val();
        }
        param += "&IsAddressServed=" + $('input[type="radio"][name="Served"]:checked').val();
       

        //---Current Address----
        param += "&StreetNo=" + escape($('#txtStreetNo').val());
        param += "&StreetName=" + $('#txtStreetName').val();
        param += "&UnitNo=" + $('#TxtFlrType').val();
        param += "&City=" + $('#txtCity').val();
        //param += "&State=" + $('#txtState2').val();
        param += "&ZipCode=" + $('#txtZip').val();
        param += "&AddressType=" + $('#ddl_AddresType').val();
        
        //----New Address---
        param += "&newstreetno=" + escape($('#txtStreetNo3').val());
        param += "&NewStreetName=" + $('#txtStreetName3').val();
        param += "&NewUnitNo=" + $('#txtAptFlr').val();
        param += "&NewCity=" + $('#txtCity3').val();
        //param += "&NewState=" + $('#txtState').val();
        param += "&NewZipCode=" + $('#txtZip3').val();
        param += "&OwnOrRent=" + $('input[type="radio"][name="rdo_mode"]:checked').val();
        param += "&NewAddressType=" + $('#ddl_AddressType2').val();

        //---Billing Address---
        if($('input[type="radio"][name="rdo_typeAddr"]:checked').val()=="0"){

            param += "&MailingStreetNo=" + escape($('#txtStreetBillNo').val());
            param += "&MailingStreetName=" + $('#txtStreetName4').val();
            param += "&MailingAddressType=" + $('#ddl_addrType1').val();
            param += "&MailingUnitNo=" + $('#txtAptFlr4').val();

        }
        else if($('input[type="radio"][name="rdo_typeAddr"]:checked').val()=="1"){
            param += "&MailingStreetNo=" + escape($('#txtPOBox').val());
        }
        
        param += "&MailingCity=" + $('#txtCity4').val();
        //param += "&MailingState=" + $('#TxtState4').val();
        param += "&MailingZipCode=" + $('#txtZip4').val();
        param += "&IsPOBox=" + $('input[type="radio"][name="rdo_typeAddr"]:checked').val();
        
        //-- fields for rdlc report
        param += "&firstName=" + $('#txtFirstName').val();
        param += "&lastName=" + $('#txtLastNameMovIn').val();

        param += "&MRelationshipText=" + escape($('#ddl_Relation option:selected').val());

        param += "&AddressTypeText=" + escape($('#ddl_AddresType option:selected').text());
        param += "&State=" + $('#txtState2 option:selected').text();

        param += "&NewAddressTypeText=" + escape($('#ddl_AddressType2 option:selected').text());
        param += "&NewState=" + $('#txtState option:selected').text(); 

        param += "&MailingState=" + $('#TxtState4 option:selected').text();
        param += "&MailingAddressTypeText=" + escape($('#ddl_addrType1 option:selected').text());


        //--Meter Access----
        
        return param;
        
    }
    catch (e) {

    }
}

function AddMandatoryAttributeToElement(elemet) {
    var attr = $(elemet).attr('mandatory');
    // For some browsers, 'attr' is undefined; for others,'attr' is false.  Check for both.
    if (typeof attr == typeof undefined || attr == false) {
        var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>';
        $(elemet).attr('mandatory', '1');
        $(elemet).after(mandatoryHtml);
    }
}

function RemoveMandatoryAttributeFromElement(elemet) {
    $(elemet).removeAttr('mandatory');
    $(elemet).next('span').remove();
}



//This function is used for Schedule Date.
function checkForPreviousDate(sender, args) {
    
    DT = $('#hdnMoveDate').val().split("-");
    var d = new Date(DT[0], DT[2], DT[1]);

    if (sender._selectedDate.getTimezoneOffset() > 350) {
        if (sender._selectedDate.getDay() == 5 || sender._selectedDate.getDay() == 6) {
            toastr.warning($('#IDWeekday').text())
            sender._selectedDate = d;
            sender._textbox.set_Value(sender._selectedDate.format(sender._format));
            $('#txtScheduleDate').val('');
            return false;
        }

    }
    else if (sender._selectedDate.getDay() == 6 || sender._selectedDate.getDay() == 0) {
        {
            toastr.warning($('#IDWeekday').text())
            sender._selectedDate = d;
            sender._textbox.set_Value(sender._selectedDate.format(sender._format));
            $('#txtScheduleDate').val('');
            return false;

        }
    }
  
    if (sender._selectedDate < d) {
        //toastr.warning($('#IDWorkingDay').text())
        toastr.warning($('#IDWorkingDay').text())
        // w2alert($('#IDWorkingDay').text());
        sender._selectedDate = d;
        sender._textbox.set_Value(sender._selectedDate.format(sender._format));
    }
    if (!checkforholiday(sender._selectedDate)) {
        //toastr.warning($('#IDDateHoliday').text())
        toastr.warning($('#IDDateHoliday').text())
        // w2alert($('#IDDateHoliday').text());
        sender._selectedDate = d;
        sender._textbox.set_Value(sender._selectedDate.format(sender._format));
        $('#txtScheduleDate').val('');
        return false;
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
}

function resetStep() {
    try{
      //  $('.div_Steps').hide();
        $('#Step1').show();
        $('.div_isanyadlt').hide();
        $('#BtnBack').hide();
        $('#li_stp5').show();
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
        $('.div_step4 select').attr('readonly', false).val('');
        $('.div_step4 input').attr('readonly', false).val('');
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
