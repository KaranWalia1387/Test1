var databindtogrid;
var usertable;
var paynowlink;

$(document).ready(function () {    
    try {
        paynowlink = $('#paynowlink').text();
        usertable = BillingHistory.LoadW2UIGridData().value;
        databindtogrid = usertable.Rows;
        if (databindtogrid.length > 0) {
            $('#ExcelDiv').css('visibility', 'visible');
        }
        LoadGrid();
        if ($('#hdnPrePaid').val() == "Prepaid") {
            w2ui['wugrid'].hideColumn('AccountNumber');
        }
        else {
            w2ui['wugrid'].showColumn('AccountNumber');
        }
       
        $('.w2ui-footer-left').hide();
    }
    catch (ex) {
       console.log(ex.message);
    }

    $('.paynowlink').off('click').on('click', function () {
        var aa = confirm($("#spnExternalRedirect").text());
        $(this).blur();
        return aa;
    });

});

function getMMDDYYDate(dt) {
    try {
        var dat = new Date(dt);
        var str = dat.getMonth() + 1 + "/" + dat.getDate() + "/" + dat.getFullYear();
        return str;
    }
    catch (e) {
        console.log(e.message);
    }
}

function LoadGrid() {
    try {
        var TransactionDate = $("#GridTransactiondate").text();
        var Status = $("#GridStatus").text();
        var Bill = $("#GridBill").text();
        var TransactionAmount = $("#GridTransactionAmount").text() + " ($)";
        var View = $("#GridLink_view").text();       
        $('#wugrid').w2grid({
            name: 'wugrid',
            show: {
                toolbar: true,
                //footer: true,
                recordTitles: false
            },
            multiSearch: true,
            searches: [
                { field: 'Date', caption: 'Transaction Date', type: 'date' },
                { field: 'Amount', caption: 'Transaction Amount ($)', type: 'float' },
                { field: 'Type', caption: 'Status', type: 'text' }
               // { field: 'AccountNumber', caption: 'View Bill', type: 'text' } //hide for healdsbug build
            ],
            columns: [
                 { field: 'recid', caption: 'ID', size: '25px', sortable: true, resizable: true, searchable: 'int', hidden: true },
                { field: 'Date', caption: TransactionDate, render: 'date:mm/dd/yyyy', size: '40%', sortable: true, resizable: false, },
                { field: 'Amount', caption: TransactionAmount, render: 'float:2', size: '40%', sortable: true, resizable: false, },
                { field: 'Type', caption: Status, size: '35%', sortable: true, resizable: false, }
                //{
                //    field: 'AccountNumber', caption: Bill, size: '20%', sortable: true,hidden:true, resizable: false,
                //    render: function (record, index, column_index) {
                //        var type = record.Type;
                //        // alert(type);
                //        var AccountNum = record.AccountNumber;
                //        var BillingDate = record.Date;
                //        if (type.trim() == "Bill" || type.trim() == "factura") {
                //            var encryptedQuesry = common.GetEncryptedData("AccountNo=" + AccountNum + '&BillingDate=' + getMMDDYYDate(BillingDate) + "&ctype=inline").value;
                //           // return '<div style="text-align: center;" ><a style="text-align:left; float:left;" target="_blank" href="BillReport.aspx?EncQuery=' + encryptedQuesry + '&EncType=A">' + '<img src="images/view_all_pdf.png" />' + '</a></div>';
                //            return '<div class="paynowlink" style="text-align: center;" ><a style="text-align:left; float:left;" target="_blank" href="' + paynowlink + '">' + '<img src="images/view_all_pdf.png" />' + '</a></div>';
                //        }
                //    }
                //} //hide for healdsbug build
            ],
            records: databindtogrid
            
        });
    }
    catch (ex) {
        var msg = ex.message;
    }
}



function Validate() {
    if ($('#' + '<%=txtTodate.ClientID %>').val().trim() == "" || $('#' + '<%=txtFromdate.ClientID %>').val().trim() == "") {
        toastr.warning('Enter From and To Date');
       // alert('Enter From and To Date');
        return false;
    } else {

        return true;
    }
}



function GetQueryStringParams(sParam) {
    var sPageURL = window.location.search.substring(1);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];
        }
    }
}

function onCalendarShown(sender, args) {
    // Get Image that was clicked to open calendar
    var calendarImage = $get('<%=txtFromdate.ClientID %>');
    // Set new calendar position
    // sender._popupDiv.parentElement.style.top = calendarImage.offsetTop + calendarImage.height + 'px';
    sender._popupDiv.parentElement.style.top = -160 + 'px';
    sender._popupDiv.parentElement.style.left = calendarImage.offsetLeft + 'px';
}

function onCalendarShown1(sender, args) {

    // Get Image that was clicked to open calendar
    var calendarImage = $get('<%=txtTodate.ClientID %>');

    // Set new calendar position  
    sender._popupDiv.parentElement.style.top = -160 + 'px';
    sender._popupDiv.parentElement.style.left = calendarImage.offsetLeft + 'px';

}