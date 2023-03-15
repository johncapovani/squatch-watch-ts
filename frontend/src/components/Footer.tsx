import './Footer.css'
import {
    faTwitter,
    faFacebook,
    faInstagram
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FC, ReactElement } from 'react'

//need the FC here?
const Footer: FC = ():ReactElement => {
    return (
        <div className='footer'>
            <div className="footer-text">
                <p className='orange-text'>
                    <b>Contact Us       </b>
                    <a href="https://www.instagram.com/bigfootgone/?hl=en" className='icons'><FontAwesomeIcon icon={faInstagram} /></a>
                    <a href="https://twitter.com/AndCryptids" className='icons'><FontAwesomeIcon icon={faTwitter} /></a>
                    <a className='icons' href="https://www.facebook.com/groups/sasquatchworld/"><FontAwesomeIcon icon={faFacebook} /></a>
                </p>
                <p className='copyright'>
                    &copy; {new Date().getFullYear()} | Squatch Watch Inc. | All rights reserved
                </p>
            </div>
            <div className='scrolling-image-container'>
                <div className='bottom-image'>
                    <div className="top-image"></div>
                </div>


            </div>
        </div>
    )
}

export default Footer;