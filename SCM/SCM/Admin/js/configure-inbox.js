var arrmsgids;
var id;
var parent;
var ismsgopen = false;

function DrawMsgBody() {
    var result = configure_inbox.GetMsgBody(id).value;
    var str = '';
    for (var i = 0; i < result.Rows.length; i++) {
     
        str += '<div class="DetailsMessageHeader"><div class="from-section">From: </div>';
        str += '<div class="from-name-section">' + result.Rows[i].MailFrom + '</div><div class="clear">&nbsp;</div>';
        str += '<div class="from-section">Subject: </div>';
        str += '<div class="from-name-section">' + result.Rows[i].Subject + '</div><div class="clear">&nbsp;</div></div>';
        str += '<div class="from-section">Date:</div><div class="from-name-section">' + result.Rows[i].CreatedDate + '</div>';
        str += '<div class="clear">&nbsp;</div><div class="DMcontent">' + result.Rows[i].MessageBody + '</div></div>';
    }
    for (var i = 0; i < result.Rows.length; i++) {
        if (result.Rows[i].AttachmentName != null) {
            str += '<div style="font-weight:bold; padding:0px 20px;">Attachments:</div>';
            str += '<a href="'+attachmentpath + result.Rows[i].AttachmentName + '" target="_blank"><div class="AttachmentConatiner"><div class="AttacmentImg"><img src="../images/attachment_document.png" /></div><div class="Attachmenttext">' + result.Rows[i].AttachmentName + '</div></div></a><div class="clear">&nbsp;</div>';
        }
        else if (result.Rows[i].Attachment != null) {
            str += '<div style="font-weight:bold; padding:0px 20px;">Attachments:</div>';
            str += '<a href="' + attachmentpath + result.Rows[i].Attachment + '" target="_blank"><div class="AttachmentConatiner"><div class="AttacmentImg"><img src="../images/attachment_document.png" /></div><div class="Attachmenttext">' + result.Rows[i].Attachment + '</div></div></a><div class="clear">&nbsp;</div>';
        }
    }
    $('.DetailsMessageContainer').html(str);
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
    location.reload();
    configure_inbox.Readmsg(id, 1);
    if ($('#hdnType').val() != 'trash') {
        var label = $(parent).find('.LabelsContainer').children()[0].innerHTML.toLowerCase();
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
//                fileSize = fileSize / 1048576; //size in mb
//                if (fileSize >= 5) {
//                    alert("File size exceeds 5 MB. Please try uploading smaller size file.")
//                    return false;
//                }
//            }
//        }
//        catch (e) {
//        }
//    }

//    if ($find("editor").get_content() == '') {
//        alert("Please enter message");
//        return false;
//    }
//    else {
//        return true;
//    }
//}

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    return false;
}

$(document).ready(function () {
  
    $('#btnSortFrom').click(function () {
        $('#ulNotificatons').text('');
        $('#ulNotificatons').append(configure_inbox.SortFrom().value);
    });
    $('.liclick').click(function () {
        parent = $(this).parent()[0];
        id = $(parent).find('input')[0].id;
        $('#replyaccno').val($(parent).attr('replyaccountno'));
        $('#hdnMessageId').val(id);
        DrawMsgBody();
        $('#MessageBody').show();
        $('#btnBack').show();
        $('.MailListing').hide();
        if ($('#hdnType').val().toLowerCase() != 'sent')
        $('#btnReply').show();
        $('#btnPrevious').show();
        $('#btnNext').show();
        $('#divHeader').hide();
        ismsgopen = true;
        if ($(parent).attr('class') == 'unread') {
            ReadMsg();
            $(parent).attr('class', '');
        }
    });

    $('.btnFromSort').click(function () {
        $('#hdnSort').val('1');
    });
    $('.btnSubjectSort').click(function () {
        $('#hdnSort').val('1');
    });
    $('.btnDateSort').click(function () {
        $('#hdnSort').val('1');
    });

    $('#chkall').change(function () {
        var c = this.checked;
        $('.MailListing input[type=checkbox]').attr('checked', c);
    });

    $('#btnPrevious').click(function () {
        var index = arrmsgids.indexOf(id);
        if (!(index <= 0)) {
            id = arrmsgids[index - 1];
            DrawMsgBody();
            parent = $('.MailListing li[rowid=' + id + ']');
            if ($(parent).attr('class') == 'unread') {
                ReadMsg();
                $(parent).attr('class', '');
            }
            return false;
        }
        else { return false; }
    });
    $('#btnNext').click(function () {
        var index = arrmsgids.indexOf(id);
        if (!(index < 0) && !(index >= arrmsgids.length - 1)) {
            id = arrmsgids[index + 1];
            DrawMsgBody();
            parent = $('.MailListing li[rowid=' + id + ']');
            if ($(parent).attr('class') == 'unread') {
                ReadMsg();
                $(parent).attr('class', '');
            }
            return false;
        }
        else { return false; }
    });
    $('#btnRemoveFile').hide();
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
        ismsgopen = false;
    });

    $('#btnReply').click(function () {
        $('#msgReply').show();
        return false;
    });

    $('.btnputback').click(function () {
        var str = '';
        var checkboxes = $('.MailListing').find('input:checked');
        if ($('#hdnType').val() == 'trash') {
            if (!ismsgopen) {
                if ($(checkboxes).length > 0) {
                    for (i = 0; i < $(checkboxes).length; i++) {
                        str += $(checkboxes)[i].id + ',';
                    }
                    configure_inbox.Deletemsg(str, 0, 0).value;
                }
                else {
                    alert('Please select a row.');
                    return false;
                }
            }
            else { configure_inbox.Deletemsg(id + ',', 0, 0).value; }
        }
        else if ($('#hdnType').val() == 'saved') {
            if (!ismsgopen) {
                if ($(checkboxes).length > 0) {
                    for (i = 0; i < $(checkboxes).length; i++) {
                        str += $(checkboxes)[i].id + ',';
                    }
                    configure_inbox.Savemsg(str, 0).value;
                }
                else {
                    alert('Please select a row.');
                    return false;
                }
            }
            else { configure_inbox.Savemsg(id + ',', 0).value; }
        }
    });

    $('.btnDelete').click(function () {
        var str = '';
        var checkboxes = $('.MailListing').find('input:checked');
        if ($('#hdnType').val() != 'trash') {
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
                    alert('Please select a row.');
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
                    alert('Please select a row.');
                    return false;
                }
            }
            else {
                if (!ConfirmDelete(1))
                    return false;
                configure_inbox.Deletemsg(id + ',', 1, 1).value;
            }
        }
    });

    $('.btnSave').click(function () {
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
                alert('Please select a row.');
                return false;
            }
        }
        else { configure_inbox.Savemsg(id + ',', 1).value; }
    });

    $('.SaveImageContainer').click(function () {
        if ($('#hdnType').val() != 'trash') {
            var img = $(this).find('img');
            var alt = $(img).attr('alt');
            var id = $(this).parent().find('input')[0].id + ',';
            if (alt == 1) {
                configure_inbox.Savemsg(id, 0).value;
            }
            else {
                configure_inbox.Savemsg(id, 1).value;
            }
            location.reload();
        }
    });
});