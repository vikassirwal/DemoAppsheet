import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

import Header from './components/Header';
import Title from './components/Title';
import ProfileDivContainer from './components/ProfileDivContainer';

class App extends Component {
  constructor(){
    super();
    this.state ={
      id : [],
      details: [],
      token : ' ',
      loading: true,
      finalUsersWithSortedAgeAndName : []
    }
  }


//componentDidMount collects all the id's given in different urls and stores its in an array named id and details

  componentDidMount(){

        var that = this;   //done for accessing this keyword in the function

        function collectIdFromUrls(token){
            fetch(`https://appsheettest1.azurewebsites.net/sample/list?token=${token}`)
            .then((response) => response.json())
            .then((response) => {
              that.setState((prevState) => {
                return {
                  id : [...prevState.id , ...response.result],
                  token : [response.token]
                }
              }) 
              if (that.state.token[0] === undefined) {
                  // this IF block only runs when there is no token property in the above url 
                  // this for loop fetches the information by iterting over the array given in this URL
                for (var i = 0 ; i < that.state.id.length + 1; i++)  {
                  if ( i === (that.state.id.length)) {

                      //setTimeout set the state with the information coming from API
                      setTimeout(() => {
                        var usersHavingValidNumber = [] //array storing users having valid phone number
                        var phoneno = /^(1\s?)?(\(\d{3}\)|\d{3})[\s\-]?\d{3}[\s\-]?\d{4}$/;
                            for (let i = 0 ; i < that.state.id.length ; i++) {
                                 if(that.state.details[i] !== undefined) {
                                    if(phoneno.test(that.state.details[i].number)) {
                                        usersHavingValidNumber.push(that.state.details[i])
                                    }
                                 }
                            }
                            //function that sorts the youngest five members in the array
                             function sortAge(a,b) {
                                return (a.age - b.age)
                                  }
                                var sortedAge = usersHavingValidNumber.sort(sortAge).slice(0,5);

                                         
                            //function that sorts the name of users 
                              function sortName(a,b) {
                                  if (a.name < b.name)
                                    return -1;
                                  if (a.name > b.name)
                                    return 1;
                                    return 0;
                                      }

                              //setting the final users in the state called finalUsersWithSortedAgeAndName
                              var sortedName = sortedAge.sort(sortName);

                                  that.setState((prevState) => {
                                    return {
                                        finalUsersWithSortedAgeAndName : [...prevState , ...sortedName]
                                            }
                                    })

                        // making the loading false
                        that.setState({loading : false})
                      }, 1000)
                      break;
                  }

                // Fetch API used to store id's from different API and storing it in this.state.id

                fetch(`http://appsheettest1.azurewebsites.net/sample/detail/${that.state.id[i]}`)
                .then((data) => {
                  if (data.status === 200){
                      return data.json()
                    }
                  }) 
                .then((response) => { 
                  that.setState((prevState)=> { 
                    return {
                      details : [...prevState.details, response]
                     }
                   })
                  })
                 }
                 return;
                  } else{
                    collectIdFromUrls(that.state.token); 
                  }
                  } 
            )
        }

      collectIdFromUrls(that.state.token);
  }
  
  render() {
    if (this.state.loading) {
      return (
        <div className= 'Loading'>
        </div>
        )
    }
    return(
      <div>
          <Header />
          <Title />
          <ProfileDivContainer usersInfo = {this.state.finalUsersWithSortedAgeAndName}/>
      </div>
      );
  }
}

export default App;
