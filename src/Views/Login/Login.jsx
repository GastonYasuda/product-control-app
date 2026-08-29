import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'

const Login = () => {
    return (
        <div className='loginContainer'>
            <h2>Login</h2>
            <Form className='loginForm'>
                <Form.Group className="mb-4 loginFormInput" controlId="formBasicEmail">
                    <Form.Control type="text" placeholder="Usuario" autoComplete="username" />
                </Form.Group>

                <Form.Group className="mb-5 loginFormInput" controlId="formBasicPassword">
                    <Form.Control type="password" placeholder="Contraseña" autoComplete="current-password"
                    />
                </Form.Group>

                <Form.Group className="mb-3 loginFormCheckBox" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recordar Login" />
                </Form.Group>

                <Button variant="primary" type="submit" className='loginFormButton'>
                    Ingresar
                </Button>
            </Form>
        </div>
    )
}

export default Login
