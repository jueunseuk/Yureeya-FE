import * as S from "./styles";
import cyr from "@/assets/image/cyr.png";
import forest from "@/assets/image/forest.png";
import nave from "@/assets/image/nave.png";
import youtube from "@/assets/icon/link/youtube.svg";
import instagram from "@/assets/icon/link/instagram.svg";
import blog from "@/assets/icon/link/blog.svg";
import facebook from "@/assets/icon/link/facebook.svg";
import soundcloud from "@/assets/icon/link/soundcloud.svg";
import cafe from "@/assets/icon/link/cafe.svg";
import nave2 from "@/assets/icon/link/nave.svg";
import twitter from "@/assets/icon/link/twitter.svg";
import namu from "@/assets/icon/link/namu.svg";
import berriz from "@/assets/icon/link/berriz.svg";
import { useState } from "react";

const Link = () => {
    const [current, setCurrent] = useState("유리");

    return (
        <>
            <S.Wrapper>
                <S.TitleArea>
                    <S.Text $size={"16px"} $weight={"600"}>{current} 바로가기</S.Text>
                    <S.ListArea>
                        <S.Text $size={"12px"} $weight={"600"} $color={current === "유리" ? "black" : "#878787"} onClick={() => setCurrent("유리")}>유리</S.Text>
                        <S.Text $size={"12px"}>|</S.Text>
                        <S.Text $size={"12px"} $weight={"600"} $color={current === "유리 숲" ? "black" : "#878787"} onClick={() => setCurrent("유리 숲")}>유리 숲</S.Text>
                        <S.Text $size={"12px"}>|</S.Text>
                        <S.Text $size={"12px"} $weight={"600"} $color={current === "네이브" ? "black" : "#878787"} onClick={() => setCurrent("네이브")}>네이브</S.Text>
                    </S.ListArea>
                </S.TitleArea>

                {current === "유리" && (
                    <S.Content>
                        <S.PresentImage src={cyr}/>
                        <S.LinkList>
                            <S.ItemArea>
                                <S.Icon src={youtube}/>
                                <S.Link href="https://www.youtube.com/channel/UCyUnjor6wyRA2Xt3fFwnf6w" target="_blank" title="유리의 공식 유튜브 바로가기">
                                <S.LinkText $color={"#FF0000"}>Youtube</S.LinkText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={instagram}/>
                                <S.Link href="https://www.instagram.com/_choiyuree/" target="_blank" title="유리의 인스타그램 바로가기">
                                <S.GradientText $size={"15px"} $weight={"600"}>Instagram</S.GradientText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={blog}/>
                                <S.Link href="https://blog.naver.com/yureemorae" target="_blank" title="유리의 블로그 바로가기">
                                <S.LinkText $color={"#42D31A"}>Blog</S.LinkText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={cafe}/>
                                <S.Link href="https://cafe.daum.net/CHOIYUREE" target="_blank" title="유리의 공식 팬 카페 바로가기">
                                <S.LinkText $color={"#FF2041"}>Cafe</S.LinkText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={facebook}/>
                                <S.Link href="https://www.facebook.com/ChoiYuRee/" target="_blank" title="유리의 공식 페이스북 바로가기">
                                <S.LinkText $color={"#0866FF"}>Facebook</S.LinkText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={soundcloud}/>
                                <S.Link href="https://soundcloud.com/yureechoi" target="_blank" title="유리의 사운드 클라우드 바로가기(현재 업데이트 X)">
                                <S.LinkText $color={"#F26D23"}>SoundCloud</S.LinkText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={namu}/>
                                <S.Link href="https://namu.wiki/w/%EC%B5%9C%EC%9C%A0%EB%A6%AC(%EA%B0%80%EC%88%98)" target="_blank" title="유리의 나무위키 바로가기">
                                <S.LinkText $color={"#00A495  "}>NamuWiki</S.LinkText></S.Link>
                            </S.ItemArea>
                        </S.LinkList>
                    </S.Content>
                )}
                
                {current === "유리 숲" && (
                    <S.Content>
                        <S.PresentImage src={forest}/>
                        <S.LinkList>
                            <S.ItemArea>
                                <S.Icon src={youtube}/>
                                <S.Link href="https://www.youtube.com/@welcometoforest" target="_blank" title="유리의 숲 유튜브 바로가기">
                                    <S.LinkText $color={"#FF0000"}>Youtube</S.LinkText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={instagram}/>
                                <S.Link href="https://www.instagram.com/_welcometoforest/" target="_blank" title="유리의 숲 인스타그램 바로가기">
                                    <S.GradientText $size={"15px"} $weight={"600"}>Instagram</S.GradientText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={berriz}/>
                                <S.Link href="https://berriz.in/ko/choiyuree" target="_blank" title="베리즈 바로가기">
                                    <S.LinkText $color={"#FF1991"}>Berriz</S.LinkText></S.Link>
                            </S.ItemArea>
                        </S.LinkList>
                    </S.Content>
                )}
                
                {current === "네이브" && (
                    <S.Content>
                        <S.PresentImage src={nave}/>
                        <S.LinkList>
                            <S.ItemArea>
                                <S.Icon src={youtube}/>
                                <S.Link href="https://www.youtube.com/@navywave" target="_blank" title="네이브의 유튜브 바로가기">
                                    <S.LinkText $color={"#FF0000"} $size={"15px"} $weight={"600"}>Youtube</S.LinkText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={instagram}/>
                                <S.Link href="https://www.instagram.com/nave_label/" target="_blank" title="네이브의 인스타그램 바로가기">
                                    <S.GradientText $size={"15px"} $weight={"600"}>Instagram</S.GradientText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={nave2}/>
                                <S.Link href="https://navywave.kr/" target="_blank" title="네이브 공식 홈페이지 바로가기">
                                    <S.LinkText $color={"#4266F8"} $size={"15px"} $weight={"600"}>Nave</S.LinkText></S.Link>
                            </S.ItemArea>
                            <S.ItemArea>
                                <S.Icon src={twitter}/>
                                <S.Link href="https://www.instagram.com/nave_label/" target="_blank" title="네이브 X 바로가기">
                                    <S.LinkText $color={"#000000"} $size={"15px"} $weight={"600"}>X</S.LinkText></S.Link>
                            </S.ItemArea>
                        </S.LinkList>
                    </S.Content>
                )}
            </S.Wrapper>
        </>
    );
}

export default Link;