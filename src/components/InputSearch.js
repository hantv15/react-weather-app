import React from 'react'

const InputSearch = ({ event, placeholder }) => {
    return (
        <input onChangeCapture={event} placeholder={placeholder} type="text" />
    )
}

export default InputSearch