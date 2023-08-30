import { useState } from 'react';
import { getUser } from '../../utilities/users-service'

import './App.css';
import NavBar from '../../components/NavBar/NavBar'
import AuthPage from '../AuthPage/AuthPage'
import NotesListPage from '../NotesListPage/NotesListPage'

export default function App() {

  const [user, setUser] = useState(getUser())

  return (
    <main className="App">
      { user ?
        <>
          <NavBar user={user} setUser={setUser} />
          <NotesListPage />
        </>
          :
          <AuthPage setUser={setUser} />
      }
    </main>
  );
}