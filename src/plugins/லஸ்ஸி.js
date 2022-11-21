import { குறியீடு } from '../nuchabal/nuchabal'


class லஸ்ஸி {
  constructor() {
    this.தயாரானது = false
    this.கிடையாது = false
    this.செயலிகள் = {}
    if ((navigator.userAgentData && navigator.userAgentData.mobile) ||
      (navigator.userAgent.indexOf('Chrome') === -1 && navigator.userAgent.indexOf('Firefox') === -1)
    ) {
      this.கிடையாது = true
      return
    }
  }

  _பையோதைத்_ஆரம்பம்(){
    var உரை = new Blob([
      `
      // self.languagePluginUrl = 'http://localhost:8000/'
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.21.3/full/')
  self.postMessage({"செய்தி": "தயார்"})

  var onmessage = function(e) { // eslint-disable-line no-unused-vars
    languagePluginLoader.then(() => {
      self.pyodide.loadPackage(['micropip', 'regex']).then(() => {
        const தகவல்கள் = e.data
        const சாபிகள் = Object.keys(தகவல்கள்)
        for (let சாபி of சாபிகள்) {
          if (சாபி !== 'குறியீடு') {
            // Keys other than python must be arguments for the python script.
            // Set them on self, so that \`from js import key\` works.
            self[சாபி] = தகவல்கள்[சாபி]
          }
        }
        const { அடையாளம், இலக்கு, பைத்தான் } = தகவல்கள்
        self.pyodide.runPythonAsync(பைத்தான், () => {})
        .then((முடிவுகள்) => { self.postMessage({முடிவுகள், அடையாளம், இலக்கு}) })
        .catch((பிழை) => {
          self.postMessage({
            பிழை : பிழை.message, அடையாளம், இலக்கு})
        })
      })
    })
  }`
    ], { type: "text/javascript" })

    this.பையோதைத் = new Worker(window.URL.createObjectURL(உரை))

    this.பையோதைத்.onerror = (நி) => {
      console.error(`பையோதைத் பிழை: ${நி.filename}, கோடு: ${நி.lineno}, ${நி.message}`)
      this.கிடையாது = true
    }
    this.பையோதைத்.onmessage = (நி) => {
      const {இலக்கு, முடிவுகள், பிழை, அடையாளம், செய்தி} = நி.data
      console.log(செய்தி)
      if (செய்தி === 'தயார்') {
        this.தயாரானது = true
        return
      }

      const செயலி = this.செயலிகள்[இலக்கு]
      if (செயலி.அடையாளம் === அடையாளம்) {
        if (முடிவுகள்) {
          செயலி.செயலி(முடிவுகள்)
        } else if (பிழை) {
          console.error('பையோதைத் பிழை: ', பிழை)
          செயலி.பிழைசெயலி(பிழை)
        }
      }
    }
  }

  மொழியாக்கம்(
      இலக்கு, உரை, நிரல்மொழி, உள்_மொழி, வெள்_மொழி, உள்_நிரல்_எண்ணுரு, வெள்_நிரல்_எண்ணுரு, இனங்காட்டிகள்,
      செயலி, பிழைசெயலி
    ) {

    if (this.கிடையாது) throw 'லஸ்ஸி கிடையாது'
    if (!this.பையோதைத்) this._பையோதைத்_ஆரம்பம்()

    const பைத்தான் = `
def _நிரல்பாகம்(*மாறிகள்):
    import லஸ்ஸி

    லஸ்ஸி_முடிவுகள் = லஸ்ஸி.மொழியாக்கம்(
      உரை="""${உரை}\n""",
      நிரல்மொழி="${நிரல்மொழி}",
      மொழி="${குறியீடு(வெள்_மொழி)}",
      எண்ணுரு="${ வெள்_நிரல்_எண்ணுரு }",
      மூல்மொழி="${குறியீடு(உள்_மொழி)}",
      மூலெண்ணுரு="${ உள்_நிரல்_எண்ணுரு }",
      இனங்காட்டிகள்=${ இனங்காட்டிகள் }
    )
    return லஸ்ஸி_முடிவுகள்

try:
    முடிவுகள் = _நிரல்பாகம்()
except ModuleNotFoundError:
    import micropip
    முடிவுகள் = micropip.install(['lark-parser', 'lassi', 'semantic-version', 'lassi-ilakkanankal']).then(_நிரல்பாகம்)

முடிவுகள்
  `
      const அடையாளம் =  Math.floor(Math.random() * 1000000).toString()
      this.செயலிகள்[இலக்கு] = {செயலி, பிழைசெயலி, அடையாளம்}
      this.பையோதைத்.postMessage({ பைத்தான், அடையாளம், இலக்கு })

  }
}


export default {
  install (Vue) {
    Vue.prototype.$லஸ்ஸி = new லஸ்ஸி()
  }

}
