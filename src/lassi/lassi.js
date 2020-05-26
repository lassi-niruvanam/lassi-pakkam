import தகவல்கள் from '../trads.json'

export default class Lassi {
  constructor() {
    this.infos = தகவல்கள்
  }
  nom(langage, langue) {
    info_langue = this.infos[langage]
    if (info_langue) {
      return info_langue["nom"] || langage
    }
    return langage
  }
}
