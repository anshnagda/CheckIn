import React from 'react';
import study from '../img/study.svg';
import exercise from '../img/exercise.svg';
import entertainment from '../img/entertainment.svg';
import work from '../img/work.svg'
import cook from '../img/cook.svg'
import chores from '../img/chores.svg'
import mindfulness from '../img/mindfulness.svg'
import other from '../img/other.svg'
import '../style/task.css';
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

class Task extends React.Component {

    completeTask = (taskInfo) => {

        fetch('http://localhost:4567/logTask' + taskInfo, {
            method: 'post',
        });
        setTimeout(2000);
        this.props.pageUpdateCallback();
    }

    render() {
        // console.log(JSON.stringify());
        var task = JSON.stringify(this.props.data.taskName);
        task = task.substring(1, task.length - 1);
        var category = JSON.stringify(this.props.data.groupName);
        category = category.substring(1, category.length - 1);
        var description = JSON.stringify(this.props.data.description);
        description = description.substring(1, description.length - 1);
        var taskID = JSON.stringify(this.props.data.taskID);
        console.log(taskID)
        var taskInfo = "?" + "userName=" + window.$username + "&taskID=" + taskID;
        // console.log(taskInfo)

        return (<div className='Task'>
            {/* <div className="task-name">{task}</div> */}
            <div className="task-info">
                <div className="friend-share-text">{description} ({task})</div><br/>
                <div className="friend-share-text"> Shared With: #{category}</div>
            </div>

            <div className="rightPart">
                <div className="iconContainer"><img src={iconMap[task]} width={30} height={30} className="iconImage"></img></div>
                
                <button className="btn fourth"onClick={() => this.completeTask(taskInfo)}>
                    <span>COMPLETE</span>
                </button>
            </div>
            
        </div>);
    }
}


export default Task;