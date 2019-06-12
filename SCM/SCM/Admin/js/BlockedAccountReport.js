var databindtogrid;
var autoheightbool;

$(document).ready(function () {
    loader.showloader();
    $('.sidebar_blockedAccountinfo').addClass('active');
    $('.sidebar_userreport').removeClass('active');
    BindData();
    loader.hideloader();
});

function BindData() {
    loader.showloader();
    var param = { CustomerId: 0, Mode: 0 };
    $.ajax({
        type: "POST",
        url: "blockedaccountreport.aspx/LoadGrid",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            databindtogrid = JSON.parse(data.d).Table;
            LoadGrid(databindtogrid);
        }
    });
    loader.hideloader();

}

function LoadGrid(databindtogrid) {
    source = {
        datatype: "array",
        datafields: [
            { name: "AccountNumber" },
            { name: 'LockedDateTime', type: 'date' },
            { name: 'Module' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid,
        pager: function (pagenum, pagesize, oldpagenum) {
            //alert(1);
        }
    };
    var dataAdapter = new $.jqx.dataAdapter(source, { contentType: 'application/json; charset=utf-8' });

    $("#jqxgrid").jqxGrid({
        width: '99.8%',
        height: GridHeight * .93,
        columnsheight: 38,
        rowsheight: 34,
        source: dataAdapter,
        theme: 'darkblue',
        altrows: true,
        sortable: true,
        autoheight: autoheightbool,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        filterable: true,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Action', datafield: 'Action', width: '20%', cellsalign: 'left', cellsrenderer: imagerenderer },
            { text: 'Account Number', dataField: 'AccountNumber', width: '20%' },
            { text: 'Locked Date/Time', datafield: 'LockedDateTime', width: '30%', cellsformat: 'MM/dd/yyyy h:mm tt' },
            { text: 'Module Name', dataField: 'Module', width: '30%' },

        ]
    });
    onPaging: { align: "center" }

    $("#jqxgrid").on('bindingcomplete', function () {
        if ($(window).width() < 1025) {
            $("#jqxgrid").jqxGrid('autoresizecolumns');
        }
    });
}

var imagerenderer = function (row, datafield, value) {
    switch (datafield) {
        case "Action":
            return getAction(row); break;
    }
}

function getAction(row) {
    var CustID = $('#jqxgrid').jqxGrid('getrowdata', row).AccountNumber + '_' + $('#jqxgrid').jqxGrid('getrowdata', row).Module;
    var src = "<img src='../images/locked.png' title='Unlock' />";
    return '<div style="text-align: left;padding-left: 4px;padding-top:9px;"><span class="status" id=' + CustID + ' onClick=UnlockAccount(' + row + ')><a href = #>' + src + '</a></span></div>';
}

function UnlockAccount(rowNum) {
    var ViewObj = $('#jqxgrid').jqxGrid('getrowdata', rowNum);
    var idLock = ViewObj.AccountNumber;
    var CustId = idLock;
    var Module = ViewObj.Module;
    if (confirm('Are you sure you want to unlock the Account?')) {
        var param = { AccountNumber: CustId, ModuleName: Module };
        ActivateUser(param);
    }
}

function ActivateUser(param) {
    try {
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "blockedaccountreport.aspx/UnlockAccount",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status) {
                alert(JSON.parse(data.d).Table[0].Message);
                BindData();
                loader.hideloader();
            },
            error: function (response) {
                alert(response.responseText);
                loader.hideloader();
            },

        })
    }
    catch (e) { loader.hideloader(); }

}