import React from 'react'

const Child = ({sendData}) => {
    const data="Helo world"
    const toParent=()=>{
        sendData(data)
    }
  return (
    <div>
        <button onClick={toParent}>Click here</button>

    </div>
  )
}

export default Child