import React from 'react';

import Nav from 'react-bootstrap/Nav';

function Category({id, title, categorySelect}) {    
    return (
        <Nav.Link eventKey="link-1" onClick={() => categorySelect(id)}>{title}</Nav.Link>
    )
}

export default Category
