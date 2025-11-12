import { Dialog } from 'primereact/dialog';
import React, { useEffect, useState, useRef } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from "react-router-dom";
import { Toast } from 'primereact/toast';
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/userSlice';

const Register = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const toast = useRef(null);

    const [visible, setVisible] = useState(false);
    const [usename, setUseName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const userToken = useSelector(state => state.user.token);

    const send = async (e) => {
        e.preventDefault();
        if (userToken !== null) {
            toast.current?.show({ severity: 'error', summary: 'משתמש כבר מחובר' });
            setTimeout(() => {
                navigate("/Users");
            }, 2000);
            return;
        }

        try {
            const user = await Axios.post("http://localhost:1234/api/user/register", {
                usename,
                password,
                name,
                email,
                phone
            });

            if (user.status === 200) {
                dispatch(setToken(user.data.accesToken));
                toast.current?.show({ severity: 'success', summary: 'המשתמש נוסף בהצלחה' });
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        } catch (e) {
            toast.current?.show({ severity: 'error', summary: 'שגיאת הרשמה, נסה שוב' });
        }
    };

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <>
            <div className="card flex justify-content-center productpage">
                <Toast ref={toast} />
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <form onSubmit={send}>
                            <div className="flex flex-column px-8 py-5 gap-4 rtl color-black" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--blue-200), var(--pink-300))' }}>

                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="name" className="text-primary-50 font-semibold">שם</label>
                                    <div className="flex align-items-center gap-2">
                                        <img src="images/name.gif" alt="icon" style={{ width: '32px', height: '32px' }} />
                                        <InputText id="Name" className="bg-white-alpha-20 border-none p-3 text-primary-50" value={name} onChange={(e) => { setName(e.target.value) }} required />
                                    </div>
                                </div>

                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="userName" className="text-primary-50 font-semibold">שם-משתמש</label>
                                    <div className="flex align-items-center gap-2">
                                        <img src="images/username.gif" alt="icon" style={{ width: '32px', height: '32px' }} />
                                        <InputText id="userName" className="bg-white-alpha-20 border-none p-3 text-primary-50" value={usename} onChange={(e) => { setUseName(e.target.value) }} required />
                                    </div>
                                </div>

                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="password" className="text-primary-50 font-semibold">סיסמא</label>
                                    <div className="flex align-items-center gap-2">
                                        <img src="images/password.gif" alt="icon" style={{ width: '32px', height: '32px' }} />
                                        <InputText id="password" type="password" className="bg-white-alpha-20 border-none p-3 text-primary-50" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                                    </div>
                                </div>

                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="email" className="text-primary-50 font-semibold">דוא"ל</label>
                                    <div className="flex align-items-center gap-2">
                                        <img src="images/mail.gif" alt="icon" style={{ width: '32px', height: '32px' }} />
                                        <InputText id="email" type="email" className="bg-white-alpha-20 border-none p-3 text-primary-50" value={email} onChange={(e) => { setEmail(e.target.value) }} required />
                                    </div>
                                </div>

                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="phone" className="text-primary-50 font-semibold">טלפון</label>
                                    <div className="flex align-items-center gap-2">
                                        <img src="images/phone2.gif" alt="icon" style={{ width: '32px', height: '32px' }} />
                                        <InputText id="phone" type="phone" className="bg-white-alpha-20 border-none p-3 text-primary-50" value={phone} onChange={(e) => { setPhone(e.target.value) }} required />
                                    </div>
                                </div>

                                <div className="flex align-items-center gap-2">
                                    <Button label="הרשמה" text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" type='submit' />
                                    <Button label="ביטול" onClick={(e) => {
                                        hide(e);
                                        setVisible(false);
                                        navigate("/Users");
                                    }} text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" />
                                </div>
                            </div>
                        </form>
                    )}
                />
            </div>
        </>
    );
};

export default Register;
