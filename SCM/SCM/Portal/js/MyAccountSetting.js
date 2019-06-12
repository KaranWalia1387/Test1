var strWindowFeatures = "titlebar=no,toolbar=no,location=no,status=no,menubar=no,scrollbars=no,resizable=yes, width=1000,height=auto,top=50, left=200, bottom=50, url=no";

function DashboardCustom() {
}

function Dashboard(id) {

    $(id).target = "_blank";
    window.open($(id).prop('href'));
    return false;
}

//start bug 9042 by Altaf
function DashboardCustom(id) {
    $(id).target = "_blank";
    window.open($(id).prop('href'));
    return false;
}

function DashboardCustom3_3(id) {
    $(id).target = "_blank";
    window.open($(id).prop('href'));
    return false;
}

//Added to restrict page load and allow css change.  
function loadcssfile() {
    try {
        var filename = ($('#ddlLanguage').val() == "EN" && (("<%#CustomerPortal.SessionAccessor.CustomerType%>") != "Commercial")) ? "css/navigation.css" : "css/navigation-spanish.css";
        var filenameStyle = ($('#ddlLanguage').val() == "EN" && (("<%#CustomerPortal.SessionAccessor.CustomerType%>") != "Commercial")) ? "css/style.css" : "css/style-spanish.css";
        $("#navigationcss").attr("href", filename);
        $("#stylecss").attr("href", filenameStyle);
    } catch (e) {
        console.log("ex in loadcssfile");
    }
}

function validatePreferences() {
    var flag = true;
    $('input[type=text][mandatory=1]').each(function () {
        if ($(this).val().trim() == '') {
            flag = false;
            $(this).addClass('errorbox');
        }
    })
    return flag;
}

$(window).load(function () {
    changeddltospanish();
});

