

export default class மொழியாக்கம் {
  constructor(மொழிபெயர்ப்புகள், இயல்புநிலை) {
    this.மொழிபெயர்ப்புகள் = மொழிபெயர்ப்புகள்
    this.இயல்புநிலை = இயல்புநிலை
    this.மொழிகள் = Object.keys(மொழிபெயர்ப்புகள்)
    this.சாபிகள் = this._சாபிகள்()

    if (!this.மொழிகள்.includes(this.இயல்புநிலை)) {
      throw new Error(`${this.இயல்புநிலை} என்று இயல்புநிலை மொழி மொழிபெயர்ப்புகளில் கிடையாது.`)
    }

    var அள்ளவு = this._மேம்பாடு(this.இயல்புநிலை)

    this.மேம்பாடு = Object.fromEntries(
       this.மொழிகள்.map( இ => [இ, this._மேம்பாடு(இ) / அள்ளவு])
     )
    this.மொழிகள் = this.மொழிகள்.sort().sort((இ, ஈ) => this.மேம்பாடு[இ] > this.மேம்பாடு[ஈ] ? -1: 1)
  }

  _மேம்பாடு(இ) {
    if (typeof இ === 'string') {
      இ = this.மொழிபெயர்ப்புகள்[இ]
    }
    return Object.values(இ).reduce(
      (ங, ஞ) => {
        return ங + (typeof ஞ === 'string' ? ஞ.length > 0 : this._மேம்பாடு(ஞ))
      }, 0
    )
  }

  _சாபிகள்() {
    const applatir = (obj, context = '') =>
      Object.keys(obj).reduce((acc, k) => {
        const pre = context.length ? context + '.' : '';
        if (typeof obj[k] === 'object') {
          acc.push(...applatir(obj[k], pre + k))
        } else {
          acc.push(pre + k)
        }
        return acc;
      },
    [])
    return applatir(this.மொழிபெயர்ப்புகள்[this.இயல்புநிலை])
  }

  உரை(சாபி, மொழி) {
    const சாபிகள் = சாபி.split(".")
    let மொழிபெயர்ப்புகள் = this.மொழிபெயர்ப்புகள்[மொழி]
    if (!மொழிபெயர்ப்புகள்) return சாபி
    for (let சா = 0; சா < சாபிகள்.length; சா++) {
      மொழிபெயர்ப்புகள் = மொழிபெயர்ப்புகள்[சாபிகள்[சா]]
      if (!மொழிபெயர்ப்புகள்) {
        return
      }
    }
    return மொழிபெயர்ப்புகள்
  }
}
