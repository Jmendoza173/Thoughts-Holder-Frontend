import React,{Fragment} from 'react';

class LogIn extends React.Component {

  state = {
    logIn: true,
    username: "",
    password: "",
    firstName: "",
    lastName: "",
    email: "",
    errors: []
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  logInSubmitted = (event) => {
    event.preventDefault()
    fetch("http://localhost:3000/api/v1/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    }).then(res => res.json())
    .then(data => {
      if (data.errors) {
        console.log("this is data if error",data)
        this.setState({
          errors: data.errors
        })
      } else {
        console.log("this is data",data)
        this.props.setToken(data.token, data.user_id)
      }
    })
  }

  signUpSubmitted = (evt) => {
    evt.preventDefault()
    fetch("http://localhost:3000/api/v1/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName,
        email: this.state.email
      })
    }).then(res => res.json())
    .then(data => {
      if (data.errors) {
        console.log("this is data if error",data)
        this.setState({
          errors: data.errors
        })
      } else {
        console.log("this is data",data)
        this.props.setToken(data.token, data.user_id)
      }
    })
  }

  render(){
    return <Fragment>
      <ul>
        {
          this.state.errors.map((error, indx) => <li key={indx}>{ error }</li>)
        }
      </ul>
      {
        this.state.logIn 
        ? 
        <section className='loginContainer'>
          <h2 id="h2Log">Log In</h2>
          <button onClick={ () => this.setState({ logIn: false }) } id="btnInForm">Register</button>
          <form onSubmit={ this.logInSubmitted } onChange={ this.onChange } >
            <label  htmlFor="log_in_username">Username</label>
            <input  id="log_in_username" 
                    className="inputF"
                    type="text" 
                    name="username" 
                    defaultValue={ this.state.username } />
            <label  htmlFor="log_in_password">Password</label>
            <input  id="log_in_password"
                    className="inputF" 
                    type="password" 
                    name="password" 
                    defaultValue={ this.state.password } />
            <input id="btnInForm" type="submit" />
          </form>
        </section>
        :
        <section className='signupContainer'>
          <h2 id="h2Sign">Sign up</h2>
          <button onClick={ () => this.setState({ logIn: true }) } id="btnInForm">To Login</button>
          <form onSubmit={ this.signUpSubmitted } onChange={ this.onChange } >
            <label  htmlFor="sign_up_username">Username</label>
            <input  id="sign_up_username" 
                    className="inputF"
                    type="text" 
                    name="username" 
                    defaultValue={ this.state.username } />
            <label  htmlFor="sign_up_password">Password</label>
            <input  id="sign_up_password" 
                    className="inputF"
                    type="password" 
                    name="password" 
                    defaultValue={ this.state.password } />
            <label  htmlFor="sign_up_firstName">First Name</label>
            <input  id="sign_up_firstName"
                    className="inputF"
                    type="text" 
                    name="firstName" 
                    defaultValue={ this.state.firstName } />
            <label  htmlFor="sign_up_lastName">Last Name</label>
            <input  id="sign_up_lastName" 
                    className="inputF"
                    type="text" 
                    name="lastName" 
                    defaultValue={ this.state.lastName } />
            <label  htmlFor="sign_up_firstName">Email</label>
            <input  id="sign_up_email" 
                    className="inputF"
                    type="text" 
                    name="email" 
                    defaultValue={ this.state.email } />
            <input id="btnInForm" type="submit" />
          </form>
        </section>
      }
    </Fragment>
  }

}

export default LogIn
