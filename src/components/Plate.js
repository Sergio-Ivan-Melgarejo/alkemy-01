import React from 'react'
import { useNavigate } from 'react-router-dom'
import "./Plate.scss"

const Swal = require('sweetalert2')

const Plate = ({ data, handleDelete }) => {
  const navigate = useNavigate()

  const handleClickCard = () => {
    if (data.vacio) {
      // redirige si no hay plato agregaro
      navigate("/search")
      return
    }
  }  

  const handleClickInfo = () => {
    if (!data.vacio) {
      // lleva a info plata
      navigate(`/details/${data.id}`)
      return
    }
  }

  const handleClickDelete = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
      background: "#232323",
      color: "#fff"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Deleted!',
          text: 'Your file has been deleted.',
          icon: 'success',
          background: "#232323",
          color: "#fff"
        })
        handleDelete(data.id)
      }
    })
  }
  
  if (data.summary === undefined) data.summary = "no data"

  return (
    <div className='plate-container col-6 col-lg-3 p-0 p-md-3 rounded'>
      <div tabIndex={1} onClick={handleClickCard} className="plate rounded text-light p-0" >
        <div className='img-container rounded'>
          {
            data.vacio
              ? <svg className='icon' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M221.6 148.7C224.7 161.3 224.8 174.5 222.1 187.2C219.3 199.1 213.6 211.9 205.6 222.1C191.1 238.6 173 249.1 151.1 254.1V472C151.1 482.6 147.8 492.8 140.3 500.3C132.8 507.8 122.6 512 111.1 512C101.4 512 91.22 507.8 83.71 500.3C76.21 492.8 71.1 482.6 71.1 472V254.1C50.96 250.1 31.96 238.9 18.3 222.4C10.19 212.2 4.529 200.3 1.755 187.5C-1.019 174.7-.8315 161.5 2.303 148.8L32.51 12.45C33.36 8.598 35.61 5.197 38.82 2.9C42.02 .602 45.97-.4297 49.89 .0026C53.82 .4302 57.46 2.303 60.1 5.259C62.74 8.214 64.18 12.04 64.16 16V160H81.53L98.62 11.91C99.02 8.635 100.6 5.621 103.1 3.434C105.5 1.248 108.7 .0401 111.1 .0401C115.3 .0401 118.5 1.248 120.9 3.434C123.4 5.621 124.1 8.635 125.4 11.91L142.5 160H159.1V16C159.1 12.07 161.4 8.268 163.1 5.317C166.6 2.366 170.2 .474 174.1 .0026C178-.4262 181.1 .619 185.2 2.936C188.4 5.253 190.6 8.677 191.5 12.55L221.6 148.7zM448 472C448 482.6 443.8 492.8 436.3 500.3C428.8 507.8 418.6 512 408 512C397.4 512 387.2 507.8 379.7 500.3C372.2 492.8 368 482.6 368 472V352H351.2C342.8 352 334.4 350.3 326.6 347.1C318.9 343.8 311.8 339.1 305.8 333.1C299.9 327.1 295.2 320 291.1 312.2C288.8 304.4 287.2 296 287.2 287.6L287.1 173.8C288 136.9 299.1 100.8 319.8 70.28C340.5 39.71 369.8 16.05 404.1 2.339C408.1 .401 414.2-.3202 419.4 .2391C424.6 .7982 429.6 2.62 433.9 5.546C438.2 8.472 441.8 12.41 444.2 17.03C446.7 21.64 447.1 26.78 448 32V472z" /></svg>
              : <img src={data.image || ""} className={data.image ? "img rounded" : "no-img"} alt={data.image ? "" : "there is no image"} />
          }
        </div>
        <h5 className="card-title h6 rounded-top v-100">{data.title.slice(0, 30) + "..."}</h5>
        {
          data.vacio
            ? <p className="card-text rounded-bottom">{data.summary}</p>
            : <button onClick={handleClickInfo} className='btn btn-primary btn-informacion'>Info</button>
        }
      </div>
      {
        data.selected
          ? <button onClick={handleClickDelete} className='btn btn-delete btn-add-delete'>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M432 32H312l-9.4-18.7A24 24 0 0 0 281.1 0H166.8a23.72 23.72 0 0 0-21.4 13.3L136 32H16A16 16 0 0 0 0 48v32a16 16 0 0 0 16 16h416a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16zM53.2 467a48 48 0 0 0 47.9 45h245.8a48 48 0 0 0 47.9-45L416 128H32z" /></svg>
            </button>
          : null
      }
      {
        data.vacio || !data.selected
        ? null
        : <>
            {
              data.vegetarian
              ? <svg width="3em" className='icon-vegetarian p-2 rounded position-absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M64 96H0c0 123.7 100.3 224 224 224v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C288 196.3 187.7 96 64 96zm384-64c-84.2 0-157.4 46.5-195.7 115.2 27.7 30.2 48.2 66.9 59 107.6C424 243.1 512 147.9 512 32h-64z"/></svg>
              : <svg width="3em" className='icon-vegetarian p-2 rounded position-absolute' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path d="M462.8 49.57a169.44 169.44 0 0 0-239.5 0C187.82 85 160.13 128 160.13 192v85.83l-40.62 40.59c-9.7 9.69-24 11.07-36.78 6a60.33 60.33 0 0 0-65 98.72C33 438.39 54.24 442.7 73.85 438.21c-4.5 19.6-.18 40.83 15.1 56.1a60.35 60.35 0 0 0 98.8-65c-5.09-12.73-3.72-27 6-36.75L234.36 352h85.89a187.87 187.87 0 0 0 61.89-10c-39.64-43.89-39.83-110.23 1.05-151.07 34.38-34.36 86.76-39.46 128.74-16.8 1.3-44.96-14.81-90.28-49.13-124.56z"/></svg>
            }
          </>
      }
    </div>
  )
}

export default Plate