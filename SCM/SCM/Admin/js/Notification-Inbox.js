var arrmsgids;
var id;
var parent;
var ismsgopen = false;
var v = "";
var qtype = "";
var type = "";
var isReply = 1;
var SortColumn = null;
var pageIndex = 1;
var pageSize = 10;
var pagenumber = 1;
var chkbxchkedarr = [];
var sortorder = '';
var TimeOffSet = (new Date()).getTimezoneOffset();
var SearchText = '';

var sortorder = '';
var SortColumn = null;
var databindtogrid;
var CustomerData;

function calcLocalTime(date) {
    try {
        var converteddate = new Date(date.replace(/-/g, "/"));
        var minOffset = new Date().getTimezoneOffset();
        converteddate = (converteddate - (minOffset * 60000));
        var d = new Date(converteddate);
        var ampm = d.getHours() >= 12 ? "PM" : "AM";
        var d = ("0" + (d.getMonth() + 1)).slice(-2) + "/" + ("0" + d.getDate()).slice(-2) + "/" +
                     d.getFullYear() + " " + ("0" + (d.getHours() % 12 == 0 ? "12" : d.getHours() % 12)).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + ":" + ("0" + d.getSeconds()).slice(-2) + " " + ampm;
        return (d).toLocaleString();
    }
    catch (e) { }
}

function setUnreadMessage(result) {
    try {
        if (result != null) {
            for (var i = 0; i < result.length; i++) {
                $('#unReadOutage').text(result[0].Outage != '0' ? '(' + '' + result[0].Outage + ')' : '');
                $('#unReadInbox').text(result[0].Inbox != '0' ? '(' + '' + result[0].Inbox + ')' : '');
                $('#unReadConnectMe').text(result[0].ConnectMe != '0' ? '(' + '' + result[0].ConnectMe + ')' : '');
                $('#unReadService').text(result[0].Service != '0' ? '(' + '' + result[0].Service + ')' : '');
                $('#unReadBilling').text(result[0].Billing != '0' ? '(' + '' + result[0].Billing + ')' : '');
                $('#unReadDemandResponse').text(result[0].DemandResponse != '0' ? '(' + '' + result[0].DemandResponse + ')' : '');
                $('#lblTrashMail').text(result[0].Trash != '0' ? '(' + '' + result[0].Trash + ')' : '');
                $('#lblSavedMail').text(result[0].Resolved != '0' ? '(' + '' + result[0].Resolved + ')' : '');
                $('#unReadLoginIssues').text(result[0].LoginIssue != '0' ? '(' + '' + result[0].LoginIssue + ')' : '');
                $('#unLeakAlert').text(result[0].LeakAlert != '0' ? '(' + '' + result[0].LeakAlert + ')' : '');
                $('#unReadSent').text(result[0].Sent != '0' ? '(' + '' + result[0].Sent + ')' : '');
            }
        }
    }
    catch (e) { }
}

function ConfirmDelete(i) {
    if (i == 0) {
        var x = confirm("Are you sure you want to delete?");
        if (x)
            return true;
        else
            return false;
    }
    else {
        var y = confirm("Are you sure you want to delete permanently?");
        if (y)
            return true;
        else
            return false;
    }
}

function setCss() {
    var a = window.location.search.substring(1);
    var p = getParameterByName("type");
    if (p != null && p != "")
        document.getElementById(p).className = "active";
    else {
        p = 'allmail';
        document.getElementById(p).className = "active";
    }
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
    var regexString = "[\\?&]" + name + "=([^&#]*)";
    var regex = new RegExp(regexString);
    var found = regex.exec(window.location.search);
    if (found == null)
        return "";
    else
        return decodeURIComponent(found[1].replace(/\+/g, " "));
}

