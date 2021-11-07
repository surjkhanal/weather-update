let URL = "https://api.openweathermap.org/data/2.5/weather?q="
let api = "&appid=d5f8f7a59b864b1dbc1ba51e70dc34b8"
let form = document.forms['city-form'];


let backBtn= document.querySelector('#back-btn')
let citySelected= document.querySelector('#selected-city')
let cityDetailBlock= document.querySelector('#city-info')
function toogleHide(){
    form.className = "hidden";
    backBtn.className="";
    citySelected.className=""
    cityDetailBlock.className=""
}

function resetPage(){  
        form.className = "";
        backBtn.className="hidden";
        citySelected.className="hidden"
        cityDetailBlock.className="hidden"
}

function manageImgSrc(data){
    let main = data.main
    let desc = data.description

    let result = 'https://img.icons8.com/office/80/000000/'

    switch(main){
        case 'Haze': 
        result+="fog-day--v2"
        break;
        case 'Mist': 
        return "https://img.icons8.com/external-photo3ideastudio-flat-photo3ideastudio/80/000000/external-mist-natural-disaster-photo3ideastudio-flat-photo3ideastudio.png"
        break;
        case 'Thunderstorm': 
        result+="storm"
        break;
        case 'Drizzle': 
        case 'Rain': 
        result+="rain"
        break;
        case 'Snow': 
        result+="snow"
        break;
        case 'Clear': 
        result+="autumn"
        break;
        case 'Clouds': 
        result+="clouds"
        break;
        default: 
        result+="dust"
    }

    return result+".png";

}

backBtn.addEventListener('click',resetPage )

form.addEventListener('submit',async (event) => {
    event.preventDefault();
    console.log(form);
    let location = form['city'].value
    let unit = "&units="
    unit += form['unit'].value=="cel"?"metric":"imperial"
    let FinalURL = URL + location +api +unit;
    console.log(FinalURL);
    
    let response = await fetch(FinalURL);
    let responseData = await response.json();
    if(responseData.cod!=200){
        resetPage();
        console.log(responseData);
        alert(responseData.message);
        return;
    }
    console.log(responseData);
    citySelected.textContent=responseData.name

    let temp = cityDetailBlock.querySelector('h1')
    temp.textContent=responseData.main.temp
    temp.className="unit-"+form['unit'].value
    
    temp = cityDetailBlock.querySelector('p')
    temp.textContent=responseData.weather[0].description
    
    temp = cityDetailBlock.querySelector('#left .metrics')
    temp.textContent=responseData.main.feels_like
    temp.classList.add("unit-"+form['unit'].value)
    
    temp = cityDetailBlock.querySelector('#right .metrics')
    temp.textContent=responseData.main.humidity
    
    
    temp = cityDetailBlock.querySelector('img')
    temp.src=manageImgSrc(responseData.weather[0])
    
    toogleHide();
    form.reset();
    
})

