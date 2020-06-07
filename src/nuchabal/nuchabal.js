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
    return langues[langue].numération || auto
  }
  return auto
}
