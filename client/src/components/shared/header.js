import { NavLink, useNavigate } from "react-router-dom"
import { TabMenu } from 'primereact/tabmenu';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import 'primeicons/primeicons.css';
import 'primereact/resources/themes/lara-light-blue/theme.css'; // או כל ערכת עיצוב
import 'primereact/resources/primereact.min.css';

import React from 'react';

const Header = () => {
    const navigate = useNavigate()
    const items = [
        {
            label: 'בית  ',
            icon: 'pi pi-home', 
            template: (item, options) => (
                <button onClick={options.onClick}  className={classNames('p-menuitem-link p-link flex align-items-center gap-3 text-1.8xl', { 'p-highlight': options.active })}
                >
                     <img src="images/logooo.gif" alt="בית" width={50} />
                    <span className="font-bold">{item.label}</span>
                </button>
            ),
            command: () => {
                navigate('/');
            }
        },
        {
            label: 'מוצרים',
            icon: 'pi pi-star',
            template: (item, options) => (
                <button onClick={options.onClick}  className={classNames('p-menuitem-link p-link flex align-items-center gap-3 text-1.8xl', { 'p-highlight': options.active })}
                >
                    <img src="images/prod.gif" alt="בית" width={50} />
                    <span className="font-bold">{item.label}</span>
                </button>
            ),
            command: () => {
                navigate("/product")
            }
        },
      
       
        {
            label: 'משתמשים',
            icon: 'pi pi-search',
            template: (item, options) => (
                <button onClick={options.onClick}  className={classNames('p-menuitem-link p-link flex align-items-center gap-3 text-1.8xl', { 'p-highlight': options.active })}
                >
                    <img src="images/users.gif" alt="בית" width={50} />
                    <span className="font-bold">{item.label}</span>
                </button>
            ),
            command: () => {
                navigate("/users")
            }
            
        },
        
        {
            icon: 'pi pi-shopping-cart',
            label: 'עגלת קניות',
            template: (item, options) => (
                <button onClick={options.onClick}  className={classNames('p-menuitem-link p-link flex align-items-center gap-3 text-1.8xl', { 'p-highlight': options.active })}
                >
                    <img src="images/cart.gif" alt="בית" width={50} />
                    <span className="font-bold">{item.label}</span>
                </button>
            ),
            command: () => {
                navigate("/basket")
            }

        }


    ];

    return (
        <div className="header-wrapper" dir="rtl">
        <div className="header-container">
            <div className="custom-tabmenu">
                <TabMenu model={items}/>
            </div>
            <img src="images/sweet.gif" alt="לוגו האתר" className="logo-image" />
        </div>
    </div>
    )


}

export default Header



        