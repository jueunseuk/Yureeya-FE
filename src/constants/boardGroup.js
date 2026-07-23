import attendance from "@/assets/icon/board/attendance.svg";
import gallery from "@/assets/icon/board/gallery.svg";
import popularity from "@/assets/icon/board/popularity.svg";
import notificationAnnouncement from "@/assets/icon/board_sub/notification_announcement.svg";
import notificationCalendar from "@/assets/icon/board_sub/notification_calendar.svg";
import notificationEvent from "@/assets/icon/board_sub/notification_event.svg";
import notificationPoll from "@/assets/icon/board_sub/notification_poll.svg";
import yureeConcert from "@/assets/icon/board_sub/yuree_concert.svg";
import yureeGoods from "@/assets/icon/board_sub/yuree_goods.svg";
import yureeLyrics from "@/assets/icon/board_sub/yuree_lyrics.svg";
import yureeSong from "@/assets/icon/board_sub/yuree_song.svg";

export const BOARD_GROUPS = [
  {
    key: "main",
    type: "single",
    boards: [
      {
        id: 1,
        path: "new",
        label: "전체 게시글",
        description: "모든 게시글이 모여있는 게시판이에요.",
      },
      {
        id: 2,
        path: "popular",
        label: "인기 게시글",
        description:
          "지금 가장 핫한 게시글 TOP 100을 모아놨어요! 모래들의 관심을 많이 받은 글을 확인해보세요.",
        icon: popularity,
      },
      {
        id: 3,
        path: "attendance",
        label: "출석",
        description: "매일 출석 체크하고 유리 얘기 함께해요!",
        icon: attendance,
      },
      {
        id: 4,
        path: "gallery",
        label: "유리 갤러리",
        description: "유리의 사진을 감상할 수 있는 공간이에요. 귀여운 유리 사진이 있다면 모래들끼리 공유해요!",
        icon: gallery,
      },
    ],
  },
  {
    key: "notice",
    label: "알림",
    icon: notificationAnnouncement,
    type: "group",
    boards: [
      {
        id: 5,
        path: "announcement",
        label: "공지사항",
        description: "커뮤니티 소식, 이벤트, 일정 등 중요한 소식을 전해드려요. 꼭 확인해주세요!",
        icon: notificationAnnouncement,
      },
      {
        id: 6,
        path: "event",
        label: "이벤트",
        description: "다양한 이벤트 소식을 놓치지 마세요! 모래들을 위한 즐거운 참여 공간이에요 🎁",
        icon: notificationEvent,
      },
      {
        id: 7,
        path: "calendar",
        label: "캘린더",
        description: "유리의 공식 일정이나 커뮤니티에서 진행되는 일정을 확인할 수 있어요.",
        icon: notificationCalendar,
      },
      {
        id: 8,
        path: "poll",
        label: "투표",
        description: "유리와 관련된 주제에 대해 본인의 의견을 알려주세요. 투표 결과는 추후 컨텐츠 기획이나 이벤트 등에 반영될 수 있습니다.",
        icon: notificationPoll,
      },
    ],
  },
  {
    key: "community",
    label: "커뮤니티",
    type: "group",
    boards: [
      {
        id: 9,
        path: "free",
        label: "자유게시판",
        description: "자유로운 주제로 이야기를 나눌 수 있는 공간이에요 💬",
      },
      {
        id: 10,
        path: "qna",
        label: "질문게시판",
        description: "궁금한 게 있다면 이곳에 남겨주세요! 다른 모래들이 친절하게 답해줄 거예요.",
      },
      {
        id: 11,
        path: "art",
        label: "내가 그린 유리",
        description: "내가 그린 귀여운 유리를 자랑하는 게시판이에요.",
      },
      {
        id: 12,
        path: "cover",
        label: "내가 부른 유리",
        description: "유리의 노래를 직접 불러봤다면 이곳에 공유해주세요! 용기내서 자랑해봐요 🎤",
      },
      {
        id: 13,
        path: "letter",
        label: "To. 유리",
        description: "유리에게 전하고 싶은 말을 적어보세요! 본인을 제외한 모든 사용자가 볼 수 없으니 안심하세요!",
      },
    ],
  },
  {
    key: "yuree",
    label: "유리 이야기",
    type: "group",
    boards: [
      {
        id: 14,
        path: "favorite",
        label: "내가 좋아하는 유리 노래",
        description: "유리의 곡 중 가장 좋아하는 노래를 소개해보세요. 노래와 관련된 추억도 함께 나누면 좋구요 🎶",
        icon: yureeSong,
      },
      {
        id: 15,
        path: "unreleased",
        label: "미발매곡 가사 탐구",
        description: "유리의 미발매곡이나 숨겨진 명곡 가사를 함께 분석하고 감상하는 공간이에요. 깊이 빠져보아요!",
        icon: yureeLyrics,
      },
      {
        id: 16,
        path: "concert",
        label: "콘서트 후기",
        description: "유리의 무대를 직접 보고 온 이야기를 들려주세요! 현장의 감동을 함께 나눠요 ✨",
        icon: yureeConcert,
      },
      {
        id: 17,
        path: "goods",
        label: "굿즈 후기",
        description: "다른 모래들이 참고할 수 있도록 본인이 산 굿즈 후기를 알려주세요.",
        icon: yureeGoods,
      },
    ],
  },
  {
    key: "management",
    label: "운영",
    type: "group",
    boards: [
      {
        id: 18,
        path: "suggestion",
        label: "건의하기",
        description: "팬카페에 바라는 점이나 개선됐으면 하는 내용을 자유롭게 건의해주세요. 운영진이 귀 기울일게요!",
      },
      {
        id: 19,
        path: "complaint",
        label: "신고하기",
        description: "커뮤니티 내에서 불편한 상황이 있었다면 이곳에 신고해주세요. 모두가 쾌적한 공간을 함께 만들어요.",
      },
      {
        id: 20,
        path: "apply",
        label: "운영자 신청",
        description: "팬카페를 함께 운영하고 싶은 모래들은 이곳에 신청해주세요! 책임감 있고 유리를 사랑하는 마음만 있다면 환영해요 💛",
      },
    ],
  },
];

export const SERIAL_BOARDS = BOARD_GROUPS.flatMap((group) => group.boards);

export const BOARD_BY_PATH = Object.fromEntries(
  SERIAL_BOARDS.map((board) => [board.path, board])
);

export const BOARD_BY_ID = Object.fromEntries(
  SERIAL_BOARDS.map((board) => [board.id, board])
);