import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    width: 100%;
    border: 1px solid #E7E7E7;
    padding: 20px;
    gap: 5px;
`;

export const Blank = styled.br`
    height: 20px;
`;

export const Contour = styled.hr`
    width: 100%;
    border: 0;
    background-color: #C6BC73;
    height: 3px;
    margin: 15px 0;
    width: 50%;
`

export const Title = styled.h1`
    font-size: 30px;
`;

export const SubTitle = styled.span`
    font-size: 19px;
    font-weight: 600;
`;

export const Text = styled.span`
    font-size: ${({$size}) => $size || "14px"};
    font-weight: ${({$weight}) => $weight || "500"};
    color: ${({$color}) => $color || "black"};
`;

export const Link = styled.a`
    text-decoration: none;
    color: #505050;
    font-size: 14px;
    &: hover {
        text-decoration: underline;
    }
`;

export const Image = styled.img`
    width: 100%;
    object-fit: cover;
`;

export const Introduce = styled.div`
  color: #505050;
  font-size: 15px;
`;

export const List = styled.ol`
    
`;

export const FirstListItem = styled.li`
    border-left: 3px solid #505050;
    padding-left: 3px;
    margin-bottom: 5px;
    font-size: 14px;
    font-weight: 600;
    color: #505050;
    list-style: none;
`;
    
export const SecondListItem = styled.li`
    margin-bottom: 5px;
    font-size: 14px;
    color: #505050;
    margin-bottom: 15px;
    list-style: none;
`;
