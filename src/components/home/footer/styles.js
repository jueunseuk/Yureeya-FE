import styled from "styled-components";

export const Wrapper = styled.div`
    display: flex;
    align-items: flex-start;
    flex-wrap: wrap;
    justify-content: center;
    width: 100%;
    padding: 50px 0;
    gap: 100px;
    background:
        linear-gradient(#f3e6c6, #e9dab3),
        radial-gradient(circle at 30% 40%, #c8b37a33 0 2px, transparent 2px 8px),
        radial-gradient(circle at 70% 60%, #c8b37a33 0 2px, transparent 2px 8px),
        repeating-radial-gradient(circle, #b89d6a22 0 1px, transparent 1px 3px);
    background-blend-mode: multiply;
    background-size: cover;
`;

export const VerticalWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 2px;
`;

export const Text = styled.span`
    font-size: 13px;
    cursor: pointer;

    &:hover {
        text-decoration: underline;
        font-weight: 500;
    }
`;

export const LinkText = styled.a`
    font-size: 13px;
    cursor: pointer;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
        font-weight: 500;
    }
`;