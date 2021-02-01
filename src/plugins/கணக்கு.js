import { createUser, createTeam, loadUser, loadTeam, generateProof } from '@localfirst/auth'
const hyperswarm = require('hyperswarm-web')
const crypto = require('crypto')

import MD5 from 'crypto-js/md5'
import சகோயமை from 'ipfs'
import OrbitDB from 'orbit-db'
import { EventEmitter } from 'events'
const குழுபெயர் = 'லஸ்ஸி-மொழியாக்கங்கள்'
const toBuffer = require('it-to-buffer')
import { v4 as uuidv4 } from 'uuid'


const getDeviceType = () => {
  // https://abdessalam.dev/blog/detect-device-type-javascript/
  const ua = navigator.userAgent;
  if (/(tablet|ipad|playbook|silk)|(android(?!.*mobi))/i.test(ua)) {
    return "tablet"
  }
  if (
    /Mobile|iP(hone|od)|Android|BlackBerry|IEMobile|Kindle|Silk-Accelerated|(hpw|web)OS|Opera M(obi|ini)/.test(
      ua
    )
  ) {
    return "mobile"
  }
  return "desktop"
}

const வெளி = 'வெளியேறிக்கப்பட்டுள்ளது'
const துவக்க = 'துவக்கப்பட்டுள்ளது'
const உள் = 'உள்நுழைக்கப்பட்டுள்ளது'

class கணக்கு extends EventEmitter{
  constructor () {
    super()

    this.பயனாளர் = loadUser()
    window.பயனாளர் = this.பயனாளர்

    this.தத = this.குழு = undefined

    this.திரள்_விஷயம் = crypto.createHash('sha256')
      .update('லஸ்ஸி-பக்கம்-மொழியாக்கம்')
      .digest()
    this.திரள் = undefined
    this.திரள்_இணைப்புகள் = {}

    if (this.பயனாளர்) {
      const தத_முகவரி = localStorage.getItem('மூல்_தத_முகவரி')
      this.சகோயமை_ஆரம்பம்().then(
        () => {
          this.குழு_பெறு()
          தரவுத்தளங்களை_உருவாக்கு(this, தத_முகவரி)
          this.திரள்_ஆரம்பம்()
        }
      )
    }

    this.on('பயனாளர் மாற்றம்', ()=>{
      this.பயனாளர் ? this.திரள்_ஆரம்பம்() : this.திரள்_மூடி()
    })
    window.கணக்கு = this
  }

  பயனாளர்_உருவாக்கி (பயனாளர்பெயர், சாதனம்பெயர்) {
    const சாதனம்வகை = getDeviceType()
    this.பயனாளர் = createUser({
      userName: பயனாளர்பெயர், deviceName: சாதனம்பெயர், deviceType: சாதனம்வகை
    })
    this.emit('பயனாளர் மாற்றம்')

    window.பயனாளர் = this.பயனாளர்
    this.குழு_பெறு()
    this.தத = undefined
  }

  async சகோயமை_ஆரம்பம்() {
    if (this.கணு) return
    this.கணு = await சகோயமை.create({
      relay: { enabled: true, hop: { enabled: true, active: true } },
      EXPERIMENTAL: { pubsub: true },
      repo: './ipfs'
    })
    this.சகோயமை_அடையாளம் = await this.கணு.id()
  }

