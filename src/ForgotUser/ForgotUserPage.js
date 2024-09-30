import { CTabs, CTabList, CTab, CTabContent, CTabPanel, CButton } from '@coreui/react'
import { useState } from 'react';

function ProfileBarPage(props) {
    const [show, setShow] = useState(1);
    return (
        <main className="forgotuser-page">
            <CTabs activeItemKey={1}>
                <CTabList variant="underline">
                    <CTab aria-controls="home-tab-pane" itemKey={1}>아이디 찾기</CTab>
                    <CTab aria-controls="profile-tab-pane" itemKey={2}>비밀번호 찾기</CTab>
                </CTabList>
                
                <CTabContent>
                    <CTabPanel className="py-3" aria-labelledby="home-tab-pane" itemKey={1}>
                        <p>생년월일 8자리</p>
                        <p>핸드폰 번호 입력('-'제외)</p>
                    </CTabPanel>

                    <CTabPanel className="py-3" aria-labelledby="profile-tab-pane" itemKey={2}>
                        <p>아이디 입력</p>
                        <p>핸드폰 번호 입력('-'제외)</p>
                    </CTabPanel>

                    <CButton 
                        className="p-button"                        
                        >확인</CButton>

                    <a onClick={e => {
                        e.preventDefault();                
                        props.onChangePage("login");
                    }}
                    ><u className="underline">로그인하기</u>
                    </a>
                </CTabContent>
            </CTabs>
        </main>
    )
}

export default ProfileBarPage;