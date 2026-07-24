import * as Q from "@/apis/qna.js";
import * as S from "./styles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { formatDate } from "@/util/dateFormatter";
import useUserInfo from "@/hooks/localStorage";
import QuestionUpload from "@/components/modal/questionUpload";
import AnswerModal from "@/components/modal/answerModal";

const QnABoard = () => {
    const user = useUserInfo();
    const {subPath} = useParams();
    const [questionData, setQuestionData] = useState([]);
    const navigate = useNavigate();
    
    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;
    const [sort, setSort] = useState("createdAt");
    const [direction, setDirection] = useState("DESC");

    const [selectItem, setSelectItem] = useState(null);
    const [openQuestionUploadModal, setOpenQuestionUploadModal] = useState(false);
    const [status, setStatus] = useState("ALL");
    const [totalElement, setTotalElement] = useState(0);

    const [openAnswerModal, setOpenAnswerModal] = useState(false);

    const handleCloseModal = () => {
        setOpenAnswerModal(false);
        setOpenQuestionUploadModal(false);
        fetchQuestion();
    };

    const handleClickQuestion = (question) => {
        setSelectItem(question);
        setOpenAnswerModal(true);
    }

    const fetchQuestion = async () => {
        try {
            const response = await Q.getQuestion(sort, direction, status);
            setQuestionData(response.data);
            setTotalElement(response.data.length);
        } catch(error) {
            
        }
    };

    useEffect(() => {
        if (!user || !user.userId) {
            alert("로그인 후 이용가능합니다.");
            navigate("/");
            return;
        }
        fetchQuestion();
    }, [status]);

    const getStatusAttribute = (status) => {
        if(status === "ALL") {
            return {"color": "white", "bg": "#2F2F2F"};
        } else if(status === "OPEN") {
            return {"color": "white", "bg": "#4AC5F3"};
        } else if(status === "HOLD") {
            return {"color": "white", "bg": "#F2B84B"};
        } else if(status === "RESOLVED") {
            return {"color": "white", "bg": "#57B97A"};
        } else {
            return {"color": "white", "bg": "#8A6F5A"};
        }
    };

    const handleSelectStatus = (selected) => {
        setStatus(selected);
    };

    const getBoxStyle = (currentStatus, color) => ({
        backgroundColor: status === currentStatus ? color : "white",
        border: `2px solid ${color}`,
        cursor: "pointer"
    });

    return (
            <>
            <S.Wrapper>
                {openQuestionUploadModal && <QuestionUpload onClose={handleCloseModal} />}
                {openAnswerModal && <AnswerModal onClose={handleCloseModal} question={selectItem} />}
                <S.Title>{boardInfo.label}</S.Title>
                <S.Description>{boardInfo.description}</S.Description>
                <S.HorizontalWrapper $gap={"15px"}>
                    <S.UploadButton onClick={() => setOpenQuestionUploadModal(true)}>
                        질문하기
                    </S.UploadButton>
                    <S.UploadButton onClick={() => navigate("faq")} style={{width: "50px", backgroundColor: "#C6BC73", color: "white"}} >
                        FAQ
                    </S.UploadButton>
                </S.HorizontalWrapper>
                <S.TableHeader>
                    <S.TextArea>
                        <S.Text $size={"11px"} $weight={"700"}>{totalElement}</S.Text>
                        <S.Text $size={"11px"}>개의 질문</S.Text>
                    </S.TextArea>
                    <S.HorizontalWrapper $ai={"center"} $gap={"10px"} style={{cursor: "default"}}>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectStatus("ALL")}>
                            <S.Text $size={"12px"} $weight={"600"}>ALL</S.Text>
                            <S.CheckBox style={getBoxStyle("ALL", "#2F2F2F")} />
                        </S.HorizontalWrapper>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectStatus("OPEN")}>
                            <S.Text $size={"12px"} $weight={"600"}>OPEN</S.Text>
                            <S.CheckBox style={getBoxStyle("OPEN", "#4AC5F3")} />
                        </S.HorizontalWrapper>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectStatus("HOLD")}>
                            <S.Text $size={"12px"} $weight={"600"}>HOLD</S.Text>
                            <S.CheckBox style={getBoxStyle("HOLD", "#F2B84B")} />
                        </S.HorizontalWrapper>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectStatus("RESOLVED")}>
                            <S.Text $size={"12px"} $weight={"600"}>RESOLVED</S.Text>
                            <S.CheckBox style={getBoxStyle("RESOLVED", "#57B97A")} />
                        </S.HorizontalWrapper>
                        <S.HorizontalWrapper $gap={"3px"} onClick={() => handleSelectStatus("CLOSED")}>
                            <S.Text $size={"12px"} $weight={"600"}>CLOSED</S.Text>
                            <S.CheckBox style={getBoxStyle("CLOSED", "#8A6F5A")} />
                        </S.HorizontalWrapper>
                    </S.HorizontalWrapper>
                </S.TableHeader>
                <S.Table>
                        <colgroup>
                            <col style={{ width: "5%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "40%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "10%" }} />
                            <col style={{ width: "15%" }} />
                        </colgroup>
                    <thead>
                        <S.FirstRow>
                            <S.Field>번호</S.Field>
                            <S.Field>모래알</S.Field>
                            <S.Field>제목</S.Field>
                            <S.Field $align={"left"}>작성자</S.Field>
                            <S.Field>작성일</S.Field>
                            <S.Field>상태</S.Field>
                        </S.FirstRow>
                    </thead>
                    <tbody>
                        {questionData?.map((q) => (
                            <S.Row key={q.questionId}>
                                <S.Column>{q.questionId}</S.Column>
                                <S.Column>{q.sandCnt}</S.Column>
                                <S.Column $align={"left"} style={{cursor: "pointer"}} onClick={() => handleClickQuestion(q)}>{q.title}</S.Column>
                                <S.Column $align={"left"} $size={"12px"} onClick={() => navigate(`/users/${q.userId}`)} style={{cursor: "pointer"}}>{q.user.nickname}</S.Column>
                                <S.Column $color={"#878787"} $size={"12px"}>{formatDate(q.createdAt, 3)}</S.Column>
                                <S.Column style={{padding: "0px 16px"}}>
                                    <S.Text $size={"12px"} $weight={"700"} $color={getStatusAttribute(q.status).color} style={{backgroundColor:getStatusAttribute(q.status).bg, borderRadius: "5px", padding: "3px 0px"}}>{q.status}</S.Text>
                                </S.Column>
                            </S.Row>
                        ))}
                    </tbody>
                </S.Table>
            </S.Wrapper>
        </>
    )
}

export default QnABoard;