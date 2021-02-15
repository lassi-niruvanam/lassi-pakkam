import { EventEmitter } from 'events'
import OrbitDB from 'orbit-db'
import AccessControllers from './அணுகள்_கட்டுப்படுத்தி'
const சகோயமை = import('./சகோயமை')

export default async function தரவுத்தளத்தை_உருவாக்கு(
  கையெழுத்துசரிபார்ப்பு, தத_முகவரி
) {
  const தத = new தரவுத்தளங்கள்(கையெழுத்துசரிபார்ப்பு)
  await தத.ஆரம்பம்()
  return தத
}

class தரவுத்தளங்கள் extends EventEmitter {
  constructor(பயனாளர்_அடையாளம், கையெழுத்துசரிபார்ப்பு) {
    super()
    this.பயனாளர்_அடையாளம் = பயனாளர்_அடையாளம்
    this.கையெழுத்துசரிபார்ப்பு = கையெழுத்துசரிபார்ப்பு
    this.கூடபனியாளர்கள்_தத = {}
  }

  async ஆரம்பம்(தத_முகவரி) {
    if (this._கணு) return this._கணு
    this.கணு = await சகோயமை()
    this.சகோயமை_அடையாளம் = await this.கணு.id()
    this.கோள்பாதை = await OrbitDB.createInstance(this.கணு, {
      AccessControllers
    })

    this.தனிப்பட்டவமைப்புகள் = {
      accessController: {type: அணுகல்_கட்டுப்படுத்தி, write: [this.கோள்பாதை.identity.id]}
    }

    this.தத = await தத_மரம்.உருவாக்கு(தத_முகவரி, this.கோள்பாதை, this.தனிப்பட்டவமைப்புகள்)

    this.தத.on('மாற்றம்', (தகவல்கள்) => {
      switch (தகவல்கள்.பெயர்) {
        case 'கூடபணியாளர்கள்':
          this.கூடபணியாளர்களை_தத_சரிபாரு()
          break;
        default:
          break;
      }
    })

    setInterval(this.கூடபணியாளர்களுடன்_இணையு.bind(this), 10000)
    this.கூடபணியாளர்களுடன்_இணையு()
  }

  async கூடபணியாளர்களுடன்_இணையு() {
    const கூடபணியாளர்_தத = await this.தத.தத_பெறு('கூடபணியாளர்கள்')
    const கூடபணியாளர்_அடையாளங்கள் = Object.values(கூடபணியாளர்_தத.all).map(கூடபணியாளர் => கூடபணியாளர்.contents.சகோயமை_அடையாளம்)

    const இணைக்கப்பட்ட_அடையாளங்கள் = await this.சகோயமை_கூடபணியாளர்களை_பெறு()
    await Promise.all(கூடபணியாளர்_அடையாளங்கள்.map(async (அடையாளம்) => {
      if (இணைக்கப்பட்ட_அடையாளங்கள்.indexOf(அடையாளம்) !== -1) return
      try {
        await this.கூடபணியாளருடன்_இணையு(அடையாளம்)
      } catch (பிழை) {
        console.warn(பிழை)
      }
    }))
  }

  async கூடபணியாளருடன்_இணையு(முகவரி, சட்டகம் = '/p2p-circuit/ipfs/') {
    try {
      await this.கணு.swarm.connect(சட்டகம் + முகவரி)
    } catch(பிழை) {
      console.error('இணையம் பிழை', பிழை)
    }
  }

  async சகோயமை_கூடபணியாளர்களை_பெறு() {
    const கூடபணியாளர்கள் = await this.கணு.swarm.peers()
    return கூடபணியாளர்கள்
  }

  async கூடபணியாளர்களை_தத_சரிபாரு() {
    const கூடபணியாளர்_தத = await this.தத.தத_பெறு('கூடபணியாளர்கள்')
    await Promise.all(
      Object.values(கூடபணியாளர்_தத.all).forEach(async (செய்தி) => {
        const அனுமதி = this.கையெழுத்துசரிபார்ப்பு(செய்தி)
        const { சாதனம்_அடையாளம், மூல்தத_முகவரி } = செய்தி.contents
        const பயனாளர்_அடையாளம் = செய்தி.author.name
        const தத = this.கூடபனியாளர்கள்_தத[பயனாளர்_அடையாளம்]

        if (அனுமதி) {
          if (!தத && பயனாளர்_அடையாளம் !== this.பயனாளர்_அடையாளம்) {
            var தத = await தத_மரம்.உருவாக்கு(மூல்தத_முகவரி, this.கோள்பாதை)
            this.கூடபனியாளர்கள்_தத[பயனாளர்_அடையாளம்] = தத
          }
        } else {
          delete this.கூடபனியாளர்கள்_தத[பயனாளர்_அடையாளம்]
          await தத.நீக்கு()
          await கூடபணியாளர்_தத.del(சாதனம்_அடையாளம்)
        }
      })
    )
  }

  async கூடபணியாளரை_சேரு(செய்தி) {
    if (!this.கையெழுத்துசரிபார்ப்பு(செய்தி)) return

    const { சாதனம்_அடையாளம், கோள்பாதை_அடையாளம் } = செய்தி.contents
    const பயனாளர்_அடையாளம் = செய்தி.author.name
    await this.தத.மதிப்பை_வையு(['கூடபணியாளர்கள்'], சாதனம்_அடையாளம், செய்தி)

    if (பயனாளர்_அடையாளம் === this.பயனாளர்_அடையாளம்) await this.தத.அனுமதிக்கு(கோள்பாதை_அடையாளம்)
  }

}

