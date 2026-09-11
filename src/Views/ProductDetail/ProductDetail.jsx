import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './productDetail.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import NavBar from '../../Components/NavBar/NavBar';
import { DataProductApi } from '../../Context/DataBaseProductApi';
import Greeting from '../../Components/Greeting/Greeting';

const ProductDetail = () => {
    const { getAllProducts } = useContext(DataProductApi)

    const { idProduct } = useParams()
    const [product, setProduct] = useState({})


    useEffect(() => {
        const selectedProduct = getAllProducts.find(product => product.name === idProduct)
        setProduct(selectedProduct)

    }, [getAllProducts])


    return (
        <div className='mainCardComponent mt-5'>

            <Greeting userName={'Gaston'} userRol={'Salon'} />

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            {product &&
                <div className='productDetailComponent mx-auto d-flex flex-column'>
                    <h4 className='pt-3'> {product.name}</h4>

                    <div className='d-flex productDetailComponent_body my-5'>


                        <div className='productDetailComponent_body_image m-auto'>
                            <img src={product.image} className='h-100 object-fit-contain' alt={`${product.name} img`} />
                        </div>

                        {product.pending && <span>Pendiente</span>}

                        <div className="m-auto p-3">

                            <div className="w-100 d-flex flex-column align-items-start">

                                <h6>{product.supplier}</h6>
                                <p>Codigo: {product.code}</p>
                                <div className='w-100 d-flex justify-content-between'>
                                    <p>$ {product.price}</p>
                                    <p>Stock: {product.stock}</p>
                                </div>
                            </div>

                            <Form className='w-100 mt-2 d-flex justify-content-between'>
                                <Form.Control
                                    type="number"
                                    placeholder="0"
                                />
                                {product.pending ?
                                    <Button type="submit" variant='danger' className='ms-2'>
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span>
                                    </Button>
                                    :
                                    <Button type="submit" variant='dark' className='ms-2'>
                                        <span className="material-symbols-outlined">
                                            format_list_bulleted_add
                                        </span>
                                    </Button>
                                }
                            </Form>
                        </div>
                    </div>

                </div >
            }


            <NavBar />
        </div >
    )
}

export default ProductDetail
