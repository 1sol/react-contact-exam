import React from 'react';
import ContactInfo from './ContactInfo';
import ContactDetails from './ContactDetails';
import update from 'react-addons-update';   // Immutability Helper
import ContactCreate from './ContactCreate';

export default class Contact extends React.Component {
    
    constructor(props) {
        super(props);
        this.state = {
            selectedKey: -1,
            keyword: '',
            contactData: [{
                name: 'Abet',
                phone: '010-0000-0001'
            }, {
                name: 'Betty',
                phone: '010-0000-0002'
            }, {
                name: 'Charlie',
                phone: '010-0000-0003'
            }, {
                name: 'David',
                phone: '010-0000-0004'
            }]
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleClick = this.handleClick.bind(this);
        
        this.handleCreate = this.handleCreate.bind(this);
        this.handleRemove = this.handleRemove.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        
    }

    handleChange(e) {
        this.setState({
            keyword: e.target.value
        });
    }

    handleClick(key) {
        this.setState({
            selectedKey: key
        });

        console.log(key, 'is selected');
    }

    handleCreate(contact) {
        this.setState({
            // item 하나 추가할때도 [] 베열 형식으로
            contactData: update(this.state.contactData, { $push: [contact] })
        });
    }

    handleRemove() {
        // selectedKey가 아무것도 선택하지 않았을 때
        if(this.state.selectedKey < 0) {
            return;
        }
        this.setState({
            contactData: update(this.state.contactData,
                { $splice: [[this.state.selectedKey, 1]] }  // 선택된 애부터 1개의 데이터 삭제
            ),
            selectedKey: -1 // 무효화한다
        });
    }

    handleEdit(name, phone) {
        this.setState({
            contactData: update(this.state.contactData,
                {
                    [this.state.selectedKey]: {
                        name: { $set: name },
                        phone: { $set: phone }
                    }
                }
            )
        });
    }
    
    render() {
        const mapToComponents = (data) => {
            data.sort();
            data = data.filter(
                (contact) => {
                    return contact.name.toLowerCase().indexOf(this.state.keyword) > -1;
                }
            );
            return data.map((contact, i) => {
                return (<ContactInfo 
                        contact={contact} 
                        key={i}
                        /* 이벤트는 컴포넌트에 적용되지 않는다.
                            props로 전달되기 때문.
                            => arrow function으로 실행시켜줘야 한다
                        */
                        onClick={() => this.handleClick(i)}/>);
            });
        };
        
        return (
            <div>
                <h1>Contacts</h1>
                <input
                    name="keyword"
                    placeholder="Search"
                    value={this.state.keyword}
                    onChange={this.handleChange}
                />
                <div>{mapToComponents(this.state.contactData)}</div>
                {/* selectedKey가 -1이 아니면 참 전달. 기본값은 not selected
                    contactData를 selectedKey번째 아이템으로 props에 전달
                */}
                <ContactDetails 
                    isSelected={this.state.selectedKey != -1}
                    contact={this.state.contactData[this.state.selectedKey]}
                    onRemove={this.handleRemove}
                    onEdit={this.handleEdit}    
                />
                <ContactCreate
                    onCreate={this.handleCreate}
                />
            </div>
        );
    }
}