const bip39 = require('bip39')

bip39_பெயர்கள் = {
  'čš': 'czech',
  '汉': 'chinese_simplified',
  '漢': 'chinese_traditional',
  'en': 'english',
  'fr': 'french',
  'it': 'italian',
  '日本': 'japanese',
  '한국': 'korean',
  '조선': 'korean'
  'es': 'spanish'
}

மொழியை_உறுதிசெய்யு(மொழி) {
  const bip39_மொழி = bip39_பெயர்கள்[மொழி] || மொழி
  if (!bip39.wordlists[bip39_மொழி]) {
    bip39.wordlists[மொழி] = require(`./வார்த்தைகள்/${மொழி}.json`)
  }
  return bip39_மொழி
}

export காகிதசாபியை_உருவாக்கு(மொழி, வலிமை){
  மொழி = மொழியை_உறுதிசெய்யு(மொழி)
  bip39.setDefaultWordlist(மொழி)
  return bip39.generateMnemonic(வலிமை)
}

export காகிதசாபியால்_எண்ணுரு(சாபி, மொழி) {
  மொழி = மொழியை_உறுதிசெய்யு(மொழி)
  return bip39.mnemonicToSeed(சாபி)
}

export ஒத்திசை_காகிதசாபியால்_எண்ணுரு(சாபி, மொழி) {
  மொழி = மொழியை_உறுதிசெய்யு(மொழி)
  return bip39.mnemonicToSeedSync(சாபி)
}
