import 'bootstrap/dist/css/bootstrap.min.css';
import WhatsApp from "./pages/WhatsApp.jsx"
import { Provider } from 'react-redux';
import store from './store/store.js';

function App() {

  return (
    <Provider store={store}>
          <WhatsApp/>

    </Provider>
    
  
  )
}

export default App
