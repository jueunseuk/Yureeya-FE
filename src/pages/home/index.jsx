import * as BC from "@/common/basic/BasicComponent";
import AnnouncementSummary from "@/components/home/announcement";
import Cheer from "@/components/home/cheer";
import CalendarSummary from "@/components/home/calendar";
import Link from "@/components/home/link";
import LatestPost from "@/components/home/latest";
import GallerySummary from "@/components/home/gallery";
import useUserInfo from "@/hooks/localStorage";
import RankingSummary from "@/components/home/ranking";
import InProgressPoll from "@/components/poll/inProgressPoll";
import YoutubeComponent from "@/components/home/youtube";
import LoudSpeakerPost from "@/components/home/loudSpeaker";
import UnresolvedQna from "@/components/home/qna"

const Home = () => {
    const user = useUserInfo();

    return (
        <>
            <AnnouncementSummary />
            <BC.HorizontalWrapper $jc={"space-between"} style={{width: "100%"}}>
                <Cheer />
                <CalendarSummary />
                <Link />
            </BC.HorizontalWrapper>
            <LoudSpeakerPost />
            <LatestPost />
            <UnresolvedQna />
            <GallerySummary />
            {(user && user.userId) && <InProgressPoll />}
            <RankingSummary />
            <YoutubeComponent />
        </>
    );
}

export default Home;
