import { useState } from "react";
import * as S from "./styles";

const FAQ_CATEGORIES = [
    {
        id: "service",
        title: "I. 서비스 기본 안내",
        questions: [
            {
                id: "service-introduction",
                question: "유리야는 어떤 서비스인가요?",
                answer: (
                    <>
                        유리야는 가수 최유리를 좋아하는 이용자들이 게시글,
                        댓글, 사진과 후기를 공유하며 소통할 수 있는 팬
                        커뮤니티입니다.
                        <br />
                        커뮤니티 활동을 통해 경험치와 모래알을 얻고,
                        출석으로 화로의 온도를 높여 유리 조각을 제작하는
                        등 다양한 활동형 콘텐츠도 이용할 수 있습니다.
                    </>
                ),
            },
            {
                id: "daily-reset",
                question: "하루의 기준은 언제 초기화되나요?",
                answer: (
                    <>
                        출석과 일일 보상의 하루 기준은 대한민국 표준시
                        기준 오전 0시부터 오후 11시 59분 59초까지입니다.
                    </>
                ),
            },
            {
                id: "upcoming-features",
                question: "아직 이용할 수 없는 기능도 있나요?",
                answer: (
                    <>
                        율무위키, 내가 그린 유리, 내가 부른 유리,
                        미발매곡 가사 탐구, 모래사장, 율퀴즈, 유리노트 등
                        일부 기능은 현재 개발 예정입니다.
                        <br />
                        새로운 기능이 추가되면 공지사항을 통해
                        안내합니다.
                    </>
                ),
            },
        ],
    },
    {
        id: "activity",
        title: "II. 활동 및 보상",
        questions: [
            {
                id: "attendance-count",
                question: "출석은 하루에 몇 번 할 수 있나요?",
                answer: (
                    <>
                        출석은 하루에 한 번만 할 수 있습니다.
                        <br />
                        출석하면 경험치와 모래알을 획득하고 화로의 활동
                        온도를 높일 수 있습니다.
                    </>
                ),
            },
            {
                id: "attendance-streak",
                question: "연속 출석이 끊기면 어떻게 되나요?",
                answer: (
                    <>
                        마지막 출석일로부터 3일 이내에 다시 출석하면 활동
                        온도 50℃를 획득합니다.
                        <br />
                        3일을 초과해 출석하지 않은 뒤 다시 출석하면 활동
                        온도가 50℃ 감소합니다.
                        <br />
                        한 달 이상 출석하지 않으면 다음 출석 시 활동
                        온도가 0℃로 초기화됩니다.
                    </>
                ),
            },
            {
                id: "experience",
                question: "경험치는 무엇인가요?",
                answer: (
                    <>
                        경험치는 커뮤니티 활동량과 기여도를 나타내는 누적
                        수치입니다.
                        <br />
                        일부 이벤트의 참여 조건이나 사용자 등급, 추후
                        추가되는 기능에 활용될 수 있습니다.
                    </>
                ),
            },
            {
                id: "experience-sand-difference",
                question: "경험치와 모래알은 어떻게 다른가요?",
                answer: (
                    <>
                        경험치는 사용자의 활동과 기여도를 나타내는 누적
                        수치입니다.
                        <br />
                        모래알은 유리 조각 제작이나 질문 보상 등에 실제로
                        사용하는 커뮤니티 재화입니다.
                    </>
                ),
            },
            {
                id: "earn-sand",
                question: "모래알은 어떻게 얻나요?",
                answer: (
                    <>
                        출석, 게시글 작성, 갤러리 사진 업로드, 투표 참여,
                        질문 답변 작성 등의 활동으로 획득할 수 있습니다.
                        <br />
                        지급되는 모래알의 수는 활동과 게시판에 따라
                        다릅니다.
                    </>
                ),
            },
            {
                id: "comment-sand",
                question: "댓글을 작성해도 모래알을 받을 수 있나요?",
                answer: (
                    <>
                        일반 댓글 작성으로는 모래알이 지급되지 않습니다.
                        다만 댓글 작성에 따른 경험치는 획득할 수 있습니다.
                    </>
                ),
            },
            {
                id: "cheer-interval",
                question: "응원은 얼마나 자주 할 수 있나요?",
                answer: (
                    <>
                        응원은 최대 1분에 한 번 할 수 있습니다.
                        <br />
                        응원 버튼을 누른 시점부터 다음 응원까지의 대기
                        시간이 계산됩니다.
                    </>
                ),
            },
            {
                id: "cheer-experience",
                question: "응원을 여러 번 하면 경험치도 계속 받나요?",
                answer: (
                    <>
                        응원 자체는 1분마다 할 수 있지만, 응원 활동에 따른
                        경험치는 하루에 한 번만 지급됩니다.
                    </>
                ),
            },
            {
                id: "achievement",
                question: "업적은 어떻게 달성하나요?",
                answer: (
                    <>
                        게시글, 댓글, 출석, 응원 등 커뮤니티 활동 중 특정
                        조건을 만족하면 자동으로 업적이 달성됩니다.
                        <br />
                        달성한 업적과 뱃지, 보상은 업적 메뉴에서 확인할 수
                        있습니다.
                    </>
                ),
            },
            {
                id: "achievement-condition",
                question: "업적 달성 조건은 공개되나요?",
                answer: (
                    <>
                        업적의 정확한 달성 조건은 공개되지 않습니다.
                        <br />
                        이용자끼리 발견한 업적 조건이나 정보를 공유하는
                        것은 가능합니다.
                    </>
                ),
            },
        ],
    },
    {
        id: "question",
        title: "III. 질문게시판",
        questions: [
            {
                id: "question-sand-range",
                question: "질문에는 모래알을 몇 개까지 걸 수 있나요?",
                answer: (
                    <>
                        질문 작성 시 본인이 보유한 모래알 중 1개부터
                        100개까지 보상으로 걸 수 있습니다.
                    </>
                ),
            },
            {
                id: "answer-basic-reward",
                question: "질문에 답변하면 어떤 보상을 받나요?",
                answer: (
                    <>
                        다른 이용자의 질문에 답변하면 질문 게시글 하나당
                        최초 한 번에 한해 기본 모래알 1개를 받을 수
                        있습니다.
                        <br />
                        자신의 질문에 직접 작성한 답변은 보상 대상에
                        포함되지 않습니다.
                        <br />
                        답변이 채택되면 질문 작성자가 걸어 둔 모래알에서도
                        별도의 채택 보상을 받을 수 있습니다.
                    </>
                ),
            },
            {
                id: "answer-adoption-reward",
                question: "질문에 건 모래알은 언제 지급되나요?",
                answer: (
                    <>
                        질문 작성자가 답변 하나를 채택하면 등록한 모래알의
                        90%가 채택된 답변 작성자에게 지급됩니다.
                        <br />
                        계산된 보상이 1개 미만인 경우에는 최소 1개의
                        모래알이 지급됩니다.
                    </>
                ),
            },
            {
                id: "question-fee",
                question: "질문 보상에서 수수료가 차감되는 이유는 무엇인가요?",
                answer: (
                    <>
                        질문게시판이 이용자 간 모래알 전달 수단으로
                        악용되는 것을 방지하기 위해 일부 수수료가
                        적용됩니다.
                    </>
                ),
            },
            {
                id: "cancel-adoption",
                question: "채택한 답변을 취소하거나 변경할 수 있나요?",
                answer: (
                    <>
                        답변 채택과 모래알 지급은 취소할 수 없습니다.
                        <br />
                        답변의 내용과 정확성을 충분히 확인한 뒤 채택해
                        주세요.
                    </>
                ),
            },
            {
                id: "no-answer",
                question: "만족스러운 답변이 없으면 어떻게 되나요?",
                answer: (
                    <>
                        답변을 반드시 채택해야 하는 것은 아닙니다.
                        <br />
                        만족스러운 답변이 등록될 때까지 질문을 미해결
                        상태로 유지할 수 있습니다.
                    </>
                ),
            },
        ],
    },
    {
        id: "workshop",
        title: "IV. 유리공방 및 유리상점",
        questions: [
            {
                id: "temperature",
                question: "활동 온도는 무엇인가요?",
                answer: (
                    <>
                        활동 온도는 유리공방에서 유리 조각을 제작하기 위해
                        필요한 수치입니다.
                        <br />
                        출석을 통해 활동 온도를 높일 수 있으며 최대
                        1800℃까지 쌓을 수 있습니다.
                    </>
                ),
            },
            {
                id: "temperature-limit",
                question: "화로가 1800℃가 된 뒤에도 온도가 올라가나요?",
                answer: (
                    <>
                        아니요. 활동 온도가 1800℃에 도달하면 추가로
                        출석해도 더 이상 올라가지 않습니다.
                        <br />
                        모래알이 충분하다면 유리 조각을 바로 제작하는 것이
                        좋습니다.
                    </>
                ),
            },
            {
                id: "make-glass",
                question: "유리 조각은 어떻게 만드나요?",
                answer: (
                    <>
                        화로의 활동 온도가 1800℃이고 모래알을 100개 이상
                        보유하고 있으면 유리공방에서 유리 조각 하나를
                        제작할 수 있습니다.
                        <br />
                        유리 조각을 제작하면 모래알 100개가 사용되고 활동
                        온도는 0℃로 초기화됩니다.
                    </>
                ),
            },
            {
                id: "use-glass",
                question: "유리 조각은 어디에 사용하나요?",
                answer: (
                    <>
                        유리 조각은 유리상점에서 율모티콘, 배경사진,
                        닉네임 색상, 소모품 등 커뮤니티 아이템을 구매할 때
                        사용합니다.
                    </>
                ),
            },
            {
                id: "emoticon",
                question: "율모티콘은 어떻게 얻나요?",
                answer: (
                    <>
                        일부 숨겨진 업적을 달성하거나 유리상점에서
                        구매하여 획득할 수 있습니다.
                        <br />
                        현재 율모티콘은 댓글과 율톡에서 사용할 수
                        있습니다.
                    </>
                ),
            },
            {
                id: "repurchase",
                question: "상점에서 구매한 아이템을 다시 구매할 수 있나요?",
                answer: (
                    <>
                        소모품을 제외한 아이템은 종류별로 한 번만 구매할 수
                        있습니다.
                        <br />
                        소모품은 여러 번 구매할 수 있으며 인벤토리에서
                        확인하고 사용할 수 있습니다.
                    </>
                ),
            },
            {
                id: "nickname-color",
                question: "구매한 닉네임 색상은 어디에 표시되나요?",
                answer: (
                    <>
                        현재 변경된 닉네임 색상은 마이페이지와 율톡에서
                        표시됩니다.
                        <br />
                        적용되는 영역은 추후 업데이트를 통해 확대될 수
                        있습니다.
                    </>
                ),
            },
        ],
    },
    {
        id: "features",
        title: "V. 커뮤니티 기능",
        questions: [
            {
                id: "yultalk",
                question: "율톡은 어떤 기능인가요?",
                answer: (
                    <>
                        커뮤니티에 접속한 이용자끼리 실시간으로 대화할 수
                        있는 채팅 서비스입니다.
                        <br />
                        일대일 채팅을 만들거나 3명 이상 8명 이하의 그룹
                        채팅을 만들 수 있습니다.
                    </>
                ),
            },
            {
                id: "notification",
                question: "알림은 어떤 경우에 오나요?",
                answer: (
                    <>
                        새로운 업적을 달성하거나 랭킹 10위 안에 들었을 때,
                        유리 조각을 선물받았을 때, 율톡에 초대됐을 때
                        알림을 받을 수 있습니다.
                    </>
                ),
            },
            {
                id: "ranking",
                question: "랭킹에는 어떤 항목이 표시되나요?",
                answer: (
                    <>
                        현재 연속 출석, 총 응원, 일일 응원, 유리 조각 제작
                        수에 따른 이용자 순위를 확인할 수 있습니다.
                    </>
                ),
            },
            {
                id: "private-post",
                question: "비밀글은 운영자도 볼 수 있나요?",
                answer: (
                    <>
                        To. 유리 게시판에서 비밀글로 설정한 글은 운영자를
                        포함한 제삼자가 열람할 수 없습니다.
                    </>
                ),
            },
        ],
    },
    {
        id: "content",
        title: "VI. 게시판 및 콘텐츠",
        questions: [
            {
                id: "gallery",
                question: "갤러리에는 어떤 사진을 올릴 수 있나요?",
                answer: (
                    <>
                        직접 촬영한 사진이나 공식 SNS 등을 통해 공개된
                        최유리 관련 사진을 올릴 수 있습니다.
                        <br />
                        사진을 게시할 때에는 저작권, 초상권과 원본 출처를
                        확인해 주세요.
                    </>
                ),
            },
            {
                id: "fan-content",
                question: "팬아트나 커버곡을 올릴 때 주의할 점이 있나요?",
                answer: (
                    <>
                        자신이 직접 제작하거나 부른 콘텐츠만 게시해야
                        합니다.
                        <br />
                        타인의 작품을 무단으로 도용하거나 재업로드하는
                        행위와 저작권을 침해하는 콘텐츠는 금지됩니다.
                    </>
                ),
            },
            {
                id: "report",
                question: "신고할 때 어떤 정보를 작성해야 하나요?",
                answer: (
                    <>
                        신고 대상과 위반 내용을 구체적으로 작성하고,
                        사실관계 확인에 도움이 되는 게시글 주소나 사진 등의
                        자료를 함께 첨부해 주세요.
                    </>
                ),
            },
            {
                id: "suggestion",
                question: "건의한 내용은 반드시 반영되나요?",
                answer: (
                    <>
                        건의사항은 운영 방향, 기술적 가능 여부와 다른
                        이용자에게 미치는 영향 등을 검토하여 반영 여부를
                        결정합니다.
                        <br />
                        건의했다고 해서 반드시 서비스에 반영되는 것은
                        아닙니다.
                    </>
                ),
            },
        ],
    },
    {
        id: "operation",
        title: "VII. 운영 및 제재",
        questions: [
            {
                id: "violation",
                question: "커뮤니티 규칙을 위반하면 어떻게 되나요?",
                answer: (
                    <>
                        이용 가이드를 위반하면 사안에 따라 게시물 삭제,
                        모래알 차감, 활동 제한 등의 조치가 적용될 수
                        있습니다.
                        <br />
                        경미한 위반이라도 반복되거나 악의적인 위반으로
                        판단되면 영구 활동 정지 처분을 받을 수 있습니다.
                    </>
                ),
            },
            {
                id: "permanent-ban",
                question: "영구 활동 정지를 받으면 보유한 재화는 어떻게 되나요?",
                answer: (
                    <>
                        영구 활동 정지 시 보유한 모래알과 활동 온도는
                        0으로 설정될 수 있습니다.
                    </>
                ),
            },
            {
                id: "manager-selection",
                question: "운영자는 어떻게 선정되나요?",
                answer: (
                    <>
                        운영자 신청자 중 커뮤니티 활동 이력, 기여도와 제재
                        이력 등을 종합적으로 검토하여 선정합니다.
                        <br />
                        신고를 통해 제재를 받은 이력이 있는 이용자는
                        운영자로 선정될 수 없습니다.
                    </>
                ),
            },
        ],
    },
];

