import React from 'react'

import Transport from './Transport'
import Form from './Form'

import carLogo from './car.svg'
import shipLogo from './ship.svg'
import planeLogo from './plane.svg'

import './App.css'


class App extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      car: {
        posX: 180,
        posY: 114,
      },
      ship: {
        posX: 532,
        posY: 50,
      },
      plane: {
        posX: 788,
        posY: 466,
      } 
    }

    this.circle = {}
  }

  convertValueX = value => 436 + (value * 32) 

  convertValueY = value => 242 - (value * 32)

  convertLenght = value => value * 32

  updateObjectXY = (name, posX, posY) => {
		this.setState({
      [name]: {
        posX: this.convertValueX(posX),
        posY: this.convertValueY(posY)
      }	
    })
  }
  
  updatePosition = (name, posX, posY) => {
		this.setState({
      [name]: {
        posX,
        posY
      }	
    })
  }


  setObjectAraund = (name, centerX, centerY, radius, angle) => {
    let params = {
      radius: this.convertLenght(radius), 
      speed: 30 
    }
    let startAngle = 0
    let step = 2 * Math.PI / angle
    startAngle += step
    this.circle[name] = setInterval(() => {
      startAngle += step
      this.setState(() => {
        return {
          [name]: {
            posX: this.convertValueX(centerX) + params.radius * Math.sin(startAngle),
            posY: this.convertValueY(centerY) + params.radius * Math.cos(startAngle),
          }
        }
      })
    }, params.speed)
  }

  stopObjectAraund = (name) => {
    clearInterval(this.circle[name])
  }

  setObjectPositionByDistance = (name, distance, angle) => {
    this.setState(state => {
      return {
        [name]: {
          posX: state[name].posX + this.convertLenght(distance) * Math.sin(angle),
          posY: state[name].posY + this.convertLenght(distance) * Math.cos(angle),
        }
      }
    })  
  }

  render(){
    const { car, ship, plane } = this.state

    return (
      <div className="container">
        <Transport 
          logo={carLogo}
          name="car"
          posX={car.posX}
          posY={car.posY}
          updatePosition={this.updatePosition}
        />
        <Transport 
          logo={shipLogo}
          name="ship"
          posX={ship.posX}
          posY={ship.posY}
          updatePosition={this.updatePosition}
        />
        <Transport 
          logo={planeLogo}
          name="plane"
          posX={plane.posX}
          posY={plane.posY}
          updatePosition={this.updatePosition}
        />

        <Form        
          setObjectAraund={this.setObjectAraund}     
          stopObjectAraund={this.stopObjectAraund}
          updateObjectXY={this.updateObjectXY}
          setObjectPositionByDistance={this.setObjectPositionByDistance}
        />
      </div>
    )
  }
}

export default App
