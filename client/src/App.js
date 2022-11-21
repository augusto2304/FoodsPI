import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
import LandingPage from './components/Landing/Landing';
import Home from './components/Home/Home';
import CreateRecipe from './components/CreateRecipe/CreateRecipe'
import RecipeDetail from './components/RecipeDetail/RecipeDetail';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
      <Switch>
        <Route exact path='/' component={LandingPage}/>
        <Route path='/home' component={Home}/>
        <Route path="/recipes/:id" component={RecipeDetail} />
        <Route path='/recipes' component={CreateRecipe}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
