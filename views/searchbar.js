import { getFullDb } from './query.js';

export const markersAndLatLng = [];

export function isSameMarkerFromCoordinates(userLocation, markerLocation) {
    return userLocation.latitude == markerLocation.lat && userLocation.longitude == markerLocation.lng;
}

function highlighedPinElement() { 
    return new google.maps.marker.PinElement({
        background: '#FBBC04'
    }).element;
}

export function defaultPinElement() {
   return new google.maps.marker.PinElement().element;
}

function typeEvent(text, db) {

    if (db.users.length == 0) {
        return;
    }

    for (const user of db.users) {
        if (text != '' && JSON.stringify(user).toLowerCase().includes(text.toLowerCase())) {
            
            markersAndLatLng
                .filter(markerAndLatLng => isSameMarkerFromCoordinates(user.location, markerAndLatLng.latLng))
                .forEach(markerAndLatLng => {
                    markerAndLatLng.marker.content = highlighedPinElement();
            });
        }
        else {
            markersAndLatLng
                .filter(markerAndLatLng => isSameMarkerFromCoordinates(user.location, markerAndLatLng.latLng))
                .forEach(markerAndLatLng => {
                    markerAndLatLng.marker.content = defaultPinElement();
            });
        
        }
    }
}

document.getElementById('searchInput').addEventListener('input', function(event) {
    getFullDb((db) => typeEvent(event.target.value, db));
});

