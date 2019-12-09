import * as L from 'leaflet'

/**
 * 
 * @param {string} color  it has to be a 'common' colour (TODO enum)
 */
export function getIcon(colour){
    const icon = new L.Icon({
        iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-'+colour+'.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });
    return icon
}

export function getAllIcons(){
    let icons = []
    icons.push(getIcon('green'))
    icons.push(getIcon('violet'))
    icons.push(getIcon('red'))
    icons.push(getIcon('blue'))
    return icons
}

export function getIconByNumber(number){
    const colours = {0: 'yellow', 1: 'red', 2: 'green', 3: 'blue', 4: 'black', 5: 'grey', 6: 'orange', 7: 'violet'}
    return getIcon(colours[number])
}