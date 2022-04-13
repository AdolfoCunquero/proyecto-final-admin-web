
import './styles/quasar.sass'
import '@quasar/extras/material-icons/material-icons.css'
import { Notify } from "quasar"
import { Loading } from 'quasar'

// To be used on app.use(Quasar, { ... })
export default {
  config: {},
  plugins: {
    Notify,
    Loading
  }
}