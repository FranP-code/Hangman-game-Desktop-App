import React from 'react'

const Messages = ({data}) => {

    const [sucess, setSucess] = React.useState('')
    const [message, setMessage] = React.useState('')

    React.useEffect(() => {

        if (data === '') {

            data['sucess'] = true
            data['message'] = 'TEST'
        }

    }, [])

    return (
        <>
            {

                data['sucess'] ?
                    <div className="message animate__animated animate__slideInDown sucess">
                        {data['message']}
                    </div>
                :
                    <div className="message animate__animated animate__slideInDown error">
                        {data['message']}
                    </div>
            }
        </>
    )
}

export default Messages
