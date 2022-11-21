import React from "react";
import { Link } from "react-router-dom";
import s from './Landing.module.css'

function LandingPage(){
    return (
        <div className={s.container}>
          <h1 className={s.welcometitle}>Recipe Book</h1>
          <h3 className={s.welcomesubtitle}>What will we cook today?</h3>
          <Link to="/home">
            <button className={s.btnlandingpage}>Enter Site</button>
          </Link>
        </div>
      )
    };




export default LandingPage


