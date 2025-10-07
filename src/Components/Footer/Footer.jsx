import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faLinkedin,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

function Footer() {
  return (
    <div className="bg-black text-white font-serif py-3">
      <h3 className="text-center mt-3 text-xl md:text-3xl">
        Discover the beauty, culture, and history of Nashik — from ancient
        temples to lush vineyards
      </h3>
      <div className="mt-4 mx-auto w-[80%] flex flex-col">
        <ul className="flex flex-col justify-around items-center text-xl md:text-3xl lg:flex-row">
          <div className="flex justify-evenly items-center">
            <li className="mr-4">
              <Link>
                <FontAwesomeIcon icon={faInstagram} />
              </Link>
            </li>
            <li className="mr-4">
              <Link>
                <FontAwesomeIcon icon={faFacebook} />
              </Link>
            </li>
            <li className="mr-4">
              <Link>
                <FontAwesomeIcon icon={faTwitter} />
              </Link>
            </li>
            <li className="mr-4">
              <Link>
                <FontAwesomeIcon icon={faLinkedin} />
              </Link>
            </li>
          </div>
          <div className="flex flex-col justify-evenly items-center md:flex-row">
            <li className="text-lg md:text-xl mr-3 whitespace-nowrap">
              <FontAwesomeIcon icon={faEnvelope} /> explorenashik.info@gmail.com
            </li>
            <li className="font-sans text-lg md:text-xl mr-3 whitespace-nowrap">
              <FontAwesomeIcon icon={faPhone} /> +91-1234567890
            </li>
          </div>
        </ul>
        <div className="mt-5 flex justify-center items-center text-center text-sm md:text-lg">
          <p>
            Made with ❤️ | Copyright &#169; 2025 - all rights reserved by
            Rushikesh Landge!
          </p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
