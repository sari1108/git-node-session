import React from "react"
import { Navigate, useNavigate } from "react-router-dom"
const Home = () => {

    const navigate = useNavigate();
    return (
        <div className="users-page">
            {/* <img src="sweet.gif"></img> */}
            <div className="hometext">
                <h1>!!!מזל טוב</h1>
                <h2>...חלום מתוק שהתגשם</h2>
                <h2>!!אנחנו כאן בשביל שהחלום יהיה הכי מתוק וקסום שיכול להיות</h2>
                <h2>Sweet-Dreams</h2>
                <h2> ...שלך baby-המקום הטוב ביותר בשביל ה</h2>
                <h2> איכות, יופי, ומחיר- הכל במקום אחד</h2>
                <h2>!!אז-- צאי להגשים</h2>
            </div>

            <div className="buttons-wrapper">
                <button className="image-buttonhome" onClick={() => {
                    navigate("/product/accessories")
                }}>
                    <img src="images/accesories.JPG" alt="logout" />
                    <span className="image-labelhome">אקססוריז</span>
                </button>
                <button className="image-buttonhome" onClick={() => {
                    navigate("/product/Disney&jeans")
                }}>
                    <img src="images/blond.jpg" alt="register" />
                    <span className="image-labelhome">disney&jeans</span>
                </button>
                <button className="image-buttonhome" onClick={() => {
                    navigate("/product/productsp")
                }}>
                    <img src="images/bear.JPG" alt="login" />
                    <span className="image-labelhome">מוצרים</span>
                </button>
                <button className="image-buttonhome" onClick={() => {
                    navigate("/product/Clothes")
                }}>
                    <img src="images/prodd.JPG" alt="login" />
                    <span className="image-labelhome">בגדים</span>
                </button>
                <button className="image-buttonhome" onClick={() => {
                    navigate("/product/newBorn")
                }}>
                    <img src="images/born.JPG" alt="login" />
                    <span className="image-labelhome">new-born</span>
                </button>

            </div>
        </div>
    );
}
export default Home