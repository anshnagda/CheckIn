import React from 'react';
import xiao from '../img/xiao.jpg'
import rish from '../img/rish.jpg'
import wayne from '../img/wayne.jpg'
import ansh from '../img/ansh.jpg'
import ProgressBar from 'react-bootstrap/ProgressBar'


import '../style/friend.css';


var friendMap = {
    xiao: xiao,
    rish: rish,
    wayne: wayne,
    ansh: ansh
}

var progress_bar_class = (score) => {
    if (40 <= score && score <= 60) {
        return "w3-blue";
    }
    if (score > 60) {
        return "w3-green";
    }
    return "w3-red"
}

class Friend extends React.Component {

    checkin = (checkinInfo) => {
        fetch('http://localhost:4567/notify' + checkinInfo, {
            method: 'post',
        });
    }

    

    render() {

        var checkinInfo = "?" + "userName=" + window.$username + "&friendName=" + this.props.data.name + "&notificationText=CheckIn"
        return (<div className='Friend'>

            <div className='Friend'>
                <div className="friend-left">
                    <div class="friend-name"><a>Friend's name: </a>{this.props.data.name}</div>
                    {/* <ProgressBar now={60} /> */}
                    <div class="w3-light-grey" style={{height:5}}>
                        <div class={progress_bar_class(this.props.data.score)} style={{height: 5, width: Math.max(10, this.props.data.score) + "%"}}></div>
                    </div>

                    <button class="check-in-map" onClick={() => this.checkin(checkinInfo)}>
                        CHECK IN
                </button>
                </div>
                <div className="friend-right">
                <img src={friendMap[this.props.data.name]} className="ProfilePic" height="80" width="80"></img>
                </div>
                
            </div>

        </div >);
    }
}


export default Friend;