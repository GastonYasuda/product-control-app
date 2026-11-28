import React, { useContext, useEffect, useState } from 'react'
import { Button, Form, Spinner } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import './productDetail.css'
import SearchBar from '../../Components/SearchBar/SearchBar';
import { DataProductApi } from '../../Context/DataBaseProductApi';
import Greeting from '../../Components/Greeting/Greeting';
import { ProductApi } from '../../Context/ProductControlApi';
import Swal from 'sweetalert2'
import { toast, Slide, ToastContainer } from 'react-toastify';
import NavBarMobile from '../../Components/NavBarMobile/NavBarMobile';


const ProductDetail = () => {
    const { getAllProducts } = useContext(DataProductApi)
    const { loginUser } = useContext(ProductApi)

    const { idProduct } = useParams()
    const [showProduct, setShowProduct] = useState()
    const [allPendings, setAllPendings] = useState()
    const [inputCount, setInputCount] = useState('')
    const [saving, setSaving] = useState(false)



    useEffect(() => {
        getUserPending()
        if (!getAllProducts.length || !idProduct) return;

        const storedUser = JSON.parse(
            localStorage.getItem("userPass") || "null"
        );

        const pendingOrders =
            storedUser?.pending_orders ??
            loginUser?.pending_orders ??
            [];

        setAllPendings(pendingOrders);


        const selectedProduct = getAllProducts.find(
            p => Number(p.product_id) === Number(idProduct)
        );

        if (!selectedProduct) {
            setShowProduct(undefined);
            setInputCount('');
            return;
        }


        const pendingProduct = pendingOrders.find(
            p => Number(p.product_id) === idProduct
        );

        if (pendingProduct) {

            setShowProduct({
                ...selectedProduct,
                product_count: pendingProduct.pending_order_quantity,
                pending: true,
            });

            setInputCount('');

        } else {
            setShowProduct({
                ...selectedProduct,
                product_count: 0,
                pending: false,
            });

            setInputCount('');
        }
    }, [getAllProducts, idProduct, loginUser]);


    const handleAdd = async () => {

        setSaving(true);
        const ok = await addToOrder(showProduct.product_id, inputCount);
        setSaving(false);
        if (ok) setInputCount('');   // solo limpia si se guardó bien

    };


    const getUserPending = async () => {

        try {
            const response = await fetch(`https://product-control-back.onrender.com/users/${loginUser.user_id}/pending`)
            if (response.ok) {
                const data = await response.json()
                // console.log(data);
                setAllPendings(data)

            } else {
                throw new Error("Error al intentar obtener usuario");
            }
        }
        catch (error) {
            console.error(error)
        }
    }


    const addToOrder = async (id_product, count) => {
        const quantity = Number(count);

        if (!Number.isInteger(quantity) || quantity <= 0) {
            Swal.fire("Atención", "Ingresá una cantidad válida", "warning");
            return false;
        }

        const product = getAllProducts.find(
            p => Number(p.product_id) === Number(id_product)
        );

        if (!product) {
            Swal.fire("Error", "No se encontró el producto", "error");
            return false;
        }

        if (quantity > product.product_stock) {
            Swal.fire(
                "Atención",
                `Solo hay ${product.product_stock} unidades en stock`,
                "warning"
            );
            return false;
        }

        const exists = allPendings.some(
            p => Number(p.product_id) === Number(id_product)
        );

        const saved = await savePending(
            {
                product_id: Number(id_product),
                quantity: quantity,
            },
            product.product_name
        );

        //si falla el envio al back, corta
        if (!saved) return false;

        const updatedPendings = exists
            ? allPendings.map(p =>
                Number(p.product_id) === Number(id_product)
                    ? {
                        ...p,
                        pending_order_quantity: quantity,
                    }
                    : p
            )
            : [
                ...allPendings,
                {
                    product_id: Number(id_product),
                    pending_order_quantity: quantity,
                },
            ];

        //actualizo los estados de react
        setAllPendings(updatedPendings);

        setShowProduct({
            ...product,
            product_count: quantity,
            pending: true,
        });

        //actualizo localStorage
        const updatedUser = {
            ...loginUser,
            pending_orders: updatedPendings,
        };

        localStorage.setItem("userPass", JSON.stringify(updatedUser));

        return true
    };


    const savePending = async (body, productName) => {
        try {
            const response = await fetch(
                `https://product-control-back.onrender.com/users/${loginUser.user_id}/pending`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                }
            );

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || `HTTP ${response.status}`);
            }

            showTostify(
                "success",
                `${productName} guardado en pendientes correctamente`
            );

            return true;

        } catch (error) {
            console.error("Error al guardar el pendiente:", error);

            Swal.fire(
                "Error",
                "No se pudo guardar el producto en pendientes",
                "error"
            );

            return false;
        }
    };




    const deleteOrder = async (productId, productName) => {
        try {
            const response = await fetch(
                `https://product-control-back.onrender.com/users/${loginUser.user_id}/delete-pending/${productId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (!response.ok) {
                const err = await response.json().catch(() => ({}));
                throw new Error(err.error || `HTTP ${response.status}`);
            }

            const newPendingArray = allPendings.filter(
                product => product.product_id !== Number(productId)
            );

            setAllPendings(newPendingArray);


            const newUserArray = {
                ...loginUser,
                pending_orders: newPendingArray,
            };

            localStorage.setItem("userPass", JSON.stringify(newUserArray));


            setInputCount('');

            setShowProduct(prev =>
                prev ? { ...prev, product_count: undefined, pending: false } : prev
            );

            showTostify(
                "success",
                `${productName} eliminado de pendientes correctamente!`
            );

        } catch (error) {
            console.error("Error al eliminar el pendiente:", error);

            Swal.fire(
                "Error al eliminar",
                error.message || "No se pudo quitar el producto de pendientes",
                "error"
            );
        }
    };


    const showTostify = (icon, text) => {
        toast[icon](text, {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            transition: Slide,
        });
    }

    return (
        <div className='mainCardComponent mt-3'>
            <section className='fixed-top headerComponent'>

                {loginUser !== null &&
                    <Greeting userName={loginUser.user_name} userRol={loginUser.user_rol} />
                }

                <div className='d-block d-lg-none'>
                    <SearchBar />
                </div>
            </section>

            <>
                {
                    !showProduct ?
                        <Spinner animation="grow" variant="success" className='loadingSpinner' />
                        :
                        <section>

                            <div className='productDetailComponent mx-auto d-flex flex-column position-relative rounded' >
                                <h4 className={`${showProduct.product_stock === 0 ? "opacity-50" : ""} pt-3`}>
                                    {showProduct.product_name}
                                </h4>

                                <div className='d-flex productDetailComponent_body mb-3'>


                                    <div className={`${showProduct.product_stock === 0 ? "opacity-50" : ""} productDetailComponent_body_image m-auto`}>
                                        <img src={showProduct.product_img} className='h-100 object-fit-contain' alt={`${showProduct.product_name} img`} />
                                    </div>

                                    {showProduct.pending && <span className='position-absolute top-0 end-0 badge bg-warning p-2 mt-1 me-1'>Pendiente</span>}

                                    {showProduct.product_stock === 0 && <h1 className='w-100 bg-warning text-danger position-absolute'>SIN STOCK</h1>}


                                    <div className={`${showProduct.product_stock === 0 ? "opacity-50" : ""} m-auto p-3`} >

                                        <div className="w-100 d-flex flex-column align-items-start">

                                            <h6>{showProduct.category.category_name} - {showProduct.supplier.supplier_name}</h6>
                                            <p>Cod: {showProduct.product_sku}</p>
                                            <div className='w-100 d-flex justify-content-between'>
                                                <p>$ {showProduct.product_price}</p>
                                                <p>Stock: {showProduct.product_stock}</p>
                                            </div>
                                        </div>

                                        <Form className={`${showProduct.product_stock === 0 ? "opacity-50" : ""} w-100 d-flex flex-column justify-content-between d-flex flex-column mt-2`}>
                                            <Form.Control
                                                type="number"
                                                placeholder={showProduct.product_count}
                                                value={inputCount}
                                                onChange={(e) => setInputCount(e.target.value)}
                                            />

                                            <section className='d-flex mt-3'>
                                                <Button type="button" variant='secondary' className='w-50 me-2' onClick={() => { deleteOrder(showProduct.product_id, showProduct.product_name) }}>
                                                    <span className="material-symbols-outlined">
                                                        remove_shopping_cart
                                                    </span>
                                                </Button>

                                                <Button variant="info" className='w-50 me-2' onClick={handleAdd} disabled={saving}>
                                                    <span className="material-symbols-outlined text-light">
                                                        add_shopping_cart
                                                    </span>
                                                </Button>
                                            </section>
                                        </Form>

                                    </div>
                                </div>
                            </div >
                        </section>
                }
            </>

            <NavBarMobile />
            <ToastContainer />
        </div >
    )
}

export default ProductDetail
