import React, { useState, useEffect, useRef } from 'react';
import Axios from "axios";
import { useNavigate } from 'react-router-dom';
import { DataView } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Tag } from 'primereact/tag';
import { Toast } from 'primereact/toast';
import { classNames } from 'primereact/utils';
import { useSelector } from 'react-redux';

const Basket = () => {
    const [products, setProducts] = useState([]);
    const [realProducts, setRealProducts] = useState([]);
    const navigate = useNavigate();
    const userToken = useSelector(state => state.user.token);
    const toast = useRef(null);

    const showSuccess = (message) => {
        toast.current?.show({ severity: 'success', summary: 'בוצע', detail: message, life: 3000 });
    };

    const showError = (message) => {
        toast.current?.show({ severity: 'error', summary: 'שגיאה', detail: message, life: 4000 });
    };

    const deleteFromBasket = async (_id) => {
        try {
            if (!userToken) return;
            await Axios.delete('http://localhost:1234/api/basket', {
                data: { _id },
                headers: { Authorization: `Bearer ${userToken}` }
            });
            showSuccess("המוצר נמחק מהעגלה");
            await getProduct();
        } catch (e) {
            showError("שגיאה במחיקת המוצר");
        }
    };

    const addToBasket = async (_id) => {
        try {
            if (!userToken) return;
            await Axios.put('http://localhost:1234/api/basket/add', { _id }, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            showSuccess("המוצר נוסף לעגלה");
            await getProduct();
        } catch (e) {
            showError("שגיאה בהוספת המוצר");
        }
    };

    const decFromBasket = async (_id) => {
        try {
            if (!userToken) return;
            await Axios.put('http://localhost:1234/api/basket/dec', { _id }, {
                headers: { Authorization: `Bearer ${userToken}` }
            });
            showSuccess("המוצר הוקטן");
            await getProduct();
        } catch (e) {
            showError("שגיאה בהקטנת המוצר");
        }
    };

    const getProduct = async () => {
        if (!userToken) return;

        try {
            const response = await Axios.get("http://localhost:1234/api/basket", {
                headers: { Authorization: `Bearer ${userToken}` }
            });

            if (response.status === 200) {
                const data = response.data;
                setProducts(data);
                const filtered = data.filter(p => p.idproduct !== null);
                setRealProducts(filtered);
                console.log(filtered);
                
                // if (filtered.length === 0) {
                //     setTimeout(() => navigate('/product'), 0);
                // }
            }
        } catch (e) {
            showError("שגיאה בטעינת העגלה");
        }
    };

    useEffect(() => {
        getProduct();
    }, []);

    const getSeverity = (product) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK': return 'success';
            case 'LOWSTOCK': return 'warning';
            case 'OUTOFSTOCK': return 'danger';
            default: return null;
        }
    };

    const itemTemplate = (product, index) => {
        if (!product || !product.idproduct) return null;
        const prod = product.idproduct;

        return (
            <div className="col-12 sm:col-7 flex flex-column" key={prod.id}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                    <img className="w-3 sm:w-16rem xl:w-15rem shadow-2 block xl:block mx-auto border-round" src={prod.image} alt={prod.prodname} />
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{prod.prodname}</div>
                            <div className="flex align-items-center gap-3">
                                <span className="flex align-items-center gap-2">
                                    <i className="pi pi-tag"></i>
                                    <span className="font-semibold">{prod.category}</span>
                                </span>
                                <Tag value={product.inventoryStatus} severity={getSeverity(product)} />
                            </div>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className='flex align-items-center gap-2'>
                                    <Button icon="pi pi-plus" className="p-button-rounded p-button-success" style={{ backgroundColor: "lightpink", border: "pink" }} onClick={() => addToBasket(product.idproduct._id)} />
                                    <span className='text-xl px-2 '>{product.count}</span>
                                    <Button icon="pi pi-minus" className="p-button-rounded p-button-success" style={{ backgroundColor: "lightblue", border: "blue" }} onClick={() => decFromBasket(product.idproduct._id)} />
                                </div>
                            </div>
                            <div className='flex flex-row align-items-center'>
                                <span className="text-2xl font-semibold">₪{prod.price * product.count}</span>
                                <Button icon="pi pi-trash" rounded text className="p-button-rounded p-button-danger ml-2" style={{ position: 'relative', marginRight: '5px' }} onClick={() => deleteFromBasket(product.idproduct._id)} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    return (
        <>
            <Toast ref={toast} />
            <h2 className='text-5xl' style={{ textAlign: "center" }}>העגלה שלי</h2>

            {realProducts.length > 0 && (
                <div className="card element" style={{
                    border: "10px solid transparent",
                    borderRadius: '12px',
                    backgroundSize: "100% 200%",
                    animation: "diagonalBackground 6s ease-in-out infinite"
                }}>
                    <DataView value={realProducts} itemTemplate={itemTemplate} />
                </div>
            )}
            {realProducts.length === 0 && (
                <div style={{ display: "flex", justifyContent: "center", marginTop: "20vh" }}>
                    <img src='/images/7360283.png' style={{ width: "400px", height: "400px" }} alt="עגלה ריקה" />
                </div>
            )}
        </>
    );
};

export default Basket;
