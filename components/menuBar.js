/************************************************
 * Class : 하단 메뉴 버튼 구역 컴포넌트
 * 
 * notice :
 *  - 각 아이콘들은 expo/vector-icons에서 임의로 가져옴
 *    따라서 아이콘 변경이 아닌 이상 각 아이콘의 name 변경 불가
 * 
 * state :
 *  - seleted_mode: 현재 모드
 * 
 * props :
 *  - mode: 현재 모드
 *  - changeMode: changeMode에 대하여 모드 변화를 상위 컴포넌트에게 알림
 * 
 * function :
 *  - (static) getDerivedStateFromProps : 모드 변경 감지 후 반영
 *  - changeMode: 각 아이콘 클릭에 대한 이벤트
 *  
 ************************************************/
import React, { Component } from 'react';
import IconButton from './iconButton';
import { LinearGradient } from 'expo-linear-gradient';

class MenuBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            seleted_mode: this.props.mode
        }
    }
    static getDerivedStateFromProps(nextProps, nextState){
        if(nextState.seleted_mode !== nextProps.mode){
            return {seleted_mode: nextProps};
        }
        return null;
    }

    changeMode(_mode){
        if(_mode !== this.state.seleted_mode){
            this.setState({
                seleted_mode: _mode
            });
            this.props.changeMode(_mode);
            this.props.sendData("");
        }
    }

    render(){
        return(
            <LinearGradient
            colors={['#40E0D0', '#7AD3FA', '#8BAAF0']} 
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={this.props.style}>
                <IconButton
                seleted_mode={this.state.seleted_mode}
                mode="home"
                icon="MaterialCommunityIcons"
                icon_name="home"
                icon_text="홈"
                changeMode={this.changeMode.bind(this)}/>

                <IconButton
                seleted_mode={this.state.seleted_mode}
                mode="order-list"
                icon="Ionicons"
                icon_name="ios-list-box"
                icon_text="주문 내역"
                changeMode={this.changeMode.bind(this)}/>

                <IconButton
                seleted_mode={this.state.seleted_mode}
                mode="talk"
                icon="MaterialCommunityIcons"
                icon_name="message-processing"
                icon_text="커뮤니티"
                changeMode={this.changeMode.bind(this)}/>

                <IconButton
                seleted_mode={this.state.seleted_mode}
                mode="user"
                icon="FontAwesome"
                icon_name="user-circle-o"
                icon_text="내 정보"
                changeMode={this.changeMode.bind(this)}/>
            </LinearGradient>
        );
    }
}

export default MenuBar;