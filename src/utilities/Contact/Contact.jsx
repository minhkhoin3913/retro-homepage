import React from 'react';
import './Contact.css';
import mailboxIcon from './Microsoft Windows 3 Mailbox.ico';
import phoneIcon from './Microsoft Windows 3 Phone Dial.ico';
import mailIcon from './Microsoft Windows 3 Mail.ico';
import globeIcon from './Microsoft Windows 3 International.ico';
import nmkSvg from './nmk.svg';

const Contact = () => {
    return (
        <div className="contact-container">
            <div className="contact-title">
                <img src={nmkSvg} alt="Monogram" className="monogram" />

                <div className="contact-title-group">
                    <h1 className="name">Nguyen Minh Khoi</h1>
                    <p className="title">Full Stack Developer</p>
                </div>
            </div>
            <p className="contact-info phone-email">
                <strong>
                    <img src={phoneIcon} alt="Phone" className="folder-icon" /> Phone:
                </strong>
                <span className="contact-detail">
                    <a href="tel:+84357106894" className="contact-link">
                        (+84) 35710 6894
                    </a>
                </span>
            </p>
            <p className="contact-info phone-email">
                <strong>
                    <img src={mailIcon} alt="Email" className="folder-icon" /> Email:
                </strong>{" "}
                <span className="contact-detail">
                    <a href="mailto:nguyenminhkhoi3913@gmail.com" className="contact-link">
                        nguyenminhkhoi3913@gmail.com
                    </a>
                </span>
            </p>
            <p className="contact-info phone-email">
                <strong>
                    <img src={globeIcon} alt="Website" className="folder-icon" /> Website:
                </strong>{" "}
                <span className="contact-detail">
                    <a href="https://minhkhoin3913.github.io/retro-homepage" className="contact-link">
                        https://minhkhoin3913.github.io/retro-homepage
                    </a>
                </span>
            </p>
            <p className="contact-info">
                <strong>
                    <img src={mailboxIcon} alt="Mailbox" className="folder-icon" /> Address:
                </strong>
                <span className="contact-detail">
                    600 Nguyen Van Cu Extended, An Binh Ward, Can Tho, Vietnam
                </span>
            </p>
        </div>
    );
};

export default Contact;