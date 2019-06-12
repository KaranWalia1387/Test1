var databindtogrid;
var RawDataBanner;
var module_name;
var BannerContent;
var NavigationMode;
var LinkURL;
var src = '';
var filename = '';
var ImgSource = '';
var ModuleID;
function File_Changed(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    $("#nofile").html(filename);
    if (filename == "") {
        $('#btnRemoveFile').hide();
    }
    else {
        $('#btnRemoveFile').show();
    }
}

function removeFile() {
    $('#FileUpload1').val('');
    var control = $("#FileUpload1");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    $("#nofile").html('No File Chosen');
    $('#imgbanner1').attr('src', '../images/noimage.png');
    return false;
}

function File_Change(objfileupload, objimg, objdiscard, bannerno, sender) {
    try {
        var filename = $(sender).val().replace(/^.*[\\\/]/, '');
        $("#nofile").html(filename);
        if (filename == "") {
            $('#btnRemoveFile').hide();
        }
        else {
            $('#btnRemoveFile').show();
        }

        var files = $("#" + objfileupload).get(0).files;
        if (files.length > 0) {
            var Extension = files[0].name.substring(files[0].name.lastIndexOf('.') + 1).toLowerCase();
            if (Extension == "png" || Extension == "jpeg" || Extension == 'jpg') {
                var fReader = new FileReader();
                fReader.readAsDataURL(files[0]);
                fReader.onloadend = function (event) {
                    if (event.target.result != null) {
                        $('#' + objimg).attr('src', event.target.result);
                    }
                    else {
                        $('#' + objimg).attr('src', '');
                    }
                }
            }
            else {
                alert("File extensions allowed: png, jpg and jpeg.");
                ResetImage(bannerno);
                return false;
            }

            //Validate filesize
            var fileSize = 0;
            fileSize = files[0].size || files[0].fileSize; //size in kb
            fileSize = fileSize / 1048576; //size in mb
            if (fileSize > 5) {
                alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
                ResetImage(bannerno);
                return false;
            }
        }
    }
    catch (e) { }
}

