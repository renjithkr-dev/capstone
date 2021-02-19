import './App.css'
import { Home } from './pages/home'
import axios from 'axios'

axios.defaults.baseURL='https://reumgbrqwd.execute-api.us-east-1.amazonaws.com/dev'
function App() {
  console.log(process.env.REACT_APP_AUTH0_DOMAIN)
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
