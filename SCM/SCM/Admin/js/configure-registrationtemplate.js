var databindtogrid;
var autoheightbool = false;
var usertable;
var res;
var RegistrationTable = {};
var AccountMin, AccountMax, MeterIdMin, MeterIdMax, DLMin, DLMax, IntegerOnly;
var Meteridminval, Meteridmaxval, DLMinval, DLMaxval;
$(document).ready(function () {
    $('.sidebar_adduser').addClass('active');
    $('.sidebar_userreport').removeClass('active');
    //BindData();
    LoadData();

    $('input[type=checkbox]').click(function () {
        var row2 = $($(this)[0]).parents('table').find('tr')[1];
        var row1 = $($(this)[0]).parents('table').find('tr')[0];
        if ($(this).attr('isparent') == 'true') {
            if ($(row1).find('input[type=checkbox]:checked').length == 0) {
                $(row2).find("input[type=checkbox]").each(function () {
                    $(this).prop('checked', false);
                });
            }
            else if ($(row1).find('input[type=checkbox]:checked').length > 0) {
                $(row2).find("input[type=checkbox]").each(function () {
                    $(this).prop('checked', true);
                });
            }
        }
        else if ($(this).attr('isparent') == undefined) {
            if ($(row2).find("input[type=checkbox]:checked").length == $(row2).find("input[type=checkbox]").length) {
                $($(row1).find('input[type=checkbox]')[0]).prop('checked', true);
            }
            else if ($(row2).find("input[type=checkbox]:checked").length == 0 && $(row2).find("input[type=checkbox]").length > 1) {
                $($(row1).find('input[type=checkbox]')[0]).prop('checked', false);
            }
            else if ($(row2).find("input[type=checkbox]:checked").length > 0) {
                $($(row1).find('input[type=checkbox]')[0]).prop('checked', true);
            }
        }
        //else if ($(row2).find("input[type=checkbox]:checked").length == $(row2).find("input[type=checkbox]").length) {
        //    $($(row1).find('input[type=checkbox]')[0]).prop('checked', true);
        //}
        //else if ($(row1).find('input[type=checkbox]:checked').length > 0) {
        //    $(row2).find("input[type=checkbox]").each(function () {
        //        $(this).prop('checked', 'checked');
        //    });
        //}
        //else if ($(row1).find('input[type=checkbox]:checked').length == 0) {
        //    $(row2).find("input[type=checkbox]:checked").each(function () {
        //        $(this).prop('checked', false);
        //    });
        //}
    })

    $('#METER').click(function () {
        if (!$(this).is(':checked')) {
            $('#txtMeterIdMin').val("");
            $('#txtMeterIdMax').val("");
            $('#txtMeterIdMin').attr("disabled", "disabled");
            $('#txtMeterIdMax').attr("disabled", "disabled");
        }
        else {
            $('#txtMeterIdMin').val(Meteridminval);
            $('#txtMeterIdMax').val(Meteridmaxval);
            $("#txtMeterIdMin").removeAttr("disabled");
            $("#txtMeterIdMax").removeAttr("disabled");
        }
    });

    $('#DL').click(function () {
        if (!$(this).is(':checked')) {
            $('#txtDLMin').val("");
            $('#txtDLMax').val("");
            $('#txtDLMin').attr("disabled", "disabled");
            $('#txtDLMax').attr("disabled", "disabled");
        }
        else {
            $('#txtDLMin').val(DLMinval);
            $('#txtDLMax').val(DLMaxval);
            $("#txtDLMin").removeAttr("disabled");
            $("#txtDLMax").removeAttr("disabled");
        }
    });

    $("#txtAccountMax").blur(function () {
        if ($("#txtAccountMax").val() > 20) {
            alert('Maximum length for Account Number is 20.');
            $("#txtAccountMax").val('');
            $(this).focus();
            return false;
        }
    });
    $("#txtAccountMin").blur(function () {
        if ($("#txtAccountMin").val() < 1) {
            alert('Minimum length for Account Number is 1.');
            $("#txtAccountMin").val('');
            $(this).focus();
            return false;
        }
    });
    $("#txtMeterIdMax").blur(function () {
        if ($("#txtMeterIdMax").val() > 20) {
            alert('Maximum length for Meter Id is 20.');
            $("#txtMeterIdMax").val('');
            $(this).focus();
            return false;
        }
    });
    $("#txtMeterIdMin").blur(function () {
        if ($("#txtMeterIdMin").val() < 1) {
            alert('Minimum length for Meter Id is 1.');
            $("#txtMeterIdMin").val('');
            $(this).focus();
            return false;
        }
    });
    $("#txtDLMax").blur(function () {
        if ($("#txtDLMax").val() > 20) {
            alert('Maximum length for Driving License is 20.');
            $("#txtDLMax").val('');
            $(this).focus();
            return false;
        }
    });
    $("#txtDLMin").blur(function () {
        if ($("#txtDLMin").val() < 1) {
            alert('Minimum length for Driving License is 1.');
            $("#txtDLMin").val('');
            $(this).focus();
            return false;
        }
    });

});

