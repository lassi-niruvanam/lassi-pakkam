/**
 * plugins/index.ts
 *
 * Automatically included in `./src/main.ts`
 */

// Plugins
import { loadFonts } from './webfontloader'
import vuetify from './vuetify'
import router from '../router'
import லஸ்ஸி from './லஸ்ஸி'
import கிளிமூக்கு from './கிளிமூக்கு/கிளிமூக்கு'

// Types
import type { App } from 'vue'

export function registerPlugins (app: App) {
  loadFonts()
  app
    .use(vuetify)
    .use(router)
    .use(லஸ்ஸி)
    .use(கிளிமூக்கு)
}
