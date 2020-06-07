export default class மொழியாக்கம் {
  constructor(மொழிபெயர்ப்புகள், இயல்புநிலை) {
    this.மொழிபெயர்ப்புகள் = மொழிபெயர்ப்புகள்
    this.இயல்புநிலை = இயல்புநிலை
    this.மொழிகள் = Object.keys(மொழிபெயர்ப்புகள்)

    if (!this.மொழிகள்.includes(this.இயல்புநிலை)) {
      throw new Error(`${this.இயல்புநிலை} என்று இயல்புநிலை மொழி மொழிபெயர்ப்புகளில் கிடையாது.`)
    }

    var அள்ளவு = this._மேம்பாடு(this.இயல்புநிலை)

    this.மேம்பாடு = Object.fromEntries(
       this.மொழிகள்.map( இ => [இ, this._மேம்பாடு(இ) / அள்ளவு])
     )
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

  சாபிகள்() {
    return Array.from(
      Object.keys(this.மொழிபெயர்ப்புகள்[this.இயல்புநில]),
       இ => இ
     )
  }
}
