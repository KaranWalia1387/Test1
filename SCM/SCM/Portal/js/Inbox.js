var arrmsgids;
var id;
var parent;
var ismsgopen = false;
var hdnsortValue = '0';
var name = '';
var SortColumn = '';
var pageIndex = 1;
var pageSize = 10;
var chkbxchkedarr = [];
var extn = '';
var TotalRecord;
var typeplaceholder = '';
var titlesave = '';
var MailUtility = '';

$(document).ready(function () {
    refresh();
    $(window).on('resize', refresh);
    $('#summernote').summernote({
        //onImageUpload: function (files, editor, welEditable) {
        //    for (var i = files.length - 1; i >= 0; i--) {
        //        sendFile(files[i], this);
        //    }
        //}
    });


    //function sendFile(file, el) {
    //    data = new FormData();
    //    data.append("file", file);
    //    $.ajax({
    //        type: "POST",
    //        url: "Upload.ashx",
    //        data: data,
    //        cache: false,
    //        contentType: false,
    //        processData: false,
    //        dataType: 'json',
    //        success: function (response) {
    //            var image = $('<img>').attr('src', 'http://' + url);
    //            $('#summernote').summernote("insertNode", image[0]);
    //        },
    //        error: function (error) {
    //            alert('error');
    //        },
    //        complete: function (response) {
    //        }
    //    });
    //}
});

function getFormattedDate(date) {
    var converteddate = new Date(date.replace(/-/g, "/"));
    var year = converteddate.getFullYear().toString();
    var month = ("0" + (converteddate.getMonth() + 1)).slice(-2);
    var hh = ("0" + (converteddate.getHours() % 12 == 0 ? "12" : converteddate.getHours() % 12)).slice(-2);
    var min = ("0" + converteddate.getMinutes()).slice(-2);
    var sec = ("0" + converteddate.getSeconds()).slice(-2);
    var ampm = converteddate.getHours() >= 12 ? "PM" : "AM";
    var day = ("0" + converteddate.getDate()).slice(-2);
    return month + '/' + day + '/' + year + ' ' + hh + ':' + min + ':' + sec + ' ' + ampm;
}

function GetFolderType(typename) {
    try {
        name = '';
        if (typename == 'connect%20me') { typename = 'connect me'; }
        if (typename == 'demand%20response') { typename = 'demand response'; }
        if (typename == 'leak%20alert') { typename = 'leak alert'; }
        switch (typename) {
            case "1":
                name = "1";
                $("#outage").addClass('sidebar_report_outage active');
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "2":
                name = "2";
                $("#connectme").addClass("sidebar_connect active");
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "3":
                name = "3";
                $("#service").addClass("sidebar_drafts active");
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "4":
                name = "4";
                $("#billing").addClass("sidebar_favourites active");
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "5":
                name = "5";
                $("#demandresponse").addClass("sidebar_inboxmains active");
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "7":
                name = "7";
                $("#inbox").addClass("sidebar_inboxmains active");//#5485
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "8":
                name = "8";
                $("#sentitem").addClass("sidebar_sent active");
                $('ul.sentdropdown li:eq(1)').hide();//bug id 27347
                $('ul.sentdropdown li:eq(2)').hide();//bug id 27347                

                break;
            case "9":
                name = "9";
                $("#trash").addClass("sidebar_trash active");
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "10":
                name = "10";
                $("#saved").addClass("sidebar_saved-mail active");
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "11":
                name = "11";
                $("#allmail").addClass("sidebar_all-mail active");
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "13":
                name = "13";
                $("#leakalert").addClass("sidebar_leakalert active");
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            case "6":
                name = "6";
                $("#loginissue").addClass("sidebar_loginissue active");//#5485
                $('ul.sentdropdown li:eq(0)').show();
                $('ul.sentdropdown li:eq(1)').show();
                $('ul.sentdropdown li:eq(2)').show();
                break;
            default:
                name = "11";

                break;
        }
        var type = typeplaceholder;

        $('#hdnType').val(type);
        //  $('#hdnNotificationType').val(type);
        return name;
    }
    catch (e) {
        console.log("Inbox.js" + e.message);
    }
}

function showpagesize() {
    if ($('.Pager').html().length == 0) {
        $('.divPagesize').hide();
    }
    else {
        $('.divPagesize').show();
    }
}

function setUnreadMessage(unreadData) {
    try {
        if (unreadData != null && unreadData.length > 0) {
            $('#lblInbox').text((unreadData[0]["Inbox"] == "0" || unreadData[0]["Inbox"] == "") ? "" : +unreadData[0]["Inbox"]);
            $('#lblOutage').text((unreadData[0]["Outage"] == "0" || unreadData[0]["Outage"] == "") ? "" : unreadData[0]["Outage"]);
            $('#lblConnectme').text((unreadData[0]["ConnectMe"] == "0" || unreadData[0]["ConnectMe"] == "") ? "" : unreadData[0]["ConnectMe"]);
            $('#lblService').text((unreadData[0]["Service"] == "0" || unreadData[0]["Service"] == "") ? "" : unreadData[0]["Service"]);
            $('#lblBilling').text((unreadData[0]["Billing"] == "0" || unreadData[0]["Billing"] == "") ? "" : unreadData[0]["Billing"]);
            $('#lbldemandresponse').text((unreadData[0]["DemandResponse"] == "0" || unreadData[0]["DemandResponse"] == "") ? "" : +unreadData[0]["DemandResponse"]);
            $('#lblleakalert').text((unreadData[0]["LeakAlert"] == "0" || unreadData[0]["LeakAlert"] == "") ? "" : +unreadData[0]["LeakAlert"]);
            $('#lblloginissue').text((unreadData[0]["LoginIssue"] == "0" || unreadData[0]["LoginIssues"] == "0" || unreadData[0]["LoginIssues"] == "" || unreadData[0]["LoginIssue"] == "") ? "" : +unreadData[0]["LoginIssue"]);
        }
    }
    catch (e) { }
}

function GetReason(reason) {
    switch (reason) {
        case 'Billing':
            return "Billing";
            break;
        case 'Outage':
            return "Outage";
            break;
        default:
            return '';
            break;
    }
}

function getClassNameForReason(reason) {
    switch (reason) {
        case 4:
            return "label label-success pull-left";
            break;
        case 1:
            return "label label-danger pull-left";
            break;
        default:
            return "label label-success pull-left";
            break;
    }
}

