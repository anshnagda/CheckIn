import React from 'react';
import Popup from 'reactjs-popup';

class NotificationModal extends React.Component {
    constructor(props) {
        super(props);
        this.state = { open: false };
        this.openModal = this.openModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    openModal() {
        this.setState({ open: true });
    }
    closeModal() {
        this.setState({ open: false });
    }

    render() {
        var list = [];
        for (var propt in this.props.notification) {

            list.push(<div className="notif-content">{propt} just checked in on you!</div>)
        }


        return (
            <div>
                <button className="button notif-button" onClick={this.openModal}>
                    Notification
                </button>
                <Popup
                    open={this.state.open}
                    closeOnDocumentClick
                    onClose={this.closeModal}
                >
                    <div className="modal">
                        <a className="close" onClick={this.closeModal}>
                            &times;
                        </a>
                        {list}
                    </div>
                </Popup>
            </div>
        );
    }
}

export default NotificationModal;