import React from 'react';
import "whatwg-fetch";
import './App.css';

import Display from './Display'
import Image from './Image'
import CityForm from './CityForm'

import { getApiUrl, formatTemp } from './helpers'

class App extends React.Component {
  constructor(props) {
    super(props);

    this.fetchWeather = this.fetchWeather.bind(this);
    this.toggleFormat = this.toggleFormat.bind(this);

    this.state = {
      weather: null,
      temp: null,
      city: 'Boston',
      format: 'f',
      gif: null,
      formInput: ''
    }
  };

  componentDidUpdate(prevProps, prevState) {
    if (prevState.city !== this.state.city) {
      this.fetchWeather();
      console.log(this.state);
      
    }
    if (prevState.weather !== this.state.weather) {
      this.fetchImage();
    }
  }

  fetchWeather() {
    fetch(getApiUrl(this.state.city), {mode: 'cors'})
      .then(resp => {
        if (!resp.ok) {
          throw Error(resp.statusText);
        }
        return resp.json()
      })
      .then(resp => {
        const weather = resp.weather[0].main;
        
        const temp = formatTemp(resp.main.temp, this.state.format);

        this.setState({
          temp,
          weather
        })
      }).catch(error => console.log(error))
  }

  fetchImage() {
    const weather = this.state.weather;
    let url = 'https://api.giphy.com/v1/gifs/translate?api_key=wqsy7csWQKiCwyrmlWrbs4KEj1AqqyMc&s=' + weather;
    fetch(url, { mode: 'cors'})
        .then(response => response.json())
        .then(response => {
            this.setState({
              gif: response.data.images.original.url
            }, console.log('state set in fetchImage'))
        })
  }

  handleInput(e) {
    let formInput = e.target.value
    this.setState({
        formInput: formInput
      });
  } 

  toggleFormat() {
    if (this.state.format === 'f') {
      this.setState({
        format: 'c'
      });
    } else {
      this.setState({
        format: 'f'
      });
    }
  }

  handleFormSubmit(e) {
    e.preventDefault();
    //Validate input
    fetch(getApiUrl(this.state.formInput), {mode: 'cors'})
      .then(resp => {
        if (resp.ok) {
          const newCity = this.state.formInput
          document.querySelector('.error').classList.remove('show-error')
          this.setState({
            city: newCity
        })
        } else {
          document.querySelector('.error').classList.add('show-error')
        }
      })
  }

  render() {
    return (
      <div>
        <h1>Weather App</h1>
        <Image 
          weather={this.state.weather}
          gif={this.state.gif}/>
        <Display 
          onClick={this.toggleFormat.bind(this)}
          city={this.state.city}
          weather={this.state.weather}
          temp={this.state.temp}
          format={this.state.format}
        />
        <CityForm 
          onChange={this.handleInput.bind(this)}
          onSubmit={this.handleFormSubmit.bind(this)}
        />
        <span className='error'>City not found.</span>
      </div>
    )
  }
}
  export default App;
