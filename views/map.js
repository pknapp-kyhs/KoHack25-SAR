
/**
 * @license
 * Copyright 2019 Google LLC. All Rights Reserved.
 * SPDX-License-Identifier: Apache-2.0
 */
// Initialize and add the map
let map;

async function initMap() {
  // The location of Uluru
  const position = { lng: -73.973 , lat: 40.893 };
  // Request needed libraries.
  //@ts-ignore
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  // The map, centered at Uluru
  map = new Map(document.getElementById("map"), {
    zoom: 4,
    center: position,
    mapId: "DEMO_MAP_ID",
  });

  // The marker, positioned at Uluru
  const marker = new AdvancedMarkerElement({
    map: map,
    position: position,
    title: "Testing123",
  });

  marker.addListener('click', ({ domEvent, latLng }) => {
    // const { target } = domEvent;
    // infoWindow.close();
    // infoWindow.setContent(marker.title);
    // infoWindow.open(marker.map, marker);
  });
}

initMap();