function loadData(pageIndex, pageSize) {
    try {
        loader.showloader();
        var newcontent = '';
        var msgcount = '';
        $('.panel').removeClass("childPanel");
        var save = "<img src='images/notification_icon/SaveIcons.png' alt='0' />";
        var saved = "<img src='images/notification_icon/SavedIcons.png' alt='1' />";
        var strtype;
        if ($('#hdnNotificationType').val() != "") {
            strtype = $('#hdnNotificationType').val();
        }
        else { strtype = typeplaceholder; }

        var sortorder = '';
        if ($('#hdnSort').val() == "") { $('#hdnSort').val(0); }
        hdnsortValue = $('#hdnSort').val() == '0' ? sortorder = "Desc" : sortorder = "Asc";
        name = GetFolderType(strtype) == 'undefined' ? 0 : name;
        if (strtype == "") { name = "7"; $("#inbox").addClass('sidebar_inbox active'); }
        document.getElementById('fromHeader').InnerText = "From";

        var param = { pageIndex: pageIndex, type: strtype, name: name, sortorder: sortorder, SortColumn: SortColumn, PageSize: pageSize };
        $.ajax({
            async: true,
            type: "POST",
            url: "Notification-Inbox.aspx/LoadMessageData",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                loader.hideloader();
                data = data.d;
                result = $.parseJSON(data);
                if (result.Table.length != 0) {
                    MailUtility = result.Table[0]["MailFrom"];
                    for (var i = 0; i < result.Table.length; i++) {
                        msgcount = (result.Table[i]["MessageCount"]) > 1 ? "&nbsp;(" + result.Table[i]["MessageCount"] + ")" : "";
                        newcontent += (result.Table[i]["IsRead"]) ? "<li rowid=" + result.Table[i]["MessageId"] + ">" : "<li rowid=" + result.Table[i]["MessageId"] + " class='unread'>";
                        newcontent += "<div class='select_chech-box'><input type='checkbox' id='" + result.Table[i]["MessageId"] + "' onclick='chkbxchk(" + result.Table[i]["MessageId"] + ");' /><label for='" + result.Table[i]["MessageId"] + "'></label></div>";
                        if (strtype.toLowerCase() == "9") {
                            newcontent += (result.Table[i]["IsSaved"]) ? "<div class='SaveImageContainer' style='display:none'>" + saved + "</div>" : "<div class='SaveImageContainer' style='display:none'>" + save + "</div>";
                            $('#btnSave').hide();
                        }
                        else {
                            newcontent += (result.Table[i]["IsSaved"]) ? "<div class='SaveImageContainer'>" + saved + "</div>" : "<div class='SaveImageContainer'>" + save + "</div>";
                        }

                        if (strtype == '9') { $('#btnSave').hide(); }
                        else { $('#btnSave').show(); }
                        newcontent += "<div class='liclick'>";
                        newcontent += "<div class='select_from'><span>" + result.Table[i]["MailFrom"] + "</span><span>" + msgcount + "</span></div>";
                        if (strtype == '4' || strtype == '1' || strtype == '3' || strtype == '2' || strtype == '5') {
                            newcontent += "<div class='select_counter'><span  class=''></span></div>";
                        }
                        else {
                            newcontent += "<div class='select_counter'><span class='" + getClassNameForReason(result.Table[i]["PlaceHolderId"]) + "'>" + result.Table[i]["PlaceHolderName"] + "</span></div>";
                        }

                        if (result.Table[i]["PlaceHolderId"] == "2")
                            newcontent += "<div class='LabelsContainer'><span class='connectmemsg'>&nbsp;</span></div>";
                        else if (result.Table[i]["PlaceHolderId"] == "4")
                            newcontent += "<div class='LabelsContainer'><span class='billingmsg'>&nbsp;</span></div>";
                        else if (result.Table[i]["PlaceHolderId"] == "3")
                            newcontent += "<div class='LabelsContainer'><span class='servicemsg'>&nbsp;</span></div>";
                        else if (result.Table[i]["PlaceHolderId"] == "1")
                            newcontent += "<div class='LabelsContainer'><span class='outagemsg'>&nbsp;</span></div>";
                        else if (result.Table[i]["PlaceHolderId"] == "5")
                            newcontent += "<div class='LabelsContainer'><span class='demandresponsemsg'>&nbsp;</span></div>";
                        else if (result.Table[i]["PlaceHolderId"] == "6")
                            newcontent += "<div class='LabelsContainer'><span class='loginissuemsg'>&nbsp;</span></div>";
                        else
                            newcontent += "<div class='LabelsContainer'><span class='nomsg'>&nbsp;</span></div>";
                        var regX = /(<([^>]+)>)/ig;
                        var messagebody = result.Table[i].MessageBody == null ? "" : result.Table[i].MessageBody.replace(regX, "");
                        newcontent += "<div class='select_subject'><span class='msgSubject'>" + messagebody + "</span></div>";
                        //var Subject = result.Table[i].Subject == null ? "" : result.Table[i].Subject.replace(regX, "");
                        // newcontent += "<div class='select_subject'><span class='msgSubject'>" + Subject + "</span>:<span class='msgSubject'>" + messagebody + "</span></div>";
                        newcontent += result.Table[i]["Attachment"] == "0" ? "<div class='select_atachment'>&nbsp;</div>" : "<div class='select_atachment'><i class='fa fa-paperclip'></i></div>";
                        newcontent += "<div class='select_date'>" + getFormattedDate(result.Table[i].CreatedDate) + "</div>";
                        newcontent += "</div>";
                        newcontent += "</li>";
                    }
                    $('#nodata').hide();
                    if (!ismsgopen) {
                        $('.mail-option').show();
                        $('#ulNotificatons').show();
                    }
                }
                else {
                    $('#nodata').show();
                    $('.mail-option').hide();
                    $('#ulNotificatons').hide();
                }

                $('#ulNotificatons').html(newcontent);
                setUnreadMessage(result.Table1);
                var arrchkbox = $('.MailListing input');
                arrmsgids = new Array();
                for (var j = 0; j < $(arrchkbox).length; j++) {
                    arrmsgids[j] = $(arrchkbox)[j].id;
                }
                var pager = result.Pager;
                TotalRecord = result.Table2[0].totalrecords;
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
                restorechkbx(chkbxchkedarr);
            },
            error: function (request, status, error) {
                loader.hideloader();
            }
        });
    }
    catch (e) {
        console.log(e.message);
        loader.hideloader();
    }
}

function File_OnChange(sender) {
    var filename = $(sender).val().replace(/^.*[\\\/]/, '');
    if (filename != "") {
        $("#nofile").html(filename);
        $('#btnRemoveFile').show();
    }
    readURL(sender);
}

function removeFile() {
    $('#fileupd').val('');
    var control = $("#fileupd");
    control.replaceWith(control = control.clone(true));
    $('#btnRemoveFile').hide();
    $("#nofile").html('No File Chosen');
    $(".imgPrev").hide().attr('src', '');
    return false;
}

function getAttachmentName(table) {
    extn = '';
    if (table != null) {
        var attachementname = (table.AttachmentName.indexOf('_') < 0) ? (table.AttachmentName) : (table.AttachmentName.substr(0, table.AttachmentName.lastIndexOf('_')));
        var extension = table.AttachmentName.substr(table.AttachmentName.lastIndexOf('.') + 1, result.Table1.AttachmentName);
        var attchedeFileName = (table.AttachmentName.indexOf('_') < 0) ? (table.AttachmentName) : (attachementname + '.' + extension);
        extn = extension;
        return attchedeFileName;
    }
}

