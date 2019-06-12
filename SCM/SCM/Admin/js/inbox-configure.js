var arrmsgids;
var id;
var parent;
var ismsgopen = false;
function loadPage(type) {
    var classType = type.toLowerCase();
    var name;
    var typeNotification;
    switch (type.toLowerCase()) {
        case "outage":
            name = "Outage";
            typeNotification = name.toLowerCase();
            break;
        case "billing":
            name = "Billing";
            typeNotification = name.toLowerCase();
            break;
        case "service":
            name = "Service";
            typeNotification = name.toLowerCase();
            break;
        case "connect me":
            name = "Connect Me";
            classType = "connectme";
            typeNotification = name.toLowerCase();
            break;
        case "demand response":
            name = "Demand Response";
            classType = "demandresponse";
            typeNotification = name.toLowerCase();
            break;
        case "sent":
            name = "Sent";
            classType = "sentemail";
            typeNotification = name.toLowerCase();
            break;
        case "resolved":
            name = "Resolved";
            classType = 'saved';
            typeNotification = name.toLowerCase();
            break;
        case "trash":
            name = "Trash";
            typeNotification = name.toLowerCase();
            break;
        default:
            name = "All Email";
            typeNotification = "allmail";
            classType = 'allemail';
            break;
    }

    LoadMessage(typeNotification, name, classType);
}
function DrawMsgBody() {
    var result = configure_inbox.GetMsgBody(id).value;
    var str = '';
  //  var textFromTo = $('#lblHeading').text().toLowerCase() == 'sent' ? 'To' : 'From';
    for (var i = 0; i < result.Rows.length; i++) {
      var  textFromTo = result.Rows[i].IsReply == 1 ? 'To' : 'From';
        str += '<div class="DetailsMessageHeader"><div class="from-section">' + textFromTo + ':</div>';
        str += '<div class="from-name-section">' + result.Rows[i].MailFrom + '</div><div class="clear">&nbsp;</div>';
        str += '<div class="from-section">Topic: </div>';
        str += '<div class="from-name-section">' + result.Rows[i].Topic + '</div><div class="clear">&nbsp;</div>';
        str += '<div class="from-section">Subject: </div>';
        str += '<div class="from-name-section">' + result.Rows[i].Subject + '</div><div class="clear">&nbsp;</div>';
        str += '<div class="from-section">Date: </div><div class="from-name-section">' + calcLocalTime(result.Rows[i].CreatedDate) + '</div><div class="clear">&nbsp;</div>';
        str += '<div class="from-section">Message:</div><div class="from-name-section">' + (result.Rows[i].MessageBody == null ? ' ' : result.Rows[i].MessageBody) + '</div></div><div class="clear">&nbsp;</div>';
        str += "<hr style='width:100%'>";
    }
    for (var i = 0; i < result.Rows.length; i++) {
        if (result.Rows[i].AttachmentName != null) {
            var attachementname = result.Rows[i].Attachment.substr(0, result.Rows[i].Attachment.lastIndexOf('_'));
            var extension = result.Rows[i].Attachment.substr(result.Rows[i].Attachment.lastIndexOf('.') + 1, result.Rows[i].Attachment.length);
            var attachedFileName = attachementname + '.' + extension;
            str += '<div class="clear"></div><div style="font-weight:bold; padding:25px 0px;">Attachments:</div>';
            str += '<a href="' + attachmentpath + '/' + result.Rows[i].AttachmentName + '" target="_blank"><div class="AttachmentConatiner"><div class="AttacmentImg"><img src="../images/attachment_document.png" /></div><div class="Attachmenttext">' + attachedFileName + '</div></div></a><div class="clear">&nbsp;</div>';
        }
        else if (result.Rows[i].Attachment != 0 && result.Rows[i].Attachment != null) {
            var attachementname = result.Rows[i].Attachment.substr(0, result.Rows[i].Attachment.lastIndexOf('_'));
            var extension = result.Rows[i].Attachment.substr(result.Rows[i].Attachment.lastIndexOf('.') + 1, result.Rows[i].Attachment.length);
            var attachedFileName = attachementname + '.' + extension;
            str += '<div class="clear"></div><div style="font-weight:bold; padding:25px 0px;">Attachments:</div>';
            str += '<a href="' + attachmentpath + '/' + result.Rows[i].Attachment + '" target="_blank"><div class="AttachmentConatiner"><div class="AttacmentImg"><img src="../images/attachment_document.png" /></div><div class="Attachmenttext">' + attachedFileName + '</div></div></a><div class="clear">&nbsp;</div>';

        }
    }
    $('.DetailsMessageContainer').html(str);
}

