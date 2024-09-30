import { CTable, CTableHead, CTableRow, CTableHeaderCell, CTableBody, CTableDataCell } from '@coreui/react';
import { useState, useEffect } from 'react';
import api from '../api/api';

function ReservationInfo(props) {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");
    
    const [tableInfo, setTableInfo] = useState([]);  

    // 삭제 요청할 예약 정보 변수
    const [reserveInfo, setReserveInfo] = useState({
        userId: userId,
        reserveDate: null,
        startTime: null,
        endTime: null,
        sitNum: '',
    });

    const getReservationInfo = () => {
        api.get(`api/reservationInfo/${userId}`)
        .then(res => {
            setTableInfo(res.data);  
        }).catch(e => {
            console.log(e);
        });
    };

    const reqDeleteReservation = (deleteData) => {
        api.post(`api/reservationInfo/cancel`, { deleteData })
        .then(res => {
            window.location.reload();
        })
        .catch(e => {
            console.error("Error during deletion:", e);
            alert("예약 취소에 실패했습니다. 서버에 문의하세요.");
        });
    };

    const handleCancel = (info) => {
        const formattedDeleteData = {
            userId: userId,
            reserveDate: new Date(info.reserveDate).toISOString().split('T')[0], // 'YYYY-MM-DD' 포맷으로 변환
            startTime: new Date(info.startTime).toISOString().slice(0, 19).replace('T', ' '), // 'YYYY-MM-DD HH:MM:SS' 포맷으로 변환
            endTime: new Date(info.endTime).toISOString().slice(0, 19).replace('T', ' '), // 'YYYY-MM-DD HH:MM:SS' 포맷으로 변환
            sitNum: info.sitNum,
        };

        // 예약 정보 설정 후 취소 요청
        setReserveInfo(formattedDeleteData);
        reqDeleteReservation(formattedDeleteData); // 형식이 바뀐 예약 정보 기반으로 삭제 요청
    };

    useEffect(() => {
        getReservationInfo();
    }, [userId]);

    return (
        <main className="reservationInfo-page">
            <p className="sub-title">ReservationInfo</p>
            <h1 className="main-title">예약 정보</h1>
            {isLoggedIn && (
                <div className="reservation-table" style={{width: '50%', display: 'flex', justifyContent: 'center', alignItems: 'center', margin: '0 auto'}}>
                    <CTable>
                        <CTableHead>
                            <CTableRow>
                                <CTableHeaderCell scope="col">날짜</CTableHeaderCell>
                                <CTableHeaderCell scope="col">시간</CTableHeaderCell>
                                <CTableHeaderCell scope="col">좌석번호</CTableHeaderCell>
                                <CTableHeaderCell scope="col"></CTableHeaderCell>
                            </CTableRow>
                        </CTableHead>
                        <CTableBody>
                            {(Array.isArray(tableInfo) && tableInfo.length === 0) 
                            ? <CTableRow>
                                <CTableDataCell colSpan="4">예약 정보가 없습니다</CTableDataCell>
                            </CTableRow> 
                            : tableInfo.map((info, index) => (  
                                <CTableRow key={index}>
                                    <CTableDataCell>{new Date(info.reserveDate).toLocaleString().split(',')[0]}</CTableDataCell>
                                    <CTableDataCell>
                                        {new Date(info.startTime).toLocaleString()} - {new Date(info.endTime).toLocaleString()}
                                    </CTableDataCell>
                                    <CTableDataCell>{info.sitNum}</CTableDataCell>
                                    <CTableDataCell>
                                        <button onClick={() => handleCancel(info)}>
                                            취소
                                        </button>
                                    </CTableDataCell>
                                </CTableRow>
                            ))}
                        </CTableBody>
                    </CTable>
                </div>
            )}
        </main>
    );
}

export default ReservationInfo;



