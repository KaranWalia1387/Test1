var databindtogrid;
$(document).ready(function () {

    loadGridData();
    $('#btnSubmit').click(function () {
        try {
            var languageGuId = $('input[name="language"]:checked').val();
            var result = configure_language.SetDefault(languageGuId).value;
            if (result == "1") {
                alert('Data submitted successfully.');
                loadGridData();
            }
            else
                alert('Data is not submitted, please try again later.');
        }
        catch (e) {
            alert('Server error, please try again later.');
        }
    });
});


function loadGridData() {
    try {
        var result = configure_language.GetLanuages().value;
        if (result != null) {
            databindtogrid = result.Tables[0].Rows;
        }
        LoadGrid();
    }
    catch (e) { }
}

$(document).on("click", ".activeimg", function () {
    try {
        var idLock = this.id;
        var currentStatus = idLock.split('_')[0];
        var languageGuId = idLock.split('_')[1];
        changeStatus(currentStatus, languageGuId);
    }
    catch (e) { }
});

function changeStatus(currentStatus, languageGuId) {
    try {
        var confirmMsg = '';
        var alertMsg = '';
        var status = '';
        var isdefault = '';

        for (var i = 0; i < databindtogrid.length; i++) {
            if (databindtogrid[i].LanguageGuId == languageGuId) {
                if (databindtogrid[i].IsDefault)
                    isdefault = '1';
                else {
                    isdefault = '0';
                    break;
                }
            }
        }
        if (currentStatus == "true") {
            if (isdefault == '1') {
                alert('You can not disable this language as this is default language.');
                return false;
            }
            confirmMsg = "Are you sure you want to disable this language?";
            alertMsg = 'disabled';
            status = '0';
        }
        else {
            confirmMsg = "Are you sure you want to enable this language?";
            alertMsg = 'enabled';
            status = '1';
        }
        if (confirm(confirmMsg)) {
            var result = configure_language.ChangeStatus(languageGuId, status, isdefault).value;
            if (result == "1") {
                alert('Language has been ' + alertMsg + ' successfully.');
                loadGridData();
            }
            else
                alert('Language is not ' + alertMsg + '.');
        }
    }
    catch (e) { }
}


var customrenderer = function (row, datafield, value) {
    try {
        switch (datafield) {
            case "Status": return getstatus(row, value); break;
            case "IsDefault": return radio(row, value); break;
            default: break;
        }
    }
    catch (e) { return ''; }
}


function getstatus(row, value) {
    try {
        var LanguageGuId = $('#jqxgrid').jqxGrid('getrowdata', row).LanguageGuId;
        var src = value == "true" ? "../images/active.png" : "../images/inactive.png";
        var imgid = value + '_' + LanguageGuId;
        return '<div style="text-align: center;"><img id=' + imgid + ' class="activeimg" src=' + src + ' /></div>';
    }
    catch (e) { return ''; }
}

function radio(row, value) {
    try {
        var LanguageGuId = $('#jqxgrid').jqxGrid('getrowdata', row).LanguageGuId;
        var isActive = $('#jqxgrid').jqxGrid('getrowdata', row).Status;
        var ischecked = (value == "true") ? 'checked="checked"' : '';
        var isdisabled = (isActive == "false") ? 'disabled="disabled"' : '';
        var radioHtml = '<input value=' + LanguageGuId + ' type="radio" name="language" ' + ischecked + ' ' + isdisabled + ' />';
        return radioHtml;
    }
    catch (e) { return ''; }
}

function LoadGrid() {
    try {
        //Getting the source data with ajax GET request
        source = {
            datatype: "array",
            datafields: [
            { name: 'SNo' },
            { name: 'LanguageGuId' },
            { name: 'LanguageName' },
            { name: 'LanguageCode' },
            { name: 'Status' },
            { name: 'IsDefault' }
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

            width: "100%",
            height: "310px",
            autorowheight: true,
            source: dataAdapter,
            theme: 'darkblue',
            sortable: true,
            selectionmode: 'singlerow', //To trigger row select event
            pageable: true,
            pagesizeoptions: ['10', '20', '30', '40', '50'],
            pagesize: 20,
            columnsresize: true,
            columnsreorder: true,
            enabletooltips: true,
            columns:
            [
            { text: 'Sr. No.', dataField: 'SNo', width: '20%' },
            { text: 'LanguageGuId', dataField: 'LanguageGuId', width: '0%', hidden: true },
            { text: 'Language Name', dataField: 'LanguageName', width: '20%' },
            { text: 'Language Code', dataField: 'LanguageCode', width: '20%' },
            { text: 'Status', dataField: 'Status', width: '20%', cellsrenderer: customrenderer },
            { text: 'Default', dataField: 'IsDefault', width: '20%', cellsrenderer: customrenderer }
            ]
        });
    }
    catch (e) { }
}
