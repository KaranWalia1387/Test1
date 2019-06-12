var r = '';
var databindtogrid;
var editcolumn = false;
var flagDeleteRow = false;
var databindtoreccuringgrid;
var _w2uiName = '';

function LoadGrid(name) {
    $('#wugrid').w2grid({
        name: name,
        show: {
            toolbar: false,
            footer: false
        },
        multiSearch: true,
        searches: [
             { field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', type: 'text' },
             { field: 'Number', caption: 'Number', type: 'text' },
             { field: 'EXPDate', caption: 'EXP Date', size: '20%', type: 'text' },
             { field: 'Default', caption: 'Default', size: '20%', type: 'text' }

        ],
        columns: [
            { field: 'CardTypOrBankAcc', caption: 'Card Type / Bank Account', size: '20%', sortable: true, resizable: false, },
            { field: 'Number', caption: 'Number', size: '20%', sortable: true, resizable: false, },
            { field: 'EXPDate', caption: 'EXP Date', size: '20%', sortable: true, resizable: false, },
            { field: 'Default', caption: 'Default', size: '20%', sortable: true, resizable: false, },

        ],

        records: databindtogrid,

    });
}

function LoadRecurringGrid(name) {
    try {
        _w2uiName = name;
        $('#wurecurringgrid').w2grid({
            name: name,
            show: {
                toolbar: false,
                footer: false
            },
            multiSearch: true,
            searches: [
                 { field: 'CardType', caption: 'Credit Card / Bank Account', type: 'text' },
                 { field: 'CardNumber', caption: 'Card Number', type: 'text' },
                 { field: 'RecurringId', caption: 'Recurring Id', size: '20%', type: 'text' },
                 { field: 'RecPaymentDatedDesc', caption: 'RecPaymentDate', size: '20%', type: 'date' }

            ],
            columns: [
                { field: 'CardType', caption: $('#CardorBank').text(), size: '30%', sortable: true, resizable: true, },
                { field: 'CardNumber', caption: $('#CorBNum').text(), size: '30%', sortable: true, resizable: true, },
                { field: 'RecPaymentDatedDesc', caption: $('#RecDate').text(), size: '20%', sortable: true, resizable: true, },
                {
                    field: 'RecurringId', caption: $('#Delete').text(), size: '20%', resizable: true,
                    render: function (record) {
                        return '<div id="' + record.RecurringId + '" globalize="ML_Billing_Span_Delete"><span style="margin-left:10px;" class="editrow"><span class="head_icon_flat icon_edit"></span></span><span class="deleterow"><span class="head_icon_flat icon_notif-trash"></span></span></div>';
                    }
                }
            ],
            onColumnClick: function(event) {
                console.log(event);
            },
            //onSelect: (function (event) {
            //    debugger
            //    var selected = w2ui[_w2uiName].records[event.index];

            //}),


            records: databindtoreccuringgrid,


        });


    }
    catch (e) {
        console.log(e.message);
    }

}

function bindrecurring() {

    var recurringpaymentdata = recurringpaymnetportal.GetAccountRecurringPayment().value;
    if (recurringpaymentdata != null) {

        databindtoreccuringgrid = recurringpaymentdata.Rows;

        if (databindtoreccuringgrid.length != 0) {
            $("#btnSaveRecurring").val($('#Existing').text());
            $("#btnSaveRecurring").removeClass('submit-button');
            $("#btnSaveRecurring").addClass('selected');
            //LoadRecurringGrid($('#wurecurringgrid').attr('name') + (r + 2));
            $('.whites_bar').css('display', 'none');
            $('#topHead').text($("#topHeading2").text());
           // $("#wurecurringgrid").css('display', 'block');
            $("#recurringgridTable").css('display', 'block');;
            $(".credit_debit").css("display", "none");
            $(".term_hide").hide();
            $('input[name=cardtype]').attr('disabled', true);
            LoadRecurringData();

        }
        else {

            $("#btnSaveRecurring").val($('#SaveAll').text());
            $("#btnSaveRecurring").removeClass('selected');
            $("#btnSaveRecurring").addClass('submit-button');
            $('#topHead').text($("#topHeading1").text());
           // $("#wurecurringgrid").css('display', 'none');
            $("#recurringgridTable").css('display', 'none');
            $(".credit_debit").css("display", "block");
            $(".term_hide").show();
            $('.whites_bar').css('display', 'block');
        }
    }
}

function BindDropDown(paytype) {
    var opt = "'<option value=''>Select</option>'";
    for (var i = 0; i < databindtogrid.length; i++) {

        if (databindtogrid[i].PayTypeId == paytype) {
            opt += '<option value="' + databindtogrid[i].PayId + '">' + databindtogrid[i].AccNameAccNumber + '</option>';

        }

    }
    $("#ddlPayment").html(opt)

}

$(document).ready(function ($) {
    document.getElementById("btnSaveRecurring").accessKey = "n";
    $('.active').removeClass('active');
    $('.recurring_bill').addClass('active');

    $("#ddlPaymentDate option").each(function () {
        if ($(this).val() != '') {
            $(this).text($(this).text() + " " + $("#daysBefore").text());
        }
    });
    try {

        $("#btnSaveRecurring").val($('#SaveAll').text());
        var paymentdata = recurringpaymnetportal.GetPaymentData().value;
        if (paymentdata != null) {
            databindtogrid = paymentdata.Rows;
            if (databindtogrid.length != 0 || databindtogrid != null) {

                BindDropDown(1);

            }

        }
        bindrecurring();
        k(".deleterow").live('click', function () {
            var deleteimgid = $(this).closest('div').attr("id");
            toastr.clear();
            //toastrConfirmPopup();
            //toastr.info($('#CnfrmDel').text() + '<br /><br /><button type="button" id="okBtn">' + $('#ML_toastr_confirm_btn').text() + '</button>');
            //toastrNotify();
            //$('#okBtn').click(function () {
            //    var result = recurringpaymnetportal.DeleteRecurringData(deleteimgid);
            //    $("#wurecurringgrid").w2destroy();
            //    $("#wurecurringgrid").html('');
            //    $("#btnSaveRecurring").val($('#SaveAll').text());
            //    $("#btnSaveRecurring").addClass('submit-button');
            //    $("#btnSaveRecurring").removeClass('selected');
            //    $('.whites_bar').css('display', '');
            //    $('#chkterm').css('display', '');
            //    $('input[name=cardtype]').attr('disabled', false);
            //    $('#SelectCard').css('display', '');
            //    $('#SelectBank').css('display', '');
            //    $('input[name=cardtype]').css('display', '');
            //    //w2alert($("#deleteGrid").text());
            //    toastrNotify();
            //    toastr.clear();
            //    toastr.success($("#deleteGrid").text());

            //})
            // commented to replace w2popup with toastr popup
            w2confirm($('#CnfrmDel').text(), function (obj) {
                if (obj == 'Yes') {
                    var result = recurringpaymnetportal.DeleteRecurringData(deleteimgid);
                    //$("#wurecurringgrid").w2destroy();
                    //$("#wurecurringgrid").html('');
                    $("#recurringgridDataRow").html('');
                    $("#recurringgridTable").hide();
                    $("#btnSaveRecurring").val($('#SaveAll').text());
                    $("#btnSaveRecurring").addClass('submit-button');
                    $("#btnSaveRecurring").removeClass('selected');

                    


                    $(".whites_bar").show();
                    $('.rec_payment_box').css('display', '');
                    $('input[name=cardtype]').attr('disabled', false);
                    $('#SelectCard').css('display', '');
                    $('#SelectBank').css('display', '');
                    $('input[name=cardtype]').css('display', '');
                    $(".credit_debit").css("display", "block");
                    $('.whites_bar').show();

                    toastr.success($("#deleteGrid").text());
                }
            });

        });

        k(".editrow").live('click', function () {
            var editimgid = $(this).closest('div').attr("id");
            var fullData = databindtoreccuringgrid;//[_w2uiName].records;
            toastr.clear();

           
            $("#chkterm").prop('checked', true);
            $('input[name=cardtype]').removeAttr('disabled');
            $('input[name=cardtype]').removeAttr('checked');
            if (fullData[0].PaymentTypeID == 'BA') {
                $('input[name=cardtype][value=2]').attr('checked', true);
                $('input[name=cardtype][value=2]').click();
            }
            else {
                $('input[name=cardtype][value=1]').attr('checked', true);
                $('input[name=cardtype][value=1]').click();
            }
            $("#ddlPaymentDate").val(fullData[0].RecPaymentDate);
            $("#ddlPayment").val(fullData[0].CardId);

            $("#btnSaveRecurring").val($('#SaveAll').text());
            $("#btnSaveRecurring").removeClass('selected');
            $("#btnSaveRecurring").addClass('submit-button');
            
            $('#topHead').text($("#topHeading1").text());
           // $("#wurecurringgrid").css('display', 'none');
            $("#recurringgridTable").css('display', 'none');
            $(".credit_debit").css("display", "block");
            $(".term_hide").show();
            $('.whites_bar').show();

            //*********************
          //  $('#btnAddUpdate').val($('#UpdtBtnVal').text());
            //********************
        });

        $('#rdFixed').click(function (e) {
            $('input[type=radio][name=recurring1]:checked').removeAttr('checked');

        });

        $('input[name=cardtype]').click(function (e) {
            $("#ddlPayment").html('');
            BindDropDown($(this).val());
            if ($(this).val() == 1)
            {
                $("#rdoCredit").prop("checked", true);
                $("#divBankDetails").hide();
                $("#divCreditDetails").show();
            }
            else
            {
                $("#rdoBank").prop("checked", true);
                $("#divBankDetails").show();
                $("#divCreditDetails").hide();
            }
        });

        $("#ddlPaymentFrequencySetting").change(function () {

            if ($('#ddlPaymentFrequencySetting :selected').text() == 1) {
                $('#FixedMonthly').hide();
                $('#FixedWeekly').show();
            }
            else if ($('#ddlPaymentFrequencySetting :selected').text() == 2) {
                $('#FixedWeekly').hide();
                $('#FixedMonthly').show();
            }
            else {
                $('#FixedWeekly').show();
                $('#FixedMonthly').show();
            }

        });
    }
    catch (e) {
        console.log(e.message);
    }


    $("#btnSaveRecurring").click(function () {
        toastr.clear();
        if ($("#btnSaveRecurring").val() == $('#Existing').text()) {
            return false;
        }

        if (!ValidateAllPageFieldsSingleMessage('paymentdiv')) {
            return false;
        }

        if (!($('input[id=chkterm]').prop('checked'))) {

            //w2alert($('#TandC').text());
            toastr.warning($('#TandC').text());
            return false;

        }
        var inputparam = {
            paymentDate: $("#ddlPaymentDate").val(),
            paytypeid: $("input[name=cardtype]:checked").val(),
            payid: $("#ddlPayment").val(),
        }
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "recurringpayment.aspx/SaveRecurringData",
            data: JSON.stringify(inputparam),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccessSave,
            error: OnError
        });
    });



    //********************************************************
   // $('input:radio[id="rdoBank"]').change(
   // function () {
   //     if ($(this).is(':checked')) {
   //         // append goes here
   //         $("#divBankDetails").show();
   //         $("#divCreditDetails").hide();
   //     }
   // });

   // $('input:radio[id="rdoCredit"]').change(
   //function () {
   //    if ($(this).is(':checked')) {
   //        // append goes here
   //        $("#divBankDetails").hide();
   //        $("#divCreditDetails").show();
   //    }
   //});
    //********************************************************

});

