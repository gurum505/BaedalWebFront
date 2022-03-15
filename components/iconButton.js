/************************************************
 * Class : 아이콘 버튼 컴포넌트
 * 
 * notice :
 *  - 각 아이콘들은 expo/vector-icons에서 임의로 가져옴.
 *    iconTag는 받고자하는 아이콘을 가져오는데, 새로운 아이콘으로 변경하고자하면
 *    코드 수정 필요함.
 * 
 * const :
 *  - NORMAL_BUTTON_COLOR: 선택되지 않은 버튼 색상
 *  - SELETED_BUTTON_COLOR: 선택된 버튼 색상
 *  - ICON_SIZE: 아이콘의 크기
 * 
 * state :
 *  - current_color: 현재 아이콘의 색상
 * 
 * props :
 *  - seleted_mode: 현재 모드
 *  - mode: 해당 컴포넌트의 모드
 *  - icon: expo/vector-icons의 컴포넌트 타입
 *  - icon_name: icon 이름
 *  - icon_text: icon 밑 표시될 글자
 *  - changeMode: 상위 컴포넌트가 수행할 메소드
 * 
 * function :
 *  - (static) getDerivedStateFromProps: 로드될때마다 현재 mode에 색상 변환
 *  - iconClick: 각 아이콘 클릭 시의 이벤트 처리(모드 변경)
 *  - iconTag: 선택한 아이콘에 따른 컴포넌트 반환
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity} from 'react-native';
import { MaterialCommunityIcons, Ionicons, FontAwesome, Fontisto } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const NORMAL_BUTTON_COLOR = '#444';
const SELETED_BUTTON_COLOR = '#fff';
const ICON_SIZE = hp('2.7%');

class IconButton extends Component {
    constructor(props){
        super(props);
        this.state = {
            current_color: NORMAL_BUTTON_COLOR
        }
    }
    static getDerivedStateFromProps(nextProps, nextState){
        if(nextProps.seleted_mode !== nextProps.mode){
            return { current_color: NORMAL_BUTTON_COLOR }
        }
        return { current_color: SELETED_BUTTON_COLOR }
    }
    iconClick(){
        if(this.props.mode!==this.props.seleted_mode){
            this.props.changeMode(this.props.mode);
        }
    }
    iconTag(){
        var component;
        if(this.props.icon==="MaterialCommunityIcons"){
            component =
                <MaterialCommunityIcons
                name={this.props.icon_name}
                 size={ICON_SIZE}
                 color={this.state.current_color}/>;
        }else if(this.props.icon==="Ionicons"){
            component =
                <Ionicons
                name={this.props.icon_name}
                size={ICON_SIZE}
                color={this.state.current_color}/>;
        }else if(this.props.icon==="FontAwesome"){
            component =
                <FontAwesome
                name={this.props.icon_name}
                size={ICON_SIZE}
                color={this.state.current_color}/>;
        }else if(this.props.icon==="Fontisto"){
            component =
                <Fontisto
                name={this.props.icon_name}
                size={ICON_SIZE}
                color={this.state.current_color}/>;
        }
        return component;
    }

    render(){
        return(
            <TouchableOpacity
            style={styles.icon_component}
            onPress={function(){
                this.iconClick();
            }.bind(this)}
            data-id={this.props.mode}>
                {this.iconTag()}
                <Text
                style={[styles.icon_text,
                {color: this.state.current_color}]}
                
                >{this.props.icon_text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    icon_component: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('7%'),
        width: wp('60%'),
    },
    icon_text: {
        marginTop: 3,
        fontSize: hp('1.2%'),
        fontWeight: "bold",
    }
});

export default IconButton;