/// <reference path="../signout.aspx" />
/// <reference path="angular/angular.js" />
var r;
var isvalid = 0;
$(document).ready(function () {
    $('#hdnCallByAng').val("1");// added to make hdnvalue 1 for addupdate payment info.
    //$('#divValidateLogin').each(function () {
    //    $(this).find('input').keypress(function (e) {
    //        if (e.which == 10 || e.which == 13) {
    //            if ($('#w2ui-popup').is(':visible') == true || $('.w2ui-popup-message').is(':visible')==true) {
    //                e.preventDefault();  return false;
    //            }
    //            else{
    //                LoadData();
    //                return false;
    //            }
    //        }
    //    });      
    //});
    

    $('#btnValidateLogin').click(function (e) {
        //w2multiple popup issue solved
        if ($('#w2ui-popup').is(':visible') == true || $('.w2ui-popup-message').is(':visible') == true) {
            e.preventDefault();
            console.log("1");
            return false;
        }
        else {
            console.log("2");
            toastr.clear();
            LoadData();
        }
    });
 
    $('#btnSaveAll').click(function () {
        if (isvalid == 1) {
         try {           
                 var param = {                  
                     //  payment: ($('#wugrid div input[type=radio]:checked').val() == undefined ? null : $('#wugrid div input[type=radio]:checked').val())
                     payment: ($('[id^="rdobtnProperty"]:checked').val() == undefined ? null : $('[id^="rdobtnProperty"]:checked').val())

                 }
                 loader.showloader();
                 $.ajax({
                     type: "POST",
                     url: "Payment_info.aspx/SaveDataAsync",
                     data: JSON.stringify(param),
                     contentType: "application/json; charset=utf-8",
                     dataType: "json",
                     success: OnSuccess,
                     error: OnError
                 });
             }
         catch (e) { }}
     });
     function OnSuccess(data, status) {
         loader.hideloader();
         if (status == 'success') {
             $("#hdnDefaultPaymentMode").val($('[id^="rdobtnProperty"]:checked').val().split(':')[0]);
            // $("#hdnDefaultPaymentMode").val($('#wugrid div input[type=radio]:checked').val().split(':')[0]);
              //w2alert(JSON.parse(data.d)[0].Message);
             toastr.success(JSON.parse(data.d)[0].Message)

         }
         else {
             //w2alert(status);
             toastr.error(status)
         }
     }
     function OnError(request, status, error) {
         //w2alert(request.statusText);
         loader.hideloader();
         toastr.error(request.status.text)

     }

    });

    function LoadData(){
        if ($('#txtPassword').val() == "") {
           // error.showerror($('#txtPassword'), $('#passwordErrorMsg').text());
            error.showerror($('#txtPassword'), $('#passwordErrorMsg').attr('ValidateMessage'));

            return false;
        }        
        else {
            try {
                loader.showloader();
                var loginresult;
                var param = {
                    username: $("#hdnUserName").val(), password: $("#txtPassword").val(), rememberme: "", calledFrom: "PI"
                }
                $.ajax({
                    type: "POST",
                    url: "Default.aspx/validatepassword",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function OnSuccess(response) {
                        loginresult = $.parseJSON(response.d);                      
                        if (loginresult != null) {
                            var maintable = loginresult[0];
                          
                            if (maintable["STATUS"] != "0")
                            {
                                isvalid = 1;
                                $('#divValidateLogin').hide();
                                $('#addnewpayment').show(); $('#btnSaveAll').show();                                          
                                loader.hideloader();
                                angular.element('#PaymentTable').scope().loadPaymentInfo();
                                
                            }
                            else {
                                isvalid = 0;
                                w2alert(maintable["Message"], 'Notification', function () {
                                    $('#txtPassword').val('');
                                        if (maintable["AttemptLeft"] == "0") {
                                            //window.location = "signout.aspx";
                                            $.fn.idleTimeout().logout();
                                    }
                                });
                                loader.hideloader();
                                return false;
                            
                            }
                        }
                    },

                    failure: function (response) {
                        //  resetlogin('Your account isn\'t activated. Please contact customer support.');
                        loader.hideloader();
                        return false;

                    },
                    error: function (response) {
                        //resetlogin('Your account isn\'t activated. Please contact customer support.');
                        loader.hideloader();
                        return false;
                    }
                });
            }

            catch (e) { return false; }
        }
    }

$(document).ready(function () {
    $(".payment_info").addClass('active');
    try {
        $('#addnewpayment').hide();
        $('#btnSaveAll').hide();
        
    }
    catch (e) {
        console.log(e.message);
    }

    k('.deleterow').live('click', function (e) {
        try {
            var grid = this;
            var delmsg = grid.id.split('|');
            delmsg[2] = $('#SuccessDelMsg').html();
            delmsg[3] = $('#SuccessMsg').html();
            delmsg[4] = $('#TxnFailedMsg').html();
            if (grid.id.split('|')[0] == $("#hdnDefaultPaymentMode").val())
            {
                toastr.warning($('#DefaultDelete').text());
                return false;
            }
            var msgshow = delmsg[delmsg.length - 1];
            var res = w2confirm(msgshow =="1" ? $('#DeleteCreditCard').text() : $('#DeleteBankAccount').text(), function (obj) {
                if (obj == 'Yes') {
                    var msg = account.deleteRecord(delmsg).value;
                    toastr.clear();
                    toastr.success(msg);
                    //databindtogrid = account.LoadW2UIGridData().value.Rows;
                    //if (databindtogrid.length != 0 || databindtogrid != null) {
                    //    //The following code loads w2ui grid with a different name everytime a record is deleted.                                
                    //    LoadGrid($('#wugrid').attr('name') + Math.floor((Math.random() * 100) + 7));

                    //}
                    angular.element('#PaymentTable').scope().loadPaymentInfo();
                }
            })
        }
        catch (e) {
            console.log(e.message);
        }
    });
   
});

