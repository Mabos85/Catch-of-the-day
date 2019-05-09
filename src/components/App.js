import React, { Component } from 'react';

import Header from './Header'
import Order from './Order'
import Inventory from './Inventory'
import sampleFishes from '../sample-fishes'
import Fish from './Fish'
import base from '../base'


class App extends Component {

 
  state = {
    fishes: {},
    order: {}
  }
componentDidMount(){
  this.ref = base.syncState(`${this.props.match.params.storeId}/fishes`, {
    context: this,
    state: 'fishes'
  });
}
componentWillUnmount(){
  base.removeBinding(this.ref);
}

  addFish = fish => {
    // 1. Take a copy of the current state
   const fishes = { ...this.state.fishes }
    // 2.  Add our new fish to the state.   
   fishes[`fish${Date.now()}`] = fish;
   // 3. Set the new updated object to state. 
    this.setState({
      fishes
    })
   
  }

  updateFish = (key, updatedFish) => {
    // copy of the current state
    const fishes = { ...this.state.fishes }
    // update that state
    fishes[key] = updatedFish;
    // set that to state
    this.setState({ fishes })
  }

  loadSampleFishes = () => {
    this.setState({fishes: sampleFishes})

  }

  addToOrder = (key) => {
    // 1. Copy of of the state
    const order = { ...this.state.order}
    // 2. either add to order or update order
    order[key] = order[key] + 1 || 1; 
    // 3. call setstate to update our state object
    this.setState ({
      order
    })
  }

  render() {
    return (
      <div className="catch-of-the-day">
        <div className="menu">
          <Header tagline="Fresh seafood market"/>
          <ul className="fishes">
          {Object.keys(this.state.fishes).map(key => <Fish key={key} index={key} details={this.state.fishes[key]} addToOrder={this.addToOrder} /> )}

          </ul>
        </div>
       <Order 
        fishes={this.state.fishes} 
        order={this.state.order} 

        />
     
        <Inventory 
          addFish={this.addFish} 
          updateFish={this.updateFish}
          loadSampleFishes={this.loadSampleFishes}
          fishes={this.state.fishes}

         />
      </div>
    );
  }
}

export default App;
