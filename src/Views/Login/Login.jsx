import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'

const Login = () => {
    return (
        <div className='loginContainer'>
            <h1>Login</h1>

            <Form className='loginForm'>
                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="usuario"
                        className='loginFormInput'
                    />
                    <label htmlFor="floatingInputCustom">Usuario</label>
                </Form.Floating>

                <Form.Floating>
                    <Form.Control
                        id="floatingPasswordCustom"
                        type="password"
                        placeholder="Password"
                        className='loginFormInput'
                    />
                    <label htmlFor="floatingPasswordCustom">Contraseña</label>
                </Form.Floating>

                <Form.Group className="mt-4 loginFormCheckBox" controlId="formBasicCheckbox">
                    <Form.Check type="checkbox" label="Recordar Login" />
                </Form.Group>

                <Button variant="dark" type="submit" className='loginFormButton'>
                    Ingresar
                </Button>
            </Form>
        </div>
    )
}

export default Login
