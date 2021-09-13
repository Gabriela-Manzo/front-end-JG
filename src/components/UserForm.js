import React from 'react'

function Form(props) {
  console.log(props);
  return (
    <form>
      <input
        placeholder="Insira Username..."
        type="text"
        value={props.username}
        onChange={props.onChange}
      />
      <button onClick={props.connect}>Conectar</button>
    </form>
  )
}

export default Form
