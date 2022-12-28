import React from "react"
import Navbar from "../components/Navbar"
import "../css/About.css"

export default function About({username}) {
    return (
        <div className="about-wrapper">
            <Navbar username={username}/>
            <h1 className="title">
                Decentralized lottery System
            </h1>
            <div>
                <p className="info">
                    This is a Decentralized lottery System or DeLott.<br />
                    Make sure to connect metamask before entering the lottery.
                    Participants have to pay the entrance fee to enter the lottery.
                    The winner is picked after a certain time interval.
                    If there is only 1 participant, the entrance fee is given back.
                    If there are multiple participants, 80% of the total balance is given to the winner and the rest 20% is held as platform's profit.

                </p>
            </div>
        </div>
    )
}