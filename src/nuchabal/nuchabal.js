import langues from './nuchabal.json'

export function obt_langues() {
  return Object.keys(langues)
}

export function dàg(langue, auto=false) {
  if (langues[langue]) {
    return langues[langue].dàg || auto
  }
  return auto
}
export function  num(langue, auto='தமிழ்') {
  if (langues[langue]) {
    return langues[langue]["ajilanïk"] || auto
  }
  return auto
}

export function பெயர்(code_) {
  return Object.keys(langues).find(x=>code(x)===code_)
}

export function code(langue) {
  if (langues[langue]) {
    return langues[langue]["runuk'"] || langue
  }
  return langue
}
