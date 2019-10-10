import React from 'react';
import PropTypes from 'prop-types';

export default class ContactDetails extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isEdit: false,
            name: '',
            phone: ''
        };

        this.handleToggle = this.handleToggle.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    handleToggle() {
        // isEdit이 false일 때 기존값이 보여지게 함
        if(!this.state.isEdit) {
            this.setState({
                name: this.props.contact.name,
                phone: this.props.contact.phone
            });
        } else {    // true로 전환될 때 handleEdit() 사용
            this.handleEdit();
        }

        this.setState({
            isEdit: !this.state.isEdit
        });
    }

    handleChange(e) {
        let nextState = {};
        nextState[e.target.name] = e.target.value;
        this.setState(nextState);
    }

    handleEdit() {
        this.props.onEdit(this.state.name, this.state.phone);
    }

    handleKeyPress(e) {
        if(e.charCode == 13) {
            this.handleToggle();
        }
    }

    render() {
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        
        // edit일 때 input이 보여지도록
        const edit = (
            <div>
                <p>
                    <input 
                        type="text" 
                        name="name" 
                        placeholder="name" 
                        value={this.state.name}
                        onChange={this.handleChange}
                    />
                </p>
                <p>
                    <input 
                        type="text" 
                        name="phone" 
                        placeholder="phone" 
                        value={this.state.phone} 
                        onChange={this.handleChange}
                        onKeyPress={this.handleKeyPress}
                    />
                </p>
            </div>
        );

        // toggle했을 때 view가 true면 edit, false면 details가 보여지게
        const view = this.state.isEdit ? edit : details;

        const blank = (<div>Not Selected</div>);

        return(
            <div>
                <h2>Details</h2>
                {/* 선택했을 때 details, 선택된게 없으면 blank 출력 */}
                {this.props.isSelected ? view : blank}
                <p>
                    <button onClick={this.handleToggle}>
                        {this.state.isEdit ? 'OK' : 'Edit'}</button>
                    <button onClick={this.props.onRemove}>Remove</button>
                </p>
            </div>
        );
    }
}

// contact의 기본값 설정
ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    },
    onRemove: () => { console.error('onRemove not defined'); },
    onEdit: () => { console.error('onEdit not defined'); }
};

ContactDetails.propTypes = {
    contact: PropTypes.object,
    onRemove: PropTypes.func,
    onEdit: PropTypes.func
};