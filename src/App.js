import React, {useState} from "react";

//import PuzzleWord from "./components/Hangman/PuzzleWord/PuzzleWord";

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
//import AppHeader from "./components/Game/components/AppHeader/AppHeader";
//import AdminHeader from "./components/Admin/Header/AdminHeader";
import ControlPanel from "./components/Admin/Control Panel/ControlPanel";
//import Identify from "./components/Admin/AdminIdentify/Identify/Identify";
import Game from "./components/Game/Game";
import AdminIdentify from "./components/Admin/AdminIdentify/AdminIdentify";
import DemoControlPanel from "./components/Demo Admin/Control Panel/DemoControlPanel";
import PasswordRecovery from "./components/Admin/AdminIdentify/Identify/PasswordRecovery/PasswordRecovery";
import AccountInfo from "./components/Admin/Account/AccountInfo/AccountInfo";
import Footer from "./components/Footer/Footer";
import Credits from "./components/Footer/Credits/Credits";
import PokemonScripts from "./components/Pokemon Scripts/PokemonScripts";

function App() {
  return (
    <Router>
      <>
        <Switch>

          {/* <Route path='/pokemon'>

            <PokemonScripts />

          </Route> */}

          <Route path="/credits-page">

            <Credits />
            {/* <Footer /> */}

          </Route>

          <Route path="/my-account">
          
            <AccountInfo />
            <Footer />

          </Route>

          <Route path="/password-recovery">

            <PasswordRecovery />
            <Footer />

          </Route>

          <Route path='/admin-place/demo'>

            <DemoControlPanel />

          </Route>

          <Route path='/admin-place'>

            <ControlPanel />

          </Route>

          <Route path='/identify'>

            <AdminIdentify />
            <Footer />

          </Route>

          <Route path="/">

            <Game />
            <Footer />

          </Route>
        </Switch>
      </>
   </Router>
  );
}

export default App;
