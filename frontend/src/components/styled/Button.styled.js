import styled from "styled-components"

export const Button = styled.button`
    border-radius: 2rem;
    border: 1px solid rgb(80,80,80);
    padding: 0.5rem 0.7rem;
    font-size: 0.9em;
    background-color: var(--ui-bg-color);
    color: var(--main-color);
    cursor: pointer;
    &:hover { background-color: rgb(100,100,100); }
`