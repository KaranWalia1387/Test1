$(document).ready(function () {
    loader.showloader();

    mode = 0;
    xml = '';
    // bind(0, '');
    loader.hideloader();

    $('#btnUpdate').click(function () {
        loader.showloader();
        var flag = 0;
        var rowCount = $('#tblDetails tr').length;

        for (var i = 0; i < rowCount - 1; i++) {

            var TextBoxEnglishID = "txtEnglishText_" + i;
            var TextBoxEnglishValue = document.getElementById(TextBoxEnglishID).value;

            var TextBoxSpanishID = "txtSpanishText_" + i;
            var TextBoxSpanishValue = document.getElementById(TextBoxSpanishID).value;


            if (TextBoxEnglishValue == '') {
                flag = 1;
                $('#' + TextBoxEnglishID).addClass('errorbox');
                $('#' + TextBoxEnglishID).text(''); $('#' + TextBoxEnglishID).focus();
            }            
            else if (TextBoxSpanishValue == '') {
                flag = 2;
                $('#' + TextBoxSpanishID).addClass('errorbox');
                $('#' + TextBoxSpanishID).text(''); $('#' + TextBoxSpanishID).focus();
            }

            if (TextBoxEnglishValue != '') { $('#' + TextBoxEnglishID).removeClass('errorbox'); }
            if (TextBoxSpanishValue != '') { $('#' + TextBoxSpanishID).removeClass('errorbox'); }
        }

        if (flag == 1) {
            alert('Please enter English Text.');
            loader.hideloader();
            return false;
        }
        else if (flag == 2) {
            alert('Please enter Spanish Text.');
            loader.hideloader();
            return false;
        }
        else {
            var xml; var chk;
            xml = '<ROOT>';
            for (var i = 0; i < rowCount - 1; i++) {
                var LabelID = "lblmodule_" + i;
                var TextBoxEnglishID = "txtEnglishText_" + i;
                var TextBoxSpanishID = "txtSpanishText_" + i;

                var Chkbx = "chkbxemailstatus_" + i;
                var LabelValue = document.getElementById(LabelID).innerText;
                var TextBoxEnglishValue = document.getElementById(TextBoxEnglishID).value;
                var TextBoxSpanishValue = document.getElementById(TextBoxSpanishID).value;

                var isChecked = $('#' + Chkbx + ':checked').val() ? "True" : "False";

                xml += '<DISCLAIMER><MODULE>' + LabelValue + '</MODULE>';
                xml += '<ENGLISHTEXT>' + TextBoxEnglishValue + '</ENGLISHTEXT>';
                xml += '<SPANISHTEXT>' + TextBoxSpanishValue + '</SPANISHTEXT></DISCLAIMER>';
            }
            xml += '</ROOT>';
            SaveData(1, xml);
        }
    });
});

function SaveData(Mode, XML) {
    var param = { Mode: Mode, xml: XML };
    $.ajax({
        type: "POST",
        url: "disclaimersettings.aspx/GetSetData",
        data: JSON.stringify(param),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: function (data, status) {
            alert(JSON.parse(data.d).Table[0].Message);
        },
        error: function (response) {
            console.log(response.responseText);
        }
    });
    loader.hideloader();
}