class தத_மரம் extends EventEmitter {
  constructor(தத_முகவரி, கோள்பாதை, தனிப்பட்டவமைப்புகள்) {
    super()
    this.கோள்பாதை = கோள்பாதை
    this.சொந்தது = Boolean(தனிப்பட்டவமைப்புகள்)
    this.தனிப்பட்டவமைப்புகள் = தனிப்பட்டவமைப்புகள்
    this._ததளங்கள் = {}
  }

  static async உருவாக்கு(தத_முகவரி, கோள்பாதை) {
    const தத = new தத_மரம்(கோள்பாதை)
    await தத.ஆரம்பம்(தத_முகவரி)
    return தத
  }

  async ஆரம்பம்(தத_முகவரி) {
    if (தத_முகவரி) {
      this.மூல்தத = await this.கோள்பாதை.kvstore(தத_முகவரி)
    } else {
      this.மூல்தத = await this.கோள்பாதை.kvstore('மூலம்', this.தனிப்பட்டவமைப்புகள்)
    }

    for (let இ of ['write', 'replicated', 'ready']) {
      தத.events.on(இ, ()=>this.emit('மாற்றம்', {பாதை: 'மூலம்'}))
    }
    await this.மூல்தத.load()
  }

  async தத_பெறு(பெயர்) {

    async function _தத_பெறு(பாதை, மூல்தத, மூல்தத_பாதை = []) {

      const சாபி = பாதை.join('-')
      if (this._ததளங்கள்[சாபி]) return this._ததளங்கள்[சாபி]

      const முகவரி = await மூல்தத.get(பாதை[0])
      const பாதை_இப்பொவரை = மூல்தத_பாதை.concat(பெயர்[0])
      let தத

      if (முகவரி) {
        தத = await this.கோள்பாதை.open(முகவரி)
      } else if (this.சொந்தது) {
        const தத_பெயர் = பாதை_இப்பொவரை.join('-')
        தத = await this.கோள்பாதை.kvstore(தத_பெயர், this.தனிப்பட்டவமைப்புகள்)
        await மூல்தத.set(பாதை[0], தத.id)
      } else {
        return
      }
      for (let இ of ['write', 'replicated', 'ready']) {
        தத.events.on(இ, ()=>this.emit('மாற்றம்', {பாதை}))
      }

      await தத.load()

      if (பாதை.length === 1) {
        return தத
      } else {
        const _தத = await _தத_பெறு(பாதை.slice(1,), தத, பாதை_இப்பொவரை)
        return _தத
      }
    }
    const பாதை = typeof பெயர் === 'string' ? [பெயர்] : பெயர்
    பாதை.forEach((இ) => {
      if (இ.index('-') !== -1) throw 'தரவுத்தளத்துடைய பெயரில் `-` இருக்க கூடாது.'
    })

    if (பாதை[0] === 'மூலம்') பாதை = பாதை.slice(1,)
    if (!பாதை.length) return this.மூல்தத

    const தத = await _தத_பெறு(பாதை, this.மூல்தத)
    return தத
  }

  async மதிப்பை_வையு(பெயர், சாபி, மதிப்பு) {
    const தத = await this.தத_பெறு(பெயர்)
    await தத.set(சாபி, மதிப்பு)
  }

  async மதிப்பை_பெறு(பெயர், சாபி) {
    const தத = await this.தத_பெறு(பெயர்)
    const மதிப்பு = await தத.get(சாபி)
    return மதிப்பு
  }

  async எல்லாம்_தத() {
    async function _எல்லாம்_தத(மூல்தத) {
      await மூல்தத.load()
      const மதிப்புகள் = Object.values(மூல்தத.all)

      var ததளங்கள் = await Promise.all(
        மதிப்புகள்.map(async (மதிப்பு)=>{
          if (this.கோள்பாதை.isValidAddress(மதிப்பு)) {
            let தத = await this.கோள்பாதை.open(மதிப்பு)
            let _தத_பட்டியல் = [தத]
            if (தத.type === 'keyvalue') {
              const உள்_ததங்கள் = await _எல்லாம்_தத(தத)
              _தத_பட்டியல் = _தத_பட்டியல்.concat(உள்_ததங்கள்)
            }
            return _தத_பட்டியல்
          }
        })
      )
      ததளங்கள் = [].concat(...ததளங்கள்).filter(இ=>இ)
      return new Set([மூல்தத, ...ததளங்கள்])
    }

    const தத_பட்டியல் = _எல்லாம்_தத(this.மூல்தத)
    return தத_பட்டியல்
  }

  async அனுமதிக்கு(கோள்பாதை_அடையாளம்) {
    const எல்லாம் = await this.எல்லாம்_தத()
    await Promise.all(எல்லாம்.forEach(இ=>இ.acccess.grant('write', கோள்பாதை_அடையாளம்))
  }

  async நீக்கு() {
    const எல்லாம் = await this.எல்லாம்_தத()
    await Promise.all(எல்லாம்.forEach(இ=>இ.drop())
  }

}
