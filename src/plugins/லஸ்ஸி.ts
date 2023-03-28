import { App, computed, ComputedRef, inject, Ref, ref, watchEffect } from "vue";

import { v4 as uuidv4 } from "uuid";

import { Nuchabäl } from 'nuchabal';
import { லஸ்ஸி_இலக்கணங்கள் } from "lassi-ilakkanankal"
import EventEmitter, { once } from "events";

// எதிர்காலத்தில், இணைந்த Nuch'ab'äl உடன் செய்யவும்
const nuchabäl = new Nuchabäl({})

export type லஸ்ஸி_முடிவு_வகை = லஸ்ஸி_மொழியாக்கம்_வகை | லஸ்ஸி_பிழை_வகை
export type லஸ்ஸி_மொழியாக்கம்_வகை = {
  வகை: "சாதைனை",
  மொழியாக்கம்: string,
}
export type லஸ்ஸி_பிழை_வகை = {
  வகை: "பிழை",
  பிழை: string,
}

export class லஸ்ஸி {
    தயாரானது: boolean
    கிடையாது: boolean
    கோரிக்கைகள்: {
        [சாபி: string]: {
            அடையாளம்: string
            செயல்பாடு: {
              முடிவு: (இ: string) => void
              பிழை: (இ: string) => void
            }
        }
    }
    பையோதைத்?: Worker
    _நிகழ்வுகள்: EventEmitter

    constructor() {
        this.தயாரானது = false
        this.கிடையாது = false
        this.கோரிக்கைகள் = {}

        this._நிகழ்வுகள் = new EventEmitter()

    }

  _பையோதைத்_ஆரம்பம்(){
    const உரை = new Blob([
      `
  importScripts('https://cdn.jsdelivr.net/pyodide/v0.22.1/full/pyodide.js')
  async function loadPyodideAndPackages() {
    self.pyodide = await loadPyodide();
    await self.pyodide.loadPackage(['micropip', 'regex']);

    self.postMessage({வகை: "தயார்"})
  }
  let pyodideReadyPromise = loadPyodideAndPackages();

  var onmessage = async function(e) { // eslint-disable-line no-unused-vars
    await pyodideReadyPromise;
    await pyodide.loadPackage("micropip");
    const micropip = pyodide.pyimport("micropip");
    
    await micropip.install('lassi')
    package_list = micropip.list()
    
    const தகவல்கள் = e.data
    const சாபிகள் = Object.keys(தகவல்கள்)
    for (let சாபி of சாபிகள்) {
      if (சாபி !== 'குறியீடு') {
        // Keys other than python must be arguments for the python script.
        // Set them on self, so that \`from js import key\` works.
        self[சாபி] = தகவல்கள்[சாபி]
      }
    }
    const { அடையாளம், பைத்தான் } = தகவல்கள்
    try {
      await self.pyodide.loadPackagesFromImports(பைத்தான்);
      const முடிவுகள் = await self.pyodide.runPythonAsync(பைத்தான்)
      self.postMessage({வகை: "மொழியாக்கம்", முடிவுகள், அடையாளம்})
    } catch (பிழை) {
      self.postMessage({
        வகை: "பிழை", 
        பிழை : பிழை.message, 
        அடையாளம்
      })
    }
  }`
    ], { type: "text/javascript" })

    this.பையோதைத் = new Worker(window.URL.createObjectURL(உரை))

    this.பையோதைத்.onerror = (நி) => {
      console.error(`பையோதைத் பிழை: ${நி.filename}, கோடு: ${நி.lineno}, ${நி.message}`)
      this.கிடையாது = true
      this._நிகழ்வுகள்.emit("கிடையாது")
    }
    this.பையோதைத்.onmessage = (நி) => {
      const {வகை, முடிவுகள், பிழை, அடையாளம்} = நி.data

      if (வகை === 'தயார்') {
        this.தயாரானது = true
        this._நிகழ்வுகள்.emit("தயாரானது")
      } else if (வகை === "மொழியாக்கம்") {
        const முடிவு: லஸ்ஸி_மொழியாக்கம்_வகை = {
          வகை: "சாதைனை",
          மொழியாக்கம்: முடிவுகள்
        }
        this._நிகழ்வுகள்.emit(அடையாளம், முடிவு)
      } else if (வகை === "பிழை") {
        const முடிவு: லஸ்ஸி_பிழை_வகை = {
          வகை: "பிழை",
          பிழை
        }
        this._நிகழ்வுகள்.emit(அடையாளம், முடிவு)
      }
    }
  }