function DelMsg(msgId) {
    toastr.clear();
    //if (!ConfirmDelete(0))
    //    return false;
    var Msg = '';

    var placeholderid = typeplaceholder;
    if (placeholderid == 9) {
        var param = { strng: msgId + ",", IsTrashed: 1, isdelete: 1 }; //Issue when we want to delete from trash if msg is open
        Msg = $('#DelMsgCnfrm').text();
    }
    else {
        var param = { strng: msgId + ",", IsTrashed: 1, isdelete: 0 };
        Msg = $('#DelMsg').text();
    }
    w2confirm(Msg, function (obj) {
        if (obj == 'Yes') {

            $.ajax({
                type: "POST",
                url: "Notification-Inbox.aspx/deletemsgAsync",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: function () {
                    toastr.success($('#IDMessageDeleted').text());
                    $('#btnBack').trigger("click");
                    $('.MailListing').find('li[rowid=' + msgId + ']').hide();
                },
                error: function () { }
            })
        }
    });
    return false;
}

function print(printpage) {

    var headstr = "<html><head><title></title></head><body>";
    var footstr = "</body>";
    var newstr = document.all.item(printpage).innerHTML;
    var oldstr = document.body.innerHTML;
    document.body.innerHTML = headstr + newstr + footstr;
    window.print();
    document.body.innerHTML = oldstr;
    return false;
}

function DrawMsgBody() {
    try {
        loader.showloader();
        var param = { messageid: id };
        $('.panel').addClass("childPanel")
        $.ajax({
            type: "POST",
            url: "Notification-Inbox.aspx/getMsgBody",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                loader.hideloader();
                data = data.d;
                result = $.parseJSON(data);
                var str = '';

                var type = typeplaceholder;
                $('#lblToUser').val(MailUtility);
                $('.mail-option').hide();
                $('#commail').hide();
                $('#MessageBody').hide();
                if (type.toLowerCase() == '9') { $('#btnSave').hide(); }
                else { $('#btnSave').show(); }

                var alt = $(parent).find('img')[0].alt;
                var csgreen;
                if (alt == '1') {
                    csgreen = "cgreen fa fa-star";
                }
                else { csgreen = "fa fa-star"; }

                for (var i = 0; i < result.Table.length; i++) {
                    str += "<div class=\"mail-header row\">\
                             <div class=\"col-md-7 col-sm-6 col-xs-6 \">\
                                 <h4 class=\"pull-left\" id=\"\subj\"><span>" + $("#msgInboxSubject").text() + ": <span>" + result.Table[i].Subject.replace(/&/g, '&amp;').replace(/</g, '&lt;') + "</h4>\
                             </div>\
                             <div class=\"col-md-5 col-sm-6 col-xs-6 \" style='padding-right: 7px;'>\
                                 <div class=\"compose-btn pull-right\">\
                                     <a id=\"btnsReply\"  class=\"btn btn-sm btn-primary rp-btn\"><i  globalize=\"ML_Notifications_Btn_Clicktoreply\" class=\"fa fa-reply\"></i> <span>" + $("#hdnReply").text() + "</span></a>\
                                     <button class=\"btn btn-sm tooltips btnDelete\" onclick='return DelMsg("+ result.Table[i].MessageId + ");return false;' data-original-title=\"Trash\" data-toggle=\"tooltip\" data-placement=\"bottom\" title=\"\"><i class=\"fa fa-trash-o\"></i></button>\
                                    <button class=\"btn btn-sm tooltips btnsave\" onclick='return SaveData();' alt='" + alt + "' data-original-title=\"Save\" data-toggle=\"dropdown\" data-placement=\"bottom\" ><i class=\"" + csgreen + "\"></i></button>\
                                    <button class=\"btn btn-sm tooltips btnputback\" onclick='return PutBackData();' data-original-title=\"PutBack\" data-toggle=\"dropdown\" data-placement=\"bottom\" ><img src='images/notification_icon/noti_put_back_trash.png' /></button>\
                                 </div>\
                             </div>\
                         </div>";
                    break;
                }
                for (var i = 0; i < result.Table.length; i++) {
                    if (type == 'sent') {

                    }
                    else {

                    }

                    str += "<div class=\"mail-sender\">\
                             <div class=\"row\">\
                                 <div class=\"col-md-8 col-sm-8 col-xs-12\">\
                                 <p class=\"details-sender\">\
                                     <strong>" + $("#msgInboxFrom").text() + ": </strong>\
                                     <span>" + result.Table[i].MailFrom + "</span>\
                                     </p>\
                                 </div>\
                                 <div class=\"col-md-4 col-sm-4 col-xs-12\">\
                                     <p class=\"date\">" + getFormattedDate(result.Table[i].CreatedDate) + " </p>\
                                 </div>\
                             </div>\
                         </div>";
                    var messagebody = result.Table[i].MessageBody == null ? "" : result.Table[i].MessageBody;
                    str += "<div class=\"view-mail\">\
                            <p>"+ messagebody + " </p>\
                        </div>";
                    for (var j = 0; j < result.Table1.length; j++) {
                        if (result.Table[i].MessageDetailId == result.Table1[j].MessageDetailId) {
                            if (result.Table1[j].AttachmentName != null) {
                                var attchedeFileName = getAttachmentName(result.Table1[j]);
                                str += '<div class="clear"></div><div style="font-weight:bold; padding:25px 0px;">Attachments</div>';
                                if (result.Table1[j].AttachmentType == 'AutoPDF') {
                                    str += '<div class="Attachment-mail"><p><span><i class="fa ' + GetFileTypeIcon(extn) + '" globalize="ML_Notification_Click_Attachment" style="font-size: 25px;padding: 0px 10px 0 0;vertical-align: middle;"></i></span><div class="Attachmenttext"><a href="' + AttachmentUrl + "imagename=" + result.Table1[j].AttachmentName + "&Path=connectmepdf" + '" target="_blank">' + attchedeFileName + '</a></div></p></div><div class="clear">&nbsp;</div>';
                                }
                                else
                                    str += '<div class="Attachment-mail"><p><span><i class="fa ' + GetFileTypeIcon(extn) + '" style="font-size: 25px;padding: 0px 10px 0 0;vertical-align: middle;" globalize="ML_Notification_Click_Attachment"></i></span><span class="Attachmenttext"><a href="' + AttachmentUrl + "imagename=" + result.Table1[j].AttachmentName + "&Path=Notification" + '" target="_blank">' + attchedeFileName + '</a></span></p></div><div class="clear">&nbsp;</div>';

                            }
                        }
                    }
                    str += "</div>";
                    str += "<div class='clearfix'></div>";


                }
                $('.DetailsMessageContainer').show();
                $('.DetailsMessageContainer').html(str);
                setUnreadMessage(result.Table2);

                if (typeplaceholder == '9') {
                    $('.btnputback').show();
                    $('.btnsave').hide();
                }
                else {
                    $('.btnputback').hide();
                    $('#btnSave').show();
                }
            },
            error: function (request, status, error) {

            }
        });
    }
    catch (e) { loader.hideloader(); }

}


