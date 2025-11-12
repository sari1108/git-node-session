import React, { useEffect, useState, useRef } from 'react';
import { Dialog } from 'primereact/dialog';
import { Button } from 'primereact/button';
import { useNavigate } from 'react-router-dom';
import { Toast } from 'primereact/toast';
import { clearToken } from '../../redux/userSlice';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';


function LogOut() {
    const userToken = useSelector(state => state.user.token);
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const [visible, setVisible] = useState(false);
    const toast = useRef(null);

    const handleAccept = () => {
        if (userToken === null) {
            toast.current.show({ severity: 'error', summary: 'אין משתמש קיים' });
            setTimeout(() => {
                navigate("/Users");
            }, 1000);

        }
        else {
            dispatch(clearToken());
            localStorage.removeItem('userToken');
            toast.current.show({ severity: 'success', summary: 'המשתמש יצא בהצלחה' });
            setTimeout(() => {
                navigate("/Users");
            }, 1000);
        }

    };

    const handleReject = () => {
        navigate("/Users");
    };

    useEffect(() => {
        setVisible(true);
    }, []);

    return (
        <div className="card flex justify-content-center productpage">
            <Toast ref={toast} />
            <Dialog
                visible={visible}
                modal
                onHide={() => { setVisible(false); navigate("/"); }}
                closable={false}
                style={{ width: '20rem' }}
                content={({ hide }) => (
                    <div className="flex flex-column px-8 py-5 " style={{
                        borderRadius: '12px',
                        backgroundImage: 'radial-gradient(circle at left top, var(--blue-200), var(--pink-300))'
                    }}>
                        <div className="flex align-items-center gap-1">
                            <img src="images/logout.gif" alt="icon" style={{ width: '32px', height: '32px' }} />
                            <h2 className="text-primary-50 text-center">התנתקות</h2>
                        </div>
                        <p className="text-primary-50 text-center">הנך בטוח שברצונך לצאת?</p>

                        <div className="flex gap-2 justify-content-center">
                            <Button
                                label="כן"
                                onClick={handleAccept}
                                className="p-3 w-6 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                                text
                            />
                            <Button
                                label="לא"
                                onClick={handleReject}
                                className="p-3 w-6 text-primary-50 border-1 border-white-alpha-30 hover:bg-white-alpha-10"
                                text
                            />
                        </div>
                    </div>
                )}
            />
        </div>
    );
}

export default LogOut;
