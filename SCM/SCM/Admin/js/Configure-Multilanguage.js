var mode = 1;
var databindtogrid;
var ApplicationTable;
var popOperation = '';
var ModuleID, Type = '', ENText = '', SPText = '', key = '', Concatestr = '', HiddenVal = '';
var ENControlPlaceholder = '', SPControlPlaceholder = '', ENTitle = '', SPTitle = '', ENAltTitle = '', ESAltTitle = '',ENErrorMessage='',SPErrorMessage='';
$(document).ready(function () {
    $('#txtNewSpanishText1').text('');

    $('#txtNewEnglishText1').text('');

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
        var editButton = '<a href="#"  style="text-align:center; margin-top:7px;display:block;color:#000;" onclick="editSelectedApplicationLabel(' + row + ');"><i class="fa fa-pencil-square-o Gridimage" title="Edit" /></i>';
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
    var ControlGuId = ViewObj.ControlGuId;
    $('#AddEditModel1').modal('show');
    SetPopupHeaderUpdate('Update Application Labels', 'Update')
    $('#txtNewSpanishText1').val('');
    $('#txtNewEnglishText1').val('');
    $('#txtNewSpanishText1').val(ViewObj.ES_ControlText);
    $('#txtNewEnglishText1').val(ViewObj.EN_ControlText);
    if (ViewObj.EN_ControlTitle != null) {
        $('#txtNewEnglishControlTitle').val(ViewObj.EN_ControlTitle);
    }
    else {
        $('#txtNewEnglishControlTitle').val('');
    }
    if (ViewObj.ES_ControlTitle != null) {
        $('#txtNewSpanishControlTitle').val(ViewObj.ES_ControlTitle);
    }
    else {
        $('#txtNewSpanishControlTitle').val('');
    }
    if (ViewObj.EN_ControlPlaceholder != null) {
        $('#txtNewEnglishControlPlaceholder').val(ViewObj.EN_ControlPlaceholder);
    }
    else {
        $('#txtNewEnglishControlPlaceholder').val('');
    }
    if (ViewObj.ES_ControlPlaceholder != null) {
        $('#txtNewSpanishControlPlaceholder').val(ViewObj.ES_ControlPlaceholder);
    }
    else {
        $('#txtNewSpanishControlPlaceholder').val('');
    }

    if (ViewObj.EN_AltTitle != null) {
        $('#txtNewEnglishAltTitle').val(ViewObj.EN_AltTitle);
    }
    else {
        $('#txtNewEnglishAltTitle').val('');
    }

    if (ViewObj.ES_AltTitle != null) {
        $('#txtNewSpanishAltTitle').val(ViewObj.ES_AltTitle);
    }
    else {
        $('#txtNewSpanishAltTitle').val('');
    }

    if (ViewObj.EN_ErrorMessage != null) {
        $('#txtNewerrmsgEnglish').val(ViewObj.EN_ErrorMessage);
    }
    else {
        $('#txtNewerrmsgEnglish').val('');
    }

    if (ViewObj.ES_ErrorMessage != null) {
        $('#txtNewerrmsgSpanish').val(ViewObj.ES_ErrorMessage);
    }
    else {
        $('#txtNewerrmsgSpanish').val('');
    }
        $('#hdnControlID').val(ViewObj.Controlid);
    HiddenVal = ViewObj.Controlid;
    var delimeter = '_';
    var splitted = ViewObj.Controlid.split(delimeter);
    var ModuleName = splitted[1];
    $('#lblModuleName1').text(ModuleName);
    $('#hdModuleName').val(ViewObj.MLModuleId);
    var str = "ML_" + ModuleName + "_";;
    $("#ddlType1").prop("disabled", true);
    $("#txtKey1").val(ViewObj.Controlid);



};
//This function will open a popup on add click
function SetPopupHeader(str, operation) {
 
    resetSave();
    popOperation = operation;
    $("#hModelHeader").text(str);
    $("#lblModuleName").html("<b>" + $("#ddlScreen option:selected").text() + "</b>");
    var ModuleName = $('#lblModuleName').text();
    $('#hdModuleName').val(ModuleName);
    key = "ML_" + $("#ddlScreen option:selected").attr("key") + "_";
    $("#txtKey").val(key);

    if (operation == "Add") {
        $("#ddlType").prop("disabled", false);
        $("#btnAddUpdate").text('Add')
        $('#txtNewSpanishText').addClass("concatKey");
        $('#txtNewEnglishText').addClass("concatKey");
        $(".concatKey").change(function () {
            var lblKey = "ML_" + $("#hdModuleName").val();
            ConCatKey(lblKey);
        });

        $(".concatKey").keypress(function () {
            var lblKey = "ML_" + $("#hdModuleName").val();
            ConCatKey(lblKey);
        });
        function ConCatKey(str) {
            if (popOperation == '' || popOperation == "Add" || popOperation == "Update") {

                if ($("#ddlType option:selected").val() != "0") {
                    str += "_" + $("#ddlType option:selected").val();
                }

                if ($("#txtNewEnglishText").val().trim() != "") {
                    var newString = $("#txtNewEnglishText").val().trim().replace(/ /g, "");
                    str += "_" + newString;
                }
                //trim(str);
                $("#txtKey").val(str);
                HiddenVal = str;
            }
        }

    }
    else {

        $("#btnAddUpdate").text('Update')
        $('#txtNewSpanishText').removeClass("concatKey");
        $('#txtNewEnglishText').removeClass("concatKey");
    }
};

//This function will open a popup on update click
function SetPopupHeaderUpdate(str, operation) {
    popOperation = operation;
    $("#hModelHeader1").text(str);
    $("#lblModuleName1").html("<b>" + $("#ddlScreen option:selected").text() + "</b>");
    //var ModuleName = $('#lblModuleName1').text();
    //$('#hdModuleName').val(ModuleName);
    key = "ML_" + $("#ddlScreen option:selected").attr("key") + "_";
    $("#txtKey1").val(key);
    $("#btnAddUpdate1").text('Update')
    $("#trOldEnglish1").show();
    $("#trOldSpanish1").show();
    resetUpdate();
   

};
//This function will clear the input contols
function reset() {
    $('#ddlType option[value="3"]').attr("selected", "selected");
    $('#txtNewEnglishText').val('');
    $('#txtNewSpanishText').val('');
   Type = '', ENText = '', SPText = '', key = '', Concatestr = '', HiddenVal = '';
}

function GetParams() {
}

function Validate() {
    var errMsg = "Please fill mandatory fields";

    if ($("#ddlType option:selected").val() == "0") {
        alert(errMsg);
        return false;
    }
    else {
        Type = $("#ddlType option:selected").val();
    }
    if ($("#txtNewEnglishText").val() == "") {
        alert(errMsg);
        $('#txtNewEnglishText').focus();
        return false;
    }
    else {
        ENText = $('#txtNewEnglishText').val();
    }
    if ($("#txtNewSpanishText").val() == "") {
        alert(errMsg);
        $('#txtNewSpanishText').focus();
        return false;
    }
    else {
        SPText = $("#txtNewSpanishText").val();
    }
    ModuleID = $("#ddlScreen option:selected").val();
    ENTitle = $('#txtEnglishControlTitle').val();
    SPTitle = $('#txtSpanishControlTitle').val();
    ENControlPlaceholder = $('#txtEnglishControlPlaceHolder').val();
    SPControlPlaceholder = $('#txtSpanishControlPlaceHolder').val();
    ENAltTitle = $('#txtAltTitleEnglish').val();
    SPAltTitle = $('#txtAltTitleSpanish').val();
    ENErrorMessage = $('#txtErrmsgEnglish').val();
    SPErrorMessage = $('#txtErrmsgSpanish').val();
    return true;
}
function SaveData() {
    mode = 4;
    var ScreenID = $('#ddlScreen').val();
    var isValid= Validate();
    if (isValid) {
        //ConCatstring(key);
        var params = { 'ModuleID': ModuleID, 'Type': Type, 'ENText': ENText, 'SPText': SPText, 'HiddenVal': HiddenVal, 'ENTitle': ENTitle, 'SPTitle': SPTitle, 'ENControlPlaceholder': ENControlPlaceholder, 'SPControlPlaceholder': SPControlPlaceholder, 'ENAltTitle': ENAltTitle, 'SPAltTitle': SPAltTitle, 'ENErrorMessage': ENErrorMessage, 'SPErrorMessage': SPErrorMessage };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "MultiLanguage.aspx/SaveData",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                ApplicationTable = MultiLanguage.LoadGrid(mode, ScreenID);
                databindtogrid = ApplicationTable.value.Tables[0].Rows;
                LoadGrid();
                loader.hideloader();
                alert("Application Label has been saved successfully");
                $(".close").trigger('close');
                return isValid;
            },
            //async: false,

            failure: function (response) {
                return response.d;
            }
        });
        reset();
    }
    else return isValid;
}
function OnSuccessSaveData(response) {

    ApplicationTable = MultiLanguage.LoadGrid(mode, ScreenID);
    databindtogrid = ApplicationTable.value.Tables[0].Rows;
    LoadGrid();
    alert("Application Label has been Saved successfully");
}


