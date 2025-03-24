// Imports
import { getFullDb } from './query.js';


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
async function createMarker(position, id) {
    
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    console.log(map, position, id);

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: id.toString(),
    });

    marker.addListener('click', ({ domEvent, latLng }) => {

        let id = domEvent['srcElement']['Bo']['ariaLabel'];

        getFullDb((db) => extractMarkerInfo(db, id));
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
        createMarker(position, user.id);
    }
}

// Extract information from the database and display it in the marker info box
function extractMarkerInfo(db, id) {

    const markerInfoBox = document.getElementById('markerInfo');
    markerInfoBox.style.visibility = 'visible';

    for (const user of db.users) {
        if (user.id == id) {
            console.log(user);

            let userStory = `Heritage: ${user.heritage_name}<br><br>Story: ${user.story}`;
            let userContact = `Email Address: ${user.email}<br><br>Phone Number: ${user.phone}<br><br>Address: ${user.location.location_name}`;

            // Set the innterHTML of the markerInfoBox to the user's information
            markerInfoBox.innerHTML = `
            <img src="x_button.png" alt="Close" style="width: 50px; height: 50px; margin-left:96%; margin-top:1%;" onclick="document.getElementById('markerInfo').style.visibility='hidden';">
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

