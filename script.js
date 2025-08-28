const url = "https://api.open-meteo.com/v1/forecast?latitude=28.6519&longitude=77.2315&hourly=temperature_2m,wind_speed_120m,wind_speed_80m,wind_speed_180m,apparent_temperature,rain&timezone=auto";

const temp = document.getElementById("temp");
const wind = document.getElementById("wind");
const rain = document.getElementById("rain");

async function getWeather() {
    const weather = await fetch(url);
    
    let data = await weather.json();

    console.log(data);

    let rainProbability = data.hourly.rain[0];
    let windy = data.hourly.wind_speed_80m[0];

    if(rainProbability>0){
        rain.textContent = rain.textContent+": YES";
    }else{
        rain.textContent = rain.textContent+": NO";
    }

    if(windy<10){
        wind.textContent = wind.textContent + ": Not windy";
    }else if(windy>10 && windy<=50){
        wind.textContent = wind.textContent + ": Mildly windy";
    }else{
        wind.textContent = wind.textContent + ": Voilent winds in your area";
    }


    temp.textContent = temp.textContent+": "+data.hourly.apparent_temperature[0];    
}

getWeather();