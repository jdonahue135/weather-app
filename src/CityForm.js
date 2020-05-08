import React from 'react';

class CityForm extends React.Component {
    render() {
        return (
            <div>
                <form onSubmit={this.props.onSubmit}>
                    <label htmlFor="city-form">City:</label>
                    <input 
                        onChange={this.props.onChange}
                        id="city-form">
                    </input>
                    <button type="submit">
                        Get Weather
                    </button>
                </form>
            </div>
        )
    } 
}

export default CityForm