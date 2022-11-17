import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing';
import Home from './components/Home';
import CreateRecipe from './components/CreateRecipe'

function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path='/recipes' component={CreateRecipe}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
