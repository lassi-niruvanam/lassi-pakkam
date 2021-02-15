
import { OrbitDB, AccessControllers, AccessController, OrbitDBAccessController } from 'orbit-db'


class அணுகல்_கட்டுப்படுத்தி extends OrbitDBAccessController {

  static get type () { return "local-first-auth" }

  async load (address) {
    if (this._db) { await this._db.close() }

    // Force '<address>/_access' naming for the database
    this._db = await this._orbitdb.keyvalue(ensureAddress(address), {
      // use ipfs controller as a immutable "root controller"
      accessController: {
        type: 'ipfs',
        write: this._options.admin || [this._orbitdb.identity.id]
      },
      sync: true
    })

    this._db.events.on('ready', this._onUpdate.bind(this))
    this._db.events.on('write', this._onUpdate.bind(this))
    this._db.events.on('replicated', this._onUpdate.bind(this))

    await this._db.load()
  }

  async canAppend (entry, identityProvider) {
    const trueIfValidSig = async () => await identityProvider.verifyIdentity(entry.identity)
    const authenticated = NPP.authenticated()

    if (authenticated) return await trueIfValidSig()

    return Promise.resolve(false)
  }
}

class மதிப்பீட்டாளர்_கட்டுப்படுத்தி extends AccessController {
  /*
  MIT License

  Copyright (c) 2019 3Box Inc.

  Permission is hereby granted, free of charge, to any person obtaining a copy
  of this software and associated documentation files (the "Software"), to deal
  in the Software without restriction, including without limitation the rights
  to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
  copies of the Software, and to permit persons to whom the Software is
  furnished to do so, subject to the following conditions:

  The above copyright notice and this permission notice shall be included in all
  copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
  IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
  FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
  AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
  LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
  OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.
  */

  constructor (firstModerator, options) {
    super()
    this._firstModerator = firstModerator
    this._write = []
    this._options = options || {}
  }

  static get type () { return 'மதிப்பீட்டாளர்-கட்டுப்படுத்தி' }

  மதிப்பீட்டாளரா(id) {
    return this._write.includes(id)
  }

  isValidCapability (capability) {
    return this._capabilityTypes.includes(capability)
  }


  get firstModerator () {
    return this._firstModerator
  }

  async canAppend (entry, identityProvider) {
    const entryID = entry.identity.id
    const capability = entry.payload.value.capability
    const idAdd = entry.payload.value.id
    const மதிப்பீட்டாளர் = this.மதிப்பீட்டாளரா(entryID)
    const validCapability = this.isValidCapability(capability)
    const validSig = async () => identityProvider.verifyIdentity(entry.identity)
    if (மதிப்பீட்டாளர் && validCapability && (await validSig())) {
      if (capability === MODERATOR) {
        if (idAdd === this.firstModerator) return true
        this._write.push(idAdd)
      }
      return true
    }

    return false
  }

  async load (address) {
    const addList = address.split('/')
    const suffix = addList.pop()
    const mod = suffix.includes('mod') ? suffix : addList.pop()
    this._firstModerator = mod.split('_')[1]
  }

  async save () {
    // TODO if entire obj saved in manfest, can just pass our own fields
    let address = `${type}/mod_${this._firstModerator}`
    const manifest =  { address }
    return manifest
  }

  static async create (orbitdb, options = {}) {
    let firstModerator

    if (options.address) {
      firstModerator = options.address.split('/')[1].split('_')[1]
    } else {
      firstModerator = options.firstModerator
    }

    if (!firstModerator) throw new Error('Moderator AC: firstModerator required')
    return new ModeratorAccessController(firstModerator)
  }
}

AccessControllers.addAccessController({ AccessController: அணுகல்_கட்டுப்படுத்தி })
AccessControllers.addAccessController({ AccessController: மதிப்பீட்டாளர்_கட்டுப்படுத்தி })

export default AccessControllers
