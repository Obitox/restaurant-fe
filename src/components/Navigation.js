import React from 'react'

import Nav from 'react-bootstrap/Nav'

function Navigation() {
    return (
        <div className="nav-menu">
           <Nav defaultActiveKey="/home" as="ul">
                <Nav.Item as="li">
                    <Nav.Link href="/home">Home</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="link-1">Način plaćanja</Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                    <Nav.Link eventKey="link-2">Lokacije</Nav.Link>
                </Nav.Item>
            </Nav>
        </div>
    )
}

export default Navigation 