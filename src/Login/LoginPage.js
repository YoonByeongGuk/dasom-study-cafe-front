import { useState } from 'react';
import api from '../api/api';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { CForm, CFormFloating, CFormInput, CFormLabel } from '@coreui/bootstrap-react'
import { PiSealCheckFill } from "react-icons/pi";

function LoginPage(props) {
    const [show, setShow] = useState(false);

    const [form, setForm] = useState({
        id: '',
        pw: '',
    });

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    //서버로 보낼 로그인 데이터
    const data = {
        "userId": form.id,
        "userPw": form.pw
    };
    
    //서버 전송 함수(axios post)
    const conTest = () => api.post('/api/login', data)
    .then((res) => {
        //로그인 성공했을 때
        if(res.data.success) {            
            localStorage.setItem("id", form.id);
            localStorage.setItem("name", res.data.name);
            alert(localStorage.getItem("name")+'님 로그인 되었습니다');
            // handleShow();
            props.onLogin();
            window.location.href = '/';
        }
        //로그인 실패했을 때
        else{
            alert(res.data.message);
        }
    }).catch((err) => {
        alert(err.response.data.message);
        console.log(err);
    })
    
    //화면부
    return (
        <main className="login-page">
            <div className="login-logo"></div>

            <CForm className="login-form">

                {/* 아이디 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput 
                        type="id" 
                        id="floatingId" 
                        value={form.id} 
                        onChange={e => setForm({...form, id: e.target.value})} 
                        placeholder="abcd1234"/>
                    <CFormLabel htmlFor="floatingId">아이디</CFormLabel>
                </CFormFloating>

                {/* 비밀번호 입력*/}
                <CFormFloating className="mb-3">
                    <CFormInput 
                        type="password" 
                        id="floatingPassword" 
                        value={form.pw} 
                        onChange={e => setForm({...form, pw: e.target.value})} 
                        placeholder="password"/>
                    <CFormLabel htmlFor="floatingPassword">비밀번호</CFormLabel>
                </CFormFloating>

                {/* 로그인 정보 저장 & 비밀번호 찾기 */}
                {/* <CFormCheck inline id="ssoChecked" label="로그인 정보 저장"/> */}
                <CFormLabel className="mb-5" style={{float: 'right'}}>
                    <a onClick={e => {
                        e.preventDefault();                
                        props.onChangePage("forgotUser");
                    }}
                    ><u className="underline">비밀번호를 잊으셨나요?</u>
                    </a>
                </CFormLabel>
            </CForm>

            {/* 버튼 */}
            <Button 
                onClick={conTest} 
                className="p-button" 
                variant="mb-3 p-1 px-3" 
                size="" 
                style={{ borderRadius: '13px', borderWidth: '2px' }}>
                로그인
            </Button>
            <Button onClick={(e) => {
                e.preventDefault();                
                props.onChangePage("signUp");
            }} 
                variant="mb-3 p-1 px-3" 
                size="" 
                className="s-button" 
                style={{ borderRadius: '13px', borderWidth: '2px' }}>
                회원가입
            </Button>

            {/* 로그인 성공 알림창 */}
            <Modal show={show} onHide={handleClose} centered>
                <Modal.Body className="modal-body">
                    <PiSealCheckFill size={70}/>
                    <p>로그인 되었습니다.</p>
                </Modal.Body>
                <Modal.Footer>
                <Button className="p-button" variant="mb-3 p-1 px-3" onClick={handleClose}>확인</Button>
                </Modal.Footer>
            </Modal>
        </main>
    )
}

export default LoginPage;