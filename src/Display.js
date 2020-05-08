import React from 'react';

class Display extends React.Component {
    render() {
        const message = this.props.weather ? `${this.props.weather} and ${this.props.temp} degrees ${this.props.format}` 
            : 'Search for weather below'
        let buttonText = this.props.format === 'f' ? 'celsius' : 'fahrenheit'
        return (
            <div>
                <h2>{this.props.city}</h2>
                <p>{message}</p>
                <button onClick={this.props.onClick}>Switch to {buttonText}</button>
            </div>
        )
    }
}

export default Display