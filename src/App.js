import './App.css'
import Home from './views/home/index'
import PainelLeads from './views/paineLeads'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

function App() {

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/painel" component={PainelLeads} />
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  )
}

export default App
