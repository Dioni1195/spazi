import React, { Component } from "react";
import { Link, Redirect } from "react-router-dom";
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

import "../styles/forms.css";
import "./../styles/base.css";
import "./../styles/flexbox.css";

import { LogoWhite } from "../components/";

const MySwal = withReactContent(Swal);
class SignInSpazi extends Component {
    constructor() {
        super();

        this.state = {
            email: "",
            password: "",
            redirect: false,
            type: "spazi"
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === "checkbox" ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        let data = { email: this.state.email, password: this.state.password, type: this.state.type }
        const url = 'https://spazi.rocks/api/login'

        async function postData(url = '', data = {}) {
            const response = await fetch(url, {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data) // body data type must match "Content-Type" header
            });
            return response
        }
        try {
            postData(url, data)
                .then((resp) => {
                    if (resp.status === 200) {
                        this.props.history.push('/spazis')
                    } else {
                        MySwal.fire({
                            icon: 'Check again :)',
                            title: "Not a valid e-mail or password"
                        })
                    }
                })
        } catch (error) {
            alert('Something went wrong')
            console.log(error.message)
        }

    }

    render() {
        /*if (this.state.redirect === true) {
          return <Redirect to='/users'  />
        }*/
        return (
            <div className="form-container">
                <LogoWhite />
                <form
                    onSubmit={this.handleSubmit}
                    className="FormFields"
                    onSubmit={this.handleSubmit}
                >
                    <div className="PageSwitcher">
                        <Link to="/signinspazi" className="PageSwitcher__Item PageSwitcher__Item--Active">Spazi</Link>
                        <Link to="/signin" className="PageSwitcher__Item">User</Link>
                    </div>
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="email">
                            E-Mail Address
            </label>
                        <input
                            type="email"
                            id="email"
                            className="FormField__Input"
                            placeholder="Enter your email"
                            name="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="password">
                            Password
            </label>
                        <input
                            type="password"
                            id="password"
                            className="FormField__Input"
                            placeholder="Enter your password"
                            name="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20">Sign In</button>{" "}
                        <Link to="/signup" className="FormField__Link">
                            Create an account
            </Link>
                    </div>
                </form>
            </div>
        );
    }
}

export default SignInSpazi;
