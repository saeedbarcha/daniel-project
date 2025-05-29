import React from 'react'

const AccountDetailText = ({ name, details }) => {


    return (

        <div>
            <h6>{name}</h6>
            <p>{details}</p>
        </div>
    )
}

export default AccountDetailText