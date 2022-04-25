import React from 'react'
import { useParams } from 'react-router-dom'

const List = (props) => {
    const params = useParams()
    console.log(params,props)
    return (
        <div>List</div>
    )
}

export default List