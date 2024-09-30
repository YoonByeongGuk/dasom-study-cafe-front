import { CPopover, CButton, CAvatar, CAlert, CAlertLink } from '@coreui/react'

function ProfileBarPage(props) {

    return (
        <main className="profile-page">            

            <CPopover
                // content={logoutButton}
                content = {
                    <div>
                        <CAlert>
                            <CAlertLink  
                                href="/mypage">
                                마이페이지
                            </CAlertLink>
                            <hr />
                            <CAlertLink
                                href="/reservationInfo">
                                예약확인
                            </CAlertLink>
                        </CAlert>                        
                        <CButton  
                            className="p-button"
                            as="button" 
                            onClick={() => {
                                alert(localStorage.getItem("id")+'가 로그아웃 되었습니다.')
                                props.onLogout();
                                window.location.href = '/';
                            }}>로그아웃
                        </CButton>
                    </div>
                }
                placement="bottom"
                title="내 정보"
                trigger="focus"
            >
                
                <CButton shape="rounded-pill">
                    <CAvatar className="profile-badge" color="success" textColor="white">{localStorage.getItem("name")[0]}</CAvatar>
                </CButton>
            </CPopover>
        </main>
    )
}

export default ProfileBarPage;