function saveclick() {
    if ($('.nomandatory:checked').length == 0) {
        //alert('Please enter all the mandatory information');
        alert('Please select one more field to proceed further');//According to BRD Sheet
        return false;
    }
    else {
        var ctrlList = $('input[type=checkbox]');
        var ID = '';
        for (var i = 0; i < ctrlList.length; i++) {
            if (ctrlList[i].id != undefined && ctrlList[i].id != '' && ctrlList[i].checked == true)
                ID += ctrlList[i].id;
            ID += ',';
        }

        if ($('#txtAccountMin').val() == "" ||
        $('#txtAccountMax').val() == "") {
            alert("Please enter Min Length and Max Length for Account Number");
            return false;

        }
        if (parseInt($('#txtAccountMin').val()) >= parseInt($('#txtAccountMax').val())) {
            alert('Min Length for Account number should be less than Max Length');

            return false;
        }
        if ($('#METER').is(':checked')) {
            if ($("#txtMeterIdMin").val() == "" || ($("#txtMeterIdMax").val() == "")) {
                alert("Please enter Min Length and Max Length for Meter ID");
                return false;
            }
            else if (parseInt($('#txtMeterIdMin').val()) >= parseInt($('#txtMeterIdMax').val())) {
                alert('Min Length for Meter ID  should be less than Max Length');

                return false;
            }

            if ($("#txtMeterIdMax").val() > 20) {
                alert('Maximum length for Meter Id is 20.');
                $("#txtMeterIdMax").val('');
                return false;
            }
            if ($("#txtMeterIdMin").val() < 1) {
                alert('Minimum length for Meter Id is 1.');
                $("#txtMeterIdMin").val('');
                return false;
            }
        }
        if ($('#DL').is(':checked')) {
            if ($("#txtDLMin").val() == "" || ($("#txtDLMax").val() == "")) {
                alert("Please enter Min Length and Max Length for Driving License");
                return false;
            }
            else if (parseInt($('#txtDLMin').val()) >= parseInt($('#txtDLMax').val())) {
                alert('Min Length for Driving License  should be less than Max length');

                return false;
            }

            if ($("#txtDLMax").val() > 20) {
                alert('Maximum length for Driving License is 20.');
                $("#txtDLMax").val('');
                return false;
            }

            if ($("#txtDLMin").val() < 1) {
                alert('Minimum length for Driving License is 1.');
                $("#txtDLMin").val('');

                return false;
            }
        }
        if ($("#txtAccountMax").val() > 20) {
            alert('Maximum length for Account Number is 20.');
            $("#txtAccountMax").val('');
            return false;
        }
        if ($("#txtAccountMin").val() < 1) {
            alert('Minimum length for Account Number is 1.');
            $("#txtAccountMin").val('');
            return false;
        }
       

       

        SaveFeatures(ID);
        //if (checkMinMaxLength()) {
        //    SaveFeatures(ID);
        //}
    }
}
/*$(document).on('click', '#submit', function () {
    var rightList = $('[name="duallistbox_demo1[]"]').val();
    var status = $('#status').val();
    var features = usertable.Tables[0].Rows;
    var ID='';
    try {
        for (var i = 0; i < rightList.length; i++) {
            ID += rightList[i];
            ID += ',';
        }
        Configure_feature.EditAddFeature(1, ID);
        alert("Feature updated successfully");
    }
    catch (err) {
        alert("Some Error Occured");
    }
    $('.modal').modal('toggle');
    BindData();

    return false;
});*/
function OnSuccessEdit(data, status) {
    var res = JSON.parse(data.d);
    alert(' Your settings have been saved successfully');
    loader.hideloader();
}
function SaveFeatures(featureList) {

    AccountMin = $("#txtAccountMin").val();
    AccountMax = $("#txtAccountMax").val();
    MeterIdMin = $("#txtMeterIdMin").val();
    MeterIdMax = $("#txtMeterIdMax").val();
    DLMin = $("#txtDLMin").val();
    DLMax = $("#txtDLMax").val();
    if ($('#IntegerOnly').is(':checked') == true) {
        IntegerOnly = true;
    }
    else {
        IntegerOnly = false;
    }
    try {
        loader.showloader();
        var param = { mode: 1, featureId: featureList, AccountMin: AccountMin, AccountMax: AccountMax, MeterIdMin: MeterIdMin, MeterIdMax: MeterIdMax, DLMin: DLMin, DLMax: DLMax, AccountNumberIsNumeric: IntegerOnly };
        $.ajax({
            type: "POST",
            url: "configure-registrationtemplate.aspx/SaveFeatures",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessEdit,
            failure: function (response) {
                loader.hideloader();
                console.log(response.responseText);
            }
        });
    } catch (e) {
        loader.hideloader();
        console.log(e.message);
    }
}

