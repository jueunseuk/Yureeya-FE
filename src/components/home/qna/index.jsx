import * as Q from "@/apis/qna.js";
import * as S from "./styles";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/util/dateFormatter";
import { SkeletonItem } from "@/common/skeleton/Skeleton";
import useUserInfo from "@/hooks/localStorage";

const UnresolvedQna = () => {
    const user = useUserInfo();
    const [questions, setQuestions] = useState([]);
    const [skeleton, setSkeleton] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        if(!user?.userId) {
            setSkeleton(false);
            setQuestions([]);
            return;
        }

        const fetchQuestion = async () => {
            try {
                setSkeleton(true);
                const response = await Q.getQuestion("createdAt", "DESC", "OPEN");
                setQuestions(response.data ?? []);
            } catch(error) {
                console.error("미해결 질문 조회 실패", error);
                setQuestions([]);
            } finally {
                setSkeleton(false);
            }
        };

        fetchQuestion();
    }, [user?.userId]);

    return (
        <S.Wrapper>
            <S.TitleArea>
                <S.Text $size={"16px"} $weight={"600"}>답변을 기다리는 질문</S.Text>
                <S.Text $size={"12px"} style={{cursor: "pointer"}} onClick={() => navigate("/qna")}>더보기</S.Text>
            </S.TitleArea>

            {!user?.userId ?
                <S.EmptyArea>
                    <S.Text $size={"13px"} $color={"#878787"}>로그인 후 질문을 확인할 수 있습니다.</S.Text>
                </S.EmptyArea>
                :
                <S.Table>
                    <colgroup>
                        <col style={{width: "5%"}}/>
                        <col style={{width: "10%"}}/>
                        <col style={{width: "40%"}}/>
                        <col style={{width: "10%"}}/>
                        <col style={{width: "10%"}}/>
                        <col style={{width: "15%"}}/>
                    </colgroup>
                    <tbody>
                        {skeleton ?
                            Array.from({length: 5}).map((_, index) => (
                                <S.Row key={index}>
                                    <S.FirstColumn><SkeletonItem $width="100%" $height="15px" $radius={"5px"}/></S.FirstColumn>
                                    <S.Column><SkeletonItem $width="100%" $height="15px" $radius={"5px"}/></S.Column>
                                    <S.Column><SkeletonItem $width="100%" $height="15px" $radius={"5px"}/></S.Column>
                                    <S.Column><SkeletonItem $width="100%" $height="15px" $radius={"5px"}/></S.Column>
                                    <S.Column><SkeletonItem $width="100%" $height="15px" $radius={"5px"}/></S.Column>
                                    <S.Column><SkeletonItem $width="100%" $height="15px" $radius={"5px"}/></S.Column>
                                </S.Row>
                            ))
                            :
                            questions.length === 0 ?
                                <S.Row>
                                    <S.Column colSpan={6}>
                                        <S.Text $size={"13px"} $color={"#878787"}>답변을 기다리는 질문이 없습니다.</S.Text>
                                    </S.Column>
                                </S.Row>
                                :
                                questions.slice(0, 5).map((question) => (
                                    <S.Row key={question.questionId}>
                                        <S.FirstColumn>
                                            <S.Text style={{cursor: "pointer"}}>[질문]</S.Text>
                                        </S.FirstColumn>
                                        <S.Column>{question.sandCnt}</S.Column>
                                        <S.Column $align={"left"} style={{cursor: "pointer"}} onClick={() => navigate("/qna")}>{question.title}</S.Column>
                                        <S.Column $align={"left"} $size={"12px"} onClick={() => navigate(`/users/${question.user.userId}`)} style={{cursor: "pointer"}}>{question.user.nickname}</S.Column>
                                        <S.Column $color={"#878787"} $size={"12px"}>{formatDate(question.createdAt, 3)}</S.Column>
                                        <S.Column style={{padding: "0px 16px"}}>
                                            <S.Text $size={"12px"} $weight={"700"} $color={"white"} style={{display: "block", backgroundColor: "#4AC5F3", borderRadius: "5px", padding: "3px 0px", textAlign: "center"}}>{question.status}</S.Text>
                                        </S.Column>
                                    </S.Row>
                                ))
                        }
                    </tbody>
                </S.Table>
            }
        </S.Wrapper>
    );
};

export default UnresolvedQna;