  async மொழியாக்கம்({
      உரை, நிரல்மொழி, உள்_மொழி, வெள்_மொழி, உள்_நிரல்_எண்ணுரு, வெள்_நிரல்_எண்ணுரு, இனங்காட்டிகள்={},
    }: {
        உரை: string,
        நிரல்மொழி: string,
        உள்_மொழி: string, 
        வெள்_மொழி: string, 
        உள்_நிரல்_எண்ணுரு?: string, 
        வெள்_நிரல்_எண்ணுரு?: string,
        இனங்காட்டிகள்?: {},
    }): Promise<லஸ்ஸி_முடிவு_வகை> {

    if (this.கிடையாது) throw new Error('லஸ்ஸி கிடையாது')
    if (!this.பையோதைத்) this._பையோதைத்_ஆரம்பம்()

    const பைத்தான் = `
import லஸ்ஸி
def _நிரல்பாகம்(*மாறிகள்):
    லஸ்ஸி_முடிவுகள் = லஸ்ஸி.மொழியாக்கம்(
      உரை="""${ உரை }\n""",
      நிரல்மொழி="${ நிரல்மொழி }",
      மொழி="${ nuchabäl.runukChabäl({chabäl: வெள்_மொழி}) || வெள்_மொழி }",
      எண்ணுரு=${ வெள்_நிரல்_எண்ணுரு ? "'" + வெள்_நிரல்_எண்ணுரு + "'" : 'None' },
      மூல்மொழி="${ nuchabäl.runukChabäl({chabäl: உள்_மொழி}) || உள்_மொழி }",
      மூலெண்ணுரு=${ உள்_நிரல்_எண்ணுரு ? "'" + உள்_நிரல்_எண்ணுரு + "'" : 'None' },
      இனங்காட்டிகள்=${ JSON.stringify(இனங்காட்டிகள்) }
    )
    return லஸ்ஸி_முடிவுகள்

try:
    முடிவுகள் = _நிரல்பாகம்()
except ModuleNotFoundError:
    import micropip
    முடிவுகள் = micropip.install(['lark-parser', 'lassi', 'semantic-version', 'lassi-ilakkanankal']).then(_நிரல்பாகம்)

முடிவுகள்
  `
    const அடையாளம் =  uuidv4()
    this.பையோதைத்!.postMessage({ பைத்தான், அடையாளம் })
    const முடிவு: லஸ்ஸி_முடிவு_வகை = (await once(this._நிகழ்வுகள், அடையாளம்))[0]
    return முடிவு
  }
}

export default {
  install: (app: App) => {
    app.provide('லஸ்ஸி', new லஸ்ஸி());
    app.provide('லஸ்ஸி_இலக்கணங்கள்', new லஸ்ஸி_இலக்கணங்கள்({}));
  },
};

const குறிப்பின்_மதிப்பு_பெறு = <T=any>(கு: Ref<T> | T): T => {
  // @ts-ignore
  return கு.value ? கு.value : கு
}

