var mode;
var databindtogrid;
var topicid;
var autoheightPrimary = false;
var Imagesource = '';
var filepath = '';

function File_OnChange(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    $("#nofile").html(filename);
    $('#imgTopic').attr('src', Imagesource);
    if (filename == "") {
        $('#btnRemoveFile').hide();
    }
    else {
        $('#btnRemoveFile').show();
    }
}

function BindData() {
    databindtogrid = configure_service.LoadGrid().value.Rows;
    LoadGrid();
}

function imgError(image) {
    image.onerror = "";
    image.src = "../images/noimage.png";
    if ($(image).parent(':first').attr('class') == "fancybox-effects")
    {
        $(image).parent(':first').attr('href', '../images/noimage.png')
    }
    return true;
}

function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 14)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
            { name: 'ReasonID' },
            { name: 'ReasonName' },
            { name: 'ImageUrl' },
            { name: 'IsReadOnly' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    var imagerenderer = function (row, datafield, value) {
        //var ReasonID = $('#jqxgrid').jqxGrid('getrowdata', row).ReasonID;

        switch (datafield) {
            case "Edit": return '<div style="text-align: center;"><a href="#" style="text-align:center; margin-top:7px;display:block;color:#000;"><i class="fa fa-pencil-square-o Gridimage" title="Edit" /></i></div>'; break;
            case "Delete": return '<div  style="text-align: center;"><a href="#" style="text-align:center; margin-top:7px;display:block;color:#f20202;"><i class="fa fa-times Gridimage" title="Delete" /></i></div>'; break;
            case "Action": return getControlButton(row, value); break;
            case "ImageUrl":
                if (value == '' || value == "null") {
                    return '<a class="fancybox-effects" href="../images/noimage.png" ><img  src="../images/noimage.png"  onerror="imgError(this)" class="GridImage" style="text-align: center;display: block;width: 90px;margin:0px auto;"/></a>';
                }
                else {
                    return '<a class="fancybox-effects" href="../Attachments/Service/' + value + '" ><img  src="../Attachments/Service/' + value + '" onerror="imgError(this)" class="GridImage" style="text-align: center;display: block;width: 31px;margin:6px auto;"/></a>';

                }
            default: break;
        }
    }

    //for get reset password icon showing in grid
    function getControlButton(row, value, datafield) {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
        rId = ViewObj.ReasonID;

        var editButton = '<a href="#" style="text-align:center; margin-top:7px;display:block;color:#000;" onclick="editSelected(' + row + ');"><i class="fa fa-pencil-square-o Gridimage" title="Edit"/></i>';
        var delButton = '<a href="#" style="text-align:center; margin-top:7px;display:block;color:#f20202;" onclick="deleteSelected(' + rId + ');"><i class="fa fa-times Gridimage" title="Delete"/></i>';
        var res = '';
        if (ViewObj.IsReadOnly == "false") {
            res = '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + delButton + '</td></tr></table></center>';
        }
        else {
            res = '<center><table><tr><td>' + editButton + '</td></tr></table></center>';
        }
        return res;
    }




    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        //autoheight: autoheightPrimary,
        height: GridHeight * .93,
        source: dataAdapter,
        columnsheight: 38,
        theme: 'darkblue',
        altrows: true,
        sortable: true,
        rowsheight: 34,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'ReasonID', dataField: 'ReasonID', hidden: true },
           { text: 'Action', dataField: 'Action', width: '90', align: 'center', cellsrenderer: imagerenderer, hidden: userUsageRights },
            { text: 'Service Type', dataField: 'ReasonName' },
        { text: 'Image', dataField: 'ImageUrl', width: '20%', cellsrenderer: imagerenderer } // , hidden: true
            //{ text: 'Delete Reason', datafield: 'Delete', width: '10%', cellsrenderer: imagerenderer },

        ]
    });
}

function removeFile() {
    $('#fileUpload').val('');
    $('#btnRemoveFile').hide();
    $("#nofile").html('No File Chosen');
    $('#imgTopic').attr('src', '../images/noimage.png');
    return false;
}

function editSelected(row) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
    reasonid = ViewObj.ReasonID;
    var ReasonName = ViewObj.ReasonName;
    var imgPath = ViewObj.ImageUrl;
    filepath = imgPath;
    if (ViewObj.IsReadOnly == "true") {
        $('#txtReason').attr('readonly', true);
    }
    else $('#txtReason').removeAttr('readonly');

    $('#txtReason').val(ReasonName);
    mode = '1';
    $('#imgTopic').show();

    Imagesource = '../Attachments/Service/' + imgPath;
    $('#imgTopic').attr('src', '../Attachments/Service/' + imgPath);
    $('#imgTopic').error(function () { imgError(this) });
    $('#addReason').val('Update');
    $('#popuptitle').html('Update Service Type');
    Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    $('#txtReason').focus();
    $('#nofile').html('No File Chosen');
    $('#btnRemoveFile').hide();
    BindData();
}
function ValidateFileUpload1(FileUploadPath) {

    if (FileUploadPath != '') {
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();

        var fileext = 'gif,png,bmp,jpeg,pdf,doc,docx,txt,xls,xlsx,rtf,jpg';
        var ext = (fileext.replace(/ /g, '').split(','));
        if (ext.indexOf(Extension) != -1) {
            FileUploadPath == '';
            return true; // Valid file type
        }
        else {
            return false; // Not valid file type
        }
    }
    else
        return true;
}

