import { v4 as uuidv4 } from 'uuid'
const AccessController = require('orbit-db-access-controllers/src/access-controller-interface')

export class மொழியாக்கத்_தரவுத்தளம் {
  constructor ( சகோயமை, OrbitDB, பயனாளர்பெயர் ) {
    this.பயனாளர்பெயர் = பயனாளர்பெயர்
    this.OrbitDB = OrbitDB
    this.சகோயமை = சகோயமை  // சர்வகோள் கோப்பு அமைப்பு

    சகோயமை.create({
      relay: { enabled: true, hop: { enabled: true, active: true } },
      EXPERIMENTAL: { pubsub: true },
      repo: './ipfs'
    }).then((கணு)=>{
      // this.கணு.on('error', (பிழை) => { throw (பிழை) })
      // this.கணு.on('ready', this._ஆரம்பம்.bind(this))
      this._ஆரம்பம்(கணு)
    })

  }

  async _ஆரம்பம் (கணு) {
    this.கணு = கணு
    const peerInfo = await this.கணு.id()
    this.peerInfo = peerInfo
    this.orbitdb = await this.OrbitDB.createInstance(this.கணு)
    this.தனிப்பட்டவமைப்புகள் = { accessController: { write: [this.orbitdb.identity.id] }}

    // மொழியாக்கத்திட்டங்கள்
    this.திட்டங்கள் = await this.orbitdb.kvstore('திட்டங்கள்', this.தனிப்பட்டவமைப்புகள்)
    await this.திட்டங்கள்.load()

    // இந்த பயனாளர் (நீர்கள்)
    this.பயனாளர் = await this.orbitdb.kvstore('பயனாளர்', this.தனிப்பட்டவமைப்புகள்)
    await this.பயனாளர்.load()
    window.பயனாளர் = this.பயனாளர்

    console.log(this.திட்டங்கள்.id)
    await this.தனிப்பட்ட_தகவல்கள்_எற்று({
      'பயனாளர்': this.பயனாளர்பெயர்,
      'திட்டங்கள்': this.திட்டங்கள்.id,
      'கணுயடையாளம்': peerInfo.id
    })
    this.docStoreOptions = {
      ...this.தனிப்பட்டவமைப்புகள்,
      indexBy: 'குறி',
    }
    // this.pieces = await this.orbitdb.docstore('pieces', this.docStoreOptions)
    // await this.pieces.load()

    // this.companions = await this.orbitdb.keyvalue('companions', this.தனிப்பட்டவமைப்புகள்)
    // await this.companions.load()

    this.கணு.libp2p.on('peer:connect', this.handlePeerConnected.bind(this))
    await this.கணு.pubsub.subscribe('லஸ்ஸி', this.handleலஸ்ஸிReceived.bind(this))
    await this.கணு.pubsub.subscribe(peerInfo.id, this.handleMessageReceived.bind(this))

    setInterval(this.லஸ்ஸிப்பயனாளர்களை_தேடு.bind(this), 10000)
    this.லஸ்ஸிப்பயனாளர்களை_தேடு()

  }

  async தனிப்பட்ட_தகவல்கள்_எற்று (தனிப்பட்டது) {
    const தனிப்பட்டசாபிகள் = Object.keys(தனிப்பட்டது)
    for (let இ in தனிப்பட்டசாபிகள்) {
      let சாபி = தனிப்பட்டசாபிகள்[இ]
      if(!this.பயனாளர்.get(சாபி)){
         await this.பயனாளர்.set(சாபி, தனிப்பட்டது[சாபி])
       }
    }
  }

  async பரிந்துரையு (திட்டம், மொழி, சாபி, பரிந்துரை) {
    const மொழிதரவுத்தளம் = await this.மொழியை_பெறு(திட்டம், மொழி)
    const அடையாளம் = மொழிதரவுத்தளம்.put({
      குறி: uuidv4(), மொழி, சாபி, பரிந்துரை
    })
    return அடையாளம்
  }

  async பரிந்துரையை_நீக்கு (திட்டம், மொழி, குறி) {
    const மொழிதரவுத்தளம் = await this.மொழியை_பெறு(திட்டம், மொழி)
    const அடையாளம் = await மொழிதரவுத்தளம்.del(குறி)
    return அடையாளம்
  }

  async பரிந்துரையை_திருத்து () {

  }

  async பரிந்துரைகள்_பெறு (திட்டம், உரை_சாபி, மொழி) {
    console.log('பரிந்துரைகள்_பெறு', திட்டம், உரை_சாபி, மொழி)
  }

  async திட்டத்தை_பெறு (திட்டம்) {
    const அடையாளம் = this.திட்டங்கள்.get(திட்டம்)
    if (அடையாளம்) {
      const தரவுத்தளம் = await this.orbitdb.keyvalue(அடையாளம்)
      await தரவுத்தளம்.load()
      return தரவுத்தளம்
    } else {
      const தரவுத்தளம் = await this.orbitdb.keyvalue(திட்டம், this.தனிப்பட்டவமைப்புகள்)
      await this.திட்டங்கள்.set(திட்டம், தரவுத்தளம்.id)
      await தரவுத்தளம்.load()
      return தரவுத்தளம்
    }
  }