$(document).ready(function () {
    try {
        $(".fancybox-effects").fancybox({
            helpers: {
                overlay: {
                    speedOut: 0
                }
            }
        });

        $('.checkButton').click(function () {
            if ($(this).prop("checked", true)) {
                $('.checkButton').prop("checked", true);
                $(this).prop("checked", false);
                if ($(this).val() == '1') {
                    $('#ExternalLink').prop("checked", true);
                    $('#txtExternalLink').css('display', 'block');
                    $('#InternalLink').prop("checked", false);
                    $('#txtInternalLink').css('display', 'none');
                    AddMandatoryAttributeToElement($('#txtExternalLink'));
                    RemoveMandatoryAttributeFromElement($('#txtInternalLink'));
                }
                else {
                    $('#InternalLink').prop("checked", true);
                    $('#txtInternalLink').css('display', 'block');
                    $('#ExternalLink').prop("checked", false);
                    $('#txtExternalLink').css('display', 'none');
                    AddMandatoryAttributeToElement($('#txtInternalLink'));
                    RemoveMandatoryAttributeFromElement($('#txtExternalLink'));
                }
            }
            else {
                $('.checkButton').prop("checked", false);
                $(this).prop("checked", true);
            }
        });

        LoadGridData();
        $('#btnDiscard1').click(function () { ResetImage('1'); $(this).hide(); });

        $('#btnUpdateText').click(function () { updateText(module_name, $('#txtText').val(), $('#txtspanishtext').val(), $('#txtHyperlink').val()); });

        $(document).on("click", ".edittextimg", function () {
            var gridrowid = $(this).attr('id');
            module_name = databindtogrid[gridrowid].BannerName;
            BannerContent = databindtogrid[gridrowid].BannerContent;
           
            if (BannerContent == "") {
                $('#btnRemoveFile').hide();
            }
            else {
                var attachementname = BannerContent.substr(0, BannerContent.lastIndexOf('_'));
                var extension = BannerContent.substr(BannerContent.lastIndexOf('.') + 1, BannerContent.length);
                var attachedFileName = attachementname + '.' + extension;
                $("#nofile").html(attachedFileName);
                $('#btnRemoveFile').show();
            }
            $('#lblModule').text(module_name);
            //$('#ddlModuleid option:selected').text(module_name);
            //$('#ddlModuleid option:selected').val(databindtogrid[gridrowid].BannerID);
            ModuleID = databindtogrid[gridrowid].BannerID;
            if (databindtogrid[gridrowid].NavigationMode) {
                $("input[name=radioName][value='1']").attr('checked', 'checked');
            }
            else
                $("input[name=radioName][value='0']").attr('checked', 'checked');
            if (databindtogrid[gridrowid].LinkURL.lastIndexOf('aspx') > 0) {
                $('#InternalLink').prop("checked", true);
                $('#txtInternalLink').css("display", "block");
                $('#txtInternalLink').val(databindtogrid[gridrowid].LinkURL);
                $('#ExternalLink').prop("checked", false);
                $('#txtExternalLink').hide();
                $('#txtExternalLink').css("display", "none");
                AddMandatoryAttributeToElement($('#txtInternalLink'));
                RemoveMandatoryAttributeFromElement($('#txtExternalLink'));
            }
            else {
                $('#ExternalLink').prop("checked", true);
                $('#txtExternalLink').css('display', 'block');
                $('#txtExternalLink').val(databindtogrid[gridrowid].LinkURL);
                AddMandatoryAttributeToElement($('#txtExternalLink'));
                RemoveMandatoryAttributeFromElement($('#txtInternalLink'));
                $('#InternalLink').prop("checked", false);
                $('#txtInternalLink').hide();
                $('#txtInternalLink').css('display', 'none');
            }
            LoadImage();
        });

        $('#ddlModuleid').change(function () {
            LoadImage();
        });

        function saveUloadedFile() {
            loader.showloader();
            var data = new FormData();

            var files = $("#FileUpload2").get(0).files;

            // Add the uploaded image content to the form data collection
            if (files.length > 0) {
                data.append("UploadedImage", files[0]);
            }
            var flName = '';
            var ajaxRequest = $.ajax({
                type: "POST",
                async: false,
                url: "../Upload.ashx?Path=Banners",
                contentType: false,
                processData: false,
                data: data,
                success: function (data) {
                    flName = data;
                    loader.hideloader();
                }
            });

            ajaxRequest.done(function (xhr, textStatus) {
                // Do other operation
            });

            return flName;
        }

        $('#btnChangebanner').click(function () {            
            loader.showloader();
            if (ValidateCongPage('myid')) {
                if (!IsFileValidForUpload()) {
                    alert('Invalid file type select; file extentions allowed are : gif, png, bmp, jpg, jpeg, txt and rtf.');
                    return false;
                }
                $('#advanceSearch').hide();

                var file = document.getElementById('FileUpload2');
                if (file.files.length > 0) {
                    src = saveUloadedFile();
                    attachmentType = file.files[0].name.split('.')[1];
                }
                else
                    src = BannerContent;
                var moduleid = $('#ddlModuleid').val();
                var ModuleName = '';
                var Hyperlink = '';

                NavigationMode = $("input[name=radioName]:checked").val();
                if ($("input[name=radiocheck]:checked").val() == 0) {
                    LinkURL = $('#txtInternalLink').val();
                }
                else if ($("input[name=radiocheck]:checked").val() == 1) {
                    LinkURL = $('#txtExternalLink').val();
                }

                var param = {
                    Moduleid: ModuleID,
                    filename: src,
                    NavigationMode: NavigationMode,
                    LinkURL: LinkURL,
                }

                $.ajax({
                    type: "POST",
                    url: "configurebanner.aspx/UpdateBanner",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function OnSuccess(response) {
                        alert('Banner has been changed successfully');
                        LoadGridData();
                        $('#advanceSearch').modal('toggle');
                        loader.hideloader();
                    },
                    error: function (request, status, error) {
                        alert(error);
                        alert(status);
                        loader.hideloader();
                    },
                    failure: function (response) {
                        loader.hideloader();
                        alert('Banner not changed, Please try again.');
                    }
                });
            }
            else {
                loader.hideloader();
                return false;
            }
        });
    }
    catch (e) { loader.hideloader(); }
});

function LoadImage() {
    var Image;
    if (databindtogrid != "") {
        for (var i = 0; i < databindtogrid.length; i++) {
            if (databindtogrid[i].BannerName == $('#lblModule').text()) {
                Image = ImgSource = "../Attachments/Banners/" + databindtogrid[i].BannerContent;
                $('#imgbanner1').attr({ 'src': Image, 'onerror': 'imgError(this)' });
                $('#FileUpload2').attr('src', Image);
            }
        }
    }
}

