import React from 'react';

const Item = ({id, title}) => {
    return (
        <div>
           <p>{id}</p> 
           <p>{title}</p> 
        </div>
    );
};

export default Item;