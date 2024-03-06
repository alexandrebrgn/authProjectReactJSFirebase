import React, { useContext, useRef, useState } from 'react'
import { UserContext } from '../context/userContext'
import { Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

export default function SignInModel() {
    const { modalState, toggleModals, signIn } = useContext(UserContext)

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

        try {
            const cred = await signIn(
                inputs.current[0].value,
                inputs.current[1].value
            )
            formRef.current.reset();
            setValidation("");
            toggleModals("close");
            navigate("/private/private-home");
        } catch (err) {
            console.dir(err)
            setValidation("Combinaison email/mot de passe incorrecte")
        }
    }

    const closeModals = () => {
        setValidation("");
        toggleModals("close")
    }

    return (
        <>
            { modalState.signInModal && (
                <div className="position-fixed top-0 vw-100 vh-100">
                    <div className="w-100 h-100 bg-dark bg-opacity-75" onClick={closeModals}></div>
                        <div className="position-absolute top-50 start-50 translate-middle z-3 " style={{ minWidth: "400px" }}>
                            <Modal.Dialog className='bg-light p-4'>{/* Problème, le css de base ne s'applique pas, pas de padding etc => espacement du titre et du bouton pas effectué */}

                                <Modal.Header> 
                                    <Modal.Title>Se connecter</Modal.Title>
                                    <button onClick={closeModals} className="btn-close position-absolute start-100 translate-middle-x "></button>
                                </Modal.Header>

                                <Modal.Body>
                                    <form ref={formRef} className="sign-up-form" onSubmit={handleForm}>
                                        <div className="mb-3">
                                            <label htmlFor="signInEmail" className="form-label">Adresse email</label>
                                            <input ref={addInputs} className="form-control" type="email" name="email" required id="signInEmail"></input>
                                        </div>
                                        <div className="mb-3">
                                            <label htmlFor="signInPwd" className="form-label">Mot de passe</label>
                                            <input ref={addInputs} className="form-control" type="password" name="pwd" required id="signInPwd"></input>
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
