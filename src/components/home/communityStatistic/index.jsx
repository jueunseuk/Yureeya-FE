import * as S from "./styles";
import * as BC from "@/common/basic/BasicComponent";
import * as ST from "@/apis/statistic";
import information from "@/assets/icon/etc/information.svg";
import { useEffect, useState } from "react";
import { formatDate } from "@/util/dateFormatter";

const CommunityStatistic = () => {
    const [statisticData, setStatisticData] = useState({});
    useEffect(() => {
        const fetchStatistic = async () => {
            try {
                const response = await ST.getStatistic();
                setStatisticData(response);
            } catch(error) {

            }
        };

        fetchStatistic();
    }, []);

    return (
        <S.Wrapper>
            <BC.VerticalWrapper $gap={"3px"}>
                <BC.Text $size={"16px"} $weight={"600"}>커뮤니티 통계<BC.Icon src={information} style={{marginLeft: "5px"}} $w={"11px"} title="2시간 간격으로 업데이트 됩니다."/></BC.Text>
                <BC.Text $size={"11px"} $color={"#878787"}>{formatDate(statisticData?.createdAt, 4)}</BC.Text>
            </BC.VerticalWrapper>
            <BC.VerticalWrapper $gap={"5px"}>
                <S.ItemWrapper>
                    <BC.Text>총 회원 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.totalMember || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>오늘 가입한 회원 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.todayMember || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>총 게시글 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.totalPost || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>오늘 올라온 게시글 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.todayPost || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>총 댓글 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.totalComment || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>오늘 올라온 댓글 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.todayComment || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>총 사진 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.totalGallery || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>오늘 올라온 사진 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.todayGallery || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>총 공방 제작 횟수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.totalConvert || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>오늘 공방 제작 횟수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.todayConvert || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>총 응원 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.totalCheer || 0}</BC.Text>
                </S.ItemWrapper>
                <S.ItemWrapper>
                    <BC.Text>오늘 응원 수</BC.Text>
                    <S.DotLine />
                    <BC.Text>{statisticData?.todayCheer || 0}</BC.Text>
                </S.ItemWrapper>
            </BC.VerticalWrapper>
        </S.Wrapper>
    );
}

export default CommunityStatistic;