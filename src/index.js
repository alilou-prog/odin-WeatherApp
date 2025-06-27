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

document.addEventListener("DOMContentLoaded", () => {
    const app = {}
    setup_ui(app);
    app.form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const data = new FormData(e.target);
        app.data.temp = await get_temp(data.get("city"), data.get("day"));
        document.dispatchEvent(app.update_ui_event);
    })
    document.addEventListener("update_ui", () => {
        update_ui(app);
    })
})

function setup_ui(app) {
    app.data = {}
    app.update_ui_event = new Event("update_ui");
    app.form = document.querySelector("form.enter-city");
    app.temp_p = document.querySelector("p.temp");
}

function update_ui(app) {
    app.temp_p.textContent = app.data.temp;
}