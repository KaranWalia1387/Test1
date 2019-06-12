var app = angular.module('FAQApp', ['ngSanitize']).filter('ToHTML', ['$sce', function ($sce) {
    return function (text) {
        var r = $sce.trustAsHtml(text);

        return r;
    };
}]);


app.controller("FAQController", function ($scope, $http, $log, $sce) {
    $scope.$sce = $sce;
    $scope.NoDataDiv = '';

    $scope.showObj = {
        "display": "block"
    }
    $scope.hideObj = {
        "display": "none"
    }

    $scope.rowClass = function (item, index) {
        if (index == 0) {
            return 'panel-collapse collapse in';
        }
        return 'panel-collapse collapse';
    };
    $scope.LoadFAQ = function () {
        try {
            $.ajax({
                method: 'POST',
                url: "FAQ.aspx/GetFrequentlyAskedQuestions",
                data: {},
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response != null && (response.d).length > 0) {

                        $scope.FAQData = JSON.parse(response.d);

                    }
                    else {
                        $scope.NoDataDiv = $('#NoData').text();

                    }
                },
                error: function errorCallback() {
                    $scope.NoDataDiv = $('#NoData').text();
                }
            });



        } catch (e) {
            $log.error(e);
        }
    }

    $scope.LoadFAQ();

});