  குழு_பெறு () {
    const குழு_துவக்கம் = process.env.VUE_APP_KUZHU_SAGOYAMAI
    const சேமிக்கப்பட்ட_குழு = localStorage.getItem('லஸ்ஸி-குழு')

    const வாடிகையாளர் = {
      name: 'லஸ்ஸி',
      version: '0.1.0'
    }
    const சூழல் = { user: this.பயனாளர், client: வாடிகையாளர் }

    Promise.resolve(this.சகோயமை_ஆரம்பம்)
    // சகோயமை குழு இல்லை என்றால், அதை உருவாக்கவும்
    if (!குழு_துவக்கம்) {
      this.குழு = createTeam(குழுபெயர், சூழல்)
      this.கணு.add(this.குழு.save()).then((முடிவு) => {this.புது_குழு = முடிவு.path})
      this.குழு_சேமி()
    } else {
      // சேமிக்கப்பட்ட குழு இருந்தால், அதை உபயோகிக்க பார்ப்போம்
      if (சேமிக்கப்பட்ட_குழு) {
        this.குழு = loadTeam(சேமிக்கப்பட்ட_குழு, சூழல்)
      }
      // சகோயமை குழுவும் உபியோகிக்க பார்ப்போம்
      toBuffer(
        this.கணு.cat(குழு_துவக்கம்)
      ).then(
        (இ)=>{
          const குழு_உரை = இ.toString()
          const குழு = loadTeam(குழு_உரை, சூழல்)
          if (this.குழு) {
            try {
              this.குழு.merge(குழு.chain)
            } catch (பிழை) {
              this.குழு = குழு
            }
          } else {
            this.குழு = குழு
          }
          this.குழு_சேமி()
        }
      )
    }
    this.குழு.on('updated', (தகவல்கள்)=>{
      this.குழு_சேமி()
      this.emit('குழு மாற்றம்', {தலை: தகவல்கள்.head})
      for (var s of Object.values(this.திரள்_இணைப்புகள்)) {
        this.குழு_தலை_அனுப்பு(s, தகவல்கள்.head)
      }
    })
    this.emit('குழு மாற்றம்')
  }

  திரள்_ஆரம்பம் () {
    this.திரள் = hyperswarm()

    this.திரள்.join(this.திரள்_விஷயம், {lookup: true, announce: true})

    this.திரள்.on('disconnection', (socket) => {
      this.emit('திரளிணைப்பு மாற்றம்')
      this.திரள்_இணைப்புகள்[socket._id] = null
    })

    this.திரள்.on('connection', (socket) => {
      console.log('புது இணைப்பு!')

      this.திரள்_இணைப்புகள்[socket._id] = socket
      this.emit('திரளிணைப்பு மாற்றம்')
      socket.on('data', (தகவல்கள்)=>this.திரள்செய்தி_கிடைத்தது(தகவல்கள், socket))

      this.குழு_தலை_அனுப்பு(socket, this.குழு.chain.head)
      if (this.நிலை === உள் && this.தத) {
        this.அனுப்பு(socket, {
          கோரிக்கை: 'வணக்கம்',
          உள்ளடக்கம்: this.குழு.sign({
            பயனாளர்_தரவுத்தளம்: this.தத.பயனாளர்_தரவுத்தளம்.id,
            சகோயமை_கணு: this.தத.கணு
          })
        })
      }
    })
  }

  திரள்_மூடி () {
    this.திரள்.leave(this.திரள்_விஷயம்)
    this.திரள்.destroy()
    this.திரள் = undefined
    this.திரள்_இணைப்புகள் = {}
  }

  குழு_சேரு (அழைப்பு) {
    this.ஆதாரம் = generateProof(அழைப்பு, this.பயனாளர்_அடையாளம்)
    for (var s of Object.values(this.திரள்_இணைப்புகள்)) {
      this.அனுப்பு(s, { கோரிக்கை: 'அழைப்பு ஆதாரம்', ஆதாரம்: this.ஆதாரம் })
    }
  }

  அனுப்பு (socket, செய்தி) {
    console.log('அனுப்புகிறேன்', செய்தி)
    socket.write(JSON.stringify(செய்தி))
  }

  குழு_தலை_அனுப்பு(socket, தலை) {
    const செய்தி = { கோரிக்கை: 'குழு தலை', தலை }
    this.அனுப்பு(socket, செய்தி)
  }

