import { BrowserRouter as Router, NavLink, Switch, Route } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiFillHome as HomeIcon } from "react-icons/ai";
import CharacterService from "./services/characters.service";
import CharacterData from "./types/character.type";

const App: React.FC = () =>  {
  return (
    <Router>
      <nav className="navbar">
        <NavLink to={"/"} >
          <HomeIcon />
        </NavLink>

        <NavLink to={"/characters"} >
          <h4>Characters</h4>
        </NavLink>

        <NavLink to={"/add"} >
          <h4>Add</h4>
        </NavLink>
      </nav>
      
      <Switch>
        <Route exact path="/" >
          <h1>HOME</h1>
        </Route>

        <Route exact path="/characters" >
          <h1>CHARACTERS</h1>
        </Route>

        <Route path="/characters/:id" >
          <h1>SOME CHARACTER</h1>
        </Route>

        <Route exact path="/add" >
          <h1>ADD</h1>
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
