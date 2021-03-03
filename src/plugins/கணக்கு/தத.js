import { EventEmitter } from 'events'
import MD5 from 'crypto-js/md5'

class தரவுத்தளங்கள் extends EventEmitter {
  constructor(பயனாளர்_அடையாளம், கையெழுத்துசரிபார்ப்பு) {
    super()
    this.பயனாளர்_அடையாளம் = பயனாளர்_அடையாளம்
    this.கையெழுத்துசரிபார்ப்பு = கையெழுத்துசரிபார்ப்பு
    this.கூடபனியாளர்கள்_தத = {}
  }

  async ஆரம்பம்(தத_முகவரி) {
    if (this.கணு) return this.கணு

    const சகோயமை = require('ipfs')
    this.கணு = await சகோயமை.create({
      relay: { enabled: true, hop: { enabled: true, active: true } },
      EXPERIMENTAL: { pubsub: true },
      repo: './ipfs'
    })
    this.OrbitDB = require('orbit-db')
    const AccessControllers = require('./அணுகல்_கட்டுப்படுத்தி').default

    this.சகோயமை_அடையாளம் = await this.கணு.id()
    this.கோள்பாதை = await this.OrbitDB.createInstance(this.கணு, {
      AccessControllers
    })

    this.தனிப்பட்டவமைப்புகள் = {
      accessController: {type: "kolpadai-tata-madippittalar", முதல்மதிப்பீட்டாளர்: [this.கோள்பாதை.identity.id]}
    }

    this.தத = await தத_மரம்.உருவாக்கு(தத_முகவரி, this.கோள்பாதை, this.தனிப்பட்டவமைப்புகள்)
    this.மூல்முகவரி = this.தத.மூல்தத.id

    this.தத.on('மாற்றம்', (தகவல்கள்) => {
      this.emit('தத மாற்றம்',  {பெயர்: தகவல்கள்.பாதை[0]})
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

  static async உருவாக்கு (பயனாளர்_அடையாளம், கையெழுத்துசரிபார்ப்பு, தத_முகவரி) {
    const தத = new தரவுத்தளங்கள்(பயனாளர்_அடையாளம், கையெழுத்துசரிபார்ப்பு)
    await தத.ஆரம்பம்(தத_முகவரி)
    return தத
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
        var தத = this.கூடபனியாளர்கள்_தத[பயனாளர்_அடையாளம்]

        if (அனுமதி) {
          if (!தத && பயனாளர்_அடையாளம் !== this.பயனாளர்_அடையாளம்) {
            தத = await தத_மரம்.உருவாக்கு(மூல்தத_முகவரி, this.கோள்பாதை)
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

export default class லஸ்ஸிபக்கம்_தரவுத்தளங்கள் extends தரவுத்தளங்கள் {

  static async உருவாக்கு (பயனாளர்_அடையாளம், கையெழுத்துசரிபார்ப்பு, தத_முகவரி) {
    const தத = new லஸ்ஸிபக்கம்_தரவுத்தளங்கள்(பயனாளர்_அடையாளம், கையெழுத்துசரிபார்ப்பு)
    await தத.ஆரம்பம்(தத_முகவரி)
    return தத
  }

  async பயனாளர்_பெயர்_சேரு(மொழி, பெயர்) {
    const பெயர்_தரவுத்தளம் = await this.தத.தத_பெறு('பயனாளர்பெயர்கள்')
    await பெயர்_தரவுத்தளம்.set(மொழி, பெயர்)
  }

  async பயனாளர்_பெயர்_நீக்கு (மொழி) {
    const பெயர்_தரவுத்தளம் = await this.தத.தத_பெறு('பயனாளர்பெயர்கள்')
    await பெயர்_தரவுத்தளம்.del(மொழி)
  }

  async பயனாளர்_பெயர்களை_பெறு() {
    const பெயர்_தரவுத்தளம் = await this.தத.தத_பெறு('பயனாளர்பெயர்கள்')
    return Object.fromEntries(Object.keys(பெயர்_தரவுத்தளம்.all).map((x)=>{return [x, பெயர்_தரவுத்தளம்.get(x)]}))
  }

  async பயனாளர்_மின்னஞ்சலை_பெறு() {
    const தகவல்_தரவுத்தளம் = await this.தத.தத_பெறு('பயனாளர்தகவல்கள்')
    return await தகவல்_தரவுத்தளம்.get('மின்னஞ்சல்')
  }

  async பயனாளர்_மின்னஞ்சலை_சேமி(மின்னஞ்சல்) {
    const தகவல்_தரவுத்தளம் = await this.தத.தத_பெறு('பயனாளர்தகவல்கள்')
    return await தகவல்_தரவுத்தளம்.set('மின்னஞ்சல்', மின்னஞ்சல்)
  }

  async பயனாளர்_படத்தை_பெறு() {
    const மின்னஞ்சல் = await this.பயனாளர்_மின்னஞ்சலை_பெறு()
    if (மின்னஞ்சல்) return 'https://www.gravatar.com/avatar/' + MD5(மின்னஞ்சல்.trim().toLowerCase()) + '?s=200'
  }

}

class தத_மரம் extends EventEmitter {
  constructor(கோள்பாதை, தனிப்பட்டவமைப்புகள்) {
    super()
    console.log('தத_மரம்')
    this.கோள்பாதை = கோள்பாதை
    this.சொந்தது = Boolean(தனிப்பட்டவமைப்புகள்)
    this.தனிப்பட்டவமைப்புகள் = தனிப்பட்டவமைப்புகள்
    this._ததளங்கள் = {}
  }

  static async உருவாக்கு(தத_முகவரி, கோள்பாதை, தனிப்பட்டவமைப்புகள்) {
    const தத = new தத_மரம்(கோள்பாதை, தனிப்பட்டவமைப்புகள்)
    await தத.ஆரம்பம்(தத_முகவரி)
    return தத
  }

  async ஆரம்பம்(தத_முகவரி) {
    console.log('ஆரம்பம்')
    if (தத_முகவரி) {
      this.மூல்தத = await this.கோள்பாதை.kvstore(தத_முகவரி)
    } else {
      this.மூல்தத = await this.கோள்பாதை.kvstore('மூலம்', this.தனிப்பட்டவமைப்புகள்)
    }
    window.t = this

    for (let இ of ['write', 'replicated', 'ready']) {
      this.மூல்தத.events.on(இ, ()=>this.emit('மாற்றம்', {பாதை: ['மூலம்']}))
    }
    await this.மூல்தத.load()
  }

  async தத_பெறு(பெயர்) {
    console.log('தத_பெறு', பெயர்)
    var தன் = this
    async function _தத_பெறு(பாதை, மூல்தத, மூல்தத_பாதை = []) {
      console.log('_தத_பெறு', {பாதை, மூல்தத, மூல்தத_பாதை})
      const சாபி = பாதை.join('-')
      console.log(தன்._ததளங்கள்)
      if (தன்._ததளங்கள்[சாபி]) return தன்._ததளங்கள்[சாபி]

      const முகவரி = await மூல்தத.get(பாதை[0])
      const பாதை_இப்பொவரை = மூல்தத_பாதை.concat(பாதை[0])
      let தத
      console.log({முகவரி, பாதை_இப்பொவரை})

      if (முகவரி) {
        தத = await தன்.கோள்பாதை.open(முகவரி)
      } else if (தன்.சொந்தது) {
        const தத_பெயர் = பாதை_இப்பொவரை.join('-')
        தத = await தன்.கோள்பாதை.kvstore(தத_பெயர், தன்.தனிப்பட்டவமைப்புகள்)
        await மூல்தத.set(பாதை[0], தத.id)
      } else {
        return
      }
      தன்._ததளங்கள்[சாபி] = தத
      for (let இ of ['write', 'replicated', 'ready']) {
        தத.events.on(இ, ()=>தன்.emit('மாற்றம்', {பாதை}))
      }

      await தத.load()

      if (பாதை.length === 1) {
        return தத
      } else {
        const _தத = await _தத_பெறு(பாதை.slice(1,), தத, பாதை_இப்பொவரை)
        return _தத
      }
    }
    var பாதை = typeof பெயர் === 'string' ? [பெயர்] : பெயர்
    பாதை.forEach((இ) => {
      if (இ.indexOf('-') !== -1) throw 'தரவுத்தளத்துடைய பெயரில் `-` இருக்க கூடாது.'
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
    const தான் = this
    async function _எல்லாம்_தத(மூல்தத) {
      await மூல்தத.load()
      const மதிப்புகள் = Object.values(மூல்தத.all)

      var ததளங்கள் = await Promise.all(
        மதிப்புகள்.map(async (மதிப்பு)=>{
          if (this.OrbitDB.isValidAddress(மதிப்பு)) {
            let தத = await தான்.கோள்பாதை.open(மதிப்பு)
            let உள்_ததங்கள்
            if (தத.type === 'keyvalue') {
              உள்_ததங்கள் = await _எல்லாம்_தத(தத)
            }
            return [தத, ...(உள்_ததங்கள் || [])]
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
    await Promise.all(எல்லாம்.map(இ=>இ.acccess.grant('மதிப்பீட்டாளர்', கோள்பாதை_அடையாளம்)))
  }

  async நீக்கு() {
    const எல்லாம் = await this.எல்லாம்_தத()
    await Promise.all([...எல்லாம்].map(இ=>இ.drop()))
  }

}
