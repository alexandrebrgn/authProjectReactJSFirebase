import React, {useContext} from 'react'
import { UserContext } from '../context/userContext'
import { Link } from 'react-router-dom' 
import { signOut } from 'firebase/auth' // Méthode de deconnexion
import { useNavigate } from 'react-router-dom' // Permettre la redirection
import { auth } from '../firebase-config' // S'identifier depuis firebase-config.js pour les méthode firebase

export default function Navbar() {
  const {currentUser} = useContext(UserContext)
  const {toggleModals} = useContext(UserContext)

  console.log("Navbar :", currentUser)

  const navigate = useNavigate();

  const logOut = async () => {
    try {
      await signOut(auth)
      navigate("/")
    } catch (err) {
      alert("Erreur : impossible de déconnecter l'utilisateur, vérifiez votre connexion internet!")
    }
  }

  return (
    <nav className="navbar navbar-light bg-light px-4">
      <Link to="/" className="navbar-brand">
      AuthJS
      </Link>

      <div>
        { currentUser && 
        <div>
          <button className='btn btn-secondary '>{currentUser.email}</button>
          <button className="btn btn-danger ms-2" onClick={logOut}>
            Se déconnecter
          </button>
        </div>
        }
        { !currentUser &&
        <div>
          <button className="btn btn-primary" onClick={() => toggleModals("signUp")}>
          Créer un compte
          </button>
          <button className="btn btn-primary ms-2" onClick={() => toggleModals("signIn")}>
            Se connecter
          </button>
        </div>
        }
      </div>
    </nav>
  )
}
