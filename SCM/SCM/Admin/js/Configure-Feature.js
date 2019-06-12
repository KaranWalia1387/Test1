var databindtogrid;
var autoheightbool = false;
var usertable;
var flag = 0;
var flag_efficiency = 0;

$(document).ready(function () {

    $('.sidebar_adduser').addClass('active');
    $('.sidebar_userreport').removeClass('active');
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

    })


    $('#121').click(function () {
        if ($(this).is(':checked')) {
            $('#91').prop('checked', false);
            $('#91').prop('disabled', true);
            $('#94').prop('checked', false);
            $('#94').prop('disabled', true);
            $('#95').prop('checked', false);
            $('#95').prop('disabled', true);
            $('#97').prop('checked', false);
            $('#97').prop('disabled', true);
        }
        else {
            $('#91').prop('disabled', false);
            $('#94').prop('disabled', false);
            $('#95').prop('disabled', false);
            $('#97').prop('disabled', false);
        }
    });

    $(".cs_level1").click(function () {
        if ($(this).is(":checked")) {
            $(".cs_level2").each(function () {
                $(this).prop('disabled', false);
            });
        }
        else {
            $(".cs_level2").each(function () {
                $(this).prop('checked', false);
                $(this).prop('disabled', true);
            });
        }
    });

    $(".sh_level2").click(function () {
        if (!$(this).is(":checked")) {
            $(".sh_level1").prop('checked', false);          
        }
    });

    $(".sol_level2").click(function () {
        if (!$(this).is(":checked")) {
            $(".sol_level1").prop('checked', false);
        }
    });

    //Not Required as Projected Usage can independently be hidden but usage will be shown
    //$(".usg_level2").click(function () {
    //    if (!$(this).is(":checked")) {
    //        $(".usg_level1").prop('checked', false);
    //    }
    //});

    $(".eff_level2").click(function () {
        if ($('.eff_level1').is(':checked')) {
            var arr = [31, 34, 110, 27];
            flag_efficiency = 0;
            for (var i = 0; i < arr.length ; i++) {
                if ($('#' + arr[i]).is(':checked') != true)
                { if (flag_efficiency != 1) flag_efficiency = 0; }
                else flag_efficiency = 1;
            }
            if (flag_efficiency == 0)
                alert('Please select atleast any one of these (Rebate, Program, SavingTips, EducationTips)');

        }
    });


});

function OnSuccessEdit(data, status) {
    var res = JSON.parse(data.d);
    alert('Configuration has been updated successfully');
    loader.hideloader();
}

