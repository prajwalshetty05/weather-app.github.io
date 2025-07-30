function getWeather() {
    const location = document.getElementById("location").value

    if (!location.trim()) {
        document.getElementById("msg").innerHTML = "Please enter a location"
        return
    }

    console.log("getting weather for city : " + location)

    const data = fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${location}&units=metric&appid=2d0abadf28f4c24129fb4b49b93514bc`,
    )

    data
        .then((res) => res.json())
        .then((data) => {
            console.log("API Response:", data)

            // Handling city not found error
            if (data.cod != 200) {
                document.getElementById("msg").innerHTML = "City not Found"
                return
            } else {
                document.getElementById("msg").innerHTML = ""
            }

            // Location Information
            document.getElementById("city").innerHTML = data.name
            document.getElementById("country").innerHTML = data.sys.country
            document.getElementById("locationId").innerHTML = data.id

            // Coordinates
            document.getElementById("longitude").innerHTML = data.coord.lon + "°"
            document.getElementById("latitude").innerHTML = data.coord.lat + "°"

            // Timezone and Last Updated
            const timezoneHours = (data.timezone / 3600).toFixed(1)
            document.getElementById("timezone").innerHTML =
                `UTC${timezoneHours >= 0 ? "+" : ""}${timezoneHours} (${data.timezone}s)`

            const lastUpdated = new Date(data.dt * 1000)
            document.getElementById("lastUpdated").innerHTML =
                lastUpdated.toLocaleDateString() + " " + lastUpdated.toLocaleTimeString()

            // Weather Conditions
            document.getElementById("weatherMain").innerHTML = data.weather[0].main
            document.getElementById("description").innerHTML = data.weather[0].description
            document.getElementById("weatherId").innerHTML = data.weather[0].id

            // Weather Icon (dynamically calling icons into html with a link)
            const icon = data.weather[0].icon
            const iconUrl = `https://openweathermap.org/img/wn/${icon}@2x.png`
            document.getElementById("icon").innerHTML = `<img src="${iconUrl}" alt="Weather Icon">`

            // Visibility and Clouds
            document.getElementById("visibility").innerHTML = data.visibility / 1000 + " km"
            document.getElementById("cloudiness").innerHTML = data.clouds.all + "%"

            // Temperature Data
            document.getElementById("temp").innerHTML = data.main.temp + "<span>&#8451;</span>"
            document.getElementById("feelLike").innerHTML = data.main.feels_like + "<span>&#8451;</span>"
            document.getElementById("maxTemp").innerHTML = data.main.temp_max + "<span>&#8451;</span>"
            document.getElementById("minTemp").innerHTML = data.main.temp_min + "<span>&#8451;</span>"

            // Atmospheric Pressure Data
            document.getElementById("pressure").innerHTML = data.main.pressure + " hPa"
            document.getElementById("humidity").innerHTML = data.main.humidity + "%"

            // Handle optional sea level and ground level pressure
            if (data.main.sea_level) {
                document.getElementById("seaLevel").innerHTML = data.main.sea_level + " hPa"
            } else {
                document.getElementById("seaLevel").innerHTML = "N/A"
            }

            if (data.main.grnd_level) {
                document.getElementById("groundLevel").innerHTML = data.main.grnd_level + " hPa"
            } else {
                document.getElementById("groundLevel").innerHTML = "N/A"
            }

            // Wind Data
            document.getElementById("wind").innerHTML = data.wind.speed + " m/s"
            document.getElementById("deg").innerHTML = data.wind.deg + "&deg;"

            // Handle optional wind gust
            if (data.wind.gust) {
                document.getElementById("windGust").innerHTML = data.wind.gust + " m/s"
            } else {
                document.getElementById("windGust").innerHTML = "N/A"
            }

            // Sun Times
            // Get sunrise time with Date
            const sunRise = data.sys.sunrise
            const rise = new Date(sunRise * 1000)
            const riseOptions = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
            document.getElementById("sunRise").innerHTML = rise.toLocaleTimeString([], riseOptions)

            // Get sunset time with Date
            const sunSet = data.sys.sunset
            const set = new Date(sunSet * 1000)
            const setOptions = {
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
            }
            document.getElementById("sunSet").innerHTML = set.toLocaleTimeString([], setOptions)

            // Making cards pop on search (animation)
            const collection = document.getElementsByClassName("card")
            for (let i = 0; i < collection.length; i++) {
                collection[i].style.opacity = "1"
                collection[i].style.transition = "opacity 0.5s ease-in-out"
            }
            const headers = document.getElementsByClassName("section-header")

            for (let i = 0; i < headers.length; i++) {
                headers[i].style.opacity = "1"
                headers[i].style.transition = "opacity 0.5s ease-in-out"
            }

            console.log("Weather data populated successfully")
        })
        .catch((error) => {
            console.log("Error fetching weather:", error)
            document.getElementById("msg").innerHTML = "Error fetching weather data. Please try again."
        })
}

// Optional: Allow Enter key to trigger search
document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("location")
    if (locationInput) {
        locationInput.addEventListener("keypress", (event) => {
            if (event.key === "Enter") {
                getWeather()
            }
        })
    }
})

// Optional: Clear error message when user starts typing
document.addEventListener("DOMContentLoaded", () => {
    const locationInput = document.getElementById("location")
    const msgElement = document.getElementById("msg")

    if (locationInput && msgElement) {
        locationInput.addEventListener("input", () => {
            if (msgElement.innerHTML.trim() !== "") {
                msgElement.innerHTML = ""
            }
        })
    }
})
