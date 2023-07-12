import React, { Component } from "react";
import { Link } from "react-router-dom";
import MyContext from "../contexts/MyContext";

class Inform extends Component {
  static contextType = MyContext; // using this.context to access global state
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: !!localStorage.getItem("token"),
    };
  }

  componentDidMount() {
    window.addEventListener("storage", this.handleStorageChange);
  }

  componentWillUnmount() {
    window.removeEventListener("storage", this.handleStorageChange);
  }

  handleStorageChange = () => {
    const isLoggedIn = !!localStorage.getItem("token");
    this.setState({ isLoggedIn });
  };

  lnkLogoutClick = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("customer");
    this.context.setMycart([]);
    this.context.setToken("");
    this.context.setCustomer(null);
  };
  render() {
    const token = localStorage.getItem("token");
    const customer = localStorage.getItem("customer")
      ? JSON.parse(localStorage.getItem("customer"))
      : null;

    return (
      <div className="border-bottom">
        <div className="float-left">
          {!token ? (
            <div>
              <Link to="/login">Login</Link> | <Link to="/signup">Sign-up</Link>{" "}
              | <Link to="/active">Active</Link>
            </div>
          ) : (
            <div>
              Hello <b>{customer.name}</b> |{" "}
              <Link to="/home" onClick={() => this.lnkLogoutClick()}>
                Logout
              </Link>{" "}
              | <Link to="/myprofile">My profile</Link> |{" "}
              <Link to="/myorders">My orders</Link>
            </div>
          )}
        </div>
        <div className="float-right">
          <Link to="/mycart">My cart</Link> have{" "}
          <b>{this.context.mycart.length}</b> items
        </div>
        <div className="float-clear" />
      </div>
    );
  }
}
export default Inform;
