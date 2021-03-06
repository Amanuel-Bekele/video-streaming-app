import React from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { fetchStreams } from '../../actions';


class StreamList extends React.Component {

    componentDidMount() {
        this.props.fetchStreams();
    };

    renderAdmin(stream) {
        const { currentUserId } = this.props;

        if (currentUserId === stream.userId)
            return (
                <div className="right floated content">
                    <Link className="ui button primary" to={`/streams/edit/${stream.id}`}>Edit</Link>
                    <button className="ui button negative">Delete</button>
                </div>
            )
    };

    renderList() {
        return this.props.streams.map(stream => {
            return (
                <div className="item" key={stream.id}>
                    {this.renderAdmin(stream)}
                    <i className="large middle aligned icon camera" />
                    <div className="content">
                        {stream.title}
                        <div className="description">
                            {stream.description}
                        </div>
                    </div>
                </div>
            );
        })
    };

    renderCreate() {
         const { isSignedIn } = this.props;

         if(isSignedIn) {
            return (
                <div style={{ textAlign: 'right'}}>
                    <Link className= "ui button primary" to="/streams/new">Create Stream</Link>
                </div>
            )
         }

    };

    render() {
        return (
            <div>
                <h2>Streams</h2>
                <div className="ui celled list">
                    {this.renderList()}
                </div>
                    {this.renderCreate()}
            </div>
        )
    }
}

const mapStateToProps = ({ streams, auth }) => {
    return {
        streams: Object.values(streams),
        currentUserId: auth.userId,
        isSignedIn: auth.isSignedIn
    };
};

export default connect(mapStateToProps, { fetchStreams })(StreamList);