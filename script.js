let loc = document.getElementById("location");
let tempicon = document.getElementById("temp-icon");
let tempvalue = document.getElementById("temp-value");
let climate = document.getElementById("climate");
let iconfile;
const searchInput= document.getElementById("search-input");
const searchButton= document.getElementById("search-button")


searchButton.addEventListener('click', (e)=>{
    e.preventDefault();
    getWeather(searchInput.value)
    searchInput.value = '';
});

const getWeather = async (city)=>
{
    
    try{
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=b74971502b3813f8ae31cc232e6beefe`,
        
        {mode: 'cors'}
        
        );
        
        const weatherData = await response.json();
        const{name} = weatherData;
        const{feels_like} = weatherData.main;
        const{id, main} = weatherData.weather[0];

        loc.textContent = name;
        climate.textContent = main;
        tempvalue.textContent=Math.round(feels_like-273); 

        if(id<300 && id>199)
                        {
                            tempicon.src = "icons/11d.png"
                        }
                        else if(id<400 && id>299)
                        {
                            tempicon.src = "icons/09d.png"
                        }
                        else if(id<511 && id>499)
                        {
                            tempicon.src = "icons/10d.png"
                        }
                        else if(id==511)
                        {
                            tempicon.src = "icons/13d.png"
                        }
                        else if(id<600 && id>511)
                        {
                            tempicon.src = "icons/09d.png"
                        }
                        else if(id<700 && id>599)
                        {
                            tempicon.src = "icons/13d.png"
                        }
                        else if(id<800 && id>699)
                        {
                            tempicon.src = "icons/50d.png"
                        }
                        else if(id==801)
                        {
                            tempicon.src = "icons/02d.png"
                        }
                        else if(id==800)
                        {
                            tempicon.src = "icons/01d.png"
                        }
                        else if(id==802)
                        {
                            tempicon.src = "icons/03d.png"
                        }
                        else if(id==803)
                        {
                            tempicon.src = "icons/04d.png"
                        }
                        else if(id==804)
                        {
                            tempicon.src = "icons/04d.png"
                        }
    }

    catch(error)
    {
        alert("Incorrect City name")
    }
}

function showError(error){
    notificationElement.style.display = "block";
    notificationElement.innerHTML = `<p> ${error.message} </p>`;
}

window.addEventListener("load", ()=>{
    let long;
    let lat;

    if(navigator.geolocation)
    {
        navigator.geolocation.getCurrentPosition((position)=>
            {
                long = position.coords.longitude;
                lat = position.coords.latitude;
                
                const api = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=b74971502b3813f8ae31cc232e6beefe`
                
                fetch(api)
                    .then(response=> {
                        return response.json();
                    })
                    .then (data =>{
                        const {name} = data;
                        const{feels_like} = data.main;
                        const{id, main} = data.weather[0];

                        loc.textContent = name;
                        climate.textContent=main;
                        tempvalue.textContent=Math.round(feels_like-273);

                        if(id<300 && id>199)
                        {
                            tempicon.src = "icons/11d.png"
                        }
                        else if(id<400 && id>299)
                        {
                            tempicon.src = "icons/09d.png"
                        }
                        else if(id<511 && id>499)
                        {
                            tempicon.src = "icons/10d.png"
                        }
                        else if(id==511)
                        {
                            tempicon.src = "icons/13d.png"
                        }
                        else if(id<600 && id>511)
                        {
                            tempicon.src = "icons/09d.png"
                        }
                        else if(id<700 && id>599)
                        {
                            tempicon.src = "icons/13d.png"
                        }
                        else if(id<800 && id>699)
                        {
                            tempicon.src = "icons/50d.png"
                        }
                        else if(id==801)
                        {
                            tempicon.src = "icons/02d.png"
                        }
                        else if(id==800)
                        {
                            tempicon.src = "icons/01d.png"
                        }
                        else if(id==802)
                        {
                            tempicon.src = "icons/03d.png"
                        }
                        else if(id==803)
                        {
                            tempicon.src = "icons/04d.png"
                        }
                        else if(id==804)
                        {
                            tempicon.src = "icons/04d.png"
                        }
            })
        })
    }
})

function celsiusToFahrenheit(temperature){
    return (temperature * 9/5) + 32;
}

// WHEN THE USER CLICKS ON THE TEMPERATURE ELEMENET
tempvalue.addEventListener("click", function(){
    if(weather.temperature.value === undefined) return;
    
    if(weather.temperature.unit == "celsius"){
        let fahrenheit = celsiusToFahrenheit(weather.temperature.value);
        fahrenheit = Math.floor(fahrenheit);
        
        tempvalue.innerHTML = `${fahrenheit}°<span>F</span>`;
        weather.temperature.unit = "fahrenheit";
    }else{
        tempvalue.innerHTML = `${weather.temperature.value}°<span>C</span>`;
        weather.temperature.unit = "celsius"
    }
});