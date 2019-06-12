var SegmentTable = {};
var AttributeTable = {};
var databindtogrid;
var Tables, SegmentData, AttributeData;
var mode = '1';
var GridHeight = '320px';
var qrStr;
var mode = 1;
var SegmentId, Type = '', SegmentCode = '', SegmentName = '', Description = '', Status = '', UtilityType = '', UtilityId = '', User = '';
var AttributeId, Condition = '', Value = '', AttributeName = '';
var Json = {};
var dddlAttribute;
var databindtodropdown;
var ApplicationTable;
var arr = [];
var xml = '';
$(document).ready(function () {
    try {

        var qrStr;
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < 1; i++) {
            var pair = vars[i].split('=');

            qrStr = decodeURIComponent(pair[1]);

        }
        if (qrStr > 0) {
            $('#topheader').html('Update Segment');
            $('#btnAddUpdate').html('Update');
            var param = { 'iMode': 1, 'SegmentID': qrStr };
            CallAjax(Error, param)// For filling Segment Details in case of update
            var param = { 'iMode': 5, 'SegmentId': qrStr };
            CallAjaxFunction(Error, param);// for filling attribute grid in case of update
        }
        else {
            $('#topheader').html('Add Segment');
            $('#btnAddUpdate').html('Save');

        }

    }
    catch (e) {
        console.log(e.message);
    }

});

//DATABINDING FUnctions
function CallAjax(fnError, param) {
    try {
        loader.showloader();
        $.ajax({

            type: "POST",
            url: "crm-add-segmentations.aspx/getSegmentDataById",
            data: JSON.stringify(param),
            //async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: { id: 'k' },
            success: function (response, status, type) {
                SegmentData = $.parseJSON(response.d);
                ConvertData();

                $('#txtSegmentName').val(SegmentTable.Tables[0].Rows["Segment"]);
                $('#txtSegmentCode').val(SegmentTable.Tables[0].Rows["SegmentCode"]);
                $('#txtDescription').val(SegmentTable.Tables[0].Rows["Description"]);
                $("#ddlType").val(SegmentTable.Tables[0].Rows["TypeID"])
                $("#ddlServiceType").val(SegmentTable.Tables[0].Rows["ServiceType"])
                //} else {

                //}
                loader.hideloader();
            },
            error: fnError,
        })
    }
    catch (e) { loader.hideloader(); }

}
function ConvertData() {
    try {
        Tables = new Array();
        $.map(SegmentData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        SegmentTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}
function CallAjaxFunction(fnError, param) {
    try {
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "crm-add-segmentations.aspx/getData",
            data: JSON.stringify(param),
            //async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: { id: 'k' },
            success: function (response, status, type) {
                SegmentData = $.parseJSON(response.d);
                ConvertArray();
                LoadGridafterDelete(arr);
                loader.hideloader();
            },
            error: fnError,
        })
    }
    catch (e) { loader.hideloader(); }

}
//END of Databinding Functions



//SAVEUPDATE FUNCTIONS
function SaveUpdateData() {
    try {
        createXml(arr);
        var query = window.location.search.substring(1);
        var vars = query.split('&');
        for (var i = 0; i < 1; i++) {
            var pair = vars[i].split('=');
            qrStr = decodeURIComponent(pair[1]);
        }
        if (qrStr > 0) {
            mode = 2;
            var SegmentId = qrStr;
        }
        else {
            mode = 0;
            SegmentId = 0;
        }

        if (ValidatePage('divaddsegment') && Validate()) {

            if (CheckArrayLength()) {
                //ConCatstring(key);
                var params = { 'Action': mode, 'SegmentId': SegmentId, 'SegmentCode': SegmentCode, 'SegmentName': SegmentName, 'Type': Type, 'Description': Description, 'UtilityType': UtilityType, 'xml': xml };
                loader.showloader();
                $.ajax({
                    type: "POST",
                    url: "crm-add-segmentations.aspx/SaveUpdateData",
                    data: JSON.stringify(params),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (response) {

                        loader.hideloader();
                        var result = JSON.parse(response.d);
                        if (result.Table[0].STATUS == 1) {
                            alert(result.Table[0].Message);
                            window.location.href = 'crm-segmentations.aspx';
                        }
                        else {
                            alert(result.Table[0].Message);
                        }

                    },
                    //async: false,

                    failure: function (response) {
                        return response.d;
                        loader.hideloader();
                    }
                });
            }
        }
    }
    catch (e) { }
}
function ValidateAll() {
    var errMsg = "Please enter all the mandatory information.";

    if (($("#ddlType option:selected").val() == "") && ($("#ddlServiceType option:selected").val() == "") && ($("#txtSegmentName").val() == "") && ($("#txtSegmentCode").val() == "")) {
        alert(errMsg);
        return false;
    }
    else {
        return true;
    }
}