var app = angular.module("PaymentInfoApp", []);
app.service('loadPaymentData', function ($http, $q) {
    this.loadGridData = function () {
        var deferred = $q.defer();
        $http({ method: 'POST', url: 'Payment_Info.aspx/LoadPaymentByAng', data: {} }).success(
             function (response) {
                 deferred.resolve(response);

             }).error(function (errors) {
                 deferred.reject(errors)
                 alert("Payment Details error");
             });
        return deferred.promise;

    }
});
app.controller("PaymentInfoController", function ($scope, loadPaymentData, $log, $http) {

    $scope.colorIcon = {};
    $scope.clickHover = function (e) {
       // $('.tootip_popup_box').show();
       // $(e).find('.tootip_popup_box').show();
        $($(e)[0].currentTarget.nextElementSibling).show()
    }
    $scope.hidepopup = function (e) {
        $($(e)[0].currentTarget.nextElementSibling).hide()

    }
    $scope.loadPaymentInfo = function () {
        loadPaymentData.loadGridData().then(function (response) {
            r = JSON.parse(response.d);
            $scope.paymentInfo = JSON.parse(response.d);
            if ($scope.paymentInfo.hasOwnProperty("Table3")) {
                $("#hdnpayjuntionid").val($scope.paymentInfo.Table3[0].PaymentJunctionCustId);
                var status = common.setpayjunctionid(r.Table3[0].PaymentJunctionCustId).value;
            }
        }, function (error) {

        });
    }

     //$scope.loadPaymentInfo();
});

function loadImageType(x) {
    try {
        var src = '';
        switch (x.toLowerCase()) {
            case "visa": src = "images/icon-visa.png"; break;
            case "mastercard": src = "images/icon-mastercard.png"; break;
            case "american_express": src = "images/american_express.png"; break;
            case "discover": src = "images/discoverNew.jpg"; break;
            default: src = "images/icon-visa.png";


        }
        return src;


    } catch (e) {

    }

}

app.filter("maskcardNumber", function () {
    return function (x) {
        var len = x.length > 4 ? x.length - 4 : 0;
        var cno = "************" + x.substr(len, 4)
        return cno;
    }

})

app.filter("cardTypeImage", function () {
    return function (x) {
        var src = '';
        src = loadImageType(x);

        return src;//+ ExpiryCheck(expiryDate);
    }

})

app.filter("manageId", function () {
    var id = "";
    var img = '';
    var img, bankorcardid, bankorcardname, accountorcardno, routingno, verified, name, paytypeid;
    return function (x) {
        if (x.PaymentTypeID == "2")//bank account id mapping to image
        {
            img = '<img src=images/Bank_Acc_icon.png>';
            $('#hdnpayjuntionid').val(x.PaymentJunctionCustId);
            id = x.PaymentJunctionCustId + "|" + x.BankAccountID + "|" + x.BankAccount + "|" + x.BankRoutingNumber + "|" + x.accountType + "|" + x.PaymentTypeID;
        }
        else if (x.PaymentTypeID == "1")//card id mapping to image 
        {
            img = '<img src=' + loadImageType(x.CardType) + '>';
            $('#hdnpayjuntionid').val(x.PaymentJunctionCustId);
            id = x.PaymentJunctionCustId+"|"+x.CreditCardid + "|" + x.CardType + "|" + x.Cardnumber + "|" + x.ExpiryDate + "|" + x.PaymentTypeID;
        }
        return id;
    }

})

app.filter("ExpiryCheck", function () {
    return function (x,index) {
        try {
            var month = x.split("/")[0];
            var year = x.split("/")[1];
            var currDate = new Date();
            if ((year < currDate.getFullYear().toString().slice(-2)) || (month < (currDate.getMonth() + 1) && year == currDate.getFullYear().toString().slice(-2))) {
                //return "<img alt='cardImage' src='images/expired_noti.png'/>";
                $($('.tootip_popup_box')[index]).html($('#ML_PaymentInfo_ExpiredCardMsg').attr('ValidateMessage'))
                // return 'images/expired_noti.png';
               // $scope.colorIcon = { color: "red" };
                return '{ "color": "red" }';
            }
            else if (month == (currDate.getMonth() + 1) && year == currDate.getFullYear().toString().slice(-2)) {
                //return "<img alt='cardImage' src='images/expire_noti.png'/>";
                $($('.tootip_popup_box')[index]).html($('#ML_PaymentInfo_ExpiryCardMsg').attr('ValidateMessage'));
                // return 'images/expire_noti.png';
                //$scope.colorIcon = { color: "orange" };
                return '{ "color": "orange" }';
            }
            else {
               // $scope.colorIcon={}
                $($('.noti_wrapper_box')[index]).hide();
            }
            return '';
        } catch (e) {
            console.log(e);
        }
    }
})
