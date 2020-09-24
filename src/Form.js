import React from 'react'

import './App.css'


class Form extends React.Component {

    constructor(props) {
        super(props)

        this.state = {
            value: 'car',
            posX: '',
            posY: '',
            centerX: '',
            centerY: '',
            radius: '',
            circleAngle: '',
            distanceAngle: '',
            distance: ''
        };
    }

    inputChange = (event, name) => {
        this.setState({[name]: event.target.value})
    }

    changePos = () => {
        const {posX, posY, value} = this.state
        if(posX !== '' && posY !== '' && !isNaN(+posX) && !isNaN(+posY)){
            this.props.updateObjectXY(value, posX, posY)
        } else {
            alert('please choose all params')
        }
        this.setState({
            posX: '',
            posY: ''
        });
    }

    changeAnotherPos = () => {
        const {distance, distanceAngle, value} = this.state
        if(distance !== '' && distanceAngle !== '' && !isNaN(+distance) && !isNaN(+distanceAngle)){
            this.props.setObjectPositionByDistance(value, distance, distanceAngle)
        } else {
            alert('please choose all params')
        }
        this.setState({
            distance: '',
            distanceAngle: ''
        });
    }

    startCircle = () => {
        const {value, centerX, centerY, radius, circleAngle} = this.state
        if(centerX !== '' && centerY !== '' && radius !== '' && circleAngle !== ''
            && !isNaN(+centerX) && !isNaN(+centerY)&& !isNaN(+radius) && !isNaN(+circleAngle)){
            this.props.setObjectAraund(value, centerX, centerY, radius, circleAngle)
        } else {
            alert('please choose all params')
        }
        this.setState({
            centerX: '',
            centerY: '',
            radius: '',
            circleAngle: ''
        });
    }

    handleChange = event => {
        this.setState({value: event.target.value})
    }


    render(){
        const {value, posX, posY, centerX, centerY, radius, circleAngle, distance, distanceAngle} = this.state

        return (
            <div className="form">
                <label>
                    <span>choose transport </span>
                    <select value={value} onChange={this.handleChange}>
                        <option value="car">car</option>
                        <option value="ship">ship</option>
                        <option value="plane">plane</option>
                    </select>
                </label>
                <h4>{value}</h4>
                <h5>update position</h5>
                <h6>coordinates</h6>
                <div>
                    <input
                        type="text"
                        placeholder="x"
                        value={posX} 
                        onChange={(e) => this.inputChange(e, 'posX')}
                    />
                    <input
                        type="text"
                        placeholder="y"
                        value={posY} 
                        onChange={(e) => this.inputChange(e, 'posY')}
                    />
                    <button onClick={this.changePos}>change position</button>   
                </div>
                <h6>distance</h6>
                <div>
                    <input
                        type="text"
                        placeholder="distance"
                        onChange={(e) => this.inputChange(e, 'distance')}
                        value={distance} 
                    />
                    <input
                        type="text"
                        placeholder="angle"
                        onChange={(e) => this.inputChange(e, 'distanceAngle')}
                        value={distanceAngle} 
                    />
                    <button onClick={this.changeAnotherPos}>change position</button> 
                    
                </div>
                <h5>params for circle</h5>
                <div>
                    <input
                        type="text"
                        placeholder="centerX"
                        onChange={(e) => this.inputChange(e, 'centerX')}
                        value={centerX}
                    />
                    <input
                        type="text"
                        placeholder="centerY"
                        onChange={(e) => this.inputChange(e, 'centerY')}
                        value={centerY}
                    />
                    <input
                        type="text"
                        placeholder="radius"
                        onChange={(e) => this.inputChange(e, 'radius')}
                        value={radius}
                    />
                    <input
                        type="text"
                        placeholder="angle"
                        onChange={(e) => this.inputChange(e, 'circleAngle')}
                        value={circleAngle}
                    />
                <button onClick={this.startCircle}>start</button> 
                <button onClick={() => this.props.stopObjectAraund(value)}>stop {this.state.value}</button> 
                </div> 
            </div>
        )
    }
}

export default Form
