import React from 'react';
import Friend from './Friend';


class Friendlist extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data: props.data };
    }

    render() {

        if (this.props.data === undefined) {
            return null;
        } else {
            var list = [];
            for (var propt in this.props.data) {
                list.push({"name": propt, "score": this.props.data[propt]})
            }
            return (
                // [mapp.keys()].map(jobsForDate =>
                //     jobsForDate.map(job => (
                //         <Friend data={job} />
                //     ))

                <div className="Friendlist">
                    {list.map((obj, i) => <Friend data={obj} />)}
                </div>
                
            );
        }

    }
}


export default Friendlist;