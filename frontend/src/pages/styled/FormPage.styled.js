import styled from 'styled-components'
import { Button } from '../../components/styled/Button.styled.js'

export const FormPageWrapper = styled.div`
    width: 100%; height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    letter-spacing: 0.5px;
`
export const FormPage = styled.section`
    width: 450px; height: 100%;
    display: flex;
    flex-direction: column;
    gap: 12vh;
    font-size: 1em;

    @media (max-width:768px) {
        width: 100%;
        padding: 20px 50px;
        gap: 50px;
    }
`

export const FormTitle = styled.h1`
    padding-top: 8vh;
    text-align: center;
    font-size: 1.75em;

    @media (max-width:768px) {
        padding-top: 0;
    }
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 4vh;
`

export const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: start;
        gap: 10px;
    }
`

export const InputName = styled.span`
    font-size: 1.1em;
    @media (max-width: 768px) {
    }
`

export const Input = styled.input`
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    width: 250px;
    font-size: 1em;
    background-color: rgb(200,200,200);

    @media (max-width: 768px) {
        width: 100%;
    }
`

export const FormButton = styled(Button)`
    padding: 10px 100px;
    margin-top: 50px;
    align-self: center;

    @media (max-width:768px) {
        padding: 10px 75px;
        margin-top: 25px;
    }
`