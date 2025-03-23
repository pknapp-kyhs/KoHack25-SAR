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

    getFullDb(populateMarkers())
}

async function createMarker(position, id) {
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

    const marker = new AdvancedMarkerElement({
        map: map,
        position: position,
        title: id,
    });

    marker.addListener('click', ({ domEvent, latLng }) => {
        console.log('click', domEvent, latLng);
        // TODO: open info
    });
}

async function populateMarkers(db) {
    console.log(db);
    for (user of db.users) {
        position = {
          lat: user.location.latitude,
          lng: user.location.longitude
        };
        createMarker(position, user.id);
      }
    }
}

initMap();

