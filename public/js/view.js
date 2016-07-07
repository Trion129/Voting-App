google.charts.load('current', {'packages':['corechart']});
      google.charts.setOnLoadCallback(drawChart);
      function drawChart() {
        var options = data.options;
        options.unshift(["Options","Votes"])
        var passdata = google.visualization.arrayToDataTable(options);

        var options = {
          title: 'Votes Chart'
        };

        var chart = new google.visualization.PieChart(document.getElementById('chart'));

        chart.draw(passdata, options);
      }

document.getElementById("Head").innerHTML = data.head;
document.getElementById("Desc").innerHTML = data.description;
