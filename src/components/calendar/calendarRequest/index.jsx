import * as C from "@/apis/calendar";
import * as S from "./styles";
import pencil from "@/assets/icon/attendance/pencil.svg";
import unchecked from "@/assets/icon/etc/checked.svg";
import useUserInfo from "@/hooks/localStorage";
import ImageFullScreen from "@/components/modal/imageFullScreen";
import { formatDate } from "@/util/dateFormatter";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UserProfileImage2 } from "@/common/func/UserProfile2";

const CalendarRequest = () => {
    const user = useUserInfo();
    const navigate = useNavigate();
    const [requests, setRequests] = useState([]);
    const [content, setContent] = useState("");
    const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
    const [selectProfileImage, setSelectProfileImage] = useState(null);

    const fetchRequests = async () => {
        try {
            const response = await C.getCalendarRequest();
            setRequests(response.data);
        } catch(error) {

        }
    }

    useEffect(() => {
        fetchRequests();
    }, []);

    const handleRequestProcess = async (calendarRequestId) => {
        try {
            await C.patchRequestProcess({calendarRequestId});
            setRequests(prev => prev.filter(request => request.calendarRequestId !== calendarRequestId));
        } catch(error) {

        } finally {
            fetchRequests();
        }
    };

    const handleUploadRequest = async () => {
        try {
            if(content.length < 5) {
                alert("내용의 길이가 너무 짧습니다.\n최소 5자 이상 작성해주세요!");
                return;
            }
            await C.postCalendarRequest({content});
        } catch(error) {

        } finally {
            fetchRequests();
        }
    };

    const handleCloseModal = () => {
        setIsProfileModalOpen(false);
    };

    return (
        <>
            {isProfileModalOpen && <ImageFullScreen onClose={handleCloseModal} profile={selectProfileImage}/>}
            <S.Wrapper>
                <S.RequestArea>
                    <S.HorizontalWrapper $justify={"space-between"} style={{marginBottom: "5px"}}>
                        <S.InputField value={content} onChange={(e) => setContent(e.target.value)}/>
                        <S.RequestButton onClick={handleUploadRequest}>요청하기</S.RequestButton>
                    </S.HorizontalWrapper>
                    <S.Text $color={"#878787"} $size={"11px"}>캘린더에 등록되지 않거나 수정해야할 스케줄이 있다면 알려주세요!</S.Text>
                    <S.Text $color={"#878787"} $size={"11px"}>확인된 요청은 별도의 통지없이 삭제됩니다.</S.Text>
                </S.RequestArea>

                {requests.map((request) => (
                    <S.RequestBlock key={request.calendarRequestId} >
                        <UserProfileImage2 userId={request.userId} profileUrl={request.profileImageUrl} width={"50px"} height={"50px"} radius={"50px"} />
                        <S.ContentBox>
                            <S.HorizontalWrapper $justify={"space-between"}>
                                <S.HorizontalWrapper $justify={"flex-start"} $gap={"5px"}>
                                    <S.IconArea src={pencil} />
                                    <S.Text $weight={"700"} onClick={() => navigate(`/users/${request.userId}`)} style={{cursor: "pointer"}}>{request.userNickname}</S.Text>
                                    <S.Text $size={"11px"} $color={"#666666ff"}>{formatDate(request.createdAt, 5)}</S.Text>
                                </S.HorizontalWrapper>
                                {(user?.role === "MANAGER" || user?.role === "ADMIN") && <S.IconArea title="요청 확인함" src={unchecked} style={{cursor: "pointer", width: "13px", height: "13px"}} onClick={() => handleRequestProcess(request.calendarRequestId)} />}
                            </S.HorizontalWrapper>
                            <S.RequestTextBox style={{whiteSpace: "pre-line"}}>{request.content}</S.RequestTextBox>
                        </S.ContentBox>
                    </S.RequestBlock>
                ))}
            </S.Wrapper>
        </>
    )
};

export default CalendarRequest;