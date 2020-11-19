import { TrendingUp } from '@material-ui/icons';
import * as L from 'leaflet'
import { func } from 'prop-types';



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

/**
 * Agrega una regla, y si las columnas de esa regla existen agrega los matchets
 * @param {*} rule 
 * @param {*} jsonRules 
 */
export function addRule(rule, jsonRules){
  let m = rule['match']
  let valA = m[0]
  let valB = m[1]
  let mRule = {'col_a': rule['col_a'], 'col_b': rule['col_b'], match:{a:valA, b:valB}}
  for (let i = 0; i < jsonRules.length; i++){
    let r = jsonRules[i]
    if (r['col_a'] == mRule['col_a'] && r['col_b'] == mRule['col_b']){
      let matches = r['matches']
      matches.push(mRule['match'])
      let newRule = {'col_a': r['col_a'], 'col_b': r['col_b'], 'matches':matches}
      jsonRules[i] = newRule
      return jsonRules
    }
  }
  //si no sale en el for/if es que no estaba, la agrego.
  let newRule = {'col_a': rule['col_a'], 'col_b': rule['col_b'], 'matches':[{a:valA, b:valB}]}
  jsonRules.push(newRule)
  return jsonRules
}

export function ruleExists(rule, rules){
  for (let i = 0; i < rules.length; i++){
    if (rules[i] == rule){
      return true
    }
  }
  return false
}
