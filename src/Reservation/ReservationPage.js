import { 
    CContainer, 
    CRow, 
    CCol, 
    CDropdown, 
    CDropdownToggle, 
    CDropdownMenu, 
    CDropdownItem, 
    CButton, 
    CCollapse,
    CCard,
    CCardBody,
    CForm,
    CFormInput,
} from '@coreui/react'
import React, { useState } from "react";
import DatePicker from 'react-datepicker';
import { ko } from "date-fns/locale/ko";
import api from '../api/api';
// import setHours from "date-fns/setHours";
// import setMinutes from "date-fns/setMinutes";

function ReservationPage() {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const userId = localStorage.getItem("id");
    const [visible, setVisible] = useState(false);

    //예약 정보
    const [form, setForm] = useState({
        userId: userId,
        reserveDate: null,
        startTime: null,
        endTime: null,
        sitNum: '',
    });
    //좌석타입 별 개수
    const sitCount = {
        "common": 20,
        "private": 17,
        "fixed": 11,
    };
    //예약권 선택 - 시간 충전권 | 고정석 기간권
    const [ticketType, setTicketType] = useState('');
    const [ticketMenu, setTicketMenu] = useState('');
    //좌석 선택 - 1인실 (Common) | 1인실 (Private) | 고정석
    const [sitType, setSitType] = useState('');
    const [sitMenu, setsitMenu] = useState('');
    const [sitNum, setSitNum] = useState([]);

    const sitList = (type, num) => {
        var list = [];
        let i = 1;
        let count = 0;
        if (type === 'common') {
            i = 1;
            count = num + 1;
        }
        else if (type === 'fixed') {
            i = sitCount.common + 1;
            count = i + num;
        }
        else if (type === 'private') {
            i = sitCount.common + sitCount.fixed + 1;
            count = i + num;
        }
        for(i ; i < count ; i++) {
            list.push(
            <CDropdownItem 
            key={i} 
            id={i} 
            as="button" 
            onClick={(e) => {
                setVisible(false); 
                setForm({...form, sitNum: e.target.id})
            }}>{i}
            </CDropdownItem>);
        }
        setSitNum(list);
    }

    const checkForm = () => {
        ticketMenu === '' ? alert('예약권을 선택해주세요')
        : sitMenu === '' ? alert('좌석을 선택해주세요')
        : form.sitNum === '' ? alert('좌석 번호를 선택해주세요')
        : form.reserveDate === null ? alert('예약일을 선택해주세요')
        : form.startTime === null ? alert('시작 시간을 선택해주세요')
        : form.endTime === null ? alert('종료 시간을 선택해주세요')
        : form.endTime < form.startTime ? alert('종료 시간을 다시 선택해주세요')
        : setVisible(true)
    }    

    const reqReservation = (data) => api.post('/api/reservation', data)
    .then(res => {
        //회원가입 성공했을 때
        if(res.data.success) {
            alert('예약되었습니다')       
        }
        //실패했을 때
        else {
            alert('예약에 실패했습니다.');
        }
        console.log(res, data);
        
    }).catch(err => {
        alert(err.response.data.message);
        console.log(err.config.data);
    })

    return (
        <main className="resercation-page">
            {isLoggedIn === "1" && 
            <div>
                <p className="sub-title">Reservation</p>
                <h1 className="main-title">예약하기</h1>
                <div>
                    <CContainer className="reservation-form">
                        <CRow lg={{ cols: 2, gutter: 3}}>
                            <CCol>
                                <div>
                                    <p>예약권 선택</p>
                                    <CDropdown className="reserve-form">
                                        <CDropdownToggle>{ticketMenu === '' ? '예약권 선택' : ticketMenu}</CDropdownToggle>
                                        <CDropdownMenu>
                                            <CDropdownItem 
                                                as="button" 
                                                onClick={(e) => {
                                                    setTicketType('time')
                                                    setTicketMenu('시간 충전권')                                                    
                                                    setSitType('')
                                                    setsitMenu('')
                                                    setForm({...form, sitNum: ''})
                                                    setVisible(false)
                                                }}>시간 충전권
                                            </CDropdownItem>
                                            <CDropdownItem 
                                                as="button"
                                                onClick={(e) => {
                                                    setTicketType('term')
                                                    setTicketMenu('고정석 기간권')                                                    
                                                    setSitType('')
                                                    setsitMenu('')
                                                    setForm({...form, sitNum: ''})
                                                    setVisible(false)
                                                }}>고정석 기간권
                                            </CDropdownItem>
                                        </CDropdownMenu>
                                    </CDropdown>
                                </div>
                                <hr/>
                                <div>
                                    <p>좌석 선택</p>
                                    <CDropdown className="reserve-form">
                                        <CDropdownToggle>{sitMenu === '' ? '좌석 선택' : sitMenu}</CDropdownToggle>
                                        {/* 시간 충전권 드롭메뉴 */}
                                        {ticketType === 'time' &&
                                            <div>
                                                <CDropdownMenu>                                            
                                                    <CDropdownItem 
                                                        as="button" 
                                                        onClick={(e) => {
                                                            setForm({...form, sitNum: ''})
                                                            setSitType('common')
                                                            setsitMenu('1인실 (Common)')
                                                            sitList('common', sitCount.common)
                                                            setVisible(false)
                                                        }}>1인실 (Common)</CDropdownItem>
                                                    <CDropdownItem 
                                                        as="button" 
                                                        onClick={(e) => {
                                                            setForm({...form, sitNum: ''})
                                                            setSitType('private')
                                                            setsitMenu('1인실 (Private)')
                                                            sitList('private', sitCount.private)
                                                            setVisible(false)
                                                        }}>1인실 (Private)</CDropdownItem>
                                                </CDropdownMenu>                                                                       
                                            </div>                     
                                        }                                        
                                        {/* 고정석 기간권 드롭메뉴 */}
                                        {ticketType === 'term' && 
                                            <div>
                                                <CDropdownMenu>                                            
                                                    <CDropdownItem 
                                                        as="button"
                                                        onClick={(e) => {
                                                            setForm({...form, sitNum: ''})
                                                            setSitType('fixed')
                                                            setsitMenu('고정석')
                                                            sitList('fixed', sitCount.fixed)
                                                            setVisible(false)
                                                        }}>고정석</CDropdownItem>
                                                </CDropdownMenu>
                                            </div>            
                                        }                                           
                                    </CDropdown>
                                    {/* 좌석 번호 드롭메뉴 */}
                                    <CDropdown className="reserve-form">
                                        <CDropdownToggle>{form.sitNum === '' ? '좌석 번호' : form.sitNum}</CDropdownToggle>
                                        <CDropdownMenu>
                                            {sitType === 'common' ? <>{sitNum}</>
                                            : sitType === 'private' ? <>{sitNum}</>
                                            : sitType === 'fixed' ? <>{sitNum}</>
                                            : <></>
                                            }
                                        </CDropdownMenu>                                            

                                    </CDropdown> 
                                </div>
                                <hr/>                                
                                <div>
                                    <p>예약일 선택</p>
                                    <DatePicker
                                        showIcon
                                        locale={ko}
                                        className="reserve-form"
                                        dateFormat='yyyy년 MM월 dd일' // 날짜 형태
                                        shouldCloseOnSelect // 날짜를 선택하면 datepicker가 자동으로 닫힘
                                        minDate={new Date()}    //오늘 날짜 이후로만 선택 가능
                                        // maxDate={new Date()} // maxDate 이후 날짜 선택 불가
                                        selected={form.reserveDate}
                                        onChange={(date) => {
                                            setForm({...form, reserveDate: date})
                                            setVisible(false)
                                        }}
                                        showYearDropdown
                                        showMonthDropdown
                                        yearDropdownItemNumber={100}
                                        scrollableYearDropdown
                                        popperProps={{
                                            strategy: "fixed"
                                        }}
                                    />
                                </div>
                                <hr/>
                                <div>
                                    <p>사용 시작 시간 선택</p>
                                    <DatePicker
                                        className="reserve-form"
                                        selected={form.startTime}
                                        onChange={(date) => {
                                            setForm({...form, startTime: date})
                                            setVisible(false)
                                        }}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={10}
                                        timeCaption="Time"
                                        dateFormat="hh:mm aa"
                                    />
                                    <p>사용 종료 시간 선택</p>
                                    <DatePicker
                                        className="reserve-form"
                                        selected={form.endTime}
                                        onChange={(date) => {
                                            setForm({...form, endTime: date})
                                            setVisible(false)
                                        }}
                                        showTimeSelect
                                        showTimeSelectOnly
                                        timeIntervals={10}
                                        timeCaption="Time"
                                        dateFormat="hh:mm aa"
                                    />
                                </div>
                                <hr/>
                                <div>
                                    <CButton 
                                        className="p-button"
                                        onClick={(event) => {
                                            event.preventDefault()
                                            checkForm()
                                            // setVisible(!visible)
                                        }}>
                                        예약진행
                                    </CButton>
                                </div>
                            </CCol>

                            <CCol>
                                <div>
                                    <CCollapse visible={visible} horizontal>
                                        <CCard style={{ width: '300px' }}>
                                            <CCardBody>
                                                <CForm>
                                                <h2>예약 정보 확인</h2>

                                                <span>이용권 정보</span>
                                                <CFormInput type="text" placeholder={ticketMenu !== '' ? ticketMenu : null} readOnly/>

                                                <span>이용 예정 날짜</span>
                                                <CFormInput 
                                                    type="text" 
                                                    placeholder={
                                                        form.reserveDate !== null
                                                        ? form.reserveDate.getFullYear()+"년 "
                                                        +((form.reserveDate.getMonth()+1<10) ? "0"+(form.reserveDate.getMonth()+1) : (form.reserveDate.getMonth()+1))+"월 "
                                                        +((form.reserveDate.getDate()<10) ? "0"+(form.reserveDate.getDate()) : (form.reserveDate.getDate()))+"일"
                                                        : null
                                                    } 
                                                    readOnly/>

                                                <span>이용 예정 시간</span>
                                                <CFormInput 
                                                    type="text" 
                                                    placeholder={
                                                        form.startTime !== null && form.endTime !== null
                                                        ? (form.startTime.getHours()<10 ? "0"+form.startTime.getHours() : form.startTime.getHours())
                                                        +":"
                                                        + (form.startTime.getMinutes()<10 ? "0"+form.startTime.getMinutes() : form.startTime.getMinutes())
                                                        + " ~ " 
                                                        + (form.endTime.getHours()<10 ? "0"+form.endTime.getHours() : form.endTime.getHours())
                                                        +":"
                                                        + (form.endTime.getMinutes()<10 ? "0"+form.endTime.getMinutes() : form.endTime.getMinutes())
                                                        : null
                                                    } 
                                                    readOnly/>
                                                
                                                <span>좌석 정보</span>
                                                <CFormInput type="text" placeholder={form.sitNum !== '' ? form.sitNum + "번 | " + sitMenu : null} readOnly/>

                                                <CButton 
                                                    className="s-button mt-3"
                                                    onClick={(e) => {
                                                        e.preventDefault()
                                                        setVisible(false)
                                                    }}
                                                    >취소</CButton>
                                                <CButton 
                                                    className="p-button"
                                                    onClick={(event) => {
                                                        event.preventDefault()
                                                        //서버로 보낼 예약 데이터
                                                        const data = {
                                                            "userId": form.userId,
                                                            "sitNum": form.sitNum,
                                                            "reserveDate": form.reserveDate.getFullYear()+"-"
                                                                +((form.reserveDate.getMonth()+1<10) ? "0"+(form.reserveDate.getMonth()+1) : (form.reserveDate.getMonth()+1))+"-"
                                                                +((form.reserveDate.getDate()<10) ? "0"+(form.reserveDate.getDate()) : (form.reserveDate.getDate())),
                                                            "startTime": (form.startTime.getHours()<10 ? "0"+form.startTime.getHours() : form.startTime.getHours())
                                                                +":"
                                                                + (form.startTime.getMinutes()<10 ? "0"+form.startTime.getMinutes() : form.startTime.getMinutes()),
                                                            "endTime": (form.endTime.getHours()<10 ? "0"+form.endTime.getHours() : form.endTime.getHours())
                                                                +":"
                                                                + (form.endTime.getMinutes()<10 ? "0"+form.endTime.getMinutes() : form.endTime.getMinutes())
                                                        };
                                                        reqReservation(data)
                                                    }}
                                                    >결제 진행</CButton>
                                                </CForm>
                                            </CCardBody>
                                        </CCard>
                                    </CCollapse>
                                </div>                                
                            </CCol>
                        </CRow>
                    </CContainer>
                </div>
            </div>
            }
        </main>
    )
}

export default ReservationPage;