export const லஸ்ஸியை_பயன்படுத்து = () => {
  const லஸ்ஸி = inject<லஸ்ஸி>("லஸ்ஸி")
  const இலக்கணங்கள் = inject<லஸ்ஸி_இலக்கணங்கள்>("லஸ்ஸி_இலக்கணங்கள்");
  if (!லஸ்ஸி) throw new Error("லஸ்ஸி கிடைத்ததில்லை.")
  if (!இலக்கணங்கள்) throw new Error("லஸ்ஸி இலக்கணங்கள் கிடைத்ததில்லை.")

  const லஸ்ஸி_தயாரானது = ref(லஸ்ஸி.தயாரானது);
  லஸ்ஸி._நிகழ்வுகள்.once("தயாரானது", () => லஸ்ஸி_தயாரானது.value = true)

  const லஸ்ஸி_கிடையாது = ref(லஸ்ஸி.கிடையாது);
  லஸ்ஸி._நிகழ்வுகள்.once("கிடையாது", ()=>லஸ்ஸி_கிடையாது.value = true)

  const நிரல்மொழிகள் = ref<string[]>(இலக்கணங்கள்.நிரல்மொழிகள்);
  const மூல்_மொழி = ({நிரல்மொழி}: {நிரல்மொழி: Ref<string>}): ComputedRef<string|undefined> => {
    const மொழிகள் = computed(()=>{
      return இலக்கணங்கள்.மூல்_மொழி({நிரல்மொழி: நிரல்மொழி.value})
    });
    return மொழிகள்
  };
  const மூல்_எண்ணுரு = ({நிரல்மொழி}: {நிரல்மொழி: Ref<string>}): ComputedRef<string|undefined> => {
    const மொழிகள் = computed(()=>{
      return இலக்கணங்கள்.மூல்_எண்ணுரு({நிரல்மொழி: நிரல்மொழி.value})
    });
    return மொழிகள்
  };

  const மொழிகள் = ({நிரல்மொழி}: {நிரல்மொழி: Ref<string>}): ComputedRef<string[]> => {
    const மொழிகள் = computed(()=>{
      return இலக்கணங்கள்.இயற்கை_மொழிகள்({நிரல்மொழி: நிரல்மொழி.value})
    });
    return மொழிகள்
  };

  const நிறைவு = ({ நிரல்மொழி, மொழி }: { நிரல்மொழி: Ref<string>|string, மொழி?: Ref<string>|string }) => {
    return computed(()=>{ 
      return இலக்கணங்கள்.நிறைவு({ நிரல்மொழி: குறிப்பின்_மதிப்பு_பெறு(நிரல்மொழி), மொழி: மொழி ? குறிப்பின்_மதிப்பு_பெறு(மொழி) : undefined })
    })
  }

  const நிரல்மொழியாக்கம் = ({
    உள்_மொழி, 
    வெள்_மொழி,
    உரை,
    நிரல்மொழி,
    உள்_நிரல்_எண்ணுரு,
    வெள்_நிரல்_எண்ணுரு,
    இனங்காட்டிகள்,
  }: {
    உள்_மொழி: Ref<string|undefined>,
    வெள்_மொழி: Ref<string|undefined>,
    உரை: Ref<string|undefined>,
    நிரல்மொழி: Ref<string|undefined>,
    உள்_நிரல்_எண்ணுரு: Ref<string|undefined>,
    வெள்_நிரல்_எண்ணுரு: Ref<string|undefined>,
    இனங்காட்டிகள்: Ref<{[மொழி: string]: string}[]>
  }) => {
    const மொழியாக்கம் = ref<string>();
    const பிழை = ref<string>();
    const தயாரானது = ref(false);

    let சமீபத்திய_கோரிக்கை: string
    watchEffect(async ()=>{
      if (!உள்_மொழி.value || !வெள்_மொழி.value || !உரை.value || !நிரல்மொழி.value) return
      தயாரானது.value = false;
      const கோரிக்கை = uuidv4();
      சமீபத்திய_கோரிக்கை = கோரிக்கை;
      const வெளியீடு = await லஸ்ஸி.மொழியாக்கம்({ 
        உள்_மொழி: உள்_மொழி.value,
        வெள்_மொழி: வெள்_மொழி.value,
        உரை: உரை.value,
        நிரல்மொழி: நிரல்மொழி.value,
        உள்_நிரல்_எண்ணுரு: உள்_நிரல்_எண்ணுரு.value === "" ? undefined : உள்_நிரல்_எண்ணுரு.value,
        வெள்_நிரல்_எண்ணுரு: வெள்_நிரல்_எண்ணுரு.value === "" ? undefined : வெள்_நிரல்_எண்ணுரு.value,
        இனங்காட்டிகள்: இனங்காட்டிகள்.value,
      })
      if (சமீபத்திய_கோரிக்கை === கோரிக்கை) {
        switch (வெளியீடு.வகை) {
          case "சாதைனை":
            மொழியாக்கம்.value = வெளியீடு.மொழியாக்கம்
            பிழை.value = undefined;
            break;

          default:
            பிழை.value = வெளியீடு.பிழை
            மொழியாக்கம்.value = undefined;
            break;
        }
        தயாரானது.value = true;
      }
    })
    
    return {மொழியாக்கம், பிழை, தயாரானது}
  };

  const நிரல்மொழி_பெயர் = ({நிரல்மொழி, மொழி}: {நிரல்மொழி: Ref<string>, மொழி: Ref<string>}): ComputedRef<string|undefined> => {
    const மொழிகள் = computed(()=>{
      return இலக்கணங்கள்.நிரல்மொழி_பெயர்({நிரல்மொழி: நிரல்மொழி.value, மொழி: மொழி.value})
    });
    return மொழிகள்
  };

  return {
    லஸ்ஸி_தயாரானது,
    லஸ்ஸி_கிடையாது,
    நிரல்மொழியாக்கம்,
    நிரல்மொழிகள்,
    மொழிகள்,
    மூல்_மொழி,
    மூல்_எண்ணுரு,
    நிரல்மொழி_பெயர்,
    நிறைவு,
  }
}