import styled from 'styled-components'
import { Button } from '../../components/styled/Button.styled.js'

export const FormPage = styled.section`
    margin-left: 20vw;
    margin-top: 5vh;
    width: 400px;
    display: flex;
    flex-direction: column;
    gap: 3rem;
    font-size: 1em;
`

export const FormTitle = styled.h1`
    text-align: center;
    margin-bottom: 1rem;
    font-size: 1.75em;
`
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`

export const Label = styled.label`
    display: flex;
    align-items: center;
    justify-content: space-between;
`

export const InputName = styled.span`
    font-size: 1.1em;
`

export const Input = styled.input`
    margin-left: 1rem;
    border-radius: 5px;
    border: none;
    padding: 10px 15px;
    width: 250px;
    font-size: 1em;
    background-color: rgb(200,200,200);
`

export const FormButton = styled(Button)`
    margin-top: 1.5rem;
`