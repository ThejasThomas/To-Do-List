import React, { useState } from 'react'
import Child from './Child'

const Parent = () => {
    const[value,setValue]=useState('No message')
    const receiveData=(data)=>{
        setValue(data)
    }


  return (
    <div>
        <p>{value}</p>
        <Child sendData={receiveData}></Child>

    </div>
  )
}

export default Parent