$(document).ready(function () {
    try {
        $(".confi_flat_icon")
            .click(function () {

                $("#chkTerm").prop('checked', false);
            });

        refresh();
        $(window).on('resize', refresh);


        //========= On Load title as text in textBox ========
        $(".txtDiv input[type=text].txt").each(function () {
            $(this).prop('title', $(this).val());
        });
        $(".divEmail input[type=text].email").each(function () {
            $(this).prop('title', $(this).val());
        });
        $(".divIVR input[type=text].ivr").each(function () {
            $(this).prop('title', $(this).val());
        });
        //========= On Load title as text in textBox ========

        //========= On Change title as text in textBox ========
        $(".txtDiv input[type=text].txt").on('change', function () {
            $(this).prop('title', $(this).val());
        });
        $(".divEmail input[type=text].email").on('change', function () {
            $(this).prop('title', $(this).val());
        });
        $(".divIVR input[type=text].ivr").on('change', function () {
            $(this).prop('title', $(this).val());
        });
        //========= On Change title as text in textBox ========

        if ($('#hdnScmExpress').val() == "1") {
            $('.txtDiv').css('display', 'none');
            $('.txtDiv').hide();
            $('.divIVR').css('display', 'none');
            $('.divIVR').hide();
        }

        $(".submit-button").click(function () {
            if ((new Date('01/01/2001 ' + $("#txtFrom").val())) > (new Date('01/01/2001 ' + $("#txtTo").val()))) {
                toastr.warning('From Time Can not be greater than To Time');
                return false;
            }

        });

        $(".AccountSettingData input,textarea").keydown(function (e) {
            var keycode = e.keyCode;
            if (keycode >= 37 && keycode <= 40) {
                return true;
            } else {
                return false;
            }
        });

        function parametersforAccSettings() {

            var param = '';
            var flag = 0;
            //var checkedItems = $(".electric_vehicle_box input[type=checkbox]:checked");
            //if (checkedItems.length > 0) {
            //    var cars = new Array(checkedItems.length);
            //    for (i = 0; i < checkedItems.length; i++) {
            //        cars[i] = checkedItems[i].value;
            //    }
            //    param += "CarId=" + cars.join(',');
            //    flag = 1;
            //}


            //if ($('#ddlusage').val() != undefined) {
            //    if (flag == 0) {
            //        param += "UsageConfig=" + $('#ddlusage').val();
            //    }
            //    else {
            //        param += "&UsageConfig=" + $('#ddlusage').val();
            //    }
            //}

            //*************************************************
            var paprleessbill = '';
            if ($("#EbillBtn").prop('checked') == true) {
                paprleessbill = 1;
            }
            else { paprleessbill = 0; }
            //*************************************************
            param += "&PaymentConfig=" + $('#ddlPayment').val();
            param += "&BudgetFiftyNotify=" + (($('#chkbudget50').prop('checked')) ? "1" : "0");
            param += "&BudgetSeventyFiveNotify=" + (($('#chkbudget75').prop('checked')) ? "1" : "0");
            param += "&BudgetNinetyNotify=" + (($('#chkbudget90').prop('checked')) ? "1" : "0");
            // Healdsburg related change..
            //param += "&BudgetOtherNotify=" + (($('#txtAmount').val().trim().length != 0) ? $('#txtAmount').val() : "0.00");
            param += "&LanguageCode=" + ($('#ddlLanguage').val());
            //param += "&Paperless=" + ($('#EbillBtn input[type=radio]:checked').val());
            param += "&Paperless=" + paprleessbill;
            param += "&HoursFrom=" + ($('#ddlFrmHours').val() + ':' + $('#ddlFrmMin').val() + ' ' + $('#ddlFrmAmpm').val());
            param += "&HoursTo=" + ($('#ddlToHours').val() + ':' + $('#ddlToMin').val() + ' ' + $('#ddlToAmpm').val());
            param += "&DashboardOption=" + ($('#rd_DashboardOption input[type=radio]:checked').val());
            param += "&IsQuietHours=" + ($('#chkEnablequitehours').prop('checked') ? true : false);
            //  param += "&AlwaysShowAboutMyHome=" + ($('#chkEnablequitehours').prop('checked') ? true : false);            
            if ($('#chkHCF').length > 0) param += "&IsShowHCF=" + ($('#chkHCF').prop('checked') ? true : false);
            if ($('#chkGallon').length > 0) param += "&IsShowGallon=" + ($('#chkGallon').prop('checked') ? true : false);
            return param;
        }

        $('#btnSave').click(function () {
            if (ValidateAllPageFieldsSingleMessage('NotificationData,TimeZone')) {
                loader.showloader();
                var v = true;
                $('div[class= profile-details]').find('input[type=checkbox]').each(function () {
                    if ($(this).attr('checked')) {
                        var c = $(this).attr('id');
                        if (!c.indexOf("Push") > 0) {
                            $(this).parent().next().removeAttr('style');
                            if ($(this).parent().next().val().length == 0) {
                                $(this).parent().next().css('border', '1px solid red');
                                v = false;
                            }
                        }
                    }
                });
                if (v == false) {
                    loader.hideloader();
                    return false;
                }
                //
                $('#btnSave').attr('enable', false)
                if ($('#chkEnablequitehours').prop('checked')) {
                    if (($('#ddlFrmHours').val() == $('#ddlToHours').val()) && ($('#ddlFrmMin').val() == $('#ddlToMin').val()) && ($('#ddlFrmAmpm').val() == $('#ddlToAmpm').val())) {
                        loader.hideloader();
                        toastr.warning($('#QuietHours').text())
                        return false;
                    }
                }

                //SaveDataAsync Method Call Start
                if ($('#rd_DashboardOption input[type=radio]:checked').val() == undefined) {
                    toastr.warning('Please select home option.');
                    loader.hideloader();
                    return false;
                }
                if ($('#txtAmount').val() > 100) {
                    toastr.warning($('#BudgetLimitVal').text());
                    $('#txtAmount').val('');
                    loader.hideloader();
                    return false;
                }

                var param = {
                    json: parametersforAccSettings(),
                    DashboardOption: ($('#rd_DashboardOption input[type=radio]:checked').val()),
                    language: ($('#ddlLanguage').val()),
                    xml: xml(),
                    IsHCF: $('#chkHCF').prop('checked') ? "True" : "False",
                    IsGal: $('#chkGallon').prop('checked') ? "True" : "False",
                    TimeZoneId: $('#ddlTimeZone').val().split('_')[0],
                    ClientTimeZone: $('#ddlTimeZone').val().split('_')[1],
                    IsDefaultPayment: $('#ddlPayment').val()
                };
                $.ajax({
                    type: "POST",
                    url: "Settings.aspx/SaveDataAsync",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });

                function OnSuccess(data, status) {
                    loader.hideloader();
                    toastr.clear();
                    var v = JSON.parse(data.d);
                    if (parseInt(v.Table[0].Status) > 0) {
                        w2utils.locale('js/w2ui/locale/' + $('#ddlLanguage').val() + '.js');
                        try {
                            TranslateMultiLingualControls();
                            changeddltospanish();
                        }
                        catch (ex)
                        { }
                        toastr.success(v.Table[0].Message);
                        // w2alert(v.Table[0].Message);
                        $('.w2ui-popup-btn').focus();
                        if ($("#Hdn_LanguageDropdown").val() != $("#Hdn_LanguageDropdown_onload").val() && $("#Hdn_LanguageDropdown").val() != '') {

                            //**************************************
                            var user = "";
                            var LanguageName = "";

                            //alert("Welcome again " + user);
                            user = $("#ddlLanguage option:selected").val(); //getSelectedValue("sample");
                            LanguageName = getSelectedValue_languageName();//$("#ddlLanguage option:selected").text();
                            if (user != "" && user != null && LanguageName != "" && LanguageName != null) {
                                setCookie("Language_code", user, 7);
                                setCookie("Language_Name", LanguageName, 7);
                            }


                            //**************************************
                            location.reload(true);

                        }
                        //loadcssfile();    //Added to restrict page load and allow css change.             

                        $('.dashboard_home').children().attr('href', $($('#rd_DashboardOption input[type=radio]:checked').next().html()).filter('a').attr('href'));
                        $('.logo_large').children().attr('href', $($('#rd_DashboardOption input[type=radio]:checked').next().html()).filter('a').attr('href'));

                    }
                    else {
                        toastr.error(v.Table[0].Message);
                    }
                }
                function OnError(request, status, error) {
                    loader.hideloader();
                    toastr.error(request.statusText)
                }
            }
            else {
                return false;
            }
        });
        $('#btnPaymentType').click(function () {
            if ($("#chkTerm").prop("checked") == true) {
                loader.showloader();
                var param = {
                    IsDefaultPayment: $('#ddlPayment').val()
                };
                $.ajax({
                    type: "POST",
                    url: "Settings.aspx/SavePaymentMode",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });

                function OnSuccess(data, status) {
                    loader.hideloader();
                    toastr.clear();
                    var v = JSON.parse(data.d);
                    if (parseInt(v.Table[0].Status) > 0) {
                        if ($('#ddlPayment option:selected').val() == "0") {
                            // $('#module8').hide();
                            $('#billingTxt').text($('#OptionPPay').text());
                            $('#Budget').hide(); $('#PaperLessBill').hide();
                            $('#BudgetLimit').hide();
                        } else {
                            $('#billingTxt').text($('#billtext').text());
                            $('#Budget').show(); $('#PaperLessBill').show(); $('#BudgetLimit').show();
                        }
                        $('#txtPayment').val($('#ddlPayment option:selected').text());
                        toastr.success(v.Table[0].Message);
                        $('#configure_payment').hide();
                    }
                    else {
                        toastr.error(v.Table[0].Message);
                    }
                }
                function OnError(request, status, error) {
                    loader.hideloader();
                    toastr.error(request.statusText)
                }
            }
            else {
                toastr.warning($('#TNC').text());
            }

        });

        $('#chkEnablequitehours').change(function () {
            var obj = this;
            if ($(obj).prop('checked')) {
                $(".quitehours").show();
                $(".quitehoursdisable").hide();

            }
            else {
                $(".quitehours").hide();
                $(".quitehoursdisable").show();
            }

        });

        $('.txtAll input[type=checkbox]').click(function () {
            if ($(this).prop('checked')) {
                $(".txt input[type=checkbox]").prop('checked', true);
                $("input[type='text'][class='txt']").each(function (i, obj) {


                    $(obj).css('display', 'block');
                    $(obj).show();
                    if ($(obj).next('span').length == 1) {
                        $(obj).next('span').show();
                    }
                    else {
                        $(obj).after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
                    }
                });
                $("input[type='text'][class='txt errorbox']").each(function (i, obj) {

                    $(obj).css('display', 'block');
                    $(obj).show();
                });
            }
            else {
                $(".txt input[type=checkbox]").prop('checked', false);
                $("input[type='text'][class='txt errorbox']").each(function (i, obj) {
                    $(obj).removeClass('errorbox');
                    $(obj).w2tag('');
                    $('#w2ui-tag-' + $(obj)[0].id + '').remove();
                });
                $("input[type='text'][class='txt']").each(function (i, obj) {
                    $(obj).next('span').hide();
                });
                $("input[type='text'][class='txt']").hide().css('display', 'none');

            }

        });

        $('.emailAll input[type=checkbox]').click(function () {
            if ($(this).prop('checked')) {
                $(".email input[type=checkbox]").prop('checked', true);
                $("input[type='text'][class='email']").each(function (i, obj) {

                    if ($(obj).css('display') == 'none') {
                        $(obj).css('display', 'block');
                    }
                    if ($(obj).next('span').length == 1) {
                        $(obj).next('span').show();
                    }
                    else {
                        $(obj).after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
                        $(obj).attr('mandatory', '1');
                    }
                });
                $("input[type='text'][class='email errorbox']").each(function (i, obj) {

                    if ($(obj).css('display') == 'none') {
                        $(obj).css('display', 'block');
                    }

                });
            }
            else {
                $(".email input[type=checkbox]").prop('checked', false);
                $("input[type='text'][class='email']").each(function (i, obj) {

                    if ($(obj).css('display') == 'block') {
                        $(obj).css('display', 'none');
                        //$(obj).val('');
                    }

                });
                $("input[type='text'][class='email']").each(function (i, obj) {
                    $(obj).next('span').hide();
                });
                $("input[type='text'][class='email errorbox']").each(function (i, obj) {

                    if ($(obj).css('display') == 'block') {
                        $(obj).css('display', 'none');
                        $(obj).val('');
                        $(obj).removeClass('errorbox');
                        $(obj).next('span').hide();
                        $(obj).removeClass('w2ui-tag-body');
                        $('#w2ui-tag-' + $(obj)[0].id + '').remove();

                    }

                });
            }

        });

        $('.pushAll input[type=checkbox]').click(function () {
            if ($(this).prop('checked')) {
                $(".push input[type=checkbox]").prop('checked', true);

            }
            else {
                $(".push input[type=checkbox]").prop('checked', false);
            }

        });

        $('.ivrAll input[type=checkbox]').click(function () {
            if ($(this).prop('checked')) {
                $(".ivr input[type=checkbox]").prop('checked', true);
                $("input[type='text'][class='ivr']").each(function (i, obj) {

                    if ($(obj).css('display') == 'none') {
                        $(obj).css('display', 'block');
                    }
                    if ($(obj).next('span').length == 1) {
                        $(obj).next('span').show();
                    }
                    else {
                        $(obj).after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
                    }
                });
                $("input[type='text'][class='ivr errorbox']").each(function (i, obj) {

                    if ($(obj).css('display') == 'none') {
                        $(obj).css('display', 'block');
                    }

                });
            }
            else {
                $(".ivr input[type=checkbox]").prop('checked', false);

                $("input[type='text'][class='ivr']").each(function (i, obj) {
                    if ($(obj).css('display') == 'block') {
                        $(obj).css('display', 'none');
                    }
                    $(obj).next('span').hide();
                });
                $("input[type='text'][class='ivr errorbox']").each(function (i, obj) {

                    if ($(obj).css('display') == 'block') {
                        $(obj).css('display', 'none');
                        $(obj).val('');
                        $(obj).removeClass('errorbox');
                        $('#w2ui-tag-' + $(obj)[0].id + '').remove();
                    }

                });
            }

        });

        function HideShowOnCheck(controlName, obj) {
            if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                if ($('#Txt' + controlName + '').hasClass('errorbox')) {
                    $('#Txt' + controlName + '').removeClass('errorbox');
                    $('#Txt' + controlName + '').w2tag('');
                    $('#Txt' + controlName + '').val('');
                    $('#w2ui-tag-Txt' + controlName + '').remove();

                }
                if (controlName.indexOf('Email') != -1) {
                    // $('#Txt' + controlName + '').val($('#HdnEmailId').val());
                    $('#Txt' + controlName + '').val() == "" ? $('#Txt' + controlName + '').val($('#HdnEmailId').val()) : "";
                }
                else {
                    //$('#Txt' + controlName + '').val($('#HdnPhoneNo').val().replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));
                    $('#Txt' + controlName + '').val() == "" ? $('#Txt' + controlName + '').val($('#HdnPhoneNo').val().replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3")) : "";
                }
                $('#Txt' + controlName + '').hide();
                $('#Txt' + controlName + '').css('display', 'none');
                $('#Txt' + controlName + '').removeAttr('mandatory');
                $('#Txt' + controlName + '').next('span').hide();
            }
            else {
                $('#Txt' + controlName + '').css('display', 'block');
                if (controlName.indexOf('Email') != -1) {
                    //$('#Txt' + controlName + '').val($('#HdnEmailId').val());
                    $('#Txt' + controlName + '').val() == "" ? $('#Txt' + controlName + '').val($('#HdnEmailId').val()) : "";
                }
                else {
                    //$('#Txt' + controlName + '').val($('#HdnPhoneNo').val().replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3"));
                    $('#Txt' + controlName + '').val() == "" ? $('#Txt' + controlName + '').val($('#HdnPhoneNo').val().replace(/(\d\d\d)(\d\d\d)(\d\d\d\d)/, "($1) $2-$3")) : "";
                }
                if (($('#Txt' + controlName + '').attr("mandatory") == undefined) || ($('#Txt' + controlName + '').attr("mandatory") == 0)) {
                    $('#Txt' + controlName + '').attr('mandatory', '1');
                    if ($('#Txt' + controlName + '').next('span').length == 0) {
                        $('#Txt' + controlName + '').after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
                    }
                    else {
                        $('#Txt' + controlName + '').next('span').show();
                    }
                }
                else {
                    if ($('#Txt' + controlName + '').next('span').length == 0) {
                        $('#Txt' + controlName + '').after('<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>');
                    }
                    else {
                        $('#Txt' + controlName + '').next('span').show();
                    }
                }
            }
        }

        $(".txt input[type=checkbox]").click(function () {
            var ischecked = true;
            var id = $(this).attr('ID');
            var controlName = id.replace('chk', '');
            HideShowOnCheck(controlName, this);
            $(".txt input[type=checkbox]").each(function (i, obj) {
                if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                    ischecked = false;
                }
            });
            $(".txtAll input[type=checkbox]").prop('checked', ischecked);//5283
            setTimeout(function () {
                if ($("#" + id).prop('checked') == true) {
                    $("#" + id).closest('div').find('input[type=text]').show();
                    $("#" + id).closest('div').find('input[type=text]').css('display', 'block;');
                } else {
                    $("#" + id).closest('div').find('input[type=text]').hide();
                    $("#" + id).closest('div').find('input[type=text]').css('display', 'none;');
                }
            }, 100);

        });

        $(".email input[type=checkbox]").click(function () {
            var ischecked = true;
            var id = $(this).attr('ID');
            var controlName = id.replace('chk', '');
            HideShowOnCheck(controlName, this);
            $(".email input[type=checkbox]").each(function (i, obj) {

                if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                    ischecked = false;
                }
            });
            $(".emailAll input[type=checkbox]").prop('checked', ischecked);
            setTimeout(function () {
                if ($("#" + id).prop('checked') == true) {
                    $("#" + id).closest('div').find('input[type=text]').show();
                    $("#" + id).closest('div').find('input[type=text]').css('display', 'block;');
                } else {
                    $("#" + id).closest('div').find('input[type=text]').hide();
                    $("#" + id).closest('div').find('input[type=text]').css('display', 'none;');
                }
            }, 100);
        });

        $(".push input[type=checkbox]").click(function () {
            var ischecked = true;
            $(".push input[type=checkbox]").each(function (i, obj) {
                if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                    ischecked = false;
                }

            });
            $(".pushAll input[type=checkbox]").prop('checked', ischecked);//5283
        });

        $(".ivr input[type=checkbox]").click(function () {
            var ischecked = true;
            var id = $(this).attr('ID');
            var controlName = id.replace('chk', '');
            HideShowOnCheck(controlName, this);
            $(".ivr input[type=checkbox]").each(function (i, obj) {
                if ($(obj).prop('checked') == false || $(obj).prop('checked') == '') {
                    ischecked = false;
                }
            });
            $(".ivrAll input[type=checkbox]").prop('checked', ischecked);//5283
            setTimeout(function () {
                if ($("#" + id).prop('checked') == true) {
                    $("#" + id).closest('div').find('input[type=text]').show();
                    $("#" + id).closest('div').find('input[type=text]').css('display', 'block;');
                } else {
                    $("#" + id).closest('div').find('input[type=text]').hide();
                    $("#" + id).closest('div').find('input[type=text]').css('display', 'none;');
                }
            }, 100);
        });

        $('#TxtOutageText').mask('(000) 000-0000');
        $('#TxtBillingText').mask('(000) 000-0000');
        $('#TxtBudgetText').mask('(000) 000-0000');
        $('#TxtDRText').mask('(000) 000-0000');
        $('#TxtConnectText').mask('(000) 000-0000');
        $('#TxtServiceText').mask('(000) 000-0000');
        $('#TxtLeakAlertText').mask('(000) 000-0000');
        $('#TxtServiceIVR').mask('(000) 000-0000');
        $('#TxtOutageIvr').mask('(000) 000-0000');
        $('#TxtBillingIvr').mask('(000) 000-0000');
        $('#TxtBudgetIvr').mask('(000) 000-0000');
        $('#TxtDRIvr').mask('(000) 000-0000');
        $('#TxtConnectIVR').mask('(000) 000-0000');
        $('#TxtLeakAlertIVR').mask('(000) 000-0000');
        $('#HdnPhoneNo').mask('(000) 000-0000');
        //BUG ID 20791 START
        document.getElementById("btnSave").accessKey = "A";

        $('.right_content_box').keypress(function (e) {
            if (e.keyCode == 13) {
                $('#btnSave').click();
                e.preventDefault();
            }
        })

        //BUG ID 20791 END
        $(".icon_setting").addClass('active');

        $("#btnChangePassword").click(function () {
            $("#errorMsg").addClass('error_msg_change_pwd');
        });

        try {
            $('#example-getting-started').multiselect();
        }
        catch (e) {
            console.log(e.message);
        }

        $(".help_popup_link .glyphicon-question-sign").click(function (e) {
            $(".help_popup_box").toggle();
            e.stopPropagation();
        });
        $(document).click(function (e) {
            if (!$(e.target).is('.help_popup_box, .help_popup_box *')) {
                $(".help_popup_box").hide();
            }
        });

        $(".help_popup_link_1 .glyphicon-question-sign").click(function (e) {
            $(".help_popup_box_1").toggle();
            e.stopPropagation();
        });
        $(document).click(function (e) {
            if (!$(e.target).is('.help_popup_box_1, .help_popup_box_1 *')) {
                $(".help_popup_box_1").hide();
            }
        });


        $(".acc_inner_box_1").bind("rowchange", function () {
            $(this).find(".profile-details:visible").removeClass("even").filter(":even").addClass("even");
        }).trigger("rowchange");

        $(".icon_setting").addClass('active');
        $('#txtAmount').keyup(function () {
            if ($('#txtAmount').val() > 100 || ($('#txtAmount').val() < 0)) {
                toastr.warning($('#BudgetLimitVal').text());
                $('#txtAmount').val('');
                return false;
            }
            else {
                return true;
            }
        });
        $("#rd_DashboardOption input").click(function (obj, args) {

        });

        //$("#ddlusage select option[value=0]").text($("#OptionUsage").text());
        //$("#ddlusage select option[value=1]").text($("#OptionNetUsage").val());


    } catch (ex) {
        console.log("error in ready" + ex);
    }


    //***********************************************
    $('#ddlLanguage').change(
    function () {
        var val1 = $('#ddlLanguage option:selected').val();
        $("#Hdn_LanguageDropdown").val(val1);
        //if($("#Hdn_LanguageDropdown"))
        // var val2 = $('#drop option:selected').val();

        // Do something with val1 and val2 ...
    }
);

    //*************************************
    function getSelectedValue_languageName() {
        var kk = encodeURIComponent($("#ddlLanguage option:selected").text());
        return kk;
        //   return $(".preData a>span")[0].innerText;
    }
    //*************************************

});

