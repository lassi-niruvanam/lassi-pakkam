import langues from './nuchabal.json'

export function obt_langues() {
  return Object.keys(langues)
}

export function வலதிலிருந்து(langue, auto=false) {
  if (langues[langue]) {
    return langues[langue].dàg || auto
  }
  return auto
}
export function  எண்ணுரு(langue, auto='தமிழ்') {
  if (langues[langue]) {
    return langues[langue]["ajilanïk"] || auto
  }
  return auto
}

export function பெயர்(code_) {
  return Object.keys(langues).find(x=>குறியீடு(x)===code_) || code_
}

export function குறியீடு(langue) {
  if (langues[langue]) {
    return langues[langue]["runuk'"] || langue
  }
  return langue
}

export function நோக்குநிலை(மொழி) {
  if (langues[மொழி]) {
    return langues[மொழி].நோக்குநிலை
  }
}
