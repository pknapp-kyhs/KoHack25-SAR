import { getFullDb } from './query.js';

let map;

async function initMap() {

    const defualtPosition = { lng: 0, lat: 20 };

    //@ts-ignore
    const { Map } = await google.maps.importLibrary("maps");

    map = new Map(document.getElementById("map"), {
    zoom: 3,
    center: defualtPosition,
    mapId: "DEMO_MAP_ID",
    });

    getFullDb(populateMarkers)
}

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

function extractMarkerInfo(db, id) {

    const markerInfoBox = document.getElementById('markerInfo');
    markerInfoBox.style.visibility = 'visible';

    for (const user of db.users) {
        if (user.id == id) {
            console.log(user);

            markerInfoBox.innerHTML = `
            <img src="x_button.png" alt="Close" style="width: 50px; height: 50px; margin-left:96%; margin-top:1%;" onclick="document.getElementById('markerInfo').style.visibility='hidden';">
            <h1 style="text-align: center; font-size: 3em">${user.name}</h1>
            <div style="display: flex; justify-content: space-around; margin-top: 20px;">
                <div onclick="document.getElementById('markerInfoSubsection').innerHTML='${user.location.story}'" style="background-color: grey; padding: 10px; flex: 1; height: 20%; text-align: center; border-radius: 10px; margin: 0 10px;">story</div>
                <div onclick="document.getElementById('markerInfoSubsection').innerHTML='${user.location.recipe}'" style="background-color: grey; padding: 10px; flex: 1; height: 20%; text-align: center; border-radius: 10px; margin: 0 10px;">recipes</div>
                <div onclick="document.getElementById('markerInfoSubsection').innerHTML='${user.email}'" style="background-color: grey; padding: 10px; flex: 1; height: 20%; text-align: center; border-radius: 10px; margin: 0 10px;">contact</div>                    
            </div>
            <div id="markerInfoSubsection"></div>
            `;
        }
    }
}



async function populateMarkers(db) {
    for (const user of db.users) {
        let position = {
          lat: user.location.latitude,
          lng: user.location.longitude
        };
        createMarker(position, user.id);
    }
}

initMap();

