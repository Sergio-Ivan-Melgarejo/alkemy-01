import React, { useEffect, useState } from 'react'
import Loader from './Loader'
import Plate from './Plate'

const plates = 20;

const List = ({data}) => {
    const [pageNum, setPageNum] = useState(0)
    const [showPage, setShowPage] = useState([])

    useEffect(() => {
        setShowPage(data.slice((plates * pageNum),(plates * (1 + pageNum))))
    }, [pageNum,data])

    const handleClick = (num) => {
        if(num < 0) return
        if(num > maxPages - 1) return
        setPageNum(num)
    }

    const maxPages = Math.ceil(data.length / plates);

    return (
        <>
            {
                data === undefined
                ?   <Loader/>
                :   <>
                        {   
                            data.length === 0
                            ?   null
                            :   <>
                                    {                                
                                        showPage.map(ele => <Plate key={ele.id} data={ele}></Plate>)
                                    }   
                                    <footer className='row w-100 m-auto align-items-center gap-1 p-0 py-3'>
                                        <button onClick={()=>handleClick((pageNum - 1))} className={(pageNum === 0 ? "disabled " : "" ) + 'col h4 btn btn-primary m-0'}>anterior</button>
                                        <button onClick={()=>handleClick(0)} className={(pageNum === 0 ? "disabled " : "" ) + 'col h4 btn btn-primary m-0'}>1</button>
                                        <div className='col text-center h4 m-0'>{pageNum + 1}</div>
                                        <button onClick={()=>handleClick(maxPages - 1)} className={(pageNum === (maxPages - 1) ? "disabled " : "" ) + 'col h4 btn btn-primary m-0'}>{maxPages}</button>
                                        <button onClick={()=>handleClick((pageNum + 1))} className={(pageNum === (maxPages - 1) ? "disabled " : "" ) + 'col h4 btn btn-primary m-0'}>siguiente</button>
                                    </footer>
                                </>
                            
                        }
                    </>
               
            }
            
          
        </>

    )
}

export default List