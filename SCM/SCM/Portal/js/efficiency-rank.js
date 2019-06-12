var lowRange;
var highRange;
var range;
var jsonData;
var type;
var mode;

$(document).ready(function ($) {

    $('.active').removeClass('active');
    $('.icon_efficiency_rank').addClass('active');
    $('.efficency').addClass('active');

    changeactivelinkcolor();
    $('.icon_efficiency_rank').click(function (e) {
        e.preventDefault();
    });
    //Added by Abhilash Jha for Multilingual purpose
    var lastmonthrank = parseInt($('#hdnLastMonthRank').val());
    var currentmonthrank = parseInt($('#hdnCurrentRank').val());
    if (lastmonthrank > currentmonthrank) {
        $('#lblimprovement').attr('globalize', 'ML_EfficiencyRank_Lbl_ImproveRank');
    }
    else if (lastmonthrank < currentmonthrank) {
        $('#lblimprovement').attr('globalize', 'ML_EfficiencyRank_Lbl_DeproveRank');
    }
    else {
        $('#lblimprovement').attr('globalize', 'ML_EfficiencyRank_Lbl_ConstRank');
    }
  
});

function setname(index) {
    var name = '';
    if (index == 0) {
        name = $('#Efficient').text();
    }
    else if (index == 1) {
        name = $('#Yourself').text();
    }
    else if (index == 2) {
        name = $('#Inefficient').text();
    }
    return name;

}

var app = angular.module("EfficiencyApp", ["ngSanitize"]).controller("EfficiencyController", function ($scope) {


})