function ConfirmDelete(i) {
    var result = false;

    toastrConfirmPopup();
    if (i == 0) {
        var x = confirm($('#DelMsg').text());
        if (x)
            return true;
        else
            return result;
    }
    else {

        var y = confirm($('#DelMsgCnfrm').text());
        if (y)
            return true;
        else
            return false;

    }
}

function ReadMsg() {
    try {
        var param = { str: id, IsRead: 1 };
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "Notification-Inbox.aspx/Readmsg",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data) {
                loader.hideloader();
                data = data.d;
                result = $.parseJSON(data);

                if (typeplaceholder.toLowerCase() != '9') {
                    var label = $(parent).find('.LabelsContainer').children()[0].className.toLowerCase();
                    var value = '';
                    var leftvalue;
                    switch (label) {
                        case 'connectmemsg':

                            value = $("#lblConnectme").text();
                            if (value.trim() != '') {
                                value = parseInt(value) - 1;
                                $("#lblConnectme").text(value);
                            }

                            leftvalue = $("#lblInbox").text();
                            if (leftvalue.trim() != '') {
                                leftvalue = parseInt(leftvalue) - 1;
                                $("#lblInbox").text(leftvalue);
                            }

                            break;



                        case 'outagemsg':
                            value = $("#lblOutage").text();
                            if (value.trim() != '') {
                                value = parseInt(value) - 1;
                                $("#lblOutage").text(value);
                            }

                            leftvalue = $("#lblInbox").text();
                            if (leftvalue.trim() != '') {
                                leftvalue = parseInt(leftvalue) - 1;
                                $("#lblInbox").text(leftvalue);
                            }

                            break;
                        case 'billingmsg':
                            value = $("#lblBilling").text();
                            if (value.trim() != '') {
                                value = parseInt(value) - 1;
                                $("#lblBilling").text(value);
                            }

                            leftvalue = $("#lblInbox").text();
                            if (leftvalue.trim() != '') {
                                leftvalue = parseInt(leftvalue) - 1;
                                $("#lblInbox").text(leftvalue);
                            }

                            break;
                        case 'servicemsg':

                            value = $("#lblService").text();
                            if (value.trim() != '') {
                                value = parseInt(value) - 1;
                                $("#lblService").text(value);
                            }

                            leftvalue = $("#lblInbox").text();
                            if (leftvalue.trim() != '') {
                                leftvalue = parseInt(leftvalue) - 1;
                                $("#lblInbox").text(leftvalue);
                            }
                            break;
                        case 'demandresponsemsg':


                            value = $("#lbldemandresponse").text();
                            if (value.trim() != '') {
                                value = parseInt(value) - 1;
                                $("#lbldemandresponse").text(value);
                            }

                            leftvalue = $("#lblInbox").text();
                            if (leftvalue.trim() != '') {
                                leftvalue = parseInt(leftvalue) - 1;
                                $("#lblInbox").text(leftvalue);
                            }
                            break;
                        case 'loginissuemsg':


                            value = $("#lblloginissue").text();
                            if (value.trim() != '') {
                                value = parseInt(value) - 1;
                                $("#lblloginissue").text(value);
                            }

                            leftvalue = $("#lblInbox").text();
                            if (leftvalue.trim() != '') {
                                leftvalue = parseInt(leftvalue) - 1;
                                $("#lblInbox").text(leftvalue);
                            }
                            break;


                    }
                }
            },
            error: function (request, status, error) {
                //w2alert('Error!! ' + request.statusText); 
                loader.hideloader();
            }
        });
    }
    catch (e) { }
}

function restorechkbx(arr) {
    arrchkbox = $('.MailListing input');
    var j = 0, m = 0;
    if ($(arrchkbox).length > 0) {
        for (i = 0; i < $(arrchkbox).length; i++) {
            for (j = 0; j < arr.length; j++) {
                if (arr[j] == $(arrchkbox)[i].id) {
                    $(('#' + (arrchkbox)[i].id)).prop('checked', true);
                    m++;
                }
            }
        }
        if (m >= 9) $("#chkall").prop('checked', true);
        else $("#chkall").prop('checked', false);
    }
}

function SaveData() {
    $('.btnSave').trigger("click");
    //if (GetParameterValues('type').toLowerCase() == 'saved') {
    if (typeplaceholder.toLowerCase() == '10') {
        $('#btnBack').trigger("click");
    }
}

function PutBackData() {
    $('#btnputback').trigger("click");
    $('#btnBack').trigger("click");
}

