var selected = '0';
var lastopenid = '';
var commentPlaceholder = '';
$(document).ready(function () {
    

    try {

        if ($(".connect_email_box ul li:visible").length > 2) {
            $(".connect_email_box ul li").removeClass('custo_details_space');
        }

        else {
            $(".connect_email_box ul li").addClass('custo_details_space');
        }

        $.ajax({
            type: "POST",
            url: "Dashboard.aspx/Setbanners",
                data: '{PlaceHolderID: "' +5 + '" }',//5 for compare spending
            contentType: "application/json; charset=utf-8",
            dataType: "json",
                success: function (response) {
                JSON.parse(response.d) == null ? $('#IDBannerConnectMe').attr('src', "images/no_img.png"): $('#IDBannerConnectMe').attr('src', JSON.parse(response.d));
                $('#IDBannerConnectMe').error(function () {
                    $(this).attr('src', 'images/no_img.png');
                    });
                },
                        error : function (request, status, error) {
                            loader.hideloader();
        }
    });


        if (getQuerystring("pid") != '') {
            $("#ddl_topic").prop('title', $("p[globalize=ML_CONNECTME_Lbl_Topic]").attr('title'));
        }

        $('.div_reason select').val('1');

        $(".pad").bind('click.signaturepad', function () {
            $(this).removeClass('errorbox');
            $('#signval').removeClass('errorbox');
        });

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
                $('#txt_Subject').attr('mandatory', '1');
                lastopenid = '47';
                selected = '47';//#5476              
            }
            else if (getQuerystring("pid") == "r") {
                $('#divSign').show();             
            }
            else if (getQuerystring("pid") == "o") {
                RemoveMandatoryAttributeFromElement($('#ddl_topic'));
              $('.div_reason').hide();
              selected = '56';
                $('#div_56').show();
                $('#div_contactInfo').show();
                $('#div_closeststreet').show();
                $('#divComments').hide();
                $('#txtComment').removeAttr('mandatory');//For Outage notification comment field is not mandatory
                $('#txt_Subject').removeAttr('mandatory');
                $("#txt_Subject").next("span").hide();
                $('#txt_Subject').removeClass('errorbox');
                $('#div_Subject').hide();
                $('#div_outage_message').show();
                lastopenid = '56';
                var selectedval = $('#ddlOutageType option:selected').attr('key');
                AddMandatoryAttributeToElement($('#txtOutageComments'));
                $('#OutageCauseDescription').text(selectedval);
          }
            else if (getQuerystring("pid") == "t") {            
              $('#txtAddresslatlong').attr('mandatory', '1');
              $('#txtAddresslatlong').next().show();
              $('#txtAddresslatlong').attr('placeholder', $("#subjectmandatory").text());            
          }
        }

        var lastopenp = '#p_1'; //last open outage
        $('#ddl_topic').change(function () {
            selected = $(this).val();
            $('#txt_Subject').val('');
            $('.w2ui-tag-body').hide();
            $('.errorbox').removeClass('errorbox');
            switch (selected) {
                case '56':
                    $('.div_reason').hide();
                    $('#div_' + selected).show();
                    $('#div_contactInfo').show();
                    $('#div_closeststreet').show();

                    $('#' + selected + 'input[type=text]').val('');
                    $('#div_closeststreet input[type=text]').val('');
                    $('#div_contactInfo input[type=text]').val('');

                    $('#divComments').hide();
                    $('#txtComment').removeAttr('mandatory');//For Outage notification comment field is not mandatory
                    commentPlaceholder = $('#txtComment').attr('placeholder');
                    $('#txt_Subject').removeAttr('mandatory');
                    $('#txt_Subject').attr('placeholder', '');
                    $("#txt_Subject").next("span").hide();
                    $('#txtAddresslatlong').removeAttr('mandatory');
                    $('#txtAddresslatlong').attr('placeholder', '');
                    $("#txtAddresslatlong").next("span").hide();
                    $('#txt_Subject').removeClass('errorbox');
                    $('#div_Subject').hide();
                    $('#div_outage_message').show();
                    $('#divAddresslatlong').hide();
                    lastopenid = '56';
                    var selectedval = $('#ddlOutageType option:selected').attr('key');
                    //$('#OutageCauseDescription').text(selectedval);
                    AddMandatoryAttributeToElement($('#txtOutageComments'));
                    break;
                case '59':
                    $('.div_reason').hide();
                    $('#div_' + selected).show();
                    $('#div_contactInfo').show();
                    $('#div_closeststreet').show();
                    $('#divComments').show();
                    $('#txtComment').attr('mandatory', '1');
                    if ($('#txtComment').attr('placeholder') != '')
                        commentPlaceholder = $('#txtComment').attr('placeholder');
                    $('#txtComment').attr("placeholder", commentPlaceholder);
                    $('#txt_Subject').removeAttr('mandatory');
                    $('#txt_Subject').attr('placeholder', '');
                    $("#txt_Subject").next("span").hide();
                    $('#txtAddresslatlong').removeAttr('mandatory');
                    $('#txtAddresslatlong').attr('placeholder', '');
                    $("#txtAddresslatlong").next("span").hide();
                    $('#txt_Subject').removeClass('errorbox');
                    $('#div_Subject').hide();
                    $('#div_outage_message').hide();
                    $('#divAddresslatlong').hide();
                    lastopenid = '59';
                    break;
                case '61':
                    $('.div_reason').hide();
                    $('#div_' + selected).show();
                    $('#divComments').show();

                    $('#div_61 input[type=text]').val('')
                    $('#divComments input[type=text]').val('');
                    $('#txtComment').val('');
                    $('#txtAddresslatlong').val('');
                    $('#txtUnit').val('');
                    $('#txtComment').attr('mandatory', '1');
                    if ($('#txtComment').attr('placeholder') != '')
                        commentPlaceholder = $('#txtComment').attr('placeholder');
                    $('#txtComment').attr("placeholder", commentPlaceholder);
                    $('#txt_Subject').removeAttr('mandatory');
                    $('#txt_Subject').attr('placeholder','');
                    $("#txt_Subject").next("span").hide();
                    $('#txtAddresslatlong').removeAttr('mandatory');
                    $('#txtAddresslatlong').attr('placeholder', '');
                    $("#txtAddresslatlong").next("span").hide();
                    $('#txt_Subject').removeClass('errorbox');
                    $('#div_Subject').hide();
                    $('#div_outage_message').hide();
                    $('#divAddresslatlong').hide();
                    lastopenid = '61';
                    break;

                case '60':
                case '149':
                    $('#txt_Subject').attr('mandatory', '1');
                    $('#txt_Subject').attr("placeholder", $("#subjectmandatory").text());
                    $('#divComments').show();
                    $('#txtComment').attr('mandatory', '1');
                    if ($('#txtComment').attr('placeholder') != '')
                        commentPlaceholder = $('#txtComment').attr('placeholder');
                    $('#txtComment').attr("placeholder", commentPlaceholder);
                    $("#txt_Subject").next("span").show();
                    $('#txtAddresslatlong').attr('mandatory', '1');
                    $('#txtAddresslatlong').attr('placeholder', $("#subjectmandatory").text());
                    $("#txtAddresslatlong").next("span").show();
                    $('#div_Subject').show();
                    $('.div_reason').hide();
                    $('#div_outage_message').hide();
                    $('#divAddresslatlong').show();
                    $('#txtComment').val('');
                    $('#txtAddresslatlong').val('');
                    $('#txtUnit').val('');
                    lastopenid = '';
                    selected = '0';
                    $('input:checkbox').removeAttr('checked');
                    markMandatory('div_Subject' + ',' + '#divComments' + ',#txt_Subject', 'legend');
                    break;
                default:
                    $('#txt_Subject').attr('mandatory', '1');
                    $('#txt_Subject').attr("placeholder", $("#subjectmandatory").text());
                    $('#txtComment').attr('mandatory', '1');
                    if ($('#txtComment').attr('placeholder') != '')
                        commentPlaceholder = $('#txtComment').attr('placeholder');
                    $('#txtComment').attr("placeholder", commentPlaceholder);
                    $("#txt_Subject").next("span").show();
                    $('#txtAddresslatlong').removeAttr('mandatory');
                    $('#txtAddresslatlong').attr('placeholder', $("#subjectmandatory").text());
                    $("#txtAddresslatlong").next("span").hide();
                    $('#div_Subject').show();
                    $('.div_reason').hide();
                    $('#divComments').show();
                    $('#div_outage_message').hide();
                    $('#divAddresslatlong').hide();
                    $('#txtComment').val('');
                    $('#txtUnit').val('');
                    lastopenid = '';
                    selected = '0';
                    $('input:checkbox').removeAttr('checked');
                    markMandatory('div_Subject' + ',' + '#divComments' + ',#txt_Subject', 'legend');
                    break;
            }
        });
    

        var src = '';
        $('#BtnSubmitComment').click(function () {
           
            if (ValidateFile() && alphanumeric() && checkEmailOrAccount()) {
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
                                    toastr.error($('#IDFileFailed').text())
                                
                                }

                            },
                            error: function (data, status, e) {
                                loader.hideloader();
                                
                                toastr.error(e);
                            }
                        });
                    }

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
                url: "contact-us-connect-me.aspx/SubmitConnectMeRequest",//Earlier page name was connectme.aspx which was throwing exception
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function (data, status) {
                    AddMandatoryAttributeToElement($('#ddl_topic')); 
                    var dataset=JSON.parse(data.d);
                    if (dataset != null) {
                        
                        if (getQuerystring("pid") == "p") {
                            toastr.success(dataset.Table[0]["Message"]);
                            window.location.href = 'OuterSavingTips.aspx?type=progs';
                        }
                        else if (getQuerystring("pid") == "r") {
                            toastr.success(dataset.Table[0]["Message"]);
                            window.location.href = 'OuterSavingTips.aspx?type=rbt';
                        }
                        else if (getQuerystring("pid") == "o") {
                            toastr.success(dataset.Table[0]["Message"]);
                            window.location.href = 'outeroutage.aspx';
                        }
                        else {
                            toastr.success(dataset.Table[0]["Message"]);
                            
                        }
                    }
                    else {
                        // Invalid page redirection to efficiency corrected. Bug # 24205.
                        if (getQuerystring("pid") == "p") {
                            toastr.error($('#IDMessageReceived').text());
                            window.location.href = 'OuterSavingTips.aspx?type=progs';
                       
                        }
                        else if (getQuerystring("pid") == "r") {
                            toastr.error($('#IDMessageReceived').text());
                            window.location.href = 'OuterSavingTips.aspx?type=rbt';
                         
                        }
                        else if (getQuerystring("pid") == "o") {
                            toastr.error($('#IDMessageReceived').text());
                            window.location.href = 'outeroutage.aspx';
                        }
                        else {
                            toastr.error($('#IDMessageReceived').text());
                         
                        }//Added till here
                    }
                    loader.hideloader();
                },
                error: function (request, status, error) {
                    toastr.error('Error ' + request.statusText);
                
                    loader.hideloader();
                }
            });
        }

        function createParameters() {
            var cookie = document.cookie.match('(^|;)?' + 'ClientTimeZone' + '=([^;]*)(;|$)');
            var param = "Reason=" + escape($('#ddl_topic :selected ').text());
            param += "&IsShow=0";
            param += "&FromEMail=" + escape($('#txtFromEmailId').val());
            if ($('#ddl_topic').val() != '56') {
                param += "&FirstName=" + escape($('#txtCustName').val().split(' ')[0]);
                if ($('#txtCustName').val().split(' ')[1] != undefined) {
                    param += "&LastName=" + escape($('#txtCustName').val().split(' ')[1]);
                }
            }
           
            param += "&UtilityAccountNumber=" + escape($('#txtAccountNumber').val());
            param += "&IsPreLogin=1";
            if (src != '') {
                param += "&AttachmentName=" + escape(src);
                src = '';
            }
            param += "&TopicId=" + $('#ddl_topic').val();
            switch ($('#ddl_topic').val()) {
                case '56':
                    param += commonParameters('56');
                    break;
                case '59':
                    param += commonParameters('59');
                    param += "&MessageBody=" + $('#txtComment').val().trim();
                    break;
                case '61':
                    param += theftparameters();
                    param += "&MessageBody=" + $('#txtComment').val().trim();                 
                    param += "&Subject=" + $('#txt_Subject').val().trim();
                    break;
                case '47':
                    param += DRParameters();
                    param += "&MessageBody=" + $('#txtComment').val().trim();
                    param += "&Subject=" + $('#txt_Subject').val().trim();
                    break;
                case '46':
                    if (getQuerystring('id') != undefined) {
                        param += "&PromotionId=" + getQuerystring('id');
                        param += "&IsDrMode=" + "1";
                    }                 
                    param += "&MessageBody=" + $('#txtComment').val().trim();
                    param += "&Subject=" + $('#txt_Subject').val().trim();
                    break;
                case '60':
                case '149':
                    param += "&MessageBody=" + $('#txtComment').val().trim();
                    param += "&Subject=" + $('#txt_Subject').val().trim();
                    param += "&AddressT=" + $('#txtAddresslatlong').val().trim();
                    break;
                default:
                    param += "&MessageBody=" + $('#txtComment').val().trim();
                    param += "&Subject=" + $('#txt_Subject').val().trim();
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

            param += "&Offset=" + ((cookie != null) ? cookie[2] : new Date().getTimezoneOffset());
            return param;
        }
        function checkEmailOrAccount()
        {
            if (getQuerystring('id') != undefined) {
                if ($('#txtFromEmailId').val() == "" && $('#txtAccountNumber').val() == "") {
                    toastr.error("Please enter Email Id or Service Account Number.");
                    return false;
                }
                else {
                    return true;
                }

            }
            else
            {
                return true;
            }
        }
        function resetForm() {
            $('#ddl_topic')[0].selectedIndex = 0;
            $('#ddl_topic').attr('disabled', false);
            $('#txt_Subject').attr('disabled', false);
            $('#txt_Subject').removeAttr("readonly");
            $('#txt_Subject').attr('mandatory', '1');
            $('#txt_Subject').attr("placeholder", $("#subjectmandatory").text());
            $('#txt_Subject').val('');
            $('#divAddresslatlong').hide();
            $('#txtAddresslatlong').val('');
            $('#txtCustName').val('');
            $('#txtAccountNumber').val('');
            $('#txtFromEmailId').val('');
            $('#div_Subject').show();
            $('.div_reason').hide();
            $('#divComments').show();
            $('#txtComment').val('');
            $('#txtComment').attr('mandatory', '1');
            $('#FileUpload1').val(''); $('#btnRemoveFile').hide();
            $("#nofile").html($('#nofile').attr('title'));
            $('#div_outage_message').hide();
            lastopenid = '';
            selected = '0';
            $('input:checkbox').removeAttr('checked');
            if (checkQueryString() == true) {
                $('#divSign').hide();
                return false;
            }
            markMandatory('div_Subject' + ',' + '#divComments' + ',#txt_Subject', 'legend');

            $('select').removeClass('errorbox');
            $('input').removeClass('errorbox');
            $('textarea').removeClass('errorbox');

            $('#txtTLocation').val('');
            $('#txtTDescription').val('');
            $('#txtTDate').val('');
            $('#txtTName').val('');
            $('#txtTAddress').val('');
            $('#txtTOccupation').val('');
            $('#txtTOther').val('');
            $('#txtReporterName').val('');
            $('#txtReporterAddress').val('');
            $('#txtReporterPhone').val('');
            $('#txtReporterEmail').val('');
            $('#txtEmailAddress').val('');

            $('#txtFirstName').val('');
            $('#txtLastName').val('');
            $('#txtPhoneNumber').val('');
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
                    if ($('#txtOutageComments').val().trim().length != 0)
                    { comParam += "&OutageAdditionalInformation=" + escape($('#txtOutageComments').val().trim()); }
                    if ($('#txtComment').val().trim().length != 0)
                    { comParam += "&MessageBody=" +escape($('#txtComment').val().trim()); }
                    
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
            if ($('#txtStreetNumber').val().trim().length != 0) {
                comParam += "&StreetNumber=" + escape($('#txtStreetNumber').val());
            }
            comParam += "&StreetName=" + $('#txtStreetName').val();
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
                var txtReporterPhone = $('#txtReporterPhone').val() != '' ? parseInt($('#txtReporterPhone').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtReporterPhone').val();
                thParam += "&ReporterPhone=" + escape(txtReporterPhone);
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
                drParam += "&Term_Condition=" + escape($('#lbltermsconditions').html());
            }
            if ($('#lbldisclamer').html().toString().length != 0) {
                drParam += "&Disclaimer=" + escape($('#lbldisclamer').html());
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
                var txtphoneNo = $('#txtphoneNo').val() != '' ? parseInt($('#txtphoneNo').val().replace(/[^0-9\.]/g, ''), 10) : $('#txtphoneNo').val();
                drParam += "&PhoneNumber=" + escape(txtphoneNo);
            }
            if ($('#txtemailId').val().toString().length != 0) {
                drParam += "&SuspectEmailT=" + escape($('#txtemailId').val());
            }
            var base64String = connect_me.ConvertJsonToBitmap($('.output').val());
            if (base64String != '') {
                drParam += "&UserSignature=" + base64String.value;
            }
            if(getQuerystring('id') != undefined ){
                drParam += "&PromotionId=" + getQuerystring('id');
                drParam += "&IsDrMode=" + "1";
            }
            return drParam;
        }


        function alphanumeric()  
        {  
            if ($('#txtCustName').val() != '') {
                var inputtxt = $('#txtCustName').val();
                var letterNumber = /^[a-zA-Z ]*$/;
                if (inputtxt.match(letterNumber)) {
                    $("#txtCustName").removeClass('errorbox');
                    error.hideerror();
                    return true;
                }
                else {
                    $('#txtCustName').focus();
                    error.showerror("#txtCustName", 'Please enter a valid customer name');
                    return false;
                }
            }
            else return true;
        }  
    }
    catch (e) { }
    //This code will show the text of appropriate outage type.
    $('#ddlOutageType').change(function () {
        try {

            var selectedval= $('#ddlOutageType option:selected').attr('key');
            //$('#OutageCauseDescription').text(selectedval);         
            
            var selectedvalue = $('#ddlOutageType option:selected').val();
            if (selectedvalue == '1')
                AddMandatoryAttributeToElement($('#txtOutageComments'));// $('#txtOutageComments').attr('mandatory', '1');
            else
                RemoveMandatoryAttributeFromElement($('#txtOutageComments'));// $('#txtOutageComments').removeAttr('mandatory');
            $(lastopenp).hide();
            lastopenp = '#p_' + selectedval;
        }
        catch (e) { }
    });

    

});''
function AddMandatoryAttributeToElement(elemet) {
    var attr = $(elemet).attr('mandatory');
    // For some browsers, 'attr' is undefined; for others,'attr' is false.  Check for both.
    if (typeof attr == typeof undefined || attr == false) {
        var mandatoryHtml = '<span class="required" style="color:#950202; padding-left:3px; font-size: 19px;">*</span>';
        $(elemet).attr('mandatory', '1');
        $(elemet).after(mandatoryHtml);
    }
}
function RemoveMandatoryAttributeFromElement(elemet) {
    $(elemet).removeAttr('mandatory');
    $(elemet).next('span').remove();
}
function validphonenumber(e, id) {
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

//This method is created to check if more than one required field is mandatory then give a alert 'All fields required on connect-me.aspx page' 
//We are using this method only on connect-me.aspx
function Validate2() {
    try {
        selected = $('#ddl_topic option:selected').val();
        var querystring = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&')[0].split('=')[1];
        switch (selected) {
            case '56':
                var res = (ValidateAllPageFieldsSingleMessage('div_contactInfo,div_general,div_56,div_closeststreet') && checkNumber('txtAccountNumber'));//&& ValidateAllPageFieldsSingleMessage('div_general') && ValidateAllPageFieldsSingleMessage('div_56') && ValidateAllPageFieldsSingleMessage('div_closeststreet') && checkNumber('txtAccountNumber'));
                if (res == true) {
                    if (parseInt($("#txtPhoneNumber").val().charAt(1)) == 0 || $("#txtPhoneNumber").val().length < 14 ) {
                        error.showerror("#txtPhoneNumber", 'Please provide a 10 digit phone number.'); $("#txtPhoneNumber").focus(); return false;
                    }
                }
                return res;
                break;
            case '59':
                return (ValidateAllPageFieldsSingleMessage('div_contactInfo,div_general,div_59,div_closeststreet,divComments') && checkHtml('txtComment') && checkNumber('txtAccountNumber')); 
                break;
            case '61':
                return (ValidateAllPageFieldsSingleMessage('div_61,div_general,divComments') && checkHtml('txtComment') && checkNumber('txtAccountNumber'));
                break;
                //for DR Module  
            case '46':
                if (querystring == 'r') {
                    return (ValidateAllPageFieldsSingleMessage('div_general,divSign,divComments'));
                }
                else {
                    return (ValidateAllPageFieldsSingleMessage('div_general,divComments'));
                }
                break;
            default:
                if (querystring == 'p' || querystring == 'r') {
                    if (querystring == 'r') {
                        return (ValidateAllPageFieldsSingleMessage('div_general,divSign,divComments'));
                    }
                    else {
                        return (ValidateAllPageFieldsSingleMessage('div_general,divSign,divComments,div_47'));
                    }
                }
                else
                    //return (ValidateAllPageFieldsSingleMessage('div_general,divComments') && checkNumber('txtAccountNumber'));
                    return (ValidateAllPageFieldsSingleMessage('div_general,div_contactInfo,div_closeststreet,divComments') && checkNumber('txtAccountNumber'));
                break;
        }
    }
    catch (e) { }
}



