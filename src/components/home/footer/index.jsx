import * as S from "./styles";
import * as BC from "@/common/basic/BasicComponent";
import favicon from "@/assets/branding/favicon2.svg";
import { useNavigate } from "react-router-dom";

const Footer = () => {
    const navigate = useNavigate();

    const handleNavigate = (url) => {
        navigate(`/${url}`);
    };

    return (
        <>
            <S.Wrapper>
                <S.VerticalWrapper $gap={"2px"} $ai={"flex-start"}>
                    <BC.Text $size={"16px"} $weight={"700"} style={{margin: "5px 0 10px 0", borderBottom: "2px solid black"}}>SERVICES</BC.Text>
                    <S.Text onClick={() => handleNavigate("new")}>게시판</S.Text>
                    <S.Text onClick={() => handleNavigate("user/craftshop")}>유리공방</S.Text>
                    <S.Text onClick={() => handleNavigate("user/shop")}>유리상점</S.Text>
                    <S.Text onClick={() => handleNavigate("event")}>이벤트</S.Text>
                    <S.Text onClick={() => handleNavigate("calendar")}>캘린더</S.Text>
                    <S.Text onClick={() => handleNavigate("poll")}>투표</S.Text>
                    <S.Text onClick={() => handleNavigate("ranking")}>랭킹</S.Text>
                </S.VerticalWrapper>
                <S.VerticalWrapper $gap={"2px"} $ai={"flex-start"}>
                    <BC.Text $size={"16px"} $weight={"700"} style={{margin: "5px 0 10px 0", borderBottom: "2px solid black"}}>LEGAL</BC.Text>
                    <S.Text onClick={() => handleNavigate("terms")}>서비스 이용약관</S.Text>
                    <S.Text onClick={() => handleNavigate("policy")}>개인정보 보호정책</S.Text>
                    <S.Text onClick={() => handleNavigate("disclaimer")}>책임의 한계 및 법적 고지</S.Text>
                </S.VerticalWrapper>
                <S.VerticalWrapper $gap={"2px"} $ai={"flex-start"}>
                    <BC.Text $size={"16px"} $weight={"700"} style={{margin: "5px 0 10px 0", borderBottom: "2px solid black"}}>SUPPORT</BC.Text>
                    <S.Text onClick={() => handleNavigate("guide")}>커뮤니티 이용가이드</S.Text>
                    <S.Text onClick={() => handleNavigate("faq")}>FAQ</S.Text>
                    <S.Text onClick={() => handleNavigate("suggestion")}>건의하기</S.Text>
                    <S.Text onClick={() => handleNavigate("complaint")}>신고하기</S.Text>
                </S.VerticalWrapper>
                <S.VerticalWrapper $gap={"2px"} $ai={"flex-start"}>
                    <BC.Text $size={"16px"} $weight={"700"} style={{margin: "5px 0 10px 0", borderBottom: "2px solid black"}}>ABOUT</BC.Text>
                    <BC.Text>Name : 윤준수(Junsu Yun)</BC.Text>
                    <BC.Text>Email : junsu120202@gmail.com</BC.Text>
                    <BC.Text style={{marginBottom: "5px"}}>Tel : 010-6558-4431</BC.Text>
                    <S.Text onClick={() => handleNavigate("about")}>About</S.Text>
                    <S.LinkText href="https://jundyu.tistory.com/" target="_blank">Blog</S.LinkText>
                    <S.LinkText href="https://github.com/jueunseuk" target="_blank">Github</S.LinkText>
                </S.VerticalWrapper>
                <S.VerticalWrapper style={{alignItems: "center"}}>
                    <BC.Icon src={favicon} $w={"120px"} />
                    <BC.Text $size={"18px"} $weight={"600"} $color={"#BAA644"} style={{marginTop: "5px"}}>Yureeya</BC.Text>
                </S.VerticalWrapper>
            </S.Wrapper>
        </>
    );
}

export default Footer;