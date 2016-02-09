// hartslagChart
var hartslagData = {
    labels: ["Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag", "Zondag"],
    datasets: [
        {
            label: "My First dataset",
            fillColor: "rgba(220,220,220,0)",
            strokeColor: "rgba(220,220,220,1)",
            pointColor: "rgba(220,220,220,1)",
            pointStrokeColor: "#fff",
            pointHighlightFill: "#fff",
            pointHighlightStroke: "rgba(220,220,220,1)",
            data: [80, 99, 90, 93, 97, 88, 86]
        }
    ]
};
var hartslagCtx = document.getElementById("hartslagChart").getContext("2d");
var hartslagChart = new Chart(hartslagCtx).Line(hartslagData);