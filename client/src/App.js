import './App.css'
import { Home } from './pages/home'

function App() {
  console.log(process.env.REACT_APP_AUTH0_DOMAIN)
  return (
    <div className="App">
      <Home />
    </div>
  );
}

export default App;
