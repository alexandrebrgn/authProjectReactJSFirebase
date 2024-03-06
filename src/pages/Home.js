import React , {useContext} from "react";
import { UserContext } from "../context/userContext";

export default function Home() {

    const {currentUser} = useContext(UserContext)
    // Le fait d'entourer currentUser de {} fait qu'on récupère bien le currentUser de UserContext présent dans
    // les value de <UserContext.Provider>, si il n'y est pas rensigné il est irrécupérable,
    // Si on ne met pas les {} on récupère un tableau des léments dans le value, et dans ce cas ce que je veux est currentUser.currentUser
    // Si on met dans les {} un nom qui n'est pas présent dans le contexte UserContext, react ne trouvera pas

    console.log(currentUser)
    return (
        <div className="container p-5 text-center">
            <h1 className="display-5 text-light text-center">
                {currentUser ? "Bienvenue "+currentUser.email : "Bonjour, connectez-vous ou créez un compte !"}
            </h1>
        </div>
    )
}