import React from 'react';
import Task from './Task';
import NewTaskModal from './NewTaskModal';

class Tasklist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.data };
    }

    addNewTaskCallBack = (newdata) => {
        this.setState({ data: newdata })
    }

    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if (oldProps.field !== newProps.field) {
            this.setState({ data: newProps.data })
        }
    }

    render() {
        if (this.state.data === undefined || this.state.data === {}) {
            if (this.props.data === undefined || this.props.data === {}) {
                return (<div className='Tasklist'>
                    
                    <NewTaskModal updateCallback={this.addNewTaskCallBack} groups={this.props.groups}/>
                </div>);
            }
            return (<div className='Tasklist'>
                
                <NewTaskModal updateCallback={this.addNewTaskCallBack} groups={this.props.groups}/>
                {this.props.data.map((obj) => <Task data={obj} pageUpdateCallback={this.props.pageUpdateCallback}/>)}

            </div>);

        } else {



            return (<div className='Tasklist'>
                
                <NewTaskModal updateCallback={this.addNewTaskCallBack} groups={this.props.groups}/>
                {console.log(JSON.stringify(this.props.data))}
                {this.state.data.map((obj) => <Task data={obj} pageUpdateCallback={this.props.pageUpdateCallback}/>)}

            </div>);


        }

    }
}
export default Tasklist;