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

async function get_temp(city, day) {
    const data = await get_data(city);
    return data.days[day].temp;
}

document.addEventListener("DOMContentLoaded", ()=>{
    const form = document.querySelector("form.enter-city");
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        console.log(await get_temp(data.get("city"), data.get("day")));
    })
})