function ReadMsg(placeholdertype) {
    var label = placeholdertype;
    var value = '';
    var leftvalue;
    if ($('#hdnType').text() != '9' && $('#hdnType').text() != '10') {
        //var label = $(parent).find('.LabelsContainer').children()[0].innerHTML.toLowerCase();
        switch (label) {
            case 'Connect Me':
                value = $('.lblConnectme').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblConnectme').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'Outage':
                value = $('.lblOutage').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblOutage').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'Billing':
                value = $('.lblBilling').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblBilling').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'Service':
                value = $('.lblService').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblService').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'Demand Response':
                value = $('.lbldemandresponse').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lbldemandresponse').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'Login Issues':
                value = $('.lblLoginIssue').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblLoginIssue').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'Leak Alert':
                value = $('.lblLeakalert').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblLeakalert').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
        }
    }
    else {
        var savtraValue = '';
        switch (label) {
            case 'Connect Me':
                if ($('#hdnType').text() != '9') {
                    value = $('.lblConnectme').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblConnectme').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblSavedMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblSavedMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                else {

                    //value = $('.lblConnectme').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblConnectme').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    //value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblTrashMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblTrashMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                break;
            case 'Outage':
                if ($('#hdnType').text() != '9') {
                    value = $('.lblOutage').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblOutage').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblSavedMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblSavedMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                else {

                    //value = $('.lblOutages').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblOutages').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    //value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblTrashMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblTrashMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                break;
            case 'Billing':
                if ($('#hdnType').text() != '9') {
                    value = $('.lblBilling').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblBilling').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblSavedMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblSavedMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                else {

                    //value = $('.lblBilling').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblBilling').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    //value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblTrashMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblTrashMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                break;
            case 'Service':
                if ($('#hdnType').text() != '9') {
                    value = $('.lblService').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblService').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblSavedMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblSavedMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                else {

                    //value = $('.lblService').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblService').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    //value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblTrashMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblTrashMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                break;
            case 'Demand Response':
                if ($('#hdnType').text() != '9') {
                    value = $('.lbldemandresponse').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lbldemandresponse').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblSavedMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblSavedMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                else {

                    //value = $('.lbldemandresponse').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lbldemandresponse').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    //value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblTrashMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblTrashMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                break;
            case 'Login Issues':
                if ($('#hdnType').text() != '9') {
                    value = $('.lblLoginIssue').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblLoginIssue').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblSavedMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblSavedMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                else {

                    //value = $('.lblLoginIssue').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblLoginIssue').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    //value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblTrashMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblTrashMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                break;
            case 'Leak Alert':
                if ($('#hdnType').text() != '9') {
                    value = $('.lblLeakalert').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblLeakalert').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    leftvalue = value - 1;
                    $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblSavedMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblSavedMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                else {

                    //value = $('.lblLeakalert').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblLeakalert').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                    //value = $('.lblInbox').text().replace('(', '').replace(')', '');
                    //leftvalue = value - 1;
                    //$('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');

                    savtraValue = $('.lblTrashMail').text().replace('(', '').replace(')', '');
                    savtraValue = savtraValue - 1;
                    $('.lblTrashMail').text(savtraValue <= 0 ? '' : '(' + savtraValue + ')');
                }
                break;
        }
    }
    Notification_Inbox.Readmsg(id, 1);
}

function LoadMessage(typeNotification, name, type) {
    $('#nodata').hide();
    $('#chkall').attr('checked', false);
    $('.btnSave').show();
    $('.MailListing').show();
    $('#MessageBody').hide();
    $('.btnputback').hide();
    $('#btnBack').hide();
    $('#btnReply').hide();
    $('#msgReply').hide();
    $('#btnPrevious').hide();
    $('#btnNext').hide();
    $('#divHeader').show();
    ismsgopen = false;
    pagenumber = 1;
    $("#notification>ul>li.active").removeClass("active");
    $('#ulNotificatons').empty();
    loadData(pageIndex, pageSize, type, SortColumn, sortorder);

    $('#lblHeading').text('');
    $('#lblHeading').text(name);
    if (type != '9')
        $('#lblFromTo').text('From');
    else
        $('#lblFromTo').text('To');
    $('.MailListing').show();
    $('.MessageBody').hide();
    if ($('#ulNotificatons li').length == 0) {
        $('#divHeader').hide();
        $('#ulNotificatons').hide();
        $('#nodata').show(); //25551 bug id
        $('.right-notif-img').hide();
    }
    else {
        $('#divHeader').show();
        $('#ulNotificatons').show();
        $('#nodata').hide();
        $('.right-notif-img').show();
    }

    $(".sidebar_" + typeNotification + "_inner").addClass('active');
    if (type == '12') {
        // $('.btnputback').show(); Hiding putback button for "saved" notifications. As per Email dated 17th Nov., 2015 and subject line as "FW: [SCM 0012731]: Trash: After putback any mail page should be revert back.".
        $('.btnSave').hide();
    }
    if (type == '9') {
        $('.btnputback').show();
        $('.btnSave').hide();
        $('.SaveImageContainer').hide();
    }
    else {
        $('.SaveImageContainer').show();
    }

    var arrchkbox = $('.MailListing input');
    arrmsgids = new Array();
    for (var i = 0; i < $(arrchkbox).length; i++) {
        arrmsgids[i] = $(arrchkbox)[i].id;
    }

}

function loadPage(type) {
    var classType = type;
    var name;
    var typeNotification;
    switch (type) {
        case "1":
            name = "Outage";
            typeNotification = name.toLowerCase().trim();
            break;
        case "2":
            name = "Connect Me";
            typeNotification = name.toLowerCase().trim();
            break;
        case "3":
            name = "Service";
            typeNotification = name.toLowerCase().trim();
            break;
        case "4":
            name = "Billing";
            typeNotification = name.toLowerCase().trim();
            break;
        case "5":
            name = "Demand Response";
            typeNotification = name.toLowerCase().trim();
            break;
        case "6":
            name = "Login Issues";
            typeNotification = "loginissues";
            break;
        case "7":
            name = "Inbox";
            typeNotification = name.toLowerCase().trim();
            break;
        case "8":
            name = "Sent";
            typeNotification = name.toLowerCase().trim();
            break;
        case "9":
            name = "Trash";
            typeNotification = name.toLowerCase().trim();
            break;
        case "10":
            name = "Saved";
            typeNotification = name.toLowerCase().trim();
            break;
        case "12":
            name = "Saved";
            typeNotification = name.toLowerCase().trim();
            break;
        case "13":
            name = "Leak Alert";
            typeNotification = "leakalert";
            break;
        default:
            name = "All Email";
            typeNotification = "allmail";
            type = "11";
            break;
    }

    LoadMessage(typeNotification, name, type);
}

function DrawMsgBody() {
    $('.responsive_alignment_pagination').hide();
    var draoonlyone = 0;//To prevent duplicate reply Messages
    var result = Notification_Inbox.GetMsgBody(id).value;

    CustId = result.Tables[0].Rows[0].CustomerId;
    Accnumber = result.Tables[0].Rows[0].FromAccountNumber;
    CustomerType = result.Tables[0].Rows[0].CustomerType;
    //var CustName = $('#jqxchildgrid').jqxGrid('getrowdata', row)["Customer Name"];
    var status = result.Tables[0].Rows[0].Status;
    //for CustomerDetails
    var customerdetail = '';
    var fullname;
    var UAN = ''; var MobilePhone = '';
    var attachmentpath = $('#filehandlerpath').val();
    if (result.Tables[0].Rows[0].FullName == '' || result.Tables[0].Rows[0].FullName == null)
    { fullname = ''; }
    else
    { fullname = result.Tables[0].Rows[0].FullName; }
    if (result.Tables[0].Rows[0].UtilityAccountNumber == '' || result.Tables[0].Rows[0].UtilityAccountNumber == null)
    { UAN = ''; }
    else
    { UAN = result.Tables[0].Rows[0].UtilityAccountNumber; }
    if (result.Tables[0].Rows[0].MobilePhone == '' || result.Tables[0].Rows[0].MobilePhone == null) {
        MobilePhone = '';
    }
    else { MobilePhone = result.Tables[0].Rows[0].MobilePhone; }
    //customerdetail += '<B>Customer Name: </B><a href="#" target="_blank" style="cursor:pointer">' + fullname + '</a> | <B>Utility Account Number: </B>' + UAN + ' | <B>Mobile Number: </B>' + MobilePhone + '';
    customerdetail += '<B>Customer Name: </B><a class="details" href="#" data-id=' + CustId + ',' + Accnumber + ',' + status + ',' + CustomerType + ' data-backdrop="static"  data-toggle="modal" data-target=".userDetails" style="cursor:pointer">' + fullname + '</a> | <B>Utility Account Number: </B><a class="details" href="#" data-id=' + CustId + ',' + Accnumber + ',' + status + ',' + CustomerType + ' data-backdrop="static"  data-toggle="modal" data-target=".userDetails" style="cursor:pointer">' + UAN + '</a> | <B>Mobile Number: </B><a class="details mobphone" href="#" data-id=' + CustId + ',' + Accnumber + ',' + status + ',' + CustomerType + ' data-backdrop="static"  data-toggle="modal" data-target=".userDetails" style="cursor:pointer">' + MobilePhone + '</a>';

    $('#DetailCustomer').html(customerdetail);
    if ((CustId == -1) || (CustId == 1)) {
        $('#DetailCustomer').hide();
    }
    else { $('#DetailCustomer').show(); }

    var str = '';
    // For No-Reply for annonymous
    if (result.Tables[0].Rows[0].FromAccountNumber != 'undefined') {
        isReply = result.Tables[0].Rows[0].FromAccountNumber;
    }
    for (var i = 0; i < result.Tables[0].Rows.length; i++) {
        //if (result.Tables[0].Rows[i].IsReply == 1 && draoonlyone == 1) {
        //    continue;
        //}
        var textFromTo = result.Tables[0].Rows[i].IsReply == 1 ? 'From' : 'From';//Always From will be dispalyed as it's always showing Email from which Email has been sent
        str += '<div class="DetailsMessageHeader"><div class="from-section">' + textFromTo + ':</div>';
        str += '<div class="from-name-section">' + result.Tables[0].Rows[i].MailFrom + '</div><div class="clearfix">&nbsp;</div>';
        str += '<div class="from-section">Topic: </div>';
        str += '<div class="from-name-section">' + result.Tables[0].Rows[i].Topic + '</div><div class="clearfix">&nbsp;</div>';
        str += '<div class="from-section">Subject: </div>';
        str += '<div class="from-name-section subject">' + result.Tables[0].Rows[i].Subject + '</div><div class="clearfix">&nbsp;</div>';
        str += '<div class="from-section">Date: </div><div class="from-name-section">' + (result.Tables[0].Rows[i].CreatedDate) + '</div><div class="clearfix">&nbsp;</div>';
        str += '<div class="from-section">Message:</div><div class="from-name-section">' + (result.Tables[0].Rows[i].MessageBody == null ? ' ' : result.Tables[0].Rows[i].MessageBody) + '</div></div><div class="clearfix">&nbsp;</div>';
        str += "<hr style='width:100%'>";
        $('#TxtMsgSubject').text(result.Tables[0].Rows[i].Subject);
        $('#FromAccNum').text(result.Tables[0].Rows[i].FromAccountNumber);
        //if (result.Tables[0].Rows[i].IsReply == 1) {
        //    draoonlyone = 1;
        //}

        for (var j = 0; j < result.Tables[1].Rows.length; j++) {
            if (result.Tables[0].Rows[i].MessageDetailId == result.Tables[1].Rows[j].MessageDetailId) {
                if (result.Tables[1].Rows[j].AttachmentName != null) {
                    var attachementname = result.Tables[1].Rows[j].AttachmentName.substr(0, result.Tables[1].Rows[j].AttachmentName.lastIndexOf('.'));
                    var extension = result.Tables[1].Rows[j].AttachmentName.substr(result.Tables[1].Rows[j].AttachmentName.lastIndexOf('.') + 1, result.Tables[1].Rows[j].AttachmentName.length);
                    var attachedFileName = attachementname + '.' + extension;
                    str += '<div class="clear: both"></div><div style="font-weight:bold; padding:25px 0px;">Attachments:</div>';
                    if (result.Tables[1].Rows[j].AttachmentType == "AutoPDF") {
                        str += '<div class="AttachmentConatiner"><div class="AttacmentImg"><a href="' + attachmentpath + "imagename=" + result.Tables[1].Rows[j].AttachmentName + "&Path=connectmepdf" + '" target="_blank" style="color: #32323A;"><div class="Attachment-mail"><p><span><i class="fa ' + GetFileTypeIcon(extension) + '"  style="font-size: 25px;padding: 0px 10px 0 0;vertical-align: middle;"></i></span><div class="Attachmenttext">' + attachedFileName + '</div></p></div></a></div></div><div class="clear: both">&nbsp;</div>';
                    }
                    else
                        str += '<div class="AttachmentConatiner"><div class="AttacmentImg"><a href="' + attachmentpath + "imagename=" + result.Tables[1].Rows[j].AttachmentName + "&Path=Notification" + '" target="_blank"  style="color: #32323A;"><div class="Attachment-mail"><p><span><i class="fa ' + GetFileTypeIcon(extension) + '"  style="font-size: 25px;padding: 0px 10px 0 0;vertical-align: middle;"></i></span><div class="Attachmenttext">' + attachedFileName + '</div></p></div></a></div></div><div class="clear: both">&nbsp;</div>';
                }
            }
        }
    }

    $('.DetailsMessageContainer').html(str);
    $(".mobphone").mask('(000) 000-0000');
}

function File_OnChange(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    $("#nofile").html(filename);
    $('#btnRemoveFile').show();

}

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    $("#nofile").html('No File Chosen');
    return false;
}

function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}

function htmlDecode(value) {
    return $('<div/>').html(value).text();
}

$(document).on("click", ".SaveImageContainer", function () {
    if ($('#hdnType').text() != '9') {
        var img = $(this).find('img');
        var obj = $(this);
        var alt = $(img).attr('alt');
        var id = $(this).parent().find('input')[0].id + ',';
        var src = $(img).attr('src');
        function OnSuccess(data, status) {
            //w2alert(); commented as it was not hiding putback msg's 
            if (src.indexOf("Saved") >= 0) {
                var strtype = $('#hdnType').text();//saved                    
                if (strtype == "10")
                    $(obj).parent().hide();
                else
                    $(img).attr('src', 'images/notification_icon/SaveIcons.png')
                $(img).attr('alt', '0')
            }

            else {
                $(img).attr('src', 'images/notification_icon/SavedIcons.png')
                $(img).attr('alt', '1')

            }
            loadData(pagenumber, pageSize, $('#hdnType').text(), SortColumn, sortorder);
        }
        function OnError(request, status, error) {

        }


        if (alt == 1) {
            var param = { strng: id + ',', IsSaved: 0 };
            alt = 0;
            $.ajax({
                type: "POST",
                url: "Notification-Inbox.aspx/Savemsg",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });
        }
        else {
            var param = { strng: id + ',', IsSaved: 1 };
            alt = 1;
            $.ajax({
                type: "POST",
                url: "Notification-Inbox.aspx/Savemsg",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });
        }

        //  loadPage($('#hdnType').text());

    }
});

$(document).on("click", ".liclick", function () {

    parent = $(this).parent()[0];
    id = $(parent).find('input')[0].id;
    $('#replyaccno').val($(parent).attr('replyaccountno'));
    $('#hdnMailFrom').val($(parent).attr('mailfrom'));
    $('#hdnMessageId').val(id);
    var image = $(parent).find('div.SaveImageContainer img').attr('src');
    if (image == "../images/notification_icon/SavedIcons.png") {
        $('.btnSave').prop("src", "../images/saved-icon.png");
    }
    else {
        $('.btnSave').prop("src", "../images/save-icon.png");
    }
    DrawMsgBody();
    $('#hdnSubject').val($('.subject')[0].innerText);
    $('#MessageBody').show();
    $('#btnBack').show();
    $('.MailListing').hide();

    if (type == '11') {
        $('#btnReply').hide();
    }
    else {
        if (isReply != -1) {
            $('#btnReply').show();
        }
    }
    $('#btnPrevious').show();
    $('#btnNext').show();
    $('#divHeader').hide();
    ismsgopen = true;


    if ($(parent).prop('class') == 'unread') {
        $(parent).prop('class', '');

        ReadMsg($(this)[0].childNodes[0].childNodes[1].innerText);
    }
    if (arrmsgids.length > 1) {
        var index = arrmsgids.indexOf(id);
        if (index == 0) {
            $('#btnPrevious').hide();
            $('#btnNext').show();
        } else if (index >= arrmsgids.length - 1) {
            $('#btnPrevious').show();
            $('#btnNext').hide();
        } else if (index > 0 && index < (arrmsgids.length - 1)) {
            $('#btnPrevious').show();
            $('#btnNext').show();
        }
    } else {
        $('#btnPrevious').hide();
        $('#btnNext').hide();
    }

    if ((ismsgopen == true) && (isReply != -1)) {
        $('#btnReply').show();
    }
});

function loadData(pageIndex, pageSize, strtype, SortColumn, sortorder) {
    try {
        loader.showloader();
        var newcontent = '';
        var msgcount = '';

        //var sortorder = '';


        var param = { pageIndex: pageIndex, sortColumn: SortColumn, type: strtype, sortorder: sortorder, PageSize: pageSize };
        $.ajax({
            async: false,
            type: "POST",
            url: "Notification-Inbox.aspx/LoadMessages",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {

                
                data = data.d;
                result = $.parseJSON(data);
                if (result == null)
                {
                    $("#ddlPagesize").hide();
                    $("#legends").html('');
                    $("#right").hide();
                    $("#left").hide();
                }

                $('#ulNotificatons').html(result.dthtml[0].htmlCol);

                setUnreadMessage(result.Table1);

                //arrmsgids = new Array();
                //for (var j = 0; j < $(arrchkbox).length; j++) {
                //    arrmsgids[j] = $(arrchkbox)[j].id;
                //}
                $("#ddlPagesize").show();
                var pager = result.Pager;
                TotalRecord = result.Pager[0]["RecordCount"];
                if (TotalRecord <= 10) {
                    $("#legends").html('');
                    $("#right").hide();
                    $("#left").hide();
                }
                else {
                    $(".Pager").ASPSnippets_Pager({
                        ActiveCssClass: "current",
                        PagerCssClass: "pager",
                        PageIndex: parseInt(result.Pager[0]["PageIndex"]),
                        PageSize: parseInt(result.Pager[0]["PageSize"]),
                        RecordCount: parseInt(result.Pager[0]["RecordCount"])
                    });
                }
                //restorechkbx(chkbxchkedarr);

                //showpagesize();
                loader.hideloader();
            },
            error: function (request, status, error) {
                //w2alert('Error!! ' + request.statusText); 
                loader.hideloader();
            }
        });
        loader.hideloader();
    }
    catch (e) {
        console.log(e.message);
        loader.hideloader();
    }

}

function CallAjax(fnError, param) {
    try {

        loader.showloader();
        $.ajax({
            type: "POST",
            url: "../UserManagement/Customer.aspx/LoadGridAjax",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response, status, type) {
                loader.showloader();
                CustomerData = $.parseJSON(response.d);
              //  ConvertData();
                if (CustomerData != null) {
                    if (CustomerData != null) {
                        //if (mode == 1) {
                        //    //showhideeditor
                        //    databindtogrid = CustomerData.Table;
                        //}
                        //else {
                            databindtogrid = CustomerData.Table;
                      //  }
                        
                       // showdata(param);
                    } else {
                       // LoadChart();
                        loader.hideloader();
                        $('#nodata_div1').show();
                        $('#nodata_div1').html("<center><font color='Red'>No Data Available</Font></center>");
                        $('#jqxgrid').hide();
                        // $('#jqxchildgrid').hide();
                        //  $('.grid-section').hide();
                    }
                    loader.hideloader();
                }
                loader.hideloader();

            },
            error: function (request, status, error) {
                console.log('Error!! ' + request.statusText);
                loader.hideloader();
            },
        })
        loader.hideloader();
    }
    catch (e) { loader.hideloader(); }

}

$(document).ready(function () {

    $(document).on("click", ".details", function () {
        loader.showloader();
        var ids = $(this).data('id');
        custId = ids.split(",")[0];
        accnumber = ids.split(",")[1];
        var statusforlink = ids.split(",")[2];
        OpenCustomerDetail(ids, custId, accnumber, statusforlink, databindtogrid);
        loader.hideloader();

    });

    txtFrom = getMMDDYYDate($('#txtDateFrom').val());
    txtTo = getMMDDYYDate($('#txtDateTo').val());
    if (txtFrom == "NaN/NaN/N") {
        txtFrom = '';
    }
    if (txtTo == "NaN/NaN/N") {
        txtTo = '';
    }
       
    var param = {
        'datefrom': txtFrom,
        'dateto': txtTo,
        'cityid': '',
        'zipcode': '',
        'username': '',
        'customertype': '',
        'pprbillstatus': '',
        'textmsgstatus': '',
        'status': '',
        'accountno': '',
        'SearchString': '',
        'Mode': '2',
        'PageIndex': pageIndex,
        'PageSize': pageSize,
        'SortColumn': 'CustomerName',
        'SortOrder': 'ASC',
        'emailId': '',
        'MobilePhone': ''
    };
    CallAjax(Error, param);

    $('#summernote').summernote();
    $('.responsive_alignment_pagination').show();
    strtype = "7";

    loadData(pagenumber, pageSize, strtype, SortColumn, sortorder);

    $('.btnSave').prop("src", "../images/save-icon.png");

    $("#refsh").click(function () {
        pagenumber = "1";
        loadData(pagenumber, pageSize, strtype, SortColumn, sortorder);
        if ($("#chkall").prop('checked') == true) {
            $("#chkall").prop('checked', false);
        }
    })

    $('#left').click(function () {

        pagenumber = parseInt(pagenumber) - 1;
        $('#hdnSort').val('0');
        loadData(parseInt(pagenumber), $('#ddlPagesize').val(), $('#sidebar-programs li.active').attr('alt'), SortColumn, sortorder);

    })

    $('#right').click(function () {

        pagenumber = parseInt(pagenumber) + 1;
        $('#hdnSort').val('0');
        loadData(parseInt(pagenumber), $('#ddlPagesize').val(), $('#sidebar-programs li.active').attr('alt'), SortColumn, sortorder);
        //if ($("#chkall").prop('checked') == true) {
        //    $("#chkall").prop('checked', false);
        //}
    });
    $(".Pager").on('click', '.page', function () {
        pageIndex = parseInt($(this).attr('page'));
        $('#hdnSort').val('0');
        loadData(parseInt($(this).attr('page')), $('#ddlPagesize').val(), $('#sidebar-programs li.active').attr('alt'), SortColumn, sortorder);

    });
    /* end pagination */

    $("#ddlPagesize").change(function () {
        var selectedText = $(this).find("option:selected").text();
        var selectedValue = $(this).val();
        loadData(pageIndex, $('#ddlPagesize').val(), $('#sidebar-programs li.active').attr('alt'), SortColumn, sortorder);
        // alert("Selected Text: " + selectedText + " Value: " + selectedValue);
    });

    if (getParameterByName("Notification") == 1)
        $('#collapseOne').show();
    else
        $('#collapseOne').hide();


    $('#lblHeading').text('All Email');
    $("li.sidebar_allmail_inner").addClass("active");
    $('#lblFromTo').text('From');
    if (getParameterByName("type").toLowerCase() != "") {
        type = getParameterByName("type").toLowerCase();
        loadPage(type);
    }
    var resultfailure = getParameterByName("message");
    if (resultfailure != '' && resultfailure.toLowerCase() == 'false') {
        alert('Your message has been sent successfully');
    }
    else if (resultfailure != '' && resultfailure.toLowerCase() == 'true') {
        alert('Your message has not been sent successfully');
    }

    //setActiveLink(); // NEW UI 12/18/2014
    var arrchkbox = $('.MailListing input');
    arrmsgids = new Array();
    for (var i = 0; i < $(arrchkbox).length; i++) {
        if (i % 2 == 0)
            arrmsgids[i / 2] = $(arrchkbox)[i].id;
    }
    //}


    $('#btnSortFrom').click(function () {
        $('#ulNotificatons').text('');
        if ($('#viewFrom').val() == "ASC")
            $('#viewFrom').val("DESC");
        else {
            $('#viewFrom').val("ASC");
        }
        var value = $('#lblHeading').text() != 'All Email' ? $('#hdnType').text() : '11';//0019995
        //$('#ulNotificatons').append(Notification_Inbox.SortFrom(pagenumber,"MailFrom", $('#viewFrom').val(), value,pageSize).value);
        // Notification_Inbox.SortFrom(pagenumber, "MailFrom", $('#viewFrom').val(), value, pageSize);
        loadData(pagenumber, $('#ddlPagesize').val(), value, "MailFrom", $('#viewFrom').val());
    });

    $('#btnSubjectSort').click(function () {
        $('#ulNotificatons').text('');
        if ($('#viewSubject').val() == "ASC")
            $('#viewSubject').val("DESC");
        else {
            $('#viewSubject').val("ASC");
        }
        var value = $('#lblHeading').text() != 'All Email' ? $('#hdnType').text() : '11';//0019995
        // $('#ulNotificatons').append(Notification_Inbox.SortFrom($('#viewSubject').val(), "Subject", value).value);
        //  Notification_Inbox.SortFrom(pagenumber, "Subject", $('#viewSubject').val(), value, pageSize);
        loadData(pagenumber, $('#ddlPagesize').val(), value, "Subject", $('#viewSubject').val());
    });

    $('#btnDateSort').click(function () {
        $('#ulNotificatons').text('');
        if ($('#viewDate').val() == "ASC")
            $('#viewDate').val("DESC");
        else {
            $('#viewDate').val("ASC");
        }
        var value = $('#lblHeading').text() != 'All Email' ? $('#hdnType').text() : '11';//0019995
        //  $('#ulNotificatons').append(Notification_Inbox.SortFrom($('#viewDate').val(), "Date", value).value);
        //  Notification_Inbox.SortFrom(pagenumber, "Date", $('#viewDate').val(), value, pageSize);
        loadData(pagenumber, $('#ddlPagesize').val(), value, "FromDate", $('#viewDate').val());
    });

    $('#collapseOne').show();

    $('#chkall').change(function () {
        var c = this.checked;
        $('.MailListing input[type=checkbox]').prop('checked', c);

    });



    $('.MailListing').on('click', 'input[type=checkbox]', function () {
        var cnt = 0;
        var checkedcnt = 0;
        var uncheckedcnt = 0;
        $('.MailListing input[type=checkbox]').each(function (obj) {
            cnt++;
            if ($(this).prop('checked')) {
                checkedcnt++;
            }
            else {
                uncheckedcnt++;
            }
        });
        if (checkedcnt == cnt) {
            $('#chkall').prop('checked', true);
        }
        else {
            $('#chkall').prop('checked', false);
        }
    });


    $('#btnPrevious').click(function () {
        var index = arrmsgids.indexOf(id);
        if (index < arrmsgids.length && index != 0) {
            $('#btnNext').show();
        }
        if (index == 1) {
            $('#btnPrevious').hide();
        }
        if (!(index <= 0)) {
            id = arrmsgids[index - 1];
            DrawMsgBody();
            parent = $('.MailListing li[rowid=' + id + ']');
            if ($(parent).prop('class') == 'unread') {
                $(parent).prop('class', '');
                ReadMsg($(parent)[0].childNodes[2].childNodes[0].childNodes[1].innerText);
            }
            return false;
        }
        else { return false; }
    });

    $('#btnNext').click(function () {
        var index = arrmsgids.indexOf(id);
        if (index >= 0) {
            $('#btnPrevious').show();
        }
        if (index == arrmsgids.length - 2) {
            $('#btnNext').hide();
        }
        if (!(index < 0) && !(index >= arrmsgids.length - 1)) {
            id = arrmsgids[index + 1];
            DrawMsgBody();
            parent = $('.MailListing li[rowid=' + id + ']');
            if ($(parent).prop('class') == 'unread') {
                $(parent).prop('class', '');
                ReadMsg($(parent)[0].childNodes[2].childNodes[0].childNodes[1].innerText);
            }
            return false;
        }
        else { return false; }
    });

    $('#btnDiscard').click(function () {
        $('#msgReply').hide();
        //$find("ContentPlaceHolder1_rightpanel_editor_ctl02_ctl00").set_content('');
        $('#summernote').summernote('code', '');
        $('#fileupd').val('');
        var control = $("#fileupd");
        control.replaceWith(control = control.clone(true));
        $('#btnRemoveFile').hide();
        $("#nofile").html('No File Chosen');
    });

    $('#btnBack').click(function () {
        $('.responsive_alignment_pagination').show();
        $('.MailListing').show();
        $('#chkall').attr('checked', false);
        $('#MessageBody').hide();
        $('#btnBack').hide();
        $('#btnReply').hide();
        $('#msgReply').hide();
        $('#btnPrevious').hide();
        $('#btnNext').hide();
        $('#divHeader').show();
        $('.btnSave').prop("src", "../images/save-icon.png");
        if ($('#hdnType').text() == 9) {
            $('.btnSave').hide();
        }
        else { $('.btnSave').show(); }

        ismsgopen = false;
    });

    $('#btnReply').click(function () {
        $('#msgReply').show();
        return false;
    });

    $('.btnputback').click(function (e) {
        e.preventDefault();
        var str = '';

        var checkboxes = $('.MailListing').find('input:checked');
        function OnSuccess(data, status) {
            $('.MailListing').find('input[type=checkbox]:checked').each(function () {
                $(this).parent().parent().hide();
            });
            // w2alert($('#MoveMsg').text(), 'Notification', function () {               
            // })
            alert("Your message(s) has been moved to its source folder successfully");
            //loadData(pagenumber, pageSize);
        }
        function OnError(request, status, error) {
            // w2alert(request.statusText);
            alert("Your message(s) has not been moved to its source folder successfully");
        }
        if ($('#hdnType').text() == '9') {
            if (!ismsgopen) {
                if ($(checkboxes).length > 0) {
                    for (i = 0; i < $(checkboxes).length; i++) {
                        str += $(checkboxes)[i].id + ',';
                    }
                    loader.showloader();
                    var param = { 'strng': str, 'IsTrashed': 0, 'isdelete': 0 };
                    $.ajax({
                        type: "POST",
                        url: "Notification-Inbox.aspx/Deletemsg",
                        data: JSON.stringify(param),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });
                    // var returnVal = parseInt(Notification_Inbox.Deletemsg(str, 0, 0).value);
                    //if (returnVal > 0)
                    //    alert("Your message(s) has been moved to its source folder successfully");
                    //else
                    //    alert("Your message(s) has not been moved to its source folder successfully");
                    //loader.hideloader();
                }
                else {
                    alert('Please select message(s)');
                    return false;
                }
            }
            else {
                var param = { strng: id + ',', IsTrashed: 0, isdelete: 0 };
                $.ajax({
                    type: "POST",
                    url: "Notification-Inbox.aspx/Deletemsg",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });

                //loader.showloader();
                //var returnVal = parseInt(Notification_Inbox.Deletemsg(id + ',', 0, 0).value);
                //if (returnVal > 0)
                //    alert("Your message(s) has been moved to its source folder successfully");
                //else
                //    alert("Your message(s) has not been moved to its source folder successfully");
                //loader.hideloader();
            }
        }
        else if ($('#hdnType').text() == '12') {
            if (!ismsgopen) {
                if ($(checkboxes).length > 0) {
                    for (i = 0; i < $(checkboxes).length; i++) {
                        str += $(checkboxes)[i].id + ',';
                    }
                    loader.showloader();
                    var returnVal = parseInt(Notification_Inbox.Savemsg(str, 0).value);
                    if (returnVal > 0)
                        alert("Your message(s) has been moved to its source folder successfully");
                    else
                        alert("Your message(s) has not been moved to its source folder successfully");
                    loader.hideloader();
                }
                else {
                    alert('Please select message(s)');
                    return false;
                }
            }
            else {
                loader.showloader();
                var returnVal = parseInt(Notification_Inbox.Savemsg(id + ',', 0).value);
                if (returnVal > 0)
                    alert("Your message(s) has been moved to its source folder successfully");
                else
                    alert("Your message(s) has not been moved to its source folder successfully");
                loader.hideloader();
            }
        }

        loadPage($('#hdnType').text());
    });

    function deletemail() {
        var str = '';

        function OnSuccess(data, status) {
            alert("Your message(s) has been deleted successfully");
            $('.MailListing').find('input[type=checkbox]:checked').each(function () {
                $(this).parent().parent().hide();
                chkbxchkedarr.pop($(this).attr('id'));
            });

            if ($('#chkall').prop("checked") == true) {
                $('#chkall').prop('checked', false);
            }

            if (ismsgopen) {
                var id = $.parseJSON($(this)[0].data)["strng"].split(',')[0];
                $('.MailListing').find('li[rowid=' + id + ']').hide();
                chkbxchkedarr.pop(id);
            }
            //  $('#btnBack').trigger("click");
            if ($("#chkall").prop('checked') == true) {
                var page = Math.ceil(TotalRecord / 10);
                if (page == pagenumber) pagenumber = pagenumber - 1;
            }
            if (ismsgopen)
            {
                $('#btnBack').click();
            }
            loadData(pagenumber, pageSize, $('#hdnType').text(), SortColumn, sortorder);
        }
        function OnError(request, status, error) {
            alert("Your message(s) has not been deleted");
            // toastr.success(request.statusText);
        }
        //End Comment


        var str = '';
        var checkboxes = $('.MailListing').find('input:checked');
        $('#btnRemoveFile').hide();
        if ($('#hdnType').text() != '9') {

            if (!ismsgopen) {
                if ($(checkboxes).length > 0) {
                    for (i = 0; i < $(checkboxes).length; i++) {
                        str += $(checkboxes)[i].id + ',';
                    }

                    if (!ConfirmDelete(0))
                        return false;
                    // Notification_Inbox.deletemsg(str, 1, 0).value;
                    var param = { strng: str, IsTrashed: 1, isdelete: 0 };
                    $.ajax({
                        type: "POST",
                        url: "Notification-Inbox.aspx/Deletemsg",
                        data: JSON.stringify(param),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });

                }

                else {
                    alert('Please select message(s)');
                    return false;
                }
            }
            else {
                if (!ConfirmDelete(0))
                    return false;
                // Notification_Inbox.deletemsg(id + ',', 1, 0).value;
                var param = { strng: id + ',', IsTrashed: 1, isdelete: 0 };
                $.ajax({
                    type: "POST",
                    url: "Notification-Inbox.aspx/Deletemsg",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });

            }
        }
        else {
            if (!ismsgopen) {
                if ($(checkboxes).length > 0) {
                    for (i = 0; i < $(checkboxes).length; i++) {
                        str += $(checkboxes)[i].id + ',';
                    }
                    if (!ConfirmDelete(1))
                        return false;
                    // Notification_Inbox.deletemsg(str, 1, 1).value;
                    var param = { strng: str, IsTrashed: 1, isdelete: 1 };
                    $.ajax({
                        type: "POST",
                        url: "Notification-Inbox.aspx/Deletemsg",
                        data: JSON.stringify(param),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });
                }
                else {
                    //w2alert($('#IDMessages').text());
                    alert('Please select message(s)');
                    return false;
                }
            }
            else {
                if (!ConfirmDelete(1))
                    return false;
                // Notification_Inbox.deletemsg(id + ',', 1, 1).value;
                var param = { strng: id + ',', IsTrashed: 1, isdelete: 1 };
                $.ajax({
                    type: "POST",
                    url: "Notification-Inbox.aspx/Deletemsg",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });
            }
        }
    }

    $('.btnDelete').click(function (e) {
        e.preventDefault();
        deletemail();
        //var str = '';
        //var checkboxes = $('.MailListing').find('input:checked');
        //$('#btnRemoveFile').hide();
        //if ($('#lblHeading').text().toLowerCase() != 'trash') {
        //    if (!ismsgopen) {
        //        if ($(checkboxes).length > 0) {
        //            for (i = 0; i < $(checkboxes).length; i++) {
        //                str += $(checkboxes)[i].id + ',';
        //            }
        //            if (!ConfirmDelete(0))
        //                return false;
        //            loader.showloader();
        //            var returnval = parseInt(Notification_Inbox.Deletemsg(str, 1, 0).value);
        //            if (returnval > 0)
        //                alert("Your message(s) has been deleted successfully");
        //            else
        //                alert("Your message(s) has not been deleted");
        //            loader.hideloader();
        //        }
        //        else {
        //            alert('Please select message(s)');
        //            return false;
        //        }
        //    }
        //    else {
        //        if (!ConfirmDelete(0))
        //            return false;
        //        loader.showloader();
        //        var returnval = parseInt(Notification_Inbox.Deletemsg(id + ',', 1, 0).value);
        //        if (returnval > 0)
        //            alert("Your message(s) has been deleted successfully");
        //        else
        //            alert("Your message(s) has not been deleted");
        //        loader.hideloader();
        //    }
        //}
        //else {
        //    if (!ismsgopen) {
        //        if ($(checkboxes).length > 0) {
        //            for (i = 0; i < $(checkboxes).length; i++) {
        //                str += $(checkboxes)[i].id + ',';
        //            }
        //            if (!ConfirmDelete(1))
        //                return false;

        //            loader.showloader();
        //            var returnval = parseInt(Notification_Inbox.Deletemsg(str, 1, 1).value);
        //            if (returnval > 0)
        //                alert("Your message(s) has been deleted successfully");
        //            else
        //                alert("Your message(s) has not been deleted");

        //            loader.hideloader();
        //        }
        //        else {
        //            alert('Please select message(s)');
        //            return false;
        //        }
        //    }
        //    else {
        //        if (!ConfirmDelete(1))
        //            return false;
        //        loader.showloader();
        //        var returnval = parseInt(Notification_Inbox.Deletemsg(id + ',', 1, 1).value);
        //        if (returnval > 0)
        //            alert("Your message(s) has been deleted successfully");
        //        else
        //            alert("Your message(s) has not been deleted");
        //        loader.hideloader();
        //    }
        //}
        // loadPage($('#hdnType').text());
    });

    $('.btnSave').click(function (e) {
        e.preventDefault();
        function OnSuccess(data, status) {
            $('.MailListing').find('input[type=checkbox]:checked').each(function (obj) {
                var img = $(this).parent().parent().find('.SaveImageContainer');
                $(this).prop('checked', false);
                chkbxchkedarr.splice(chkbxchkedarr.indexOf($(this).parent().find('input')[0].id), 1);
                var src = $(img).find('img').attr('src');
                if (src.indexOf('Saved') >= 0) {
                    //   var strtype = GetParameterValues('type');
                    var strtype = $('#hdnType').text();//saved                    
                    if (strtype == "10")
                        $(this).closest('li').hide();
                    else {
                        $(img).find('img').attr('src', '../images/notification_icon/SaveIcons.png')
                        $(img).find('img').attr('alt', '0');
                    }
                }
                else {
                    $(img).find('img').attr('src', '../images/notification_icon/SavedIcons.png');
                    $(img).find('img').attr('alt', '1');
                }

            });

            if ($('#chkall').prop("checked") == true) {
                $('#chkall').prop('checked', false);
            }

            if ($('.btnSave').attr('src').indexOf('saved-icon.png') == -1) {
                $('.btnSave').prop('src', '../images/saved-icon.png');
                $('#ulNotificatons li[rowid=' + id + '] div.SaveImageContainer img').prop("src", "../images/notification_icon/SavedIcons.png");
            }
            else {
                $('.btnSave').prop('src', '../images/save-icon.png');
                $('#ulNotificatons li[rowid=' + id + '] div.SaveImageContainer img').prop("src", "../images/notification_icon/SaveIcons.png");
            }



            // loadData(pagenumber, pageSize, $('#hdnType').val());
               loadPage($('#hdnType').text());
        }
        function OnError(request, status, error) {

        }
        if (!ismsgopen) {
            var str = '';
            var checkboxes = $('.MailListing').find('input:checked');
            if ($(checkboxes).length > 0) {
                for (var i = 0; i < $(checkboxes).length; i++) {
                    str += $(checkboxes)[i].id + ',';
                }
                //  Notification_Inbox.Savemsg(str, 1).value;

                var param = { strng: str + ',', IsSaved: 1 };
                alt = 0;
                $.ajax({
                    type: "POST",
                    url: "Notification-Inbox.aspx/Savemsg",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });


            }
            else {
                alert('Please select message(s)');
                return false;
            }
        }
        else {
            //Notification_Inbox.Savemsg(id + ',', 1).value;
            var param = { strng: id + ',', IsSaved: 1 };
            $.ajax({
                type: "POST",
                url: "Notification-Inbox.aspx/Savemsg",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });

        }

    });

    $(".btnputback").hide();

    function IsFileValidForUpload() {

        for (var i = 0; i < $("#fileupd").get(0).files.length; i++) {

            var fileName = $("#fileupd").get(0).files[i].name;

            var nameArr = $("#fileupd").get(0).files[i].name.split('.');

            if (nameArr[nameArr.length - 1] == 'exe') {
                return false;
            }
            else if (nameArr[nameArr.length - 1] == 'dll') {
                return false;
            }
        }

        return true;
    }

    function validateconfiguration() {
        var isvalid = (GetFileSize('fileupd'));
        //var objEditor = $find("ContentPlaceHolder1_rightpanel_editor_ctl02_ctl00");
        var value = $('#summernote').summernote('code');  //objEditor.get_content();
        if (value == "") {
            alert('Please Enter Message');
            isvalid = false;
        }
        return isvalid;
    }

    function OnSuccess(data, status) {
        if (parseInt(data.d) > 0)
            alert('Your message has been sent successfully');
        else
            alert('Your message has not been sent successfully');
        loader.hideloader();
        window.location.reload();
    }
    function OnError(request, status, error) {
        alert(request.statusText);
    }

    function saveUloadedFile() {

        var data = new FormData();

        var files = $("#fileupd").get(0).files;

        // Add the uploaded image content to the form data collection
        if (files.length > 0) {
            data.append("UploadedImage", files[0]);
        }
        var flName = '';
        // Make Ajax request with the contentType = false, and procesDate = false
        var ajaxRequest = $.ajax({
            type: "POST",
            async: false,
            url: "" + $('#filehandlerpath').val() + "Path=Notification",
            contentType: false,
            processData: false,
            data: data,
            success: function (data) { flName = data; }
        });

        ajaxRequest.done(function (xhr, textStatus) {
            // Do other operation
        });

        return flName;
    }

    $('#btnSubmitReply').click(function () {


        if (validateconfiguration()) {
            if (!IsFileValidForUpload()) {
                alert('Invalid File Format');
                return false;
            }

            loader.showloader();
            var placeholder = $(parent)[0].childNodes[2].childNodes[0].childNodes[1].textContent;
            var subject = $("#TxtMsgSubject").text();
            var mailfrom = "2";
            var messageBody = $('#summernote').summernote('code'); // $find("ContentPlaceHolder1_rightpanel_editor_ctl02_ctl00").get_content();
            var accountNumber = $('#FromAccNum').text();

            var attachmentpath = $('#filehandlerpath').val();
            var src = "";
            var attachmentType = "";
            var messageMod = "1";

            var file = document.getElementById('fileupd');
            if (file.files.length > 0) {
                src = saveUloadedFile();
                attachmentType = file.files[0].name.split('.')[1];
            }

           
            //var param = "{MessageID:'" + $('#hdnMessageId').val() + "',CreatedBy:'" + 2 + "',MessageBody:'" + $('#summernote').summernote('code') + "',SendTo:'" + $('#replyaccno').val() + "', type:'" + $('#hdnType').Val + "', AttachmentName:'" + src + "', MailFrom:'" + $('#hdnMailFrom').val() + "', Subject:'" + $('#hdnSubject').val() + "'}";
            var param = "{MessageID:'" + $('#hdnMessageId').val() + "',CreatedBy:'" + 2 + "',MessageBody:'" + $('#summernote').summernote('code') + "',SendTo:'" + $('#replyaccno').val() + "', type:'" + $('#hdnType').text() + "', AttachmentName:'" + src + "', MailFrom:'" + $('#hdnMailFrom').val() + "', Subject:'" + $('#hdnSubject').val() + "'}";

            $.ajax({
                type: "POST",
                url: "Notification-Inbox.aspx/CreateMessages",
                data: param,
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });

        }
        else {
            return false;
        }
    });

    function OnSuccess(data, status) {
        var res = data.d;
        window.location.href = res;
        loader.hideloader();
    }

    function OnError(request, status, error) {
        alert(request.statusText);
        loader.hideloader();
    }

});

$('#sidebar-programs [id=outbox]').click(function () {
    window.location.href = "Notification-outbox.aspx";
});

$('#sidebar-programs [id=outage]').click(function () {
    $('#hdnType').text('1');
    LoadMessage('outage', 'Outage', '1');
});

$('#sidebar-programs [id=connectme]').click(function () {
    $('#hdnType').text('2');
    LoadMessage('connectme', 'Connect Me', '2');
});

$('#sidebar-programs [id=service]').click(function () {
    $('#hdnType').text('3');
    LoadMessage('service', 'Services', '3');
});

$('#sidebar-programs [id=billing]').click(function () {
    $('#hdnType').text('4');
    LoadMessage('billing', 'Billing', '4');
});

$('#sidebar-programs [id=leakalert]').click(function () {
    $('#hdnType').text('13');
    LoadMessage('leakalert', 'Leak Alert', '13');
});

$('#sidebar-programs [id=demandresponse]').click(function () {
    $('#hdnType').text('5');
    LoadMessage('demandresponse', 'Demand Response', '5');
});

$('#sentitem').click(function () {
    $('#hdnType').text('8');
    LoadMessage('sent', 'Sent', '8');
});

$('#trash').click(function () {
    $('#hdnType').text('9');
    LoadMessage('trash', 'Trash', '9');
});

$('#saved').click(function () {
    $('#hdnType').text('10');
    LoadMessage('saved', 'Saved', '10');
});

$('#allmail').click(function () {
    $('#hdnType').text('11');
    LoadMessage('allmail', 'All Email', '11');
});

$('#sidebar-programs [id=loginissue]').click(function () {
    $('#hdnType').text('6');
    LoadMessage('loginissues', 'Login Issues', '6');
});

function getQueryStringValue(key) {
    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
}






