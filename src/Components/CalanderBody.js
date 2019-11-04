import React, { Component } from 'react'
import './CalanderBody.scss'
import { thisExpression, throwStatement } from '@babel/types'
import NewAppointmentModal from './NewAppointmentModal'
export default class ClanaderBody extends Component{
    state={
        currentMonth: 0,
        currentYear: 0,
        selectedMonth: 0,
        selectedYear: 0,
        dateArr: [],
        modalToggle: false,
        appointments: {}
    }

    componentDidMount = () => {
        let date = new Date()
        let currentMonth = date.getMonth()
        let currentYear = date.getFullYear()
        let firstDay = new Date( currentYear, currentMonth, 1)
        let lastDay = new Date( currentYear, currentMonth + 1, 0)

        this.setState({
            selectedMonth : currentMonth,
            selectedYear : currentYear,
            currentMonth,
            currentYear,
            lastDate: lastDay,
            firstDate: firstDay,
            lastDay: lastDay.getDay(),
            firstDay: firstDay.getDay()
        }, ()=>{
            this.createDates()
        })
    }
    createDates(){
        let { lastDate, lastDay, currentYear, currentMonth, firstDay } = this.state
        let dateArr = []

        if(lastDate){
            for(let x = 1; x <= lastDate.getDate();  x++){
                dateArr.push(x)
            }
        }
        if(lastDay && firstDay){
            let lastMonthLastDay = new Date( currentYear, currentMonth, 0).getDate()

            for(let x = 0; x < firstDay ; x++){
                dateArr.unshift(lastMonthLastDay - x)
            }
            for(let x = 1; x < 14 - lastDay ; x++){
                dateArr.push(x)
            }
        }
        this.setState({
            dateArr
        })
    }

    getMonthDays = (month, year) => {
        
        let firstDay = new Date( year, month, 1)
        let lastDay = new Date( year, month + 1, 0)

        this.setState({
            lastDate: lastDay,
            lastDayName: lastDay.getDay(),
            firstDayName: firstDay.getDay()
        }) 
    }
    addModalToggle = () => {
        this.setState({
            modalToggle : !this.state.modalToggle
        })
    }
    createCalanderDates = () => {
        let { dateArr, appointments, currentMonth, currentYear } = this.state;
        let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        
        if(dateArr.length){
            return dateArr.map((day, i)=>{
                let index = i
                let inUse = false
                if(appointments[currentYear]){
                    if(appointments[currentYear][currentMonth][day]){
                        inUse = true
                    }
                }
              
                if(i > 6 && i < 28){
                    index = i % 7
                    return(
                        <div 
                            key = {day + '' + i}
                            className='day_container'
                        >
                            <div className='num_day'>
                                {day}  
                            </div>
                            <div className='text_day'>
                                {dayArr[index]}
                            </div>
                            <div>
                                {
                                    inUse
                                    ?
                                    appointments[currentYear][currentMonth][day].title
                                    :
                                    null
                                }
                            </div>
                        </div>
                    )
                }
                else{
                    if(i < 28){
                        return(
                            <div 
                                key = {day + '' + i}
                                className={
                                    day < 7
                                    ?
                                    'day_container'
                                    :
                                    'day_container disabled'
                                }
                            >
                                <div className='num_day'>
                                    {day}  
                                </div>
                                <div className='text_day'>
                                    {dayArr[index]}
                                </div>
                                <div>
                                {
                                    inUse
                                    ?
                                    appointments[currentYear][currentMonth][day].title
                                    :
                                    null
                                }
                                </div>
                            </div>
                        )
                    }
                    else{
                        index = i % 7
                        return(
                            <div 
                                key = {day + '' + i}
                                className={
                                    day > 14    
                                    ?
                                    'day_container'
                                    :
                                    'day_container disabled'
                                }
                            >
                                <div className='num_day'>
                                    {day}  
                                </div>
                                <div className='text_day'>
                                    {dayArr[index]}
                                </div>
                                <div>
                                {
                                    inUse
                                    ?
                                    appointments[currentYear][currentMonth][day].title
                                    :
                                    null
                                }
                                </div>
                            </div>
                        )
                    }
                }
            })
        }
    }
    selectMonth = (month) => {
        this.setState({
            selectedMonth: month
        })
    }
    changeYear = (val) => {
        let value = val.replace(/\D/g,'');
        this.setState({
            selectedYear: value
        })
    }
    addEvent = (event) => {
        let { appointments } = this.state

        this.setState({
            appointments: { ...appointments, ...{
                [event.year] : {
                    [event.month] : {
                        [event.day] : {
                            desc: event.desc,
                            title: event.title
                        }
                        
                    }
                }
            }}
        })
    }
    render(){

        let {
            currentMonth,
            currentYear,
            modalToggle
        } = this.state

        let monthArr = ['January', 'Feburary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
        let dayArr = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']

        return(
            <div className='calander_container'>
                {
                    modalToggle
                    ?
                    <NewAppointmentModal
                        title='Add Event'
                        monthArr={monthArr}
                        toggleModal={this.addModalToggle}
                        addEvent={this.addEvent}
                    />
                    :
                    null
                }
                <div className='calander_header'>
                    <div className='cal_arrow'>
                        {'<'}
                    </div>
                    <div>
                        {monthArr[currentMonth] + ' - ' + currentYear}
                        <div className='add_container'>
                            <button onClick={()=>{this.addModalToggle()}}>
                                Add Event
                            </button>
                        </div>
                    </div>
                    <div className='cal_arrow'>
                        {'>'}
                    </div>
                </div>
                <div className='calander_body'>
                    {this.createCalanderDates()}
                </div>
            </div>
        )
    }
}