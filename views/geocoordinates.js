import { MAPS_API_KEY } from './secrets.js';

export async function getGeocoordinatesFromName(name) {
    try {
        const response =  await fetch(`https://maps.googleapis.com/maps/api/geocode/json?address=${name}&key=${MAPS_API_KEY}`);
        if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data;

    } catch (error) {

      console.error(error);
    }
}