  திரள்செய்தி_கிடைத்தது (தகவல்கள், socket) {
    const செய்தி = JSON.parse(new TextDecoder("utf-8").decode(தகவல்கள்))
    const கோரிக்கை = செய்தி.கோரிக்கை
    console.log('கிடைத்தது', செய்தி)

    switch (கோரிக்கை) {
      case 'அழைப்பு ஆதாரம்':
        if (!this.நிலை === உள்) return
        try {
          this.குழு.admit(செய்தி.ஆதாரம்)
        } catch (பிழை) {console.warn(பிழை)}
        break;
      case 'குழு தலை':
        if (this.நிலை === வெளி) return
        if (செய்தி.தலை !== this.குழு.chain.head) {
          this.அனுப்பு(socket, {கோரிக்கை: 'குழு சங்கிலி வேண்டும்'})
        }
        break;
      case 'குழு சங்கிலி வேண்டும்':
        if (this.நிலை === வெளி) return
        this.அனுப்பு(socket, {கோரிக்கை: 'சங்கிலி', சங்கிலி: this.குழு.chain})
        break;
      case 'சங்கிலி':
        if (this.நிலை === வெளி) return
        try {
          this.குழு.merge(செய்தி.சங்கிலி)
          if (this.ஆதாரம்) {
            try {
              this.குழு.join(this.ஆதாரம்)
              this.ஆதாரம் = undefined
            } catch {
              console.warning('உள்ளிட முடியவில்லை')
            }
          }
        } catch (பிழை) {
          console.warning(பிழை)
        }
        break;
      case 'வணக்கம்':
        if (this.நிலை === வெளி || !this.தத) return
        this.தத.கூடபயனாளர்_சேரு(செய்தி.உள்ளடக்கம்)
        break;
      default:
        break
    }
  }

  async அழைப்பால்_உள்ளிடு (அழைப்பு, பயனாளர்பெயர், சாதனம்பெயர்) {
    const பயனாளர் = this.பயனாளர்_உருவாக்கி(பயனாளர்பெயர், சாதனம்பெயர்)
    this.துவக்கம்(பயனாளர்)
    await this.அடையாளம்.உள்ளிடு_அழைப்பு(அழைப்பு)
  }

  get உரிமைக்கப்பட்ட_மொழிகள் () {
    if (!this.குழு || !this.குழு.has(this.பயனாளர்_அடையாளம்)) return []
    return this.குழு.roles().filter((மொழி)=>{this.குழு.memberHasRole(this.பயனாளர்_அடையாளம், மொழி)})
  }

  set புது_குழு(மதி) {
    this._புது_குழு = மதி
    this.emit("புது குழு", this.புது_குழு)
  }
  get புது_குழு() {
    return this._புது_குழு
  }

  குழு_சேமி () {
    const chain = this.குழு.save()
    localStorage.setItem('லஸ்ஸி-குழு', chain)
  }

  get பயனாளர்_அடையாளம்() {
    return this.பயனாளர்.userName
  }

  get மேலாளர்_உரிமை() {
    return this.குழு && this.குழு.has(this.பயனாளர்_அடையாளம்) && this.குழு.memberIsAdmin(this.பயனாளர்_அடையாளம்)
  }

  get சாதனங்கள்() {
    if (!this.குழு || !this.குழு.has(this.பயனாளர்_அடையாளம்)) return []
    return this.குழு.members(this.பயனாளர்_அடையாளம்).devices
  }

  அழைக்க (பெயர், மொழிகள்) {
    if (மொழிகள்) {
      this._பங்கு_உறுதிசெய்ய(மொழிகள்)
      return this.குழு.invite(பெயர், { roles: மொழிகள் })
    }
    const அழைப்பு = this.குழு.invite(பெயர்)
    this.குழு_சேமி()
    return அழைப்பு
  }

  மொழிக்கு_அனுமதிக்க (பெயர், மொழிகள்) {
    this._பங்கு_உறுதிசெய்ய(மொழிகள்)
    for (let மொழி of மொழிகள்) {
      this.குழு.addMemberRole(பெயர், மொழி)
    }
  }

  get அழைப்புகள் () {
    if (!this.குழு) return []
    return this.குழு.state.invitations
  }

