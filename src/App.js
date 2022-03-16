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
import AccountInfo from "./components/Admin/Account/AccountInfo/AccountInfo";
import Footer from "./components/Footer/Footer";
import Credits from "./components/Footer/Credits/Credits";
import PokemonScripts from "./components/Pokemon Scripts/PokemonScripts";
import ReactToastContainer from "./ReactToastContainer";

import UserDataContext from "./contexts/UserDataContext";
import Loading from "./components/Loading/Loading";
import FirstTimeUser from "./components/FirstTimeUser/FirstTimeUser";
const { ipcRenderer } = window.require('electron')

function App() {

  const [userData, setUserData] = useState({})
  const [firstTimeUser, setFirstTimeUser] = useState(true)
  const [loading, setLoading] = useState(true)

  React.useEffect(() => {
    ipcRenderer.send('check-first-time-user')
    ipcRenderer.on('check-first-time-user-reply', (event, arg) => {
      console.log(arg)
      setFirstTimeUser(arg)
      setLoading(false)
    })
  }, [])

  return (
    <>
      <ReactToastContainer />
      {
        loading ?
          <Loading />
        : null
      }
      <UserDataContext.Provider value={{userData, setUserData}}>
        {
          firstTimeUser ?
            <FirstTimeUser setFirstTimeUser={setFirstTimeUser}/>
        : 
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
                <Route path='/admin-place/demo'>
                  <ControlPanel demo={true}/>
                </Route>

                  <Route path='/admin-place'>
                    <ControlPanel/>
                  </Route>
                  
                  <Route path='/identify'>
                    <AdminIdentify/>
                    <Footer />
                  </Route>

                <Route path="/">
                  <Game />
                  <Footer />
                </Route>

              </Switch>
            </>
        </Router>
      }
    </UserDataContext.Provider>
    </>
)}

export default App;
