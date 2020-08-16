import React from 'react';
import Timeline from './Timeline/timeline';
import Tasklist from './Task/Tasklist';
import Friendlist from './Friend/Friendlist';
import NotificationModal from './NotificationModal'

window.$username = ''
class App extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      username: '',
      data: []
    }
  }



  setUsername = (event) => {
    if (event.target.value !== '')
      this.setState({ username: event.target.value })
  }

  customUpdate = () => {
    fetch('http://localhost:4567/populateFeed?userName=' + this.state.username)
      .then(res => res.json())
      .then((data) => {
        this.setState({ data: data });
      })
    this.forceUpdate();
  }


  render() {
    if (window.$username === '') {
      console.log(this.state)
      console.log(window.$username)
      return (
        <div className="login">
          <div className="loginCheckIn">
            <h1>CheckIn</h1>
          </div>
          <div class="vr">&nbsp;</div>
          <form className="loginForm" onSubmit={() => { this.customUpdate(); window.$username = this.state.username; this.forceUpdate() }}>
            Username: <input type="text" onChange={this.setUsername}></input> <br /><br />
             Password:  <input type="text"></input><br /><br />
            <input type="submit" value="Submit" />
          </form>
        </div>
      )
    }
    // console.log(JSON.stringify(this.state.data))
    // for (var i = 0; i < this.state.data.length; i++) {
    //   var obj = this.state.data[i];
    //   console.log(obj.id);
    // }
    var timeobj = this.state.data.timeline;
    var taskobj = this.state.data.tasks;
    var friendobj = this.state.data.friendScore;
    var groups = this.state.data.groups;
    var notification = this.state.data.notification;
    //var friendobj = this.state.data.friendScore;
    // var taskobj = this.state.data.tasks;
    // var friendobj = this.state.data.friends;
    if (notification === undefined || notification === {}) {
      return (

        <div className="App">
          <div className="navbar">
            <div className="brand">
              <h1 className="nav-title">Checkin</h1>
              <h2 className="nav-subtitle">Make Your Quarentine Productive</h2>
            </div>
            <div className="right-menu">

            </div>
          </div>
          <section class="mainContent">
            <div class="col col-timeline">
              <h3 className="section-name">feed</h3>
              <Timeline data={timeobj} />
              {/* {timeobj.map((obj, i) => <Timeline data={obj} />)} */}
            </div>
            <div class="col col-task">

              {/* There should be a button called "new task" */}
              <Tasklist data={taskobj} pageUpdateCallback={this.customUpdate} groups={groups} />
            </div>
            <div class="col col-friends">
              <h3 className="section-name">friends</h3>
              <Friendlist data={friendobj} />
            </div>
          </section>
        </div>
      );
    } else {
      return (

        <div className="App">
          <NotificationModal notification={notification} />
          <div className="navbar">
            <div className="brand">
              <h1 className="nav-title">Checkin</h1>
              <h2 className="nav-subtitle">Make Your Quarantine Productive</h2>
            </div>
            <div className="right-menu">

            </div>
          </div>
          <section class="mainContent">
            <div class="col col-timeline">
              <h3 className="section-name">feed</h3>
              <Timeline data={timeobj} />
              {/* {timeobj.map((obj, i) => <Timeline data={obj} />)} */}
            </div>
            <div class="col col-task">

              {/* There should be a button called "new task" */}
              <Tasklist data={taskobj} pageUpdateCallback={this.customUpdate} groups={groups} />
            </div>
            <div class="col col-friends">
              <h3 className="section-name">friends</h3>
              <div className="inline-button-div">
                <button className="button new-task-button">
                  Add Friend
                    </button>
              </div>
              <Friendlist data={friendobj} />
            </div>
          </section>
        </div>
      );
    }

    // <div className="App">
    //   <h1>WARX</h1>
    //   {timeobj.map((obj, i) => <Timeline data={obj} />)}
    //   <Friendlist />
    //   <Tasklist />

    // </div>

  }

}


export default App;