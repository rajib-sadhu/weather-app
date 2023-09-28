


const fetchWeather = async (name) => {
    const location = document.getElementById('location').value;
    const url = `https://weatherapi-com.p.rapidapi.com/forecast.json?q=${name || location || 'kolkata'}&days=5`;
    const options = {
        method: 'GET',
        headers: {
            'X-RapidAPI-Key': 'd34ae77cf0msh14ff28c0d59bc88p149894jsn24bc694c6800',
            'X-RapidAPI-Host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        // isLoadingToggle(true);
        const response = await fetch(url, options);
        const result = await response.json();
        console.log(result);
        if(result.error){
            alert(name+' - '+result.error.message);
        }
        else{
            const type = tempType();
            setTemp(result, type);
        }
    } catch (error) {
        console.error(error);
    }
}




const getLocation = () => {
    const location = document.getElementById('location');
    const locationBtn = document.getElementById('location-btn');

    locationBtn.addEventListener('click', () => {
        const value = location.value;
        fetchWeather(value);
        location.value='';
    })
}

const setTemp = (data, type) => {

    const area = document.getElementById('area');
    const image = document.getElementById('image');
    const curTemp = document.getElementById('curTemp');
    const condition = document.getElementById('condition');
    const feelLike = document.getElementById('feelLike');
    const windSpeed = document.getElementById('windSpeed');
    const humidity = document.getElementById('humidity');
    const currDate = document.getElementById('date');
    const hume = document.getElementById('card-hume');
    const cloud = document.getElementById('cloud');
    const visibility = document.getElementById('visibility');
    const uv = document.getElementById('uv');

    const foreImg1 = document.getElementById('foreImg1');
    const foreDec1 = document.getElementById('foreDec1');
    const foreTemp1 = document.getElementById('foreTemp1');
    const foreDate1 = document.getElementById('foreDate1');

    const foreImg2 = document.getElementById('foreImg2');
    const foreDec2 = document.getElementById('foreDec2');
    const foreTemp2 = document.getElementById('foreTemp2');
    const foreDate2 = document.getElementById('foreDate2');


    const date = new Date(data?.location?.localtime);

    area.innerText = `${data?.location?.name}, ${data?.location?.country}`;
    currDate.innerText = date.toDateString();
    condition.innerText = data?.current?.condition?.text;
    image.setAttribute('src', data?.current?.condition?.icon);
    windSpeed.innerText = data?.current?.wind_kph;
    humidity.innerText = data?.current?.humidity;
    hume.innerText = data?.current?.humidity;
    cloud.innerText = data?.current?.cloud;
    visibility.innerText = data?.current?.vis_km;
    uv.innerText = data?.current?.uv;

    foreImg1.setAttribute('src', data?.forecast.forecastday[1]?.day?.condition?.icon);
    foreDec1.innerText = data?.forecast.forecastday[1]?.day?.condition?.text;
    foreDate1.innerText = (new Date(data?.forecast.forecastday[1]?.date)).toString().slice(4, 10);
    
    foreImg2.setAttribute('src', data?.forecast.forecastday[2]?.day?.condition?.icon);
    foreDec2.innerText = data?.forecast.forecastday[2]?.day?.condition?.text;
    foreDate2.innerText = (new Date(data?.forecast.forecastday[2]?.date)).toString().slice(4, 10);


    if (type === 'C') {
        curTemp.innerText = data?.current?.temp_c;
        feelLike.innerText = data?.current?.feelslike_c;
        
        foreTemp1.innerText = data?.forecast.forecastday[1]?.day?.avgtemp_c;
        foreTemp2.innerText = data?.forecast.forecastday[2]?.day?.avgtemp_c;
    }
    else {
        curTemp.innerText = data?.current?.temp_f;
        feelLike.innerText = data?.current?.feelslike_f;

        foreTemp1.innerText = data?.forecast.forecastday[1]?.day?.avgtemp_f;
        foreTemp2.innerText = data?.forecast.forecastday[2]?.day?.avgtemp_f;
    }
    // isLoadingToggle(false)
}


// API data Loading
function isLoadingToggle(isLoad) {

    const load = document.getElementById('isLoading');
    const contain = document.getElementById('contain');

    if (isLoad) {
        load.classList.remove('hidden');
        contain.classList.add('hidden');
    }
    else {
        load.classList.add('hidden');
        contain.classList.remove('hidden');
    }
}


const tempType = () => {
    const check = document.getElementById('temp-type');
    if (check.checked == true) {
        return 'F'
    }
    else {
        return 'C'
    }
}
tempType();
getLocation();
fetchWeather('new Delhi');
