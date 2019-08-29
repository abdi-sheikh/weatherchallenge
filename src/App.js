import React, {Component} from 'react';
import './App.css';


class App extends Component{

  constructor(props){
    super(props);
    this.state = {
      data: [],
      isLoaded: false,
      middayWeather: [],
    }


  }



  //call api and store response in data, and check if response loaded or not.
  componentDidMount(){
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=Minneapolis,us&units=imperial&APPID=09110e603c1d5c272f94f64305c09436')
      .then(res => res.json())
      .then(json => {
        this.setState({
          isLoaded: true,
          data: json,
        })
      });
  }

  //Depending on weather what contact info should be returned
  bestContact(temperature,type){
    if(type === 'Clear' && temperature > 75){
      return 'text message';
    }else if(temperature >= 55 && temperature <= 75 && type !== 'Rain'){
      return 'email';
    }else if(temperature < 55 || type === 'Rain'){
      return 'phone call';
    }

  }

  //Loop through the data, take 3rd timestamp in each day and grab necessary information from api response and added it to middayWeather array.
  dataCleanUp(data){
    var { isLoaded,data,middayWeather} = this.state;
    for(let i = 2; i < data.list.length; i+=8){
      const today = new days(data.list[i].dt_txt.split(' ')[0],
                              data.list[i].weather[0].icon,
                              data.list[i].main.temp, 
                              this.bestContact(data.list[i].main.temp,data.list[i].weather[0].main));
      
      middayWeather.push(today);
      
    }

  }


  render(){

    var { isLoaded,data,middayWeather} = this.state;

    if(!isLoaded){
      return <div>Loading....</div>
    }else{
      this.dataCleanUp(data);
      
      return(
//Display the 5 days w/ date, img of weather, temp, and best contact (having issues with for loop so did it static)
        <div className="App">
          <h2>5 Day Forecast</h2>
            <div className = "day">
              {middayWeather[0].day}
              <div className = 'image'>
              <img src={'/img/' + middayWeather[0].img + '.png'}/>
              </div>
              <div className = 'temp'>
              {middayWeather[0].temp} <span>&#8457;</span>
              </div>
              <div className = 'contact'>
                <h6>Best way to reach customers is {middayWeather[0].cont}</h6>
              </div>
            </div>
            <div className = "day">
              {middayWeather[1].day}
              <div className = 'image'>
              <img src={'/img/' + middayWeather[1].img + '.png'}/>
              </div>
              <div className = 'temp'>
              {middayWeather[1].temp} <span>&#8457;</span>
              </div>
              <div className = 'contact'>
                <h6>Best way to reach customers is {middayWeather[1].cont}</h6>
              </div>
            </div>
            <div className = "day">
              {middayWeather[2].day}
              <div className = 'image'>
              <img src={'/img/' + middayWeather[2].img + '.png'}/>
              </div>
              <div className = 'temp'>
              {middayWeather[2].temp} <span>&#8457;</span>
              </div>
              <div className = 'contact'>
                <h6>Best way to reach customers is {middayWeather[2].cont}</h6>
              </div>
            </div>
            <div className = "day">
              {middayWeather[3].day}
              <div className = 'image'>
              <img src={'/img/' + middayWeather[3].img + '.png'}/>
              </div>
              <div className = 'temp'>
              {middayWeather[3].temp} <span>&#8457;</span>
              </div>
              <div className = 'contact'>
                <h6>Best way to reach customers is {middayWeather[3].cont}</h6>
              </div>
            </div>
            <div className = "day">
              {middayWeather[4].day}
              <div className = 'image'>
              <img src={'/img/' + middayWeather[4].img + '.png'}/>
              </div>
              <div className = 'temp'>
              {middayWeather[4].temp} <span>&#8457;</span>
              </div>
              <div className = 'contact'>
                <h6>Best way to reach customers is {middayWeather[4].cont}</h6>
              </div>
            </div>
        </div>
        
      );
    }
  } 
}

//constructor class for days
class days {
  constructor(day, img, temp, cont) {
    this.day = day;
    this.img = img;
    this.temp = temp;
    this.cont = cont;
  }
}

export default App;
