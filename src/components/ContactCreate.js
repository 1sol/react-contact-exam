import React from 'react';
import PropTypes from 'prop-types';

export default class ContactCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            phone: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
    }

    handleChange(e) {
        // 비어있는 객체를 만들면 여러개의 input처리 가능
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleClick() {
        const contact = {
            name: this.state.name,
            phone: this.state.phone
        };

        // onCreate를 props로 받아옴
        this.props.onCreate(contact);

        this.setState({
            name: '',
            phone: ''
        });
    }

    render() {
        return(
            <div>
                <h2>Create Contact</h2>
                <p>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name" 
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="phone" 
                        value={this.state.phone} 
                        onChange={this.handleChange}
                    />
                </p>
                <button onClick={this.handleClick}>Create</button>
            </div>
        );
    }
}

ContactCreate.propTypes = {
    onCreate: PropTypes.func    // propType이 함수형이다
};

ContactCreate.defaultProps = {
    onCreate: () => { console.error('onCreate not defined') }
}