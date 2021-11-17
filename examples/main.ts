import { createApp } from 'vue'
import mzzsUI from '../packages'
import App from './App.vue'
import '../packages/theme/default/index.less'

const app = createApp(App)
app.use(mzzsUI)
app.mount('#app')
