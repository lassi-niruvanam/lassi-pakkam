import { EventEmitter } from 'events'
// const crypto = () => import('crypto')
const அங்கீகாரம் = () => import('./அங்கீகாரம்')
import { ஞாபகமாறிகள் } from './தகவல்கள்'

const நிலைகள் = {
  வெளி: 'வெளியேறிக்கப்பட்டுள்ளது',
  துவக்க: 'துவக்கப்பட்டுள்ளது',
  உள்: 'உள்நுழைக்கப்பட்டுள்ளது'
}


class கணக்கு extends EventEmitter{
  constructor () {
    super()
    if (localStorage.getItem(ஞாபகமாறிகள்.சூழல்)) this.அங்கீகாரம்_ஆரம்பு()
  }

  async அங்கீகாரம்_ஆரம்பு() {
    const அங்கீ = await அங்கீகாரம்()
    this.அங்கீகாரம் = new அங்கீ.default(()=>{return this.வணக்கம்()})
  }

  வணக்கம்() {
    throw 'வேலை செய்யவும்'
    //return {
    //  வகை: 'வணக்கம்',
      // சாதனம்_அடையாளம், கோள்பாதை_அடையாளம், மூல்தத_முகவரி
    //}
  }

  async பயனாளர்_உருவாக்கி(பயனாளர்பெயர், சாதனம்பெயர்) {
    await this.அங்கீகாரம்_ஆரம்பு()
    this.அங்கீகாரம்.பயனாளர்_உருவாக்கி(பயனாளர்பெயர், சாதனம்பெயர்)
  }

  get நிலை() {
    return நிலைகள்.வெளி
  }
}
/*

// import MD5 from 'crypto-js/md5'

//

const toBuffer = require('it-to-buffer')
// import { v4 as uuidv4 } from 'uuid'



const நிகழ்வுகள் = {
  பயனாளர்மாற்றம்: 'பயனாளர் மாற்றம்'
}

class கணக்கு extends EventEmitter{
  constructor () {
    super()


    this.தத = this.குழு = this.திரள் = undefined

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

  வெளியேறி() {
    // பயனாளர் தகஙல்களை நீக்கு
    this.பயனாளர் = undefined
    localStorage.clear('LF_AUTH_STORAGE__USER')

    // குழுவை நீக்கு
    this.குழு = undefined
    localStorage.clear('லஸ்ஸி-குழு')

    // திரளை நிற்கு
    this.திரளை_மூடி()
  }

  திரளை_ஆரம்பு () {
    this.திரள் = new திரள்()
  }

  திரளை_மூடி () {
    if (this.திரள்) {
      this.திரள்.மூடி()
      this.திரள் = undefined
    }
  }

  அழைப்பால்_உள்ளிடு(அழைப்பு) {
    if (!this.அடையாளம்) throw 'பயனாளர் கிடைக்கவில்லை'
    const ஆதாரம் = generateProof(அழைப்பு, this.அடையாளம்)

  }

  async இரண்டாவது_கணக்காக_உள்ளிடு(அழைப்பு) {
    //
    this.திரள்.on(நிகவழ்வு.மூல்முகவரி, (முகவரி) => {
      this.தத = new தத(முகவரி)
    })
    this.திரள.மூல்முகவரி_பெறு()

  }

  set பயனாளர்(பயனாளர்) {
    this._பயனாளர் = பயனாளர்
    this.emit(நிகழ்வுகள்.பயனாளர்மாற்றம்)
  }

  get அடையாளம்() {
    return this.பயனாளர் ? this.பயனாளர்.userName : undefined
  }

  // À vérifier

  குழு_பெறு () {

    this.குழு.on('updated', (தகவல்கள்)=>{
      this.குழு_சேமி()
      this.emit('குழு மாற்றம்', {தலை: தகவல்கள்.head})
      for (var s of Object.values(this.திரள்_இணைப்புகள்)) {
        this.குழு_தலை_அனுப்பு(s, தகவல்கள்.head)
      }
    })
    this.emit('குழு மாற்றம்')
  }

  குழு_சேரு (அழைப்பு) {
    this.ஆதாரம் = generateProof(அழைப்பு, this.பயனாளர்_அடையாளம்)
    console.log('this.ஆதாரம்', this.ஆதாரம்)
    localStorage.setItem('ஆதாரம்', JSON.stringify(this.ஆதாரம்))
    for (var s of Object.values(this.திரள்_இணைப்புகள்)) {
      this.அனுப்பு(s, { கோரிக்கை: 'அழைப்பு ஆதாரம்', ஆதாரம்: this.ஆதாரம் })
      if (this.நிலை === உள்) break
    }
  }
  async அழைப்பால்_உள்ளிடு (அழைப்பு, பயனாளர்பெயர், சாதனம்பெயர்) {
    const பயனாளர் = this.பயனாளர்_உருவாக்கி(பயனாளர்பெயர், சாதனம்பெயர்)
    this.துவக்கம்(பயனாளர்)
    this.குழு_சேரு()
  }

  get உரிமைக்கப்பட்ட_மொழிகள் () {
    if (!this.குழு || !this.குழு.has(this.பயனாளர்_அடையாளம்)) return []
    return this.குழு.roles().filter((மொழி)=>{this.குழு.memberHasRole(this.பயனாளர்_அடையாளம், மொழி)})
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
    // இணையம் நிலை
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

*/
/*
class தரவுத்தளங்கள் {
  async ஆரம்பம் (தத_முகவரி) {

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



  async பயனாளர்_பெயர்_சேரு (மொழி, பெயர்) {
    if (!this.பெயர்_தரவுத்தளம்) return
    await this.பெயர்_தரவுத்தளம்.set(மொழி, பெயர்)
  }

  async பயனாளர்_பெயர்_நீக்கு (மொழி) {
    await this.பெயர்_தரவுத்தளம்.del(மொழி)
    console.log(this.பெயர்_தரவுத்தளம்.all)
  }

  கூடபயனாளர்_சேரு(உள்ளடக்கம்) {
    console.log(உள்ளடக்கம்)
    if (!this.கணக்கு.குழு.verify(உள்ளடக்கம்)) return
    console.log('vérifié')
    const மூல்_தத = உள்ளடக்கம்.contents.பயனாளர்_தரவுத்தளம்
    this.கூடபணியாளர்கள்_தரவுத்தளம்.set(மூல்_தத, உள்ளடக்கம்)
    this.கூடபணியாளருடன்_இணையு()
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
    for (let இ of ['write', 'replicated']) {
      தத.events.on(இ, ()=>this.அறிக்கை('தரவுத்தளம் மாற்றம்', {
        'தரவுத்தளம்': 'பரிந்துரை',
        திட்டம்,
        'மொழி': வேண்டியமொழி
      }))
    }
    await தத.load()
    return தத
  }

  async பரிந்துரையு(சாபி, உரை, மூலுரை, மூல்மொழி, வேண்டியமொழி, திட்டம்) {
    மூலுரை = MD5(மூலுரை).toString()
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



}
*/

export default {
  install (Vue) {
    Vue.prototype.$கணக்கு = new கணக்கு()
  }
}
