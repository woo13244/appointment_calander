import React, {Component} from 'react'

export default class NewAppointmentModal extends Component{
    state={
        title: '',
        desc: '',
        month: 0,
        year: 0,
        day: 1
    }

    handleChange = (type, value) =>{
        if(type != 'year'){
            this.setState({
                [type] : value
            })
        }
        else{
            value = value.replace(/\D/g,'');
            this.setState({
                [type] : value
            })
        }
    }
    componentDidMount = () => {
        let date = new Date()
        let currentMonth = date.getMonth()
        let currentYear = date.getFullYear()
        let firstDay = new Date( currentYear, currentMonth, 1)
        let lastDay = new Date( currentYear, currentMonth + 1, 0)

        this.setState({
            year: currentYear,
            month: currentMonth,
            firstDay,
            lastDay
        })
    }
    createDaySelect = () =>{
        let { lastDay } = this.state;
        let days = []
        if(lastDay){
            for(let x = 1; x <= lastDay.getDate(); x++){
                days.push(
                    <option value = { x } key = { x }>
                        {x}
                    </option>
                )
            }
            return days
        }
    }
    createMonthSelect = () =>{
        let { monthArr } = this.props
        
        return monthArr.map((m, i)=>{
            return(
                <option key = {m} value = {i}>
                    {m}
                </option>
            )
        })
    }
    render(){
        let {
            title,
            toggleModal,
            addEvent
        } = this.props

        let {
            desc,
            year,
            month,
            day
        } = this.state
        return(
            <div className='new_modal_container'>
                <div className='background' onClick={()=>{toggleModal()}}/>
                <div className='modal_container'>
                    <div className='modal_header'>{title}</div>
                    <div className='modal_body'>
                        <div className='modal_field'>
                            <label>Title</label>
                            <input 
                                type='text'
                                value={this.state.title}
                                onChange={(e)=>{this.handleChange('title', e.target.value)}}
                            />
                        </div>
                        <div className='modal_field'>
                            <label>Description</label>
                            <input 
                                value={desc}
                                type='text'
                                onChange={(e)=>{this.handleChange('desc', e.target.value)}}
                            />
                        </div>
                        <div className='modal_field'>
                            <label>Month</label>
                            <select
                                value={month}
                                onChange={(e)=>{this.handleChange('month', e.target.value)}}
                            >
                                {this.createMonthSelect()}
                            </select>
                        </div>
                        <div className='modal_field'>
                            <label>Day</label>
                            <select
                                value={day}
                                onChange={(e)=>{this.handleChange('day', e.target.value)}}
                            >
                                {this.createDaySelect()}
                            </select>
                        </div>
                        <div className='modal_field'>
                            <label>Year</label>
                            <input 
                                type='text'
                                value={year}
                                onChange={(e)=>{this.handleChange('year', e.target.value)}}
                            />
                        </div>
                        <div className='modal_footer'>
                            <button onClick={()=>{toggleModal()}}>Cancel</button>
                            <button onClick={()=>{addEvent(this.state); toggleModal()}}>Add</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}