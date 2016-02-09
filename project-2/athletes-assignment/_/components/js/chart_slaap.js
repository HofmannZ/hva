// slaapChart
var slaapData = {
    labels: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0.2)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [8, 9, 7, 10, 8, 9, 8]
        }
    ]
};
var slaapCtx = document.getElementById("slaapChart").getContext("2d");
var slaapChart = new Chart(slaapCtx).Bar(slaapData);