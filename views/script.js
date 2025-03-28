// Imports
import { getFullDb } from './query.js';
import { markersAndLatLng, defaultPinElement, isSameMarkerFromCoordinates } from './searchbar.js'

let map;

// Create map and markers
async function initMap() {

    const defualtPosition = { lng: 0, lat: 20 };

    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
        zoom: 3,
        center: defualtPosition,
        mapId: "DEMO_MAP_ID",
    });

    // Get the database and populate the map with markers
    getFullDb(populateMarkers)
}

// Create a marker at a given position (longitude and latitude)
async function createMarker(position, name) {
    
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    console.log(map, position);

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: name,
        content: defaultPinElement()
    });

    markersAndLatLng.push({marker: marker, latLng: position});

    marker.addListener('click', ({ domEvent, latLng }) => {

        console.log(domEvent);

        document.getElementById('searchBar').style.visibility = 'hidden';
        document.getElementById('submitInfoButton').style.visibility = 'hidden';

        getFullDb((db) => extractMarkerInfo(db, latLng));
    });
}

// Iterate through markers and call createMarker for each
async function populateMarkers(db) {
    
    for (const user of db.users) {
        let position = {
          lat: user.location.latitude,
          lng: user.location.longitude
        };
        // Create a marker at the user's location
        createMarker(position, user.name);
    }
}



// Extract information from the database and display it in the marker info box
function extractMarkerInfo(db, latLng) {

    const markerInfoBox = document.getElementById('markerInfo');
    markerInfoBox.style.visibility = 'visible';

    for (const user of db.users) {
        if (isSameMarkerFromCoordinates(user.location, { lat: latLng.lat(), lng: latLng.lng() })) {
            console.log(user);

            let userStory = `Heritage: ${user.heritage_name}<br><br>Story: ${user.story}`;
            let userContact = `Email Address: ${user.email}<br><br>Phone Number: ${user.phone}<br><br>Address: ${user.location.location_name}`;

            let x_button_onclick = "document.getElementById('markerInfo').style.visibility='hidden';document.getElementById('searchBar').style.visibility = 'visible';document.getElementById('submitInfoButton').style.visibility = 'visible';";
            
            // Set the innterHTML of the markerInfoBox to the user's information
            markerInfoBox.innerHTML = `
            <img src="x_button.png" alt="Close" style="width: 50px; height: 50px; margin-left:96%; margin-top:1%;" onclick="${x_button_onclick}">
            <h1 style="text-align: center; font-size: 3em">${user.name}</h1>
            <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                <div onclick="document.getElementById('markerInfoSubsection').innerHTML='${userStory}'" class="markerInfoTab">story</div>
                <div onclick="document.getElementById('markerInfoSubsection').innerHTML='${user.recipe}'" class="markerInfoTab">recipes</div>
                <div onclick="document.getElementById('markerInfoSubsection').innerHTML='${userContact}'" class="markerInfoTab">contact</div>                    
            </div>
            <div id="markerInfoSubsection"></div>
            `;
        }
    }
}

initMap();
