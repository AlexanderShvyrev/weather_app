const form = document.querySelector('form')
const card = document.querySelector('.card')
const details = document.querySelector('.details')
const time = document.querySelector('img.time')
const icon = document.querySelector('.icon img')


//update ui
const updateUI = (data) => {
    // const cityDetails = data.cityDetails
    // const weather = data.weather

    //destructuring
    const { cityDetails, weather } = data

    //update details template
    details.innerHTML = `
        <h5 class="my-3">${cityDetails.EnglishName}</h5>
        <div class="my-3">${weather.WeatherText}</div>
        <div class="display-4 my-4">
            <span>${weather.Temperature.Metric.Value}</span>
            <span>&deg;C</span>
        </div>
    `
    //update the night/day & icon images
    const iconSource = `img/icons/${weather.WeatherIcon}.svg`
    icon.setAttribute('src', iconSource)

    let timeSource = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg'
    time.setAttribute('src', timeSource)


    //remove d-none class if present
    if (card.classList.contains('d-none')) {
        card.classList.remove('d-none')
    }
}

const updateCity = async (city) => {

    const cityDetails = await getCity(city)
    const weather = await getWeather(cityDetails.Key)

    return { cityDetails, weather }
}

form.addEventListener('submit', e => {
    e.preventDefault()

    //get city value from the form
    const city = form.city.value.trim()
    form.reset()

    //update the ui with that city value
    updateCity(city)
        .then(data => updateUI(data))
        .catch(err => console.log(err))
})