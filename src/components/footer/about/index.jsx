import { useState } from "react";
import * as S from "./styles";
import SA from "@/assets/image/SystemArchitecture.png";
import ImageFullScreen from "@/components/modal/imageFullScreen";

const About = () => {
    const [imageModalOpen, setImageModalOpen] = useState(false);

    return (
        <>
            <S.Wrapper>
                <S.Title>About</S.Title>
                <S.Text>Yureeya 프로젝트 개발에 관한 페이지입니다.</S.Text>
                <S.Blank />

                <S.SubTitle>인사말</S.SubTitle>
                <S.Introduce>안녕하세요. 가수 최유리님의 팬 커뮤니티 "Yureeya"를 개발한 <strong>윤준수</strong>입니다. 저는 현재 개발자를 준비 중인 대학생입니다. 이 Yureeya 서비스는 지속적으로 피드백을 반영하고 개발 및 운영해 나갈 예정이니 많은 관심과 이용 부탁드립니다.</S.Introduce>
                <S.Text>연락처: <S.Link href="mailto:junsu120202@gmail.com">junsu120202@gmail.com</S.Link></S.Text>
                <S.Text>Visit: <S.Link href="https://github.com/jueunseuk">Github, </S.Link><S.Link href="https://jundyu.tistory.com">블로그</S.Link></S.Text>
                <S.Blank />

                <S.SubTitle>커뮤니티 개발 계기</S.SubTitle>
                <S.Introduce>2022년 가수 최유리님을 좋아하게 되고, '좋아하는 가수를 위해 뭘 할 수 있을까' 고민하다가 팬들을 위한 커뮤니티를 개발하게 되었습니다. 프로젝트의 초창기에는 혼자 일정이나 사진들을 관리할 목적이었지만 이왕 만드는거 모두가 유용하게 사용할 수 있는 공간으로 발전시키고 싶다는 생각이 들었습니다. 그래서 단순한 정보 공유를 넘어서, 모래들이 서로 즐겁게 소통하고 추억을 나누며 더 끈끈하게 연결될 수 있는 커뮤니티를 목표로 개발을 하게 되었습니다. </S.Introduce>
                <S.Blank />
                
                <S.SubTitle>기술 스택 개요</S.SubTitle>
                <S.List>
                    <S.FirstListItem>Planning</S.FirstListItem>
                    <S.SecondListItem>Google Sheets, Google Docs, Notion</S.SecondListItem>
                    <S.FirstListItem>Design</S.FirstListItem>
                    <S.SecondListItem>Figma, Photoshop</S.SecondListItem>
                    <S.FirstListItem>Frontend</S.FirstListItem>
                    <S.SecondListItem>React, Javascript, Recoil, React Query, Vite, Styled Component</S.SecondListItem>
                    <S.FirstListItem>Backend</S.FirstListItem>
                    <S.SecondListItem>Spring Boot 3, Spring Security, Spring Data JPA, Lombok, Java 21, Gradle</S.SecondListItem>
                    <S.FirstListItem>Database</S.FirstListItem>
                    <S.SecondListItem>MySQL, ERD Cloud</S.SecondListItem>
                    <S.FirstListItem>Networking</S.FirstListItem>
                    <S.SecondListItem>WebSocket, STOMP, Axios</S.SecondListItem>
                    <S.FirstListItem>AI</S.FirstListItem>
                    <S.SecondListItem>OpenAI API (ChatGPT)</S.SecondListItem>
                    <S.FirstListItem>Deployment</S.FirstListItem>
                    <S.SecondListItem>Vercel, Linux Ubuntu 22.04 LTS</S.SecondListItem>
                    <S.FirstListItem>Authentication</S.FirstListItem>
                    <S.SecondListItem>OAuth 2.0 (Naver, Kakao, Google), Gmail SMTP, JWT</S.SecondListItem>
                    <S.FirstListItem>External API</S.FirstListItem>
                    <S.SecondListItem>Youtube, Spotify</S.SecondListItem>
                    <S.FirstListItem>Test</S.FirstListItem>
                    <S.SecondListItem>Postman</S.SecondListItem>
                    <S.FirstListItem>Version Controll</S.FirstListItem>
                    <S.SecondListItem>Git, Github</S.SecondListItem>
                </S.List>
                <S.Blank />

                <S.SubTitle>시스템 아키텍쳐</S.SubTitle>
                <S.Image src={SA} onClick={() => setImageModalOpen(true)} style={{cursor: "pointer"}} />
                {imageModalOpen && <ImageFullScreen onClose={() => setImageModalOpen(false)} profile={SA} />}

                <S.SubTitle>후기</S.SubTitle>
                <S.Introduce>가수 최유리님의 팬 커뮤니티를 만든 뒤 작성하는 개인적인 후기입니다.</S.Introduce>
                <S.Introduce>개발을 끝내려던 순간마다, 자꾸 욕심이 생겨서 '이거 하나만 더 개발하자…'를 반복했습니다. 덕분에 개발 기간은 예정보다 훨씬 길어졌지만, 제가 생각했던 요소들을 추가할 때마다 너무 행복했습니다. 개발하는 내내 유리님의 노래만 들었더니, 시간 가는 줄 모르고 밥도 건너뛰어가며 개발했던 것 같습니다.</S.Introduce>
                <S.Introduce>개발하면서 가장 힘들었던 점은 디자인이었습니다. 어릴 때 디자이너 친구에게 그림 좀 배워볼 걸 그랬습니다. 혹시나 디자인 도움주실 분 있다면 얼마든지 연락주세요. 율모티콘이나 프로필 꾸미기 등의 요소도 AI로 만들었는데 사람 손을 거치지 않아서 그런지 아쉬운 부분이 많았습니다.</S.Introduce>
                <S.Introduce>만들어야하는 게 많다보니 코드가 깔끔하지 못한 관계로 당분간은 리팩토링을 하려고 합니다. 유지보수와 확정성을 고려해서 리팩토링하고 남은 서비스들은 그 후에 다시 만들어나갈 예정입니다. 원래 게임 개발에도 관심이 많았던터라 커뮤니티에 게이미피케이션 요소들이 많아졌습니다. 오히려 이런 요소가 지속적으로 유리야를 이용할 수 있는 모티브라고 생각해서 굳이 빼지 않았습니다.</S.Introduce>
                <S.Introduce>기존엔 AWS에 배포했기 때문에 매달 소정의 비용이 발생했지만 현재는 제 리눅스 노트북에 배포해둔 상태라 특별한 일이 생기지 않는 한 계속 이용할 수 있도록 둘 예정입니다. 저도 시간날 때마다 들어와서 혼자 글도 쓰고, 사진도 올리며 놀 예정입니다ㅎㅎ</S.Introduce>
                <S.Introduce>소속사에 수차례 정식 배포를 문의했지만 답장을 받지 못해 정식으로 배포하진 못했습니다. 하지만 유리야를 개발하면서 직접 DB를 설계하고 리눅스에 배포를 해보며 많은 걸 배울 수 있어 아깝지 않은 시간이었습니다.</S.Introduce>
                <S.Introduce>긴 시간 쏟아 부어서 만든 커뮤니티인 만큼 많은 사람들이 필요로하고 좋아했으면 좋겠습니다.</S.Introduce>
                <S.Introduce>감사합니다.</S.Introduce>
            </S.Wrapper>
        </>
    )
};

export default About;