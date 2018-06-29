import React , {Component} from 'react';


//Profile Div Component

class ProfileDiv extends Component {

  render(){
    return(
      <div className = "Pdiv"> 
        <div style = {{backgroundImage: `url(${this.props.image})`}} className = "Image"> 
        </div>
        <h3 style={{textAlign:'center'}}>{this.props.name}</h3> 
        <h4 style={{textAlign:'center'}}>Id : {this.props.id}</h4>
        <h4 style={{textAlign:'center'}}>Age : {this.props.age} years</h4>  
        <h4 style={{textAlign:'center'}}>Ph. No. : {this.props.number}</h4>
        <div>
          <h5><span>Bio : </span>{this.props.bio}</h5>
        </div>    
      </div>
      )
  }
}

export default ProfileDiv;