import React from 'react';

export default class ContactDetails extends React.Component {
    render() {
        const details = (
            <div>
                <p>{this.props.contact.name}</p>
                <p>{this.props.contact.phone}</p>
            </div>
        );
        const blank = (<div>Not Selected</div>);

        return(
            <div>
                <h2>Details</h2>
                {/* 선택했을 때 details, 선택된게 없으면 blank 출력 */}
                {this.props.isSelected ? details : blank}
            </div>
        );
    }
}

// contact의 기본값 설정
ContactDetails.defaultProps = {
    contact: {
        name: '',
        phone: ''
    }
};