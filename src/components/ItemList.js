import React from 'react';

import Item from './Item';

const ItemList = ({data, openItemDialog}) => {    
    return (
            data.map((item) => 
                    <Item key={item.id} item={item} openItemDialog={openItemDialog}/>
            )
    );
};

export default ItemList;