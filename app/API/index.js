import AV from 'leancloud-storage'

//连接 Leancloud
const appId = 'lEyVIWgja9WiJ9k1wvgM0fnl-gzGzoHsz';
const appKey = 'VUzyc2pRRbYanMpIbLRDsoqr';
AV.init({ appId, appKey });

//连接 Hearthstoneapi
const HSUrl = 'https://omgvamp-hearthstone-v1.p.mashape.com/'
export const HSObj = {
  fetchInfo: {
    method: 'GET',
    headers: {
      'X-Mashape-Key': '29VjaiWZXomsh3NJoCaJYdcPaOfKp1OM0MsjsnuLtpREnGdK0N',
      "Accept": "application/json"
    }
  },
  cards: `${HSUrl}cards`,
  backs: `${HSUrl}cardbacks`,
  search: `${HSUrl}cards/search`,
  sets: `${HSUrl}cards/sets`,
  classes: `${HSUrl}cards/classes`,
  factions: `${HSUrl}cards/factions`,
  qualities: `${HSUrl}cards/qualities`,
  races: `${HSUrl}cards/races`,
  types: `${HSUrl}cards/types`,
  info: `${HSUrl}info`
}

export default AV;
