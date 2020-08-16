import React from 'react';
import Popup from 'reactjs-popup';

class NewTaskModal extends React.Component {
    constructor(props) {
        super(props);
        var firstPropt = "";
        var count = 0;
        
        for (var propt in this.props.groups) {
            if (count == 0) {
                count++;
                firstPropt = propt;
                break;
            }
        }

        this.state = { open: false};
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = { username: "", frequency: 1, category: "Study", description: "", group: firstPropt };
    }
    openModal() {
        this.setState({ open: true });
    }
    closeModal() {
        this.setState({ open: false });
    }


    categoryHandler = (event) => {
        this.setState({ category: event.target.value });
    }
    frequencyHandler = (event) => {
        this.setState({ frequency: event.target.value });
    }
    descriptionHandler = (event) => {
        this.setState({ description: event.target.value });
    }
    groupsHandler = (event) => {
        this.setState({ group: event.target.value });
    }


    handleSubmit = (event) => {
        var data = {
            username: "username1",
            category: this.state.category,
            description: this.state.description,
            frequency: this.state.frequency,
            group: this.state.group
        }
        this.createNewTask(data);
        event.preventDefault();

        this.closeModal()
    }

    createNewTask = (data) => {
        fetch('http://localhost:4567/addTask' + "?" + "userName="
            + window.$username + "&taskName=" + this.state.category + "&groupName="
            + this.state.group + "&description=" + this.state.description + "&frequency=" + this.state.frequency, {
            method: 'post',
        }).then(res => res.json()
        ).then(data => this.props.updateCallback(data));
    }

    render() {
        const list = [];
        for (var propt in this.props.groups) {
            list.push(<option value={propt}>{propt}</option>)
        }

        return (
            <div>
                <h3 className="section-name">your task</h3>
                <div className="inline-button-div">
                    <button className="button new-task-button" onClick={this.openModal}>
                        Add Task
                    </button>
                </div>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div className="modal">
                        <a className="close" onClick={this.closeModal}>
                            &times;
                        </a>
                        <form onSubmit={this.handleSubmit}>

                            <label>
                                Category: &nbsp;
                                <select value={this.state.category} onChange={this.categoryHandler}>
                                    <option value="Study">Study</option>
                                    <option value="Exercise">Exercise</option>
                                    <option value="Entertainment">Entertainment</option>
                                    <option value="Work">Work</option>
                                    <option value="Cook">Cook</option>
                                    <option value="Chores">Chores</option>
                                    <option value="Mindfulness">Mindfulness</option>
                                    <option value="Other">Other</option>
                                </select>
                            </label><br/>
                            <label>
                                Description: &nbsp;
                                <input type="text" onChange={this.descriptionHandler}></input>
                            </label><br/>
                           
                            <label>
                                Frequency: &nbsp;
                                <select value={this.state.frequency} onChange={this.frequencyHandler}>
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                    <option value="6">6</option>
                                    <option value="7">7</option>

                                </select>
                            </label>
                            <br/>
                            
                            <label>
                                Groups: &nbsp;
                                <select value={this.state.group} onChange={this.groupsHandler}>
                                    {list}
                                </select>

                            </label>
                            <br/>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                </Popup>
            </div>
        );
    }
}

export default NewTaskModal;