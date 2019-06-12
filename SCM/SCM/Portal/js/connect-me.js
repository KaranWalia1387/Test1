var selected = '0';
var lastopenid = '';
var commentPlaceholder = '';
var td;
$(document).ready(function () {

    try {

        if ($(".connect_email_box ul li:visible").length > 2) {
            $(".connect_email_box ul li").removeClass('custo_details_space');
        }
        else {
            $(".connect_email_box ul li").addClass('custo_details_space');
        }

        $('#txtPhoneNumber').mask('(000) 000-0000');
        $('#txtReporterPhone').mask('(000) 000-0000');
        $('#txtphoneNo').mask('(000) 000-0000');
        $('#ContentPlaceHolder1_ContentPlaceHolderBody_lblCService').mask('(000) 000-0000');
        $('#ContentPlaceHolder1_ContentPlaceHolderBody_lblBEnq').mask('(000) 000-0000');
        $("#btnChangePassword").click(function () {
            $(".w2ui-tag").addClass("w2ui_popup_box");
        });

        $(".pad").bind('click.signaturepad', function () {
            $(this).removeClass('errorbox');
            $('#signval').removeClass('errorbox');
        });

        refresh();
        $(window).on('resize', refresh);

        //BUG ID 20791 START
        document.getElementById("FileUpload1").accessKey = "K";
        //END
        //Added by khushbu kansal for bug id 14792

        //document.getElementById("ddl_topic")[0].textContent = $('#ddlSelect').text();
        var lblchoosefile = $('#lblChooseFile').text();
        $('#lblFileupload')[0].firstChild.textContent = lblchoosefile;
        $('#btnRemoveFile').hide();

        $.ajax({
            type: "POST",
            url: "Dashboard.aspx/Setbanners",
            data: '{PlaceHolderID: "' + 5 + '" }',//5 for compare spending
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                JSON.parse(response.d) == null ? $('#IDBannerConnectMe').attr('src', "images/no_img.png") : $('#IDBannerConnectMe').attr('src', JSON.parse(response.d));
                $('#IDBannerConnectMe').error(function () {
                    $(this).attr('src', 'images/no_img.png');
                });
            },
            error: function (request, status, error) {
                loader.hideloader();
            }
        });

        $('.div_reason select').val('1');

        function getQuerystring(key) {
            var query = window.location.search.substring(1);
            var vars = query.split("&");
            for (var i = 0; i < vars.length; i++) {
                var pair = vars[i].split("=");
                if (pair[0] == key) {
                    return pair[1];
                }
            }
        }

        if ($('#hdnDR').val() == '0') {
            if (getQuerystring("pid") == "p") {
                $('.div_reason').hide();
                $('#div_47').show();
                $('#divSign').show();
                $('#divComments').show();
                RemoveMandatoryAttributeFromElement($('#ddl_topic'));
                RemoveMandatoryAttributeFromElement($('#txt_Subject')); //$('#txt_Subject').attr('mandatory', '1');
                lastopenid = '47';
                selected = '47';//#5476
            }

            else if (getQuerystring("pid") == "r") {
                RemoveMandatoryAttributeFromElement($('#ddl_topic'));
                RemoveMandatoryAttributeFromElement($('#txt_Subject'));
                $('#divSign').show();
            }
            else if (getQuerystring("pid") == "o") {
                hideshowdivinselection('56');

            }
            else {
                $('#divSign').hide();
            }
        }
        var lastopenp = '#p_1'; //last open outage
        $('#ddl_topic').change(function () {
            selected = $(this).val();
            $('#txt_Subject').val('');

            hideshowdivinselection(selected);

        });

        function RemoveMandatoryAttributeFromElement(elemet) {
            $(elemet).removeAttr('mandatory');
            $(elemet).next('span').remove();
        }
        //START ASYNC
        function isFromBill_Outage() {
            if (location.href.indexOf('?') != -1) {
                var arr = location.href.split('?')[1].split('=');
                if ((arr[0] == 'pid' && (arr[1] == 'b' || arr[1] == 'o'))) {
                    return true;
                }
            }
            return false;
        }

        var src = '';
        $('#BtnSubmitComment').click(function () {
            if (ValidateFile()) {
                loader.showloader();
                //FileUpload Async START
                if ($("#FileUpload1").val() != "") {
                    if (GetFileSize('FileUpload1') == true) {
                        $.ajaxFileUpload({
                            type: "POST",
                            fileElementId: 'FileUpload1',
                            url: "Upload.ashx?Path=Notification",
                            secureuri: false,
                            cache: false,
                            contentType: 'text/plain',
                            dataType: "text",
                            forceIframeTransport: true,
                            success: function (data, status) {
                                src = data;
                                if (data != '') {
                                    src = data;
                                    sendRequestConnectMe();
                                    resetForm();
                                }
                                else {
                                    //alert($('#IDFileFailed').text());
                                    toastr.error($('#IDFileFailed').text());
                                }
                            },
                            error: function (data, status, e) {
                                loader.hideloader();
                                //alert(e);
                                toastr.error(e);
                            }
                        });
                    }
                    else { loader.hideloader(); }
                }
                else {
                    loader.showloader();
                    src = ''; sendRequestConnectMe();
                    resetForm();
                }
            }
            return false;
        });

        function sendRequestConnectMe() {
            var param = {
                jsonStr: createParameters()
            };
            $.ajax({
                type: "POST",
                url: "connect-me.aspx/SubmitConnectMeRequest",//Earlier page name was connectme.aspx which was throwing exception
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data, status) {
                    var dataset = JSON.parse(data.d);
                    $('#ddl_topic').removeAttr("disabled");
                    $('#txt_Subject').removeAttr("readonly");
                    if (dataset != null) {
                        toastr.success(dataset.Table[0]["Message"])
                        var hdnNotificationId = $('#hdnNotification').val();
                        if (hdnNotificationId == "o") {
                            window.location.href = "Outages.aspx";
                            
                        }
                        else if (hdnNotificationId == "r") {
                            window.location.href = "rebates.aspx";
                        }
                        else if (hdnNotificationId == "p") {
                            window.location.href = "Programs.aspx";
                        }

                        
                        // w2alert(dataset.Table[0]["Message"]);
                    }
                    else {
                        toastr.error($('#IDCommentFailed').text());
                        // w2alert($('#IDCommentFailed').text());
                    }
                    loader.hideloader();
                },
                error: function (request, status, error) {
                    toastr.error('Error ' + request.statusText)
                    //w2alert('Error ' + request.statusText);
                    loader.hideloader();
                }
            });
        }
        function createParameters() {
            var sub = '', comment = '', addresT = '';
            var param = "Reason=" + escape($('#ddl_topic :selected ').text());
            param += "&IsShow=0&IsPreLogin=0";
            if ($('#ddl_topic').val() != '56') {
                param += "&FirstName=" + escape($('#lblCustName').html().split(' ')[0].replace("amp;", ""));
                if ($('#lblCustName').html().split(' ')[0] != '' || $('#lblCustName').html().split(' ')[1] != undefined) {
                    param += "&LastName=" + escape($('#lblCustName').html().split(' ')[1].replace("amp;", ""));
                }
            }
            param += "&custname=" + escape($('#lblCustName').html().replace("amp;", ""));
            if (src != '') {
                param += "&AttachmentName=" + escape(src);
                src = '';
            }
            param += "&TopicId=" + $('#ddl_topic').val();
            param += "&ServiceAccountNumber=" + $('#ContentPlaceHolder1_ContentPlaceHolderBody_lblaccountno').text();
            switch ($('#ddl_topic').val()) {
                case '56':
                    param += commonParameters('56');
                    break;
                case '59':
                    param += commonParameters('59');
                    comment = htmlEncode($('#txtComment').val().trim())
                    param += "&MessageBody=" + escape(comment);
                    break;
                case '61':
                    param += theftparameters();
                    comment = htmlEncode($('#txtComment').val().trim())
                    param += "&MessageBody=" + escape(comment);
                    sub = htmlEncode($('#txt_Subject').val().trim())
                    param += "&Subject=" + escape(sub);
                    break;
                case '46':
                    var PromotionId = $('#hdnPromotionId').val();
                    var querystring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[1];
                    if (querystring == 'r') {
                        if (PromotionId != 0 || PromotionId != '') {
                            param += "&PromotionId=" + PromotionId;
                            param += "&IsDrMode=" + "1";
                        }
                    }


                    comment = htmlEncode($('#txtComment').val().trim())
                    param += "&MessageBody=" + escape(comment);
                    sub = htmlEncode($('#txt_Subject').val().trim())
                    param += "&Subject=" + escape(sub);
                    break;
                case '47':
                    param += DRParameters();
                    comment = htmlEncode($('#txtComment').val().trim())
                    param += "&MessageBody=" + escape(comment);
                    sub = htmlEncode($('#txt_Subject').val().trim())
                    param += "&Subject=" + escape(sub);
                    break;
                case '60':
                case '149':
                    comment = htmlEncode($('#txtComment').val().trim())
                    param += "&MessageBody=" + escape(comment);
                    sub = htmlEncode($('#txt_Subject').val().trim())
                    param += "&Subject=" + escape(sub);
                    addresT = htmlEncode($('#txtAddresslatlong').val().trim());
                    param += "&AddressT=" + escape(addresT);
                    break;
                default:
                    comment = htmlEncode($('#txtComment').val().trim())
                    param += "&MessageBody=" + escape(comment);
                    sub = htmlEncode($('#txt_Subject').val().trim())
                    param += "&Subject=" + escape(sub);
                    break;
            }
            if (param.indexOf("Subject") < 0) {
                param += "&Subject=" + 'Not Mentioned';
            }
            if (param.indexOf("MessageBody") < 0) {
                if ($('#ddl_topic').val() != 56) {
                    param += "&MessageBody=" + 'Message Not Given';
                }
                else {
                    param += "&MessageBody=" + $('#txtOutageComments').val().trim();
                }
            }

            return param;
        }
        function resetForm() {
            $('select').removeClass('errorbox');
            $('#txt_Subject').removeAttr("readonly");
            $('input').removeClass('errorbox');
            $('textarea').removeClass('errorbox');
            $('#ddl_topic')[0].selectedIndex = 0;
            $('#txt_Subject').attr('mandatory', '1');
            $('#txt_Subject').next().show();
            $('#txt_Subject').val('');
            $('#div_Subject').show();
            $('.div_reason').hide();
            $('#divComments').show();
            $('#txtComment').attr('mandatory', '1');
            $('#divAddresslatlong').hide();
            $('#txtAddresslatlong').val('');
            $('#txtComment').val('');
            $('#FileUpload1').val(''); $('#btnRemoveFile').hide();
            $("#nofile").html($('#lblNoFile').text());
            $('#div_outage_message').hide();
            lastopenid = '';
            selected = '0';
            $('input:checkbox').removeAttr('checked');
            if (checkQueryString() == true) {
                $('#divSign').hide();
                return false;
            }
            markMandatory('div_Subject' + ',' + '#divComments' + ',#txt_Subject', 'legend');

            //$('#txtTLocation').val('');
            $('#txtTDescription').val('');
            $('#txtTDate').val('');
            $('#txtTName').val('');
            $('#txtTAddress').val('');
            $('#txtTOccupation').val('');
            $('#txtTOther').val('');
            //$('#txtReporterName').val('');
            //$('#txtReporterAddress').val('');
            //$('#txtReporterPhone').val('');
            //$('#txtReporterEmail').val('');
            //$('#txtEmailAddress').val('');

            $('#txtFirstName').val('');
            //$('#txtLastName').val('');
            //$('#txtPhoneNumber').val('');
            $('#txtOutageComments').val('');
            $('#txtStreetNumber').val('');
            $('#txtStreetName').val('');
            $('#txtUnit').val('');
            $('#txtCity').val('');
            $('#txtZipcode').val('');
            $('#txtNearestCrossStreet').val('');
            $('#txtLocationDescription').val('');
        }
        function commonParameters(indx) {
            var comParam = '';
            comParam = "&FirstName=" + escape($('#txtFirstName').val());
            comParam += "&LastName=" + escape($('#txtLastName').val());
            // get only number from phone number
            var txtPhoneNumber = $('#txtPhoneNumber').val() != '' ? parseInt($('#txtPhoneNumber').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtPhoneNumber').val();
            comParam += "&PhoneNumber=" + escape(txtPhoneNumber);
            switch (indx) {
                case '56':
                    comParam += "&OutageType=" + escape($('#ddlOutageType option:selected').text());
                    comParam += "&Subject=" + escape($('#txt_Subject').val());
                    comParam += "&OutageAdditionalInformation=" + escape($('#txtOutageComments').val().trim());
                    break;
                case '59':
                    comParam += "&StatusOfLight=" + $('#rdoLightStatus input:checked').val();
                    comParam += "&visibledamage=" + $('#rdoVisibleDamage input:checked').val();
                    if ($('#txtDamageDescription').val().trim().length != 0) {
                        comParam += "&DamageDescription=" + escape($('#txtDamageDescription').val());
                    }
                    if ($('#txtPoleNumber').val().trim().length != 0) {
                        comParam += "&PoleNo=" + escape($('#txtPoleNumber').val());
                    }
                    break;
                default:
                    break;
            }

            if ($('#txtStreetNumber').val().trim().length != 0)
                comParam += "&StreetNumber=" + escape($('#txtStreetNumber').val());

            comParam += "&StreetName=" + escape($('#txtStreetName').val());

            if ($('#txtUnit').val().trim().length != 0) {
                comParam += "&AptUnit=" + escape($('#txtUnit').val());
            }
            comParam += "&City=" + escape($('#txtCity').val());
            comParam += "&zipcode=" + escape($('#txtZipcode').val());
            comParam += "&CrossStreet=" + escape($('#txtNearestCrossStreet').val());
            if ($('#txtLocationDescription').val().trim().length != 0)
            { comParam += "&Description=" + escape($('#txtLocationDescription').val().trim()); }
            return comParam;
        }

        function theftparameters() {
            var thParam = '';
            thParam += "&AddressT=" + escape($('#txtTLocation').val().trim());
            thParam += "&DescriptionT=" + escape($('#txtTDescription').val().trim());
            if ($('#txtTDate').val().trim().length != 0) {
                var date = common.convertlocaltoUTCForjs($('#txtTDate').val());
                thParam += "&DateT=" + date.value;
            }
            if ($('#txtTName').val().trim().length != 0) {
                thParam += "&PersonNameT=" + escape($('#txtTName').val());
            }
            if ($('#txtTAddress').val().trim().length != 0) {
                thParam += "&AddressPersonT=" + escape($('#txtTAddress').val());
            }
            if ($('#txtTOccupation').val().trim().length != 0) {
                thParam += "&OccupationPersonT=" + escape($('#txtTOccupation').val());
            }
            if ($('#txtTOther').val().trim().length != 0) {
                thParam += "&OtherT=" + escape($('#txtTOther').val());
            }
            if ($('#txtReporterName').val().trim().length != 0) {
                thParam += "&ReporterNameT=" + escape($('#txtReporterName').val());
            }
            if ($('#txtReporterAddress').val().trim().length != 0) {
                thParam += "&ReporterAddressT=" + escape($('#txtReporterAddress').val());
            }
            if ($('#txtReporterPhone').val().trim().length != 0) {
                // get only number from phone number
                var txtReporterPhone = $('#txtReporterPhone').val() != '' ? parseInt($('#txtReporterPhone').val().replace(/[^0-9\.]/g, ''), 10) : escape($('#txtReporterPhone').val());
                thParam += "&ReporterPhone=" + txtReporterPhone;
            }
            if ($('#txtReporterEmail').val().trim().length != 0) {
                thParam += "&ReporterEmailT=" + escape($('#txtReporterEmail').val());
            }
            if ($('#txtSuspectRelation').val().trim().length != 0) {
                thParam += "&SuspectRelationT=" + escape($('#txtSuspectRelation').val());
            }
            if ($('#txtEmailAddress').val().trim().length != 0) {
                thParam += "&SuspectEmailT=" + escape($('#txtEmailAddress').val());
            }
            return thParam.toString();
        }

        function DRParameters() {
            var drParam = '';
            if ($('#lbldrprogram').html().toString().length != 0) {
                drParam += "&Title=" + escape($('#lbldrprogram').html());
            }
            if ($('#lbltermsconditions').html().toString().length != 0) {
                drParam += "&Term_Condition=" + escape(($('#lbltermsconditions').text()));
            }
            if ($('#lbldisclamer').html().toString().length != 0) {
                drParam += "&Disclaimer=" + escape(($('#lbldisclamer').text()));
            }
            if ($('#txtcontectname').val().toString().length != 0) {
                drParam += "&PersonNameT=" + escape($('#txtcontectname').val());
            }
            if ($('#txtmallingaddress').val().toString().length != 0) {
                drParam += "&AddressPersonT=" + escape($('#txtmallingaddress').val());
            }
            if ($('#txtDRcity').val().toString().length != 0) {
                drParam += "&City=" + escape($('#txtDRcity').val());
            }
            if ($('#txtstate').val().toString().length != 0) {
                drParam += "&OtherT=" + escape($('#txtstate').val());
            }
            if ($('#txtzip').val().toString().length != 0) {
                drParam += "&Zipcode=" + escape($('#txtzip').val());
            }

            if ($('#txtphoneNo').val().toString().length != 0) {
                // get only number from phone number
                var txtphoneNo = $('#txtphoneNo').val() != '' ? parseInt($('#txtphoneNo').val().replace(/[^0-9\.]/g, ''), 10) : escape($('#txtphoneNo').val());
                drParam += "&PhoneNumber=" + txtphoneNo;
            }
            if ($('#txtemailId').val().toString().length != 0) {
                drParam += "&SuspectEmailT=" + escape($('#txtemailId').val());
            }
            var base64String = connect_me.ConvertJsonToBitmap($('.output').val());
            if (base64String != '') {
                drParam += "&UserSignature=" + base64String.value;
            }
            var querystring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[1];
            if (querystring == 'p') {
                drParam += "&PromotionId=" + getQuerystring('id');
                drParam += "&IsDrMode=" + "1";
            }

            return drParam;
        }
        //STOP ASYNC
        //loadTwitter();

    }
    catch (e) { }
    //This code will show the text of appropriate outage type.
    //$('#ddlOutageType').change(function () {
    //    try {
    //        var selectedval = $('#ddlOutageType option:selected').attr('key');
    //        //$('#OutageCauseDescription').text(selectedval);
    //        $(lastopenp).hide();
    //        //$('#p_' + selectedval).show();
    //        lastopenp = '#p_' + selectedval;
    //        if (selectedval == '5')
    //            $('#txtOutageComments').attr('mandatory', '1');
    //        else
    //            $('#txtOutageComments').removeAttr('mandatory');
    //    }
    //    catch (e) { }
    //});
});

