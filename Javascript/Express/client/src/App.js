import './App.css';
import { useState } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate
} from "react-router-dom"
import Login from './components/login/Login';
import Register from './components/register/Register';
import Dashboard from './components/dashboard/Dashboard';
import Home from './components/Home';
import Newsfeed from './components/newsfeed/Newsfeed';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  const setAuth = boolean => {

    setIsAuthenticated(boolean)

  }
//authenticated ? renderApp() : renderLogin();
  return (
    //router to redirect and check authentication
    <div className="App">

      <Router>
        <div className='app-container'>
          <Routes>
            <Route exact path='/' element={(<Home/>)}></Route>
            <Route exact path='/login' element={!isAuthenticated ? (<Login setAuth={setAuth}/> ): (
              <Navigate to='/dashboard'/>
            ) } ></Route>
            <Route exact path='/register' element={!isAuthenticated ? (<Register setAuth={setAuth}/> ): (
              <Navigate to='/dashboard'/>
            ) }></Route>
            <Route exact path='/dashboard' element={isAuthenticated ? (<Dashboard setAuth={setAuth}/> ): (
              <Navigate to='/login'/>
            ) }></Route>
            <Route exact path='/newsfeed' element={(<Newsfeed/>)}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;