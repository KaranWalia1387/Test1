$(document).ready(function () {

    $('.OptionCont label').click(function (e) {
        $(this).children(".billingchkbox").prop('checked',!($('.billingchkbox').prop('checked')));
    })

    $('.billingchkbox').click(function (event) {
        event.stopPropagation();
       })
    $('.btnSaveSetting').click(function () {
        try {
            var label, chkbox, ischk;
            var s = validatefield();
            var s1 = validateBillingChecked();
            if (!s || !s1) {
                return false;
            }
            var str = '<Update>';
            label = $('.divPowerBilling .BillingOptiontxtbox');
            chkbox = $('.divPowerBilling input[type=checkbox]');
            for (var i = 0; i < $(label).length; i++) {
                ischk = (chkbox[i].checked) ? '1' : '0';
                str += '<Module>';
                str += '<Section>Power Bill</Section>';
                str += '<Label>' + label[i].innerHTML + '</Label>';
                str += '<IsActive>' + ischk + '</IsActive>';
                str += '</Module>';
            }
            label = $('.divWaterBill .BillingOptiontxtbox');
            chkbox = $('.divWaterBill input[type=checkbox]');
            for (var i = 0; i < $(label).length; i++) {
                ischk = (chkbox[i].checked) ? '1' : '0';
                str += '<Module>';
                str += '<Section>Water Bill</Section>';
                str += '<Label>' + label[i].innerHTML + '</Label>';
                str += '<IsActive>' + ischk + '</IsActive>';
                str += '</Module>';
            }
            label = $('.divGasBill .BillingOptiontxtbox');
            chkbox = $('.divGasBill input[type=checkbox]');
            for (var i = 0; i < $(label).length; i++) {
                ischk = (chkbox[i].checked) ? '1' : '0';
                str += '<Module>';
                str += '<Section>Gas Bill</Section>';
                str += '<Label>' + label[i].innerHTML + '</Label>';
                str += '<IsActive>' + ischk + '</IsActive>';
                str += '</Module>';
            }
            label = $('.divSolidWasteBill .BillingOptiontxtbox');
            chkbox = $('.divSolidWasteBill input[type=checkbox]');
            for (var i = 0; i < $(label).length; i++) {
                ischk = (chkbox[i].checked) ? '1' : '0';
                str += '<Module>';
                str += '<Section>Solid Waste Bill</Section>';
                str += '<Label>' + label[i].innerHTML + '</Label>';
                str += '<IsActive>' + ischk + '</IsActive>';
                str += '</Module>';
            }

            ischk = $('#chkDisputeMyBill').is(":checked") ? '1' : '0';
            str += '<Module>';
            str += '<Section>Dispute My Bill</Section>';
            str += '<Label>Dispute My Bill</Label>';
            str += '<IsActive>' + ischk + '</IsActive>';
            str += '</Module>';

            ischk = $('#chkBudgetMyBill').is(":checked") ? '1' : '0';
            str += '<Module>';
            str += '<Section>Budget My Bill</Section>';
            str += '<Label>Budget My Bill</Label>';
            str += '<IsActive>' + ischk + '</IsActive>';
            str += '</Module>';

            str += '</Update>';
            var ConfigSettingxml = '<ConfigSettings>';
            ConfigSettingxml += '<ConfigSetting>';
            ConfigSettingxml += '<ConfigType>Processing Fee</ConfigType>';
            ConfigSettingxml += '<ConfigValue>'+($('#chkProcessingFee').prop('checked')? $("#txtProcessingFee").val():"")+'</ConfigValue>';
            ConfigSettingxml += '<IsActive>1</IsActive>';
            ConfigSettingxml += '</ConfigSetting>';

            ConfigSettingxml += '<ConfigSetting>';
            ConfigSettingxml += '<ConfigType>Maximum Payment Amount</ConfigType>';
            ConfigSettingxml += '<ConfigValue>' + $("#txtMaxPaymentAmount").val() + '</ConfigValue>';
            ConfigSettingxml += '<IsActive>1</IsActive>';
            ConfigSettingxml += '</ConfigSetting>';

            ConfigSettingxml += '<ConfigSetting>';
            ConfigSettingxml += '<ConfigType>Payment Deferred Days</ConfigType>';
            ConfigSettingxml += '<ConfigValue>' + $("#txtPaymentDeferralDays").val() + '</ConfigValue>';
            ConfigSettingxml += '<IsActive>1</IsActive>';
            ConfigSettingxml += '</ConfigSetting>';
            ConfigSettingxml += '</ConfigSettings>';
            var result = configure_billing.SaveData(str, ConfigSettingxml).value;
            if (result == '1')
                alert('Billing information has been saved successfully.')
            else
                alert('Billing not saved.');
        }
        catch (e) { }
    });

    $('#PwrBillingChk').change(function () {
        if (!$(this).is(":checked")) {
            $('.divPowerBilling input[type=checkbox]').removeAttr('checked');
        }
        else {
            $('.divPowerBilling input[type=checkbox]').prop('checked', 'checked');

        }
    });
    $('#WtrBillChk').change(function () {
        if (!$(this).is(":checked")) {
            $('.divWaterBill input[type=checkbox]').removeAttr('checked');
        }
        else {
            $('.divWaterBill input[type=checkbox]').prop('checked', 'checked');
        }
    });
    $('#SolidBillChk').change(function () {

        if (!$(this).is(":checked")) {
            $('.divSolidWasteBill input[type=checkbox]').removeAttr('checked');
        }
        else {
            $('.divSolidWasteBill input[type=checkbox]').prop('checked', 'checked');
        }
    });
    $('#chkGasBill').change(function () {
        if (!$(this).is(":checked")) {
            $('.divGasBill input[type=checkbox]').removeAttr('checked');
        }
        else {
            $('.divGasBill input[type=checkbox]').prop('checked', 'checked');
        }
    });
   
});

function validatefield() {
    if ($('#txtMaxPaymentAmount').val() == '') {
        alert('Please enter Maximum Payment Amount ');
        $('#txtMaxPaymentAmount').focus();
        return false;
    }
    else if ($('#chkProcessingFee').prop('checked') && $('#txtProcessingFee').val() == '') {
        alert('Please enter Manage Payment Processing Fee ');
        $('#txtProcessingFee').focus();
        return false;
    }
    else if ($('#txtPaymentDeferralDays').val() == '') {
        alert('Please enter Payment Deferral Days');
        $('#txtPaymentDeferralDays').focus();
        return false;
    }// #13215
    else if (parseInt($('#txtPaymentDeferralDays').val()) >= 30 || parseInt($('#txtPaymentDeferralDays').val()) <= 0) {
        alert('Please enter Payment Deferral Days between 1 and 30');
        $('#txtPaymentDeferralDays').focus();
        $('#txtPaymentDeferralDays').val('');
        return false;
    }
    else {
        return true;
    }
}

function validateBillingChecked() {
    var isPwrBillingChecked = $('#PwrBillingChk').prop('checked'); // $('#PwrBillingChk').attr('checked') ? true : false;
    var ischkGasBillChecked = $('#chkGasBill').prop('checked'); // var ischkGasBillChecked = $('.GasBillChk input[type=checkbox]').prop('checked');
    var isSolidBillChkChecked = $('#SolidBillChk').prop('checked');
    var isWtrBillChkChecked = $('#WtrBillChk').prop('checked');
    if (isPwrBillingChecked || ischkGasBillChecked || isSolidBillChkChecked || isWtrBillChkChecked) {
        return true;
    }
    else {
        alert('Please select at least one checkbox');
        return false;
    }
}