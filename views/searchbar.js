// Imports
import { getFullDb } from './query.js';


// Stores all markers and associates them with their latitude and longitude
export const markersAndLatLng = [];

// Checks if a marker's location is the same as the user's (match found)
export function isSameMarkerFromCoordinates(userLocation, markerLocation) {
    return userLocation.latitude == markerLocation.lat && userLocation.longitude == markerLocation.lng;
}

// Return a highlighted pin color
function highlighedPinElement() { 
    return new google.maps.marker.PinElement({
        background: '#FBBC04'
    }).element;
}

// Return a normal pin color
export function defaultPinElement() {
   return new google.maps.marker.PinElement().element;
}

// Invokes when a letter is typed in the search box
function typeEvent(text, db) {

    if (db.users.length == 0) {
        return;
    }

    // If the text in the search bar matches text in the user's database entry, highlight the marker
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

