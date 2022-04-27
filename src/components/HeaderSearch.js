import React , {useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import "./HeaderSearch.scss"

const HeaderSearch = ({title}) => {
  const navigate = useNavigate()
  const [validated,setValidated] = useState(false)

  const handleSubmit = (e) => {
    e.preventDefault()
    if(e.target.search.value.length > 1){
      let url = `?query=${e.target.search.value}`;
      if(e.target.num.value) url += `&number=${e.target.num.value}`
      if(e.target.vegetarian.checked) url += `&diet=vegeteria`

      navigate(url)
    }
  }

  const handleChange = (e) => {
    if(e.target.value.length > 1) setValidated(true)
    if(e.target.value.length <= 1) setValidated(false)
  }

  return (
    <header className='header w-100 py-3'>
        <form onSubmit={handleSubmit} className='row w-100 m-auto justify-content-center text-center p-1 gap-1'>
            <Link to="/search/" className={(title ? "btn-primary " : "btn-primary disabled ") + 'btn order-sm-1 col col-sm-2 order-2 p-2 d-flex justify-content-center align-items-center'}>Random</Link>
            <div className='search form-floating col-12 col-sm order-sm-2 order-1 p-0'>
              <input onChange={handleChange} id="search" className='form-control' type="search" placeholder="Recipes" aria-label="Search" name="search" />
              <label className='' htmlFor="search" >Recipes ...</label>
            </div>
            
            <input type="submit" className={(validated ? "btn-primary " : "btn-primary disabled ") + 'btn order-sm-3 col col-sm-2 order-3 p-2'} value="Search" />

            <div className='row order-3 p-0'>
              <div className="accordion accordion-flush w-100 p-0" id="accordionFlushExample">
                <div className="accordion-item bg-dark">
                  <h2 className="accordion-header" id="flush-headingOne">
                    <button className="accordion-button collapsed text-light border rounded-top p-3" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="false" aria-controls="flush-collapseOne">
                      Setting
                    </button>
                  </h2>
                  <div id="flush-collapseOne" className="border accordion-collapse collapse" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                    <div className="accordion-body row w-100 m-auto">

                      <div className="col-6 col-md-4 form-check border d-flex align-items-center justify-content-center">
                        <input type="checkbox" className="form-check-input" id="exampleCheck1" name="vegetarian" />
                        <label className="form-check-label px-2" htmlFor="exampleCheck1" >Vegetarian recipes</label>
                      </div>
                      <div className="col form-check border">
                        <label htmlFor="customRange2" className="form-label">Search amount</label>
                        <input type="range" className="form-range" min="1" max="100" id="customRange2" name="num" />
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            </div>
        </form>
        <h2 className='h2 text-uppercase p-3 text-center'>{title || "Recipes"}</h2>
    </header>
  )
}

export default HeaderSearch