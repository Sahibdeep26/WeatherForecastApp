//Go to https://openweathermap.org/  and create an account
// After creating the account you will see your name somewhere in the menu bar
// Click on your name and go to API keys option
// Copy your API KEY and paste it in the 'appId'

let appId = 'a2975657c16e6d890a0e63ed44ee26ca'  //PASTE YOUR API KEY HERE, TO GET THE API KEY FOLLOW THESE STEPS
let units = 'metric'
let searchMethod;

// Go to the website below to add more stuff like pressure, coordinates, timezone

//https://openweathermap.org/current#current_JSON



function getSearchMethod(searchTerm){
    if(searchTerm.length === 5 && Number.parseInt(searchTerm) + '' === searchTerm){
        searchMethod='zip';
    }else{
        searchMethod='q';
    }
}

function searchWeather(searchTerm){
    getSearchMethod(searchTerm);
    fetch(`https://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchTerm}&APPID=${appId}&units=${units}`).then(res =>{
        return res.json();
    }).then(res =>{
        init(res);
    })
}


function init(resultFromServer){
    switch (resultFromServer.weather[0].main) {
        case 'Clear':
            document.body.style.backgroundImage='url("./images/clear.jpg")';
            break;
    
        case 'Clouds':
            document.body.style.backgroundImage='url("./images/cloudy.jpg")';
            break;
        case 'Thunderstorm':
            document.body.style.backgroundImage='url("./images/storm.jpg")';
        break;
        
        case 'Snow':
            document.body.style.backgroundImage='url("./images/snow.jpg")';   
        break;
        
        case 'Rain':
        case 'Drizzle':
        case 'Mist':
            document.body.style.backgroundImage='url("./images/rain.jpg")'; 
            break;
                
        default:  
            break;
    }

    let weatherDescriptionHeader = document.getElementById('weatherDescriptionHeader');
    let temperatureElement = document.getElementById('temperature');
    let humidityElement = document.getElementById('humidity');
    let windSpeedElement = document.getElementById('windSpeed');
    let cityHeader = document.getElementById('cityHeader');
    let weatherIcon = document.getElementById('documentIconImg');
    

    weatherIcon.src='https://openweathermap.org/img/w/' + resultFromServer.weather[0].icon + '.png';

    let resultDescription = resultFromServer.weather[0].description;
    weatherDescriptionHeader.innerText = resultDescription.charAt(0).toUpperCase() +resultDescription.slice(1);

    temperatureElement.innerHTML = Math.floor(resultFromServer.main.temp) + '&#176C';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(resultFromServer.wind.speed) + ' m/s'
    cityHeader.innerHTML = resultFromServer.name + ', ' +resultFromServer.sys.country;
    humidityElement.innerHTML = 'Humidity levels at ' + resultFromServer.main.humidity + '%';


    setPositionForWeatherInfo();
    console.log(resultFromServer);

}

function setPositionForWeatherInfo(){
    let weatherContainer =document.getElementById('weatherContainer');
    let weatherContainerHeight = weatherContainer.clientHeight;
    let weatherContainerWidth = weatherContainer.clientWidth;

    weatherContainer.style.left =  `calc(50% - ${weatherContainerWidth/2}px)`;
    weatherContainer.style.top =  `calc(50% - ${weatherContainerHeight/1.3}px)`;
    weatherContainer.style.visibility = 'visible';
}

document.getElementById('searchBtn').addEventListener('click',() =>{
    let searchTerm=document.getElementById('searchInput').value;
    if (searchTerm)
        searchWeather(searchTerm);
})

