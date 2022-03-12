import axios from 'axios'
import React from 'react'

const URL = 'http://localhost:9000/api/result'

export default class AppClass extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      steps: 0,
      grid: [(1,1), (2, 1), (3, 1), (1, 2), {'B': (2, 2)}, (3, 2), (1, 3), (2, 3), (3, 3)],
      email: '',
      message: ''
      }
  }
  getCoordinates() {
    const [x, y] = this.state
    this.setState({
      ...this.state, grid: [...this.state.grid, (x, y)]
    })
    console.log(`(${x}, ${y})`)
  }
  increment = () => {
    this.setState((state) => ({
      ...state,
      steps: state.steps + 1
    }))
  }
  reset = () => {
    this.setState((state) => ({
      ...state,
      steps: 0
    }))
  }
  postApiResults = () => {
    axios.post(URL)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }

  getApiResults = () => {
    axios.post(URL)
      .then(res => {
        console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
  }
  handleChange = (event) => {
    this.setState({
      email: event.target.value
    })
  }
  handleSubmit(event) {
    this.state.email
    event.preventDefault()
  }   
  render() {
    const { className } = this.props
      return (
      <div id="wrapper" className={className}>
        <div className="info">
          <h3 id="coordinates">Coordinates {this.getCoordinates}</h3>
          <h3 id="steps">You moved {this.state.steps} times</h3>
        </div>
        <div id="grid">
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square active">B</div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
          <div className="square"></div>
        </div>
        <div className="info">
          <h3 id="message"></h3>
        </div>
        <div id="keypad">
          <button onClick={this.increment} id="left">LEFT</button>
          <button onClick={this.increment}id="up">UP</button>
          <button onClick={this.increment}id="right">RIGHT</button>
          <button onClick={this.increment}id="down">DOWN</button>
          <button onClick={this.reset}id="reset">reset</button>
        </div>
        <form onSubmit={this.handleSubmit}>
          <input 
            value={this.state.email} 
            onChange={this.handleChange} id="email"
            type="email" 
            placeholder="type email">
            </input>
          <input 
            id="submit" 
            type="submit">
            </input>
        </form>
      </div>
    )
  }
}
