google.load("visualization", "1", { packages: ["corechart"] });
$(document).ready(function () {


    //    Gtype = "K";
    //    Gmode = "L";

    Gtype = $('[type="hidden"][id$=hdnType]').val();
    Gmode = $('[type="hidden"][id$=hdnMode]').val();
    
    // Code Coptimised For Css Based Buttons by Vivek for kwh & $$$ Values
    $('#GenrationType a').click(function () {
        Gtype = $(this).attr('mode');
        $('[type="hidden"][id$=hdnType]').val(Gtype);
        drawChart(Gtype, Gmode);
        $(this).parent().find('div').each(function () { $('#GenrationType a div').addClass('TabBtns').removeClass('TabBtns_ro'); });
        $(this).find('div').addClass('TabBtns_ro').removeClass('TabBtns');
    });

    // Code Coptimised For Css Based Buttons by Vivek for Last 10 Days & Next 10 Days.
    $('#GenrationMode a').click(function () {
        Gmode = $(this).attr('mode');
        $('[type="hidden"][id$=hdnMode]').val(Gmode);
        drawChart(Gtype, Gmode);
        $(this).parent().find('div').each(function () { $('#GenrationMode a div').addClass('TabBtns').removeClass('TabBtns_ro'); });
        $(this).find('div').addClass('TabBtns_ro').removeClass('TabBtns');
    });

    drawChart(Gtype, Gmode);
    setImages();
});

function setImages() {
    // Code Coptimised For Css Based Buttons by Vivek to set default classes on buttons.
    
    $('#GenrationType a[mode="K"] div').addClass(Gtype == "K" ? "TabBtns_ro" : "TabBtns");
    $('#GenrationType a[mode="D"] div').addClass(Gtype == "D" ? "TabBtns_ro" : "TabBtns");
    $('#GenrationMode a[mode="L"] div').addClass(Gmode == "L" ? "TabBtns_ro" : "TabBtns");
    $('#GenrationMode a[mode="N"] div').addClass(Gmode == "N" ? "TabBtns_ro" : "TabBtns");
}

function drawChart(Type, Mode) {
    var vAxTitle = Type == "K" ? 'Unit Generated (In kWh)' : 'Unit Generated Cost (In $)';
    var hAxisCol = '';
    var session = Usage.checksession().value;
    if (session == "null") {
        alert('Your session has expired. Please re-login.');
        window.location.href = "default.aspx";
        return;
        //function drawChart(Gtype, Type, Mode) {
        //    //Loaded Data

        //    var hAxisCol = '';
        //    var vAxisCol = '';
        //    var hAxTitle = '';
        //    var vAxTitle = Type == "K" ? 'Unit Consumed (In kWh)' : 'Cost of Unit Consumed (In $)';
        //    mainTitle = '';

    }
    var data = new google.visualization.DataTable();
    data.addColumn('string', 'Topping');
    data.addColumn('number', 'Generation');
    data.addColumn({ type: 'string', role: 'tooltip' });
    var MyData = PowerGeneration.GetGenration(Type, Mode).value;
    var rowCount;
    if (MyData != null && MyData != "") {
        rowCount = MyData.Rows.length;
    }
    else { rowCount = 0; }
    data.addRows(rowCount);
    if (rowCount > 0) {
        DateFromTo = MyData.Rows[0]["ODateOfReading"] + " to " + MyData.Rows[rowCount - 1]["ODateOfReading"];
        var s = '';
        for (var i = 0; i < rowCount; i++) {

            data.setCell(i, 0, MyData.Rows[i]["DateOfReading"].split('/')[0] + '/' + MyData.Rows[i]["DateOfReading"].split('/')[1]);

            //data.setCell(i, 0, MyData.Rows[i]["DateOfReading"].split('/')[1]);
            data.setCell(i, 1, MyData.Rows[i]["TotalUnit"]);
            //data.setCell(i, 2, "Generation: " + MyData.Rows[i]["TotalUnit"].toFixed(2));
            data.setCell(i, 2, ((Type == 'K') ? '' : '$ ') + MyData.Rows[i]["TotalUnit"].toFixed(2) + ((Type == 'K') ? ' kWh' : ''));
            s += "<div class='DayContainer'> <div class='DayHeader'>" + MyData.Rows[i]["DayName"] + "</div>" +
        "<div class='DateHeader'>" + MyData.Rows[i]["DateOfReading"] + "</div>" +
        "<div class='Condition'>" + MyData.Rows[i]["WeatherTypeName"] + "</div>" +
        "<div class='Temp'>" + MyData.Rows[i]["HighTemp"] + "°</div>" +
        "<div class='Lowtemp'>Lo " + MyData.Rows[i]["Lowtemp"] + "°</div></div>";
        }
        $('#divWether').html(s);

        var options = {
            title: 'Period: ' + DateFromTo, titleTextStyle: { color: '#666' },
            width: 620,
            height: 250,
            legend: { position: 'none' },

            vAxis: { title: vAxTitle, titleTextStyle: { color: '#666', italic: false }, minValue: 0 },
            hAxis: { textStyle: { fontSize: 11 }, showTextEvery: 1, slantedText: true, slantedTextAngle: 50 }
        };
        var chart = new google.visualization.ColumnChart(document.getElementById('chart_div'));
        chart.draw(data, options);
    }
    else {
        alert('Sorry. Your account data is not available at this time. Please try again later or contact customer support.')
        $('#divWether').html('');
        $('#chart_div').html('');
    }
}