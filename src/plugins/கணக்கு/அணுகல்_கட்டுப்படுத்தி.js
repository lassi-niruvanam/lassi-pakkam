
import { AccessControllers } from 'orbit-db'
const pMapSeries = require('p-map-series')

const MODERATOR = 'மதிப்பீட்டாளர்'
window.AccessControllers = AccessControllers
/*
MIT License

Copyright (c) 2018 Haja Networks Oy

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

const path = require('path')
// Make sure the given address has '/_access' as the last part
const ensureAddress = address => {
  const suffix = address.toString().split('/').pop()
  return suffix === '_access'
    ? address
    : path.join(address, '/_access')
}

class அணுகல்_கட்டுப்படுத்தி {
  constructor (orbitdb, options) {
    this._orbitdb = orbitdb
    this._db = null
    this._options = options || {}
  }

  // Returns the type of the access controller
  static get type () { return "கோள்பாதை-தத-மதிப்பீட்டாளர்" }

  // Returns the address of the OrbitDB used as the AC
  get address () {
    return this._db.address
  }

  // Return true if entry is allowed to be added to the database
  async canAppend (entry, identityProvider) {
    // Write keys and admins keys are allowed
    const access = new Set([...this.get('write'), ...this.get('admin')])
    // If the ACL contains the writer's public key or it contains '*'
    if (access.has(entry.identity.id) || access.has('*')) {
      const verifiedIdentity = await identityProvider.verifyIdentity(entry.identity)
      // Allow access if identity verifies
      return verifiedIdentity
    }

    return false
  }

  get capabilities () {
    if (this._db) {
      const capabilities = this._db.index

      const toSet = (e) => {
        const key = e[0]
        capabilities[key] = new Set([...(capabilities[key] || []), ...e[1]])
      }

      // Merge with the access controller of the database
      // and make sure all values are Sets
      Object.entries({
        ...capabilities,
        // Add the root access controller's 'write' access list
        // as admins on this controller
        ...{ admin: new Set([...(capabilities.admin || []), ...this._db.access.write]) }
      }).forEach(toSet)

      return capabilities
    }
    return {}
  }

  get (capability) {
    return this.capabilities[capability] || new Set([])
  }

  async close () {
    await this._db.close()
  }

  async load (address) {
    if (this._db) { await this._db.close() }

    // Force '<address>/_access' naming for the database
    this._db = await this._orbitdb.keyvalue(ensureAddress(address), {
      // use ipfs controller as a immutable "root controller"
      accessController: {
        type: 'மதிப்பீட்டாளர்-கட்டுப்படுத்தி',
        write: this._options.admin || [this._orbitdb.identity.id]
      },
      sync: true
    })

    this._db.events.on('ready', this._onUpdate.bind(this))
    this._db.events.on('write', this._onUpdate.bind(this))
    this._db.events.on('replicated', this._onUpdate.bind(this))

    await this._db.load()
  }

  async save () {
    // return the manifest data
    return {
      address: this._db.address.toString()
    }
  }

  async grant (capability, key) {
    // Merge current keys with the new key
    const capabilities = new Set([...(this._db.get(capability) || []), ...[key]])
    await this._db.put(capability, Array.from(capabilities.values()))
  }

  async revoke (capability, key) {
    const capabilities = new Set(this._db.get(capability) || [])
    capabilities.delete(key)
    if (capabilities.size > 0) {
      await this._db.put(capability, Array.from(capabilities.values()))
    } else {
      await this._db.del(capability)
    }
  }

  /* Private methods */
  _onUpdate () {
    this.emit('updated')
  }

  /* Factory */
  static async create (orbitdb, options = {}) {
    const ac = new அணுகல்_கட்டுப்படுத்தி(orbitdb, options)
    await ac.load(options.address || options.name || 'default-access-controller')

    // Add write access from options
    if (options.write && !options.address) {
      await pMapSeries(options.write, async (e) => ac.grant('write', e))
    }

    return ac
  }
}


class மதிப்பீட்டாளர்_கட்டுப்படுத்தி {
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
    let address = `${this.type}/mod_${this._firstModerator}`
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
    return new மதிப்பீட்டாளர்_கட்டுப்படுத்தி(firstModerator)
  }
}

AccessControllers.addAccessController({ AccessController: அணுகல்_கட்டுப்படுத்தி })
AccessControllers.addAccessController({ AccessController: மதிப்பீட்டாளர்_கட்டுப்படுத்தி })

export default AccessControllers
/*
const type = 'moderator-access'

const MODERATOR = 'MODERATOR'
const MEMBER = 'MEMBER'

class ModeratorAccessController {
  constructor (firstModerator, options) {
    this._capabilityTypes = [MODERATOR]
    this._write = []     // Allowed to add other mods or members
    this._firstModerator = firstModerator
    this._write.push(this._firstModerator)
    this._members = Boolean(options.members)
    if (this._members) this._capabilityTypes.push(MEMBER)
    this._encKeyId = options.encKeyId
  }

  static get type () { return type }

  isMod(id) {
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
    const isMod = this.isMod(entryID)
    const validCapability = this.isValidCapability(capability)
    const validSig = async () => identityProvider.verifyIdentity(entry.identity)
    if (isMod && validCapability && (await validSig())) {
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
    this._members = suffix === 'members'
    const mod = suffix.includes('mod') ? suffix : addList.pop()
    this._firstModerator = mod.split('_')[1]
  }

  async save () {
    // TODO if entire obj saved in manfest, can just pass our own fields
    let address = `${type}/mod_${this._firstModerator}`
    address += this._members ? '/members' : ''
    const manifest =  { address }
    if (this._encKeyId) manifest.encKeyId = this._encKeyId
    return manifest
  }

  static async create (orbitdb, options = {}) {
    let firstModerator, members, encKeyId

    if (options.address) {
      members = options.address.includes('members')
      firstModerator = options.address.split('/')[1].split('_')[1]
      encKeyId = options.encKeyId
    } else {
      members = options.members
      firstModerator = options.firstModerator
      encKeyId = options.encKeyId
    }

    if (!firstModerator) throw new Error('Moderator AC: firstModerator required')
    return new ModeratorAccessController(firstModerator, {members, encKeyId})
  }
}

module.exports = ModeratorAccessController
*/
