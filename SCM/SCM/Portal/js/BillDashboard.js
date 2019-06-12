



try {
    $(function () {
        $(".TableCellHeaderIcon img").hover(
            function () {
                var arr = $(this).attr('src').split('.');
                var temp = arr[0];

            },
            function () {

            });
    });
}
catch (e) {
    console.log(e.message);
}

try {
    $(document).ready(function () {
        $('.pay_now').off('click').on('click', function () {
            var aa = confirm($("#spnExternalRedirect").text());
            $(this).blur();
            return aa;
        });
        refresh();
        $(window).on('resize', refresh);
   
        if (document.getElementById("btnpaypower") != null)
            document.getElementById("btnpaypower").accessKey = "p";
       
        function disableBack() { window.history.forward() }

        window.onload = disableBack();
        window.onpageshow = function (evt) { if (evt.persisted) disableBack() }
   

        // not selector added to exclude change password popup textfields 
        $('input[type=text]:not(#change-pwd-divPopup,#BillQueryPopup input[type="text"])').on('keypress', function (e) {
            if (e.keyCode == 46) {
                if ($(this).val().indexOf('.') >= 0)
                { return false; }
            }
            else if ($(this).val().length == 8 && $(this).val().indexOf('.') < 0) {
                return false;
            }
        });
        // not selector added to exclude change password popup textfields 
        $('input[type=text]:not(#change-pwd-divPopup,#BillQueryPopup input[type="text"])').change(function (e) {
            if (parseFloat($(this).val()) >= 10000) {
                //alert('Amount should be less than 10000.');
                toastr.warning('Amount should be less than 10000.');
                $(this).val('');
                return false;
            }
            return true;
        });

        $('#BtnClose').click(function () {
            toastr.clear();
            Popup.hide('divPopup');
        });
        $('#btnCancel').click(function () {
            reset();
        });

        $('#BtnClosepower').click(function () {
            Popup.hide('divpopuppower');
        });

        $('#btnPaymentSubmit').click(function () {

            if (validatefields()) {
                Popup.hide('BillingPaymentDiv');
            }
            else {

            }
        });

        $('#btnpaypower').click(function () {

            var parameters = "&Water=" + $('#txtWater').val() + "&Electric=" + $('#txtElectric').val() + "&Solid=" + $('#txtSolid').val() + "&Gas=" + $('#txtGas').val();
               var passedString = common.GetEncryptedData(parameters).value;
                var url = "BillPayment.aspx?qs=1" + "&val=" + passedString;
                $('#txtWater').val('');
                $('#txtElectric').val('');
                $('#txtSolid').val('');
                $('#txtGas').val(''); //remove the value on submit               
                location.href = url;
        });

        $('#btnClose').click(function () {
            $('#txtWater').val('');
            $('#txtElectric').val('');
            $('#txtSolid').val('');
            Popup.hide('BillingPaymentDiv', 'btnPaymentSubmit');
        });
        $('#BillPopup').on('keypress', function (e) { //0005170: Enter button is not working on Enter Payable Amount Details popup
            if (e.which == 13) {
                $('#btnPaymentSubmit').click();
                return true;
            }
        });
        $('.icon_utility_bill').click(function (e) {
            e.preventDefault();
        });
    });
}
catch (e) {
    console.log(e.message);
}

