import * as A from "@/apis/attendance";
import * as S from "./styles";
import attendanceBlack from "@/assets/icon/attendance/attendance_black.svg";
import clock from "@/assets/icon/attendance/clock.svg";
import pencil from "@/assets/icon/attendance/pencil.svg";
import refresh from "@/assets/icon/user/refresh.svg";
import useUserInfo from "@/hooks/localStorage";
import { BOARD_BY_PATH } from "@/constants/boardGroup";
import { formatDate } from "@/util/dateFormatter";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getAttendanceMessage } from "@/util/getAttendanceMessage";
import { UserProfileImage2 } from "@/common/func/UserProfile2";

const AttendanceBoard = () => {
    const navigate = useNavigate();
    const {subPath} = useParams();
    const [comment, setComment] = useState(getAttendanceMessage().message);
    const [cntData, setCntData] = useState({
        thisMonthCnt: 0,
        beforeMonthCnt: 0,
        thisWeekCnt: 0,
        beforeWeekCnt: 0,
        sunday: 0,
        monday: 0,
        tuesday: 0,
        wednesday: 0,
        thursday: 0,
        friday: 0,
        saturday: 0
    });
    const [attendances, setAttendances] = useState([]);
    const user = useUserInfo();
    
    const boardInfo = BOARD_BY_PATH[subPath];
    const boardId = boardInfo.id;

    const now = new Date();
    const day = now.getDay();

    const startOfWeek = new Date(now);
    startOfWeek.setDate(now.getDate() - day);

    let date = [];
    for (let i = 0; i < 7; i++) {
        const d = new Date(startOfWeek);
        d.setDate(startOfWeek.getDate() + i);
        date.push(d);
    }

    const handleClickAttendance = async () => {
        if(!comment || comment.trim() === "") {
            alert("내용을 입력해주세요!");
            return;
        }

        try {
            await A.requestAttendance(comment);
            window.location.reload();
        } catch(error) {

        }
    };

    const handleChangeAttendanceMessgae = () => {
        setComment(getAttendanceMessage().message);
    };

    useEffect(() => {
        const fetchCnt = async () => {
            try {
                const response = await A.requestAttendanceCnt();
                setCntData(response.data);
            } catch(error) {
                
            }
        }
        fetchCnt();
    }, []);

    useEffect(() => {
        const fetchAttendance = async () => {
            try {
                const response = await A.requestAttendanceList();
                setAttendances(response.data);
            } catch(error) {

            }
        }
        fetchAttendance();
    }, []);

    return (
        <>
            <S.Wrapper>
                <S.Title>{boardInfo.label}</S.Title>
                <S.Description>{boardInfo.description}</S.Description>
                <S.VerticalWrapper>
                    <S.Text $size={"28px"} $weight={"700"}>{formatDate(new Date(), 5)}</S.Text>

                    <S.HorizontalWrapper $gap={"15px"}>
                        <S.TextBox>#이번달 총 출석 : {cntData.thisMonthCnt}명</S.TextBox>
                        <S.TextBox>#전월 대비 상승 : <S.Text $weight={"700"} $color={cntData.thisMonthCnt > cntData.beforeMonthCnt ? "blue" : "red"}>{cntData.thisMonthCnt > cntData.beforeMonthCnt ? `+${cntData.thisMonthCnt-cntData.beforeMonthCnt}명` : `${cntData.thisMonthCnt-cntData.beforeMonthCnt}명`}</S.Text></S.TextBox>
                        <S.TextBox>#이번주 총 출석 : {cntData.thisWeekCnt}명</S.TextBox>
                        <S.TextBox>#전주 대비 상승 : <S.Text $weight={"700"} $color={cntData.thisWeekCnt > cntData.beforeWeekCnt ? "blue" : "red"}>{cntData.thisWeekCnt > cntData.beforeWeekCnt ? `+${cntData.thisWeekCnt-cntData.beforeWeekCnt}명` : `${cntData.thisWeekCnt-cntData.beforeWeekCnt}명`}</S.Text></S.TextBox>
                    </S.HorizontalWrapper>

                    <S.Table>
                        <colgroup>
                            <col style={{ width: "14.28%" }} />
                            <col style={{ width: "14.28%" }} />
                            <col style={{ width: "14.28%" }} />
                            <col style={{ width: "14.28%" }} />
                            <col style={{ width: "14.28%" }} />
                            <col style={{ width: "14.28%" }} />
                            <col style={{ width: "14.28%" }} />
                        </colgroup>
                        <thead>
                            <S.Row style={{fontWeight: "700"}}>
                                <S.Column $isToday={day === 0} $color={"red"}>일</S.Column>
                                <S.Column $isToday={day === 1}>월</S.Column>
                                <S.Column $isToday={day === 2}>화</S.Column>
                                <S.Column $isToday={day === 3}>수</S.Column>
                                <S.Column $isToday={day === 4}>목</S.Column>
                                <S.Column $isToday={day === 5}>금</S.Column>
                                <S.Column $isToday={day === 6} $color={"blue"}>토</S.Column>
                            </S.Row>
                        </thead>
                        <tbody>
                            <S.Row>
                                <S.Column $isToday={day === 0}><S.TableBox>
                                    <S.Text $color={"red"} $weight={"700"}>{date[0].getDate()}</S.Text>
                                    <S.Text>{cntData.sunday !== 0 ? `${cntData.sunday}명` : ""}</S.Text>
                                </S.TableBox></S.Column>
                                <S.Column $isToday={day === 1}><S.TableBox>
                                    <S.Text $weight={"700"}>{date[1].getDate()}</S.Text>
                                    <S.Text>{cntData.monday !== 0 ? `${cntData.monday}명` : ""}</S.Text>
                                </S.TableBox></S.Column>
                                <S.Column $isToday={day === 2}><S.TableBox>
                                    <S.Text $weight={"700"}>{date[2].getDate()}</S.Text>
                                    <S.Text>{cntData.tuesday !== 0 ? `${cntData.tuesday}명` : ""}</S.Text>
                                </S.TableBox></S.Column>
                                <S.Column $isToday={day === 3}><S.TableBox>
                                    <S.Text $weight={"700"}>{date[3].getDate()}</S.Text>
                                    <S.Text>{cntData.wednesday !== 0 ? `${cntData.wednesday}명` : ""}</S.Text>
                                </S.TableBox></S.Column>
                                <S.Column $isToday={day === 4}><S.TableBox>
                                    <S.Text $weight={"700"}>{date[4].getDate()}</S.Text>
                                    <S.Text>{cntData.thursday !== 0 ? `${cntData.thursday}명` : ""}</S.Text>
                                </S.TableBox></S.Column>
                                <S.Column $isToday={day === 5}><S.TableBox>
                                    <S.Text $weight={"700"}>{date[5].getDate()}</S.Text>
                                    <S.Text>{cntData.friday !== 0 ? `${cntData.friday}명` : ""}</S.Text>
                                </S.TableBox></S.Column>
                                <S.Column $isToday={day === 6}><S.TableBox>
                                    <S.Text $color={"blue"} $weight={"700"}>{date[6].getDate()}</S.Text>
                                    <S.Text>{cntData.saturday !== 0 ? `${cntData.saturday}명` : ""}</S.Text>
                                </S.TableBox></S.Column>
                            </S.Row>
                        </tbody>
                    </S.Table>

                    <S.AttendanceArea>
                        <S.HorizontalWrapper style={{marginBottom: "5px", position: "relative"}}>
                            <S.Icon src={refresh} onClick={() => handleChangeAttendanceMessgae()} />
                            <S.InputField value={comment} onChange={(e) => setComment(e.target.value)} />
                            <S.AttendanceButton onClick={handleClickAttendance} disabled={comment.length < 5 || user.role === "GUEST"}>출석하기</S.AttendanceButton>
                        </S.HorizontalWrapper>
                        <S.Text $color={"#878787"} $size={"11px"}>출석과 함께 하고 싶은 말을 남겨보세요! 매일 출석하면 경험치를 얻을 수 있습니다.</S.Text>
                    </S.AttendanceArea>

                    {attendances.length === 0 ? (
                        <S.NoAttendanceWrapper>
                            <S.Text $color={"#878787"} $size={"16px"}>아직 출석한 사람이 없어요..</S.Text>
                            <S.Text $color={"#878787"} $size={"16px"}>어서 첫번째 출석 도장을 찍어보세요!</S.Text>
                        </S.NoAttendanceWrapper>
                    ) : (attendances.map((attendance, idx) => (
                        <S.AttendanceBlock key={idx}>
                            <UserProfileImage2 userId={attendance.userId} profileUrl={attendance.profileImageUrl} width={"50px"} height={"50px"} radius={"50px"} />
                            <S.ContentBox>
                                <S.HorizontalWrapper>
                                    <S.HorizontalWrapper $gap={"5px"}>
                                        <S.IconArea src={pencil} />
                                        <S.Text $weight={"700"}>{attendance.userNickname}</S.Text>
                                    </S.HorizontalWrapper>
                                    <S.HorizontalWrapper $gap={"5px"}>
                                        <S.IconArea src={clock} />
                                        <S.Text $color={"#878787"} $size={"12px"}>{formatDate(attendance.createdAt, 6)}</S.Text>
                                    </S.HorizontalWrapper>
                                    <S.HorizontalWrapper $gap={"5px"}>
                                        <S.IconArea src={attendanceBlack} />
                                        <S.Text $size={"12px"}>{attendance.attendanceCnt}</S.Text>
                                    </S.HorizontalWrapper>
                                </S.HorizontalWrapper>
                                <S.AttendanceTextBox style={{whiteSpace: "pre-line"}}>{attendance.comment}</S.AttendanceTextBox>
                            </S.ContentBox>
                        </S.AttendanceBlock>
                    )))}
                </S.VerticalWrapper>
            </S.Wrapper>
        </>
    )
}

export default AttendanceBoard;