import React, { Component } from 'react'
import axios from 'axios'
import './App.css'
import Image from './assert/img/weathe12.jpg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCloud,
  faBolt,
  faCloudRain,
  faCloudShowersHeavy,
  faSnowflake,
  faSun,
  faSmog,
  faCloudMoon
} from '@fortawesome/free-solid-svg-icons';
// import Logo from “./logo.png”;
class Weather extends Component {
    constructor() {
        super()
        this.state = {
            name: "",
            country: "",
            temp: "",
            temp_max: "",
            temp_max: "",
            description: "",
            icon: "",
            sunset: "",
            sunrise: "",
            city: "Bangalore",
            wind:"",
            humidity:"",
            main:"",
        }
    }
    convertCelsius = (temp) => {
        let cell = Math.floor(temp - 273.15);
        return cell;
    }
    UnixTime = (t) => {
        let dt = new Date(t * 1000);
        let hr = dt.getHours();
        let m = "0" + dt.getMinutes();
        return hr + ':' + m.substr(-2)
    }
    changeHandle = (e) => {
        this.setState({
            city: e.target.value
        })
        console.log("setState", this.state.city)
    }
    submitHandle = (e) => {
        e.preventDefault()
        let { city } = this.state
        this.fecthData(city)
    }
    componentDidMount() {
        this.fecthData()
    }
    fecthData = async () => {
        const {city}=this.state
        const key = '0e29c19f085f56dbe74048c5e1fd7863'
        const getData = await axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}`)
        console.log("getData", getData.data)
        let weathers = getData.data
        this.setState({
            temp: this.convertCelsius(weathers.main.temp),
            temp_max: this.convertCelsius(weathers.main.temp_max),
            temp_min: this.convertCelsius(weathers.main.temp_min),
            name: weathers.name,
            country: weathers.sys.country,
            main:weathers.main,
            humidity:weathers.main.humidity,
            description: weathers.weather[0].description,
            wind: weathers.wind.speed,
            main: weathers.weather[0].main,
            icon:weathers.weather[0].icon,
            sunset: this.UnixTime(weathers.sys.sunset),
            sunrise: this.UnixTime(weathers.sys.sunrise),
        })
    }
    render() {
        const { temp, name, country,main,icon, description,humidity, wind, sunset, sunrise } = this.state
        let weatherIcon = null;

        if (main === 'Thunderstorm') {
          weatherIcon = <FontAwesomeIcon icon={faBolt} />;
        } else if (main === 'Drizzle') {
          weatherIcon = <FontAwesomeIcon className="faSun" icon={faCloudRain} />;
        } else if (main === 'Rain') {
          weatherIcon = <FontAwesomeIcon className="faSun" icon={faCloudShowersHeavy} />;
        } else if (main === 'Snow') {
          weatherIcon = <FontAwesomeIcon className="faSun" icon={faSnowflake} />;
        } else if (icon === '01d') {
          weatherIcon = <FontAwesomeIcon className="faSuns" icon={faSun} />;
        } else if (icon === '01n') {
            weatherIcon = <FontAwesomeIcon className="famoon" icon={faCloudMoon} />;
        }else if (main === 'Clouds') {
          weatherIcon = <FontAwesomeIcon className="faSun" icon={faCloud} />;
        } else {
          weatherIcon = <FontAwesomeIcon className="faSun" icon={faSmog} />;
        }
        // faCloudMoon
        return (
            <>
                <div class="card">
                    <div class="card-header">
                        <input class="searchInput" onChange={this.changeHandle} type="text" placeholder='Search for city or place…' />
                        <span onClick={this.submitHandle}>  <i class="searchInputIcon fa fa-search" ></i></span>
                    </div>
                    <div class="card-body">
                        <h2 class="name">{name} {" , "}{country}</h2>
                        <h2 class="subTitle">     {weatherIcon} {" ,"}{description}</h2>
                        <h4 class="name">{temp} °C</h4>                 
                    </div>
                    <div class="card-footer">
                        <div class="stats">
                            <div class="stat">
                                <span class="label">Humidity</span>
                                <span class="value">{humidity}%</span>
                            </div>
                            <div class="stat">
                                <span class="label">SunTiming</span>
                                <span class="value"> Sunrise {sunrise} am {"-"} Sunset {sunset} pm</span>
                            </div>
                            <div class="stat">
                                <span class="label">wind</span>
                                <span class="value">{wind} , {"speed"}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}
export default Weather