function ValidateUpdate() {
    var errMsg = "Please fill mandatory fields";
    if ($("#txtNewEnglishText1").val() == "") {
        alert(errMsg);
        return false;
    }
    else {
        ENText = $('#txtNewEnglishText1').val();
    }
    if ($("#txtNewSpanishText1").val() == "") {
        alert(errMsg);
        return false;
    }
    else {
        SPText = $("#txtNewSpanishText1").val();
    }


    ModuleID = $('#hdModuleName').val();
    ENTitle = $('#txtNewEnglishControlTitle').val();
    SPTitle = $('#txtNewSpanishControlTitle').val();
    ENControlPlaceholder = $('#txtNewEnglishControlPlaceholder').val();
    SPControlPlaceholder = $('#txtNewSpanishControlPlaceholder').val();
    ENAltTitle = $('#txtNewEnglishAltTitle').val();
    SPAltTitle = $('#txtNewSpanishAltTitle').val();
    ENErrorMessage = $('#txtNewerrmsgEnglish').val();
    SPErrorMessage = $('#txtNewerrmsgSpanish').val();
    return true;
}
function UpdateData() {
    mode = 4;
    var ScreenID = -1;
    if ($('#ddlScreen').val() == '-1') {
        ScreenID = -1;
    }
    else {
        ScreenID = $('#ddlScreen').val();
    }

    if (ValidateUpdate()) {
        var params = { 'ModuleID': ModuleID, 'Type': '', 'ENText': ENText, 'SPText': SPText, 'HiddenVal': HiddenVal, 'ENTitle': ENTitle, 'SPTitle': SPTitle, 'ENControlPlaceholder': ENControlPlaceholder, 'SPControlPlaceholder': SPControlPlaceholder, 'ENAltTitle': ENAltTitle, 'SPAltTitle': SPAltTitle, 'ENErrorMessage': ENErrorMessage, 'SPErrorMessage': SPErrorMessage };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "MultiLanguage.aspx/UpdateData",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                ApplicationTable = MultiLanguage.LoadGrid(mode, ScreenID);
                databindtogrid = ApplicationTable.value.Tables[0].Rows;
                LoadGrid();
                loader.hideloader();
                alert("Application Label has been updated successfully");
            },
            //async: false,

            failure: function (response) {
                return response.d;
            },
            error: function (response,err,status) {
                return response.d;
            }
        });
    }
}
function OnSuccessUpdateData(response) {



}


function resetSave() {
    $('#txtNewSpanishText').val('');
    $('#txtNewEnglishText').val('');
    $('#txtEnglishControlTitle').val('');
    $('#txtSpanishControlTitle').val('');
    $('#txtEnglishControlPlaceHolder').val('');
    $('#txtSpanishControlPlaceHolder').val('');
    $('#txtAltTitleEnglish').val('');
    $('#txtAltTitleSpanish').val('');
}

function resetUpdate() {
    $('#txtNewSpanishText1').val('');
    $('#txtNewEnglishText1').val('');
    $('#txtNewEnglishControlTitle').val('');
    $('#txtNewSpanishControlTitle').val('');
    $('#txtNewEnglishControlPlaceholder').val('');
    $('#txtNewSpanishControlPlaceholder').val('');
    $('#txtNewEnglishAltTitle').val('');
    $('#txtNewSpanishAltTitle').val('');
}