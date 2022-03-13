import React from 'react'

const InputSearch = () => {
    const handleGetValue = (e) => {
        console.log(e);
    }
    return (
        <>
            <input onChange={handleGetValue} type="text" />
        </>
    )
}

export default InputSearch