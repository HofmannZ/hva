// humeurChart
var humeurData = [
    {
        value: 4,
        color: "rgba(76,217,100,1)",
        highlight: "rgba(76,217,100,0.9)",
        label: "Goed"
    },
    {
        value: 2,
        color: "rgba(255,204,0,1)",
        highlight: "rgba(255,204,0,0.9)",
        label: "Matig"
    },
    {
        value: 1,
        color: "rgba(229,29,31,1)",
        highlight: "rgba(229,29,31,0.9)",
        label: "Slecht"
    }
];

var humeurOptions = {
    //Number - Amount of animation steps
    animationSteps : 90,

    //String - Animation easing effect
    animationEasing : "easeOutQuart"
};
    
var humeurCtx = document.getElementById("humeurChart").getContext("2d");
var humeurChart = new Chart(humeurCtx).Pie(humeurData, humeurOptions);