//$(document).on('click', '#btnSave', function () {
//    if ($('.nomandatory:checked').length == 0) {
//        //alert('Please enter all the mandatory information');
//        alert('Please select one more field to proceed further');//According to BRD Sheet
//        return false;
//    }
//    else {
//        var ctrlList = $('input[type=checkbox]');
//        var ID = '';
//        for (var i = 0; i < ctrlList.length; i++) {
//            if (ctrlList[i].id != undefined && ctrlList[i].id != '' && ctrlList[i].checked == true)
//                ID += ctrlList[i].id;
//            ID += ',';
//        }

//        if ($('#txtAccountMin').val() == "" ||
//        $('#txtAccountMax').val() == "" ) {
//            alert("Please fill Min and Max Length of Account Number");
//            return false;

//        }
//        if (parseInt($('#txtAccountMin').val()) >= parseInt($('#txtAccountMax').val())) {
//            alert('Min Length for Account number should be less than Max Length');

//            return false;
//        }
//        if ($('#METER').is(':checked')) {
//            if($("#txtMeterIdMin").val() == "" ||($("#txtMeterIdMax").val() == ""))
//            {
//                alert("Please fill Min and Max Length of Meter ID");
//                return false;
//            }
//            else if (parseInt($('#txtMeterIdMin').val()) >= parseInt($('#txtMeterIdMax').val())) {
//                alert('Min Length for Meter ID  should be less than Max Length');

//                return false;
//            }
//        }
//        if ($('#DL').is(':checked')) {
//            if ($("#txtDLMin").val() == "" || ($("#txtDLMax").val() == "")) {
//                alert("Please fill Min and Max Length of Driving License");
//                return false;
//            }
//           else if (parseInt($('#txtDLMin').val()) >= parseInt($('#txtDLMax').val())) {
//                alert('Min Length for Driving License  should be Less than Max length');

//                return false;
//            }
//        }
//        SaveFeatures(ID);
//        //if (checkMinMaxLength()) {
//        //    SaveFeatures(ID);
//        //}
//    }
//});




//function BindData() {
//    usertable = Configure_feature.LoadGrid(1, '').value;
//    LoadPopUp(usertable);
//}


function ResetRegTemplate() {
    $('.nomandatory').attr('checked', false);
}
function LoadPopUp(value) {
    $('#featureHeaderDiv').html('');
    $('#featureHeaderDiv').html('Edit Feature');
    $('[name="duallistbox_demo1[]"]').html('');
    demo1.bootstrapDualListbox('refresh');
    var rightData = usertable.Tables[0].Rows;
    var allrights = usertable.Tables[1].Rows;
    var selectData = '';
    var unselectedData = '';
    var array = new Array();;
    for (var i = 0; i < rightData.length; i++) {
        selectData += '<option value=' + rightData[i].FeatureId + '>' + rightData[i].FeatureName + '</option>';
        array.push(rightData[i].FeatureName);
    }

    for (var i = 0; i < allrights.length; i++) {
        unselectedData += '<option value=' + allrights[i].FeatureId + '>' + allrights[i].FeatureName + '</option>';
    }
    for (var i = 0; i < rightData.length; i++) {
        unselectedData += '<option value=' + rightData[i].FeatureId + ' selected="selected">' + rightData[i].FeatureName + '</option>';
    }
    demo1.append(unselectedData);
    demo1.bootstrapDualListbox('refresh');
}

