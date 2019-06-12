var databindtogrid;
var autoheightbool;

$(document).ready(function () {
    loader.showloader();
    $('.sidebar_lockedip').addClass('active');
    $('.sidebar_userreport').removeClass('active');
    BindData();
    loader.hideloader();
});

function BindData() {
    loader.showloader();
    var param = {Mode: 0 };
    $.ajax({
        type: "POST",
        url: "LockedIps.aspx/LoadGrid",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            databindtogrid = JSON.parse(data.d).Table;
            if (databindtogrid.length == 0) {
                $('#nodata_div').show();
                $('#jqxgrid').hide();              
            }
            else {
                $('#nodata_div').hide();
                $('#jqxgrid').show();
                LoadGrid(databindtogrid);
            }
           
        }
    });
    loader.hideloader();
}

function LoadGrid(databindtogrid) {
    source = {
        datatype: "array",
        datafields: [
            { name: "IPAddress" }
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
            { text: 'Action', datafield: 'Action', width: '25%', cellsalign: 'left', cellsrenderer: imagerenderer },
            { text: 'IPAddress', dataField: 'IPAddress', width: '75%', hidden: true },
           
            
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
    var IP = $('#jqxgrid').jqxGrid('getrowdata', row).IPAddress;
    var src = "<img src='../images/unlocked.png' title='Unlock' />";
    return '<div style="text-align: left;padding-left: 4px;padding-top:9px;"><span class="status" id=' + IP + '><a href = #>' + src + '</a></span></div>';
}

$(document).on("click", ".status", function () {
    var idLock = this.id;
    var IP = idLock;
    if (confirm('Are you sure you want to unlock the ip?')) {
        var param = { IPAddress: IP, Mode: 0 };
        ActivateIP(param);
    }
});

function ActivateIP(param) {
    try {
        $.ajax({
            type: "POST",
            url: "LockedIps.aspx/LoadGrid",
            data: JSON.stringify(param),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (data, status) {
                if (status == 'success')
                {
                    alert("IP has been Unlocked sucessfully");
                }             
                BindData();
            },
            error: function (response) {
                alert(response.responseText);
            },
            
        })
    }
    catch (e) { }

}