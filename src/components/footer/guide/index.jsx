import * as S from "./styles";

const Guide = () => {

    return (
        <>
            <S.Wrapper>
                <S.Title>커뮤니티 이용 가이드</S.Title>
                <S.Text>본 커뮤니티는 이용자 모두가 즐겁게 활동할 수 있도록 커뮤니티의 이용 가이드를 제시하고 있습니다. 본 이용 가이드는 커뮤니티 내에서의 원활한 활동을 돕고, 모든 이용자에게 즐거운 커뮤니티 활동을 제공하기 위한 기준이 됩니다. 이용 가이드를 참고하여 더욱 쉽고 재밌는 커뮤니티 활동을 이어가시길 바랍니다.</S.Text>
                <S.Blank />

                <S.SubTitle>I. 게시판별 목적 안내</S.SubTitle>
                <S.List>
                    <S.FirstListItem>a. 공지사항</S.FirstListItem>
                        <S.SecondListItem>운영자가 커뮤니티 내 주요 공지 및 안내 사항을 전달하는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>커뮤니티 운영자 이상의 권한을 가진 사람만 작성 가능합니다.</S.SecondListItem>
                        <S.SecondListItem>공지는 커뮤니티의 업데이트부터 가수 최유리님의 일정, 앨범 발매, 이벤트 등의 내용입니다.</S.SecondListItem>
                    <S.FirstListItem>b. 이벤트</S.FirstListItem>
                        <S.SecondListItem>커뮤니티에서 진행하는 각종 이벤트 소식을 확인하고 참여할 수 있는 공간입니다.</S.SecondListItem>
                        <S.SecondListItem>이벤트는 일반형, 조건형, 추첨형, 선착순형으로 나뉘어 있고 분류별 설명은 아래와 같습니다.</S.SecondListItem>
                            <S.ThirdListItem>- 일반형: 일반적인 이벤트 분류로 이벤트 게시글의 안내에 맞게 참여하는 이벤트</S.ThirdListItem>
                            <S.ThirdListItem>- 조건형: 경험치, 가입 경과일, 활동 온도 등의 특정 조건을 달성해야 참여 가능한 이벤트</S.ThirdListItem>
                            <S.ThirdListItem>- 추첨형: 참여는 자유지만 참여한 인원 중에 특정 인원 수만 보상을 받는 이벤트</S.ThirdListItem>
                            <S.ThirdListItem>- 선착순형: 이벤트에 주어진 인원 수만 선착순으로 참여 가능한 이벤트</S.ThirdListItem>
                        <S.SecondListItem>이벤트 마감 시간, 참여 방법 및 상세 내용을 숙지 후 참여 바랍니다.</S.SecondListItem>
                        <S.SecondListItem>이벤트 당첨자의 경우 가입한 이메일과 개인 율톡으로 별도의 안내가 이루어집니다.</S.SecondListItem>
                    <S.FirstListItem>c. 캘린더</S.FirstListItem>
                        <S.SecondListItem>가수의 공식 일정과 커뮤니티 내의 주요 일정을 한눈에 확인할 수 있는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>일정은 방송, 라디오, 콘서트, 대학 행사, 페스티벌, 기념일, 생일, 앨범 발매, 판매 등으로 분류됩니다.</S.SecondListItem>
                        <S.SecondListItem>중요한 일정 추가를 원하는 사용자는 캘린더 하단의 건의하기 게시판 이용 바랍니다.</S.SecondListItem>
                    <S.FirstListItem>d. 투표</S.FirstListItem>
                        <S.SecondListItem>커뮤니티와 관련된 주제 또는 아티스트 활동 등에 대한 전반적인 의견을 모으는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>투표 개시, 종료, 집계 등의 조작은 매니저 권한 이상만 가능합니다.</S.SecondListItem>
                        <S.SecondListItem>투표 참여는 모든 사용자에게 열려 있으며, 타인의 의견을 존중해주세요.</S.SecondListItem>
                        <S.SecondListItem>투표 결과는 추후 컨텐츠 기획이나 이벤트 등에 반영될 수 있습니다.</S.SecondListItem>
                    <S.FirstListItem>e. 자유게시판</S.FirstListItem>
                        <S.SecondListItem>자유로운 주제로 이용자 간 다양한 소통을 할 수 있는 공간입니다.</S.SecondListItem>
                        <S.SecondListItem>정치, 종교 등 민감한 주제의 게시글 및 악의적이거나 공격적인 글은 제한됩니다.</S.SecondListItem>
                    <S.FirstListItem>f. 질문게시판</S.FirstListItem>
                        <S.SecondListItem>커뮤니티 및 아티스트 관련 궁금한 사항을 질문하고 답변 받을 수 있는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>질문 작성 시 보상으로 본인이 보유한 모래알을 1개부터 100개까지 걸 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>답변을 채택하면 등록한 모래알에서 수수료 10%를 제외한 금액이 답변 작성자에게 지급됩니다.</S.SecondListItem>
                        <S.ThirdListItem>- 질문게시판이 사용자 간 모래알 전달 수단으로 악용되는 것을 방지</S.ThirdListItem>
                        <S.ThirdListItem>- 10%를 제외한 뒤 소수점 절사</S.ThirdListItem>
                        <S.SecondListItem>답변 채택과 모래알 지급은 취소할 수 없으므로 신중하게 선택해 주세요.</S.SecondListItem>
                        <S.SecondListItem>답변을 채택하지 않더라도 모래알은 회수할 수 없습니다.</S.SecondListItem>
                        <S.SecondListItem><S.Link href="https://cyr-community.vercel.app/faq" style={{fontWeight: "600"}}>FAQ</S.Link>에서 자주 묻는 질문을 확인할 수 있습니다.</S.SecondListItem>
                    <S.FirstListItem>g. 내가 그린 유리(개발 예정)</S.FirstListItem>
                        <S.SecondListItem>커뮤니티 사용자가 직접 제작한 팬아트를 자유롭게 공유하는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>타인의 작품을 무단 도용하거나 재업로드하는 행위는 엄격히 금지됩니다.</S.SecondListItem>
                    <S.FirstListItem>h. 내가 부른 유리(개발 예정)</S.FirstListItem>
                        <S.SecondListItem>커뮤니티 사용자가 직접 부른 가수 최유리의 노래 커버 컨텐츠를 공유할 수 있는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>타인의 콘텐츠를 무단으로 게시하거나 저작권을 침해하는 콘텐츠는 금지됩니다.</S.SecondListItem>
                    <S.FirstListItem>i. To. 유리</S.FirstListItem>
                        <S.SecondListItem>가수 최유리에게 하고 싶은 말을 편지 형식으로 작성하는 공간입니다.</S.SecondListItem>
                        <S.SecondListItem>비밀글로 설정할 경우 운영자를 포함한 모든 제삼자는 열람할 수 없습니다.</S.SecondListItem>
                    <S.FirstListItem>j. 내가 좋아하는 유리 노래</S.FirstListItem>
                        <S.SecondListItem>가수 최유리의 곡 중 본인이 좋아하는 곡을 소개하고 감상을 공유하는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>곡에 대한 개인적인 경험이나 감상 포인트를 함께 나누면 더욱 좋습니다.</S.SecondListItem>
                    <S.FirstListItem>k. 미발매곡 가사 탐구(업데이트 예정)</S.FirstListItem>
                        <S.SecondListItem>미발매된 곡의 가사를 함께 듣고 탐구하며 분석할 수 있는 공간입니다.</S.SecondListItem>
                        <S.SecondListItem>동일한 곡에 대한 게시글이 이미 존재하는 경우 작성 불가능합니다.</S.SecondListItem>
                        <S.SecondListItem>이미 작성된 미발매곡에 관한 수정을 원한다면 해당 게시글의 댓글에서 작성자에게 수정 신청을 해야합니다.</S.SecondListItem>
                    <S.FirstListItem>l. 콘서트 후기</S.FirstListItem>
                        <S.SecondListItem>가수 최유리의 콘서트 참여 후기를 공유하고 소감을 나누는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>공연 중 촬영된 사진이나 영상 공유 시 타인의 초상권을 보호해주세요.</S.SecondListItem>
                    <S.FirstListItem>m. 굿즈 후기</S.FirstListItem>
                        <S.SecondListItem>가수 최유리와 관련된 굿즈 상품의 구매 후기 및 사용 후기를 공유하는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>CD 앨범이나 LP판도 굿즈로 취급합니다.</S.SecondListItem>
                        <S.SecondListItem>상세한 사진 및 사용감 등을 함께 작성하면 다른 이용자들에게 많은 도움이 됩니다.</S.SecondListItem>
                    <S.FirstListItem>n. 건의하기</S.FirstListItem>
                        <S.SecondListItem>커뮤니티 개선 및 발전을 위한 아이디어와 피드백을 제출할 수 있는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>반드시 건의사항이 반영되는 것은 아니므로 참고 바랍니다.</S.SecondListItem>
                        <S.SecondListItem>건의 시 내용은 최대한 구체적으로 작성해주세요.</S.SecondListItem>
                        <S.SecondListItem>건의하기를 비롯한 '커뮤니티 이야기'의 하위 게시판들은 전체게시판, 인기게시판 등에서 노출되지 않습니다.</S.SecondListItem>
                    <S.FirstListItem>o. 신고하기</S.FirstListItem>
                        <S.SecondListItem>커뮤니티 규칙 위반사항 발견 시 신고하는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>신고 시 사실관계 확인을 돕는 사진을 첨부할 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>사실관계가 확인되면 해당 사용자에게 적절한 조치를 취할 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>경미하더라도 반복적으로 커뮤니티 규칙을 위반하는 사용자에 대해서는 영구적인 제재 조치가 부여될 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>처음이라도 악의적으로 커뮤니티 규칙을 위반하는 사용자에 대해서도 영구적인 제재 조치가 부여될 수 있습니다.</S.SecondListItem>
                    <S.FirstListItem>p. 운영자 신청</S.FirstListItem>
                        <S.SecondListItem>운영자 역할 수행을 희망하는 이용자가 신청할 수 있는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>신고를 통해 제재를 당한 이력이 있는 사용자의 경우 운영자를 할 수 없습니다.</S.SecondListItem>
                        <S.SecondListItem>운영자의 후보가 다수 존재할 경우 커뮤니티 활동 이력, 기여도 등을 종합적으로 고려하여 결정합니다.</S.SecondListItem>
                        <S.SecondListItem>커뮤니티의 활성화 규모에 따라 운영자의 수가 유동적으로 변할 수 있습니다.</S.SecondListItem>
                </S.List>
                <S.Blank />

                <S.SubTitle>II. 서비스 안내</S.SubTitle>
                <S.List>
                    <S.FirstListItem>a. 출석</S.FirstListItem>
                        <S.SecondListItem>하루에 한 번씩 출석을 할 수 있는 서비스입니다.</S.SecondListItem>
                        <S.SecondListItem>하루의 기준은 KST 00:00:00부터 23:59:59입니다.</S.SecondListItem>
                        <S.SecondListItem>출석을 통해 활동 온도를 상승시킬 수 있습니다.</S.SecondListItem>
                        <S.ThirdListItem>- 출석별 활동 온도 획득 수치는 <S.Link href="#furnace" style={{fontWeight: "600"}}>III.c.활동 온도</S.Link>를 참고해주세요.</S.ThirdListItem>
                    <S.FirstListItem>b. 응원</S.FirstListItem>
                        <S.SecondListItem>사용자는 메인 화면의 응원 버튼을 눌러서 아티스트를 응원할 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>응원은 최대 1분에 1번씩 가능하고 응원을 클릭하는 순간 카운트가 시작됩니다.</S.SecondListItem>
                    <S.FirstListItem>c. 유리 갤러리</S.FirstListItem>
                        <S.SecondListItem>가수 최유리님이 나온 사진을 종합적으로 관리하는 게시판입니다.</S.SecondListItem>
                        <S.SecondListItem>내가 직접 찍은 사진이나 공식 SNS에 올라왔던 사진들을 업로드하고 조회할 수 있습니다.</S.SecondListItem>
                    <S.FirstListItem>d. <S.Link href="#experience" title="III. 경험치 안내로 이동">경험치</S.Link></S.FirstListItem>
                        <S.SecondListItem>사용자는 해당 커뮤니티 내에서 특정한 활동에 따라 보상으로 경험치를 획득할 수 있습니다.</S.SecondListItem>
                        <S.ThirdListItem>- 활동별 경험치 획득 수치는 <S.Link href="#experience" style={{fontWeight: "600"}}>III.a.경험치</S.Link>를 참고해주세요.</S.ThirdListItem>
                    <S.FirstListItem>e. 알림</S.FirstListItem>
                        <S.SecondListItem>커뮤니티 내에서 아래와 같은 새로운 소식이나 활동과 관련된 알림을 받을 수 있습니다.</S.SecondListItem>
                            <S.ThirdListItem>- 새로운 업적을 달성했을 때</S.ThirdListItem>
                            <S.ThirdListItem>- 새로 랭킹 10위 안에 들었을 때</S.ThirdListItem>
                            <S.ThirdListItem>- 다른 사람에게 유리 조각을 선물 받았을 때</S.ThirdListItem>
                            <S.ThirdListItem>- 율톡에 초대됐을 때</S.ThirdListItem>
                        <S.SecondListItem>알림은 배너 상단의 버튼을 통해 확인할 수 있으며, 동의한 사람에 한해서 이메일 알림 기능도 지원(업데이트 예정)합니다.</S.SecondListItem>
                    <S.FirstListItem>f. 업적</S.FirstListItem>
                        <S.SecondListItem>사용자는 커뮤니티 내에서 특정한 활동을 할 때 특정한 조건을 만족하면 업적 달성과 함께 특정 보상들을 획득하게 됩니다.</S.SecondListItem>
                        <S.SecondListItem>획득한 업적과 뱃지, 보상 내역은 왼쪽의 업적을 눌러서 확인할 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>업적이 해방되는 조건은 모두 비공개이나 사용자끼리 숨겨진 업적 정보를 공유하는 것은 가능합니다.</S.SecondListItem>
                    <S.FirstListItem>g. 율무위키(개발 예정)</S.FirstListItem>
                        <S.SecondListItem>Archive형 백과사전으로 가수 최유리에 관한 모든 공식/비공식 자료가 정리되어 있습니다.</S.SecondListItem>
                        <S.SecondListItem>율무위키 속 AI 율랑이에게 물어보면 직접 찾지 않아도 편하게 궁금한 내용을 알 수 있습니다.</S.SecondListItem>
                    <S.FirstListItem>h. 율톡 <S.Text $size={"12px"} $weight={"700"} style={{display: "inline", fontFamily: "serif", fontStyle: "italic"}}>beta</S.Text></S.FirstListItem>
                        <S.SecondListItem>커뮤니티에 접속한 유저끼리 실시간으로 대화를 주고 받을 수 있는 서비스입니다.</S.SecondListItem>
                        <S.SecondListItem>자유롭게 채팅 그룹을 만들고, 참여하거나 나갈 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>원하는 상대를 지정해서 1대1 채팅을 만들 수도 있습니다.</S.SecondListItem>
                        <S.SecondListItem>채팅 그룹의 최소 인원은 3명, 최대 인원은 8명입니다.</S.SecondListItem>
                        <S.SecondListItem>아직 간단한 기능만 구현된 상태이고, 율톡의 수요가 많아질 경우 더 많은 기능들을 업데이트할 예정입니다.</S.SecondListItem>
                    <S.FirstListItem id="emoticon">i. 율모티콘</S.FirstListItem>
                        <S.SecondListItem>율모티콘이란 AI를 이용해 가수 최유리님을 모티브로 제작한 이모티콘입니다.</S.SecondListItem>
                        <S.SecondListItem>본 커뮤니티에는 생성형 AI로 제작한 가수 최유리님의 이모티콘이 있습니다.</S.SecondListItem>
                        <S.SecondListItem>숨겨진 업적을 달성하거나, 유리상점 등에서 이모티콘을 구매해 사용할 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>율모티콘을 사용할 수 있는 곳은 현재 다음과 같고, 추후 확장될 경우 공지사항을 통해 안내됩니다.</S.SecondListItem>
                        <S.ThirdListItem>- 댓글</S.ThirdListItem>
                        <S.ThirdListItem>- 율톡</S.ThirdListItem>
                    <S.FirstListItem>j. 유리공방</S.FirstListItem>
                        <S.SecondListItem>출석을 통해 화로의 온도를 높이고, 여러 활동(게시글 작성, 댓글 등)을 통해 모래알을 모을 수 있습니다.</S.SecondListItem>
                            <S.ThirdListItem>- 활동별 모래알 획득 수치는 <S.Link href="#sand" style={{fontWeight: "600"}}>III.b.모래알</S.Link>을 참고해주세요.</S.ThirdListItem>
                        <S.SecondListItem>일정 기간 이상 출석을 하지 않으면 화로의 온도가 내려갑니다.</S.SecondListItem>
                            <S.ThirdListItem>- 활동에 따른 온도의 변화는 <S.Link href="#furnace" style={{fontWeight: "600"}}>III.c.화로</S.Link>를 참고해주세요.</S.ThirdListItem>
                        <S.SecondListItem>화로의 온도가 1800℃이고, 모래알이 100개 모이면 하나의 유리 조각을 만들 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>유리 조각을 만들면 온도는 다시 0℃로 내려갑니다.</S.SecondListItem>
                        <S.SecondListItem>화로의 온도는 1800℃가 되면 추가로 출석을 하더라도 온도가 올라가지 않습니다.</S.SecondListItem>
                            <S.ThirdListItem>- 따라서 유리 조각을 만들 수 있을 때마다 바로 만드는 것이 좋습니다.</S.ThirdListItem>
                    <S.FirstListItem id="shop">k. 유리상점</S.FirstListItem>
                        <S.SecondListItem>공방에서 얻은 유리 조각으로 커뮤니티 내에서 사용할 수 있는 아이템을 살 수 있는 상점입니다.</S.SecondListItem>
                        <S.SecondListItem>상품의 카테고리에 대한 설명은 아래와 같습니다.</S.SecondListItem>
                            <S.ThirdListItem>- 율모티콘</S.ThirdListItem>
                                <S.FourthListItem>커뮤니티에서 사용가능한 이모티콘 아이템입니다.</S.FourthListItem>
                                <S.FourthListItem>자세한 설명은 <S.Link href="#emoticon" style={{fontWeight: "600"}}>II.i.율모티콘</S.Link>을 참고해주세요.</S.FourthListItem>
                            <S.ThirdListItem>- 배경사진</S.ThirdListItem>
                                <S.FourthListItem>커뮤니티의 배너로 사용할 수 있는 아이템입니다.</S.FourthListItem>
                                <S.FourthListItem>설정에서 배너 설정을 통해 구매한 배경사진을 관리할 수 있습니다.</S.FourthListItem>
                            <S.ThirdListItem>- 닉네임</S.ThirdListItem>
                                <S.FourthListItem>커뮤니티에서 닉네임의 색상을 변경할 수 있는 아이템입니다.</S.FourthListItem>
                                <S.FourthListItem>변경된 닉네임 색상은 현재 마이페이지, 율톡에서만 표시됩니다.</S.FourthListItem>
                            <S.ThirdListItem>- 소모품</S.ThirdListItem>
                                <S.FourthListItem>앞선 카테고리와 다르게 여러번 구매 가능한 소모품 아이템입니다.</S.FourthListItem>
                                <S.FourthListItem>각 소모품에 대한 설명은 아이템 설명을 참고해주세요.</S.FourthListItem>
                            <S.ThirdListItem>- 기타</S.ThirdListItem>
                                <S.FourthListItem>앞선 카테고리들을 제외한 상품입니다.</S.FourthListItem>
                        <S.SecondListItem>소모품을 제외한 모든 아이템은 단 1회만 구매 가능합니다.</S.SecondListItem>
                        <S.SecondListItem>소모품은 인벤토리에서 조회하고 사용할 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>유리상점의 상품은 정기적으로 업데이트 됩니다.</S.SecondListItem>
                    <S.FirstListItem id="shop">l. 모래사장(개발 예정)</S.FirstListItem>
                        <S.SecondListItem>나만의 모래사장을 상점에서 판매하는 아이템들과 함께 꾸밀 수 있는 공간입니다.</S.SecondListItem>
                        <S.SecondListItem>자신만의 개성을 살려서 다른 사람들에게 자랑해보세요.</S.SecondListItem>
                        <S.SecondListItem></S.SecondListItem>
                    <S.FirstListItem id="shop">m. 율퀴즈~(개발 예정)</S.FirstListItem>
                        <S.SecondListItem>가수 최유리님과 관련된 다양한 주제로 구성된 퀴즈를 풀 수 있는 서비스입니다.</S.SecondListItem>
                        <S.SecondListItem>퀴즈를 맞히면 커뮤니티 활동 보상으로 모래알이 지급됩니다.</S.SecondListItem>
                        <S.SecondListItem>커뮤니티의 매니저 등급 이상의 회원만 문제를 출제할 수 있습니다.</S.SecondListItem>
                    <S.FirstListItem id="shop">n. 랭킹</S.FirstListItem>
                        <S.SecondListItem>다양한 주제에 대해 유저들의 랭킹을 확인할 수 있습니다.</S.SecondListItem>
                        <S.SecondListItem>현재 보여주는 랭킹 정보는 아래와 같습니다.</S.SecondListItem>
                            <S.ThirdListItem>- 출석: 현재 연속 출석 수가 가장 높은 사용자의 순위입니다.</S.ThirdListItem>
                            <S.ThirdListItem>- 총 응원: 지금까지 가장 많은 응원을 보낸 사용자의 순위입니다.</S.ThirdListItem>
                            <S.ThirdListItem>- 일일 응원: 하루에 가장 많은 응원을 보낸 사용자의 순위입니다.</S.ThirdListItem>
                            <S.ThirdListItem>- 유리 조각: 유리 조각을 가장 많이 제작한 사용자의 순위입니다.</S.ThirdListItem>
                    <S.FirstListItem id="shop">o. 유리노트(개발 예정)</S.FirstListItem>
                        <S.SecondListItem>가수 최유리의 발매된 음악을 Spotify 서비스와 연계하여 조회 및 감상할 수 있습니다.</S.SecondListItem>
                </S.List>
                <S.Blank />

                <S.SubTitle>III. 활동에 따른 보상 체계</S.SubTitle>
                <S.List style={{width: "100%"}}>
                    <S.FirstListItem id="experience">a. 경험치</S.FirstListItem>
                    <S.Table>
                        <thead>
                            <S.HRow>
                                <S.HColumn>활동</S.HColumn>
                                <S.HColumn>경험치</S.HColumn>
                                <S.HColumn>비고</S.HColumn>
                            </S.HRow>
                        </thead>
                        <tbody>
                            <S.Row>
                                <S.Column>게시글 작성</S.Column>
                                <S.Column>+10</S.Column>
                                <S.Column>모래 이야기 및 유리 이야기</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>댓글</S.Column>
                                <S.Column>+3</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>갤러리 사진 업로드</S.Column>
                                <S.Column>+2</S.Column>
                                <S.Column>사진 한 장당</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>출석</S.Column>
                                <S.Column>+15</S.Column>
                                <S.Column>하루 한 번</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>응원</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>하루 한 번</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>투표 참여</S.Column>
                                <S.Column>+5</S.Column>
                                <S.Column>투표당 한 번</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>상점 아이템 구매</S.Column>
                                <S.Column>+3</S.Column>
                                <S.Column>아이템 구매당 한 번</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>공방 제작</S.Column>
                                <S.Column>+5</S.Column>
                                <S.Column>유리 조각 하나 제작당 한 번</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>업적 달성</S.Column>
                                <S.Column>+5</S.Column>
                                <S.Column>업적당 한 번</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>답변 작성</S.Column>
                                <S.Column>+3</S.Column>
                                <S.Column>질문 게시글 내</S.Column>
                            </S.Row>
                        </tbody>
                    </S.Table>
                    <S.FirstListItem id="sand">b. 모래알</S.FirstListItem>
                    <S.Table>
                        <thead>
                            <S.HRow>
                                <S.HColumn colSpan={2}>활동</S.HColumn>
                                <S.HColumn>모래알</S.HColumn>
                                <S.HColumn>비고</S.HColumn>
                            </S.HRow>
                        </thead>
                        <tbody>
                            <S.Row>
                                <S.Column rowSpan={9}>게시글 작성</S.Column>
                                <S.Column>자유게시판</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>내가 그린 유리</S.Column>
                                <S.Column>+2</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>내가 부른 유리</S.Column>
                                <S.Column>+3</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>To. 유리</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>내가 좋아하는 유리 노래</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>미발매곡 가사 탐구</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>콘서트 후기</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>굿즈 후기</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>건의하기</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>질문게시판에 답변 작성</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>한 게시글 당 최대 1개(본인 질문 X)</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>댓글</S.Column>
                                <S.Column>0</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>갤러리 사진 업로드</S.Column>
                                <S.Column>+1</S.Column>
                                <S.Column>사진 한 장당</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>출석</S.Column>
                                <S.Column>+3</S.Column>
                                <S.Column>하루 한 번</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>투표 참여</S.Column>
                                <S.Column>+2</S.Column>
                                <S.Column>투표당 한 번</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>업적 달성</S.Column>
                                <S.Column>비공개</S.Column>
                                <S.Column>업적마다 상이</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>이용 가이드에 위배된 경우</S.Column>
                                <S.Column><S.Text $color={"red"} $weight={"600"}>-30</S.Text></S.Column>
                                <S.Column>1회당</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>영구 활동 정지</S.Column>
                                <S.Column><S.Text $color={"red"} $weight={"600"}>0</S.Text></S.Column>
                                <S.Column>0으로 설정</S.Column>
                            </S.Row>
                        </tbody>
                    </S.Table>
                    <S.FirstListItem id="furnace">c. 활동 온도</S.FirstListItem>
                    <S.Table>
                        <thead>
                            <S.HRow>
                                <S.HColumn colSpan={2}>활동</S.HColumn>
                                <S.HColumn>온도 변화</S.HColumn>
                                <S.HColumn>비고</S.HColumn>
                            </S.HRow>
                        </thead>
                        <tbody>
                            <S.Row>
                                <S.Column colSpan={2}>가입 후 첫 출석</S.Column>
                                <S.Column>+150℃</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>연속 출석</S.Column>
                                <S.Column>+100℃</S.Column>
                                <S.Column>연속 이틀차부터 적용</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column rowSpan={4}>출석 보너스</S.Column>
                                <S.Column>일주일 연속</S.Column>
                                <S.Column>+50℃</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>한 달 연속</S.Column>
                                <S.Column>+100℃</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>100일 연속</S.Column>
                                <S.Column>+150℃</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column>일 년 보너스</S.Column>
                                <S.Column>+300℃</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>3일 이내 미출석 후 출석</S.Column>
                                <S.Column>+50℃</S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>3일 초과 미출석 후 출석</S.Column>
                                <S.Column><S.Text $color={"red"} $weight={"600"}>-50℃</S.Text></S.Column>
                                <S.Column>-</S.Column>
                            </S.Row>
                            <S.Row>
                                <S.Column colSpan={2}>한 달 이상 미출석 또는 영구 정지</S.Column>
                                <S.Column><S.Text $color={"red"} $weight={"600"}>0</S.Text></S.Column>
                                <S.Column>0으로 설정</S.Column>
                            </S.Row>
                        </tbody>
                    </S.Table>
                    <S.SecondListItem>ex) 만약 11월 1일이 마지막 출석인 경우</S.SecondListItem>
                        <S.ThirdListItem>- 11.2에 출석하면 +100℃</S.ThirdListItem>
                        <S.ThirdListItem>- 11.3에 출석하면 +50℃</S.ThirdListItem>
                        <S.ThirdListItem>- 11.4에 출석하면 +50℃</S.ThirdListItem>
                        <S.ThirdListItem>- 11.5에 출석하면 -50℃</S.ThirdListItem>
                        <S.ThirdListItem>- 12.1에 출석하면 0℃으로 초기화</S.ThirdListItem>
                </S.List>
                <S.Blank />
            </S.Wrapper>
        </>
    )
};

export default Guide;