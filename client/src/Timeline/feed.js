import React from 'react';
import study from '../img/study.svg';
import exercise from '../img/exercise.svg';
import entertainment from '../img/entertainment.svg';
import work from '../img/work.svg'
import cook from '../img/cook.svg'
import chores from '../img/chores.svg'
import mindfulness from '../img/mindfulness.svg'
import other from '../img/other.svg'
import xiao from '../img/xiao.jpg'
import rish from '../img/rish.jpg'
import wayne from '../img/wayne.jpg'
import ansh from '../img/ansh.jpg'

import '../style/feed.css'
import ProgressBar from 'react-bootstrap/ProgressBar'

var iconMap = {
    Study: study,
    Exercise: exercise,
    Entertainment: entertainment,
    Work: work,
    Cook: cook,
    Chores: chores,
    Mindfulness: mindfulness,
    Other: other
}

var friendMap = {
    xiao: xiao,
    rish: rish,
    wayne: wayne,
    ansh: ansh
}


class Feed extends React.Component {


    render() {
        var name = JSON.stringify(this.props.data.userName);
        name = name.substring(1, name.length - 1);
        var task = JSON.stringify(this.props.data.currentTask.taskName);
        task = task.substring(1, task.length - 1);
        var category = JSON.stringify(this.props.data.currentTask.groupName);
        category = category.substring(1, category.length - 1);
        var description = JSON.stringify(this.props.data.currentTask.description);
        description = description.substring(1, description.length - 1);
        console.log(this.props.data)
        var time = JSON.stringify(this.props.data.dateAndTime)
        time = time.substring(1, time.length - 1);
        return (<div className='Feed'>
            <img src={iconMap[task]}></img>
            <div className="feed-line">
            <span >{name} completed a task of {description} <br/>at {time}</span>
            </div>
            <div className="imgDiv">
            <img src={friendMap[name]} className="ProfilePic" height="50" width="50"></img>
            </div>
        </div>);
    }
}

export default Feed;