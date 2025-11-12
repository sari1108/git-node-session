import React, { useState, useEffect } from 'react';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { Button } from 'primereact/button';
import { Rating } from 'primereact/rating';
import { Tag } from 'primereact/tag';
import { classNames } from 'primereact/utils';
import { Image } from 'primereact/image';
import Axios from "axios"
import { useRef } from 'react';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Toast } from 'primereact/toast';
import { useNavigate } from 'react-router-dom';
import { Menu } from 'primereact/menu';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { FileUpload } from 'primereact/fileupload';
import { InputNumber } from 'primereact/inputnumber';
import { TieredMenu } from 'primereact/tieredmenu';
import { Menubar } from 'primereact/menubar';
import { useSelector, useDispatch } from 'react-redux';
import { setToken, clearToken } from '../../redux/userSlice';  // נתיב בהתאם למיקום שלך


const NewBornPage = () => {
    const userToken = useSelector(state => state.user.token);

    const navigate = useNavigate()
    const toast = useRef(null);
    const items2 = [
        {

            label: 'קטגוריות',
            items: [
                {
                    label: 'בגדים',
                    template: (item, options) => (
                        <button onClick={()=>{navigate('/product/Clothes')}} className={classNames('p-menuitem-link p-link flex align-items-center gap-3 text-1.8xl', { 'p-highlight': options.active })}
                        >
                            <img src="images/logooo.gif" alt="בית" width={20} />
                            <span className="font-bold">{item.label}</span>
                        </button>
                    ),
                },
                {
                    label: 'new born',
                    icon: 'pi pi-refresh',
                    template: (item, options) => (
                        <button onClick={()=>{navigate('/product/newborn')}} className={classNames('p-menuitem-link p-link flex align-items-center gap-3 text-1.8xl', { 'p-highlight': options.active })}
                        >
                            <img src="images/logooo.gif" alt="בית" width={20} />
                            <span className="font-bold">{item.label}</span>
                        </button>
                    )
                },
                {
                    label: 'disney & jeans',
                    icon: 'pi pi-refresh',
                    template: (item, options) => (
                        <button onClick={()=>{navigate('/product/Disney&jeans')}} className={classNames('p-menuitem-link p-link flex align-items-center gap-3 text-1.8xl', { 'p-highlight': options.active })}
                        >
                            <img src="images/logooo.gif" alt="בית" width={20} />
                            <span className="font-bold">{item.label}</span>
                        </button>
                    )
                },
                {
                    label: 'אקססוריז',
                    Image: '/images/accessories.gif',
                    template: (item, options) => (
                        <button onClick={()=>{navigate('/product/accessories')}} className={classNames('p-menuitem-link p-link flex align-items-center gap-3 text-1.8xl', { 'p-highlight': options.active })}
                        >
                            <img src="images/logooo.gif" alt="בית" width={20} />
                            <span className="font-bold">{item.label}</span>
                        </button>
                    )
                },
                {
                    label: 'מוצרים',
                    icon: 'pi pi-refresh',
                    template: (item, options) => (
                        <button onClick={()=>{navigate('/product/productsp')}} className={classNames('p-menuitem-link p-link flex align-items-center gap-3 text-1.8xl', { 'p-highlight': options.active })}
                        >
                            <img src="images/logooo.gif" alt="בית" width={20} />
                            <span className="font-bold">{item.label}</span>
                        </button>
                    )

                }

            ]
        }




    ];




    const [products, setProducts] = useState([]);
    const [layout, setLayout] = useState('grid');
    const [editVisible, setEditVisible] = useState(false);
    const [editProduct, setEditProduct] = useState(null);
    const menuWrapper = useRef(null);

    const getProduct = async () => {
        try {
            const product = await Axios.get("http://localhost:1234/api/product")
            if (product.status === 200) {
                setProducts(product.data)
            }
        }
        catch (e) {
            console.log(e);

        }
    }
    useEffect(() => {
        getProduct()
    }, []);

    const goToBasket = async (_id) => {
        console.log("Trying to add to basket, product id:", _id)
        try {
            if (!userToken) return alert("You must be logged in to add to basket");
            await Axios.put(
                "http://localhost:1234/api/basket/add",
                { _id },
                { headers: { Authorization: `Bearer ${userToken}` } }
            );
            navigate('/basket');
        } catch (e) {
            console.log(e);
        }
    };



    const gridItem = (product) => {
        const deleteFromDb = async (_id) => {
            if (!userToken)
                return alert("you must be logged in before you delete")
            try {
                await Axios.delete(`http://localhost:1234/api/product/${_id}`, {
                    headers: { Authorization: `Bearer ${userToken}` }
                });
                toast.current.show({ severity: 'success', summary: 'המוצר נמחק בהצלחה' });
                getProduct();
            } catch (err) {
                toast.current.show({ severity: 'error', summary: 'שגיאה במחיקה', detail: err.response?.data || err.message });
                console.error(err);
            }
        }

        return (
            <div className='product'>
                <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={product._id}>
                    <div className="p-4  surface-border surface-card border-round">
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                            <div className="flex align-items-center gap-2">
                            </div>

                        </div>
                        <div className="flex flex-column align-items-center">
                            <img src={product.image} alt={product.prodname} width="200" className='p-0' style={{
                                width: '230px',
                                height: '250px',
                                objectFit: 'cover',
                                borderRadius: '8px'
                            }}
                            />
                            <div className="text font-bold " style={{ whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{product.prodname}</div>

                        </div>
                        <div className="flex align-items-center justify-content-center gap-6">
                            <span className="text-2xl font-semibold">₪{product.price}</span>
                            <div className='but'>
                                <Button icon="pi pi-shopping-cart" rounded text severity="info" aria-label="User" onClick={() => goToBasket(product._id)} />
                                <Button icon="pi pi-trash" rounded text severity="danger" aria-label="Cancel" onClick={() => deleteFromDb(product._id)} />
                                <Button icon="pi pi-pencil" rounded text aria-label="Filter" onClick={() => {
                                    setEditProduct(product);
                                    setEditVisible(true);
                                }} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (products, layout) => {
        return <div className="grid grid-nogutter">{products.map((product, index) => itemTemplate(product , layout, index))}</div>;
    };

    const menuRight = useRef(null);
    const menuRef = useRef(null);

    const [visible, setVisible] = useState(false);
    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [image, setImage] = useState("");
    const [price, setPrice] = useState(20);
    const fileUploadRef = useRef(null);
    const fileUploadEditRef = useRef(null);



    const categories = [
        { label: 'בגדים', value: 'BabyClothes' },
        { label: 'מוצרי תינוקות', value: 'BabyProducts' },
        { label: 'Disney & Jeans', value: 'babyDisney' },
        { label: 'אקססוריז', value: 'babyAccessories' },
        { label: 'New - Born', value: 'newBorn' }
    ];
    const onUpload = () => {
        toast.current.show({ severity: 'info', summary: 'Success', detail: 'File Uploaded' });
    };
    const customBase64Uploader = async (event) => {
        const file = event.files?.[0];
        if (!file) return alert("לא נמצא קובץ")
        const reader = new FileReader();
        // let blob = await fetch(file.objectURL).then((r) => r.blob()); //blob:url

        reader.readAsDataURL(file);

        reader.onloadend = function () {
            const base64data = reader.result;
            console.log("base64 image:", base64data?.substring(0, 100)); // רק התחלה
            setImage(base64data);
        };
    };
    const handleAddProduct = async () => {
        if (!userToken)
            return alert("you must be logged in before you delete")
        if (!image) {
            alert("חובה להעלות תמונה");
            return;
        }

        try {
            const product = await Axios.post("http://localhost:1234/api/product", { prodname: name, category: category, price: price, image: image })
            if (product.status === 200) {
                setVisible(false);
                getProduct()
            }
        }
        catch (e) {
            alert(e.message)

        }
    }

    const handleUpdateProduct = async () => {
        if (!userToken)
            return alert("you must be logged in before you delete")

        try {
            const res = await Axios.put(`http://localhost:1234/api/product/${editProduct._id}`, editProduct)
            if (res.status === 200) {
                toast.current.show({ severity: 'success', summary: 'עודכן בהצלחה' });
                setEditVisible(false);
                getProduct();
            }
        } catch (err) {
            toast.current.show({
                severity: 'error',
                summary: 'שגיאה',
                detail: err.response?.data || err.message
            });
            console.error(err);
        }
    };





    return (
        <div className='productpage' style={{ position: 'relative' }}>

            <div className='flex flex-column   ' style={{
                position: 'absolute',
                top: 15,
                right: 15,
                padding: '0px'
                , justifyContent: "center", alignItems: "center", gap: "2px"
            }}>
                <div className="card " >
                    <Menubar model={items2} className='custom-menu-style bold' style={{ backgroundImage: 'radial-gradient(circle at left top, var(--blue-100), var(--pink-100))' }} />
                    <Toast ref={toast} />
                </div>

                <Button label="הוספת מוצר" icon="pi pi-plus" onClick={() => {
                    setVisible(true);
                    setName("");
                    setPrice(null);
                    setCategory("");
                    setImage(null)
                }}

                    style={{ backgroundImage: 'radial-gradient(circle at left top, var(--blue-100), var(--pink-100))', color: "black", display: "flex", gap: "0p", width: "119px", right: "0px" }} />
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <div className="flex flex-column px-8 py-5 gap-4" style={{
                            maxHeight: '70vh',
                            overflowY: 'auto',
                            borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--blue-400), var(--pink-700))'
                        }}>

                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="username" className="text-primary-50 font-semibold rtl">
                                    שם מוצר
                                </label>
                                <InputText id="username"
                                    label="Username"
                                    className="bg-white-alpha-20 border-none p-3 text-primary-50 rtl"
                                    onChange={(e) => setName(e.target.value)}
                                ></InputText>
                            </div>
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="price" className="text-primary-50 font-semibold rtl">
                                    מחיר
                                </label>
                                <div className="w-full" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                    <InputNumber
                                        inputId="price"
                                        value={price}
                                        showButtons
                                        mode="currency"
                                        currency="ILS"
                                        locale="he-IL"
                                        className="w-full bg-white-alpha-20 border-none p-2 text-primary-50 rtl"
                                        inputStyle={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: 'white',
                                            direction: 'rtl'
                                        }}
                                        onValueChange={(e) => setPrice(e.target.value)}
                                    />
                                </div>

                            </div>
                            <div className="inline-flex flex-column gap-2 rtl">
                                <label htmlFor="category" className="text-primary-50 font-semibold rtl">
                                    קטגוריה
                                </label>
                                <Dropdown
                                    id="category"
                                    value={category}
                                    options={categories}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder="בחר קטגוריה"
                                    className="bg-white-alpha-20 border-none p-1 text-primary-50 rtl"
                                />
                            </div>

                            <div className="flex flex-column justify-content-center align-items-center gap-3">
                                {image && (
                                    <Image src={image} alt="preview" width="150" />
                                )}

                                <FileUpload
                                    ref={fileUploadRef}
                                    chooseLabel={image ? "החלף תמונה" : "בחר תמונה"}
                                    mode="basic"
                                    name="image"
                                    accept="image/*"
                                    customUpload
                                    onSelect={(e) => {
                                        const file = e.files?.[0];
                                        if (!file) return;
                                        const reader = new FileReader();
                                        reader.readAsDataURL(file);
                                        reader.onloadend = function () {
                                            setImage(reader.result);
                                            fileUploadRef.current?.clear();
                                        };
                                    }}
                                />

                                {image && (
                                    <Button
                                        label="מחק תמונה"
                                        icon="pi pi-trash"
                                        severity="danger"
                                        text
                                        onClick={() => setImage("")}
                                    />
                                )}
                            </div>


                            <div className="flex align-items-center gap-2">
                                <Button label="הוסף"
                                    onClick={
                                        handleAddProduct}
                                    text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                                <Button label="ביטול" onClick={(e) => { hide(e) }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"></Button>
                            </div>
                        </div>
                    )}
                ></Dialog>

                <div className="card flex justify-content-center  ">
                </div>
                <Dialog
                    visible={editVisible}
                    modal
                    onHide={() => setEditVisible(false)}
                    content={({ hide }) => (
                        <div
                            className="flex flex-column px-8 py-5 gap-4"
                            style={{
                                borderRadius: '12px',
                                backgroundImage: 'radial-gradient(circle at left top, var(--blue-400), var(--pink-700))',
                                maxHeight: '70vh',
                                overflowY: 'auto'

                            }}
                        >
                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="editName" className="text-primary-50 font-semibold rtl">
                                    שם מוצר
                                </label>
                                <InputText
                                    id="editName"
                                    value={editProduct?.prodname || ''}
                                    className="bg-white-alpha-20 border-none p-3 text-primary-50 rtl"
                                    onChange={(e) =>
                                        setEditProduct({ ...editProduct, prodname: e.target.value })
                                    }
                                />
                            </div>

                            <div className="inline-flex flex-column gap-2">
                                <label htmlFor="editPrice" className="text-primary-50 font-semibold rtl">
                                    מחיר
                                </label>
                                <div className="w-full" style={{ borderRadius: '12px', overflow: 'hidden' }}>
                                    <InputNumber
                                        inputId="editPrice"
                                        value={editProduct?.price || 0}
                                        showButtons
                                        mode="currency"
                                        currency="ILS"
                                        locale="he-IL"
                                        className="w-full bg-white-alpha-20 border-none p-2 text-primary-50 rtl"
                                        inputStyle={{
                                            backgroundColor: 'transparent',
                                            border: 'none',
                                            color: 'white',
                                            direction: 'rtl'
                                        }}
                                        onValueChange={(e) =>
                                            setEditProduct({ ...editProduct, price: e.value })
                                        }
                                    />
                                </div>
                            </div>

                            <div className="inline-flex flex-column gap-2 rtl">
                                <label htmlFor="editCategory" className="text-primary-50 font-semibold rtl">
                                    קטגוריה
                                </label>
                                <Dropdown
                                    id="editCategory"
                                    value={editProduct?.category || ''}
                                    options={categories}
                                    onChange={(e) =>
                                        setEditProduct({ ...editProduct, category: e.target.value })
                                    }
                                    placeholder="בחר קטגוריה"
                                    className="bg-white-alpha-20 border-none p-1 text-primary-50 rtl"
                                />
                            </div>

                            <div className="flex  justify-content-center">

                                    <FileUpload
                                        ref={fileUploadRef}
                                        chooseLabel={image ? "החלף תמונה" : "בחר תמונה"}
                                        mode="basic"
                                        name="image"
                                        accept="image/*"
                                        customUpload
                                        onSelect={(e) => {
                                            const file = e.files?.[0];
                                            if (!file) return;
                                            const reader = new FileReader();
                                            reader.readAsDataURL(file);
                                            reader.onloadend = function () {
                                                setEditProduct((prev) => ({
                                                    ...prev,
                                                    image: reader.result,
                                                })); 
                                                fileUploadRef.current?.clear();
                                            };
                                        }}
                                    />
                            </div>
                                {editProduct?.image && (
                                    <div className="flex flex-column align-items-center mt-3 gap-2">
                                        <div className="flex justify-content-center">
                                            <Image src={editProduct.image} alt="preview" width="150" />
                                        </div>
                                        <div className="flex justify-content-center">
                                            <Button
                                                label="מחק תמונה"
                                                icon="pi pi-trash"
                                                severity="danger"
                                                text
                                                onClick={() => setEditProduct.image("")}
                                            />
                                        </div>
                                    </div>
                                )}
                            


                            <div className="flex align-items-center gap-2">
                                <Button
                                    label="שמור"
                                    onClick={handleUpdateProduct}
                                    text
                                    className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                                />
                                <Button
                                    label="ביטול"
                                    onClick={(e) => { hide(e) }}
                                    text
                                    className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                                />
                            </div>
                        </div>
                    )}
                ></Dialog>

            </div>
            <div className="grid grid-nogutter justify-center gap-8 card" style={{
                border: "20px solid transparent",
                borderRadius: '12px',
                backgroundSize: "100% 200%",
                animation: "diagonalBackground 6s ease-in-out infinite"
            }}>
                <DataView value={products.filter((prod)=>{return prod.category == "newBorn"})} listTemplate={listTemplate} layout={layout} />
            </div>
        </div>
    )
}
export default NewBornPage
