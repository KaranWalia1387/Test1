var app = angular.module("BillPaymentApp", []);
var cnt1 = 0;
var parameters;
app.controller("BillPaymentController",
    function($scope, loadCardBankList, $log, $http) {
        $('#hdnCallByAng').val("1");
        $scope.cnt1 = 0;

        $scope.removeValidateMessage = $("#ML_Billing_lbl_Remove").attr("ValidateMessage");
        $scope.removetitle = $("#ML_Billing_lbl_Remove").attr("title");
        $scope.removetext = $("#ML_Billing_lbl_Remove").text();
        $scope.loadPaymentInfo = function() {
            loadCardBankList.loadGridData()
                .then(function(response) {
                        if (response != null && response.d != null) {
                            r = JSON.parse(response.d);
                            $scope.r = r;
                            cnt1 = $scope.cnt1 = $scope.r.hasOwnProperty("Table") ? $scope.r["Table"].length : 0;
                            if ($scope.r.hasOwnProperty("Table3")) {
                                $("#hdnpayjuntionid").attr('Value', $scope.r.Table3[0].PaymentJunctionCustId);
                                var status = common.setpayjunctionid($scope.r.Table3[0].PaymentJunctionCustId).value;
                            }                             
                            $scope.removeValidateMessage = $("#ML_Billing_lbl_Remove").attr("ValidateMessage");
                            $scope.removetitle = $("#ML_Billing_lbl_Remove").attr("title");
                            $scope.removetext = $("#ML_Billing_lbl_Remove").text();


                        }
                    },
                    function(error) {

                    });
        }

        $scope.count = 0;


    });

app.service('loadCardBankList', function ($http, $q) {

    this.loadGridData = function () {
        var deferred = $q.defer();
        $http({ method: 'POST', url: 'BillPayment.aspx/getCardBankListByAng', data: {} }).success(
             function (response) {
                 deferred.resolve(response);

             }).error(function (errors) {
            deferred.reject(errors);

        });
        return deferred.promise;

    }
});

app.filter("maskcardNumber", function () {
    return function (x) {
        var len = x.length > 4 ? x.length - 4 : 0;
        var cno = "************" + x.substr(len, 4)
        return cno;
    }

})

app.filter("Count", function () {
    return function (x) {
        return cnt1 + x;
    }

})

app.filter("addGlobalize", function () {
    return function (x) {
        $("#" + x).prop("ValidateMessage", $("#ML_Billing_lbl_Remove").attr("ValidateMessage"));
        $("#" + x).text($("#ML_Billing_lbl_Remove").text());
        $("#" + x).prop("title", $("#ML_Billing_lbl_Remove").attr("title"));
        return x;
    }

})

app.filter("cardTypeImage", function () {
    return function (x) {
        var src = '';
        src = loadImageType(x);
        return src;
    }

})

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

