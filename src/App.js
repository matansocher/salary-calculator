import React, { Component } from 'react';
import TopSection from './components/TopSection';
import MenuBar from './components/MenuBar';

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopSection />
        <MenuBar />
      </div>
    );
  }
}

export default App;