function validphoneno(e, id) {
    try {
        var code = e.which || event.keyCode;
        if (code != 8) {
            if ($('#' + id).val().length == 3 || $('#' + id).val().length == 7) {
                $('#' + id).val($('#' + id).val() + '-');
            }
        }
    }
    catch (e) { }
}

var flag;
//This function is use to validate the attachment type.
function ValidateFileUpload() {
    var fuData = document.getElementById('FileUpload1');
    var FileUploadPath = fuData.value;
    if (FileUploadPath != '') {
        var Extension = FileUploadPath.substring(FileUploadPath.lastIndexOf('.') + 1).toLowerCase();
        if (Extension == "gif" || Extension == "png" || Extension == "bmp" || Extension == "jpeg" || Extension == "pdf" || Extension == "doc" ||
            Extension == "docx" || Extension == "txt" || Extension == "xls" || Extension == "xlsx" || Extension == "rtf" || Extension == 'jpg') {
            FileUploadPath == '';
            return true; // Valid file type
        }
        else
            return false; // Not valid file type
    }
    else
        return true;
}

function ValidateFile() {
    try {


        if (Validate2()) {
            $('#hdnFlag').val('save');
            if (($('#ddl_topic').val() == "61")) {
                var email = ($('#txtReporterEmail').val() || $('#txtEmailAddress').val() || $('#txtemailId').val());
                var regx = new RegExp("^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$");
                if (email.match(regx)) {
                    flag = true;
                    return true;
                }
                else {
                    toastr.warning($('#IDEmail').text())
                    $('#txtReporterEmail').focus() || $('#txtEmailAddress').focus() || $('#txtemailId').focus();
                    flag = false;
                    return false;
                }
            }
            else {
                flag = true;
                return true;
            }


        }
        else {
            flag = false;
            return false;
        }

    }
    catch (e) {
        flag = false;
        return false;
    }

}

