import React, { useState }  from 'react';
import logo from "../../logo.svg";

export default function About(){
    return ( 
      <div>
         <img src={logo} className="App-logo" alt="logo" />
    <p>
      Welcome Daedalus
    </p>
    <a
      className="App-link"
      href="https://reactjs.org"
      target="_blank"
      rel="noopener noreferrer"
    >
      Learn React
    </a>
      </div>
   )
  }