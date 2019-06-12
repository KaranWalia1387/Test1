var databindtogrid;
var autoheightbool;

$(document).ready(function () {
    
    $('.sidebar_ipinfo').addClass('active');
    $('.sidebar_userreport').removeClass('active');
    BindData();
    
});

function BindData() {
  
    var param = { CustomerId: 0, Mode: 0 };
    $.ajax({
        type: "POST",
        url: "IpInfo.aspx/LoadGrid",
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
            { name: "CustomerId" },
            { name: 'UserName' },
            { name: 'CustomerType' },
            { name: 'FullName' },
            { name: 'LastLoginAttempt', type: 'date' },
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
            { text: 'Action', datafield: 'Action', width: '7%', cellsalign: 'left', cellsrenderer: imagerenderer },
            { text: 'Customer ID', dataField: 'CustomerId', width: '20%', hidden: true },
            { text: 'Customer Type', dataField: 'CustomerType', width: '0%', hidden: true },
            { text: 'Username', dataField: 'UserName', width: '33%' },
            { text: 'Full Name', datafield: 'FullName', width: '25%' },
            { text: 'Last Login Attempt', datafield: 'LastLoginAttempt', width: '35%', cellsformat: 'MM/dd/yyyy h:mm tt' }
            
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
    var CustID = $('#jqxgrid').jqxGrid('getrowdata', row).CustomerId;
    var src = "<img src='../images/locked.png' title='Unlock' />";
    return '<div style="text-align: left;padding-left: 14px;padding-top:9px;"><span class="status" id=' + CustID + '><a href = #>' + src + '</a></span></div>';
}

$(document).on("click", ".status", function () {
    var idLock = this.id;
    var CustId = idLock;
    if (confirm('Are you sure you want to unlock the user?')) {
        var param = { CustomerId: CustId, Mode: 1 };
        ActivateUser(param);
    }
});

function ActivateUser(param) {
    try {
        loader.showloader();
        $.ajax({
            type: "POST",
            url: "IpInfo.aspx/LoadGrid",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status) {
                if (status == 'success')
                {
                    alert("User has been Unlocked sucessfully");
                }             
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