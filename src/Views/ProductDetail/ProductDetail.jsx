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
            <SearchBar />

            <h1 className='my-3'> {idProduct}</h1>

            <div className='productDetailComponent mt-3 mx-auto'>
                <img src="https://www.oscarbarbieri.com/media/catalog/product/cache/09bfecd8b17db51cfea360c7940343e7/v/a/vaso7_1.jpg" className='w-100' alt="Vaso de vidrio img" />

                <div className=" m-auto p-3">
                    <div className="w-100 d-flex flex-column align-items-start">

                        <span>Rigolleau</span>
                        <div className='w-100 d-flex justify-content-between'>
                            <p>$ 55555</p>
                            <p>Stock: 53u.</p>
                        </div>
                    </div>

                    <Form className='w-100 mt-3 d-flex justify-content-between'>
                        <Form.Control
                            type="number"
                            placeholder="0"
                        />
                        <Button type="submit" variant='danger' className='ms-2'>
                            <span class="material-symbols-outlined">
                                delete
                            </span>
                        </Button>
                        <Button type="submit" variant='dark' className='ms-2'>
                            <span class="material-symbols-outlined">
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