function OnError(data, status) {
    // alert(request.statusText);
    toastr.clear();
    toastr.error(request.statusText);
    loader.hideloader();
}

function OnSuccessSave(data, status) {
    loader.hideloader();
    if (JSON.parse(data.d)[0].STATUS == 1) {
        //w2alert($('#SaveSuccess').text());

        $("#chkterm").prop('checked', false);
        $('input[name=cardtype]').removeAttr('disabled');
        $('input[name=cardtype]').removeAttr('checked');
        $('input[name=cardtype][value=1]').attr('checked', true);
        $('input[name=cardtype][value=1]').click();
        $("#ddlPaymentDate").val('');
        toastr.clear();
        toastr.success($('#SaveSuccess').text());
        bindrecurring();
    }
    else {
        toastr.clear();
        toastr.error($('#SaveFail').text());
    }
}

function LoadRecurringData() {
    try {
        $("#recurringgridDataRow").html('')
        $("#recurringgridDataRow").append(

                "<td>" + databindtoreccuringgrid[0].CardType + "</td>" +
                "<td>" + databindtoreccuringgrid[0].CardNumber + "</td>" +
                "<td>" + databindtoreccuringgrid[0].RecPaymentDatedDesc + "</td> " +
                "<td>" +
                  '<div id="' + databindtoreccuringgrid[0].RecurringId + '" globalize="ML_Billing_Span_Delete"><span class="deleterow"><span class="head_icon_flat icon_notif-trash"></span> </span><span style="margin-left:10px;" class="editrow" id="' + databindtoreccuringgrid[0].RecurringId + '"><span class="head_icon_flat icon_edit"  ></span></span></div>' +
                //'<div id="' + databindtoreccuringgrid[0].RecurringId + '" globalize="ML_Billing_Span_Delete"><span class="deleterow"><span style="margin-left:10px;" class="editrow"><span class="head_icon_flat icon_edit"></span></span><span class="head_icon_flat icon_notif-trash"></span> </span></div>' +
              // '<div id="' + databindtoreccuringgrid[0].RecurringId + '" globalize="ML_Billing_Span_Delete"  class="deleterow"><img src="images/icon_delete.png" /></div>' +
        "</td> "
           );
    }
    catch (e) {
        console.log(e);
    }
}
