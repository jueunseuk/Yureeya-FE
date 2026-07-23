import * as S from "./styles";
import * as BC from "@/common/basic/BasicComponent";
import * as UBS from "@/apis/userBoardSetting";
import dash from "@/assets/icon/etc/dash.svg";
import bookmark from "@/assets/icon/etc/bookmark.svg";
import { BOARDS } from "@/constants/boards";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { SERIAL_BOARDS } from "@/constants/boardGroup";
import useUserInfo from "@/hooks/localStorage";

const Board = () => {
    const user = useUserInfo();
    const navigate = useNavigate();
    const [renderData, setRenderData] = useState([]);

    const handleNavigateBoard = (path) => {
        navigate(`/${path}`);
    };

    const fetchUserBoard = async () => {
        if(!user) return;
        try {
            const response = await UBS.getUserBoardList();
            const favoriteBoards = SERIAL_BOARDS.filter((board) => response.data.includes(Number(board.id)));
            setRenderData(favoriteBoards);
        } catch(error) {

        }
    };

    useEffect(() => {
        fetchUserBoard();
    }, []);

    return (
        <>
            <S.Wrapper>
                <S.BoardBox>
                    <S.Title onClick={() => handleNavigateBoard(BOARDS[0].path)}>
                        <BC.Icon src={bookmark} $w={"15px"} />
                        즐겨찾기 게시판
                    </S.Title>
                    {renderData.length > 0 &&
                        <S.SubBoardBox>
                            {renderData.map((board) => (
                                <S.SubTitle key={board.id} onClick={() => handleNavigateBoard(board.path)}>
                                    <S.DashArea src={dash} />{board.label}
                                    {board.icon && <S.IconArea src={board.icon} />}
                                </S.SubTitle>
                            ))}
                        </S.SubBoardBox>
                    }
                </S.BoardBox>
                <S.Contour />
                <S.BoardBox>
                    <S.Title onClick={() => handleNavigateBoard(BOARDS[0].path)}>
                        {BOARDS[0].label}
                    </S.Title>
                </S.BoardBox>
                <S.Contour />
                <S.BoardBox>
                    <S.Title onClick={() => handleNavigateBoard(BOARDS[1].path)}>
                        <S.IconArea src={BOARDS[1].icon} />
                        {BOARDS[1].label}
                    </S.Title>
                </S.BoardBox>
                <S.Contour />
                <S.BoardBox>
                    <S.Title onClick={() => handleNavigateBoard(BOARDS[2].path)}>
                        <S.IconArea src={BOARDS[2].icon} />
                        {BOARDS[2].label}
                    </S.Title>
                </S.BoardBox>
                <S.Contour />
                <S.BoardBox>
                    <S.Title onClick={() => handleNavigateBoard(BOARDS[3].path)}>
                        <S.IconArea src={BOARDS[3].icon} />
                        {BOARDS[3].label}
                    </S.Title>
                </S.BoardBox>
                <S.Contour />
                <S.BoardBox>
                    <S.Title>
                        <S.IconArea src={BOARDS[4].icon} />
                        {BOARDS[4].label}
                    </S.Title>
                    <S.SubBoardBox>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[4].children[0].path)}><S.DashArea src={dash} />{BOARDS[4].children[0].label}<S.IconArea src={BOARDS[4].children[0].icon} /></S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[4].children[1].path)}><S.DashArea src={dash} />{BOARDS[4].children[1].label}<S.IconArea src={BOARDS[4].children[1].icon} /></S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[4].children[2].path)}><S.DashArea src={dash} />{BOARDS[4].children[2].label}<S.IconArea src={BOARDS[4].children[2].icon} /></S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[4].children[3].path)}><S.DashArea src={dash} />{BOARDS[4].children[3].label}<S.IconArea src={BOARDS[4].children[3].icon} /></S.SubTitle>
                    </S.SubBoardBox>
                </S.BoardBox>
                <S.Contour />
                <S.BoardBox>
                    <S.Title>
                        <S.IconArea src={BOARDS[5].icon} />
                        {BOARDS[5].label}
                    </S.Title>
                    <S.SubBoardBox>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[5].children[0].path)}><S.DashArea src={dash} />{BOARDS[5].children[0].label}</S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[5].children[1].path)}><S.DashArea src={dash} />{BOARDS[5].children[1].label}</S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[5].children[2].path)}><S.DashArea src={dash} />{BOARDS[5].children[2].label}</S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[5].children[3].path)}><S.DashArea src={dash} />{BOARDS[5].children[3].label}</S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[5].children[4].path)}><S.DashArea src={dash} />{BOARDS[5].children[4].label}</S.SubTitle>
                    </S.SubBoardBox>
                </S.BoardBox>
                <S.Contour />
                <S.BoardBox>
                    <S.Title>
                        <S.IconArea src={BOARDS[6].icon} />
                        {BOARDS[6].label}
                    </S.Title>
                    <S.SubBoardBox>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[6].children[0].path)}><S.DashArea src={dash} />{BOARDS[6].children[0].label}<S.IconArea src={BOARDS[6].children[0].icon} /></S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[6].children[1].path)}><S.DashArea src={dash} />{BOARDS[6].children[1].label}<S.IconArea src={BOARDS[6].children[1].icon} /></S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[6].children[2].path)}><S.DashArea src={dash} />{BOARDS[6].children[2].label}<S.IconArea src={BOARDS[6].children[2].icon} /></S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[6].children[3].path)}><S.DashArea src={dash} />{BOARDS[6].children[3].label}<S.IconArea src={BOARDS[6].children[3].icon} /></S.SubTitle>
                    </S.SubBoardBox>
                </S.BoardBox>
                <S.Contour />
                <S.BoardBox>
                    <S.Title>
                        <S.IconArea src={BOARDS[7].icon} />
                        {BOARDS[7].label}
                    </S.Title>
                    <S.SubBoardBox>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[7].children[0].path)}><S.DashArea src={dash} />{BOARDS[7].children[0].label}</S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[7].children[1].path)}><S.DashArea src={dash} />{BOARDS[7].children[1].label}</S.SubTitle>
                        <S.SubTitle onClick={() => handleNavigateBoard(BOARDS[7].children[2].path)}><S.DashArea src={dash} />{BOARDS[7].children[2].label}</S.SubTitle>
                    </S.SubBoardBox>
                </S.BoardBox>
            </S.Wrapper>
        </>
    );
}

export default Board;
