import { Dialog } from 'primereact/dialog';
import React, { useRef, useState, useEffect } from "react";
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { useNavigate } from "react-router-dom";
import Axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setToken } from '../../redux/userSlice';
import { Toast } from 'primereact/toast';

const Login = () => {
    const dispatch = useDispatch();
    const userToken = useSelector(state => state.user.token);
    const navigate = useNavigate();

    const [visible, setVisible] = useState(false);
    const [usename, setUseName] = useState('');
    const [password, setPassword] = useState('');
    const toast = useRef(null);

    useEffect(() => {
        setVisible(true);
    }, [userToken, navigate]);

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
        const user = await Axios.post("http://localhost:1234/api/user/login", {
            usename,
            password
        });

        if (user.status === 200) {
            dispatch(setToken(user.data.accesToken));
            navigate("/");
        }
    } catch (error) {
        toast.current?.show({ severity: 'error', summary: 'שגיאת התחברות, נסה שוב' });
        setTimeout(() => {
            navigate("/Users");
        }, 2000);
    }
};
    return (
        <>
            <Toast ref={toast} />
            <div className="card flex justify-content-center productpage">
                <Dialog
                    visible={visible}
                    modal
                    onHide={() => { if (!visible) return; setVisible(false); }}
                    content={({ hide }) => (
                        <form onSubmit={send}>
                            <div className="flex flex-column px-8 py-5 gap-4 rtl" style={{ borderRadius: '12px', backgroundImage: 'radial-gradient(circle at left top, var(--blue-200), var(--pink-300))' }}>
                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="username" className="text-primary-50 font-semibold">
                                        שם-משתמש
                                    </label>
                                    <div className="flex align-items-center gap-2">
                                        <img src="images/username.gif" alt="icon" style={{ width: '32px', height: '32px' }} />
                                        <InputText id="username" label="userName" className="bg-white-alpha-20 border-none p-3 text-primary-50" value={usename} onChange={(e) => { setUseName(e.target.value) }} required />
                                    </div>
                                </div>
                                <div className="inline-flex flex-column gap-2">
                                    <label htmlFor="password" className="text-primary-50 font-semibold">
                                        סיסמא
                                    </label>
                                    <div className="flex align-items-center gap-2">
                                        <img src="images/password.gif" alt="icon" style={{ width: '32px', height: '32px' }} />
                                        <InputText id="password" label="Password" className="bg-white-alpha-20 border-none p-3 text-primary-50" type="password" value={password} onChange={(e) => { setPassword(e.target.value) }} required />
                                    </div>
                                </div>
                                <div className="flex align-items-center gap-2">
                                    <Button label="כניסה" text className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10" type='submit' />
                                    <Button
                                        label="ביטול"
                                        onClick={(e) => {
                                            hide(e);
                                            setVisible(false);
                                            navigate("/Users");
                                        }}
                                        text
                                        className="p-3 w-full text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                                    />
                                </div>
                            </div>
                        </form>
                    )}
                />
            </div>
        </>
    );
};

export default Login;
