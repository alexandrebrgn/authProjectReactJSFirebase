import { createContext, useEffect, useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase-config";

// Contexte
export const UserContext = createContext()

// Contexte d'ordre supérieur
export function UserContextProvider(props) {

    // ______User_______
    const signUp = (email, pwd) => createUserWithEmailAndPassword(auth, email, pwd) 
    // signUp est une constante, elle prendra en valeur la valeur de retour de la fonction flêchée, 
    // qui retorunera le résultat de createUserWithEmailAndPassword(auth, email, pwd), 
    // elle a besoin de email et pwd qui sont déclarés lors de son appel 
    // ex : SignUpModal.js (l.33- l.36) 
    // const cred = await signUp(
    //   inputs.current[0].value,
    //   inputs.current[1].value
    // )

    const signIn = (email, pwd) => signInWithEmailAndPassword(auth, email, pwd)
    // Pareil que signUp

    const [currentUser, setCurrentUser] = useState();
    // currentUser sera utilisé pour stocker les données de l'utilisateurs, en général après communication avec firebase

    const [loadingData, setLoadingData] = useState(true);
    // loadingData sera utilisé pour contrer les problème d'asynchrone des requêtes avec firebase,
    // Ex : si loadingData est true (je lui donne false quand les donées sont récupérées (l.36-l.37)),
    // Alors afficher les props.children 

    // le useEffect est sensé être effectué à chaque 
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            console.log("User reçu par firebase :", user)
            setCurrentUser(user)
            setLoadingData(false)
        })

        return unsubscribe;
    }, [])

    // ________Modals_________

    const [modalState, setModalState] = useState({
        signUpModal: false,
        signInModal: false
    })
    // modaleState est un tableau de deux booléen pour afficher les fenetres modales de connexion (SignInModal) et d'inscription (SignUpModal)

    const toggleModals = modal => {
        if (modal === "signIn") {
            setModalState({
                signUpModal: false,
                signInModal: true
            })
        }
        if (modal === "signUp") {
            setModalState({
                signUpModal: true,
                signInModal: false
            })
        }
        if (modal === "close") {
            setModalState({
                signUpModal: false,
                signInModal: false
            })
        }
        console.log("signUp :",modalState.signUpModal , ", signIn :", modalState.signInModal)
    }
    // On passe une valeur nommé modal à toggleModals, et en fonction de l'argument, elle va changer les booleens de modalState

    console.log("User stocké :", currentUser); // affiché lorsque toggleModals appelé
    return (
        <UserContext.Provider value={{ modalState, toggleModals, signUp, currentUser, signIn }}> 
        {/* Les value qu'on donne ici, sont les éléments de UserContextProvider qu'on autorise à utilise autre part :
            Ex : Une erreur que je ne comprenais pas : dans Private.js : currentUser était toujours "undefined", 
            malgré qu'il soit bien existant dans UserContextProvider ce qui faisait que je restais bloqué*/}
            {!loadingData && props.children}
        </UserContext.Provider>
    )
}