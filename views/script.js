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
        
    });
}

async function populateMarkers(db) {
    console.log(db);
    //{ lng: marker.longitude, lat: marker.latitude }
    // TODO:
    // foreach marker in db {
    //     createMarker(marker.position, marker.id);
    // }
}

initMap();