function SaveFeatures(featureList) {
    try {
        loader.showloader();
        var param = { mode: 1, featureId: featureList };
        $.ajax({
            type: "POST",
            url: "Configure-feature.aspx/SaveFeatures",
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

//    if ($('.eff_level1').is(':checked')) {
//        var arr = [31, 34, 110, 27];
//        flag_efficiency = 0;
//        for (var i = 0; i < arr.length ; i++) {
//            if ($('#' + arr[i]).is(':checked') != true)
//            { if (flag_efficiency != 1) flag_efficiency = 0; }
//            else flag_efficiency = 1;
//        }
//        if (flag_efficiency == 0) {
//            alert('Please select atleast any one of these (Rebate, Program, SavingTips, EducationTips)');
//            return false;
//        }
//    }
//    if ($("#121").is(":checked")) {
//        $('#91').prop('checked', false);
//        $('#91').prop('disabled', true);
//        $('#94').prop('checked', false);
//        $('#94').prop('disabled', true);
//        $('#95').prop('checked', false);
//        $('#95').prop('disabled', true);
//        $('#97').prop('checked', false);
//        $('#97').prop('disabled', true);
//    }
//    else {
//        $('#91').prop('disabled', false);
//        $('#94').prop('disabled', false);
//        $('#95').prop('disabled', false);
//        $('#97').prop('disabled', false);
//    }
//    flag = 0;
//    //for power
//    var chk;

//    if ($(".watermeter").is(":checked")) {
//        flag = 1;
//        chk = validate('Wunit');
//        if (chk == false) {
//            alert('Please select atleast 1 Water Unit ');
//            return false;
//        }
//        chk = validate('Winterval');
//        if (chk == false) {
//            alert('Please select atleast 1 water Mode');
//            return false;
//        }
//    }

//    if ($(".gasmeter").is(":checked")) {
//        // For Gas
//        flag = 1;
//        chk = validate('Gunit');
//        if (chk == false) {
//            alert('Please select atleast 1 Gas Unit');
//            return false;
//        }
//        chk = validate('Ginterval');
//        if (chk == false) {
//            alert('Please select atleast 1 Gas Mode');
//            return false;
//        }
//    }
//    // For Water
//    if ($(".powermeter").is(":checked")) {
//        flag = 1;
//        chk = validate('punit');
//        if (chk == false) {
//            alert('Please select atleast 1 Power Mode');
//            return false;
//        }
//        chk = validate('pinterval');
//        if (chk == false) {
//            alert('Please select atleast 1 Power Mode');
//            return false;
//        }
//    }

//    if (flag == 0) {
//        alert('Please select atleast one Module');
//        return false;
//    }
//    if ($('.OutageParent').is(":checked") == true) {
//        if ($('.OutageType').is(":checked") == false) {
//            alert('Please select current or planned outage type.');
//            return false;
//        }
//    }
//    var ctrlList = $('input[type=checkbox]');
//    var ID = '';
//    for (var i = 0; i < ctrlList.length; i++) {
//        if (ctrlList[i].id != undefined && ctrlList[i].id != '' && ctrlList[i].checked == true)
//            ID += ctrlList[i].id;
//        ID += ',';
//    }
//    SaveFeatures(ID);
//});




function validate(classname) {
    var success = true;
    var flag = 0;
    $("input:checkbox[class=" + classname + "]").each(function () {
        if (this.checked == true) {
            flag = 1;
        }
    });
    if (flag == 0) success = false;
    return success;

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
    var res = JSON.parse(data.d);
    for (var i = 0; i < res.length; i++) {
        if (res[i].Status == true) {
            $('#' + res[i].FeatureId).attr('checked', 'checked');
        }
        else {
            $('#' + res[i].FeatureId).attr('checked', false);
        }
    }

    $('input[type=checkbox][isparent=true]').each(function () {
        var row2 = $($(this)[0]).parents('table').find('tr')[1];
        var row1 = $($(this)[0]).parents('table').find('tr')[0];

        if ($(row2).find("input[type=checkbox]:checked").length == $(row2).find("input[type=checkbox]").length) {
            if ($(row2).find("input[type=checkbox]").length > 0) {
                $($(row1).find('input[type=checkbox]')[0]).prop('checked', true);
            }
        }

    });

    if ($('#121').prop('checked') == true) {
        $('#91').prop('checked', false);
        $('#91').prop('disabled', true);
        $('#94').prop('checked', false);
        $('#94').prop('disabled', true);
        $('#95').prop('checked', false);
        $('#95').prop('disabled', true);
        $('#97').prop('checked', false);
        $('#97').prop('disabled', true);
    }
    else {
        $('#91').prop('disabled', false);
        $('#94').prop('disabled', false);
        $('#95').prop('disabled', false);
        $('#97').prop('disabled', false);
    }
    loader.hideloader();
}

function LoadData() {
    try {
        loader.showloader();
        var param = { mode: 1, featureId: '' };
        $.ajax({
            type: "POST",
            url: "Configure-feature.aspx/GetAllFeatures",
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

// $(document).on('click', '#btnSave', function () {
function SaveDetailsClick() {
    if ($('.eff_level1').is(':checked')) {
        var arr = [31, 34, 110, 27];
        flag_efficiency = 0;
        for (var i = 0; i < arr.length ; i++) {
            if ($('#' + arr[i]).is(':checked') != true)
            { if (flag_efficiency != 1) flag_efficiency = 0; }
            else flag_efficiency = 1;
        }
        if (flag_efficiency == 0) {
            alert('Please select atleast any one of these (Rebate, Program, SavingTips, EducationTips)');
            return false;
        }
    }
    if ($("#121").is(":checked")) {
        $('#91').prop('checked', false);
        $('#91').prop('disabled', true);
        $('#94').prop('checked', false);
        $('#94').prop('disabled', true);
        $('#95').prop('checked', false);
        $('#95').prop('disabled', true);
        $('#97').prop('checked', false);
        $('#97').prop('disabled', true);
    }
    else {
        $('#91').prop('disabled', false);
        $('#94').prop('disabled', false);
        $('#95').prop('disabled', false);
        $('#97').prop('disabled', false);
    }
    flag = 0;
    //for power
    var chk;

    if ($(".watermeter").is(":checked")) {
        flag = 1;
        chk = validate('Wunit');
        if (chk == false) {
            alert('Please select atleast 1 Water Unit ');
            return false;
        }
        chk = validate('Winterval');
        if (chk == false) {
            alert('Please select atleast 1 water Mode');
            return false;
        }
    }

    if ($(".gasmeter").is(":checked")) {
        // For Gas
        flag = 1;
        chk = validate('Gunit');
        if (chk == false) {
            alert('Please select atleast 1 Gas Unit');
            return false;
        }
        chk = validate('Ginterval');
        if (chk == false) {
            alert('Please select atleast 1 Gas Mode');
            return false;
        }
    }
    // For Water
    if ($(".powermeter").is(":checked")) {
        flag = 1;
        chk = validate('punit');
        if (chk == false) {
            alert('Please select atleast 1 Power Mode');
            return false;
        }
        chk = validate('pinterval');
        if (chk == false) {
            alert('Please select atleast 1 Power Mode');
            return false;
        }
    }

    if (flag == 0) {
        //alert('Please select atleast one Module');
        alert('Please select atleast one usage type (Power,Water,Gas)');
        return false;
    }
    if ($('.OutageParent').is(":checked") == true) {
        if ($('.OutageType').is(":checked") == false) {
            alert('Please select current or planned outage type.');
            return false;
        }
    }
    var ctrlList = $('input[type=checkbox]');
    var ID = '';
    for (var i = 0; i < ctrlList.length; i++) {
        if (ctrlList[i].id != undefined && ctrlList[i].id != '' && ctrlList[i].checked == true)
            ID += ctrlList[i].id;
        ID += ',';
    }
    SaveFeatures(ID);
}