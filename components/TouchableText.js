/************************************************
 * Class : 글자만 있는 버튼
 * 
 * props :
 *  - text : 버튼에 표기할 문자
 *  - event : 버튼 클릭 시 수행할 이벤트
 *  - style : 버튼의 스타일 ( 미입력 시 임시 스타일 적용 )
 *  - style_text : 버튼 문자 스타일 ( 미입력 시 임시 스타일 적용 )
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class TouchableText extends Component {
    constructor(props){
        super(props);
        this.state = {
            style: styles.container,
            style_text: styles.text,
        }
    }

    static getDerivedStateFromProps(nextProps, nextState){
        var temp = {
            style: styles.container,
            style_text: styles.text};

        if(nextProps.style!==undefined){
            temp.style = nextProps.style;
        }
        if(nextProps.style_text!==undefined){
            temp.style_text = nextProps.style_text;
        }
        return temp;
    }

    render(){
        return(
            <TouchableOpacity
            style={this.state.style}
            onPress={function(){
                if(this.props.event!==undefined){
                    this.props.event(this.props.text);
                }
            }.bind(this)}
            >
                <Text style={this.state.style_text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#999',
        borderRadius: 25,
        marginRight: 6,
        alignContent: 'center',
        justifyContent: 'center',
    },
    text: {
        marginHorizontal: 20,
        marginVertical: 2,
        color: '#fff',
        fontSize: 13,
        alignSelf: 'center',
        textAlign: 'center',
        textAlignVertical: 'center',
    }
  });

export default TouchableText;