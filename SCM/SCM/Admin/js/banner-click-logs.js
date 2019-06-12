var mode;
var databindtogrid;
var topicid;
var autoheightPrimary = false;
function BindData() {
    databindtogrid = banner_click_logs.LoadGrid().value.Rows;
    LoadGrid();
}

$(document).ready(function () {
    $('#collapseTwo').show();
    BindData();
});

//Get the jqGrid Value with ajax Get method
function LoadGrid() {
    autoheightPrimary = false;
    if (databindtogrid.length <= 14)
        autoheightPrimary = true;
    //Getting the source data with ajax GET request
    source = {
        datatype: "array",
        datafields: [

        { name: 'BannerName' },
        { name: 'Page' },
        { name: 'TraceTime' },
        { name: 'TraceIpAddress' },
        ],
        async: false,
        record: 'Table',
        sortable: true,
        localdata: databindtogrid
    };
    var dataAdapter = new $.jqx.dataAdapter(source,
        { contentType: 'application/json; charset=utf-8' }
    );

    $("#jqxgrid").jqxGrid({
        width: '99%',
        autoheight: autoheightPrimary,
        height: "400",
        source: dataAdapter,
        theme: 'darkblue',
        sortable: true,
        selectionmode: 'singlerow', //To trigger row select event
        pageable: true,
        pagesizeoptions: ['10', '20', '30', '40', '50'],
        pagesize: 20,
        columnsresize: true,
        columnsreorder: true,
        columns:
        [
            { text: 'Banner Name', dataField: 'BannerName' },
            { text: 'Pages Banner was Clicked On', dataField: 'Page' },
            { text: 'Date/Time', dataField: 'TraceTime' },
            { text: 'IP of clicker', dataField: 'TraceIpAddress' }
        ]
    });
}