function calcLocalTime(date) {
    try {
        var converteddate = new Date(date);
        var minOffset = new Date().getTimezoneOffset();
        converteddate.setMinutes(converteddate.getMinutes() - minOffset);
        return converteddate.toLocaleString();
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

function ReadMsg() {
    configure_inbox.Readmsg(id, 1);
    if ($('#lblHeading').text().toLowerCase() != 'trash') {
        //var label = $(parent).find('.LabelsContainer').children()[0].innerHTML.toLowerCase();
        var label = $('#lblHeading').text().toLowerCase();
        var value = '';
        var leftvalue;
        switch (label) {
            case 'connect me':
                value = $('.lblConnectme').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblConnectme').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'outage':
                value = $('.lblOutage').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblOutage').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'billing':
                value = $('.lblBilling').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblBilling').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'service':
                value = $('.lblService').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblService').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
            case 'demand response':
                value = $('.lbldemandresponse').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lbldemandresponse').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                value = $('.lblInbox').text().replace('(', '').replace(')', '');
                leftvalue = value - 1;
                $('.lblInbox').text(leftvalue <= 0 ? '' : '(' + leftvalue + ')');
                break;
        }
    }
}

function File_OnChange(sender) { $('#btnRemoveFile').show(); }

//function GetFileSize(fileid) {
//    if ($('#fileupd').val() != '') {
//        try {
//            var fileSize = 0;
//            //for IE
//            if ($.browser.msie) {
//                //before making an object of ActiveXObject, 
//                //please make sure ActiveX is enabled in your IE browser
//                var objFSO = new ActiveXObject("Scripting.FileSystemObject"); var filePath = $("#" + fileid)[0].value;
//                var objFile = objFSO.getFile(filePath);
//                var fileSize = objFile.size; //size in kb
//                fileSize = fileSize / 1048576; //size in mb 
//                if (fileSize >= 5) {
//                    alert("File size exceeds 5 MB. Please try uploading smaller size file.")
//                    return false;
//                }
//            }
//                //for FF, Safari, Opeara and Others
//            else {
//                fileSize = $('#fileupd')[0].files[0].size //size in kb
//                //fileSize = $("#fUpload")[0].files[0].size //size in kb
//                fileSize = fileSize / 1048576; //size in mb
//                if (fileSize >= 5) {
//                    alert("File size exceeds 5 MB. Please try uploading smaller size file.")
//                    return false;
//                }
//            }
//            //alert("Uploaded File Size is" + fileSize + "MB");
//        }
//        catch (e) {
//        }
//    }
//    return validateeditorcontent();
//}
function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}
function getParameterByName(name) {
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    var regex = new RegExp("[\\?&]" + name + "=([^&#]*)"),
        results = regex.exec(location.search);
    return results === null ? "" : decodeURIComponent(results[1].replace(/\+/g, " "));
}
var v = "";
$(document).on("click", ".SaveImageContainer",function () {
    if ($('#lblHeading').text() != 'trash') {
        var img = $(this).find('img');
        var alt = $(img).attr('alt');
        var id = $(this).parent().find('input')[0].id + ',';
        if (alt == 1) {
            configure_inbox.Savemsg(id, 0).value;
        }
        else {
            configure_inbox.Savemsg(id, 1).value;
        }
        
        loadPage($('#lblHeading').text());
        //LoadMessage('resolved', 'Resolved', 'saved');
    }
});
$(document).on("click", ".liclick", function () {
    parent = $(this).parent()[0];
    id = $(parent).find('input')[0].id;
    $('#replyaccno').val($(parent).attr('replyaccountno'));
    $('#hdnMessageId').val(id);
    $('#hdnType').val(ReturnName($('#lblHeading').text()));
    DrawMsgBody();
    $('#MessageBody').show();
    $('#btnBack').show();
    $('.MailListing').hide();
    //if ($('#lblHeading').text().toLowerCase() != 'sent' && $('#lblHeading').text().toLowerCase() != 'trash')
    $('#btnReply').show();
    $('#btnPrevious').show();
    $('#btnNext').show();
    $('#divHeader').hide();
    ismsgopen = true;

    if ($(parent).prop('class') == 'unread') {
        $(parent).prop('class', '');
        ReadMsg();

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
});
$(document).ready(function() {
    // setCss();
    if (getParameterByName("Notification") == 1)
        $('#collapseOne').show();
    else
        $('#collapseOne').hide();
  
    $('#ulNotificatons').append(configure_inbox.LoadMessages('', 'allmail', '').value);
    $('#lblHeading').text('All Email');
   
    $('#lblFromTo').text('From');
    if (getParameterByName("type").toLowerCase() != "") {
        var type = getParameterByName("type").toLowerCase();
        loadPage(type);
    }
    var resultfailure= getParameterByName("message");
    if (resultfailure != '' && resultfailure.toLowerCase() == 'false') {
        alert('Message sent');
    }
    else if (resultfailure != '' && resultfailure.toLowerCase() == 'true') {
        alert('Message not sent');
    }
    var result = configure_inbox.UnreadMessage().value;
    for (var i = 0; i < result.Rows.length; i++) {
        $('#unReadOutage').text(result.Rows[i].Outage != '0' ? '(' + '' + result.Rows[i].Outage + ' )' : '');
        $('#unReadInbox').text(result.Rows[i].Inbox != '0' ? '(' + '' + result.Rows[i].Inbox + ' )' : '');
        $('#unReadConnectMe').text(result.Rows[i].ConnectMe != '0' ? '(' + '' + result.Rows[i].ConnectMe + ' )' : '');
        $('#unReadService').text(result.Rows[i].Service != '0' ? '(' + '' + result.Rows[i].Service + ' )' : '');
        $('#unReadBilling').text(result.Rows[i].Billing != '0' ? '(' + '' + result.Rows[i].Billing + ' )' : '');
        $('#unReadDemandResponse').text(result.Rows[i].DemandResponse != '0' ? '(' + '' + result.Rows[i].DemandResponse + ' )' : '');
    }
    //setActiveLink(); // NEW UI 12/18/2014
    var arrchkbox = $('.MailListing input');
    arrmsgids = new Array();
    for (var i = 0; i < $(arrchkbox).length; i++) {
        arrmsgids[i] = $(arrchkbox)[i].id;
    }
  
    $('#btnSortFrom').click(function () {
        $('#ulNotificatons').text('');
        if ($('#viewFrom').val() == "ASC")
            $('#viewFrom').val("DESC");
        else {
            $('#viewFrom').val("ASC");
        }
        var value = $('#lblHeading').text() != 'All Email' ? $('#lblHeading').text() : 'allmail';
        $('#ulNotificatons').append(configure_inbox.SortFrom($('#viewFrom').val(), "MailFrom", value).value);
    });
    $('#btnSubjectSort').click(function () {
        $('#ulNotificatons').text('');
        if ($('#viewSubject').val() == "ASC")
            $('#viewSubject').val("DESC");
        else {
            $('#viewSubject').val("ASC");
        }
        var value = $('#lblHeading').text() != 'All Email' ? $('#lblHeading').text() : 'allmail';
        $('#ulNotificatons').append(configure_inbox.SortFrom($('#viewSubject').val(), "Subject",value).value);
    });
    $('#btnDateSort').click(function () {
        $('#ulNotificatons').text('');
        if ($('#viewDate').val() == "ASC")
            $('#viewDate').val("DESC");
        else {
            $('#viewDate').val("ASC");
        }
        var value = $('#lblHeading').text() != 'All Email' ? $('#lblHeading').text() : 'allmail';
        $('#ulNotificatons').append(configure_inbox.SortFrom($('#viewDate').val(), "Date",value).value);
    });
   
    $('#collapseOne').show();
   
  

    $('#chkall').change(function () {
        var c = this.checked;
        $('.MailListing input[type=checkbox]').prop('checked', c);
    });
    $('.MailListing input[type=checkbox]').click(function () {
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
                ReadMsg();
                $(parent).prop('class', '');
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
                ReadMsg();
                $(parent).prop('class', '');
            }
            return false;
        }
        else { return false; }
    });

    $('#btnDiscard').click(function () {
        $('#msgReply').hide();
        $('.htmleditor').val("");
    });

    $('#btnBack').click(function () {
        $('.MailListing').show();
        $('#MessageBody').hide();
        $('#btnBack').hide();
        $('#btnReply').hide();
        $('#msgReply').hide();
        $('#btnPrevious').hide();
        $('#btnNext').hide();
        $('#divHeader').show();
        $('.btnSave').show();
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
        if ($('#lblHeading').text().toLowerCase() == 'trash') {
            if (!ismsgopen) {
                if ($(checkboxes).length > 0) {
                    for (i = 0; i < $(checkboxes).length; i++) {
                        str += $(checkboxes)[i].id + ',';
                    }
                    var returnVal = parseInt(configure_inbox.Deletemsg(str, 0, 0).value);
                    if (returnVal > 0)
                        alert("Your message(s) has been moved to its source folder successfully.");
                    else
                        alert("Your message(s) has not been moved to its source folder successfully.");
                }
                else {
                    alert('Please select message(s).');
                    return false;
                }
            }
            else {
                var returnVal = parseInt(configure_inbox.Deletemsg(id + ',', 0, 0).value);
                if (returnVal > 0)
                    alert("Your message(s) has been moved to its source folder successfully.");
                else
                    alert("Your message(s) has not been moved to its source folder successfully.");
            }
        }
        else if ($('#lblHeading').text().toLowerCase() == 'resolved') {
            if (!ismsgopen) {
                if ($(checkboxes).length > 0) {
                    for (i = 0; i < $(checkboxes).length; i++) {
                        str += $(checkboxes)[i].id + ',';
                    }
                    var returnVal = parseInt(configure_inbox.Savemsg(str, 0).value);
                    if (returnVal > 0)
                        alert("Your message(s) has been moved to its source folder successfully.");
                    else
                        alert("Your message(s) has not been moved to its source folder successfully.");
                }
                else {
                    alert('Please select message(s).');
                    return false;
                }
            }
            else {
                var returnVal = parseInt(configure_inbox.Savemsg(id + ',', 0).value);
                if (returnVal > 0)
                    alert("Your message(s) has been moved to its source folder successfully.");
                else
                    alert("Your message(s) has not been moved to its source folder successfully.");
            }
        }
        loadPage($('#lblHeading').text());
    });

    $('.btnDelete').click(function (e) {
        e.preventDefault();
        var str = '';
        var checkboxes = $('.MailListing').find('input:checked');
        $('#btnRemoveFile').hide();
        if ($('#lblHeading').text().toLowerCase() != 'trash') {
            if (!ismsgopen) {
                if ($(checkboxes).length > 0) {
                    for (i = 0; i < $(checkboxes).length; i++) {
                        str += $(checkboxes)[i].id + ',';
                    }
                    if (!ConfirmDelete(0))
                        return false;
                    configure_inbox.Deletemsg(str, 1, 0).value;
                }
                else {
                    alert('Please select message(s).');
                    return false;
                }
            }
            else {
                if (!ConfirmDelete(0))
                    return false;
                configure_inbox.Deletemsg(id + ',', 1, 0).value;
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
                    configure_inbox.Deletemsg(str, 1, 1).value;
                }
                else {
                    alert('Please select message(s).');
                    return false;
                }
            }
            else {
                if (!ConfirmDelete(1))
                    return false;
                configure_inbox.Deletemsg(id + ',', 1, 1).value;
            }
        }
        loadPage($('#lblHeading').text());
    });

    $('.btnSave').click(function (e) {
        e.preventDefault();
        if (!ismsgopen) {
            var str = '';
            var checkboxes = $('.MailListing').find('input:checked');
            if ($(checkboxes).length > 0) {
                for (var i = 0; i < $(checkboxes).length; i++) {
                    str += $(checkboxes)[i].id + ',';
                }
                configure_inbox.Savemsg(str, 1).value;
            }
            else {
                alert('Please select message(s).');
                return false;
            }
        }
        else { configure_inbox.Savemsg(id + ',', 1).value; }
        loadPage($('#lblHeading').text());
    });

    $(".btnputback").hide();
});
//});

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

function ReturnName(type) {
  
    var name;

    switch (type.toLowerCase()) {
        case "outage":
            name = "Outage";
           
            break;
        case "billing":
            name = "Billing";
          
            break;
        case "service":
            name = "Service";
           
            break;
        case "connect me":
            name = "Connect Me";
          
            break;
        case "demand response":
            name = "Demand Response";
          
            break;
        case "sent":
            name = "Sent";
          
            break;
        case "resolved":
            name = "Resolved";
          
            break;
        case "trash":
            name = "Trash";
          
            break;
        default:
            name = "All Email";
           
            break;
    }

    return name;
}
function htmlDecode(value) {
    return $('<div/>').html(value).text();
}