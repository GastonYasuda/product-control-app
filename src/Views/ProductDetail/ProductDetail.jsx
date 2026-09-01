import React, { useEffect } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './productDetail.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import NavBar from '../../Components/NavBar/NavBar';

const ProductDetail = () => {
    const { idProduct } = useParams()
    //si idProduct no existe en el array de ptroductos, tiene que tirar error, producto no encontrado


    useEffect(() => {
        console.log(`yo soy ${idProduct}`);

    }, [])


    return (
        <div className='mt-5'>
            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>
            <h1 className='mt-5'> {idProduct}</h1>

            <div className='w-75 productDetailComponent rounded mt-5 mx-auto d-flex'>
                <div className='w-50'>
                    <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='w-75' alt="Vaso de vidrio img" />
                </div>
                <div className="m-auto p-3">
                    <div className="w-100 d-flex flex-column align-items-start">

                        <h4> {idProduct}</h4>
                        <h6>Rigolleau</h6>
                        <p>Codigo: FS008693</p>
                        <div className='w-100 d-flex justify-content-between'>
                            <p>$ 55555</p>
                            <p>Stock: 53u.</p>
                        </div>
                    </div>

                    <Form className='w-100 mt-4 d-flex justify-content-between'>
                        <Form.Control
                            type="number"
                            placeholder="0"
                        />
                        <Button type="submit" variant='danger' className='ms-2'>
                            <span className="material-symbols-outlined">
                                delete
                            </span>
                        </Button>
                        <Button type="submit" variant='dark' className='ms-2'>
                            <span className="material-symbols-outlined">
                                format_list_bulleted_add
                            </span>
                        </Button>
                    </Form>
                </div>
            </div>
            <NavBar />
        </div>
    )
}

export default ProductDetail
