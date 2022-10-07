let url="https://api.wheretheiss.at/v1/satellites/25544"
let issLat=document.querySelector("#iss-lat")
let issLong=document.querySelector("#iss-long")
let timeISSLocationFetched = document.querySelector("#time")

let update = 10000 // 10000msec
let maxAttempts = 3
let map = L.map("iss-map").setView([0,0],1)
let issMarker
let markerDefined=false
let issIcon = L.icon({
        iconUrl: 'iss_icon.png',
        iconSize: [30,30],
        iconAnchor: [15,15] })
// used icon https://thenounproject.com/icon/international-space-station-24414/
// public domain

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map)

iss(maxAttempts) // call function to begin, then call every 10 s
// setInterval(iss, update) // time is in ms

function iss(attempts) {
        if (attempts <= 0) {
                alert ('Unable to contact server.')
                return }

fetch(url)
    .then( res => res.json())
    //return value from res.json request feeds into the next .then block, issData parameter
    .then( issData => {
        let lat = issData.latitude
        let long = issData.longitude
        console.log (lat, long)
        issLat.innerHTML = lat
        issLong.innerHTML = long

        let currentTime = Date()
        console.log(currentTime)
        timeISSLocationFetched.innerHTML=`ISS Location was retrieved at ${currentTime}`

        if (!markerDefined) { // if not issMarker then create
                // console.log("this is where the error is")

                issMarker = L.marker([lat,long], {icon: issIcon}).addTo(map) //
    // i spent way too much time trying to debug an error that turned out to be "addto" instead of "addTo"
    // and then more time debugging why I was getting multiple markers, had included "let issMarker" inside this loop
                console.log("Marker: "+issMarker+"!Marker: "+ !issMarker)
                markerDefined = true

        }
        else { // move marker
                // console.log("move marker")
                issMarker.setLatLng([lat,long])   }


    })

    .catch( error => {
            console.log('Error', error)
            attempts = attempts - 1    })

    .finally( () => {
        // will run whether fetch was successful or not, calls ISS after ms delay from last processed update
        setTimeout(iss, update, attempts)  })
}
// finally called function parameters go after the update parameter

//fetch returns a "promise" = JS object - will provide results or an error
//res.json function extracts the json data from the large response - and returns a promise
// this catch handles errors from fetch or the data
