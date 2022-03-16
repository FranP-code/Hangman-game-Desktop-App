import React from 'react'

const Arrow = ({action, name}) => {
  return (
    <box-icon
        type="solid"
        onClick={action}
        name={name}
    />
  )
}

export default Arrow