function deleteSelected(reasonid) {
    if (confirm('Are you sure you want to delete?')) {
        var result = configure_service.DeleteReason(reasonid).value;
        if (result == '1')
            alert('Service Type has been deleted successfully');
        else
            alert('Reason not deleted,Please try again.');
        BindData();
    }
}

$(document).ready(function () {
    $('#btnRemoveFile').hide();
    BindData();
    $('#imgTopic').attr('src', '');
    $("#jqxgrid").bind('cellclick', function (event) {

    });
    var src = '';
    function addServiceListImageAsync() {
        src = '';
        if ($("#fileUpload").val() != "") {
                $.ajaxFileUpload({
                    type: "POST",
                    fileElementId: 'fileUpload',
                    url: "../Upload.ashx?Path=Service",
                    secureuri: false,
                    cache: false,
                    contentType: 'text/plain',
                    dataType: "text",
                    success: function (data, status) {
                        src = data;
                        if (data != '') {
                            src = data;
                        }
                        else {
                            alert('Field Not Inserted');
                        }
                        var obj = $('#txtReason');

                        if (mode == '0') {
                            var result = configure_service.AddReason($(obj).val(), src).value;
                            if (result == '1')
                                alert('Service Type added successfully.');
                            else
                                alert('Service Type not added,Please try again.');
                        }
                        else if (mode == '1') {
                            var result = configure_service.UpdateReason(reasonid, $(obj).val(), src).value;
                            if (result == '1')
                                alert('Reason updated successfully.');
                            else
                                alert('Reason not updated,Please try again.');
                        }
                        $(obj).val('');
                        BindData();
                    },
                    error: function (data, status, e) {
                        alert('Exception ' + e);
                    }
                });
        }
        else {
            var obj = $('#txtReason');

            if (mode == '0') {
                var result = configure_service.AddReason($(obj).val(), "null").value;
                if (result == '1')
                    alert('Service Type has been added successfully');
                else
                    alert('Service Type not added,Please try again');
            }
            else if (mode == '1') {                
                var result = configure_service.UpdateReason(reasonid, $(obj).val(), filepath).value;
                if (result == '1')
                    alert('Service Type has been updated successfully');
                else
                    alert('Service Type not updated,Please try again.');
            }
            $(obj).val('');
            BindData();
        }
    }
    $('#addReason').click(function () {
        var obj = $('#txtReason');
        var objvallower = $(obj).val().toLowerCase();
        if ($(obj).val() != '') {
            if (mode == '0') {
                for (i = 0; i < databindtogrid.length; i++) {
                    if (objvallower == databindtogrid[i].ReasonName.toLowerCase()) {
                        alert('Service Type already exists');
                        $(obj).focus();
                        return false;
                    }
                }

                if (ValidateFileUpload1($("#fileUpload").val())) {
                    addServiceListImageAsync();
                }
                else {
                    alert('Invalid file type select; file extensions allowed are: gif, png, bmp, jpeg, pdf, doc, docx, txt, xls, xlsx, rtf, jpg');
                    return false;
                }

            }
            else {
                for (i = 0; i < databindtogrid.length; i++) {
                    if (objvallower == databindtogrid[i].ReasonName.toLowerCase()) {
                        if (databindtogrid[i].ReasonID != reasonid) {
                            alert('Service Type already exists');
                            $(obj).focus();
                            return false;
                        }
                    }
                }
                if (ValidateFileUpload1($("#fileUpload").val())) {
                    addServiceListImageAsync();
                }
                else {
                    alert('Invalid file type select; file extensions allowed are: gif, png, bmp, jpeg, pdf, doc, docx, txt, xls, xlsx, rtf, jpg');
                    return false;
                }

            }
            Popup.hide('PopupAddTopic');

            return false;
        }
        else {
            alert('Please enter Service Name');
            $(obj).focus();
            return false;
        }
    });

    $("#lblAddTopic").click(function () {
        mode = '0';
        $('#btnRemoveFile').hide();
        $("#nofile").html('No File Chosen');
        $('#addReason').val('Add');
        $('#popuptitle').html('Add Service Type');
        Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
        $('#txtReason').focus();
        $('#imgTopic').attr('src', '../images/noimage.png');//Infirefox noimage was not showing
    });

    $("#ClosePopupAddTopic").click(function () {
        $('#txtReason').val('');
        Popup.hide('PopupAddTopic');
    });
});