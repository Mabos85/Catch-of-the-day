import React, { Fragment } from 'react'
import { getFunName } from '../helpers'

class Storepicker extends React.Component{
  constructor(){
    super()
    this.goToStore = this.goToStore.bind(this);
  }
 myInput = React.createRef();

goToStore(event){
 event.preventDefault()
// get the value from the input
const storeName = this.myInput.value.value;

// chage the route
this.props.history.push(`/store/${storeName}`)

}

  render(){

    return (
      <Fragment>
        <form className="store-selector" onSubmit={this.goToStore}>
          <h2>Please enter a store</h2>
         
          <input 
            type="text"
            ref={this.myInput}
            required 
            placeholder="Store Name" 
            defaultValue={getFunName()}
            />
          <button type="submit">Visit store</button>
        </form>
      </Fragment>
    )
  }
}

export default Storepicker
