import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function SignUpModel() {
    const { modalState, toggleModals, signUp } = useContext(UserContext)

    const navigate = useNavigate();
    
    const formRef = useRef()
    const inputs = useRef([])
    const addInputs = el => {
        if (el && !inputs.current.includes(el)) {
            inputs.current.push(el)
        }
    }

    const [validation, setValidation] = useState("");
    const handleForm = async e => {
        e.preventDefault()

        if((inputs.current[1].value.length || inputs.current[2].value.length) < 6) {
            setValidation("Le mot de passe contient moins de 6 charactères !")
            return;
        }
        else if ((inputs.current[1].value !== inputs.current[2].value)) {
            setValidation("Les mot de passe ne correspondent pas !")
            return;
        }

        try {
            await signUp(
                inputs.current[0].value,
                inputs.current[1].value
            )
            formRef.current.reset();
            setValidation("");
            toggleModals("close")
            navigate("/private/private-home")
        } catch (err) {
            if (err.code === "auth/invalid-email") {
                setValidation("Format invalide d'adresse email !")
            }

            if(err.code === "auth/email-already-in-use") {
                setValidation("Adresse email déjà utilisée")
            }
        }
    }

    const closeModals = () => {
        setValidation("");
        toggleModals("close")
    }

    return (
        <>
            { modalState.signUpModal && (
                <div className="position-fixed top-0 vw-100 vh-100">
                    <div className="w-100 h-100 bg-dark bg-opacity-75" onClick={closeModals}></div>
                        <div className="position-absolute top-50 start-50 translate-middle z-3 " style={{ minWidth: "400px" }}>
                            <Modal.Dialog className='bg-light p-4'>{/* Problème, le css de base ne s'applique pas, pas de padding etc => espacement du titre et du bouton pas effectué */}

                                <Modal.Header> 
                                    <Modal.Title>Créer un compte</Modal.Title>
                                    <button onClick={closeModals} className="position-absolute start-100 translate-middle-x  btn-close"></button>
                                </Modal.Header>

                                <Modal.Body>
                                    <form ref={formRef} className="sign-up-form" onSubmit={handleForm}>
                                        <div className="mb-3">
                                            <label htmlFor="signUpEmail" className="form-label">Adresse email</label>
                                            <input ref={addInputs} className="form-control" type="email" name="email" required id="signUpEmail"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="signUpPwd" className="form-label">Mot de passe</label>
                                            <input ref={addInputs} className="form-control" type="password" name="pwd" required id="signUpPwd"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="confirmPwd" className="form-label">Confirmer le Mot de passe</label>
                                            <input ref={addInputs} className="form-control" type="password" name="confirmPwd" required id="confirmPwd"></input>
                                        </div>
                                        <p className="text-danger mt-1">{validation}</p>
                                        <button className="btn btn-primary">Valider </button>
                                    </form>
                                </Modal.Body>

                                <Modal.Footer>

                                </Modal.Footer>

                            </Modal.Dialog>
                        </div>
                    <script src="bootstrap.min.js" />
                </div>
            )}
        </>
    )
}
