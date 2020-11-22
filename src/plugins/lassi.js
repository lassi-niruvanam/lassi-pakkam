import { குறியீடு } from '../nuchabal/nuchabal'


class Lassi {
  constructor() {
    this.lassi_tayar = false
    this.actions = {}
    this.pyodideWorker = this._genPyodideWorker()
    this.pyodideWorker.onerror = (e) => {
      console.log(`பையோடைட் பிழை: ${e.filename}, கோடு: ${e.lineno}, ${e.message}`)
    }
    this.pyodideWorker.onmessage = (e) => {
      console.log(e)
      const {results, error, id_, செய்தி} = e.data
      if (results) {
        console.log(this)
        this.actions[id_].f(results)
      } else if (error) {
        console.log('பையோடைட் பிழை: ', error)
        this.actions[id_].f_erreur(error)
      } else if (செய்தி) {
        console.log('5', செய்தி)
        if (செய்தி === 'தயார்') {
          console.log('லஸ்ஸி தயார்')
          this.lassi_tayar = true
          console.log(this.lassi_tayar)
        }
      }
    }
  }

  _genPyodideWorker(){

    var blob = new Blob([
      `
      // self.languagePluginUrl = 'http://localhost:8000/'
  importScripts('https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js')
  self.postMessage({"செய்தி": "தயார்"});
  console.log('salut !')
  var onmessage = function(e) { // eslint-disable-line no-unused-vars
    languagePluginLoader.then(() => {
      self.pyodide.loadPackage(['micropip', 'regex']).then(() => {
        const data = e.data;
        const keys = Object.keys(data);
        for (let key of keys) {
          if (key !== 'python') {
            // Keys other than python must be arguments for the python script.
            // Set them on self, so that \`from js import key\` works.
            self[key] = data[key];
          }
        }
        console.log('arrivé ici !')
        self.pyodide.runPythonAsync(data.python, () => {})
        .then((results) => { console.log(results); self.postMessage({results, id_: data['id_']}); })
        .catch((err) => {
          self.postMessage({error : err.message, id_: data['id_']});
        });
      });
    });
  }`
    ], { type: "text/javascript" })

    const pyodideWorker = new Worker(window.URL.createObjectURL(blob))

    return pyodideWorker

  }

  mozhiyakkam(
      உரை, நிரல்மொழி, உள்_மொழி, வெள்_மொழி, உள்_நிரல்_எண்ணுரு, வெள்_நிரல்_எண்ணுரு, இனங்காட்டிகள்,
      f, f_erreur
    ) {
      const குறிப்பிடு = `
def fonc(*args):
    from lark import Lark
    import lark
    print(lark.__version__)
    import லஸ்ஸி

    res_lassi = லஸ்ஸி.மொழியாக்கம்(
      உரை="""${உரை}\n""",
      நிரல்மொழி="${நிரல்மொழி}",
      மொழி="${குறியீடு(வெள்_மொழி)}",
      எண்ணுரு="${ வெள்_நிரல்_எண்ணுரு }",
      மூல்மொழி="${குறியீடு(உள்_மொழி)}",
      மூலெண்ணுரு="${ உள்_நிரல்_எண்ணுரு }",
      இனங்காட்டிகள்=${ இனங்காட்டிகள் }
    )
    return res_lassi

try:
    res = fonc()
except ModuleNotFoundError:
    import micropip
    res = micropip.install(['lark-parser', 'lassi', 'semantic-version', 'lassi-ilakkanankal']).then(fonc)

res
  `
      const id_ =  Math.floor(Math.random() * 1000000).toString()
      this.actions[id_] = {f, f_erreur}
      this.pyodideWorker.postMessage({
        python: குறிப்பிடு,
        id_: id_
      })

  }
}


export default {
  install (Vue) {
    Vue.prototype.$lassi = new Lassi()
  }

}
