import React, { Component } from "react";
import '../index.css';

export class Header extends Component {
  render() {
    return (
      <header id="header">
        <div className="covid_ov">
          <div className="overlay">
            <div className="container">
              <div className="row">
                <div className="col-md-8 col-md-offset-2 intro-text">
                  <h1 style={{
                      color:" #521919",
                      fontStyle: "italic",
                      fontWeight: "bold"
                  }}>
                    {this.props.data ? this.props.data.title : "Loading"}
                    <span></span>
                  </h1>
                  <h3 style={{color : "white"}}>
                    {this.props.data ? this.props.data.paragraph : "Loading"}
                  </h3>
                  < br />
                  <a
                    href="#features"
                    className="btn btn-custom btn-lg page-scroll"
                  >
                    Learn More
                  </a>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
