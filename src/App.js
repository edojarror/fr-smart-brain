import React from 'react';
import Navigation from './components/navigation/navigation';
import SignIn from './components/signIn/signIn';
import Register from './components/register/register';
import Logo from './components/logo/logo';
import Rank from './components/rank/rank';
import ImageLinkForm from './components/imagelinkform/imagelinkform';
import FaceRecognition from './components/facerecognition/facerecognition';
import Particles from 'react-particles-js';
import './App.css';

const particlesOptions = {
  particles: {
    number: {
      value: 80,
      density: {
        enable: true,
        value_area: 800
      }
    },
    move: {
      enable: true,
      speed: 6
    }
  }
}

const initialState = {
  input: "",
  imageUrl: "",
  box: {},
  route: "signin",
  isSignedIn: false,
  user: {
    id: "",
    name: "",
    email: "",
    entries: 0,
    joined: "",
  }
}

class App extends React.Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById("inputimage");
    const width =  Number(image.width);
    const height = Number(image.height);
    return {
      leftCol: clarifaiFace.left_col * width,
      rightCol: width - (clarifaiFace.right_col * width),
      topRow: clarifaiFace.top_row * height,
      bottomRow: height - (clarifaiFace.bottom_row * height)
    }
  }

  displayFaceBox = (box) => {
    this.setState({box: box})
  }

  onInputChange = (event) => {
  this.setState({input: event.target.value});
  }

  onPictureSubmit = () => {
    this.setState({imageUrl: this.state.input})
    fetch('https://fast-brook-16183.herokuapp.com/imageUrl', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        input: this.state.input
      }) 
    })
    .then(response => response.json())
    .then(response => {
      if(response) {
        fetch('https://fast-brook-16183.herokuapp.com/image', {
          method: "put",
          headers: {"Content-Type": "application/json"},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
        .then(response => response.json())
        .then(count => {
          this.setState(Object.assign(this.state.user, {entries: count}))
        })
      }
      this.displayFaceBox(this.calculateFaceLocation(response))
    })  
    .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if(route === "signout") {
      this.setState(initialState) 
    } else if(route === "home") {
      this.setState({isSignedIn: true})
    }
    this.setState({route: route})
  }
  render() {
    const { box, imageUrl, isSignedIn, route } = this.state;
    return (
      <div className="App">
        <Particles 
          className="particles" 
          params={particlesOptions} 
        />      
        <Navigation 
          onRouteChange={this.onRouteChange}
          isSignedIn={isSignedIn} 
        /> 
        { route === 'home' 
          ? 
          <div>
            <Logo />
            <Rank 
              name={this.state.user.name} 
              entries={this.state.user.entries} 
            />
            <ImageLinkForm 
              onInputChange={this.onInputChange}
              onPictureSubmit={this.onPictureSubmit}
            />
            <FaceRecognition imageUrl={imageUrl} box={box} />
          </div>
          : (
              route === 'signin'
              ? <SignIn loadUser={this.loadUser} onRouteChange={this.onRouteChange} />     
              : <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange} /> 
            )
        }
      </div>
    );
  }  
}

export default App;
