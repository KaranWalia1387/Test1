


var result = '';
$(document).ready(function () {

    $('.active').removeClass('active');
    $('.icon_energy_audit').addClass('active');
    $('.efficency').addClass('active');
    $('.left_listing ul li a').click(function (e) {
        $('.left_listing ul li a').removeClass('actives');
        var $this = $(this);
        if (!$this.hasClass('actives')) {
            $this.addClass('actives');
        }
    });

    $('.home_list_section_single ul li a').each(function () {
        var item = $(this);
        if (item.find('span:eq(1)').text() != '') {
            item.addClass('active');
            item.closest('.mainDiv').find('.home_list_section_right a').addClass('active');
        }
    });

    $("ul").each(function () {
        var elem = $(this);
        if (elem.children().length == 0) {
            elem.remove();
        }
    });

    $('.home_list_section_single ul li a').click(function () {
        var item = $(this);
        item.closest('.home_list_section_single').find('ul li a').removeClass('active');
        item.closest('.home_list_section_single').find('ul li a').find('span:eq(1)').text('');
        if (!item.hasClass('active')) {
            item.addClass('active');
            item.find('span:eq(1)').text(1);
            item.closest('.mainDiv').find('.home_list_section_right a').addClass('active');
        }
    });

    $(".right_answ").click(function () {
        var item = $(this);
        item.removeClass('active');
        item.closest('.home_list_section_single').find('ul li a').find('span:eq(1)').text('');
        item.closest('.home_list_section_single').find('ul li a').removeClass('active');
    });

    $("#btnSubmitData").click(function () {
        loader.showloader();
        var result = '';
        $('.home_list_section_single ul li a').each(function () {
            var item = $(this);
            if (item.find('span:eq(1)').text() != '') {
                result += item.find('span:eq(0)').text() + ',';
            }
        });
        var parameter = 'EnergyAuditOption=' + result;
        var status = Heating_and_cooling.SaveData(parameter);
        if (status.value == "1") {
            window.location = "Appliances.aspx";
        }
        else {
            toastr.error('Error - Retry !!!!');
           // toastr.error('Error - Retry !!!!');
            window.location.reload();
        }
        loader.hideloader();
    });

});
var app = angular.module("EfficiencyApp", ["ngSanitize"]).controller("EfficiencyController", function ($scope) {


})