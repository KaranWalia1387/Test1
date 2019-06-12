var mode;
var databindtogrid;
var topicid;
var Imagesource = '';
function File_OnChange(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    $("#nofile").html(filename);
    if (filename == "") {
        $('#btnRemoveFile').hide();
    }
    else {
        $('#btnRemoveFile').show();
    }
}

function BindData() {
    databindtogrid = configure_connectme.LoadGrid().value.Rows;
    LoadGrid();
}

// for replacing distorted image with noimage
function imgError(image) {
    image.onerror = "";
    image.src = "../images/noimage.png";
    return true;
}

// for calling imgError function for grid image column
function NoImageDisplay() {
    $('.GridImage').each(function () {
        $(this).error(function () {
            imgError(this);
        })
    })

}

// Get the jqGrid Value with ajax Get method
function LoadGrid() {
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
            { name: 'TopicID' },
            { name: 'TopicName' },
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
        switch (datafield) {
            case "Edit": return '<div style="text-align: center;"><a href="#" ><img  src="../images/icon-edit.png" class="Gridimage"/></a></div>'; break;
            case "Delete": return '<div  style="text-align: center;"><a href="#" ><img  src="../images/delete_icon.gif" class="Gridimage" /></a></div>'; break;
            case "Action": return getControlButton(row, value); break;
            case "ImageUrl":
                if (value == '' || value==null || value.toLowerCase()=="null") {                    
                    return '<a class="fancybox-effects" href="../images/noimage.png" ><img  src="../images/noimage.png"  onerror="imgError(this)" class="GridImage" style="text-align: center;display: block;width: 30px;margin:6px auto;"/></a>';
                }
                else {
                    return '<a class="fancybox-effects" href="../Attachments/ConnectMe/' + value + '" ><img  src="../Attachments/ConnectMe/' + value + '" onerror="imgError(this)" class="GridImage" style="text-align: center;display: block;width: 30px;margin:6px auto;"/></a>';

                }
            default: break;
        }

    }
   

    //for get reset password icon showing in grid
    function getControlButton(row, value, datafield) {
        var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
        tpcId = ViewObj.TopicID;
        var topicname = ViewObj.TopicName;

        var editButton = '<a href="#" style="text-align:center; margin-top:7px;display:block;color:#000;" onclick="editSelectedTopic(' + row + ');"><i class="fa fa-pencil-square-o Gridimage" title="Edit" /></i>';
        var delButton = '<a href="#" style="text-align:center; margin-top:7px;display:block;color:#f20202;" onclick="deleteSelectedTopic(' + tpcId + ');"><i class="fa fa-times Gridimage" title="Delete"/></i>';

        var res = '';
        if (ViewObj.IsReadOnly == "false") {
            res = '<center><table><tr><td>' + editButton + '</td><td style="Padding-Left:8px;">' + delButton + '</td></tr></table></center>';
        }
        else {
           //res = '<center><table><tr><td>' + editButton + '</td></tr></table></center>';
           res = '<center><table><tr><td></td></tr></table></center>';
        }
        return res;
    }

    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        source: dataAdapter,
        height: GridHeight * .93,
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
            { text: 'TopicID', dataField: 'TopicID', hidden: true },
            { text: 'Action', datafield: 'Action', width: '90', align: 'center', cellsrenderer: imagerenderer, hidden: userUsageRights },
            { text: 'Topic', dataField: 'TopicName' },
            { text: 'Image', dataField: 'ImageUrl', width: '20%', cellsrenderer: imagerenderer }         
        ]
    });
}

function editSelectedTopic(row) {
    removeFile();
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', row);
    topicid = ViewObj.TopicID;
    var topicname = ViewObj.TopicName;
    var imgPath = ViewObj.ImageUrl;

    if (ViewObj.IsReadOnly == "true") {
        $('#txtReason').attr('readonly', true);
    }
    else $('#txtReason').removeAttr('readonly');


    $('#txtReason').val($.trim(topicname));
    mode = '1';
    $('#addReason').val('Update');
    $('#imgTopic').show();
    Imagesource = '../Attachments/ConnectMe/' + imgPath;
    $('#imgTopic').attr('src', '../Attachments/ConnectMe/' + imgPath);
    $('#imgTopic').error(function () { imgError(this) });
    $('#txtReason').focus();
    $('#popuptitle').html('Update Topic');
    Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
    $('#txtReason').focus();

    BindData();
    NoImageDisplay();
}

function deleteSelectedTopic(topicid) {
    if (confirm('Are you sure you want to delete?')) {
        var result = configure_connectme.DeleteTopic(topicid).value;
        if (result == '1')
            alert('Topic has been deleted successfully'); //As per BRD Sheet
        else
            alert('Topic not deleted,Please try again.');
        BindData();
    }
}