function xml() {
    var xml, ischk;
    var phoneno = $('#HdnPhoneNo').val();
    var email = $('#HdnEmailId').val();
    xml = '<NotificationDetail><NotificationType id="1">';
    ischk = (($('#chkOutageText').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtOutageText:visible').length == 1) {
        var TxtOutageText = $('#TxtOutageText').val() != '' ? parseInt($('#TxtOutageText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtOutageText').val();
        xml += '<EmailORPhone>' + TxtOutageText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtOutageText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="2">';
    ischk = (($('#chkOutageEmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtOutageEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtOutageEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtOutageEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }



    xml += '<NotificationType id="3">';
    ischk = (($('#chkOutagePush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="4">';
    ischk = (($('#chkOutageIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtOutageIvr:visible').length == 1) {
        var TxtOutageIvr = $('#TxtOutageIvr').val() != '' ? parseInt($('#TxtOutageIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtOutageIvr').val();
        xml += '<EmailORPhone>' + TxtOutageIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtOutageIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    // for  billing checkbox   
    xml += '<NotificationType id="5">';
    ischk = (($('#chkBillingText').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBillingText:visible').length == 1) {
        var TxtBillingText = $('#TxtBillingText').val() != '' ? parseInt($('#TxtBillingText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBillingText').val();
        xml += '<EmailORPhone>' + TxtBillingText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBillingText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="6">';
    ischk = (($('#chkBillingEmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBillingEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtBillingEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBillingEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    xml += '<NotificationType id="7">';
    ischk = (($('#chkBillingPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="8">';
    ischk = (($('#chkBillingIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBillingIvr:visible').length == 1) {
        var TxtBillingIvr = $('#TxtBillingIvr').val() != '' ? parseInt($('#TxtBillingIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBillingIvr').val();
        xml += '<EmailORPhone>' + TxtBillingIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBillingIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    // for budget checkbox
    xml += '<NotificationType id="9">';
    ischk = (($('#chkBudgetText').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBudgetText:visible').length == 1) {
        var TxtBudgetText = $('#TxtBudgetText').val() != '' ? parseInt($('#TxtBudgetText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBudgetText').val();
        xml += '<EmailORPhone>' + TxtBudgetText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBudgetText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="10">';
    ischk = (($('#chkBudgetEmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBudgetEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtBudgetEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBudgetEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="11">';
    ischk = (($('#chkBudgetPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="12">';
    ischk = (($('#chkBudgetIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtBudgetIvr:visible').length == 1) {
        var TxtBudgetIvr = $('#TxtBudgetIvr').val() != '' ? parseInt($('#TxtBudgetIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtBudgetIvr').val();
        xml += '<EmailORPhone>' + TxtBudgetIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtBudgetIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    // for DemandResponse Checkbox
    xml += '<NotificationType id="13">';
    ischk = (($('#chkDRText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtDRText:visible').length == 1) {
        var TxtDRText = $('#TxtDRText').val() != '' ? parseInt($('#TxtDRText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtDRText').val();
        xml += '<EmailORPhone>' + TxtDRText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtDRText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="14">';
    ischk = (($('#chkDREmail').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtDREmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtDREmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtDREmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="15">';
    ischk = (($('#chkDRPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="16">';
    ischk = (($('#chkDRIvr').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtDRIvr:visible').length == 1) {
        var TxtDRIvr = $('#TxtDRIvr').val() != '' ? parseInt($('#TxtDRIvr').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtDRIvr').val();
        xml += '<EmailORPhone>' + TxtDRIvr + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtDRIvr').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    //For Connect Me checkbox
    xml += '<NotificationType id="17">';
    ischk = (($('#chkConnectText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectText:visible').length == 1) {
        var TxtConnectText = $('#TxtConnectText').val() != '' ? parseInt($('#TxtConnectText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtConnectText').val();
        xml += '<EmailORPhone>' + TxtConnectText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    xml += '<NotificationType id="18">';
    ischk = (($('#chkConnectEmail').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtConnectEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="19">';
    ischk = (($('#chkConnectPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="20">';
    ischk = (($('#chkConnectIVR').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtConnectIVR:visible').length == 1) {
        var TxtConnectIVR = $('#TxtConnectIVR').val() != '' ? parseInt($('#TxtConnectIVR').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtConnectIVR').val();
        xml += '<EmailORPhone>' + TxtConnectIVR + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtConnectIVR').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    //For Service checkbox
    xml += '<NotificationType id="21">';
    ischk = (($('#chkServiceText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtServiceText:visible').length == 1) {
        var TxtServiceText = $('#TxtServiceText').val() != '' ? parseInt($('#TxtServiceText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtServiceText').val();
        xml += '<EmailORPhone>' + TxtServiceText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtServiceText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }


    xml += '<NotificationType id="22">';
    ischk = (($('#chkServiceEmail').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtServiceEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtServiceEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtServiceEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="23">';
    ischk = (($('#chkServicePush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="24">';
    ischk = (($('#chkServiceIVR').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtServiceIVR:visible').length == 1) {
        var TxtServiceIVR = $('#TxtServiceIVR').val() != '' ? parseInt($('#TxtServiceIVR').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtServiceIVR').val();
        xml += '<EmailORPhone>' + TxtServiceIVR + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtServiceIVR').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    //for leakalert
    xml += '<NotificationType id="25">';
    ischk = (($('#chkLeakAlertText').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtLeakAlertText:visible').length == 1) {
        var TxtLeakAlertText = $('#TxtLeakAlertText').val() != '' ? parseInt($('#TxtLeakAlertText').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtLeakAlertText').val();
        xml += '<EmailORPhone>' + TxtLeakAlertText + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtLeakAlertText').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="26">';
    ischk = (($('#chkLeakAlertEmail').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtLeakAlertEmail:visible').length == 1) {
        xml += '<EmailORPhone>' + $('#TxtLeakAlertEmail').val() + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtLeakAlertEmail').val(email);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }

    xml += '<NotificationType id="27">';
    ischk = (($('#chkLeakAlertPush').prop('checked')) ? "1" : "0")
    xml += '<IsNotify>' + ischk + '</IsNotify>'
    xml += '<EmailORPhone>""</EmailORPhone></NotificationType>';

    xml += '<NotificationType id="28">';
    ischk = (($('#chkLeakAlertIVR').prop('checked')) ? "1" : "0")

    xml += '<IsNotify>' + ischk + '</IsNotify>'
    if (ischk == "1" && $('#TxtLeakAlertIVR:visible').length == 1) {
        var TxtLeakAlertIVR = $('#TxtLeakAlertIVR').val() != '' ? parseInt($('#TxtLeakAlertIVR').val().replace(/[^0-9\.]/g, ''), 10) : $('#TxtLeakAlertIVR').val();
        xml += '<EmailORPhone>' + TxtLeakAlertIVR + '</EmailORPhone></NotificationType>';
    } else {
        $('#TxtLeakAlertIVR').val(phoneno);
        xml += '<EmailORPhone></EmailORPhone></NotificationType>';
    }
    xml += '</NotificationDetail>';

    return xml;

}

function refresh() {
    try {
        //var zoom = $('#zoom');
        var device = $('#devices');
        //zoom.text(window.detectZoom.zoom().toFixed(2));
        //device.text(window.detectZoom.device().toFixed(2));
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
    } catch (ex) {
        console.log("error in refresh()" + ex);
    }
}

function changeddltospanish() {

    //$("#ddlusage option[value=0]").text($("#OptionUsage").text());
    //$("#ddlusage option[value=1]").text($("#OptionNetUsage").text());
    $("#ddlPayment option[value=0]").text($("#OptionPPay").text());
    $("#ddlPayment option[value=1]").text($("#OptionMPay").text());
    //Drop Down Language should be Fixed for Language: English to be English and Spanish in spanish Language
    //$("#ddlLanguage option[value='EN']").text($("#LanguageEN").text());
    //$("#ddlLanguage option[value='ES']").text($("#LanguageES").text());
}

