import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import users from '../../../public/users.json'
import { useNavigate } from 'react-router-dom';
import { ProductApi } from '../../Context/ProductControlApi';

const Login = () => {


    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const [password, setPassword] = useState('')




    const handleSubmit = (e) => {
        e.preventDefault()

        console.log('Usuario:', user)
        console.log('Password:', password)

        const validateUserPass = users.find(eachUser => eachUser.name === user && eachUser.pass === password)
        console.log(validateUserPass);

        if (validateUserPass) {
            localStorage.setItem('userPass', JSON.stringify(validateUserPass))
            navigate('/')
        }

    }

    return (
        <div className='loginContainer m-auto rounded'>
            <h1>Login</h1>

            <Form className='loginForm' onSubmit={handleSubmit}>

                <Form.Floating className="mb-3">
                    <Form.Control
                        id="floatingInputCustom"
                        type="text"
                        placeholder="usuario"
                        className='loginFormInput'
                        autoComplete='username'
                        value={user}
                        onChange={(e) => setUser(e.target.value)}
                    />
                    <label htmlFor="floatingInputCustom">
                        Usuario
                    </label>
                </Form.Floating>

                <Form.Floating>
                    <Form.Control
                        id="floatingPasswordCustom"
                        type="password"
                        placeholder="Password"
                        className='loginFormInput'
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label htmlFor="floatingPasswordCustom">
                        Contraseña
                    </label>
                </Form.Floating>

                <Form.Group
                    className="mt-4 loginFormCheckBox"
                    controlId="formBasicCheckbox"
                >
                    <Form.Check
                        type="checkbox"
                        label="Recordar Login"
                    />
                </Form.Group>

                <Button
                    variant="dark"
                    type="submit"
                    className='loginFormButton'
                >
                    Ingresar
                </Button>

            </Form>
        </div>
    )
}

export default Login