try {

    function validateValues(amount) {
        if (amount.indexOf('.') > 0) {
            var arr = amount.split('.');
            if (arr.length > 2) {
                return false;
            }
            else if (parseInt(arr[0]) <= 0 && (parseInt(arr[1]) <= 0) || isNaN(parseInt(arr[1])))
                return false;
        }
        else if (amount.indexOf('.') == 0) {
            var arr = amount.split('.');
            if (arr.length > 2) {
                return false;
            }
            else if (arr[0] == "" && (parseInt(arr[1]) <= 0) || isNaN(parseInt(arr[1])))
                return false;
        }
        else {
            if (parseInt(amount) <= 0) {
                return false;
            }
        }
        return true;
    }

    function reset() {
        $('#txtWater').val('');
        $('#txtElectric').val('');
        $('#txtSolid').val('');
        $('#txtGas').val('');
        toastr.clear();
    }

    function validatefields() {

        if ($('#txtWater').val().trim().length == 0 && $('#txtElectric').val().trim().length == 0 && $('#txtSolid').val().trim().length == 0 && $('#txtGas').val().trim().length == 0) {
            $("<span id='errorMsg'></span>").insertBefore("#WaterDiv");
            $("#errorMsg").css('top', '-27px').css('right', '7%');
            $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);
            $('#errorMsg').html($('#EnterallInfo').text());

            if ($('#txtWater').val().trim().length == 0) {
                $('#txtWater').focus();
            }
            else if ($('#txtElectric').val().trim().length == 0) {
                $('#txtElectric').focus();
            }
            else if ($('#txtSolid').val().trim().length == 0) {
                $('#txtSolid').focus();
            }

            return false;
        }

        else if (!validateValues($('#txtWater').val()) || !validateValues($('#txtElectric').val()) || !validateValues($('#txtSolid').val()) || !validateValues($('#txtGas').val())) {
            if (!validateValues($('#txtWater').val())) {
                error.showerror("#txtWater", $('#EnterValidAmt').text());
                $('#txtWater').focus();
            }
            if (!validateValues($('#txtElectric').val())) {
                error.showerror("#txtElectric", $('#EnterValidAmt').text());
                $('#txtElectric').focus();
            }
            if (!validateValues($('#txtSolid').val())) {
                error.showerror("#txtSolid", $('#EnterValidAmt').text());
                $('#txtSolid').focus();
            }
            if (!validateValues($('#txtGas').val())) {
                error.showerror("#txtGas", $('#EnterValidAmt').text());
                $('#txtGas').focus();
            }
            return false;
        }

            //Added by Abhilash Jha to validate if user copy pastes anything but number to the text field
        else if (isNaN($('#txtWater').val()) || isNaN($('#txtElectric').val()) || isNaN($('#txtSolid').val()) || isNaN($('#txtGas').val())) {
            if (isNaN($('#txtWater').val())) {
                $('#txtWater').focus();
                error.showerror("#txtWater", $('#EnterValidAmt').text());
            }
            else if (isNaN($('#txtElectric').val())) {
                $('#txtElectric').focus();
                error.showerror("#txtElectric", $('#EnterValidAmt').text());
            }
            else if (isNaN($('#txtSolid').val())) {
                $('#txtSolid').focus();
                error.showerror("#txtSolid", $('#EnterValidAmt').text());
            }
            else if (isNaN($('#txtGas').val())) {
                $('#txtGas').focus();
                error.showerror("#txtGas", $('#EnterValidAmt').text());
            }
            return false;
        }
          
        else {
            var parameters = "&Water=" + $('#txtWater').val() + "&Electric=" + $('#txtElectric').val() + "&Solid=" + $('#txtSolid').val() + "&Gas=" + $('#txtGas').val();
         
            var authAmt = parseFloat($('#txtWater').val() == "" ? 0 : $('#txtWater').val()) + parseFloat($('#txtElectric').val() == "" ? 0 : $('#txtElectric').val()) + parseFloat($('#txtSolid').val() == "" ? 0 : $('#txtSolid').val()) + parseFloat($('#txtGas').val() == "" ? 0 : $('#txtGas').val());
            var maxBillAmt = parseFloat($('#hdndrMaxbilling').val());
            if (authAmt > maxBillAmt) {            
                toastr.warning($("#spnMaxPaymentAmtMsg").text() + ' $' + $('#hdndrMaxbilling').val());
                return false;
            }
            else {
                var passedString = common.GetEncryptedData(parameters).value;
                var url = "BillPayment.aspx?qs=1" + "&val=" + passedString;
                $('#txtWater').val('');
                $('#txtElectric').val('');
                $('#txtSolid').val('');
                $('#txtGas').val(''); //remove the value on submit
                Popup.hide('BillingPaymentDiv');
                location.href = url;
            }
        }
        return true;
    }
}
catch (e) {
    console.log(e.message);
}

function refresh() {
    try {
        
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
    catch (e) {
        console.log(e.message);
    }

}