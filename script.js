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




    return;
    fetch(FinalURL)
    .then(response=>{
        console.log(response)
        if(response.status===200){
            response.json()
         .then((data)=>{

            console.log(data)

    
            document.getElementById('detail-city').childNodes[0].textContent=data.name;
            document.getElementById('detail-country').textContent=data.sys.country;
            document.getElementById('detail-temp-current').textContent=data.sys.country;
            
            let unit_post = form['temp-unit'].value=="celcius"?"\u00B0c":"\u00B0f"
            
            document.getElementById('detail-temp-current').textContent=data.main.temp+unit_post;
            document.getElementById('detail-temp-min').textContent=data.main.temp_min+unit_post;
            document.getElementById('detail-temp-max').textContent=data.main.temp_max+unit_post;

            document.getElementById('msg').textContent=data.weather[0].description;
            document.getElementById('weather-icon-img').src="http://openweathermap.org/img/wn/"+data.weather[0].icon+".png";
            
            document.getElementById('speed').textContent=data.main.humidity+" mph";
            document.getElementById('humidity').textContent=data.main.humidity+" %";

            const today = new Date()
            let weekday = today
            .toLocaleString('default', { 
                weekday: 'long',
            })
            let date = today
            .toLocaleString('default', { 
                month: 'long' ,
                day:"numeric",
            })
            let time = today.toLocaleString("local", {
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            });

            document.getElementById('detail-time').textContent= weekday+" | "+date+" | "+time;

            document.getElementsByClassName('container')[0].style.display = 'flex';

            let newSrc = "";
            let banner = document.querySelector('.img img');
            console.log(banner);
            switch(data.weather[0].main){
                case "Clouds":
                    newSrc ="./img/cloud.jpg";
                break;
                case "Rain":
                    newSrc ="./img/rain.jpg";
                break;
                case "Thunderstorm":
                    newSrc ="./img/thunderstorm.jpg";
                break;
                case "Snow":
                    newSrc ="./img/snow.jpg";
                break;
                case "Mist":
                    newSrc ="./img/mist.jpg";
                break;
                default:
                    newSrc ="./img/clear.jpg";
            }
            banner.src = newSrc;
        });
    }else{
        alert("Error "+response.status)
    }
    });

    
    
})

