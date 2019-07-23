import React from 'react'
import { connect } from 'react-redux';
import _ from 'lodash';

import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';
import history from '../../history';

class StreamEdit extends React.Component {

    componentDidMount() {
        const id = this.props.match.params.id;
        this.props.fetchStream(id);
    }

    onSubmit = formValues => {
        this.props.editStream(this.props.match.params.id, formValues);
        history.push("/");

    };
    render() {

        if (!this.props.stream) {
            return <div>Loading...</div>
        }

        return (
            <div>
                <h3>Edit a Stream</h3>
                <StreamForm initialValues={  _.pick(this.props.stream, 'title', 'description')} 
                onSubmit={this.onSubmit} />
            </div>
        );
    };
};

const mapStateToProps = ({ streams }, ownProps) => {
    const id = ownProps.match.params.id;
    // console.log(streams[id]);
    return { stream: streams[id] }
};

export default connect(mapStateToProps, { fetchStream, editStream })(StreamEdit);