$(document).ready(function () {


    $('#btnputback').hide();
    titlesave = $('.mail-option a#btnSave').attr('title');
    var arrchkbox = $('.MailListing input');
    arrmsgids = new Array();
    for (var i = 0; i < $(arrchkbox).length; i++) {
        arrmsgids[i] = $(arrchkbox)[i].id;
    }
    $('.panel').removeClass("childPanel");
    /* start pagination */
    var pagenumber = "1";
    typeplaceholder = "7";
    loadData(pagenumber, pageSize);

    $("#refsh").click(function () {
        pagenumber = "1";
        loadData(pagenumber, pageSize);
        if ($("#chkall").prop('checked') == true) {
            $("#chkall").prop('checked', false);
        }
    })
    $('#left').click(function () {

        pagenumber = parseInt(pagenumber) - 1;
        $('#hdnSort').val('0');
        loadData(parseInt(pagenumber), $('#ddlPagesize').val());

    })

    $('#right').click(function () {

        pagenumber = parseInt(pagenumber) + 1;
        $('#hdnSort').val('0');
        loadData(parseInt(pagenumber), $('#ddlPagesize').val());
        //if ($("#chkall").prop('checked') == true) {
        //    $("#chkall").prop('checked', false);
        //}
    })
    $(".Pager").on('click', '.page', function () {
        pageIndex = parseInt($(this).attr('page'));
        $('#hdnSort').val('0');
        loadData(parseInt($(this).attr('page')), $('#ddlPagesize').val());

    });
    /* end pagination */
    $("#ddlPagesize").change(function () {

        loadData(pageIndex, $('#ddlPagesize').val());

    });

    $('.MailListing').on('click', '.liclick', function () {
        $(".Pager").hide();
        $('.divPagesize').hide();
        $(".right_content_box").css('overflow', 'auto');
        parent = $(this).parent()[0];
        id = $(parent).find('input')[0].id;
        $('#hdnMessageId').val(id);
        $('#MessageBody').hide();
        $('#btnBack').show();
        $('.MailListing').hide();
        $('#messagesheader').hide();
        $('#divHeader').hide();


        ismsgopen = true;
        if ($(parent).attr('class') == 'unread') {
            ReadMsg();
            $(parent).attr('class', '');
        }
        DrawMsgBody();

        if (arrmsgids.length > 1) {
            var index = arrmsgids.indexOf(id);
            if (index == 0) {
                //  $('#btnPrevious').hide();
                $('#btnNext').show();
            }
            else if (index >= arrmsgids.length - 1) {
                // $('#btnPrevious').show();
                $('#btnNext').hide();
            }
            else {
                // $('#btnPrevious').show();
                $('#btnNext').show();
            }

        }
        else {
            // $('#btnPrevious').hide();
            $('#btnNext').hide();
        }


        var alt = $(parent).find('img')[0].alt
        if (alt == 1) {
            $('#btnSave').hide();
        }
        else if (alt == 0) {
            $('#btnSave').show();
        }
    });

    $('.btnFromSort').click(function () {
        if ($('#hdnSort').val() == '' || $('#hdnSort').val() == 0) {
            $('#hdnSort').val('1');
            SortColumn = 'PlaceHolderNAme';
            hdnsortValue = '1';
        }
        else {
            $('#hdnSort').val('0');
            SortColumn = 'PlaceHolderNAme';
            hdnsortValue = '1';
        }

        loadData(pageIndex, $('#ddlPagesize').val());
        return false;
    });
    $('.btnSubjectSort').click(function () {
        if ($('#hdnSort').val() == '' || $('#hdnSort').val() == 0) {
            $('#hdnSort').val('1');
            SortColumn = 'Subject';
            hdnsortValue = '1';
        }
        else {
            $('#hdnSort').val('0');
            SortColumn = 'Subject';
            hdnsortValue = '1';
        }

        loadData(pageIndex, $('#ddlPagesize').val());
        return false;
    });
    $('.btnDateSort').click(function () {
        if ($('#hdnSort').val() == '' || $('#hdnSort').val() == 0) {
            $('#hdnSort').val('1');
            SortColumn = 'FromDate';
            hdnsortValue = '1';
        }
        else {
            $('#hdnSort').val('0');
            SortColumn = 'FromDate';
            hdnsortValue = '1';
        }

        loadData(pageIndex, $('#ddlPagesize').val());
        return false;
    });
    $('.SortData').click(function () {
        if ($('#hdnSort').val() == '' || $('#hdnSort').val() == 0) {
            $('#hdnSort').val('1');
            SortColumn = 'Subject';
            hdnsortValue = '1';
        }
        else {
            $('#hdnSort').val('0');
            SortColumn = 'Subject';
            hdnsortValue = '1';
        }

        loadData(pageIndex, $('#ddlPagesize').val());
        return false;
    });
    $('#chkall').change(function () {
        var c = this.checked;
        $('.MailListing input[type=checkbox]').prop('checked', c);
        if (c == true)
            chkbxchk('All');
        else {

            var checkboxes = $('.MailListing').find('input');
            if ($(checkboxes).length > 0) {
                for (i = 0; i < $(checkboxes).length; i++) {
                    // chkbxchkedarr.pop(parseInt($(checkboxes)[i].id));
                    chkbxchkedarr.splice(chkbxchkedarr.indexOf(parseInt($(checkboxes)[i].id)), 1);
                }
            }
        }

    });
    $('.MailListing input[type=checkbox]').click(function () {
        var cnt = 0;
        var checkedcnt = 0;
        var uncheckedcnt = 0;
        $('.MailListing input[type=checkbox]').each(function (obj) {
            cnt++;
            if ($(this).attr('checked') == 'checked') {
                checkedcnt++;
            }
            else {
                uncheckedcnt++;
            }

        });
        if (checkedcnt == cnt) {
            $('#chkall').attr('checked', 'checked');
        }
        else {
            $('#chkall').removeAttr('checked');
        }
    });

    $('ul.nav-alrtmsgs li a').on('click', function () {
        $('ul.nav-alrtmsgs li').removeClass('active');
        $(this).addClass('active');
        $('#hdnNotificationType').val('');
        var placeholder = $(this).closest('li').attr('type');
        pagenumber = "1";
        //bug id 32335 start
        if (placeholder == '10') {
            $('.mail-option a#btnSave').attr('title', $('#msgforUnSave').attr('title'));
        }
        else { $('.mail-option a#btnSave').attr('title', titlesave); }
        //bug id 32335 end
        if (placeholder == '9') {
            $('#btnputback').show();
            $('#btnSave').hide();

        }
        else { $('#btnputback').hide(); $('#btnSave').show(); }

        typeplaceholder = placeholder;

        chkbxchkedarr = [];
        $('#btnBack').trigger("click");
    });



    $('#btnPrevious').click(function () {
        if ($("#chkall").prop('checked') == true) {
            $("#chkall").prop('checked', false);
        }
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
            if ($(parent).attr('class') == 'unread') {
                ReadMsg();
                $(parent).attr('class', '');
            }
            return false;
        }
        else { return false; }
    });
    $('#btnNext').click(function () {
        if ($("#chkall").prop('checked') == true) {
            $("#chkall").prop('checked', false);
        }
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
            if ($(parent).attr('class') == 'unread') {
                ReadMsg();
                $(parent).attr('class', '');
            }
            return false;
        }
        else { return false; }
    });

    $('#btnDiscard').click(function () {
        $('#summernote').summernote('code', '');
        //$("#myeditor").data("wysihtml5").editor.clear();
        $('#msgReply').hide();
        $('#replyTo').hide();
        $('.htmleditor').val("");
        $('#commail').hide();
        $(".DetailsMessageContainer .compose-btn").show();

        $("#fileupd").val(''); // bug id 29399
        removeFile(); // bug id 29399
    });
    $('#read').click(function () {
        $('.MailListing li').each(function () {
            $(this).find('input[type=checkbox]').prop('checked', false);
        })
        $('.MailListing li').each(function () {
            if ($(this).attr('class') == undefined) {
                $(this).find('input[type=checkbox]').prop('checked', true);
                chkbxchkedarr.push($(this).find('input[type=checkbox]').attr('id'));
            }
        })
        $('.chk-all input[type=checkbox]').prop('checked', false);
    })
    $('#unread').click(function () {
        $('.MailListing li').each(function () {
            $(this).find('input[type=checkbox]').prop('checked', false);
        })
        $('.unread').each(function () {
            $(this).find('input[type=checkbox]').prop('checked', true);
            chkbxchkedarr.push($(this).find('input[type=checkbox]').attr('id'));
        })
        $('.chk-all input[type=checkbox]').prop('checked', false);
    })
    $('#none').click(function () {
        $('.MailListing li').each(function () {
            $(this).find('input[type=checkbox]').prop('checked', false);
        })
        $('.chk-all input[type=checkbox]').prop('checked', false);
    })
    $('#btnBack').click(function () {
        // $(".Pager").show();
        $('.mail-option').show();
        $(".right_content_box").css('overflow', 'hidden');
        $('.MailListing').show();
        $('#MessageBody').hide();
        $('#btnBack').hide();
        $('#btnReply').hide();
        $('#msgReply').hide();
        $('#replyTo').hide();
        $('#btnPrevious').hide();
        $('#btnNext').hide();
        $('#divHeader').show();
        $('.DetailsMessageContainer').hide();
        // $('#messagesheader').show();
        ismsgopen = false;
        loadData(pagenumber, pageSize);
    });

    $('#btnReply').click(function () {
        $(".right_content_box").css('overflow', 'scroll');
        $('#msgReply').show();
        $('#replyTo').show();
        $('#commail').show();
        return false;
    });
    k('#btnsReply').live('click', function () {
        $(".right_content_box").css('overflow', 'scroll');
        $('.panel').removeClass("childPanel")
        $('#msgReply').show();
        $('#replyTo').show();
        $('#commail').show();
        $('#MessageBody').show();
        $(".DetailsMessageContainer .compose-btn").hide();
        return false;
    });

    //above putback click is commented to pravent postback
    $('.back_notification_btn').on('click', '.btnputback', function () {
        var str = '';
        toastr.clear();
        var checkboxes = $('.MailListing').find('input:checked');

        function OnSuccess(data, status) {

            $('.MailListing').find('input[type=checkbox]:checked').each(function () {
                $(this).parent().parent().hide();
            });

            toastr.success($('#MoveMsg').text());
            loadData(pagenumber, pageSize);
        }
        function OnError(request, status, error) {
            toastr.error(request.statusText);
        }

        var strtype = typeplaceholder;
        if (strtype.toLowerCase() == '9') {
            if (!ismsgopen) {
                if (chkbxchkedarr.length > 0) { //bug id 32314
                    for (i = 0; i < chkbxchkedarr.length; i++) {
                        str += chkbxchkedarr[i] + ',';
                    }

                    var param = { 'strng': str, 'IsTrashed': 0, 'isdelete': 0 };
                    $.ajax({
                        type: "POST",
                        url: "Notification-Inbox.aspx/deletemsgAsync",
                        data: JSON.stringify(param),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });

                }
                else {

                    toastr.warning($('#IDMessages').text());

                    return false;
                }
            }
            else {

                var param = { strng: id + ',', IsTrashed: 0, isdelete: 0 };
                $.ajax({
                    type: "POST",
                    url: "Notification-Inbox.aspx/deletemsgAsync",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });


            }
        }
            // else if ($('#hdnType').val() == '10') { 
            //else if (GetParameterValues('type').toLowerCase() == 'saved') {
        else if (typeplaceholder.toLowerCase() == '10') {
            if (!ismsgopen) {
                if (chkbxchkedarr.length > 0) {
                    for (i = 0; i < chkbxchkedarr.length; i++) {
                        str += chkbxchkedarr[i] + ',';
                    }
                    //Notification_Inbox.savemsg(str, 0).value;
                    var param = { strng: str, IsTrashed: 1, isdelete: 'null' };
                    $.ajax({
                        type: "POST",
                        url: "Notification-Inbox.aspx/deletemsgAsync",
                        data: JSON.stringify(param),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });

                }
                else {
                    toastr.warning($('#IDMessages').text());
                    //w2alert('Please select message(s)');
                    return false;
                }
            }
            else {
                //Notification_Inbox.savemsg(id + ',', 0).value;
                var param = { strng: id + ',', IsTrashed: 0, isdelete: 'null' };
                $.ajax({
                    type: "POST",
                    url: "Notification-Inbox.aspx/deletemsgAsync",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });

            }
        }
    });

    $('#btnputback').click(function (e) {
        var str = '';
        toastr.clear();
        var checkboxes = $('.MailListing').find('input:checked');
        function OnSuccess(data, status) {
            $('.MailListing').find('input[type=checkbox]:checked').each(function () {
                $(this).parent().parent().hide();
            });
            // w2alert($('#MoveMsg').text(), 'Notification', function () {               
            // })
            toastr.success($('#MoveMsg').text());
            loadData(pagenumber, pageSize);
        }
        function OnError(request, status, error) {
            // w2alert(request.statusText);
            toastr.error(request.statusText)
        }
        //var strtype = GetParameterValues('type');


        var strtype = typeplaceholder;
        if (strtype.toLowerCase() == '9') {
            if (!ismsgopen) {
                if (checkboxes.length > 0) {
                    if (chkbxchkedarr.length > 0) {
                        for (i = 0; i < chkbxchkedarr.length; i++) {
                            str += chkbxchkedarr[i] + ',';
                        }
                        var param = { 'strng': str, 'IsTrashed': 0, 'isdelete': 0 };
                        $.ajax({
                            type: "POST",
                            url: "Notification-Inbox.aspx/deletemsgAsync",
                            data: JSON.stringify(param),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: OnSuccess,
                            error: OnError
                        });
                    }
                    else {
                        //w2alert($('#IDMessages').text());                    
                        toastr.warning($('#IDMessages').text());
                        return false;
                    }
                }
                else {
                    toastr.warning($('#IDMessages').text());
                    return false;
                }
            }
            else {
                var param = { strng: id + ',', IsTrashed: 0, isdelete: 0 };
                $.ajax({
                    type: "POST",
                    url: "Notification-Inbox.aspx/deletemsgAsync",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });
            }
        }

            //  else if (GetParameterValues('type').toLowerCase() == 'saved') {
        else if (typeplaceholder.toLowerCase() == '10') {
            if (!ismsgopen) {
                if (chkbxchkedarr.length > 0) {
                    for (i = 0; i < chkbxchkedarr.length; i++) {
                        str += chkbxchkedarr[i] + ',';
                    }
                    var param = { strng: str, IsTrashed: 1, isdelete: 'null' };
                    $.ajax({
                        type: "POST",
                        url: "Notification-Inbox.aspx/deletemsgAsync",
                        data: JSON.stringify(param),
                        contentType: "application/json; charset=utf-8",
                        dataType: "json",
                        success: OnSuccess,
                        error: OnError
                    });
                }
                else {
                    toastr.warning($('#IDMessages').text());
                    //w2alert($('#IDMessages').text());
                    return false;
                }
            }
            else {
                var param = { strng: id + ',', IsTrashed: 0, isdelete: 'null' };
                $.ajax({
                    type: "POST",
                    url: "Notification-Inbox.aspx/deletemsgAsync",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });
            }
        }


    });

    function deletemail() {
        var str = '';
        toastr.clear();
        //Added by Abhilash Jha
        function OnSuccess(data, status) {
            toastr.success($('#IDMessageDeleted').text());
            $('.MailListing').find('input[type=checkbox]:checked').each(function () {
                $(this).parent().parent().hide();
                chkbxchkedarr.pop($(this).attr('id'));
            });
            if (ismsgopen) {
                var id = $.parseJSON($(this)[0].data)["strng"].split(',')[0];
                $('.MailListing').find('li[rowid=' + id + ']').hide();
                chkbxchkedarr.pop(id);
            }
            $('#btnBack').trigger("click");
            if ($("#chkall").prop('checked') == true) {
                var page = Math.ceil(TotalRecord / 10);
                if (page == pagenumber) pagenumber = pagenumber - 1;
            }
            loader.hideloader();
            loadData(pagenumber, pageSize);
        }
        function OnError(request, status, error) {
            toastr.success(request.statusText);
            loader.hideloader();
        }

        if (typeplaceholder.toLowerCase() != '9') {
            if (!ismsgopen) {
                if (chkbxchkedarr.length > 0) {
                    for (i = 0; i < chkbxchkedarr.length; i++) {
                        str += chkbxchkedarr[i] + ',';
                    }

                    //if (!ConfirmDelete(0))
                    //    return false;
                    // Notification_Inbox.deletemsg(str, 1, 0).value;
                    w2confirm($('#DelMsg').text(), function (obj) {
                        if (obj == 'Yes') {
                            loader.showloader();
                            var param = { strng: str, IsTrashed: 1, isdelete: 0 };
                            $.ajax({
                                type: "POST",
                                url: "Notification-Inbox.aspx/deletemsgAsync",
                                data: JSON.stringify(param),
                                contentType: "application/json; charset=utf-8",
                                dataType: "json",
                                success: OnSuccess,
                                error: OnError
                            });
                            loader.hideloader();
                        }
                    });

                    loader.hideloader();

                }

                else {
                    toastr.warning($('#IDMessages').text());
                    return false;
                }
            }
            else {
                //if (!ConfirmDelete(0))
                //    return false;

                w2confirm($('#DelMsg').text(), function (obj) {
                    if (obj == 'Yes') {
                        loader.showloader();
                        // Notification_Inbox.deletemsg(id + ',', 1, 0).value;
                        var param = { strng: id + ',', IsTrashed: 1, isdelete: 0 };
                        $.ajax({
                            type: "POST",
                            url: "Notification-Inbox.aspx/deletemsgAsync",
                            data: JSON.stringify(param),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: OnSuccess,
                            error: OnError
                        });
                        loader.hideloader();
                    }
                });

            }
        }
        else {
            if (!ismsgopen) {
                var checkboxes = $('.MailListing').find('input:checked');
                if (checkboxes.length > 0) { //bug id 32315
                    if (chkbxchkedarr.length > 0) {
                        for (i = 0; i < chkbxchkedarr.length; i++) {
                            str += chkbxchkedarr[i] + ',';
                        }
                        //if (!ConfirmDelete(1))
                        //    return false;

                        w2confirm($('#DelMsgCnfrm').text(), function (obj) {
                            if (obj == 'Yes') {
                                loader.showloader();
                                // Notification_Inbox.deletemsg(str, 1, 1).value;
                                var param = { strng: str, IsTrashed: 1, isdelete: 1 };
                                $.ajax({
                                    type: "POST",
                                    url: "Notification-Inbox.aspx/deletemsgAsync",
                                    data: JSON.stringify(param),
                                    contentType: "application/json; charset=utf-8",
                                    dataType: "json",
                                    success: OnSuccess,
                                    error: OnError
                                });
                                loader.hideloader();
                            }
                        });
                    }
                    else {
                        //w2alert($('#IDMessages').text());
                        toastr.warning($('#IDMessages').text());
                        //w2alert('Please select message(s)');
                        return false;
                    }
                }
                else {
                    toastr.warning($('#IDMessages').text());
                    return false;
                }
            }
            else {
                //if (!ConfirmDelete(1))
                //    return false;
                w2confirm($('#DelMsg').text(), function (obj) {
                    if (obj == 'Yes') {
                        loader.showloader();
                        // Notification_Inbox.deletemsg(id + ',', 1, 1).value;
                        var param = { strng: id + ',', IsTrashed: 1, isdelete: 1 };
                        $.ajax({
                            type: "POST",
                            url: "Notification-Inbox.aspx/deletemsgAsync",
                            data: JSON.stringify(param),
                            contentType: "application/json; charset=utf-8",
                            dataType: "json",
                            success: OnSuccess,
                            error: OnError
                        });
                        loader.hideloader();
                    }
                });
            }
        }
    }
    //Above delete click event is commented to pravent postback.
    $('.btnDelete').click(function () {
        deletemail();
    });

    $('.btnDeleteonreply').click(function () {
        deletemail();
    });

    $('.btnSave').click(function () {
        toastr.clear();
        function OnSuccess(data, status) {

            $('.MailListing').find('input[type=checkbox]:checked').each(function (obj) {
                var img = $(this).parent().parent().find('.SaveImageContainer');
                $(this).prop('checked', false);
                chkbxchkedarr.splice(chkbxchkedarr.indexOf($(this).parent().find('input')[0].id), 1);
                var src = $(img).find('img').attr('src');
                if (src.indexOf('Saved') >= 0) {
                    //   var strtype = GetParameterValues('type');
                    var strtype = typeplaceholder;//saved                    
                    if (strtype == "10")
                        $(this).closest('li').hide();
                    else {
                        $(img).find('img').attr('src', 'images/notification_icon/SaveIcons.png')
                        $(img).find('img').attr('alt', '0');
                    }
                }
                else {
                    $(img).find('img').attr('src', 'images/notification_icon/SavedIcons.png');
                    $(img).find('img').attr('alt', '1');
                }

            });
            $('#ulNotificatons li[rowid=' + id + '] div.SaveImageContainer img').attr("src", "images/notification_icon/SavedIcons.png");
            if ($("#chkall").prop('checked') == true) {
                $("#chkall").prop('checked', false);
            }
            if ($("#div_print button.btnsave i").attr('class').indexOf('cgreen') == -1) {
                $("#div_print button.btnsave i").addClass('cgreen');
            }
            else {
                $("#div_print button.btnsave i").removeClass('cgreen');
            }


        }
        function OnError(request, status, error) {
            toastr.error(request.statusText);
        }
        if (!ismsgopen) {
            var str = '';
            //   var checkboxes = $('.MailListing').find('input:checked');
            if (chkbxchkedarr.length > 0) {
                for (i = 0; i < chkbxchkedarr.length; i++) {
                    str += chkbxchkedarr[i] + ',';
                }
                //Notification_Inbox.savemsg(str, 1).value;
                var param = {};
                // if (GetParameterValues('type') == 'saved') {
                if (typeplaceholder == '10') {
                    param = { strng: str, IsSaved: '0' };
                } else {
                    param = { strng: str, IsSaved: '1' };
                }
                $.ajax({
                    type: "POST",
                    url: "Notification-Inbox.aspx/savemsgAsync",
                    data: JSON.stringify(param),
                    contentType: "application/json; charset=utf-8",
                    dataType: "json",
                    success: OnSuccess,
                    error: OnError
                });

            }
            else {
                toastr.warning($('#IDMessages').text());
                //w2alert($('#IDMessages').text());
                return false;
            }
        }
        else {
            //Notification_Inbox.savemsg(id + ',', 1).value;
           
            if ($('.btnsave').attr('alt') == "1") IsSaved = 0;
            else IsSaved = 1;
            var param = { strng: id + ',', IsSaved };            
            $.ajax({
                type: "POST",
                url: "Notification-Inbox.aspx/savemsgAsync",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });

        }
    });

    $('.MailListing').on('click', '.SaveImageContainer', function () {
        //  var strtype = GetParameterValues('type');
        var strtype = typeplaceholder;
        toastr.clear();
        if (($('#hdnType').val() != '9') || ($('#hdnType').val() == '9')) {
            var img = $(this).find('img');
            var obj = $(this);
            var alt = $(img).attr('alt');
            var id = $(this).parent().find('input')[0].id + ',';
            var src = $(img).attr('src');
            function OnSuccess(data, status) {
                //w2alert(); commented as it was not hiding putback msg's 
                if (src.indexOf("Saved") >= 0) {
                    //var strtype = GetParameterValues('type');
                    var strtype = typeplaceholder;//saved                    
                    if (strtype == "10")
                        $(obj).parent().hide();
                    else
                        $(img).attr('src', 'images/notification_icon/SaveIcons.png')
                    $(img).attr('alt', '0')
                    //  w2alert($('#MoveMsg').text());

                }

                else {
                    $(img).attr('src', 'images/notification_icon/SavedIcons.png')
                    $(img).attr('alt', '1')
                    // w2alert($('#SaveMsgSuccess').text());
                }
                loadData(pagenumber, pageSize);
            }

        }
        function OnError(request, status, error) {
            toastr.clear();
            toastr.error(request.statusText);
        }
        if (alt == 1) {
            var param = { strng: id + ',', IsSaved: 0 };
            alt = 0;
            $.ajax({
                type: "POST",
                url: "Notification-Inbox.aspx/savemsgAsync",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });
            // Notification_Inbox.savemsg(id, 0).value;
        }
        else {
            var param = { strng: id + ',', IsSaved: 1 };
            alt = 1;
            $.ajax({
                type: "POST",
                url: "Notification-Inbox.aspx/savemsgAsync",
                data: JSON.stringify(param),
                contentType: "application/json; charset=utf-8",
                dataType: "json",
                success: OnSuccess,
                error: OnError
            });
            //Notification_Inbox.savemsg(id, 1).value;
        }
        //location.reload();
    }
    )

    //if (GetParameterValues('type') == 'sent') {
    if (typeplaceholder == '8') {
        $('#divFromColumn').hide();
        $('#divToColumn').show();
    };



    var src = '';
    $("#btnSubmitReply").click(function () {

        //Uploading File To Server Asynchronously
        //var src='';
        toastr.clear();
        if ($("#fileupd").val() != "") {
            if (GetFileSize('fileupd') == true) {
                $.ajaxFileUpload({
                    type: "POST",
                    fileElementId: 'fileupd',
                    url: "Upload.ashx?path=Notification",
                    secureuri: false,
                    cache: false,
                    contentType: 'text/plain',
                    dataType: "text",
                    success: function (data, status) {
                        var cnt = 0;
                        src = data;
                        if (data != '') {
                            sendMessageDetail();
                        }
                        else {
                            toastr.warning($('#IDFileFailed').text());
                            //alert('Field Not Inserted');
                        }

                    },
                    error: function (data, status, e) {

                        toastr.error(e);
                    }
                });
            }

        } else { src = ''; sendMessageDetail(); }

    });

    function sendMessageDetail() {
        loader.showloader();
        toastr.clear();
        // Submitting Reply message Asynchronously
        var param = {
            MessageID: escape($('#hdnMessageId').val()),
            MessageBody: $('#summernote').summernote('code'),
            AttachmentName: escape(src)
        };
        $.ajax({
            type: "POST",
            url: "Notification-Inbox.aspx/SendMessage",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: OnSuccess,
            error: OnError
        });
        function OnSuccess(data, status) {
            if (parseInt(data.d) > 0) {
                toastr.success($('#IDMessageSent').text());
                loadData(pageIndex, pageSize);
            }
            else {
                toastr.error($('#IDMessageNotSent').text());

            }
            resetField();
            loader.hideloader();
        }
        function OnError(request, status, error) {
            toastr.error(request.statusText);
            resetField();
            loader.hideloader();
        }
    }

});

