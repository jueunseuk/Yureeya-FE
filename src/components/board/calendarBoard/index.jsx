import * as S from "./styles";
import { useParams } from "react-router-dom";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { useState } from "react";
import CalendarComponent from "@/components/calendar/calendarComponent";
import CalendarRequest from "@/components/calendar/calendarRequest";
import useUserInfo from "@/hooks/localStorage";
import upload from "@/assets/icon/gallery/upload.svg";
import edit from "@/assets/icon/etc/edit.svg";
import CalendarUpload from "@/components/modal/calendarUpload";
import CalendarList from "@/components/modal/calendarList";

const CalendarBoard = () => {
    const user = useUserInfo();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const {subPath} = useParams();

    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;

    const handleOpenModal = () => {
        setIsModalOpen(true);
    }
    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleOpenEditModal = () => {
        setIsEditModalOpen(true);
    }
    const handleCloseEditModal = () => {
        setIsEditModalOpen(false);
        window.location.reload();
    }

    const permission = user?.role === "MANAGER" || user?.role === "ADMIN";

    return (
        <>
            <S.Wrapper>
                {isModalOpen && <CalendarUpload onClose={handleCloseModal} />}
                {isEditModalOpen && <CalendarList onClose={handleCloseEditModal}/>}
                <S.Title>{boardInfo.label}</S.Title>
                <S.Description>{boardInfo.description}</S.Description>
                <CalendarComponent />
                {permission && (
                    <S.CalendarEditButton onClick={handleOpenModal}>
                        <S.Icon src={upload}></S.Icon>일정 업로드
                    </S.CalendarEditButton>
                    )}
                    {permission && (
                    <S.CalendarEditButton onClick={handleOpenEditModal}>
                        <S.Icon src={edit}></S.Icon>일정 수정/삭제
                    </S.CalendarEditButton>
                    )}
                <S.Title style={{marginTop: "45px"}}>일정 추가/수정/삭제 요청</S.Title>
                <CalendarRequest />
            </S.Wrapper>
        </>
    )
}

export default CalendarBoard;