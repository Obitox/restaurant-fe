import React from 'react'

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function RegisterForm({handleSubmit, handleChange}) {
    return (
        <Form>
            <Form.Group controlId="formBasicEmail">
                <Form.Label>Email adresa</Form.Label>
                <Form.Control type="email" name="email" placeholder="Unesite vašu email adresu" onChange={handleChange}/>
                <Form.Text className="text-muted">
                    Nikad nećemo deliti vaš email sa bilo kim drugim :)
                </Form.Text>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Lozinka</Form.Label>
                <Form.Control type="password" name="password" placeholder="Unesite vašu lozinku" onChange={handleChange}/>
            </Form.Group>
            <Form.Group controlId="formBasicPassword">
                <Form.Label>Potvrda lozinke</Form.Label>
                <Form.Control type="password" name="confirmed_password" placeholder="Unesite ponovo vašu lozinku" onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Korisničko ime</Form.Label>
                <Form.Control type="text" name="username" placeholder="Unesite vaše korisničko ime" onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Ime</Form.Label>
                <Form.Control type="text" name="firstName" placeholder="Unesite vaše ime" onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Prezime</Form.Label>
                <Form.Control type="text" name="lastName" placeholder="Unesite vaše prezime" onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Adresa</Form.Label>
                <Form.Control type="text" name="address" placeholder="Unesite vašu adresu" onChange={handleChange}/>
            </Form.Group>
            <Form.Group>
                <Form.Label>Alternativna adresa</Form.Label>
                <Form.Control type="text" name="address_alt" placeholder="Unesite vašu adresu" onChange={handleChange}/>
                <Form.Text className="text-muted">
                    Ovo polje je opcionalno
                </Form.Text>
            </Form.Group>
            <Form.Group>
                <Form.Label>Broj telefona</Form.Label>
                <Form.Control type="text" name="phone" placeholder="Unesite vaš broj telefona" onChange={handleChange}/>
            </Form.Group>
            <Button variant="primary" type="submit" onClick={handleSubmit}>
                Potvrdi
            </Button>
        </Form> 
    )
}

export default RegisterForm
