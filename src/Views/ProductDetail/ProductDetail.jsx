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
    const { loginUser } = useContext(ProductApi)


    const { idProduct } = useParams()
    const [showProducts, setShowProducts] = useState()

    const [pendingProducts, setPendingProducts] = useState(JSON.parse(localStorage.getItem("pendingProductsArray")))
    const [productCount, setProductCount] = useState()



    useEffect(() => {

        if (pendingProducts.length !== 0) {
            const isPendingArray = pendingProducts.find(product => product.name === idProduct)

            if (isPendingArray === undefined) {
                const selectedProduct = getAllProducts.find(product => product.name === idProduct)
                setShowProducts(selectedProduct)
            } else {

                setShowProducts(isPendingArray);
                console.log(isPendingArray);
            }


        } else {

            const selectedProduct = getAllProducts.find(product => product.name === idProduct)
            setShowProducts(selectedProduct)
            console.log('selectedProduct', selectedProduct.name);
        }

    }, [getAllProducts, pendingProducts])



    // const updateToOrder = (id) => {

    //     const changeOnlyProductCount = pendingProducts.map((product) => product.id === id ?
    //         { ...product, count: productCount, pending: true }
    //         : product
    //     )

    //     setPendingProducts(changeOnlyProductCount);
    //     localStorage.setItem('pendingProductsArray', JSON.stringify(changeOnlyProductCount))
    // }



    const handleCountChange = (id, count) => {
        setPendingProducts(prev => prev.map(product => product.id === id ?
            { ...product, count: Number(count) }
            : product
        )
        )
        setProductCount(count)
    }

    const addToOrder = (id) => {

        const searchProductToUpdate = getAllProducts.find((product) => product.id === id)
        // console.log('searchProductToUpdate', searchProductToUpdate);

        const repeatProduct = pendingProducts.some((product) => product.id === id)

        if (repeatProduct) {

            const changeOnlyProductCount = pendingProducts.map((product) => product.id === id ?
                { ...product, count: Number(productCount), pending: true }
                : product
            )


            setPendingProducts(changeOnlyProductCount);
            localStorage.setItem('pendingProductsArray', JSON.stringify(changeOnlyProductCount))


        } else {

            const addProductCount = [...pendingProducts,
            { ...searchProductToUpdate, count: Number(productCount), pending: true }]

            setPendingProducts(addProductCount);
            localStorage.setItem('pendingProductsArray', JSON.stringify(addProductCount))

        }
    }

    // const deleteOrderCount = () => {

    //     const deletedCount = pendingProducts.map(product =>
    //         product.id === showProducts.id
    //             ? { ...product, count: 0, pending: false }
    //             : product
    //     )

    //     setPendingProducts(deletedCount);
    //     localStorage.setItem('pendingProductsArray', JSON.stringify(deletedCount))
    // }




    const deleteOrder = (id) => {
        const deleteProductCountId = pendingProducts.filter((product) => product.id !== id)
        // console.log('chequeo si corre para ver proque no me marca 0', deleteProductCountId);
        // console.log('pendings', pendingProducts);

        // mergeProdFunc(showProducts)

        setPendingProducts(deleteProductCountId);
        localStorage.setItem('pendingProductsArray', JSON.stringify(deleteProductCountId))
    }



    return (
        <div className='mainCardComponent mt-5'>

            {loginUser &&
                <Greeting userName={loginUser.name} userRol={loginUser.rol} />
            }

            <div className='d-block d-lg-none'>
                <SearchBar />
            </div>

            {showProducts &&
                <div className='productDetailComponent mx-auto d-flex flex-column'>
                    <h4 className='pt-3'> {showProducts.name}</h4>

                    <div className='d-flex productDetailComponent_body my-5'>


                        <div className='productDetailComponent_body_image m-auto'>
                            <img src={showProducts.image} className='h-100 object-fit-contain' alt={`${showProducts.name} img`} />
                        </div>

                        {showProducts.pending && <span className='position-absolute top-0 end-0 badge bg-warning p-2 mt-1 me-1'>Pendiente</span>}

                        <div className="m-auto p-3">

                            <div className="w-100 d-flex flex-column align-items-start">

                                <h6>{showProducts.supplier.name}</h6>
                                <p>Codigo: {showProducts.code}</p>
                                <div className='w-100 d-flex justify-content-between'>
                                    <p>$ {showProducts.price}</p>
                                    <p>Stock: {showProducts.stock}</p>
                                </div>
                            </div>

                            <Form className='w-100 mt-2 d-flex justify-content-between'>
                                <Form.Control
                                    type="number"
                                    placeholder={showProducts.count}
                                    value={showProducts.count ?? 0}
                                    onChange={(e) => handleCountChange(showProducts.id, e.target.value)}
                                />
                                <Button type="button" variant='danger' className='ms-2' onClick={() => { deleteOrder(showProducts.id) }}>
                                    <span className="material-symbols-outlined">
                                        delete
                                    </span>
                                </Button>
                                <Button type="button" variant='dark' className='ms-2' onClick={() => { addToOrder(showProducts.id) }}>
                                    <span className="material-symbols-outlined">
                                        format_list_bulleted_add
                                    </span>
                                </Button>
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
