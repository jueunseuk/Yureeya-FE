import * as S from "./styles";
import * as BC from "@/common/basic/BasicComponent";
import * as R from "@/apis/ranking";
import first from "@/assets/icon/rank/first.svg";
import second from "@/assets/icon/rank/second.svg";
import third from "@/assets/icon/rank/third.svg";
import { RANKINGS } from "@/constants/rankings";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "@/util/dateFormatter";
import default_profile from "@/assets/image/default_profile.jpg";

const RankingComponent = () => {
    const navigate = useNavigate();
    const [rankData, setRankDate] = useState([]);
    const [selectedTap, setSelectedTap] = useState(0);
    const [underline, setUnderline] = useState({ width: 0, offset: 0 });
    const refs = useRef([]);

    const page = 0;
    const size = 10;
    const sort = "priority";
    const direction = "ASC";

    useEffect(() => {
        if(refs.current[selectedTap]) {
            const el = refs.current[selectedTap];
            setUnderline({
                width: el.offsetWidth,
                offset: el.offsetLeft,
            });
        }
    }, [selectedTap]);

    const fetchRankingData = async () => {
        try {
            const type = RANKINGS[selectedTap].type;
            const period = RANKINGS[selectedTap].period;
            const response = await R.getRankingData(type, {page, size, direction, sort, period});
            setRankDate(response.data);
        } catch(error) {
            
        }
    };

    useEffect(() => {
        fetchRankingData();
    }, [selectedTap]);

    const handleNavigateUser = (userId) => {
        navigate(`/users/${userId}`);
    };

    return (
        <S.Wrapper>
            <BC.Text $size={"20px"} $weight={"600"} style={{textAlign: "center"}}>랭킹</BC.Text>
            <S.QuoteWrapper>
                <BC.Text $size={"15px"} $weight={"600"}>각 랭킹마다 갱신되는 주기는 아래와 같습니다.</BC.Text>
                <BC.Text $size={"14px"}>출석: 매일 자정</BC.Text>
                <BC.Text $size={"14px"}>총 응원: 매일 자정</BC.Text>
                <BC.Text $size={"14px"}>일일 응원: 10분마다</BC.Text>
                <BC.Text $size={"14px"}>유리 조각: 매일 자정</BC.Text>
            </S.QuoteWrapper>
            <BC.VerticalWrapper>
                <S.TabWrapper>
                    {RANKINGS.map((r, idx) => (
                        <S.NavigateText
                            key={r.id}
                            ref={(el) => (refs.current[idx] = el)}
                            $active={selectedTap === idx}
                            onClick={() => setSelectedTap(idx)}>
                            {r.name}
                        </S.NavigateText>
                    ))}
                    <S.Underline $width={underline.width} $offset={underline.offset} />
                </S.TabWrapper>
                <BC.Text style={{textAlign: "left", margin: "10px 0", width: "100%"}}>{RANKINGS[selectedTap].description}</BC.Text>
            </BC.VerticalWrapper>
            <S.TopRankItemWrapper>
                <S.TopRankItem style={{height: "230px", background: "linear-gradient(0deg, #C0C0C0, #fafafaff)"}}>
                    {(!rankData || rankData.length < 2) ?
                        <BC.EmptyBox $w={"100%"} $h={"100%"} $size={"13px"}>랭킹 정보 없음</BC.EmptyBox>
                        :
                        <BC.VerticalWrapper $jc={"flex-end"} $gap={"15px"} style={{padding: "15px", height: "100%"}}>
                            <BC.Icon src={second} $w={"45px"} style={{position: "absolute", top: "-2px"}}/>
                            <BC.VerticalWrapper $gap={"5px"}>
                                <S.ProfileImage src={rankData[1]?.profileUrl ? rankData[1].profileUrl : default_profile} $w={"100px"} $h={"100px"} $c={"#8A8A8A"} onClick={() => handleNavigateUser(rankData[1].userId)} />
                                <BC.Text $size={"14px"} style={{cursor: "pointer"}} onClick={() => handleNavigateUser(rankData[1].userId)}>{rankData[1]?.nickname}</BC.Text>
                            </BC.VerticalWrapper>
                            <BC.Text $size={"18px"} $weight={"600"}>{rankData[1].score}회</BC.Text>
                        </BC.VerticalWrapper>
                    }
                </S.TopRankItem>
                <S.TopRankItem style={{height: "250px", background: "linear-gradient(0deg, #FFD700, #fffaddff)"}}>
                    {(!rankData || rankData.length < 1) ?
                        <BC.EmptyBox $w={"100%"} $h={"100%"} $size={"13px"}>랭킹 정보 없음</BC.EmptyBox>
                        :
                        <BC.VerticalWrapper $jc={"flex-end"} $gap={"15px"} style={{padding: "15px", height: "100%"}}>
                            <BC.Icon src={first} $w={"50px"} style={{position: "absolute", top: "-25px"}}/>
                            <BC.VerticalWrapper $gap={"5px"}>
                                <S.ProfileImage src={rankData[0]?.profileUrl ? rankData[0].profileUrl : default_profile} $w={"100px"} $h={"100px"} $c={"#AC9306"} onClick={() => handleNavigateUser(rankData[0].userId)} />
                                <BC.Text $size={"14px"} style={{cursor: "pointer"}} onClick={() => handleNavigateUser(rankData[0].userId)}>{rankData[0]?.nickname}</BC.Text>
                            </BC.VerticalWrapper>
                            <BC.Text $size={"18px"} $weight={"600"}>{rankData[0].score}회</BC.Text>
                        </BC.VerticalWrapper>
                    }
                </S.TopRankItem>
                <S.TopRankItem style={{height: "210px", background: "linear-gradient(0deg, #CD7F32, #fff3dfff)"}}>
                    {(!rankData || rankData.length < 3) ?
                        <BC.EmptyBox $w={"100%"} $h={"100%"} $size={"13px"}>랭킹 정보 없음</BC.EmptyBox>
                        :
                        <BC.VerticalWrapper $jc={"flex-end"} $gap={"15px"} style={{padding: "15px", height: "100%"}}>
                            <BC.Icon src={third} $w={"40px"} style={{position: "absolute", top: "20px"}}/>
                            <BC.VerticalWrapper $gap={"5px"}>
                                <S.ProfileImage src={rankData[2]?.profileUrl ? rankData[2].profileUrl : default_profile} $w={"100px"} $h={"100px"} $c={"#995B1D"} onClick={() => handleNavigateUser(rankData[2].userId)} />
                                <BC.Text $size={"14px"} style={{cursor: "pointer"}} onClick={() => handleNavigateUser(rankData[2].userId)}>{rankData[2]?.nickname}</BC.Text>
                            </BC.VerticalWrapper>
                            <BC.Text $size={"18px"} $weight={"600"}>{rankData[2].score}회</BC.Text>
                        </BC.VerticalWrapper>
                    }
                </S.TopRankItem>
            </S.TopRankItemWrapper>
            {rankData.length > 3 &&
                <S.RankItemWrapper>
                    {rankData.slice(3).map((rank, idx) => (
                        <S.RestRankItem key={rank.rankingId}>
                            <BC.HorizontalWrapper $gap={"15px"}>
                                <BC.Text $size={"18px"} $weight={"600"}>{rank.priority}등</BC.Text>
                                <S.ProfileImage src={rank.profileUrl ? rank.profileUrl : default_profile} $w={"30px"} $h={"30px"} onClick={() => handleNavigateUser(rank.userId)}/>
                                <BC.Text $size={"14px"} onClick={() => handleNavigateUser(rank.userId)}>{rank.nickname}</BC.Text>
                            </BC.HorizontalWrapper>
                            <BC.DotLine />
                            <BC.Text $size={"15px"} $weight={"600"}>{rank.score}회</BC.Text>
                        </S.RestRankItem>
                    ))}
                </S.RankItemWrapper>
            }
            <BC.Text $color={"#878787"} style={{textAlign: "center", width: "100%"}}>마지막 업데이트: {formatDate(rankData[0]?.createdAt, 7)}</BC.Text>
        </S.Wrapper>
    )
};

export default RankingComponent;