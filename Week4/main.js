var myCity = {
    "name": "Dubai",
    "country": "UAE",
    "place": "Dubai Mall"
};

console.log(myCity.name); // Outputs: Dubai
console.log(myCity.country); // Outputs: UAE

var myCity = ["Dubai", "UAE", "Dubai Mall"];

console.log(myCity[0]); // Outputs: Dubai

var myCities = [
    {
        "name": "Dubai",
        "country": "UAE",
        "place": "Dubai Mall"
    },
    {
        "name": "Milan",
        "country": "Italy",
        "place": "Duomo Di Milano"
    }
];

console.log(myCities[1].country); // Outputs: Italy

//Ajax request

var cityContainer = document.getElementById("city-info");
var btn = document.getElementById("btn");
btn.addEventListener("click", function(){
var ourRequest = new XMLHttpRequest();
ourRequest.open('GET', 'https://ms2176.github.io/cities1.json');
ourRequest.onload = function() {
var ourData = JSON.parse(ourRequest.responseText);
renderHTML(ourData);
};
ourRequest.send();
});
function renderHTML(data){
var htmlString = "this is a test";
cityContainer.insertAdjacentHTML('beforeend' , htmlString);
}

