import { App } from 'vue'
import Overlay from './src/Overlay.vue'

Overlay.install = (app: App): void => {
  app.component(Overlay.name, Overlay)
}

export default Overlay