function Validate() {
    try {
        switch (selected) {
            case '56':
                return (ValidatePageFields('div_general') && ValidatePageFields('div_contactInfo') && ValidatePageFields('div_56') && ValidatePageFields('div_closeststreet'));
                break;
            case '59':
                return (ValidatePageFields('divComments') && ValidatePageFields('div_general') && ValidatePageFields('div_contactInfo') && ValidatePageFields('div_59') && ValidatePageFields('div_closeststreet') && checkHtml('txtComment'));//#5469
                break;
            case '61':
                return (ValidatePageFields('divComments') && ValidatePageFields('div_general') && ValidatePageFields('div_61'));//#5469
                break;
                //for DR Module  
            case '47':
                return (ValidatePageFields('div_general') && ValidatePageFields('div_47') && ValidatePageFields('divComments'));
                break;
            default:
                return (ValidatePageFields('div_general') && ValidatePageFields('divComments'));
                break;
        }
    }
    catch (e) { }
}

function File_OnChange(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    if (filename != "") {        
        $("#nofile").html(filename);
        $('#nofile').attr('title', filename);
        $('#btnRemoveFile').show();
    }
}

function removeFile() {
    $('#FileUpload1').val('');
    var control = $("#FileUpload1");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    //$("#nofile").html($('#nofile').attr('title'));
    $("#nofile").html($('#ML_SrvcRqust_i_NoFile').text());
    $('#nofile').attr('title', $('#ML_SrvcRqust_i_NoFile').attr('title'));
    return false;
}