  get நிலை () {
    /* இணையம் நிலை */
    if (this.பயனாளர்) {
      return this.குழு && this.குழு.has(this.பயனாளர்_அடையாளம்) ? உள் : துவக்க
    }
    return வெளி
  }

  _பங்கு_உறுதிசெய்ய (மொழிகள்) {
    for (let மொழி of மொழிகள்) {
      if (!this.குழு.hasRole(மொழி)) {
        this.குழு.addRole(மொழி)
      }
    }
  }

}

async function தரவுத்தளங்களை_உருவாக்கு (கணக்கு, தத_முகவர) {
  const தத = new தரவுத்தளங்கள்(கணக்கு)
  கணக்கு.தத = தத
  await தத.ஆரம்பம்(தத_முகவர)
}

class தரவுத்தளங்கள் {
  constructor(கணக்கு) {
    this.கணக்கு = கணக்கு
    this.தயார் = false
  }

  async ஆரம்பம் (தத_முகவரி) {

    this.கோள்பாதை = await OrbitDB.createInstance(this.கணக்கு.கணு)
    this.தனிப்பட்டவமைப்புகள் = { accessController: { write: [this.கோள்பாதை.identity.id] }}

    // மூல் தரவுத்தளம்
    this.பயனாளர்_தரவுத்தளம் = await this._தத_உருவாக்கி('பயனாளர்', 'kvstore', தத_முகவரி)
    await this.பயனாளர்_தரவுத்தளம்.load()

    // மொழியாக்கத்திட்டங்கள்
    this.திட்ட_தத = await this._தத_உருவாக்கி('திட்டங்கள்', 'kvstore', this.பயனாளர்_தரவுத்தளம்)
    await this.திட்ட_தத.load()

    // இந்த பயனாளர் (நீங்கள்)
    this.பெயர்_தரவுத்தளம் = await this._தத_உருவாக்கி('பயனாளர்பெயர்கள்', 'kvstore', this.பயனாளர்_தரவுத்தளம்)
    await this.பெயர்_தரவுத்தளம்.load()

    // கூடபணியாளர்கள்
    this.கூடபணியாளர்கள்_தரவுத்தளம் = await this._தத_உருவாக்கி('கூடபணியாளர்கள்', 'kvstore', this.பயனாளர்_தரவுத்தளம்)
    await this.கூடபணியாளர்கள்_தரவுத்தளம்.load()

    this.கணக்கு.on('குழு மாற்றம்', this.கூடபணியாளர்களை_உறுதிசெய்யு.bind(this))
    await this.கூடபணியாளர்களை_உறுதிசெய்யு()

    this.கூடபணியாளரகளுடன்_இணைய_இடைவெளி = setInterval(this.கூடபணியாளரகளுடன்_இணையு.bind(this), 10000)
    await this.கூடபணியாளரகளுடன்_இணையு()

    this.தயார் = true
    this.அறிக்கை('தத தயார்')
  }

  async _தத_உருவாக்கி (பெயர், வகை, மூல்_தத) {
    var முகவரி, தத
    if (மூல்_தத) {
      முகவரி = typeof மூல்_தத === 'string' ? மூல்_தத : await மூல்_தத.get(பெயர்)
    }
    if (முகவரி) {
      தத = await this.கோள்பாதை[வகை](முகவரி)
    } else {
      தத = await this.கோள்பாதை[வகை](பெயர், this.தனிப்பட்டவமைப்புகள்)
      if (மூல்_தத) await மூல்_தத.set(பெயர், தத.id)
    }
    for (let இ of ['ready', 'write', 'replicated']) {
      தத.events.on(இ, ()=>this.அறிக்கை('தரவுத்தளம் மாற்றம்', {'தரவுத்தளம்': பெயர்}))
    }
    return தத
  }

  async பயனாளர்_பெயர்_சேரு (மொழி, பெயர்) {
    if (!this.பெயர்_தரவுத்தளம்) return
    await this.பெயர்_தரவுத்தளம்.set(மொழி, பெயர்)
  }