function ValidateAllattributes() {
    var errMsg = "Please enter all the mandatory information.";

    if (($("#txtAttributeName").val() == "") && ($("#ddlCondition").val() == null) && ($("#txtValue").val() == "")) {
        alert(errMsg);
        return false;
    }
    else {
        return true;
    }
}
function Validate() {
    var errMsg = "Please fill mandatory fields";

    if ($("#ddlType option:selected").val() == "") {
        alert("Please select   Segment Type");
        return false;
    }
    else {
        Type = $("#ddlType option:selected").val();
    }
    if ($("#ddlServiceType option:selected").val() == "") {
        alert("Please select Service Type");
        return false;
    }
    else {
        UtilityType = $("#ddlServiceType option:selected").val();
    }
    if ($("#txtSegmentName").val() == "") {
        alert("Please enter Segment Name");
        $('#txtSegmentName').focus();
        return false;
    }
    else {
        SegmentName = $('#txtSegmentName').val();
    }
    if ($("#txtSegmentCode").val() == "") {
        alert("Please enter segment code");
        $('#txtSegmentCode').focus();
        return false;
    }
    else {
        SegmentCode = $("#txtSegmentCode").val();
    }
    //if ($("#txtDescription").val() == "") {
    //    alert("Please enter description");
    //    $('#txtDescription').focus();
    //    return false;
    //}
    //else {
    Description = $("#txtDescription").val();
    //}

    return true;
}
function CheckArrayLength() {
    if (arr.length == 0) {
        alert("Please add atleast one attribute");
        return false;
    }
    return true;

}
function createXml(arr) {
    xml = "<Nodes>";
    for (i = 0; i < arr.length ; i++) {
        xml += "<Node>";
        xml += "<AttributeId>" + arr[i].AttributeId + "</AttributeId>";
        xml += "<Condition>" + arr[i].Condition + "</Condition>";
        xml += "<Value>" + arr[i].Value + "</Value>";
        xml += "</Node>";
    }
    xml += "</Nodes>";
    return xml;
}
//END of SAVE Functions


//Adding Attribute functions
$('#btnCancel').click(function () {
    // $(".modal-backdrop.in ").css("opacity", 0);
    //$('.closepopupsegmentation').trigger('click');
});
function addattribute() {
    
    try {
     
        if (ValidatePage('add_attri_popup')) {
            loader.showloader();
            AttributeName = $("#txtAttributeName").val();
            AttributeId = $("#AttributeId").val();
            if (AttributeId == "") {
                alert("Please select attribute");
                loader.hideloader();
                $("#txtAttributeName").focus();
                return false;
            }
            Condition = $('#ddlCondition').val();
            Value = $('#txtValue').val();
            setTimeout(function () {

                LoadGrid();
            }, 1000);
            loader.hideloader();
           // $('.closepopupsegmentation').trigger('click');
            $('#add_attri_popup').modal('hide')
            ////loader.hideloader();
        }
    } catch (e) {
        loader.hideloader();
    }


}

$(document).on("click", ".add_btn", function () {
    
    if ($("#ddlType option:selected").val() == "") {
       
        alert("Please select Segment Type first!");
        $('#addbtnsegment').attr('data-target', '');
        // $($("#addbtnsegment").data("target")).hide()
       $('#add_attri_popup').modal('hide')// $('.closepopupsegmentation').trigger('click');
        // $(".modal-backdrop.in ").css("opacity", 0);
        $('#ddlType').focus();
        return false;
    }
    else {

        $('#addbtnsegment').attr('data-target', '#add_attri_popup');
        Type = $("#ddlType option:selected").val();
    }
    $("#txtAttributeName").val('');
    $("#AttributeId").val('');
    $('#ddlCondition').val('');
    $('#txtValue').val('');
});
//End of add attribute functions

