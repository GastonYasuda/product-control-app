import React, { useContext, useEffect, useState } from 'react'
import { Button, Card, Col, Row, Form, Spinner } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { DataProductApi } from '../../Context/DataBaseProductApi'
import { ProductApi } from '../../Context/ProductControlApi'
import ProductCardComponentDetail from '../ProductCardComponentDetail/ProductCardComponentDetail'


const DetailElementComponent = ({ detailElementName, from }) => {

    const { getAllProducts } = useContext(DataProductApi)
    const { orderByName, loginUser, setLoginUser } = useContext(ProductApi)

    const [productCount, setProductCount] = useState()
    const [detailElement, setDetailElement] = useState([])
    const [pendingProducts, setPendingProducts] = useState(loginUser.userPendingProd ?? [])
    const [showProducts, setShowProducts] = useState([])


    useEffect(() => {

        if (from === 'category') {
            const selectedCategory = getAllProducts.filter(prod => prod.category.name === detailElementName)
            setDetailElement(selectedCategory);
            console.log(selectedCategory);
            mergeProdFunc(selectedCategory)



        } else if (from === 'supplier') {
            console.log('from', from);

            const selectedSupplier = getAllProducts.filter(prod => prod.supplier.name === detailElementName)
            setDetailElement(selectedSupplier);
            console.log(selectedSupplier);
            mergeProdFunc(selectedSupplier)

        } else if (from === 'orderList') {

            const getArray = pendingProducts.flatMap(userProduct =>
                getAllProducts.filter(product => product.id === userProduct.id)
                    .map(product => ({
                        ...product,
                        count: userProduct.count,
                        pending: userProduct.pending
                    }))
            )
            console.log(getArray);

            setShowProducts(getArray)

        }


    }, [getAllProducts, detailElementName, pendingProducts])


    const mergeProdFunc = (array1) => {

        if (from === 'category') {

            const pendingProductsByCategory = pendingProducts.filter(pendingProd => pendingProd.category.name === detailElementName)
            //   console.log(pendingProductsByCategory);
            // console.log(array1);

            const mergedProducts = [
                ...new Map(
                    [...array1, ...pendingProductsByCategory].map(product => [product.id, product])
                ).values()
            ];
            // console.log('mergedProducts2', mergedProducts);

            setShowProducts(orderByName(mergedProducts))

        } else if (from === 'supplier') {

            const pendingProductsBySupplier = pendingProducts.filter(pendingProd => pendingProd.supplier.name === detailElementName)

            const mergedProducts = [
                ...new Map(
                    [...array1, ...pendingProductsBySupplier].map(product => [product.id, product])
                ).values()
            ];
            console.log('mergedProducts2', mergedProducts);

            setShowProducts(orderByName(mergedProducts))
        }

    }


    const addToOrder = (id, count) => {

        const cantidad = Number(count)
        const product = getAllProducts.find(p => p.id === id)

        if (!product) return
        if (!Number.isInteger(cantidad) || cantidad <= 0) return alert('Ingresá una cantidad válida')
        if (cantidad > product.stock) return alert(`Solo hay ${product.stock} en stock`)

        console.log(product.name);
        const exists = pendingProducts.some(p => p.id === id)
        console.log(exists);


        const productMerged = exists
            ? pendingProducts.map(p => p.id === id ? { ...p, count: cantidad, pending: true } : p)
            : [...pendingProducts, { ...product, count: cantidad, pending: true }]

        savePending(productMerged)
        console.log('productMerged', productMerged);

        console.log(detailElement);



        const searchProductArrayUpdated = detailElement.map(p =>
            productMerged.find(pp => pp.id === p.id) ?? p
        )
        console.log('searchProductArrayUpdated', searchProductArrayUpdated);

        setShowProducts(orderByName(searchProductArrayUpdated))

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

        setShowProducts(orderByName(
            detailElement.map(p =>
                newPending.find(pp => pp.id === p.id)      // si sigue pendiente, la versión pendiente
                ?? getAllProducts.find(gp => gp.id === p.id) // si no, la versión limpia
                ?? p
            )
        ))

    }



    return (


        <Row xs={2} md={4} className="productsCardContainer g-4  mx-auto justify-content-center" >

            {showProducts.map((product, i) => (
                <ProductCardComponentDetail product={product} key={product.id} deleteOrder={deleteOrder} addToOrder={addToOrder} />
                // <Col key={i}>
                //     <Card className="w-100 h-100 d-flex justify-content-between">
                //         {product.pending && <span className='position-absolute top-0 end-0 badge bg-warning p-2 mt-1 me-1'>Pendiente</span>}

                //         <Link to={`/product/${product.name}`}>
                //             <div className='w-100 m-auto homeCardImage'>
                //                 <img src={product.image} className='w-100 h-100 object-fit-contain' alt={`${product.name} img`} />
                //             </div>
                //         </Link>

                //         <Card.Body className='d-flex flex-column justify-content-between'>
                //             <div className='text-start d-flex flex-column'>
                //                 <div>
                //                     <h6>{product.name}</h6>
                //                     <p>{product.supplier.name}</p>
                //                 </div>
                //             </div>

                //             <div>
                //                 <div className='w-100 d-flex flex-column justify-content-between'>
                //                     <span className='text-start'>Cod: {product.code}</span>
                //                     <section className='d-flex justify-content-between'>
                //                         <span className='fw-semibold'>${product.price}</span>
                //                         <span>Stock: {product.stock}</span>
                //                         {/* <span>{product.count}</span> */}
                //                     </section>
                //                 </div>

                //                 <Form className='d-flex flex-column mt-2'>

                //                     <Form.Control
                //                         type="number"
                //                         className='mb-3'
                //                         placeholder={product.count}
                //                         onChange={(e) => handleCountChange(showProducts.id, e.target.value)}
                //                     />
                //                     <section className='d-flex justify-content-between'>
                //                         <Button type="button" variant='danger' onClick={() => { deleteOrder(product.id) }}>
                //                             <span className="material-symbols-outlined">
                //                                 delete
                //                             </span>
                //                         </Button>

                //                         <Button type="button" variant='dark' onClick={() => { addToOrder(product.id) }} >
                //                             <span className="material-symbols-outlined">
                //                                 format_list_bulleted_add
                //                             </span>
                //                         </Button>
                //                     </section>
                //                 </Form>
                //             </div>
                //         </Card.Body>
                //     </Card>
                // </Col>
            ))
            }
        </Row>


    )
}

export default DetailElementComponent
