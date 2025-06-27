import "./style.css"

const base_url = 'https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline'
const api_key = 'TKL67EH2P82E4X4SGW464PEFZ';

const catch_error = (fn) => {
    return function (...params) {
        return fn(...params).catch(err => console.error(err))
    }
}

const fetch_s = catch_error(fetch)

async function get_data(city) {
    const response = await fetch_s(`${base_url}/${city}?key=${api_key}`);
    const data = await response.json();
    return data;
}

function get_temp(data, day) {
    return data.days[day].temp;
}

console.log(get_temp(await get_data("london"), 0))