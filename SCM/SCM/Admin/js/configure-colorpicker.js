


$(document).ready(function () {

});

var app = angular.module("Color", []);

app.controller("ctrlColor", function ($scope, $http) {
    try {
        loader.showloader();
        getData($scope, $http);

        $scope.saveColors = function () {
            saveData($scope, $http);
        }
    }
    catch (e) {
        loader.hideloader();
        console.log(e.message);
    }
});

function getData($scope, $http) {
    try {
        $http({
            method: "POST",
            url: "Configure-colorpicker.aspx/GetUtilityColor",
            data: { mode: "2" }
        }).then(
        function mySucces(response) {
            loader.hideloader();
            $scope.Data = JSON.parse(response.data.d);
        },
        function myError(response) {
            loader.hideloader();
            $scope.Data = response.statusText;
        });

    }
    catch (e) {
        loader.hideloader();
        console.log(e.message);
    }
}

function saveData($scope, $http) {
    try {
        loader.showloader();
        var module = $scope.Data;
        var xml = "";
        xml = "<UtilityConfig>";
        var i = 0;
        $("input.Compare").each(function (j, obj) {
            xml += "<Config><UtilityID>" + module.Table[i].UtilityID + "</UtilityID>";
            xml += "<ModuleName>Compare</ModuleName>";
            xml += "<ConfigOption>" + module.Table[i].ConfigOption + "</ConfigOption>";
            xml += "<ConfigValue>" + $(this).val() + "</ConfigValue>";
            xml += "</Config>";
            i+=1;
        })
        $("input.Usage").each(function (j, obj) {
            xml += "<Config><UtilityID>" + module.Table[i].UtilityID + "</UtilityID>";
            xml += "<ModuleName>Usage</ModuleName>";
            xml += "<ConfigOption>" + module.Table[i].ConfigOption + "</ConfigOption>";
            xml += "<ConfigValue>" + $(this).val() + "</ConfigValue>";
            xml += "</Config>";
            i += 1;
        })
        xml += "</UtilityConfig>";

        $http({
            method: "POST",
            url: "Configure-colorpicker.aspx/SaveUtilityColor",
            data: { mode: "1", xml: xml }
        }).then(
        function mySucces(response) {
            loader.hideloader();
            var result = JSON.parse(response.data.d);
            alert(result.Table[0].Message);
        },
        function myError(response) {
            loader.hideloader();
            $scope.Data = response.statusText;
        });
    }
    catch (e) {
        loader.hideloader();
        console.log(e.message);
    }
}

//app.controller("ctrlCompareSpending", function ($scope, $http) {
//    $http({
//        url: "Configure-colorpicker.aspx/GetColorsCompare",
//        method: "POST",
//        data: "{}"
//    }).then(
//        function success(response) {
//            $scope.Data = response.data;
//        },
//        function error(response) {

//        })

//});