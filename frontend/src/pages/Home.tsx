import React, { useEffect, FC, ReactElement } from "react";
import { useAppSelector, useAppDispatch} from '../app/hooks'
import { getSightings, reset } from "../features/sightings/sightingSlice";
import { useNavigate } from "react-router-dom";
import Datacard from "../components/Datacard";
import Spinner from '../components/Spinner'
import '../App.css'

const Home:FC = ():ReactElement => {
    const navigate = useNavigate()
    const dispatch = useAppDispatch()
    const { sightings, isError, isLoading, message } = useAppSelector((state:any):any => state.sightings)

    useEffect(():any => {
        if (isError) {
            console.log(message);
        }
        //Giving this error and I don't know why. It has something to do with sightingSlice.
        //(alias) getSightings(arg: any): AsyncThunkAction<unknown, any, AsyncThunkConfig>
        //import getSightings
        //Expected 1 arguments, but got 0.
        dispatch(getSightings())

        return () => {
            dispatch(reset())
        }
    }, [isError, message, navigate, dispatch])


    if (isLoading) {
        return <Spinner />
    }

    return (
        <div className="home">
            <h2 style={{paddingTop: '10px'}}>Report Feed</h2>
            <section className="content">
                {sightings.length > 0 ? (
                    <div className="sightings">
                        {sightings.map((sightings:any):unknown => (
                            <Datacard key={sightings._id} sighting={sightings} />
                        ))}
                    </div>
                ) : (<h3>No sightings found.</h3>)}
            </section>
        </div>
    )
}

export default Home;