$(document).on("click", ".closepopupsegmentation", function () {
    $('#addbtnsegment').attr('data-target', '');

})

//GRID FUNCTIONS
function LoadGrid() {

    var data = { "AttributeId": AttributeId, "AttributeName": AttributeName, "Condition": Condition, "Value": Value };
    arr.push(data);
    autoheightPrimary = false;
    autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {

        datafields: [

            { name: 'AttributeId' },
            { name: 'Edit' },
             { name: 'Remove' },
            { name: 'AttributeName' },
            { name: 'Condition' },
              { name: 'Value' },

        ],
        async: false,
        record: 'Table',
        sortable: true,
        //datatype: "array",
        localdata: arr,
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );


    if ($(window).width() <= 1400) {
        $("#jqxgrid").jqxGrid({
            height: GridHeight * .96,
        });

    }




    $("#jqxgrid").jqxGrid({
        width: "99.8%",

        //autoheight: false,
        height: GridHeight * .79,
        columnsheight: 38,
        altrows: true,
        source: dataAdapter,
        sortable: true,
        // selectionmode: 'checkbox', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [

            { text: 'AttributeId', dataField: 'AttributeId', width: '0%', hidden: true, },
            { text: 'Action', dataField: 'Action', width: '10%', cellsrenderer: imagerenderer, }, // Added by RS 
            { text: 'Attribute Name', dataField: 'AttributeName', width: '35%', },
            { text: 'Condition', dataField: 'Condition', width: '35%', },
            { text: 'Value', dataField: 'Value', width: '20%', },
            //{ text: 'Edit', dataField: 'Edit', width: '10%', cellsrenderer: imagerenderer, },
            //{ text: 'Remove', dataField: 'Remove', width: '10%', cellsrenderer: imagerenderer, },

        ]
    });


}
var imagerenderer = function (row, datafield, value) {
    switch (datafield) {

        case "Edit": return getEditButton(row, value); break;
        case "Remove": return getDeleteButton(row, value); break
        case "Select": return getSelectButton(row, value); break;
        case "NAME": return getAttribute(row, value); break;

        case "Action": return getAction(row, value, datafield); break;

        default: break;
    }
}

function getAction(row, value, datafield) {

    if (datafield == "Action") {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
        var SegmentID = ViewObj.SegmentID;
        var editButton = '<a href="#" onclick="editSelectedrow(' + row + ');" style="text-align:center; margin-top:-5px;display:block;color:#000;" ><i class="fa fa-pencil-square-o Gridimage" style="margin-top:2px" data-toggle="modal" data-target="#add_attri_popup" title="Edit" ></i></a>';
        var RemoveButton = '<a href="#" style="text-align:center; margin-top:-6px;display:block;color:#f20202;"  onclick="deleteSelectedrow(' + row + ');"><i class="fa fa-times Deleteimage" style="margin-top:8px"  title="Delete" id="delete"></i></a>';
        return '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + RemoveButton + '</td></tr></table></center>';
    }
}




function getEditButton(row, value, datafield) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
    var SegmentID = ViewObj.SegmentId;
    //var DeleteButton = '<a href="#" " style="text-align:center; margin-top:-6px;display:block;"  onclick="deleteSelectedrow(' + row + ');"><img id="delete"  src="../images/icon-delete.png" class="Deleteimage" title="Delete"/></a>';
    var editButton = '<a href="#" onclick="editSelectedrow(' + row + ');" style="text-align:center; margin-top:-5px;display:block;color:#000;" ><i class="fa fa-pencil-square-o Gridimage" style="margin-top:2px" data-toggle="modal" data-target="#add_attri_popup" title="Edit" ></i></a>';
    return '<center><table><tr><td style="Padding-Left:8px;">' + editButton + '</td></tr></table></center>'
}
function getDeleteButton(row, value, datafield) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
    var SegmentID = ViewObj.SegmentId;
    var RemoveButton = '<a href="#" " style="text-align:center; margin-top:-6px;display:block;color:#f20202;"  onclick="deleteSelectedrow(' + row + ');"><i class="fa fa-times Deleteimage" style="margin-top:8px"  title="Delete" id="delete"></i></a>';
    return '<center><table><tr><td>' + RemoveButton + '</td><td style="Padding-Left:8px;"></tr></table></center>'
}
function getSelectButton(row, value, datafield) {
    var ViewObj = $('#jqxgrid1').jqxGrid('getrowdata', row);
    var AttributeId = ViewObj.AttributeId;

    var editButton = '<a href="#" onclick="selectattributerow(' + row + ');"  style="text-align:center; margin-top:-5px;display:block;color:#000;" ><i class="fa fa-pencil-square-o Gridimage"  data-dismiss="modal" title="Select" style="margin-top: 6px;" ></i> </a>';
    return '<center><table><tr><td style="Padding-Left:8px;    ">' + editButton + '</td></tr></table></center>'
}

