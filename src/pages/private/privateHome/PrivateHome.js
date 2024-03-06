import React from 'react'

export default function PrivateHome() {
    console.log("HomePrivate");
    return (
        <div className='container p-5 text-center '>
            <h1 className="display-2  p-4 text-light">Bienvenue dans la page home privée</h1>
            <iframe src="https://giphy.com/embed/L2Fg6q65QKqchwTxDF" width="480" height="480" class="giphy-embed" allowFullScreen></iframe>
        </div>
    )
}