function ajaxupload(rowid, data) {
    try {
        var ajaxRequest = $.ajax({
            type: "POST",
            url: "../api/fileupload/UploadOutageFile",
            contentType: false,
            processData: false,
            data: data
        });

        ajaxRequest.done(function (responseData, textStatus) {
            if (textStatus == 'success') {
                if (responseData != null) {
                    saveData(rowid, responseData);
                }
                else {
                    alert('Error in file uploading, Please try again later.');
                    return false;
                }
            } else {
                alert('Error in file uploading, Please try again later.');
                return false;
            }
        });
    }
    catch (e) { }
}

function LoadBanners() {
    try {
        $.ajax({
            type: "POST",
            url: "configure-reportoutage.aspx/LoadBanners",
            data: "{'moduleid':1}",
            //data:"",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function OnSuccess(response) {
                try {
                    if (response != null && response.d != null) {
                        var parsedData = JSON.parse(response.d);
                        if (parsedData.length > 0) {
                            Nodata(false);
                            RawDataBanner = parsedData;
                            BindBanners('1');
                        }
                        else {
                            Nodata(true);
                        }
                    }
                    else {
                        Nodata(true);
                    }
                }
                catch (e) { Nodata(true); }
            },
            async: true,
            failure: function (response) {
                Nodata(true);
            }
        });
    }
    catch (e) {
        Nodata(true);
    }
}

function BindBanners(rowid) {
    try {
        if (rowid == '1') {
            $('#imgbanner1').attr('src', RawDataBanner[0].Image);
            $('#imgbanner1').attr('ModuleName', RawDataBanner[0].ModuleName);
            $('#fileUpload1URL').val(RawDataBanner[0].HyperLink);
        }
    }
    catch (e) { }
}

function ResetImage(rowid) {
    try {
        if (rowid == 1) {
            $('#FileUpload2').val('');
            $('#imgbanner1').attr('src', '');
        }
    }
    catch (e) { }
}

function LoadGridData() {
    try {
        loader.showloader();
        yaxis = '';
        $.ajax({
            type: "POST",
            url: "ConfigureBanner.aspx/LoadData",
            data: "",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function OnSuccess(response) {
                try {
                    if (response != null && response.d != null) {
                        var parsedData = $.parseJSON(response.d).Table;
                        databindtogrid = parsedData;
                        LoadGrid();
                        LoadImage();
                        loader.hideloader();
                    }
                    else {
                    }
                }
                catch (e) { loader.hideloader(); }
            },
            async: true,
            failure: function (response) {
            }
        });
    }
    catch (e) {

    }
}

var imagerenderer = function (row, datafield, value) {
    
    switch (datafield) {
        case "Edit": return getEditCell(row, value); break;
        case 'BannerOriginalContent':
            if (value == '')
                return '<a class="fancybox-effects" href="../images/noimage.png" ><img  src="../images/noimage.png"  onerror="imgError(this)" class="GridImage" style="text-align: center;display: block;    width: 62px;margin: 8px auto 3px;"/></a>';
            else
                return '<a class="fancybox-effects" href="../Attachments/Banners/' + value + '" ><img  src="../Attachments/Banners/' + value + '" onerror="imgError(this)" class="GridImage" style="text-align: center;display: block;width: 43px;border-radius: 4px;margin: 7px auto;"/></a>';
        default: break;
    }
}

function imgError(image) {
    
    image.onerror = "";
    image.src = "../images/noimage.png";
    return true;
}

function getEditCell(row, value) {

    try {
        $('#imgbanner1').attr('src', "");
        var imgid = row;
        var src = "../images/icon-edit.png";
        return '<div style="text-align: center;"><a href="#" id=' + imgid + ' data-toggle="modal" class="edittextimg" data-target=".advanceSearch"><i class="fa fa-pencil-square-o Gridimage" style="margin-top:7px; color:#000;" id=' + imgid + '" title="Update Banner" ></i></a></div>';
    }
    catch (e) { return ""; }
}