function getAttribute(row, value, datafield) {
    var ViewObj = $('#jqxgrid1').jqxGrid('getrowdata', row);
    var AttributeId = ViewObj.AttributeId;
    var AttributeName = ViewObj.NAME

    var Attribute = '<div id="Attribute" onclick="selectattributerow(' + row + ');" data-dismiss="modal"  style="text-align:left; margin-bottom:-5px display:block;color:#000; cursor:pointer" > ' + AttributeName + '</div>';
    return '<table><tr><td style="Padding-Left:8px;line-height:25px;">' + Attribute + '</td></tr></table>'
}
function editSelectedrow(row) {
    resetAttribute();
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
    var AttributeId = ViewObj.AttributeId;
    $("#AttributeId").val(ViewObj.AttributeId);
    $("#txtAttributeName").val(ViewObj.AttributeName);
    $('#ddlCondition').val(ViewObj.Condition);
    $('#txtValue').val(ViewObj.Value);
    $.each(arr, function (i, item) {
        var user = arr[i];
        //if (user.AttributeId == AttributeId) {
        if (i == row) {
            //removes an item here
            arr.splice(i, 1);
        }
    });


}
function selectattributerow(row) {

    var ViewObj = $('#jqxgrid1').jqxGrid('getrowdata', row);
    var AttributeId = ViewObj.AttributeId;
    $("#AttributeId").val(ViewObj.AttributeId);
    $("#txtAttributeName").val(ViewObj.NAME);

}
function ConvertData() {
    try {
        Tables = new Array();
        $.map(SegmentData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        SegmentTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}
function ConvertArray() {
    try {

        $.map(SegmentData.Table, function (obj, i) {
            arr.push({
                AttributeId: obj.AttributeId,
                AttributeName: obj.AttributeName,
                Condition: obj.Condition,
                Value: obj.Value
            });


        });

    }
    catch (e) {
        console.log(e.message)
    }
}
function deleteSelectedrow(row) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);

    var AttributeId = ViewObj.AttributeId;

    $.each(arr, function (i, item) {
        var user = arr[i];
        //if (user.AttributeId == AttributeId) {
        if (i == row) {
            //removes an item here
            arr.splice(i, 1);
        }
    });

    LoadGridafterDelete(arr);
}
function LoadGridafterDelete(arr) {
    //var data = { "AttributeId": AttributeId, "AttributeName": AttributeName, "Condition": Condition, "Value": Value };
    //arr.push(data);
    autoheightPrimary = false;
    autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {

        datafields: [

            { name: 'AttributeId' },
            { name: 'Edit' },
             { name: 'Remove' },
            { name: 'AttributeName' },
            { name: 'Condition' },
              { name: 'Value' },

        ],
        async: false,
        record: 'Table',
        sortable: true,
        //datatype: "array",
        localdata: arr,
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );


    if ($(window).width() <= 1400) {
        $("#jqxgrid").jqxGrid({
            height: GridHeight * .96,
        });

    }




    $("#jqxgrid").jqxGrid({
        width: "100%",

        autoheight: false,
        height: GridHeight * .70,
        columnsheight: 38,
        source: dataAdapter,
        sortable: true,
        // selectionmode: 'checkbox', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        altrows: true,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [

            { text: 'AttributeId', dataField: 'AttributeId', width: '0%', hidden: true, },
             { text: 'Action', dataField: 'Action', width: '10%', cellsrenderer: imagerenderer, }, // Added by RS 
            { text: 'Attribute Name', dataField: 'AttributeName', width: '35%', },
            { text: 'Condition', dataField: 'Condition', width: '35%', },
            { text: 'Value', dataField: 'Value', width: '20%', },
       //   { text: 'Edit', dataField: 'Edit', width: '10%', cellsrenderer: imagerenderer, },
       //   { text: 'Remove', dataField: 'Remove', width: '10%', cellsrenderer: imagerenderer, },

        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}
//End of grid functions



//Cancel button functions
function resetAttribute() {
    $("#txtAttributeName").val('');
    $("#AttributeId").val('');
    $('#ddlCondition').val('');
    $('#txtValue').val('');
    $('#add_attri_popup').modal('hide')
   // $('.closepopupsegmentation').trigger('click');
}
function ResetSegment() {
    $('#txtSegmentName').val('');
    $('#txtSegmentCode').val('');
    $('#txtDescription').val('');
    $("#ddlType").val('');
    $("#ddlServiceType").val('');
    arr = [];
    LoadGridafterClear(arr);

}
//End of  cancel button functions


function LoadGridafterClear(arr) {

    autoheightPrimary = false;
    autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {

        datafields: [

            { name: 'AttributeId' },
            { name: 'Edit' },
            { name: 'AttributeName' },
            { name: 'Condition' },
              { name: 'Value' },

        ],
        async: false,
        record: 'Table',
        sortable: true,
        //datatype: "array",
        localdata: arr,
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );


    //if ($(window).width() <= 1400) {
    //    $("#jqxgrid").jqxGrid({
    //        height: GridHeight * .96,
    //    });

    //}



    $("#jqxgrid").jqxGrid({
        width: "100%",

        autoheight: false,
        height: GridHeight * .70,
        columnsheight: 38,
        source: dataAdapter,
        sortable: true,
        //selectionmode: 'checkbox', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        altrows: true,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [

            { text: 'AttributeId', dataField: 'AttributeId', width: '0%', hidden: true, },
            { text: 'Action', dataField: 'Edit', width: '20%', cellsrenderer: imagerenderer, },
            { text: 'Attribute Name', dataField: 'AttributeName', width: '30%', },
            { text: 'Condition', dataField: 'Condition', width: '30%', },
            { text: 'Value', dataField: 'Value', width: '20%', },


        ]
    });

    //$("#jqxgrid").on('bindingcomplete', function () {
    //    if ($(window).width() < 1025) {
    //        $("#jqxgrid").jqxGrid('autoresizecolumns');
    //    }
    //});
}
function DrawMsgBody() {
    var result = ''
    var str = '';
    var strvalue = $('#ddlAttribute').val;
    var strCondition = $('#ddlCondition').val;
    var strvalue = $('#txtvalue').val;
    str += '<tr>';
    str += '<td><div class="add_row_action">';
    str += '<input type="checkbox" style="float:left;"/>';
    str += '<a href="#" ><img  src="../images/icon-edit.png" class="Gridimage" title="Edit"/></a>';
    str += '<a href="#" ><img  src="../images/icon-delete.png" class="Gridimage" title="delete"/></a></div></td>';
    str += '<td><a href="segmentations_info.html" style="text-decoration:none;">Segment 1</a></td>';
    str += '<td>Condition 1</td>'
    str += '<td>Value 1</td>';
    str += '</tr>';


    $('#tbdyAttribute').append(str);
}
function GetDropDownData() {
    // Get the DropDownList.
    var ddlTestDropDownListXML = $('#ddlTestDropDownListXML');

    // Provide Some Table name to pass to the WebMethod as a paramter.
    var tableName = "someTableName";

    $.ajax({
        type: "POST",
        url: "BindDropDownList.aspx/GetDropDownItems",
        //data: '{tableName: "' + tableName + '"}',
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (response) {
            // Now find the Table from response and loop through each item (row).
            $(response.d).find(tableName).each(function () {
                // Get the OptionValue and OptionText Column values.
                var OptionValue = $(this).find('OptionValue').text();
                var OptionText = $(this).find('OptionText').text();

                // Create an Option for DropDownList.
                var option = $("<option>" + OptionText + "</option>");
                option.attr("value", OptionValue);

                ddlTestDropDownListXML.append(option);
            });
        },
        failure: function (response) {
            alert(response.d);
        }
    });
}
function SaveUpdateSegmentAttribute() {
    try {
        createXml(arr);
        mode = 0;

        var params = { 'Action': mode, 'AttributeId': AttributeId, 'Condition': Condition, 'Value': Value, 'Array': arr };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "crm-add-segmentations.aspx/SaveUpdateSegmentAttribute",
            data: JSON.stringify(params),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                var result = JSON.parse(data.d);
                if (result.Table[0].Status == 1) {
                    alert(result.Table[0].Message);
                }
                else {
                    alert(result.Table[0].Message);
                }

            },
            error: loader.hideloader(),
        });

        //}
    }
    catch (e) { loader.hideloader(); }
}

