//import React from 'react'
import "./CreateUpdateSighting.css"

import { useState, useEffect, ReactElement, FC, FormEvent } from 'react'
import { useAppSelector, useAppDispatch} from '../app/hooks'
import { useNavigate } from 'react-router'
//Bring in the create Sighting function from Sighting Slice
import { createSighting, reset } from '../features/sightings/sightingSlice'

import Spinner from '../components/Spinner'
import { toast } from 'react-toastify'
import { CounterState, FormState } from "../app/interfaces"

const CreateUpdateSighting:FC = (): ReactElement => {

  //Create the useState to collect form information when a sighting is being created
  const [formData, setFormData] = useState<FormState>({
    date: '',
    time: '',
    location: '',
    species: '',
    images: '',
    description: '',
  })

  const { date, time, location, species, images, description } = formData

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const { sightings, isLoading, isError, isSuccess, message } = useAppSelector(
    (state:any):CounterState => state.sightings
  )

  useEffect((): void => {
    if (isError) {
      toast.error(message)
    }

    if (isSuccess || sightings) {

    }

    dispatch(reset())
  }, [sightings, isError, isSuccess, message, navigate, dispatch])


  //When the user types trigger the onchange

  const onChange = (e:any): void => {
    setFormData((prevState: FormState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }))
  }

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    //form validation

    if (!date || !time || !location || !species || !images || !description) {
      toast.error('Populate all required fields')
    } else {

      const sightingData = {
        date, time, location, species, images, description,
      }

      dispatch(createSighting(sightingData))
      toast.success('New sighting successfully reported!')
      navigate('/')
    }

  }

  if (isLoading) {
    return <Spinner />
  }

  return (

    <>
      <div className="reportSightingContainer">


        <form className='reportform-container' onSubmit={handleSubmit}>

          <div className='reportform-container-item'>
            <h1>Report a Sighting</h1>
            <div>
              <label htmlFor="date">Date</label>
              <input id="date" type="date" name='date' value={date} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="time">Time of Sighting</label>
              <input id="time" type="time" name='time' value={time} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="location">Location</label>
              <input id="location" type="text" name='location' value={location} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="species">Species</label>
              <input id="species" type="text" name='species' value={species} onChange={onChange} />
            </div>
            <div>
              <label htmlFor="image-url">Image URL</label>
              <input id="image-url" type="text" name='images' value={images} onChange={onChange} />
            </div>
            <button className='sightingButton' type="submit">Publish Your Sighting!</button>
          </div>

          <div className='reportform-container-item-details'>
            <div>
              <label htmlFor="Sighting Details">Sighting Details</label>
              <div className='detailarea' >
                <textarea placeholder="Describe your sighting experience in detail..." name='description' value={description} onChange={onChange} ></textarea>
              </div>
            </div>
          </div>



        </form>




      </div>
    </>

  )
}

export default CreateUpdateSighting