function refresh() {

    if ((window.detectZoom.device().toFixed(1) >= 1.09) && (window.detectZoom.device().toFixed(1) < 1.20)) {
        $("#devices").addClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.20) && (window.detectZoom.device().toFixed(1) < 1.30)) {
        $("#devices").addClass('inner_uni2');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.30) && (window.detectZoom.device().toFixed(1) < 1.50)) {
        $("#devices").addClass('inner_uni3');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni4');
    }
    else if ((window.detectZoom.device().toFixed(1) >= 1.50) && (window.detectZoom.device().toFixed(1) < 1.70)) {
        $("#devices").addClass('inner_uni4');
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
    }
    else {
        $("#devices").removeClass('inner_uni1');
        $("#devices").removeClass('inner_uni2');
        $("#devices").removeClass('inner_uni3');
        $("#devices").removeClass('inner_uni4');
    }

}

function Count(text, long) {
    var maxlength = new Number(long); // Change number to your max length.
    if (text.value.length > maxlength) {
        text.value = text.value.substring(0, maxlength);
        toastr.warning(' ' + $('#IDMoreText').text() + ' ' + long + ' ' + $('#IDNoCharacters').text());

        $('.w2ui-popup-btn').focus();

    }
}

//This method is created to check if more than one required field is mandatory then give a alert 'All fields required on connect-me.aspx page' 
//We are using this method only on connect-me.aspx
function Validate2() {
    try {
        var querystring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[1];
        switch ($('#ddl_topic').val()) {
            case '56':
                var res = (ValidateAllPageFieldsSingleMessage('div_contactInfo,div_general,div_56,div_closeststreet'));//&& ValidateAllPageFieldsSingleMessage('div_general') && ValidateAllPageFieldsSingleMessage('div_56') && ValidateAllPageFieldsSingleMessage('div_closeststreet'));
                if (res == true) {
                    if (parseInt($("#txtPhoneNumber").val().charAt(1)) == 0 || $("#txtPhoneNumber").val().length < 14) {
                        error.showerror("#txtPhoneNumber", 'Please provide a 10 digit phone number.'); $("#txtPhoneNumber").focus(); return false;
                    }
                }
                return res;
                break;
            case '59':
                return (ValidateAllPageFieldsSingleMessage('div_contactInfo,div_general,div_59,div_closeststreet,divComments') && checkHtml('txtComment'));// && ValidateAllPageFieldsSingleMessage('div_general') && ValidateAllPageFieldsSingleMessage('div_59') && ValidateAllPageFieldsSingleMessage('div_closeststreet') && ValidateAllPageFieldsSingleMessage('divComments') && checkHtml('txtComment'));//#5469
                break;
            case '61':
                return (ValidateAllPageFieldsSingleMessage('div_61,div_general,divComments') && checkHtml('txtComment'));// && ValidateAllPageFieldsSingleMessage('div_general') && ValidateAllPageFieldsSingleMessage('divComments') && checkHtml('txtComment'));//#5469
                break;
            case '46':
                if (querystring == 'r') {
                    return (ValidateAllPageFieldsSingleMessage('div_general,divSign,divComments'));// && ValidateAllPageFieldsSingleMessage('divComments'));
                }
                else {
                    return (ValidateAllPageFieldsSingleMessage('div_general,divComments'));// && ValidateAllPageFieldsSingleMessage('divSign'));
                }
                break;
            default:
                if (querystring == 'p' || querystring == 'r')
                    if (querystring == 'r') {
                        return (ValidateAllPageFieldsSingleMessage('div_general,divSign,divComments'));// && ValidateAllPageFieldsSingleMessage('divComments'));
                    }
                    else {
                        return (ValidateAllPageFieldsSingleMessage('div_general,divSign,divComments,div_47'));
                    }
                else
                    return (ValidateAllPageFieldsSingleMessage('div_general,divComments'));// && ValidateAllPageFieldsSingleMessage('divComments'));
                break;
        }
    }
    catch (e) { }
}