//Attribute POP UP Functions
function BindAttributeGrid() {
    var param = { 'iMode': 4, 'SegmentType': Type };
    CallAjaxAttribute(Error, param);
    // LoadAttributeGrid();
}
function LoadAttributeGrid() {
    autoheightPrimary = false;
    autoheightbool = true;
    //Getting the source data with ajax GET request
    source = {

        datafields: [

            { name: 'AttributeId' },
            { name: 'Select' },
            { name: 'NAME' },


        ],
        async: false,
        record: 'Table',
        sortable: true,
        //datatype: "array",
        localdata: databindtogrid,
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );


    if ($(window).width() <= 1400) {
        $("#jqxgrid1").jqxGrid({
            height: GridHeight * .96,
        });

    }




    $("#jqxgrid1").jqxGrid({
        width: "100%",
        height: "270px",

        autoheight: false,
        // height: GridHeight * .70,
        columnsheight: 38,
        source: dataAdapter,
        sortable: true,
        // selectionmode: 'checkbox', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        altrows: true,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [

            { text: 'AttributeId', dataField: 'AttributeId', width: '0%', hidden: true, },

            { text: 'Attribute Name', dataField: 'NAME', width: '100%', cellsrenderer: imagerenderer, },

 { text: 'Select', dataField: 'Select', width: '0%', cellsrenderer: imagerenderer, hidden: true },

        ]
    });


}

