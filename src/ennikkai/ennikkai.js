import takavalkal from './takavalkal.json'

export const முறைமைகள் = Object.keys(takavalkal)

function mattram_idancar(எண், குறிகள்) {
  குறிகள் = [...குறிகள்]
  const அடி = குறிகள்.length
  if (அடி === 10) {
    const urai = எண்.toString()
    return Array.prototype.map.call(urai, x => குறிகள்[parseInt(x)]).join('')
  }

  if (எண் === 0) {
    return குறிகள்[0]
  }

  const எதிர் = எண் < 0
  எண் = Math.abs(எண்)

  var உரை = ""
  while (எண்) {
      உரை = குறிகள்[Math.floor(எண் % அடி)] + உரை
      எண் = Math.floor(எண் / அடி)
  }

  if (எதிர்) {
    உரை = '-' + உரை
  }
  return உரை
}
function _அடிமானம்_எழுதல்(எண், குறிகள், அடிமானங்கள்) {
  var மீதி = எண்
  var உரை = ''

  அடிமானங்கள் = Object.entries(அடிமானங்கள்).sort(function(a,b) {return b[1]-a[1]})
  for (const [அடி, மதிப்பு] of அடிமானங்கள்) {
      var ம = parseInt(மீதி / மதிப்பு)
      if (ம) {
        மீதி -= ம * மதிப்பு
        if (ம !== 1) {
          உரை += _அடிமானம்_எழுதல்(ம, குறிகள், அடிமானங்கள்)
        }
        உரை += அடி
      }
    }

  if (மீதி) {
    உரை = உரை + குறிகள்[parseInt(மீதி)]
  }

  return உரை
}

function mattram_adimanam(எண், குறிகள், அடிமானங்கள்) {

  குறிகள் = [...குறிகள்]

  const எதிர் = எண் < 0
  எண் = Math.abs(எண்)

  var உரை = _அடிமானம்_எழுதல்(எண், குறிகள், அடிமானங்கள்)

  if (உரை.length === 0) {
    உரை = குறிகள்[0]
  }

  if (எதிர்){
    உரை = '-' + உரை
  }

  return உரை

}
export default function uraikku(en, mozhi) {
  const takaval_mozhi = takavalkal[mozhi] || takavalkal['தமிழ்']

  if (takaval_mozhi['வகை']==='இடஞ்சார்') {
    return mattram_idancar(en, takaval_mozhi['குறிகள்'])
  } else if (takaval_mozhi['வகை']==='அடிமானம்') {
    return mattram_adimanam(en, takaval_mozhi['குறிகள்'], takaval_mozhi['அடிமானங்கள்'])
  }
}
