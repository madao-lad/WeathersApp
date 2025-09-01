const url = "https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&hourly=temperature_2m,wind_speed_120m,wind_speed_80m,wind_speed_180m,apparent_temperature,rain&timezone=auto";

const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const rain = document.getElementById("rain");

async function getWeather() {
    const weather = await fetch(url);
    
    let data = await weather.json();

    let rainProbability = data.hourly.rain[0];
    let windy = data.hourly.wind_speed_80m[0];
    let temperaturee = data.hourly.apparent_temperature[0];

    temp.textContent = temp.textContent+": "+temperaturee;    
    
    if(windy<10){
        wind.textContent = wind.textContent + ": Not windy";
    }else if(windy>10 && windy<=50){
        wind.textContent = wind.textContent + ": Mildly windy";
        document.body.style.backgroundImage="url(images/windy.jpeg)";
    }else{
        wind.textContent = wind.textContent + ": Voilent winds in your area";
    }
    
    if(temperaturee>30){
        document.body.style.backgroundImage="url(images/scorching_heat.jpeg)";
    }

    if(rainProbability>0){
        rain.textContent = rain.textContent+": YES";
        document.body.style.backgroundImage="url(images/rain.jpg)";
    }else{
        rain.textContent = rain.textContent+": NO";
    }

}

getWeather();