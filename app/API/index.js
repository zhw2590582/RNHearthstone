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
  name: [
    'cards', //第三参数可为空
    'cardbacks', //第三参数可为空
    'info', //第三参数可为空
    'search', //第三参数可为关键字
    'sets',
    'classes',
    'factions',
    'qualities',
    'races',
    'types'
  ],
  filter: {
    "classes": [
      "Death Knight",
      "Druid",
      "Hunter",
      "Mage",
      "Paladin",
      "Priest",
      "Rogue",
      "Shaman",
      "Warlock",
      "Warrior",
      "Dream",
      "Neutral"
    ],
    "sets": [
      "Basic",
      "Classic",
      "Promo",
      "Reward",
      "Naxxramas",
      "Goblins vs Gnomes",
      "Blackrock Mountain",
      "The Grand Tournament",
      "The League of Explorers",
      "Whispers of the Old Gods",
      "Karazhan",
      "Mean Streets of Gadgetzan",
      "Tavern Brawl",
      "Hero Skins",
      "Missions",
      "Credits",
      "System",
      "Debug"
    ],
    "standard": [
      "Basic",
      "Classic",
      "Blackrock Mountain",
      "The Grand Tournament",
      "The League of Explorers",
      "Whispers of the Old Gods",
      "Karazhan",
      "Mean Streets of Gadgetzan"
    ],
    "wild": [
      "Basic",
      "Classic",
      "Promo",
      "Reward",
      "Naxxramas",
      "Goblins vs Gnomes",
      "Blackrock Mountain",
      "The Grand Tournament",
      "The League of Explorers",
      "Whispers of the Old Gods",
      "Karazhan",
      "Mean Streets of Gadgetzan"
    ],
    "types": [
      "Hero",
      "Minion",
      "Spell",
      "Enchantment",
      "Weapon",
      "Hero Power"
    ],
    "factions": [
      "Horde",
      "Alliance",
      "Neutral"
    ],
    "qualities": [
      "Free",
      "Common",
      "Rare",
      "Epic",
      "Legendary"
    ],
    "races": [
      "Demon",
      "Dragon",
      "Mech",
      "Murloc",
      "Beast",
      "Pirate",
      "Totem"
    ]
  },
  link: {
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
}

export default AV;
