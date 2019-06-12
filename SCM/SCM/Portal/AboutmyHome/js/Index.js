


var result = '';
$(document).ready(function () {
    loader.showloader();
    $('.active').removeClass('active');
    $('.icon_energy_audit').addClass('active');
    $('.efficency').addClass('active');

    BindData();

    $('.yrbld').keypress(function (event) {
        return isValidYear(event, this)
    });

   
    

    $('.loc').keypress(function (event) {
        return isOnlyDigit(event, this)
    });

    $(".ardfnd").keypress(function () {
        return isAmount(event, this)
    });

    $("#btnSubmitData").click(function () {

        loader.showloader();
        var result = '';
        if (ValidateAllPageFieldsSingleMessage('divAboutmyHome')) {
            var hometp = $('input[name=homeType]:checked').val();
            var NoOfResidents = $(".occuTp").val();
            var Floors = $(".floorsTp").val();
            var AreaDefined = $(".ardfnd").val();
            var YearBuilt = $(".yrbld").val();

            var parameter = 'HomeType=' + hometp;
            parameter += '&NoOfResidents=' + NoOfResidents;
            parameter += '&AreaDefined=' + AreaDefined;
            parameter += '&Floors=' + Floors;
            parameter += '&YearBuilt=' + YearBuilt;
            var status = Index.SaveData(parameter);
            if (status.value == "1") {
                window.location = "Sweep_1.aspx";
            }
            else {
                toastr.error('Error - Retry !!!!');

            }
        }
        loader.hideloader();
    });

});

function isOnlyDigit(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode < 48 || charCode > 57) {
        return false;
    } else {
        return true;
    }
}
function isValidYear(evt, element) {
    var date = new Date().getFullYear();
    var vl = $(element).val() + String.fromCharCode(evt.which);
    var charCode = (evt.which) ? evt.which : event.keyCode
    if (charCode < 48 || charCode > 57) {
        return false;
    } else {
        if (parseInt(vl) > date)
            return false
        return true;
    }
}
function isAmount(evt, element) {
    var charCode = (evt.which) ? evt.which : event.keyCode
    if ((charCode != 45 || $(element).val().indexOf('-') != -1) && (charCode != 46 || $(element).val().indexOf('.') != -1) && (charCode < 48 || charCode > 57)) {
      
        return false;
    } else {
        return true;
    }
}

function BindData() {
    var parameter = 'EnergyAuditOption=' + result;
    var status = Index.BindData();
    if (status.value != "") {
        var data = (status.value).split('ḕ');
        var arrData = data[0].split('§');
        $(".homeTp").append(data[1]);
        $(".floorsTp").append(data[2]);
        $(".occuTp").append(data[3]);

        if (arrData[0] != "") {
            //hometype
            $('input[name=homeType][value=' + arrData[0] + ']').prop('checked', 'checked');
        }
        if (arrData[3] != "") {
            //floorsTp
            $(".floorsTp").val(arrData[3]);
        }
        if (arrData[1] != "") {
            //occuTp
            $(".occuTp").val(arrData[1]);
        }
        if (arrData[2] != "") {
            //ardfnd
            $(".ardfnd").val(arrData[2]);
        }
        if (arrData[4] != "") {
            //yrbld
            $(".yrbld").val(arrData[4]);
        }
        if (arrData[5] != "") {
            //loc
            $(".loc").val(arrData[5]);
        }

        loader.hideloader();
    }
    else {
        toastr.error('Error - Retry !!!!');
     
    }
}

var app = angular.module("EfficiencyApp", ["ngSanitize"]).controller("EfficiencyController", function ($scope) {
})