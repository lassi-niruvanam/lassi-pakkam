import { EventEmitter } from 'events'
import { createUser, createTeam, loadTeam, Connection, create as createDevice } from '@localfirst/auth'
import { ஞாபகமாறிகள் } from './தகவல்கள்'

const குழுபெயர் = 'லஸ்ஸி-மொழியாக்கங்கள்'
const வாடிக்கையாளர் = {
  name: 'லஸ்ஸி வலைப்பக்கம்', version: '0.1.0'
}
const குழு_வேர் = process.env.VUE_APP_KUZHU_VER


export default class அங்கீகாரம் extends EventEmitter {
  constructor(இணையம், வணக்கம்_செய்தி) {
    super()
    this._இணையம் = இணையம்
    this.வணக்கம்_செய்தி = வணக்கம்_செய்தி
    this.திரள்_இணைப்புகள் = {}

    this.சூழல் = this.சூழல்_எற்று()
    if (this.இணையம்) this.திரளை_ஆரம்பு()
  }

  கையெழுத்துசரிபார்ப்பு(செய்தி){
    return this.குழு.has(செய்தி.author.name) && this.குழு.verify(செய்தி)
  }

  சூழல்_சேமி(){
    const சூழல் = Object.assign({}, this.சூழல்)
    if (சூழல்.team) {
      const சங்கிலி = சூழல்.team.save()
      சூழல்.team = சங்கிலி
      // குழுக்கு சேர்ந்து முடிந்துவிட்டால், அழைப்பு இனிமேல் தேவையானதில்லை
      delete சூழல்.invitee
      delete சூழல்.invitationSeed
    }
    localStorage.setItem(ஞாபகமாறிகள்.சூழல், JSON.stringify(சூழல்))
  }

  சூழல்_எற்று() {
    const தகவல்கள் = localStorage.getItem(ஞாபகமாறிகள்.சூழல்)
    const சூழல் = தகவல்கள் ? JSON.parse(தகவல்கள்) : {}

    if (சூழல்.team) {
      // சேமிக்கப்பட்ட குழு இருந்தால், அதை உபயோகிக்க பார்ப்போம்
      const குழு_சூழல் = {
        device: சூழல்.device,
        user: சூழல்.user,
        client: வாடிக்கையாளர்
      }
      சூழல்.team = loadTeam(சூழல்.team, குழு_சூழல்)

      if (குழு_வேர்) {
        if (சூழல்.team.chain.root !== குழு_வேர்) {
          delete சூழல்.team
          this.சூழல்_சேமி()
        }
      } else {
        this.புழு_குழு = சூழல்.team.chain.root
      }
    }

    return சூழல்
  }

  அழைப்பால்_சாதனம்_உள்ளிடு(அழைப்பு, பயனாளர்பெயர், சாதனம்பெயர்) {
    if (!குழு_வேர்) throw 'குழு வேர் கிடைக்கவில்லை'
    Object.assign(this.சூழல், {
      device: createDevice(பயனாளர்பெயர், சாதனம்பெயர்),
      invitee: {type: 'DEVICE', name: சாதனம்பெயர்},
      invitationSeed: அழைப்பு
    })
    this.சூழல்_சேமி()
  }

  அழைப்பால்_பயனாளர்_உள்ளிடு(அழைப்பு) {
    const பயனாளர்பெயர் = this.சூழல்.user.userName
    Object.assign(this.சூழல், {
      invitee: {type: 'MEMBER', name: பயனாளர்பெயர்},
      invitationSeed: அழைப்பு
    })

    this.சூழல்_சேமி()
  }

  உள்ளிடுக்கப்பட்டுள்ளது() {
    const தேவையானசாபிகள் = ['team', 'device', 'user']
    if (!தேவையானசாபிகள்.every(இ=>this.சூழல்[இ])) return false
    return this.சூழல்.team.has(this.சூழல்.user.userName) && this.சூழல்.team.verify(this.சூழல்.team.sign('வணக்கம்'))
  }

  பயனாளர்_உருவாக்கு(பயனாளர்பெயர், சாதனம்பெயர) {
    const சாதனம் = createDevice(பயனாளர்பெயர், சாதனம்பெயர)
    const பயனாளர் = createUser(பயனாளர்பெயர்)
    this.சூழல்.device = சாதனம்
    this.சூழல்.user = பயனாளர்

    // குழு வேர் இல்லை என்றால், அதை உருவாக்கவும்
    if (!குழு_வேர்) {
      const குழு_சூழல் = {
        device: சாதனம், user: பயனாளர், client: வாடிக்கையாளர்
      }
      const குழு = createTeam(குழுபெயர், குழு_சூழல்)
      this.சூழல்.team = குழு
      this.புது_குழு = குழு.chain.root
    }
    this.சூழல்_சேமி()
  }

