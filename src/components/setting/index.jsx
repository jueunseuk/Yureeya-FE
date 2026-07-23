import * as S from "./styles";
import BannerSetting from "./bannerSetting";
import AccountSetting from "./accountSetting";
import BoardSetting from "./boardSetting";
import NicknameSetting from "./nicknameSetting";

const UserSetting = ({user}) => {

    return (
        <S.Wrapper>
            <S.SettingWrapper>
                <S.VerticalWrapper>
                    <S.Text $size={"16px"} $weight={"600"} >배경 설정</S.Text>
                    <S.Text $size={"13px"} style={{marginTop: "5px"}}>커뮤니티 상단의 배너 이미지를 직접 설정할 수 있습니다.</S.Text>
                    <BannerSetting />
                </S.VerticalWrapper>
            </S.SettingWrapper>
            <S.SettingWrapper>
                <S.VerticalWrapper>
                    <S.Text $size={"16px"} $weight={"600"} >닉네임 색상 설정</S.Text>
                    <S.Text $size={"13px"} style={{marginTop: "5px"}}>유리 상점에서 구매한 닉네임 색상을 설정할 수 있습니다.</S.Text>
                    <NicknameSetting />
                </S.VerticalWrapper>
            </S.SettingWrapper>
            <S.SettingWrapper>
                <S.VerticalWrapper>
                    <S.Text $size={"16px"} $weight={"600"}>즐겨찾기 게시판 설정</S.Text>
                    <S.Text $size={"13px"} style={{marginTop: "5px"}}>자주 이용하는 게시판을 즐겨찾기 목록에 추가할 수 있습니다.</S.Text>
                    <S.Text $size={"13px"}>설정/해제 후 새로고침하면 반영됩니다.</S.Text>
                </S.VerticalWrapper>
                <BoardSetting />
            </S.SettingWrapper>
            <S.SettingWrapper>
                <S.VerticalWrapper>
                    <S.Text $size={"16px"} $weight={"600"}>알림 설정</S.Text>
                    <S.Text $size={"13px"} style={{marginTop: "5px"}}>알림과 관련된 설정을 할 수 있습니다.</S.Text>
                </S.VerticalWrapper>
            </S.SettingWrapper>
            <S.SettingWrapper>
                <S.VerticalWrapper>
                    <S.Text $size={"16px"} $weight={"600"}>채팅 설정</S.Text>
                    <S.Text $size={"13px"} style={{marginTop: "5px"}}>율톡 서비스에 관련된 설정을 할 수 있습니다.</S.Text>
                </S.VerticalWrapper>
            </S.SettingWrapper>
            <S.SettingWrapper>
                <S.VerticalWrapper>
                    <S.Text $size={"16px"} $weight={"600"}>계정 설정</S.Text>
                    <S.Text $size={"13px"} style={{marginTop: "5px"}}>내 계정 정보를 확인하고 관리할 수 있습니다.</S.Text>
                    <AccountSetting />
                </S.VerticalWrapper>
            </S.SettingWrapper>
        </S.Wrapper>
    );
};

export default UserSetting;