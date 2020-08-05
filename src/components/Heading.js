import React from 'react'

import img from '../assets/logo.png';
import { faUserCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from 'react-router-dom';

function Heading({username}) {
    
    let display = (
        <div className="heading-logged-out">
            <Link to="/login">Prijava</Link>
            <Link to="/register">Registracija</Link>
            <button>Korpa</button>
        </div>
    );

    if(username !== undefined)
        display = (
            <div className="heading-logged-in">
                <FontAwesomeIcon icon={faUserCircle} size="2x"/>
                <p>{username}</p>
                <button>Korpa</button>
            </div>
        );

    return (
        <div className="heading">
            <img src={img} alt="logo"></img>
            {display}
        </div>
    )
}

export default Heading
