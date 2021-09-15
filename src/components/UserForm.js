import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Input } from "@material-ui/core"
import styled from 'styled-components'

function Form(props) {
  console.log(props);
  return (
    <FormContainer>
      <Title className="animate__animated animate__backInDown">Olá, bem vindo a plataforma de acompanhamento das aulas.</Title>
      <Subtitle className="animate__animated animate__backInDown">Digite seu username.</Subtitle>
      <form>
        <SInput
          placeholder="Username..."
          className="animate__animated animate__backInDown"
          type="text"
          value={props.username}
          onChange={props.onChange}
        />
        <SButton className="animate__animated animate__backInDown" onClick={props.connect} tag={Link} to={"/aula"} >Conectar</SButton>
      </form>
      <BigCircle className="animate__animated animate__backInDown">&nbsp;</BigCircle>
      <SmallCircle className="animate__animated animate__backInDown">&nbsp;</SmallCircle>
    </FormContainer>
  )
}

export default Form

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 10%;
`
const Title = styled.h2`
  font-size: 15px;
  text-align: center;
  font-family: "Quicksand";
  color: #333;
`
const Subtitle = styled.h3`
  font-size: 14px;
  font-family: "Quicksand";
  font-weight: bold;
  text-align: center;
  margin: 10%;
  color: #666666;
`
const SInput = styled(Input)`
  background-color: #fff;
  padding-left: 5px;
`

const BigCircle = styled.div`
  background-color: rgb(99, 26, 236);
  border-radius: 50%;
  height: 20vh;
  width: 20vh;
  margin-top: 15%;
`

const SmallCircle = styled.div`
  background-color: rgb(245, 138, 67);
  border-radius: 50%;
  height: 15vh;
  width: 15vh;
  margin-left: 20%;
  margin-top: -18%;
`

const SButton = styled(Button)`
  text-decoration: none;
  border: 1px solid #ccc;
  border-radius: 10%;
  padding: 2px;
  background-color: rgb(245, 138, 70, .8);
  color: #fff;
`


