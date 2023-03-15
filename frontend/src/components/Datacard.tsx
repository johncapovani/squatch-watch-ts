//TS almost finished due to its similarity to the code along
import './Datacard.css'
import { useState, FC, ReactElement } from 'react'

const Datacard:FC = ({ sighting }:any):ReactElement => {

    let [view, setView] = useState<boolean>(false)

    const simpleView = ():ReactElement => {
        return (
            <>
                <div className="simpleStyle">
                    <div><img className="small-image" src={sighting.images} alt={sighting.species} /> </div>
                    <div><h3>{new Date(sighting.date).toLocaleString('en-US').substring(0, 10)}</h3></div>
                    <div><h4>Species spotted: {sighting.species}</h4></div>
                </div>
                <hr/>
            </>
        )
    }

    const detailView = ():ReactElement => {
        return (
            <>
                <div className='detailStyle'>
                    <img className="large-image" src={sighting.images} alt={sighting.species} />
                    <div className='detailed-info'>
                        <h2>{new Date(sighting.date).toLocaleString('en-US').substring(0, 10)}</h2>
                        <h3>Species: {sighting.species}</h3>
                        <h4>Sighting location: {sighting.location}</h4>
                    </div>
                    <div className='detailed-info'>
                        <h3 className='report'>Report:</h3>
                        <textarea className='description' value={sighting.description} readOnly></textarea>
                    </div>

                </div>
                <hr/>
            </>
        )
    }

    return (
        <div onClick={():void => setView(!view)}>
            {view ? detailView() : simpleView()}

        </div>
    )
}
export default Datacard