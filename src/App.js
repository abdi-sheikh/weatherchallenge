import React from 'react';
import ReactAnimatedWeather from 'react-animated-weather';
import Form from "./components/Form";
import './App.css';

const WEATHER_API = `${process.env.REACT_APP_WEATHER_API_KEY}`;
const LONGLAT_API = `${process.env.REACT_APP_LONGLAT_API_KEY}`;
class App extends React.Component{

    state = {
      data: [],
      longlatdata: [],
      middayWeather: [],
      ls: ""
    }

  //call api and store response in data, and check if response loaded or not.
  getWeatherData = async (e) =>{
    e.preventDefault();
    var {longlatdata,data} = this.state;
    const city = e.target.elements.city.value;
    const country = e.target.elements.country.value;
    const state = e.target.elements.state.value;
 
    const longlat_api = await fetch(`https://www.mapquestapi.com/geocoding/v1/address?key=${LONGLAT_API}&location=${city},${state},${country}`);
    longlatdata = await longlat_api.json();
    const lat = longlatdata.results[0].locations[0].latLng.lat;
    const lng = longlatdata.results[0].locations[0].latLng.lng;
    const weather_api = await fetch(`https://cors-anywhere.herokuapp.com/https://api.darksky.net/forecast/${WEATHER_API}/${lat},${lng}?exclude=currently,minutely,hourly`);
    data = await weather_api.json();
    
    this.setState({middayWeather: []});
    return (this.fiveDayForecast(data));
         
  }


  //Loop through the data, take 3rd timestamp in each day and grab necessary information from api response and added it to middayWeather array.
  fiveDayForecast(data){
    var {middayWeather} = this.state;
    let list;
    //console.log(data);
    for(let i = 0; i < data.daily.data.length-3; i++){
      const today = new days(data.daily.data[i].time,
                              data.daily.data[i].icon,
                              data.daily.data[i].temperatureHigh,
                              data.daily.data[i].temperatureLow,
                              data.daily.data[i].summary);

      middayWeather.push(today);
      
      list = middayWeather.map(today =>{
        return <div>
        <div className = "day">
          <div className = "date">
          <h2>{this.convertUnixTime(today.day)}</h2>
          </div>
          <div className = "summary">
           <p>{today.summary}</p>
          </div>
          <div className = 'image'>
            <ReactAnimatedWeather 
              color='orange' 
              icon= {today.img.replace(/-/g,'_').toUpperCase()} 
              autoplay={true}
              size = {64}
            />
          </div>
          <div className = 'temp'>
            {Math.round(today.tempHigh)} <span>&#176;</span> / {Math.round(today.tempLow)} <span>&#176;</span>
          </div>
        </div>
      </div>
      })
    }
    this.setState({ls: list})
  }


  
  convertUnixTime(unixDate){

    // Unixtimestamp
    var unixtimestamp = unixDate;
   
    // Months array
    var months_arr = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
   
    // Convert timestamp to milliseconds
    var date = new Date(unixtimestamp*1000);
   
    // Year
    var year = date.getFullYear();
   
    // Month
    var month = months_arr[date.getMonth()];
   
    // Day
    var day = date.getDate();
      
    // Display date time in MM-dd-yyyyformat
    var convdataTime = month+'-'+day+'-'+year;
    
    return convdataTime;
    
   }


  render(){
      
      return(
        
          <div>
            <h1>5 Day Forecast </h1>
            <Form getWeatherData={this.getWeatherData}/>
            <div className = 'forecast'>
              
              {this.state.ls}
            </div>
            
            
          </div>
      
      );
    }
}


//constructor class for days
class days {
  constructor(day, img, tempHigh,tempLow,summary) {
    this.day = day;
    this.img = img;
    this.tempHigh = tempHigh;
    this.tempLow = tempLow;
    this.summary = summary;
  }
}


export default App;
