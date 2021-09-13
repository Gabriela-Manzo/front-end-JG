import React from 'react'

function LandingPage() {
  return (
    <div className="container--lp">
      <h2>Olá, bem vindo a plataforma de acompanhamento das aulas.</h2>
      <h3>Escolha seu perfil.</h3>
      <div className="container--btn">
        <button className="btn btn--prof"> Professor(a)</button>
        <button className="btn btn--aluno"> Aluno(a)</button>
      </div>
      <div className="circle--big">&nbsp;</div>
      <div className="circle--small">&nbsp;</div>
    </div>
  )
}

export default LandingPage
