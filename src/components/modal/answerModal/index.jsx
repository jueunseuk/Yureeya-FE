import * as S from "./styles";
import * as Q from "@/apis/qna";
import { formatDate } from "@/util/dateFormatter";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useUserInfo from "@/hooks/localStorage";

const AnswerModal = ({onClose, question}) => {
    const navigate = useNavigate();
    const user = useUserInfo();
    const [answerData, setAnswerData] = useState([]);
    const [content, setContent] = useState("");
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);

    const fetchAnswer = async () => {
        try {
            setLoading(true);
            const response = await Q.getAnswer(question.questionId);
            setAnswerData(response.data ?? []);
        } catch(error) {
            setAnswerData([]);
        } finally {
            setLoading(false);
        }
    };

    const uploadAnswer = async () => {
        if(!content.trim()) return;
        try {
            setUploading(true);
            await Q.uploadAnswer({content: content.trim()}, question.questionId);
            setContent("");
            await fetchAnswer();
        } catch(error) {
            alert(error.response?.data?.message ?? "답변 등록에 실패했습니다.");
        } finally {
            setUploading(false);
        }
    };

    const adoptAnswer = async (answerId) => {
        if(!window.confirm("이 답변을 채택하시겠습니까?\n채택 후에는 취소할 수 없습니다.")) return;
        try {
            await Q.adoptAnswer(question.questionId, answerId);
            alert("답변을 채택했습니다.");
            await fetchAnswer();
        } catch(error) {
            console.error("답변 채택 실패", error);
            alert(error.response?.data?.message ?? "답변 채택에 실패했습니다.");
        }
    };

    useEffect(() => {
        fetchAnswer();
    }, [question.questionId]);

    const getStatusAttribute = (status) => {
        if(status === "OPEN") return {color: "white", bg: "#4AC5F3"};
        if(status === "HOLD") return {color: "white", bg: "#F2B84B"};
        if(status === "RESOLVED") return {color: "white", bg: "#57B97A"};
        return {color: "white", bg: "#8A6F5A"};
    };

    const statusAttribute = getStatusAttribute(question.status);
    const isQuestionWriter = user?.userId === question.user?.userId;
    const hasAdoptedAnswer = answerData.some((answer) => answer.adoptedAt !== null);
    const canUploadAnswer = question.status === "OPEN" || question.status === "HOLD";

    return (
        <S.Wrapper onMouseDown={(e) => e.target === e.currentTarget && onClose()}>
            {loading ?
                <S.Loading>
                    <S.Text $color={"#878787"} $size={"15px"}>로딩 중..</S.Text>
                </S.Loading>
                :
                <S.Content>
                    <S.ModalHeader>
                        <S.Text $size={"20px"} $weight={"700"}>QnA</S.Text>
                        <S.CloseButton onClick={onClose}>×</S.CloseButton>
                    </S.ModalHeader>
                    <S.QuestionArea>
                        <S.HorizontalWrapper $jc={"space-between"} $ai={"center"} style={{width: "100%"}}>
                            <S.HorizontalWrapper $gap={"8px"} $ai={"center"}>
                                <S.Text $size={"18px"} $weight={"700"}>{question.title}</S.Text>
                                <S.Status $color={statusAttribute.color} $bg={statusAttribute.bg}>{question.status}</S.Status>
                            </S.HorizontalWrapper>
                            <S.Sand>모래알 {question.sandCnt}개</S.Sand>
                        </S.HorizontalWrapper>
                        <S.UserArea onClick={() => navigate(`/users/${question.user.userId}`)}>
                            <S.ProfileImage src={question.user.profileUrl}/>
                            <S.VerticalWrapper $gap={"2px"}>
                                <S.Text $size={"13px"} $weight={"700"}>{question.user.nickname}</S.Text>
                                <S.Text $size={"11px"} $color={"#878787"}>{formatDate(question.createdAt, 7)}</S.Text>
                            </S.VerticalWrapper>
                        </S.UserArea>
                        <S.QuestionContent>{question.content}</S.QuestionContent>
                    </S.QuestionArea>
                    <S.AnswerTitleArea>
                        <S.Text $size={"16px"} $weight={"700"}>답변</S.Text>
                        <S.Text $size={"12px"} $color={"#878787"}>{answerData.length}개</S.Text>
                    </S.AnswerTitleArea>
                    <S.AnswerList>
                        {answerData.length === 0 ?
                            <S.EmptyArea>
                                <S.Text $size={"13px"} $color={"#878787"}>아직 등록된 답변이 없습니다.</S.Text>
                            </S.EmptyArea>
                            :
                            answerData.map((answer) => (
                                <S.AnswerItem key={answer.answerId} $adopted={!!answer.adoptedAt}>
                                    <S.AnswerHeader>
                                        <S.UserArea onClick={() => navigate(`/users/${answer.user.userId}`)}>
                                            <S.ProfileImage src={answer.user.profileUrl}/>
                                            <S.VerticalWrapper $gap={"2px"}>
                                                <S.HorizontalWrapper $gap={"7px"} $ai={"center"}>
                                                    <S.Text $size={"13px"} $weight={"700"}>{answer.user.nickname}</S.Text>
                                                    {answer.adoptedAt && <S.AdoptedBadge>채택된 답변</S.AdoptedBadge>}
                                                </S.HorizontalWrapper>
                                                <S.Text $size={"11px"} $color={"#878787"}>{formatDate(answer.createdAt, 7)}</S.Text>
                                            </S.VerticalWrapper>
                                        </S.UserArea>
                                        {isQuestionWriter && !hasAdoptedAnswer && question.status !== "CLOSED" && <S.AdoptButton onClick={() => adoptAnswer(answer.answerId)}>채택</S.AdoptButton>}
                                    </S.AnswerHeader>
                                    <S.AnswerContent>{answer.content}</S.AnswerContent>
                                    {answer.adoptedAt && <S.AdoptedDate>채택일 {formatDate(answer.adoptedAt, 7)}</S.AdoptedDate>}
                                </S.AnswerItem>
                            ))
                        }
                    </S.AnswerList>
                    {canUploadAnswer &&
                        <S.AnswerUploadArea>
                            <S.Text $size={"15px"} $weight={"700"}>답변 작성</S.Text>
                            <S.AnswerInput value={content} maxLength={1000} placeholder={"답변을 입력해주세요."} onChange={(e) => setContent(e.target.value)}/>
                            <S.HorizontalWrapper $jc={"space-between"} $ai={"center"} style={{width: "100%"}}>
                                <S.Text $size={"11px"} $color={"#878787"}>{content.length} / 1000</S.Text>
                                <S.Button disabled={!content.trim() || uploading} $bg={"#C6BC73"} onClick={uploadAnswer}>{uploading ? "등록 중..." : "답변 등록"}</S.Button>
                            </S.HorizontalWrapper>
                        </S.AnswerUploadArea>
                    }
                </S.Content>
            }
        </S.Wrapper>
    );
}

export default AnswerModal;