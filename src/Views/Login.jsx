import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Login = () => {
    return (
        <div>
            <h1>Login</h1>
            <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Usuario" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Password" />
                </Form.Group>

                <Button variant="primary" type="submit">
                    Ingresar
                </Button>
            </Form>
        </div>
    )
}

export default Login