  async பயனாளர்_பெயர்_நீக்கு (மொழி) {
    await this.பெயர்_தரவுத்தளம்.del(மொழி)
    console.log(this.பெயர்_தரவுத்தளம்.all)
  }

  கூடபயனாளர்_சேரு(உள்ளடக்கம்) {
    if (!this.கணக்கு.குழு.verify(உள்ளடக்கம்)) return

    const மூல்_தத = உள்ளடக்கம்.contents
    this.கூடபணியாளர்கள்_தரவுத்தளம்.set(மூல்_தத, உள்ளடக்கம்)
    this.கூடபணியாளருடன்_இணையு()
  }

  async கூடபணியாளருடன்_இணையு (முகவரி, சட்டகம் = '/p2p-circuit/ipfs/') {
    try {
      await this.கணு.swarm.connect(சட்டகம் + முகவரி)
    } catch(பிழை) {
      console.error('இணையப் பிழை', பிழை)
    }
  }

  async கூடபணியாளர்களை_உறுதிசெய்யு() {
    return
    // const இணைக்கப்பட்ட_அடையாளங்கள் = await this.சகோயமை_கூடபணியாளர்கள்()
    // for (var [கணுயடையாளம், உள்ளடக்கம்] of this.கூடபணியாளர்கள்_தரவுத்தளம்.all) {
    //   if (!this.கணக்கு.குழு.verify(உள்ளடக்கம்)) {
    //     await this.கூடபணியாளர்கள்_தரவுத்தளம்.del(கணுயடையாளம்)
    //   }
    // }
  }

  async கூடபணியாளரகளுடன்_இணையு () {
    return
    /*
    const அடையாளங்கள் = Object.values(this.கூடபணியாளர்கள்_தரவுத்தளம்.all).map(
      கூடபணியாளர் => கூடபணியாளர்.கணுயடையாளம்
    ).filter()
    const இணைக்கப்பட்ட_அடையாளங்கள் = await this.சகோயமை_கூடபணியாளர்கள்()
    await Promise.all(அடையாளங்கள்.map(async (அடையாளம்) => {
      if (இணைக்கப்பட்ட_அடையாளங்கள்.indexOf(அடையாளம்) !== -1) return
      try {
        await this.கூடபணியாளருடன்_இணையு(அடையாளம்)
      } catch (பிழை) {
        console.log(பிழை)
      }
    }))
    */
  }

  async சகோயமை_கூடபணியாளர்கள்() {
    const கூடபணியாளர்கள் = await this.கணு.swarm.peers()
    return கூடபணியாளர்கள்
  }

  async _திட்டம்_தத_ஏற்று(திட்டம்) {
    const முகவரி = await this.திட்ட_தத.get(திட்டம்)
    var தத

    if (முகவரி) {
      தத = await this.கோள்பாதை.kvstore(முகவரி)
    } else {
      தத = await this.கோள்பாதை.kvstore(திட்டம், this.தனிப்பட்டவமைப்புகள)
      await this.திட்ட_தத.set(திட்டம், தத.id)
    }
    await தத.load()
    return தத
  }

  async _மொழி_தத_ஏற்று(திட்டம், வேண்டியமொழி) {

    const திட்டம்_தத = await this._திட்டம்_தத_ஏற்று(திட்டம்)
    var முகவரி = await திட்டம்_தத.get(வேண்டியமொழி)
    if (முகவரி) {
      தத = await திட்டம்_தத.del(முகவரி)
      முகவரி=undefined
    }
    var தத

    if (முகவரி) {
      தத = await this.கோள்பாதை.kvstore(முகவரி)
    } else {
      தத = await this.கோள்பாதை.kvstore(`${திட்டம்}-${வேண்டியமொழி}`, this.தனிப்பட்டவமைப்புகள)
      await திட்டம்_தத.set(வேண்டியமொழி, தத.id)
    }
    for (let இ of ['ready', 'write', 'replicated']) {
      தத.events.on(இ, ()=>this.அறிக்கை('தரவுத்தளம் மாற்றம்', {
        'தரவுத்தளம்': 'பரிந்துரை',
        திட்டம்,
        'மொழி': வேண்டியமொழி
      }))
    }
    await தத.load()
    return தத
  }

