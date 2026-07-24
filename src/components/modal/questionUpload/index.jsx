import * as Q from "@/apis/qna";
import * as S from "./styles";
import { useState } from "react";

const QuestionUpload = ({onClose}) => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const [sandCnt, setSandCnt] = useState(1);

    const requestComplaintUpload = async () => {
        if(sandCnt < 1 || sandCnt > 100) {
            setSandCnt(1);
            alert("모래알은 1~100개 사이로 걸어야합니다.");
            return;
        }

        try {
            await Q.uploadQuestion({title, content, sandCnt});
            alert("질문 작성 완료!");
            onClose();
        } catch(error) {

        }
    };

    return (
        <>
            <S.Wrapper>
                <S.Content>
                    <S.Text $size={"20px"} $weight={"700"} style={{textAlign: "center", width: "100%"}}>질문하기</S.Text>
                    <S.VerticalWrapper $gap={"15px"}>
                        <S.VerticalWrapper $gap={"5px"}>
                            <S.Text $size={"16px"} $weight={"700"}>제목</S.Text>
                            <S.InputText value={title} onChange={(e) => setTitle(e.target.value)} placeholder="질문 제목을 입력해주세요."/>
                        </S.VerticalWrapper>
                        <S.VerticalWrapper $gap={"5px"}>
                            <S.Text $size={"16px"} $weight={"700"}>내용</S.Text>
                            <S.InputTextArea value={content} onChange={(e) => setContent(e.target.value)} placeholder="질문 내용을 자세히 입력해주세요." $height={"100px"} />
                        </S.VerticalWrapper>
                        <S.VerticalWrapper $gap={"5px"}>
                            <S.Text $size={"16px"} $weight={"700"}>모래알</S.Text>
                            <S.Text $size={"14px"} $weight={"400"} $color={"#878787"}>답변을 해준 사용자에게 제공하는 모래알이니 신중하게 정해주세요.</S.Text>
                            <S.InputNumber value={sandCnt} min={1} max={100} onChange={(e) => setSandCnt(e.target.value)} placeholder="1 ~ 100 사이로 작성" $height={"100px"} />
                        </S.VerticalWrapper>
                    </S.VerticalWrapper>

                    <S.HorizontalWrapper $jc={"center"} $gap={"15px"} style={{width: "100%"}}>
                        <S.HorizontalWrapper $jc={"center"} $gap={"15px"} style={{width: "100%"}}>
                            <S.Button disabled={title.length < 1 || content.length < 1 || sandCnt < 1 || sandCnt > 100} $bg={"#C6BC73"} onClick={requestComplaintUpload}>제출</S.Button>
                            <S.Button $bg={"#B7B7B7"} onClick={onClose}>취소</S.Button>
                        </S.HorizontalWrapper>
                    </S.HorizontalWrapper>
                </S.Content>
            </S.Wrapper>
        </>
    );
}

export default QuestionUpload;