function CallAjaxAttribute(fnError, param) {
    try {
        //  loader.showloader();
        $.ajax({
            type: "POST",
            url: "crm-add-segmentations.aspx/getAllAttributes",
            data: JSON.stringify(param),
            //async: false,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            //data: { id: 'k' },
            success: function (response, status, type) {
                AttributeData = $.parseJSON(response.d);
                ConvertAttributeData();
                var length = parseInt(AttributeTable.Tables[0].Rows.length);
                if (length > 0) {
                    databindtogrid = AttributeTable.Tables[0].Rows;
                    $('#nodata_div').hide();
                    $('#graphDiv1').show();
                    LoadAttributeGrid();
                }
                else {
                    $('#nodata_div').show();
                    $('#graphDiv1').hide();
                }

                //  loader.hideloader();
            },
            error: fnError,
        })
    }
    catch (e) { loader.hideloader(); }

}

function ConvertAttributeData() {
    try {
        Tables = new Array();
        $.map(AttributeData, function (obj, i) {
            Tables.push({
                name: i,
                Rows: obj,
            });
        });
        AttributeTable['Tables'] = Tables;
    }
    catch (e) {
        console.log(e.message)
    }
}

function ValidatePage(tblid) {
    var isvalid = true;
    var ctrlObj = [];
    var ctrls = $('#' + tblid + ' [mandatory="1"]');
    for (j = 0; j < ctrls.length; j++) {
        if (($('#' + ctrls[j].id).val() == "") || ($('#' + ctrls[j].id).val() == null)) {
            ctrlObj.push(ctrls[j]);
        }
    }
    if (ctrlObj.length > 1) {
        alert('Please enter all the mandatory information.');
        return false;
    }
    else if (ctrlObj.length == 1) {
        $(ctrlObj).each(function () {
            if ($(this).val() == '') {
                if ((this.tagName).toLowerCase() == 'input') {
                    alert('Please Enter ' + this.title + '.');
                }
                else if ((this.tagName).toLowerCase() == 'textarea') { alert('Please Enter ' + this.title + '.'); }
                else { alert('Please Select ' + this.title + '.'); }
                $(this).focus();
                isvalid = false;
                return false;
            }
        });
        return isvalid;
    }
    else if (ctrlObj.length == 0) {
        return true;
    }
}