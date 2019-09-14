import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import SeasonDisplay from './SeasonDisplay';
import Spinner from './Spinner';

const App = () => {
  const [lat, setLat] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    window.navigator.geolocation.getCurrentPosition(
      position => setLat(position.coords.latitude),
      err => setErrorMessage(err.message)
    );
  }, []);

  let content;
  if (errorMessage) {
    content = <div>Error: {errorMessage}</div>;
  } else if (lat) {
    content = <SeasonDisplay lat={lat} />;
  } else {
    content = <Spinner message='Please accept location request' />;
  }

  return <div className='container'>{content}</div>;
};

// class App extends React.Component {
//     state = { lat: null, errorMessage: '' };

//     componentDidMount() {
//         window.navigator.geolocation.getCurrentPosition(
//             (position) => this.setState({ lat: position.coords.latitude }),
//             (err) => this.setState({ errorMessage: err.message })
//         );
//     };

//     renderContent() {
//         if (this.state.errorMessage && !this.state.lat) {
//             return <div className="error-display">Error: {this.state.errorMessage}</div>
//         }

//         if (!this.state.errorMessage && this.state.lat) {
//             return <SeasonDisplay lat={this.state.lat} />
//         }

//         return <Spinner message="Please accept location request" />;
//     };

//     render() {
//         return (
//             <div className="container">
//                 {this.renderContent()}
//             </div>
//         )
//     };
// };

ReactDOM.render(<App />, document.getElementById('root'));
