import React, { Component } from 'react'
import CalanderBody from './CalanderBody'
import './Home.scss'

export default class Home extends Component{
    render(){
        return(
            <div className='home_container'>
                <div className='home_header'>
                    Appointment Calander
                </div>
                <CalanderBody/>
            </div>
        )
    }
}