function OnSuccess(data, status) {
    res = JSON.parse(data.d);
    for (var i = 0; i < res.Table.length; i++) {
        if (res.Table[i].Status == true) {
            $('#' + res.Table[i].FieldCode).attr('checked', 'checked');
        }
        else {
            $('#' + res.Table[i].FieldCode).attr('checked', false);
        }
        ConvertData();
        Meteridminval = RegistrationTable.Tables[2].Rows[0]["MeterNumberMinLength"];
        Meteridmaxval = RegistrationTable.Tables[2].Rows[0]["MeterNumberMaxLength"];
        DLMinval = RegistrationTable.Tables[2].Rows[0]["DrivingLicenseMinLength"];
        DLMaxval = RegistrationTable.Tables[2].Rows[0]["DrivingLicenseMaxLength"];
        $('#txtAccountMin').val(RegistrationTable.Tables[2].Rows[0]["AccountNumberMinLength"]);
        $('#txtAccountMax').val(RegistrationTable.Tables[2].Rows[0]["AccountNumberMaxLength"]);
        $('#txtMeterIdMin').val(RegistrationTable.Tables[2].Rows[0]["MeterNumberMinLength"]);
        $('#txtMeterIdMax').val(RegistrationTable.Tables[2].Rows[0]["MeterNumberMaxLength"]);
        $('#txtDLMin').val(RegistrationTable.Tables[2].Rows[0]["DrivingLicenseMinLength"]);
        $('#txtDLMax').val(RegistrationTable.Tables[2].Rows[0]["DrivingLicenseMaxLength"]);

        if (RegistrationTable.Tables[2].Rows[0]["AccountNumberIsNumeric"] == '1') {
            $('#IntegerOnly').prop('checked', true);
        }
        else {
            $('#IntegerOnly').prop('checked', false);
        }
    }
    // var rightData = res.Tables[2].Rows;

    $('input[type=checkbox][isparent=true]').each(function () {
        var row2 = $($(this)[0]).parents('table').find('tr')[1];
        var row1 = $($(this)[0]).parents('table').find('tr')[0];

        if ($(row2).find("input[type=checkbox]:checked").length == $(row2).find("input[type=checkbox]").length) {
            if ($(row2).find("input[type=checkbox]").length > 0) {
                $($(row1).find('input[type=checkbox]')[0]).prop('checked', true);
            }
        }

    })
    loader.hideloader();
}
function ConvertData() {
    try {
        Tables = new Array();
        $.map(res, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        RegistrationTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}
function LoadData() {
    try {
        loader.showloader();
        var param = { mode: 1, featureId: '' };
        $.ajax({
            type: "POST",
            url: "configure-registrationtemplate.aspx/GetAllFeatures",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            failure: function (response) {
                loader.hideloader();
                console.log(response.responseText);
            }
        });
    } catch (e) {
        loader.hideloader();
        console.log(e.message);
    }
}
function ClearAll() {
    $('#ZIP').attr('Checked', false)
    $('#SSN').attr('Checked', false);
    $('#METER').attr('Checked', false);
    $('#STREET').attr('Checked', false);
    $('#DL').attr('Checked', false);
    $('#PHONE').attr('Checked', false);
}

function checkMinMaxLength() {

    if (parseInt($('#txtAccountMin').val()) >= parseInt($('#txtAccountMax').val())) {
        alert('Min length for Account number should be less than max length');

        return false;
    }
    if (parseInt($('#txtMeterIdMin').val()) >= parseInt($('#txtMeterIdMax').val())) {
        alert('Min length for Meter ID  should be less than max length');

        return false;
    }
    if (parseInt($('#txtDLMin').val()) >= parseInt($('#txtDLMax').val())) {
        alert('Min length for Driving License  should be less than max length');

        return false;
    }
    return true;
}