$(document).ready(function () {
    BindData();
    NoImageDisplay();
    var src = '';
    function uploadTopicImageAsync() {
        if (k("#fileUpload").val() != "") {
            k.ajaxFileUpload({
                type: "POST",
                fileElementId: 'fileUpload',
                url: "../Upload.ashx?Path=ConnectMe",
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
                        var result = configure_connectme.AddTopic($(obj).val(), src).value;
                        if (result == '1')
                            alert('Topic has been added successfully');
                        else
                            alert('Topic hasn\'t added because topic is too long or has special character,Please try again.');
                    }
                    else if (mode == '1') {
                        var result = configure_connectme.UpdateTopic(topicid, $(obj).val(), src).value;
                        if (result == '1')
                            alert('Topic has been updated successfully');
                        else
                            alert('Topic has nothasn\'t updated,Please try again.');
                    }
                    $(obj).val('');
                    BindData();
                    NoImageDisplay();
                },
                error: function (data, status, e) {
                    alert('Exception ' + e);
                }
            });
        }
        else {
            var obj = $('#txtReason');

            if (mode == '0') {
                var result = configure_connectme.AddTopic($(obj).val(), "null").value;
                if (result == '1')
                    alert('Topic added successfully.');
                else
                    alert('Topic hasn\'t added because topic is too long or has special character,Please try again.');
            }
            else if (mode == '1') {
                var result = configure_connectme.UpdateTopic(topicid, $(obj).val(), "null").value;
                if (result == '1')
                    alert('Topic updated successfully.');
                else
                    alert('Topic hasn\'t updated,Please try again.');
            }
            $(obj).val('');
            BindData();
            NoImageDisplay();
        }
    }
    $('#addReason').click(function () {
        src = '';
        var obj = $('#txtReason');
        var objvallower = $(obj).val().toLowerCase();
        if ($(obj).val() != '') {
            if (mode == '0') {
                for (i = 0; i < databindtogrid.length; i++) {
                    if (objvallower == databindtogrid[i].TopicName.toLowerCase()) {
                        alert('Topic Name already exists. Please enter a new Topic Name');
                        $(obj).focus();
                        return false;
                    }
                }
                if (ValidateFileUpload1($("#fileUpload").val())) {
                    uploadTopicImageAsync();
                }
                else {
                    alert('Invalid file type select; file extensions allowed are: gif, png, bmp, jpeg, pdf, doc, docx, txt, xls, xlsx, rtf, jpg');
                    return false;
                }

                
                //var result = configure_connectme.AddTopic($(obj).val(),src).value;
                //if (result == '1')
                //    alert('Topic added successfully.');
                //else
                //    alert('Topic not added,Please try again.');
            }
            else {
                for (i = 0; i < databindtogrid.length; i++) {
                    if (objvallower == databindtogrid[i].TopicName.toLowerCase()) {
                        if (databindtogrid[i].TopicID != topicid) {
                            alert('Topic already exists.');
                            $(obj).focus();
                            return false;
                        }
                    }
                }
                if (ValidateFileUpload1($("#fileUpload").val())) {
                    uploadTopicImageAsync();
                }
                else {
                    alert('Invalid file type select; file extensions allowed are: gif, png, bmp, jpeg, pdf, doc, docx, txt, xls, xlsx, rtf, jpg');
                    return false;
                }
                // var result = configure_connectme.UpdateTopic(topicid, $(obj).val()).value;
                //if (result == '1')
                //    alert('Topic updated successfully.');
                //else
                //    alert('Topic not updated,Please try again.');
            }
            Popup.hide('PopupAddTopic');

            //BindData()
            return false;
        }
        else {
            alert('Please enter Topic Name');
            $(obj).focus();
            return false;
        }
        removeFile();
    });
    function clearFields()
    {
        $('#txtReason').val('');
        $('#imgTopic').attr('src','');
        $("#fileUpload").val('');
        $('#blah').val('');
        $('#btnRemoveFile').hide();
    }
    $("#lblAddTopic").click(function () {
        clearFields();
        mode = '0';
        $('#btnRemoveFile').hide();
        $("#nofile").html('No File Chosen');
        $('#addReason').val('Add');
        Popup.showModal('PopupAddTopic', null, null, { 'screenColor': '#000', 'screenOpacity': .6 });
        $('#txtReason').focus();
        $('#popuptitle').html('Add Topic');
        $('#imgTopic').attr('src', '../images/noimage.png');//Infirefox noimage was not showing
    });

    $("#ClosePopupAddTopic").click(function () {
        $('#txtReason').val('');
        Popup.hide('PopupAddTopic');
    });
});

function removeFile() {
    $('#blah').val('');
    var control = $("#blah");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    $('#imgTopic').attr('src', Imagesource);
    $("#fileUpload").val('');
    var control = $("#fileUpload");
    control.replaceWith(control = control.clone(true));
    $("#nofile").html('No File Chosen');
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