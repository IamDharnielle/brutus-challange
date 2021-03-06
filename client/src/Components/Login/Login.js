import React, { Component } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom'

import PublicIP from 'public-ip'


class Login extends Component {

    constructor() {
        super();
        this.state = {
            email: '',
            type: '',
            password: '',
            errors: {},
            user: null
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.validate = this.validate.bind(this)
        this.getIp = this.getIp.bind(this)
    }

    handleInputChange(e) {
        // this.validate()
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit(e) {
        e.preventDefault();
        const user = {
            email: this.state.email,
            password: this.state.password,
        }
        this.validate(user);
        // console.log(user);
    }



    validate(user) {
            axios.post("/login", user).then(
                res => {
                    localStorage.setItem('user_email', res.data.email);
                    localStorage.setItem('user_name', res.data.name);
                    this.props.history.push('/dashboard');
                } 
            ).catch(err => {
                this.setState({
                    errors: {msg: err.response.data,
                    param: "login"
                }
                })
                console.log(err.response.data)
            })
        }

        async getIp ()  {
            console.log(await PublicIP.v4());
            //=> '46.5.21.123'
         
            console.log(await PublicIP.v6());
            //=> 'fe80::200:f8ff:fe21:67cf'
        };


        componentDidMount(){
            this.getIp()
        }

    render() {
        return (
            <div className="container" style={{ marginTop: '50px', width: '700px' }}>
                <h2 style={{ marginBottom: '40px' }}>BRUTUS CHALLENGE</h2>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <input
                            type="email"
                            placeholder="Email"
                            className="form-control"
                            name="email"
                            onChange={this.handleInputChange}
                            value={this.state.email}
                        />
                    </div>
                    <div className="form-group">
                        <input
                            type="password"
                            placeholder="Password"
                            className="form-control"
                            name="password"
                            onChange={this.handleInputChange}
                            value={this.state.password}
                        />
                        {this.state.errors.param &&  (<div className="alert alert-danger">{this.state.errors.msg}</div>)}
                        
                    </div>
                    <div className="btn-group btn-group-lg">
                    <div>
                    <Link to="/register">
                        <button className="btn btn-success btn-lg">Create Account</button>
                        </Link>
                    </div>
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary btn-lg" style={{marginLeft: "300px"}}>
                            Validate
                    </button>
                    </div>
                    </div>
                </form>
            </div>
        )
        }    

}


export default Login