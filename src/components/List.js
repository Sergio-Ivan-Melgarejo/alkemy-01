import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import Plate from './Plate'

const plates = 20;

const List = ({data}) => {
    const [pageNum, setPageNum] = useState(0)
    const [showPage, setShowPage] = useState([])

    useEffect(() => {
        setShowPage(data.slice((plates * pageNum),(plates * (1 + pageNum))))
    }, [])

    const handleClick = (num) => {
        console.log(num)
        console.log(num <= 0)
        console.log(num >= (data.length / plates))
        if(num <= 0) return
        if(num >= (data.length / plates)) return

        setPageNum(num)
        setShowPage(data.slice((plates * pageNum),(plates * (1 + pageNum))))
    }

    console.log(data.slice(pageNum,(plates * (1 + pageNum))))

    return (
        <div className='border border-danger p-3 row'>
            {
                data.length <= 0 
                ?   <Loader/>
                :   showPage.map(ele => <Plate key={ele.id} data={ele}></Plate>)
            }

           <footer className='row w-100 align-items-center gap-1'>
               <button onClick={()=>handleClick((pageNum - 1))} className={(pageNum === 0 ? "disabled " : "" ) + 'col h4 btn btn-primary'}>anterior</button>
               <button onClick={()=>handleClick()} className={(pageNum === 0 ? "disabled " : "" ) + 'col h4 btn btn-primary'}>1</button>
               <div className='col text-center h4'>{pageNum + 1}</div>
               <button onClick={()=>handleClick()} className={(pageNum === ((data.length / plates) - 1) ? "disabled " : "" ) + 'col h4 btn btn-primary'}>{data.length / plates}</button>
               <button onClick={()=>handleClick((pageNum + 1))} className={(pageNum === ((data.length / plates) - 1) ? "disabled " : "" ) + 'col h4 btn btn-primary'}>siguiente</button>
           </footer>
        </div>

    )
}

export default List