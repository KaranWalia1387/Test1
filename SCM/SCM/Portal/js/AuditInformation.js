var sourceURL = "";
var destinationURL = "";
var audit_id;
var flagONOFF = 0;

$(document).ready(function () {
    var url = document.location.href;
    var PageName = (url.split('/')[url.split('/').length - 1]).toString().toLowerCase();
    switch (PageName) {
        case "dashboard.aspx":
            flagONOFF = 1;
            break;

        case "outages.aspx":
            flagONOFF = 1;
            break;

        case "usages.aspx":
            flagONOFF = 1;
            break;

        case "notification-inbox.aspx":
            flagONOFF = 1;
            break;

        case "billdashboard.aspx":
            flagONOFF = 1;
            break;
        
        case "compare-spending.aspx":
            flagONOFF = 1;
            break;

        case "electric-vehicle.aspx":
            flagONOFF = 1;
            break;

        case "smart-dishwasher.aspx":
            flagONOFF = 1;
            break;

        case "saving-leader.aspx":
            flagONOFF = 1;
            break;

        case "gisgreenfootprint.aspx":
            flagONOFF = 1;
            break

        case "programs.aspx":
            flagONOFF = 1;
            break

        case "connect-me.aspx":
            flagONOFF = 1;
            break

        case "service-request.aspx":
            flagONOFF = 1;
            break

        case "account.aspx":
            flagONOFF = 1;
            break
        default:
            flagONOFF = 0;
            break;
    }

    closeIt();
});

function SetAuditInfo() {
    destinationURL = window.location.href;
    sourceURL = document.referrer;
    if (sourceURL.indexOf('qs') > 0) {
        sourceURL = sourceURL.substring(0, sourceURL.indexOf('qs')).replace('?', '');
    }
    var params = { 'sourceURL': sourceURL, 'destinationURL': destinationURL  };

    $.ajax({
        type: "POST",
        url: "AuditInformation.aspx/SetAuditInformation",
        data: JSON.stringify(params),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data) {
            audit_id = data.d;
        },
        error: function (request, status, error) {
            alert('Error!! ' + error);
        },
    })
}

function closeIt() {

    if (flagONOFF == 1) {
        SetAuditInfo();
    }
}






 