// function for encoding html tags
function htmlEncode(value) {
    return $('<div/>').text(value).html();
}
function hideshowdivinselection(selected) {
    $('.w2ui-tag-body').hide();
    $('.errorbox').removeClass('errorbox');
    switch (selected) {
        case '56':
            $('.div_reason').hide();
            $('#div_' + selected).show();
            $('#div_contactInfo').show();
            $('#div_closeststreet').show();
            $('#divComments').hide();
            $('#txtComment').removeAttr('mandatory');//For Outage notification comment field is not mandatory
            commentPlaceholder = $('#txtComment').attr('placeholder');
            $('#txt_Subject').removeAttr('mandatory');
            $('#txt_Subject').attr('placeholder', '');
            $('#div_Subject').hide();
            $('#div_outage_message').show();
            $('#txt_Subject').next().hide();
            $('#txtStreetName').val('');
            $('#txtCity').val('');
            $('#txtZipcode').val('');
            $('#txtNearestCrossStreet').val('');
            $('#txtStreetNumber').val('');
            $('#divAddresslatlong').hide();
            $('#txtAddresslatlong').removeAttr('mandatory');
            $('#txtAddresslatlong').attr('placeholder', '');
            $("#txtAddresslatlong").next("span").hide(); 
            //$('#txtFirstName').val('');
            //$('#txtPhoneNumber').val('');
            //$('#txtLastName').val('');
            //$('#ddlOutageType')[0].selectedIndex = 0;
                
            lastopenid = '56';
            var selectedval = $('#ddlOutageType option:selected').attr('key');
            //$('#OutageCauseDescription').text(selectedval);
            $('#txtOutageComments').attr('mandatory', '1');
            break;
        case '59':
            $('.div_reason').hide();
            $('#div_' + selected).show();
            $('#div_contactInfo').show();
            $('#div_closeststreet').show();
            $('#txt_Subject').next().hide();
            $('#divComments').show();
            $('#txtComment').attr('mandatory', '1');
            if ($('#txtComment').attr('placeholder') != '')
                commentPlaceholder = $('#txtComment').attr('placeholder');
            $('#txtComment').attr("placeholder", commentPlaceholder);
            $('#txt_Subject').removeAttr('mandatory');
            $('#txt_Subject').attr('placeholder', '');
            // $('#txt_Subject').addClass('errorbox');
            $('#div_Subject').hide();
            $('#div_outage_message').hide();
            $('#txt_Subject').next().hide();
            $('#divAddresslatlong').hide();
            $('#txtAddresslatlong').removeAttr('mandatory');
            $('#txtAddresslatlong').attr('placeholder', '');
            $("#txtAddresslatlong").next("span").hide();
            lastopenid = '59';
            break;
        case '61':
            $('.div_reason').hide();
            $('#div_' + selected).show();
            $('#divComments').show();
            $('#txtComment').attr('mandatory', '1');
            if ($('#txtComment').attr('placeholder') != '')
                commentPlaceholder = $('#txtComment').attr('placeholder');
            $('#txtComment').attr("placeholder", commentPlaceholder);
            $('#txt_Subject').removeAttr('mandatory');
            $('#txt_Subject').attr('placeholder', '');
            $('#div_Subject').hide();
            $('#div_outage_message').hide();
            lastopenid = '61';
            $('#txtTDescription').val('');
            $('#txt_Subject').next().hide();
            $('#divAddresslatlong').hide();
            $('#txtAddresslatlong').removeAttr('mandatory');
            $('#txtAddresslatlong').attr('placeholder', '');
            $("#txtAddresslatlong").next("span").hide();
            break;

        case '60':
        case '149':
            $('#txt_Subject').attr('mandatory', '1');
            $('#txt_Subject').attr("placeholder", $("#subjectmandatory").text());
            $('#div_Subject').show();
            $('.div_reason').hide();
            $('#divComments').show();
            $('#txtComment').attr('mandatory', '1');
            if ($('#txtComment').attr('placeholder') != '')
                commentPlaceholder = $('#txtComment').attr('placeholder');
            $('#txtComment').attr("placeholder", commentPlaceholder);
            $('#div_outage_message').hide();
            $('#txt_Subject').next().show();
            $('#txtAddresslatlong').attr('mandatory', '1');
            $('#txtAddresslatlong').attr('placeholder', $("#subjectmandatory").text());
            $("#txtAddresslatlong").next("span").show();
            $('#divAddresslatlong').show();
            lastopenid = '';
            selected = '0';
            $('input:checkbox').removeAttr('checked');
            markMandatory('div_Subject' + ',' + '#divComments' + ',#txt_Subject', 'legend');
            break;
            break;
        default:
            $('#txt_Subject').attr('mandatory', '1');
            $('#txt_Subject').attr("placeholder", $("#subjectmandatory").text());
            $('#div_Subject').show();
            $('.div_reason').hide();
            $('#divAddresslatlong').hide();
            $('#txtAddresslatlong').removeAttr('mandatory');
            $('#txtAddresslatlong').attr('placeholder', $("#subjectmandatory").text());
            $("#txtAddresslatlong").next("span").hide();
            $('#divComments').show();
            $('#txtComment').attr('mandatory', '1');
            if ($('#txtComment').attr('placeholder') != '')
                commentPlaceholder = $('#txtComment').attr('placeholder');
            $('#txtComment').attr("placeholder", commentPlaceholder);
            $('#div_outage_message').hide();
            $('#txt_Subject').next().show();
            lastopenid = '';
            selected = '0';
            $('input:checkbox').removeAttr('checked');
            markMandatory('div_Subject' + ',' + '#divComments' + ',#txt_Subject', 'legend');
            break;
    }
}

function loadTwitter() {
    try {


        $.ajax({
            type: "POST",
            url: "connect-me.aspx/GetTweets",
            data: {},//5 for compare spending
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var data = JSON.parse(response.d);

            },
            error: function (request, status, error) {
                loader.hideloader();
            }
        });

    } catch (e) {
        console.log(e);
    }
}

