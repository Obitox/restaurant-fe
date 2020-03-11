import React from 'react';

import Item from './Item';

const ItemList = ({data}) => {    
    return (
            data.map((item) => 
                <Item key={item.itemId} id={item.itemId} title={item.title} />
            )
    );
};

export default ItemList;