function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length == 0) {
        $('#nodata_div').show();
    }
    else {
        $('#nodata_div').hide();
    }
    if (databindtogrid.length <= 10)
        autoheightPrimary = true;

    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [
        { name: 'BannerID' },
        { name: 'BannerName' },
        { name: 'BannerContent' },
        { name: 'Alternatetext' },
        { name: 'BannerOriginalContent' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        height: GridHeight * .94,
        source: dataAdapter,
        source: dataAdapter,
        columnsheight: 38,
        rowsheight: 34,
        altrows: true,
        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
              { text: 'Action', dataField: 'Edit', width: '8%', cellsrenderer: imagerenderer },
              { text: 'Banner ID', dataField: 'BannerID', width: '10%', hidden: true },
              { text: 'Banner Name', dataField: 'BannerName', width: '20%' },
              { text: 'Image Name', dataField: 'BannerContent', width: '30%' },
              { text: 'Alternate Text', dataField: 'Alternatetext', width: '22%' },
              { text: 'Image', dataField: 'BannerOriginalContent', width: '20%', cellsrenderer: imagerenderer },
        ]
    });

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}

function updateText(ModuleName, Text, Spanishtext, HyperLink) {
    if (Text.trim() == '') {
        alert('Please enter text.');
        $('#txtText').focus();
        return false;
    }


    var moduleid = '1';
    try {
        yaxis = '';
        $.ajax({
            type: "POST",
            url: "configure-dashboard.aspx/UpdateGrid",
            data: "{'Moduleid':" + moduleid + ",'ModuleName':'" + ModuleName + "','Text':'" + Text + "','Spanishtext':'" + Spanishtext + "','HyperLink':'" + HyperLink + "'}",
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function OnSuccess(response) {
                try {
                    if (response != null && parseFloat(response.d) > 0) {
                        alert('Text updated successfully.')
                        $("#btnClose").trigger('click');
                        LoadGridData();
                    }
                    else {
                        alert('Text not changed, Please try again.');
                    }
                }
                catch (e) { alert('Failure.'); }
            },
            async: true,
            failure: function (response) {
                alert('Text not changed, Please try again.');
            }
        });
    }
    catch (e) {
        alert('Text not changed, Please try again.');
    }
}

function Reset() {
    try {
        $('#FileUpload2').val('');
        $('.discard').hide();
    }
    catch (e) { }
}

function Nodata(isnodata) {
    try {
        if (isnodata) {
            $('input[type="file"]').val('');
            $('input[type="file"]').prop("disabled", true);
            $('input[type="text"]').prop("disabled", true);
            $('input[type="button"]').prop("disabled", true);
            alert('No data found.');
        }
        else {
            $('input[type="file"]').val('');
            $('input[type="file"]').prop("disabled", false);
            $('input[type="text"]').prop("disabled", false);
            $('input[type="button"]').prop("disabled", false);
        }
    }
    catch (e) { }
}

function IsFileValidForUpload() {

    for (var i = 0; i < $("#FileUpload2").get(0).files.length; i++) {

        fileName = $("#FileUpload2").get(0).files[i].name;

        var nameArr = $("#FileUpload2").get(0).files[i].name.split('.');
        if (nameArr[nameArr.length - 1] == 'gif' || nameArr[nameArr.length - 1] == 'png' || nameArr[nameArr.length - 1] == 'bmp' || nameArr[nameArr.length - 1] == 'jpg' || nameArr[nameArr.length - 1] == 'jpeg' || nameArr[nameArr.length - 1] == 'txt' || nameArr[nameArr.length - 1] == 'rtf')
            return true;
        else {
            if (nameArr[nameArr.length - 1] == 'exe') {
                return false;
            }
            else if (nameArr[nameArr.length - 1] == 'dll') {
                return false;
            }
            return false;
        }
    }
    return true;
}

function ValidateCongPage(tblid) {
    var isvalid = true;
    var cnt = 0;
    var ctrlObj = $('#' + tblid + ' [mandatory="1"]');
    $(ctrlObj).each(function () {
        if ($(this).val() == '' && ($(this).css('display') != 'none')) {
            cnt++;
        }
    });
    if (cnt > 1) {
        alert('Please fill all mandatory fields.');
        return false;
    }
    $(ctrlObj).each(function () {

        if ($(this).val() == '') {
            if ((this.tagName).toLowerCase() == 'input') {
                alert('Please enter ' + this.title + '');
            }
            else if ((this.tagName).toLowerCase() == 'select') {
                alert('Please select ' + this.title + '');
            }
            $(this).focus();
            isvalid = false;
            return false;
        }
    });
    return isvalid;
}