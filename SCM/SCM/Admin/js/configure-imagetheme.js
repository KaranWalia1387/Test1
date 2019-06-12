function File_OnChange(sender) {
    if (sender.id == "flUploadHeader") {
        $('#btnRemoveHeader').show();
    }
    if (sender.id == "flUploadTheme") {
        $('#btnRemoveTheme').show();
    }
    else if (sender.id == "flUploadLogin") {
        $('#btnRemoveLogin').show();
    }
    else if (sender.id == "flUploadDefault") {
        $('#btnRemoveDefault').show();
    }
    else if (sender.id == "flUploadEnergy") {
        $('#btnRemoveEnergy').show();
    }
    else if (sender.id == "fluploadSprite") {
        $('#btnRemoveSprite').show();
    }
    else if (sender.id == "flUploadSave") {
        $('#btnRemoveSave').show();
    }
    else if (sender.id == "flUploadStation") {
        $('#btnRemoveStation').show();
    }
}

function xxValidateFileUpload() {
    var fuDataHeader = $('#flUploadHeader');
    var fuDataLogin = $('#flUploadLogin');
    var fuDataDefault =$( '#flUploadDefault');
    var fuDataEnergy = $('#flUploadEnergy');
    var fuDataSprite = $('#fluploadSprite');
    var fuDataSave =$( '#flUploadSave');
    var fuDataStation = $('#flUploadStation');

    var hdnImage = $('#hdnImage');
    if (hdnImage.val() == "") {
        alert("Set Images Uploading Path.");
        return false;
    }
    var hdnTheme = $('#hdnTheme');
    if (hdnTheme.value == "") {
        alert("Set Theme file Uploading Path.");
        return false;
    }

    if (fuDataHeader.val() != '') {

        var FileUploadPath = fuDataHeader.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            //return true;
            FileUploadPath == '';
        }
        else {
            alert("Image extension is allowed : .png");
            return false;
        }
    }
    else {
        alert("Upload Header Image.");
        return false;
    }
    if (fuDataLogin.val() != '') {
        var FileUploadPath = fuDataLogin.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            //return true;
            FileUploadPath == '';
        }
        else {
            alert("Image extension is allowed : .png");
            return false;
        }
    }
    else {
        alert("Upload Login Image.");
        return false;
    }
    if (fuDataDefault.val() != '') {
        var FileUploadPath = fuDataDefault.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            if ($("#txtcolor").val() == "#000000") {
                alert("Select color to apply theme.");
                return false;
            }
            else {
                return true;
            }
            FileUploadPath == '';
        }
        else {
            alert("Image extension is allowed : .png");
            return false;
        }
    }
    else {
        alert("Upload Default button Image.");
        return false;
    }
    if (flUploadEnergy.val() != '') {
        var FileUploadPath = flUploadEnergy.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            //return true;
            FileUploadPath == '';
        }
        else {
            alert("Image extension is allowed : .png");
            return false;
        }
    }
    else {
        alert("Upload Energy Efficiency Image.");
        return false;
    }
    if (fuDataSprite.val() != '') {
        var FileUploadPath = fuDataSprite.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            //return true;
            FileUploadPath == '';
        }
        else {
            alert("Image extension is allowed : .png");
            return false;
        }
    }
    else {
        alert("Upload Sprite Sheet Image.");
        return false;
    }
    if (fuDataStation.val() != '') {
        var FileUploadPath = fuDataStation.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            Theme();
            FileUploadPath == '';
        }
        else {
            alert("Image extension is allowed : .png");
            return false;
        }
    }
    else {
        alert("Upload Charging Station Image.");
        return false;
    }

}

function removeFileHeader() {
    $('#flUploadHeader').val('');
    $('#btnRemoveHeader').hide();
    return false;
}

function removeFileLogin() {
    $('#flUploadLogin').val('');
    $('#btnRemoveLogin').hide();
    return false;
}
function removeFileDefault() {
    $('#flUploadDefault').val('');
    $('#btnRemoveDefault').hide();
    return false;
}
function removeFileEnergy() {
    $('#flUploadEnergy').val('');
    $('#btnRemoveEnergy').hide();
    return false;
}
function removeFileSprite() {
    $('#fluploadSprite').val('');
    $('#btnRemoveSprite').hide();
    return false;
}
function removeFileSave() {
    $('#flUploadSave').val('');
    $('#btnRemoveSave').hide();
    return false;
}
function removeFileStation() {
    $('#flUploadStation').val('');
    $('#btnRemoveStation').hide();
    return false;
}

function CheckImagePath() {
    if (Common.CheckImagePath() == "") {
        alert("Set Images Uploading Path.");
    }
}
function CheckThemePath() {
    if (Common.CheckThemePath() == "") {
        alert("Set Theme file Uploading Path.");
    }
}