const Faq = () => {
    const [openItems, setOpenItems] = useState(() => new Set());

    const handleToggle = (questionId) => {
        setOpenItems((previousItems) => {
            const nextItems = new Set(previousItems);

            if (nextItems.has(questionId)) {
                nextItems.delete(questionId);
            } else {
                nextItems.add(questionId);
            }

            return nextItems;
        });
    };

    return (
        <S.Wrapper>
            <S.Title>자주 묻는 질문 (FAQ)</S.Title>

            <S.Text style={{marginBottom: "30px"}}>
                커뮤니티 이용 중 자주 궁금해하는 내용을 분야별로
                정리했습니다. 서비스 이용 방법, 활동 보상, 질문게시판,
                유리공방, 상점과 운영 정책에 관한 답변을 확인할 수
                있습니다.
            </S.Text>

            {FAQ_CATEGORIES.map((category) => (
                <S.Category key={category.id}>
                    <S.SubTitle>{category.title}</S.SubTitle>

                    <S.FaqList>
                        {category.questions.map((item) => {
                            const isOpen = openItems.has(item.id);

                            return (
                                <S.FaqItem key={item.id}>
                                    <S.QuestionButton
                                        type="button"
                                        onClick={() =>
                                            handleToggle(item.id)
                                        }
                                        aria-expanded={isOpen}
                                        aria-controls={`${item.id}-answer`}
                                    >
                                        <S.QuestionText>
                                            {item.question}
                                        </S.QuestionText>

                                        <S.ToggleIcon $isOpen={isOpen}>
                                            +
                                        </S.ToggleIcon>
                                    </S.QuestionButton>

                                    <S.AnswerWrapper
                                        id={`${item.id}-answer`}
                                        $isOpen={isOpen}
                                    >
                                        <S.Answer>
                                            {item.answer}
                                        </S.Answer>
                                    </S.AnswerWrapper>
                                </S.FaqItem>
                            );
                        })}
                    </S.FaqList>
                </S.Category>
            ))}
        </S.Wrapper>
    );
};

export default Faq;