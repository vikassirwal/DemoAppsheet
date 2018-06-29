import React, { Component } from 'react';
import ProfileDiv from './ProfileDiv';


//ProfileDivContainer
class ProfileDivContainer extends Component {

  render(){
    return(
      <div className = "ProfileDivContainer" > 
        {this.props.usersInfo.map((item) => <ProfileDiv 
          key={item.id} 
          name={item.name} 
          id={item.id} 
          age={item.age} 
          number={item.number} 
          bio={item.bio} 
          image= {item.photo}/>)}
      </div>
      )
  }
 }


export default ProfileDivContainer;