// START New UI 12/22/2014
function ValidateFileUpload() {
    var fuDataHeader = $('#flUploadHeader');
    var fuDataLogin = $('#flUploadLogin');
    var fuDataDefault = $('#flUploadDefault');
    var fuDataEnergy = $('#flUploadEnergy');
    var fuDataSprite = $('#fluploadSprite');
    var fuDataSave = $('#flUploadSave');
    var fuDataStation = $('#flUploadStation');

    var hdnImage = $('#hdnImage');
    if (hdnImage.val() == "") {
        alert("Set Images Uploading Path.");
        return false;
    }
    var hdnTheme = $('#hdnTheme');
    if (hdnTheme.value == "") {
        alert("Set Theme file Uploading Path.");
        return false;
    }

    if (fuDataHeader.val() == '' && fuDataLogin.val() == '' && fuDataDefault.val() == '' && fuDataEnergy.val() == '' && fuDataSprite.val() == '' && fuDataStation.val() == '') {
        alert("Upload at least one Image.");
        return false;
    }

    if (fuDataHeader.val() != '') {

        var FileUploadPath = fuDataHeader.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            //return true;
            FileUploadPath == '';
        }
        else {
            alert("Header image extension is allowed : .png");
            return false;
        }
    }

    if (fuDataLogin.val() != '') {
        var FileUploadPath = fuDataLogin.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            //return true;
            FileUploadPath == '';
        }
        else {
            alert("Login image extension is allowed : .png");
            return false;
        }
    }

    if (fuDataDefault.val() != '') {
        var FileUploadPath = fuDataDefault.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            //if ($("#txtcolor").val() == "#000000") {
            //    alert("Select color to apply theme.");
            //    return false;
            //}
            //else {
            //    return true;
            //}
            FileUploadPath == '';
        }
        else {
            alert("Default button image extension is allowed : .png");
            return false;
        }
    }

    if (fuDataEnergy.val() != '') {
        var FileUploadPath = fuDataEnergy.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            //return true;
            FileUploadPath == '';
        }
        else {
            alert("Energy image extension is allowed : .png");
            return false;
        }
    }

    if (fuDataSprite.val() != '') {
        var FileUploadPath = fuDataSprite.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            //return true;
            FileUploadPath == '';
        }
        else {
            alert("Sprite image extension is allowed : .png");
            return false;
        }
    }

    if (fuDataStation.val() != '') {
        var FileUploadPath = fuDataStation.val();
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "png") {
            Theme();
            FileUploadPath == '';
        }
        else {
            alert("Charging Station image extension is allowed : .png");
            return false;
        }
    }
}
// END New UI 12/22/2014

$(document).ready(function () {
    $('#btnRemoveHeader').hide();
    $('#btnRemoveLogin').hide();
    $('#btnRemoveDefault').hide();
    $('#btnRemoveEnergy').hide();
    $('#btnRemoveSprite').hide();
    $('#btnRemoveSave').hide();
    $('#btnRemoveStation').hide();
    $('#btnRemoveTheme').hide();

    $("#btnSubmit").click(function () {
        if ($("#flUploadTheme").val() != "") {
            if (GetFileSize('flUploadTheme') == true) {
                $.ajaxFileUpload({
                    type: "POST",
                    fileElementId: 'flUploadTheme',
                    url: "../../fileUploadHandler.ashx?color='" + $("#txtcolor").val() + "'",
                    secureuri: false,
                    cache: false,
                    contentType: 'text/plain',
                    dataType: "text",
                    success: function (data, status) {
                        var cnt = 0;
                        src = data;
                        if (data != '') {
                            alert('File Uploaded');
                        }
                        else {
                            alert('File Not Uploaded');
                        }

                    },
                    error: function (data, status, e) {
                    }
                });
            }

        } else {  }
    })
});

function FileTypeValidate() {

    //get filepath from fileupload control on the page
    var fileUpload = $('#flUploadTheme').val();

    //extracting part of the filename from dot
    var extension = fileUpload.substring(fileUpload.lastIndexOf('.'));

    //valid file type - static
    var ValidFileType = ".zip,.rar,.gz,.7z,.tar";

    //check whether user has selected file or not
    if (fileUpload.length > 0) {

        //check file is of valid type or not
        if (ValidFileType.toLowerCase().indexOf(extension) < 0) {
            alert("Please upload file in any of these '" + ValidFileType + "' format.");
        }
        else {
            return true;
        }
    }
    else {
        alert("please select file for upload...");
    }
    return false;
}

function removeFileTheme() {
    $('#flUploadTheme').val('');
    $('#btnRemoveTheme').hide();
    return false;
}

//function GetFileSize(fileid) {
//    try {
//        if (FileTypeValidate()) {
//            if ($("#" + fileid)[0].files != undefined) {
//                if ($("#" + fileid)[0].files.length > 0) {
//                    var f = $("#" + fileid)[0].files[0];
//                    var fileSize = 0;
//                    fileSize = f.size || f.fileSize; //size in kb
//                    fileSize = fileSize / 1048576; //size in mb
//                    if (fileSize > 5) {
//                        alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
//                        return false;
//                    }
//                    else
//                        return true;
//                }
//                else
//                    return true;
//            }
//            else
//                return true;
//        }
//        else {
//            return false;
//        }
//    }
//    catch (e) {
//        return false;
//    }
//}
