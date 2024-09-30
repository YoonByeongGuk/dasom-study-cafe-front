import React from 'react';
import image1 from './고정석 기간권.jpg';
import image2 from './부대시설.jpg';
import image3 from './Frame 13.jpg';
import image4 from './Frame 15.jpg';

// MyComponent 컴포넌트
const MyComponent = () => {
    return (
        <div className="image-gallery">
            <div className="image-item">
                <img src={image3} alt="Frame 13" />  
            </div>
            <div className="image-item">
                <img src={image4} alt="Frame 15" />
            </div>
            <div className="image-item">
                <img src={image1} alt="고정석 기간권" />
            </div>
            <div className="image-item">
                <img src={image2} alt="부대시설" />
            </div>
        </div>
    );
}



function ChargeInfoPage() {
    return (
        <main className="chargeinfo-page">
            <p className="sub-title">Usage fee</p>
            <h1 className="main-title">이용요금</h1>
            <MyComponent/>
        </main>
    )
}

export default ChargeInfoPage;