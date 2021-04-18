import React from 'react';
import axios from 'axios';

class Register extends React.Component { 
    constructor(props) {
        super(props);
        this.state = {
            name: "",
            email: "",
            password: ""
        }
    }

    onNameChange = (event) => {
        this.setState({name: event.target.value})
    }

    onEmailChange = (event) => {
        this.setState({email: event.target.value})
    }

    onPasswordChange = (event) => {
        this.setState({password: event.target.value})
    }
    onSubmitSignIn = (e) => {
        e.preventDefault(); 
        // axios({
        //     url: 'https://git.heroku.com/fast-brook-16183.git/register',
        //     method: 'post',
        //     data:  {
        //         name: this.state.name,
        //         email: this.state.email,
        //         password: this.state.password
        //     },
        //     headers: {"Access-Control-Allow-Origin": "*"}
        // })
        // .then(function (response) {
        //     response.json()
        // })
        // .then(user => {
        //     if(user.id) {
        //         this.props.loadUser(user)
        //         this.props.onRouteChange("home");
        //     }
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
        fetch('https://fast-brook-16183.herokuapp.com/register', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Origin": "*"
                // 'Access-Control-Request-Method': 'POST',
                // 'Origin': 'http://localhost:3000'
            },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                password: this.state.password
            })
        })
        .then(response => response.json())
        .then(user => {
            if(user.id) {
                this.props.loadUser(user)
                this.props.onRouteChange("home");
            }
        })
    }

    render () {
        return (
            <article 
                className="br3 ba b--black-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center"
            >    
                <main className="pa4 black-80">
                    <form className="measure center">
                        <fieldset 
                            id="sign_up" 
                            className="ba b--transparent ph0 mh0"
                        >
                            <legend className="f2 fw6 ph0 mh0 center">
                                Register
                            </legend>
                            <div className="mt3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="name">
                                    Name
                                </label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-90" 
                                    type="name" 
                                    name="name-register"  
                                    id="name-register"
                                    onChange={this.onNameChange} 
                                />
                            </div>
                            <div className="mt3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="email">
                                    Email
                                </label>
                                <input 
                                    className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="email" 
                                    name="email"  
                                    id="email" 
                                    onChange={this.onEmailChange}
                                />
                            </div>
                            <div className="mv3">
                                <label 
                                    className="db fw6 lh-copy f6" 
                                    htmlFor="password">
                                        Password
                                </label>
                                <input 
                                    className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" 
                                    type="password" 
                                    name="password-register"  
                                    id="password-register"
                                    onChange={this.onPasswordChange}
                                 />
                            </div>
                        </fieldset>
                        <div className="center centering">
                            <input 
                                onClick = {this.onSubmitSignIn}
                                className="b ph3 pv2 input-reset ba b--black bg-transparent grow pointer f6 dib" 
                                type="submit" 
                                value="Register" 
                            />
                        </div>
                    </form>
                </main>
            </article>
        )
    }
} 


export default Register;