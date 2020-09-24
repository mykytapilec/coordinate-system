import React from 'react'

import './App.css'


class Transport extends React.Component {

  constructor(props) {
    super(props)

    this.state = { 
      posX: this.props.posX,
      posY: this.props.posY,
      deltaX: null,
      deltaY: null,
      }
    }

    componentDidUpdate(prevProps) {
      if (this.props.posX !== prevProps.posX && this.props.posY !== prevProps.posY) {
        this.setState({
              posX: this.props.posX,
              posY: this.props.posY,
            });
        }
    }

    startMove = e => {
      this.setState({
        deltaX: e.pageX - this.state.posX,
        deltaY: e.pageY - this.state.posY,
      });
      window.addEventListener("mousemove", this.trackMouse)
    }
  
    trackMouse = e => {
      this.setState({posX: e.pageX - this.state.deltaX, posY: e.pageY - this.state.deltaY})
    }
  
    endMove = () => {
      window.removeEventListener("mousemove", this.trackMouse)
      this.props.updatePosition(this.props.name, this.state.posX, this.state.posY, this.props.name)
    }


  render(){
    const { logo, name } = this.props 
    const { posX, posY } = this.state 

    return (
      <React.Fragment>
        <img 
          src={logo} 
          alt={name}
          className={name}
          style={{
            top: posY,
            left: posX
          }} 
          onMouseDown={this.startMove}
          onMouseUp={this.endMove}
        />

      </React.Fragment>
    )
}
  
}

export default Transport
