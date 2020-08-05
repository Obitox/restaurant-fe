import React from 'react';

import { faDrumstickBite } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import Button from 'react-bootstrap/Button';

const Item = ({item, openItemDialog}) => {
    return (
        <div className="item">
            <FontAwesomeIcon icon={faDrumstickBite} size="6x"/>
            <p>{item.itemId}</p> 
            <p>{item.title}</p> 
            <Button onClick={() => openItemDialog(item)}>Dodaj u korpu</Button>
        </div>
    );
};

export default Item;