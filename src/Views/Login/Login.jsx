import React, { useContext, useEffect, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './login.css'
import { useNavigate } from 'react-router-dom';
import { ProductApi } from '../../Context/ProductControlApi';

const Login = () => {

    const { getUsersData, loginUser } = useContext(ProductApi)


    const [user, setUser] = useState('')
    const navigate = useNavigate()
    const [password, setPassword] = useState('')

    useEffect(() => {

        if (loginUser !== null) {
            loginUser.length !== 0 ? navigate('/home') : navigate('/login')
        } else {
            localStorage.setItem('userPass', JSON.stringify([]))
        }
        console.log(loginUser);

    }, [loginUser])


    const handleSubmit = (e) => {
        e.preventDefault()
        getUsersData(user, password)

        // console.log('Usuario:', user)
        // console.log('Password:', password)
        loginUser.length > 0 && navigate('/home')

    }

    return (
        <div className='loginContainer mx-auto mt-5 rounded'>
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

                <Button
                    variant="secondary"
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