  async மொழியை_பெறு( திட்டம், மொழி ) {
    const திட்டத்தரவுத்தளம் = await this.திட்டத்தை_பெறு(திட்டம்)
    const இருக்கும்_அடையாளம் = திட்டத்தரவுத்தளம்.get(மொழி)
    if (இருக்கும்_அடையாளம்) {
      const தரவுத்தளம் = await this.orbitdb.docstore(இருக்கும்_அடையாளம்)
      await தரவுத்தளம்.load()
      return தரவுத்தளம்
    } else {
      const தரவுத்தளப்_பெயர் = திட்டம் + '.' + மொழி
      const தரவுத்தளம் = await this.orbitdb.docstore(தரவுத்தளப்_பெயர், this.docStoreOptions)
      await தரவுத்தளம்.load()
      return தரவுத்தளம்
    }
  }

  async மொழிகளை_பெறு ( திட்டம் ) {
    const திட்டத்தரவுத்தளம் = await this.திட்டத்தை_பெறு(திட்டம்)
    return திட்டத்தரவுத்தளம்.all
  }

  async addNewPiece(hash, instrument = 'Piano') {
    const existingPiece = this.getPieceByHash(hash)
    if (existingPiece) {
      await this.updatePieceByHash(hash, instrument)
      return
    }
    const dbName = 'counter.' + hash.substr(20,20)
    const customAccessOptions = {
      ...this.தனிப்பட்டவமைப்புகள்,
      accessController: NPPAccessController
    }
    const counter = await this.orbitdb.counter(dbName, customAccessOptions)

    const cid = await this.pieces.put({ hash, instrument,
      counter: counter.id
    })
    return cid
  }
  getAllPieces() {
    const pieces = this.pieces.get('')
    return pieces
  }

  getPieceByHash(hash) {
    const singlePiece = this.pieces.get(hash)[0]
    return singlePiece
  }

  getPieceByInstrument(instrument) {
    return this.pieces.query((piece) => piece.instrument === instrument)
  }
  async updatePieceByHash (hash, instrument = 'Piano') {
    const piece = await this.getPieceByHash(hash)
    piece.instrument = instrument
    const cid = await this.pieces.put(piece)
    return cid
  }

  async deletePieceByHash (hash) {
    const cid = await this.pieces.del(hash)
    return cid
  }

  async getPracticeCount (piece) {
    const counter = await this.orbitdb.counter(piece.counter)
    await counter.load()
    return counter.value
  }

  async incrementPracticeCounter (piece) {
    const counter = await this.orbitdb.counter(piece.counter)
    const cid = await counter.inc()
    return cid
  }

  handlePeerConnected (ipfsPeer) {
    console.log('handlePeerConnected', ipfsPeer)
    const ipfsId = ipfsPeer.id.toB58String()
    console.log('Peer', ipfsId)
    setTimeout(async () => {
      await this.sendMessage(ipfsId, { userDb: this.user.id })
    }, 2000)
    if (this.onpeerconnect) this.onpeerconnect(ipfsId)
  }

  async sendMessage(விஷயம், செய்தி) {
    try {
      const செய்தி_உரை = JSON.stringify(செய்தி)
      await this.கணு.pubsub.publish(விஷயம், செய்தி_உரை)
    } catch (பிழை) {
      console.error(பிழை)
    }
  }

  async handleMessageReceived (msg) {
    const parsedMsg = JSON.parse(msg.data.toString())
    const msgKeys = Object.keys(parsedMsg)

    switch (msgKeys[0]) {
      case 'userDb':
        var peerDb = await this.orbitdb.open(parsedMsg.userDb)
        peerDb.events.on('replicated', async () => {
          if (peerDb.get('pieces')) {
            await this.companions.set(peerDb.id, peerDb.all)
          }
        })
        break
      default:
        break
    }

    if(this.onmessage) this.onmessage(msg)
  }

  async handleலஸ்ஸிReceived (msg) {
    console.log('handleலஸ்ஸிReceived')
    if (msg.from === this.peerInfo.id) return
    console.log(msg)
    const parsedMsg = JSON.parse(new TextDecoder("utf-8").decode(msg.data))
    const msgKeys = Object.keys(parsedMsg)
    console.log('லஸ்ஸி', parsedMsg, msgKeys)
  }

  getCompanions () {
    return this.companions.all
  }



  async லஸ்ஸிப்பயனாளர்களை_தேடு () {
    await this.sendMessage('லஸ்ஸி', { userDb: this.பயனாளர்.id })
  }

  async queryCatalog (queryFn) {
    const dbAddrs = Object.values(this.companions.all).map(peer => peer.pieces)

    const allPieces = await Promise.all(dbAddrs.map(async (addr) => {
      const db = await this.orbitdb.open(addr)
      await db.load()

      return db.query(queryFn)
    }))

    return allPieces.reduce((flatPieces, pieces) => flatPieces.concat(pieces), this.pieces.query(queryFn))
  }

  authenticated() { return true }
}

export class NPPAccessController extends AccessController {
  async canAppend (entry, identityProvider) {  // eslint: ignore
    const authenticated = மொழியாக்கத்_தரவுத்தளம்.authenticated()
    return Promise.resolve(authenticated && identityProvider.verifyIdentity(entry.identity))
  }

  async grant () { }
}
