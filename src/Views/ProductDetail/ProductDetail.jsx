import React, { useContext, useEffect, useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './productDetail.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import NavBar from '../../Components/NavBar/NavBar';
import { DataProductApi } from '../../Context/DataBaseProductApi';
import Greeting from '../../Components/Greeting/Greeting';
import { ProductApi } from '../../Context/ProductControlApi';

const ProductDetail = () => {
    const { getAllProducts } = useContext(DataProductApi)
    const { loginUser, setLoginUser } = useContext(ProductApi)


    const { idProduct } = useParams()
    const [showProduct, setShowProduct] = useState()

    const [pendingProducts, setPendingProducts] = useState(loginUser.userPendingProd ?? [])
    const [inputCount, setInputCount] = useState('')



    useEffect(() => {

        if (pendingProducts.length !== 0) {
            const isPendingArray = pendingProducts.find(product => product.name === idProduct)

            if (isPendingArray === undefined) {
                const selectedProduct = getAllProducts.find(product => product.name === idProduct)
                setShowProduct(selectedProduct)
                // console.log(selectedProduct);

            } else {

                setShowProduct(isPendingArray);
                //   console.log(isPendingArray);
            }
        }

    }, [getAllProducts, pendingProducts])


    const addToOrder = (id, count) => {

        const cantidad = Number(count)
        const product = getAllProducts.find(p => p.id === id)

        if (!product) return
        if (!Number.isInteger(cantidad) || cantidad <= 0) return alert('Ingresá una cantidad válida')
        if (cantidad > product.stock) return alert(`Solo hay ${product.stock} en stock`)

        // console.log(product.name);
        const exists = pendingProducts.some(p => p.id === id)
        //  console.log(exists);


        const productMerged = exists
            ? pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)
            : [...pendingProducts, { ...product, count: cantidad, pending: true }]

        savePending(productMerged)
        //    console.log('productMerged', productMerged);

    }


    const savePending = (newPending) => {
        const updatedUser = { ...loginUser, userPendingProd: newPending }
        setPendingProducts(newPending)
        setLoginUser(updatedUser)                                   // actualiza la app
        localStorage.setItem('userPass', JSON.stringify(updatedUser)) // persiste
    }


    const deleteOrder = (id) => {
        const newPending = pendingProducts.filter(p => p.id !== id)
        savePending(newPending)

    }


    return (
        <div className='mainCardComponent mt-3'>
            <section className='fixed-top headerComponent'>

                {loginUser !== null &&
                    <Greeting userName={loginUser.name} userRol={loginUser.rol} />
                }

                <div className='d-block d-lg-none'>
                    <SearchBar />
                </div>
            </section>

            {showProduct &&
                <div className='productDetailComponent mx-auto d-flex flex-column position-relative rounded'>
                    <h4 className='pt-3'> {showProduct.name}</h4>

                    <div className='d-flex productDetailComponent_body mb-3'>


                        <div className='productDetailComponent_body_image m-auto'>
                            <img src={showProduct.image} className='h-100 object-fit-contain' alt={`${showProduct.name} img`} />
                        </div>

                        {showProduct.pending && <span className='position-absolute top-0 end-0 badge bg-warning p-2 mt-1 me-1'>Pendiente</span>}

                        <div className="m-auto p-3">

                            <div className="w-100 d-flex flex-column align-items-start">

                                <h6>{showProduct.supplier.name}</h6>
                                <p>Codigo: {showProduct.code}</p>
                                <div className='w-100 d-flex justify-content-between'>
                                    <p>$ {showProduct.price}</p>
                                    <p>Stock: {showProduct.stock}</p>
                                </div>
                            </div>

                            <Form className='d-flex flex-column mt-2'>
                                <Form.Control
                                    type="number"
                                    placeholder={showProduct.count}
                                    value={inputCount}
                                    onChange={(e) => setInputCount(e.target.value)}
                                />
                                <section className='d-flex mt-3'>
                                    <Button type="button" variant='danger' className='w-50 me-2' onClick={() => { deleteOrder(showProduct.id) }}>
                                        <span className="material-symbols-outlined">
                                            delete
                                        </span>
                                    </Button>

                                    <Button variant="primary" className='w-50' onClick={() => { addToOrder(showProduct.id, inputCount); setInputCount(''); }}>
                                        <span className="material-symbols-outlined">
                                            format_list_bulleted_add
                                        </span>
                                    </Button>
                                </section>
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
