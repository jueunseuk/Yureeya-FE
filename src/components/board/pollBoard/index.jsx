import * as S from "./styles";
import * as BC from "@/common/basic/BasicComponent";
import * as P from "@/apis/poll";
import pollIcon from "@/assets/icon/board_sub/notification_poll.svg";
import { useParams } from "react-router-dom";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import InProgressPoll from "@/components/poll/inProgressPoll";
import ClosedPoll from "@/components/poll/closedPoll";
import FinishedPoll from "@/components/poll/finishedPoll";
import CanceledPoll from "@/components/poll/canceledPoll";
import useUserInfo from "@/hooks/localStorage";
import { useState } from "react";
import PollUpload from "@/components/modal/pollUpload";

const PollBoard = () => {
    const user = useUserInfo();
    const {subPath} = useParams();
    const [openPollUploadModal, setOpenPollUploadModal] = useState(false);

    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;

    return (
        <S.Wrapper>
            {openPollUploadModal && <PollUpload onClose={() => setOpenPollUploadModal(false)} />}
            <BC.HorizontalWrapper $jc={"flex-start"} $gap={"5px"} style={{width: "100%"}}>
                <BC.Text $size={"16px"} $weight={"600"} style={{textAlign: "left", width: "100"}}>{boardInfo.label}</BC.Text>
                <BC.Icon src={pollIcon} $w={"15px"} />
            </BC.HorizontalWrapper>
            <BC.Text $size={"13px"} style={{textAlign: "left", width: "100%", marginTop: "10px"}}>{boardInfo.description}</BC.Text>
            {(user?.role === "MANAGER" || user?.role === "ADMIN") &&
                <S.UploadButton onClick={() => setOpenPollUploadModal(true)}>
                    투표 만들기
                </S.UploadButton>
            }
            <BC.VerticalWrapper $gap={"50px"} style={{marginTop: "25px"}}>
                <InProgressPoll />
                <ClosedPoll />
                <FinishedPoll />
                <CanceledPoll />
            </BC.VerticalWrapper>
        </S.Wrapper>
    )
}

export default PollBoard;