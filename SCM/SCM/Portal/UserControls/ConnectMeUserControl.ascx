<%@ Control Language="C#" AutoEventWireup="true" CodeBehind="ConnectMeUserControl.ascx.cs" Inherits="CustomerPortal.UserControls.ConnectMeUserControl" %>
<script type="text/javascript" src="include/jquery.ui.core.min.js"></script>
<%--<script src="js/connect-me.js" type="text/javascript"></script>--%>
<%-- for signature --%>
<script src="js/script_sign/flashcanvas.js" type="text/javascript"></script>
<script src="js/script_sign/jquery.signaturepad.js" type="text/javascript"></script>
<script src="js/script_sign/json2.min.js" type="text/javascript"></script>
<script src="js/script_sign/jquery.signaturepad.min.js" type="text/javascript"></script>
<!--<script src="js/jquery-1.8.3.min.js" type="text/javascript"></script>
    <link href="js/w2Ui/w2ui-1.4.2.css" rel="stylesheet" />
    <script src="js/w2Ui/w2ui-1.4.2.js"></script>
    <link href="js/w2Ui/w2ui-1.4.2.min.css" rel="stylesheet" />
    <script src="js/w2Ui/w2ui-1.4.2.min.js"></script>-->
<script src="js/blockScreen.js" type="text/javascript"></script>
<script src="js/AjaxFileUpload/ajaxfileupload.js"></script>
<script src="js/MyAccount.js"></script>
<script src="js/Translator.js"></script>
<style>
    .outer_popup .customer_txt_name p {
        margin: 0 0 3px;
        padding: 3px 0;
        float: left;
        width: 100%;
    }

    .customer_txt_name .topic_box select {
    border: 1px solid #d6d6d6;
    outline: medium none;
    padding: 5px 0;
    width: 92% !important;
}
</style>
<script type="text/javascript">
    $(document).ready(function () {

        try {
            $('#ConnectMe').hide();
            $('#ContactMe').hide();
            $('#ddl_topic').hide();
            $('#ddl_topics').hide();
           <%-- if ("<%=param%>" != "AccountNumber=&IsShow =1&Token=") {
                $('#txtComments').prop('disabled', true).attr("mandatory", "0");
            }
            else { $('#txtComment').prop('disabled', true).attr("mandatory", "0"); }--%>
            $('#BtnSubmitComment').click(function () {
                //if (acct_details != "AccountNumber=&IsShow =1&Token=") {
                //    if (checkQueryString() == true) {

                //        if ($("#txtComment").val() == "") {
                //            $('#errorMsg').fadeIn(500).delay(5000).fadeOut(1000);;
                //           $('#errorMsg').html('Please enter all the mandatory information.');
                //        }
                //            //alert('Please Sign the document.');
                //        else { w2alert($('#IDSignedDocument').text()); $('#errorMsg').hide(); }
                //        return false;
                //    }
                //    if (ValidateFile()) {
                //        // $.blockUI({ css: { backgroundColor: '#000', opacity: .5, color: 'white' } });
                //        loader.showloader();
                //        //FileUpload Async START
                //        if ($("#FileUpload1").val() != "") {
                //            if (GetFileSize('FileUpload1') == true) {
                //                $.ajaxFileUpload({
                //                    type: "POST",
                //                    fileElementId: 'FileUpload1',
                //                    url: "Upload.ashx",
                //                    secureuri: false,
                //                    cache: false,
                //                    contentType: 'text/plain',
                //                    dataType: "text",
                //                    forceIframeTransport: true,
                //                    success: function (data, status) {
                //                        src = data;
                //                        if (data != '') {
                //                            src = data;
                //                            sendRequestConnectMe();
                //                            resetForm();                                          
                //                        }
                //                        else {
                //                            //alert('Field Not Inserted');
                //                            alert($('#IDFileFailed').text());
                //                        }

                //                    },
                //                    error: function (data, status, e) {
                //                        //$.unblockUI();
                //                        loader.hideloader();
                //                        alert(e);
                //                    }
                //                });
                //            }

                //        }
                //        else {
                //            //$.blockUI({ css: { backgroundColor: '#000', opacity: .5, color: 'white' } });
                //            loader.showloader();
                //            src = ''; sendRequestConnectMe();
                //            resetForm();
                //        }
                //        //STOP

                //    }
                //    return false;
                //}
                //else {
                    if (ValidateFile()) {
                        // $.blockUI({ css: { backgroundColor: '#000', opacity: .5, color: 'white' } });
                        loader.showloader();
                        //FileUpload Async START
                        if ($("#FileUpload2").val() != "") {
                            if (GetFileSize('FileUpload2') == true) {
                                $.ajaxFileUpload({
                                    type: "POST",
                                    fileElementId: 'FileUpload2',
                                    url: "Upload.ashx",
                                    secureuri: false,
                                    cache: false,
                                    contentType: 'text/plain',
                                    dataType: "text",
                                    forceIframeTransport: true,
                                    success: function (data, status) {
                                        src = data;
                                        if (data != '') {
                                            src = data;
                                            sendRequestConnectContactMe();
                                            resetContactMeForm(); $("#showdetails_effi").hide();
                                        }
                                        else {
                                            //alert('Field Not Inserted');
                                            toatsr.error($('#IDFileFailed').text());
                                        }

                                    },
                                    error: function (data, status, e) {
                                        //$.unblockUI();
                                        // loader.hideloader();
                                        toatsr.error(e);
                                    }
                                });
                            }

                        }
                        else {
                            // $.blockUI({ css: { backgroundColor: '#000', opacity: .5, color: 'white' } });
                            loader.showloader();
                            src = ''; sendRequestConnectContactMe();
                            resetContactMeForm();
                        }
                        //STOP

                    }
                    return false;
               // }
            });

            function resetForm() {
                //$('#ddl_topic')[0].selectedIndex = 0;
                $('#txt_Subject').attr('mandatory', '1');
                //$('#txt_Subject').val('');
                $('#txtComment').val('');
                $('#FileUpload1').val(''); $('#btnRemoveFile').hide();
                $("#nofile").html($('#nofile').attr('title'));
            }
            var acct_details = '<%=param%>';
            //if (acct_details == "AccountNumber=&IsShow =1&Token=") {
            //    $('#ConnectMe').hide();
            //    $('#ContactMe').show();
            //}
            //else {
                $('#ContactMe').show();
               $('#ConnectMe').hide();
            //}
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
                        if (parseInt(data.d) == 0) {
                            //w2alert('Comment  did not submitted.');
                            toatsr.error($('#IDCommentFailed').text());
                        }
                        else {
                            //w2alert('We have received your message. We will contact you shortly.')
                            toatsr.success($('#IDMessageReceived').text());
                            var prompotionid = $('#hdnPid').val();
                            $('#' + prompotionid).parents('li').find('.register').css("display", "none");
                            $("#" + prompotionid).parents('li').find('.added_vote_area span[class*=popup]')[0].textContent = parseInt($("#" + prompotionid).parents('li').find('.added_vote_area span[class*=popup]')[0].textContent) + 1;
                            $("#showdetails_effi").hide();
                        }
                        //$.unblockUI();
                        loader.hideloader();
                    },
                    error: function (request, status, error) {
                        toatsr.error('Error ' + request.statusText);
                        //$.unblockUI();
                        loader.hideloader();
                    }
                });
            }
            function createParameters() {
                var param = "Reason=" + $('#ddl_topic :selected ').text();
                //param += "&pid=" + $('#hdnPid').val();
                param += "&IsShow=0";
                param += "&custname=" + $('#lblCustName').html().split(' ')[0];
                if (src != '') {
                    param += "&AttachmentName=" + encodeURIComponent(src);
                    src = '';
                }
                param += "&TopicId=" + $('#ddl_topic').val();
                switch ($('#ddl_topic').val()) {
                //    case '56':
                //        param += commonParameters('56');
                //        break;
                //    case '59':
                //        param += commonParameters('59');
                //        param += "&MessageBody=" + encodeURIComponent($('#txtComment').val().trim());
                //        break;
                //    case '61':
                //        param += theftparameters();
                //        param += "&MessageBody=" + encodeURIComponent($('#txtComment').val().trim());
                //        break;
                    case '47':
                        param += "&PromotionId=" + $('#hdnPid').val();
                        param += "&IsDrMode=" + "1";
                //        param += "&MessageBody=" + encodeURIComponent($('#txtComment').val().trim());
                //        param += "&Subject=" + encodeURIComponent($('#txt_Subject').val().trim());
                     break;
                    default:
                //        param += "&MessageBody=" + encodeURIComponent($('#txtComment').val().trim());
                //        param += "&Subject=" + encodeURIComponent($('#txt_Subject').val().trim());
                        break;
                }
                param += "&Subject=" + encodeURIComponent($('#txt_Subject').val().trim());
                param += "&MessageBody=" + encodeURIComponent($('#txtComment').val().trim());
                if (param.indexOf("Subject") < 0) {
                    param += "&Subject=" + 'Not Mentioned';
                }
                if (param.indexOf("MessageBody") < 0) {
                    param += "&MessageBody=" + 'Message Not Given';
                }
                return param;
            }
            function sendRequestConnectContactMe() {
                var param = {
                    jsonStr: createContactMeParameters()
                };
                $.ajax({
                    type: "POST",
                    url: "contact-us-connect-me.aspx/SubmitConnectMeRequest",//Earlier page name was connectme.aspx which was throwing exception
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: function (data, status) {
                        if (parseInt(data.d) == 0) {
                            //w2alert('Comment  did not submitted.');
                            toatsr.error($('#IDCommentFailed').text());
                        }
                        else {
                            //w2alert('We have received your message. We will contact you shortly.')
                            toatsr.success($('#IDMessageReceived').text());
                        }
                        //$.unblockUI();
                        loader.hideloader();
                    },
                    error: function (request, status, error) {
                        toatsr.error('Error ' + request.statusText);
                        //$.unblockUI();
                        loader.hideloader();
                    }
                });
            }

            function createContactMeParameters() {
                var param = "Reason=" + $('#ddl_topics :selected ').text();
               // param += "&pid=" + $('#hdnPidContact').val();
                param += "&IsShow=0";
                param += "&CustomerName=" + $('#txtCustName').val();
                param += "&AccountNumber=" + $('#txtAccountNumber').val();

                if (src != '') {
                    param += "&AttachmentName=" + src;
                    src = '';
                }
                param += "&TopicId=" + $('#ddl_topics').val();
                //switch ($('#ddl_topic').val()) {
                //    case '56':
                //        param += commonParameters('56');
                //        break;
                //    case '59':
                //        param += commonParameters('59');
                //        param += "&MessageBody=" + $('#txtComment').val().trim();
                //        break;
                //    case '61':
                //        param += theftparameters();
                //        param += "&MessageBody=" + $('#txtComment').val().trim();
                //        break;
                //    case '47':
                //        param += DRParameters();
                //        param += "&MessageBody=" + $('#txtComment').val().trim();
                //        param += "&Subject=" + $('#txt_Subject').val().trim();
                //        break;
                //    default:
                //        param += "&MessageBody=" + $('#txtComment').val().trim();
                //        param += "&Subject=" + $('#txt_Subject').val().trim();
                //        break;
                //}
                param += "&Subject=" + encodeURIComponent($('#txt_Subjects').val().trim());
                param += "&MessageBody=" + encodeURIComponent($('#txtComments').val().trim());
                if (param.indexOf("Subject") < 0) {
                    param += "&Subject=" + 'Not Mentioned';
                }
                if (param.indexOf("MessageBody") < 0) {
                    param += "&MessageBody=" + 'Message Not Given';
                }
                return param;
            }

            function resetContactMeForm() {
                //$('#ddl_topics')[0].selectedIndex = 0;
                $('#txt_Subjects').attr('mandatory', '1');
                //$('#txt_Subjects').val('');
                $('#txtCustName').val('');
                $('#txtAccountNumber').val('');
                $('#divComments').show();
                $('#txtComments').val('');
                $('#FileUpload2').val(''); $('#btnRemoveFileContact').hide();
                $("#nofile").html($('#nofile').attr('title'));

            }


        }
        catch (e) { }
    });
    var flag;
    //This function is use to validate the attachment type.
    function ValidateFileUpload() {
       <%-- if ("<%=param%>" != "AccountNumber=&IsShow =1&Token=") {
            var fuData = document.getElementById('<%= FileUpload1.ClientID %>');
            var FileUploadPath = fuData.value;
        }
        else {--%>
            var fuData = document.getElementById('<%= FileUpload2.ClientID %>');
            var FileUploadPath = fuData.value;
       // }
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

    function validatefield() {
    <%--    if ("<%=param%>" != "AccountNumber=&IsShow =1&Token=") {
            return (ValidateAllPageFieldsSingleMessage('div_general') && ValidateAllPageFieldsSingleMessage('divComment') && checkNumber('txtAccountNumber'));
        }
        else {--%>
        return (ValidateAllPageFieldsSingleMessage('div_generals') && ValidateAllPageFieldsSingleMessage('divComments') && checkHtml('txtComments') && checkNumber('txtAccountNumber'));
    //}
    }

    //function GetFileSize(fileid) {
    //    try {
    //        if (ValidateFileUpload()) {
    //            if ($("#" + fileid)[0].files != undefined) {
    //                if ($("#" + fileid)[0].files.length > 0) {
    //                    var f = $("#" + fileid)[0].files[0];
    //                    var fileSize = 0;
    //                    fileSize = f.size || f.fileSize; //size in kb
    //                    fileSize = fileSize / 1048576; //size in mb
    //                    if (fileSize > 5) {
    //                        //alert("File size exceeds 5 MB. Please try uploading smaller size file.");//"Uploaded File Size is" + fileSize + "MB");
    //                        toatsr.warning($('#IDfilesize').text());
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
    //            //alert("File extensions allowed: gif, png, bmp, jpg, jpeg, doc, docx, txt, xls, xlsx and rtf.");
    //            toatsr.warning($('#IDfileExt').text());
    //            return false;
    //        }
    //    }
    //    catch (e) {
    //        return false;
    //    }
    //}

    function ValidateFile() {
        try {
            if (validatefield()) {
               <%-- if ("<%=param%>" != "AccountNumber=&IsShow =1&Token=") {
                    if (GetFileSize('FileUpload1')) {
                        flag = true;
                        return true;
                    }
                    else {
                        flag = false;
                        return false;
                    }
                }
                else {--%>
                    if (GetFileSize('FileUpload2')) {
                        flag = true;
                        return true;
                    }
                    else {
                        flag = false;
                        return false;
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
        // $.blockUI({ css: { backgroundColor: '#000', opacity: .5, color: 'white' } });
        $('input:submit').attr("disabled", true);
    }
    $(document).ready(function () {
        $('#btnRemoveFile').hide();
        $('#btnRemoveFileContact').hide();
     
        $('#txtCustName').bind('keypress', function (event) {
            var regex = new RegExp("^[a-zA-Z0-9\b]+$");
            var key = String.fromCharCode(!event.charCode ? event.which : event.charCode);
            if (!regex.test(key)) {
                event.preventDefault();
                return false;
            }
            //$('#txtComment').prop('disabled', true).attr("mandatory", "0");
            //$('#txtComment').prop('disabled', true).attr("mandatory", "0");
          <%--  if ("<%=param%>" != "AccountNumber=&IsShow =1&Token=") {
                $('#txtComments').prop('disabled', true).attr("mandatory", "0");
            }
            else { $('#txtComment').prop('disabled', true).attr("mandatory", "0"); }--%>
        });
    });
    function File_OnChange(sender) {
        if ("<%=param%>" != "AccountNumber=&IsShow =1&Token=") {
            var filename = $(sender).val().replace(/^.*[\\\/]/, '');
            if (filename != "") {
                $("#nofile").html(filename);
                $('#btnRemoveFile').show();
            }
        }
        else {
            var filename = $(sender).val().replace(/^.*[\\\/]/, '');
            $("#nofiles").html(filename);
            $('#btnRemoveFileContact').show();
        }

    }

    //$('#txtcomment').bind('copy paste cut', function (e) {
    //    e.preventDefault(); //disable cut,copy,paste
    //});
    function removeFile() {
        $('#FileUpload1').val('');
        var control = $("#FileUpload1");
        control.replaceWith(control = control.clone(true));
        $('#btnRemoveFile').hide();
        $("#nofile").html($('#nofile').attr('title'));

        return false;
    }

    function removeFileContact() {
        $('#FileUpload2').val(''); $('#btnRemoveFileContact').hide();
        $("#nofiles").html($('#nofile').attr('title'));

        return false;
    }

    function Count(text, long) {
        var maxlength = new Number(long); // Change number to your max length.
        if (text.value.length > maxlength) {
            text.value = text.value.substring(0, maxlength);
            //w2alert(" More than " + long + " characters not allowed");  //more than 100/1000 character not allowed
            toatsr.warning(' ' + $('#IDMoreText').text() + ' ' + long + ' ' + $('#IDNoCharacters').text());//bug id 9671
            $('.w2ui-popup-btn').focus();

        }
    }
</script>
<div id="OuterConnect">
    <div id="ConnectMe">
        <div id="div_general">

            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 customer_txt gray_u">
                <p globalize="ML_Master_lbl_CustName"><%= CustomerPortal.Translator.T("ML_Master_lbl_CustName") %></p>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 customer_txt_name gray_u">
                <p>
                    <asp:Label ID="lblCustName" globalize="ML_OuterSavingTip_lbl_CustomerName" runat="server" Text="N/a" Style="font-weight: bold;"></asp:Label>
                </p>
            </div>
            <div class="clear_both"></div>
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 customer_txt">
                <p globalize="ML_Default_Lbl_Account"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %></p>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 customer_txt_name">
                <p>
                    <asp:Label ID="lblaccountno" runat="server" Text="N/a" ToolTip="" globalize="ML_OuterSavingTip_lbl_ServiceAcctNo"></asp:Label>
                </p>
            </div>
            <div class="clear_both"></div>
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 customer_txt gray_u">
                <p globalize="ML_SrvcRqust_Date"><%= CustomerPortal.Translator.T("ML_SrvcRqust_Date") %></p>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 customer_txt_name gray_u">
                <p>
                    <asp:Label ID="lblDate" runat="server" Text="N/a" ClientIDMode="Static"></asp:Label>
                </p>
            </div>
            <div class="clear_both"></div>
           <%-- <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 customer_txt">
                <p globalize="ML_CONNECTME_Lbl_Topic">Topic</p>
            </div>--%>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 customer_txt_name" style="display:none;">
                <p class="topic_box" style="padding: 5px 0px 4px;">
                    <asp:DropDownList ID="ddl_topic" runat="server" title="Topic"
                        ClientIDMode="Static">
                    </asp:DropDownList>
                </p>

            </div>
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 customer_txt  ">
                <p globalize="ML_Notification_lbl_Subject"><%= CustomerPortal.Translator.T("ML_Notification_lbl_Subject") %></p>
            </div>

            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 customer_txt_name ">
                <p style="padding: 5px 0px 4px;">
                    <asp:TextBox ID="txt_Subject" runat="server" mandatory="1" title="Subject" globalize="ML_ConnectMe_TxtSubject"
                        ClientIDMode="Static" placeholder="Subject" onKeyUp="Count(this,100)" onChange="Count(this,100)" Width="92%"></asp:TextBox>
                </p>
            </div>
        </div>
        <div class="clear_both"></div>
        <div class="col-lg-5 col-md-5 col-sm-5 col-xs-5 customer_txt gray_u">
            <p globalize="ML_CONNECTME_Lbl_AddAttach"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddAttach") %></p>
        </div>

        <div class="col-lg-7 col-md-7 col-sm-7 col-xs-7 customer_txt_name gray_u">
            <p style="padding: 5px 0 4px !important;">
                <span class="file-input btn btn-primary btn-file" style="padding:3px 5px !important;">Choose File
                    <asp:FileUpload ClientIDMode="Static" ID="FileUpload1" runat="server" onchange="File_OnChange(this)" ToolTip="" globalize="ML_OuterSavingTip_Btn_AttachFile" Style="float: left; width: 230px;" />

                </span><i id="nofile" style="display: inline-block;font-size: 10px; margin: 0;overflow: hidden;padding-left: 3px;text-overflow: ellipsis;vertical-align: middle;white-space: nowrap;width: 104px;">No File Chosen</i>
                <img id="btnRemoveFile" alt="Remove" src="images/notification_icon/Payment_DeleteIcon.png"
                    onclick="return removeFile();" />
            </p>

        </div>

        <div class="clear_both"></div>
        <%--<div id="divComment">
             <div class="" style="display:table; width:100%; margin-bottom:10px;">
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-4 customer_txt">
                <p globalize="ML_CONNECTME_Lbl_Comments" style="padding-left: 18px;">Comments</p>
            </div>
            <div class="col-lg-7 col-md-7 col-sm-7 col-xs-8 customer_txt_name">
                <p style="padding-left: 0px;">
                    <asp:TextBox runat="server" TextMode="MultiLine" ID="txtComment" ClientIDMode="Static" Rows="4" globalize="ML_ConnectMe_TxtComments"
                        title="Comments" onKeyUp="Count(this,1000)" onChange="Count(this,1000)" Style="width: 92%;"  mandatory="1"></asp:TextBox>
                </p>
                <p class="service_text1" globalize="ML_ConnectMe_p_info" style="display: inline-block; margin-top: 0px; padding-left: 0px;">
                    Use this form to connect with SUS, ask specific questions about our programs, report an outage or link to our Social Media platforms.
                </p>
            </div>
            </div>
        </div>--%>
        <div class="clear_both"></div>
    </div>
    <div id="ContactMe" class="outer_popup">
        <div id="div_generals">

            <div class="col-lg-6 col-md-6 col-sm-5 col-xs-5 customer_txt gray_u">
                <p globalize="ML_Master_lbl_CustName"><%= CustomerPortal.Translator.T("ML_Master_lbl_CustName") %></p>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7 customer_txt_name gray_u">
                <p>
                    <asp:TextBox ID="txtCustName" runat="server" ClientIDMode="Static" mandatory="1" placeholder="Customer Name" title="Customer Name" MaxLength="50" Width="92%"></asp:TextBox>
                </p>
            </div>
            <div class="clear_both"></div>
            <div class="col-lg-6 col-md-6 col-sm-5 col-xs-5 customer_txt">
                <p globalize="ML_Default_Lbl_Account"><%= CustomerPortal.Translator.T("ML_Default_Lbl_Account") %></p>
            </div>
            <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7 customer_txt_name">
                <p>
                    <asp:TextBox ID="txtAccountNumber" runat="server" ClientIDMode="Static" mandatory="1" Width="92%" placeholder="Account Number" onkeypress="javascript:if(IsNumeric(event)){return true;}else{return false;}"  title="Account Number" MaxLength="16"></asp:TextBox>
                </p>
            </div>

            <%--<div class="col-lg-6 col-md-6 col-sm-5 col-xs-5 customer_txt gray_u">
                <p globalize="ML_CONNECTME_Lbl_Topic">Topic</p>
            </div>--%><div class="clear_both"></div>
            <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7 customer_txt_name gray_u" style="display:none">
                <p class="topic_box">
                    <asp:DropDownList ID="ddl_topics" runat="server" Width="100%" title="Topic"
                        ClientIDMode="Static" Style="padding: 4px 0;">
                    </asp:DropDownList>
                </p>
            </div>
       <div class="col-lg-6 col-md-6 col-sm-5 col-xs-5 customer_txt gray_u">
                <p globalize="ML_Notification_lbl_Subject"><%= CustomerPortal.Translator.T("ML_Notification_lbl_Subject") %></p>
            </div>
            <%--bug id 5740--%>
           <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7 customer_txt_name gray_u">
                <p>
                    <asp:TextBox ID="txt_Subjects" runat="server" Width="92%" mandatory="1" title="Subject"
                        ClientIDMode="Static" placeholder="Subject" onKeyUp="Count(this,50)" onChange="Count(this,50)"></asp:TextBox>
                </p>
            </div>
        </div>
        <div class="clear_both"></div>
        <div class="col-lg-6 col-md-6 col-sm-5 col-xs-5 customer_txt ">
            <p globalize="ML_CONNECTME_Lbl_AddAttach"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_AddAttach") %></p>
        </div>

        <div class="col-lg-6 col-md-6 col-sm-7 col-xs-7 customer_txt_name ">
            <p style="padding: 5px 0 4px !important;">
                <span class="file-input btn btn-primary btn-file" style="padding: 4px 5px !important; font-size: 11px;">Choose File
                    <asp:FileUpload ClientIDMode="Static" ID="FileUpload2" runat="server" onchange="File_OnChange(this)" Style="float: left; width: 230px;" />

                </span><i id="nofiles" style="display: inline-block;font-size: 10px; margin: 0;overflow: hidden;padding-left: 3px;text-overflow: ellipsis;vertical-align: middle;white-space: nowrap;width: 104px;">No File Chosen</i>
                <img id="btnRemoveFileContact" alt="Remove" src="images/notification_icon/Payment_DeleteIcon.png"
                    onclick="return removeFileContact();" />
            </p>

        </div>

        <div class="clear_both"></div>
        <div id="divComments">
            <div class="" style="display:table; width:100%; margin-bottom:10px;">
            <div class="col-lg-5 col-md-5 col-sm-5 col-xs-4 customer_txt ">
                    <p globalize="ML_CONNECTME_Lbl_Comments" style="padding-left: 18px;"><%= CustomerPortal.Translator.T("ML_CONNECTME_Lbl_Comments") %></p>
                </div>
                <div class="col-lg-7 col-md-7 col-sm-7 col-xs-8 customer_txt_name">
                    <p style="padding-left: 31px;">
                        <asp:TextBox runat="server" TextMode="MultiLine" ID="txtComments" ClientIDMode="Static" Rows="4"
                            title="Comments" onKeyUp="Count(this,500)"  mandatory="1" onChange="Count(this,500)" Width="92%"></asp:TextBox>
                    </p>
                    <p class="service_text1" globalize="ML_ConnectMe_p_info" style="display: inline-block; margin-top: 0px; padding-left: 31px;">
                       <%= CustomerPortal.Translator.T("ML_ConnectMe_p_info") %>
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
<div class="col-lg-12 col-md-12 col-sm-12 col-xs-12 customer_txt">
    <input type="button" class="submit-button" value="Submit" globalize="ML_CONNECTME_BTN_Submit" id="BtnSubmitComment">
</div>
<span globalize="ML_Footer_a_ConnectMe" id="titletext" style="display: none"><%= CustomerPortal.Translator.T("ML_Footer_a_ConnectMe") %></span>
<span globalize="ML_SERVICES_Txt_ExceedLimit" id="IDfilesize" style="display: none"><%= CustomerPortal.Translator.T("ML_SERVICES_Txt_ExceedLimit") %></span>
<%--<span globalize="ML_Connectme_ErrMsg_FileExt" id="IDfileExt" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileExt") %></span>--%>
<span globalize="ML_Connectme_ErrMsg_ValidEmailID" id="IDEmail" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_ValidEmailID") %></span>
<span globalize="ML_Connectme_ErrMsg_Morethan" id="IDMoreText" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_Morethan") %></span>
<span globalize="ML_Connectme_ErrMsg_NoCharacters" id="IDNoCharacters" style="display: none;"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_NoCharacters") %></span>
<span globalize="ML_Connectme_ErrMsg_SignedDocument" id="IDSignedDocument" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_SignedDocument") %></span>
<span globalize="ML_Connectme_ErrMsg_FileFailed" id="IDFileFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_FileFailed") %></span>
<span globalize="ML_Connectme_ErrMsg_Comment_Failed" id="IDCommentFailed" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_Comment_Failed") %></span>
<span globalize="ML_Connectme_ErrMsg_MessageReceived" id="IDMessageReceived" style="display: none"><%= CustomerPortal.Translator.T("ML_Connectme_ErrMsg_MessageReceived") %></span>
<span globalize="ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo" id="AllMandatory" style="display: none"><%= CustomerPortal.Translator.T("ML_AddUpdatePayment_Span_Msg_EnterAllMandInfo") %></span>