  async திரளை_ஆரம்பு () {
    const hyperswarm = require('hyperswarm-web')
    const crypto = require('crypto')
    this.திரள்_விஷயம் = crypto.createHash('sha256')
      .update('லஸ்ஸி-பக்கம்-மொழியாக்கம்')
      .digest()

    this.திரள் = hyperswarm()

    this.திரள்.join(this.திரள்_விஷயம், {lookup: true, announce: true})

    this.திரள்.on('disconnection', (வாய்) => {
      console.log('இணைப்பு முடி', வாய்._id)
      this.emit('திரளிணைப்பு மாற்றம்')
      delete this.திரள்_இணைப்புகள்[வாய்._id]
    })

    this.திரள்.on('connection', (வாய்) => {
      console.log('இணைப்பு', வாய்._id)
      const _இணைப்பு = new இணைப்பு(வாய், this.சூழல்)
      _இணைப்பு.on('joined', ()=>this.சூழல்_சேமி())
      _இணைப்பு.on('change', ()=>this.சூழல்_சேமி())

      this.திரள்_இணைப்புகள்[வாய்._id] = _இணைப்பு
      வாய்.on('data', (தகவல்கள்)=>this.திரள்செய்தி_கிடைத்தது(தகவல்கள், வாய்))

      const வணக்கம்_செய்தி = this.வணக்கம்_செய்தி()
      if (வணக்கம்_செய்தி) வாய்.write(JSON.stringify(வணக்கம்_செய்தி))

      this.emit('திரளிணைப்பு மாற்றம்')
    })
  }

  திரளை_முடி() {
    this.திரள்.leave(this.திரள்_விஷயம்)
    Object.values(this.திரள்_இணைப்புகள்).map(இ=>இ.நீக்கு())
    this.திரள்.destroy()
  }

  திரள்செய்தி_கிடைத்தது(தகவல்கள், வாய்) {
    const செய்தி = JSON.parse(new TextDecoder("utf-8").decode(தகவல்கள்))

    console.log('செய்தி கிடைத்தது', செய்தி, வாய்._id)

    switch (செய்தி.வகை) {
      case 'நெறிமுறை':
        this.திரள்_இணைப்புகள்[வாய்._id].செய்தியை_வழங்கு(செய்தி)
        break;
      case 'வணக்கம்':
        this.emit('வணக்கம்', செய்தி)
        break;
      default:
        throw 'தெரியாத செய்தி வகை ' + செய்தி.வகை
    }
  }

  நீக்கு() {
    this.திரளை_முடி()
    localStorage.clear(ஞாபகமாறிகள்.சூழல்)
  }

  set புது_குழு(மதி) {
    this._புது_குழு = மதி
    this.emit("புது குழு", this.புது_குழு)
  }
  get புது_குழு() {
    return this._புது_குழு
  }

  get இணையம்() {
    return this._இணையம்
  }

  set இணையம்(மதிப்பு) {
    if (this._இணையம் === மதிப்பு) return
    this._இணையம் = மதிப்பு
    if (மதிப்பு) {
      this.திரளை_ஆரம்பு()
    } else {
      this.திரளை_முடி()
    }
  }

}

class இணைப்பு extends EventEmitter {
  constructor(வாய், சூழல்) {
    super()

    this.வாய் = வாய்
    this.சூழல் = சூழல்
    this.செய்தி_எண் = 0

    const செய்தியனுப்பு = (செய்தி) => {
      console.log('அனுப்புகிறேன்', செய்தி)
      const குறியாக்கம்செய்தி = JSON.stringify(செய்தி)
      வாய்.write(குறியாக்கம்செய்தி)
    }

    this.அங்கீகாரம்_இணைப்பு = new Connection(
      { sendMessage: செய்தியனுப்பு, context: this.சூழல் }
    ).start()

    நிகழ்வுகளையிணையு(this.அங்கீகாரம்_இணைப்பு, this, ['connected', 'joined', 'disconnected', 'change'])
  }

  async செய்தியை_வழங்கு(செய்தி){
    await this.அங்கீகாரம்_இணைப்பு.deliver({...செய்தி, index: this.செய்தி_எண்++})
  }

  நீக்கு() {
    this.அங்கீகாரம்_இணைப்பு.stop()
  }
}

const நிகழ்வுகளையிணையு = (மூலம், இலக்கு, நிகழ்வுகள்) =>
  நிகழ்வுகள்.forEach(நிகழ்வு => மூலம்.on(நிகழ்வு, தகவல்கள் => இலக்கு.emit(நிகழ்வு, தகவல்கள்)))
