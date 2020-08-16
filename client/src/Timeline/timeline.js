import React from 'react';
import Feed from './feed.js';


class Timeline extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.data };
    }

    componentWillReceiveProps(newProps) {
        const oldProps = this.props
        if (oldProps.field !== newProps.field) {
            this.setState({data: newProps.data})
        }
    }
    render() {

        if (this.props.data === undefined) {
            return null;
        } else {
            return (<div className='Timeline'>
                
                {this.props.data.map((obj, i) => <Feed data={obj} />)}

            </div>);
        }

    }
}

export default Timeline;