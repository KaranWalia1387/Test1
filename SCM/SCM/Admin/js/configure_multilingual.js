/// <reference path="../Configuration/ApplicationLabelPopup.html" />
var mode = 1;
var databindtogrid;
var ApplicationTable;
var popOperation = '';
var ModuleID, Type = '', ENText = '', SPText = '', key = '', Concatestr = '', HiddenVal = '';
var ENControlPlaceholder = '', SPControlPlaceholder = '', ENTitle = '', SPTitle = '', ENAltTitle = '', ESAltTitle = '', ENErrorMessage = '', SPErrorMessage = '';
$(document).ready(function () {
    

    BindData($('#ddlScreen').val(), 4);

    $("#ddlScreen").change(function () {
        var ScreenID = $('#ddlScreen').val();
        if (ScreenID == "-1") {
            ScreenID = '';
        }
        mode = 4;
        loader.showloader();
        BindData(ScreenID, mode);
        loader.hideloader();
    });
});

//This function is used to fetch data from Database and bind that data into grid.
function BindData(ScreenID, mode) {
    ApplicationTable = MultiLanguage.LoadGrid(mode, ScreenID);
    databindtogrid = ApplicationTable.value.Tables[0].Rows;
    LoadGrid();
    if (databindtogrid.length > 0) {

    }

}

function LoadGrid() {
    source = {
        datatype: "array",
        datafields: [
            { name: 'EN_ControlText' },
            { name: 'ES_ControlText', type: 'string' },
               { name: 'EN_ControlTitle', type: 'string' },
                  { name: 'ES_ControlTitle', type: 'string' },
                    { name: 'EN_ControlPlaceholder', type: 'string' },
                  { name: 'ES_ControlPlaceholder', type: 'string' },
                     { name: 'EN_AltTitle', type: 'string' },
                  { name: 'ES_AltTitle', type: 'string' },
                    { name: 'EN_ErrorMessage', type: 'string' },
                  { name: 'ES_ErrorMessage', type: 'string' },
            { name: 'LastUpdated', type: 'date' },
            { name: 'Action' },
            { name: 'Controlid' },
        { name: 'MLModuleId' }
        ],

        updaterow: function (rowid, rowdata, commit) {
            commit(true);
        },
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    loader.showloader();
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }

    );
    loader.hideloader();

    var imagerenderer = function (row, datafield, value) {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
        var ControlGuId = ViewObj.ControlGuId;
        var editButton = '<a href="#"  style="text-align:center; margin-top:7px;display:block;color:#000;" Onclick="editSelectedApplicationLabel(' + row + ')" ;"><i class="fa fa-pencil-square-o Gridimage" title="Edit" /></i>';
        return '<center><table><tr><td>' + editButton + '</td></tr></table></center>';
    }

    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        height: GridHeight * .92,
        columnsheight: 38,
        source: dataAdapter,
        theme: 'darkblue',
        sortable: true,
        altrows: true,
        rowsheight: 34,
        //sortname: "Controlid",
        //sortorder: "desc",
        //sortorder: "desc",
        //autoheight: false,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
             { text: 'MLModuleId', dataField: 'MLModuleId', hidden: true },
             { text: 'Action', datafield: 'Edit', width: '10%', align: 'center', cellsrenderer: imagerenderer },
            { text: 'Control', dataField: 'Controlid', width: '30%' },
            { text: 'English Text', dataField: 'EN_ControlText', width: '20%' },
            { text: 'Spanish Text', dataField: 'ES_ControlText', width: '20%' },
              { text: 'EN_ControlTitle', dataField: 'EN_ControlTitle', hidden: true },
            { text: 'ES_ControlTitle', dataField: 'ES_ControlTitle', hidden: true },
              { text: 'EN_ControlPlaceholder', dataField: 'EN_ControlPlaceholder', hidden: true },
            { text: 'ES_ControlPlaceholder', dataField: 'ES_ControlPlaceholder', hidden: true },
               { text: 'EN_AltTitle', dataField: 'EN_AltTitle', hidden: true },
            { text: 'ES_AltTitle', dataField: 'ES_AltTitle', hidden: true },
              { text: 'EN_ErrorMessage', dataField: 'EN_ErrorMessage', hidden: true },
            { text: 'ES_ErrorMessage', dataField: 'ES_ErrorMessage', hidden: true },
            {
                text: 'Last Updated', dataField: 'LastUpdated', width: '20%', cellsformat: 'MM/dd/yyyy h:mm tt',
                createfilterwidget: function (column, columnElement, widget) {
                    $(widget).jqxDateTimeInput({ formatString: 'MM/dd/yyyy' });
                }
            }


        ]


    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });

    $("#closeApplicationLabel ,#ClosePopUp").click(function () {
        Popup.hide('AddEditModel');
        reset();
    });

}

