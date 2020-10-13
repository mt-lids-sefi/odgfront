import * as L from 'leaflet'



/**
 * 
 * @param {string} color  it has to be a 'common' colour (TODO enum)
 */
export function getIcon(number){
    const icon = new L.Icon({
        //iconUrl: './icons/'+number+'.png',
        iconUrl: require('./icons/'+number+'.png'),
        //iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-'+colour+'.png',
        shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
        popupAnchor: [1, -34],
        shadowSize: [41, 41]
        });
    return icon
}

export function createClusterCustomIcon (cluster, number) {
    return L.divIcon({
      html: `<span>${cluster.getChildCount()}</span>`,
      className: 'marker-cluster-custom-'+number,
      iconSize: L.point(40, 40, true),
    });
  };

export function getColumnContent(data,column){
  let values = []
  for (let i = 0; i < Object.keys(data).length; i++){
    let val = data[i][column]
    if(values.indexOf(val) == -1){
      values.push(val)
    }
  }
  return values
}