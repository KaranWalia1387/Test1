var databindtogrid;
var autoheightbool;

$(document).ready(function () {
    loader.showloader();
    $('.sidebar_blockedipinfo').addClass('active');
    $('.sidebar_userreport').removeClass('active');
    BindData();
    loader.hideloader();
});

function BindData() {

    var param = { CustomerId: 0, Mode: 0 };
    $.ajax({
        type: "POST",
        url: "blockedip.aspx/LoadGrid",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            databindtogrid = JSON.parse(data.d).Table;
            LoadGrid(databindtogrid);
        }
    });

}

function LoadGrid(databindtogrid) {
    source = {
        datatype: "array",
        datafields: [
            { name: "IPAddress" },
            //{ name: 'Module' },
            { name: 'LockedDateTime', type: 'date' },
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
            { text: 'Action', datafield: 'Action', width: '15%', cellsalign: 'left', cellsrenderer: imagerenderer },
            { text: 'IP Address', dataField: 'IPAddress', width: '50%', },
            //{ text: 'Module Name', dataField: 'Module', width: '30%', },
            { text: 'Locked Date/Time', datafield: 'LockedDateTime', width: '45%', cellsformat: 'MM/dd/yyyy h:mm tt' }

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
    var IPAddress = $('#jqxgrid').jqxGrid('getrowdata', row).IPAddress;
    //var Module = $('#jqxgrid').jqxGrid('getrowdata', row).Module;
    //Module = Module.replace(' ', '');
    //IP = IPAddress + '_' + Module;
    var src = "<img src='../images/locked.png' title='Unlock' />";
    return '<div style="text-align: left;padding-left: 4px;padding-top:9px;"><span class="status" id=' + IPAddress + ' ><a href = #>' + src + '</a></span></div>';
}

$(document).on("click", ".status", function () {
    var IPLock = this.id;
    var IPLocked = IPLock.split('_')[0];
    var Module = '';
    switch(IPLock.split('_')[1]) {
        case 'Registration':
            Module=0;
            break;
        case 'Login':
            Module=1;
            break;
        case 'PasswordReset':
            Module=2;
            break;
        case 'PasswordChange':
            Module=3;
            break;
    }
    if (confirm('Are you sure you want to unlock the IP?')) {
        var param = { IPAddress: IPLocked };
        UnlockIP(param);
    }
});

function UnlockIP(param) {
    try {
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "blockedip.aspx/UnlockIP",
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