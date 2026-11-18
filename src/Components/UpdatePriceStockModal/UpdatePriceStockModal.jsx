import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

const UpdatePriceStockModal = ({ show, onHide, product, updateStockPrice }) => {
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [error, setError] = useState('');

    // Cargar valores actuales cada vez que se abre
    useEffect(() => {
        if (show) {
            setPrice('');
            setStock('');
            setError('');
        }
    }, [show]);

    const handleSave = async (e) => {
        e.preventDefault();

        // Campo sin tocar = se mantiene el valor actual
        const p = price === '' ? Number(product.product_price) : Number(price);
        const s = stock === '' ? Number(product.product_stock) : Number(stock);

        if (!Number.isFinite(p) || p <= 0) {
            return setError('Ingresá un precio válido mayor a 0.');
        }
        if (!Number.isInteger(s) || s < 0) {
            return setError('El stock debe ser un número entero mayor o igual a 0.');
        }

        try {
            await updateStockPrice(product.product_id, p, s);
            onHide(); // solo se cierra si salió bien
        } catch (err) {
            setError(`No se pudo actualizar: ${err.message}`);
        }

        // updateStockPrice(product.product_id, p, s);
        // onHide();
    };

    return (
        <Modal show={show} onHide={onHide} className='d-flex align-items-center justify-content-center'>
            <Form onSubmit={handleSave}>
                <Modal.Header closeButton>
                    <Modal.Title>Actualizar {product?.product_name}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form.Group className="mb-3" controlId="updatePrice">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control
                            type="number" min="0" step="0.01" autoFocus
                            placeholder={product?.product_price}
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="updateStock">
                        <Form.Label>Stock</Form.Label>
                        <Form.Control
                            type="number" min="0" step="1"
                            placeholder={product?.product_stock}
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                        />
                    </Form.Group>
                    {error && <p className="text-danger mb-0">{error}</p>}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" type="button" onClick={onHide}>
                        Cancelar
                    </Button>
                    <Button variant="primary" type="submit">
                        Guardar
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
};

export default UpdatePriceStockModal;