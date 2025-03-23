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
        console.log('click', domEvent, latLng);
        
    });
}

function extractMarkerInfo(db, id) {
    for (let info in db.users) {
        if (user.id = id) {
            return user
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