function remove(arr, item) {
    for (var i = arr.length; i--;) {
        if (arr[i] === item) {
            arr.splice(i, 1);
        }
    }
}

function chkbxchk(id) {

    if (id != 'All') {
        if ($('#' + id).is(':checked')) {
            chkbxchkedarr.push(id);

        }
        else {
            $("#chkall").prop('checked', false);
            chkbxchkedarr.splice(chkbxchkedarr.indexOf(id), 1);
        }
        var cnt = 0;
        var checkedcnt = 0;
        var uncheckedcnt = 0;
        $('.MailListing li').each(function () {

            cnt++;
            if ($(this).find('input[type=checkbox]').prop('checked') == true) {
                checkedcnt++;
            }
            else {
                uncheckedcnt++;
            }

        });
        if (checkedcnt == cnt) {
            $('#chkall').attr('checked', 'checked');
        }
        else {
            $('#chkall').removeAttr('checked');
        }
    }
    else {

        var checkboxes = $('.MailListing').find('input:checked');
        if ($(checkboxes).length > 0) {
            for (i = 0; i < $(checkboxes).length; i++) {
                chkbxchkedarr.push(parseInt($(checkboxes)[i].id));
            }
        }
    }
}

function resetField() {
    //$('.wysihtml5').val('');
    $('#summernote').summernote('code', '');
    removeFile();
    $('#hdnType').val('8');
    DrawMsgBody();
    $('#MessageBody').show();
    $('#btnBack').show();
    $('.MailListing').hide();
    $('#messagesheader').hide();
    $('#divHeader').hide();
    $("#msgReply").hide();
    $("#replyTo").hide();
}

function GetParameterValues(param) {
    var url = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for (var i = 0; i < url.length; i++) {
        var urlparam = url[i].split('=');
        if (urlparam[0] == param) {
            return urlparam[1];
        }
        else { return ''; }
    }
}

function refresh() {
    var device = $('#devices');
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

