import React, { Component } from 'react';
import './App.css';
import Titles from './components/Titles'
import Form from './components/Form'
import Weather from './components/Weather'


class App extends Component {

  state = {
    temperature: undefined,
    city: undefined,
    country: undefined,
    humidity: undefined,
    description: undefined,
    error: undefined 
  }

  getWeather = async (e) => {
    const API_KEY = 'f48927c6b7f231802649553f2d3766d2';

    e.preventDefault()
    
    const city = e.target.elements.city.value
    const country = e.target.elements.country.value
    
    const api_call = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_KEY}`)
    const data = await api_call.json()
    if(city && country) {
      console.log(data)

      this.setState({
        temperature: data.main.temp ,
        city: data.name ,
        country: data.sys.country ,
        humidity: data.main.humidity ,
        description: data.weather[0].description ,
        error: ""
      })
    } else{
      this.setState({
        temperature: undefined ,
        city: undefined ,
        country: undefined ,
        humidity: undefined ,
        description: undefined ,
        error: "Please Enter The City and Country respectively"
      })
    }
  }
  render() {
    return (
      <div className="wrapper">
        <div className="container">
        <div className="row">
                <div className="col-xs-5 title-container">
                  <Titles />
                </div>
                <div className="col-xs-7 form-container">
                  <Form getWeather={this.getWeather} />
                  <Weather 
                    temperature={this.state.temperature} 
                    humidity={this.state.humidity}
                    city={this.state.city}
                    country={this.state.country}
                    description={this.state.description}
                    error={this.state.error}
                  />
                </div>
              </div>
        </div>
      </div>
     
    )
  }
}

export default App



  
