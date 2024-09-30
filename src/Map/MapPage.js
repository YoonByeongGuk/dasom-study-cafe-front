import { useEffect } from 'react';
import React from 'react';
import image1 from './Frame 39.jpg';

// MyComponent 컴포넌트
const MyComponent = () => {
    return (
        <div className="image-container">
            <img src={image1} alt="Description of image" />
        </div>
    );
}


// MapPage 컴포넌트
function MapPage() {
    useEffect(() => {
        // Kakao Maps 스크립트가 로드되지 않은 경우 동적으로 로드합니다
        if (!window.kakao) {
            const script = document.createElement('script');
            script.src = "https://dapi.kakao.com/v2/maps/sdk.js?appkey=YOUR_APP_KEY";
            script.onload = initializeMap;
            document.head.appendChild(script);
        } else {
            initializeMap();
        }

        function initializeMap() {
            const container = document.getElementById('map');
            const options = {
                center: new window.kakao.maps.LatLng(37.57098624524391, 126.99255730597434),
                level: 3
            };

            // Kakao Map 초기화
            const map = new window.kakao.maps.Map(container, options);

            // 마커 추가
            const markerPosition = new window.kakao.maps.LatLng(37.57098624524391, 126.99255730597434);
            const marker = new window.kakao.maps.Marker({
                position: markerPosition,
                map: map
            });

            // 마커에 텍스트를 표시하기 위해 CustomOverlay 사용
            const customOverlay = new window.kakao.maps.CustomOverlay({
                position: markerPosition,
                content: '<div class="customoverlay">다솜 - 스터디카페</div>',
                yAnchor: 2 // 텍스트가 마커의 상단에 위치하도록 조정
            });
            customOverlay.setMap(map);

            // 클린업: 컴포넌트 언마운트 시 클린업 작업
            return () => {
                marker.setMap(null); // 마커 제거
                customOverlay.setMap(null); // 커스텀 오버레이 제거
            };
        }
    }, []); // 빈 배열은 컴포넌트가 처음 마운트될 때만 useEffect를 실행

    return (
        <main className="map-page">
            <p className="sub-title">Locations</p>
            <h1 className="main-title">오시는 길</h1>
            <div className="content-container">
                <div
                    id="map"
                    style={{
                        width: '700px',
                        height: '500px',
                        marginRight: '20px'
                    }}
                ></div>
                <MyComponent />
            </div>
        </main>
    );
}

export default MapPage;