  async _பரிந்துரை_தத_ஏற்று(திட்டம், வேண்டியமொழி) {
    console.log(திட்டம், வேண்டியமொழி)
    const மொழி_தத = await this._மொழி_தத_ஏற்று(திட்டம், வேண்டியமொழி)
    const முகவரி = await மொழி_தத.get('பரிந்துரைகள்')
    var தத

    if (முகவரி) {
      தத = await this.கோள்பாதை.kvstore(முகவரி)
    } else {
      தத = await this.கோள்பாதை.kvstore(`${திட்டம்}-${வேண்டியமொழி}-பரிந்துரைகள்`, this.தனிப்பட்டவமைப்புகள)
      await மொழி_தத.set('பரிந்துரைகள்', தத.id)
    }
    await தத.load()
    return தத
  }

  async பரிந்துரையு(சாபி, உரை, மூலுரை, மூல்மொழி, வேண்டியமொழி, திட்டம்) {
    const பரிந்ருரை = {
      குறி: uuidv4(), சாபி, உரை, மூலுரை, மூல்மொழி
    }
    console.log(பரிந்ருரை)
    const தத = await this._பரிந்துரை_தத_ஏற்று(திட்டம், வேண்டியமொழி)
    console.log(தத)
    await தத.set(பரிந்ருரை.குறி, பரிந்ருரை)
    console.log(தத.all)
  }

  async பரிந்துரையைநீக்கு(குறி, வேண்டியமொழி, திட்டம்) {
    const தத = await this._பரிந்துரை_தத_ஏற்று(திட்டம், வேண்டியமொழி)
    console.log(குறி)
    await தத.del(குறி)
    console.log(தத.all)
  }

  async பரிந்துரைகள்_பெறு (திட்டம், சாபி, வேண்டியமொழி) {
    const தத = await this._பரிந்துரை_தத_ஏற்று(திட்டம், வேண்டியமொழி)
    const பரிந்துரைகள் = Object.values(தத.all).map(
      (ப)=>{return {...ப, பங்களிப்பாளர்: this.கணக்கு.பயனாளர்_அடையாளம்}}
    ).filter(இ => இ.சாபி===சாபி)
    console.log(திட்டம், சாபி, வேண்டியமொழி, பரிந்துரைகள்)
    return பரிந்துரைகள்
  }

  get பயனாளர்_பெயர்கள்() {
    if (!this.பெயர்_தரவுத்தளம்) return {}
    return Object.fromEntries(Object.keys(this.பெயர்_தரவுத்தளம்.all).map((x)=>{return [x, this.பெயர்_தரவுத்தளம்.get(x)]}))
  }

  get பயனாளர்_படம்() {
    const மின்னஞ்சல் = this.பயனாளர்_மின்னஞ்சல்
    if (மின்னஞ்சல்) return 'https://www.gravatar.com/avatar/' + MD5(மின்னஞ்சல்.trim().toLowerCase()) + '?s=200'
    return ''
  }

  get பயனாளர்_மின்னஞ்சல்() {
    return this.பயனாளர்_தரவுத்தளம்.get('மின்னஞ்சல்')
  }

  set பயனாளர்_மின்னஞ்சல் (மின்னஞ்சல்) {
   this.பயனாளர்_தரவுத்தளம்.set('மின்னஞ்சல்', மின்னஞ்சல்)
  }

  அறிக்கை(event, ...args) {
    console.log('அறிக்கை', event, args)
    return this.கணக்கு.emit(event, ...args)
  }

}


export default {
  install (Vue) {
    Vue.prototype.$கணக்கு = new கணக்கு()
  }
}
