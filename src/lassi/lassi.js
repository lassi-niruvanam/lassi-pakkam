import தகவல்கள் from './takavalkal.json'

class Lassi {
  constructor() {
    this.infos = தகவல்கள்
  }
  nom(langage, langue) {
    var info_langue = this.infos[langage]
    if (info_langue) {
      return info_langue["trads"][langue]["nom"] || langage
    }
    return langage
  }
}
const lassi = new Lassi()
console.log(lassi)
export default lassi