function editSelectedApplicationLabel(row) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
    var Controlid = ViewObj.Controlid;
    $('#hdControlGuid').val(Controlid);
    angular.element(document.getElementById('divid')).scope().showModal(row);


};
var app = angular.module('MultilingualApp', ['ui.bootstrap']);
var name = [];
app.controller('Nav', function ($scope, $http, $log, $sce) {
});
app.controller('MultilingualController', function ($scope, $uibModal, $http, $log, $sce) {
   
    $scope.Loaddata = function (Controlid) {
        var param = { 'Mode': 1, 'ScreenId': $('#ddlScreen').val(), 'Controlid': Controlid };
        try {
            $.ajax({
                method: 'POST',
                url: "configure-multilingual.aspx/LoadDataForUpdate",
                data: JSON.stringify(param),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response != null && (response.d).length > 0) {

                        $scope.MultilingualData = JSON.parse(response.d);

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

    $scope.showModal = function (row) {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
        var Controlid = ViewObj.Controlid;
        
       
        $scope.Loaddata(Controlid);

        $scope.opts = {
            $scope: $scope,
            backdrop: 'static',
            backdropClick: true,
            dialogFade: false,
            keyboard: false,
            templateUrl: 'ApplicationLabelPopup.html',
            controller: ModalInstanceCtrl,
            resolve: {

                loaddata: function () {
                    return $scope.MultilingualData;
                },

            }
        }

        var modalInstance = $uibModal.open($scope.opts);

        modalInstance.result.then(function () {
            //on ok button press 
        }, function () {
            //on cancel button press
           // console.log("Modal Closed");
        });
    };

    $scope.update = function (item) {
        try {
            $.ajax({
                method: 'POST',
                url: "configure-multilingual.aspx/UpdateMultilingualXML",
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response != null && (response.d).length > 0) {
                        if (response.d == "1") {
                            alert("Data has been updated successfully")
                        } else {
                            alert("Update Failed");
                        }
                    }
                    else {
                        alert("Update Failed");
                    }
                },
                error: function errorCallback() {
                }
            });



        } catch (e) {
            $log.error(e);
        }
    }
})

var ModalInstanceCtrl = function ($scope, $http, $log, $sce, $uibModalInstance, $uibModal, loaddata) {
  
    $scope.item = loaddata;
 
    $scope.items = [];
    $scope.ok = function (item) {
        var xml = "";
        $scope.items.pop(item);
        $scope.items.push(item);
        //code for checking mandatory
        //for (var i = 0, l = item.length; i < l; i++) {
        //   if( item[i].ControlText == "")
        //   {
        //       alert("Please fill mandatory fields");
        //       return;
        //    }
        //}
        var arr = $scope.items[0];
        angular.forEach(arr, function (value, i) {
            xml += "<UpdateInfo><Language>" +
                            "<LanguageCode>" + arr[i].LanguageCode + "</LanguageCode>" + "<ControlId>"
                            + arr[i].Controlid + "</ControlId><ControlText>"
                            + arr[i].ControlText + "</ControlText><ControlTitle>" + arr[i].ControlTitle + "</ControlTitle><ControlPlaceholder>" + arr[i].ControlPlaceholder + "</ControlPlaceholder><AltTitle>" + arr[i].AltTitle + "</AltTitle><ErrorMessage>" + arr[i].ErrorMessage + "</ErrorMessage><ControlType>" + arr[i].ControlType + "</ControlType><UpdatedBy>" + "</UpdatedBy></Language></UpdateInfo>"
        });


        var param = { 'ModuleID': $('#ddlScreen').val(), 'xml': xml };
        try {
            $.ajax({
                method: 'POST',
                url: "configure-multilingual.aspx/SaveData",
                data: JSON.stringify(param),
                dataType: "json",
                contentType: "application/json; charset=utf-8",
                async: false,
                success: function (response) {
                    if (response != null && (response.d).length > 0) {
                        if (JSON.parse(response.d)[0].STATUS == "1") {
                            alert("Application label updated successfully")
                            $uibModalInstance.close();
                        }

                    }
                    else {
                        alert("Save Failed")

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
       
    $scope.cancel = function () {
        $uibModalInstance.dismiss('cancel');
    };

}
