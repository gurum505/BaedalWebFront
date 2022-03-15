/************************************************
 * Class : 포스트잇모양 박스 컴포넌트
 * 
 * const :
 *  COLOR_SET: 컴포넌트 좌측 border 색 종류
 * state :
 *  - color_type: COLOR_SET 내 color 색상 설정 (정수)
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const COLOR_SET = ['#00CED1','#8BAAF0', '#7AD3FA', '#40e0d0'];

class PostBlock extends Component {
    constructor(props){
        super(props);
        this.state = {
            color_type: this.props.color_type,
        }
    }
    static getDerivedStateFromProps(nextProps, nextState){
        if(typeof(nextProps.color_type) !== "number"){
            return {color_type: 0};
        }else{
            return {color_type: nextProps.color_type};
        }
    }

    render(){
        return(
            <View style={styles.shell}>
                <View style={[styles.container,
                    {borderColor: COLOR_SET[this.state.color_type%COLOR_SET.length]}]}>
                    <Text style={styles.text}>{this.props.text}</Text>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //실제 컴포넌트 style
    container: {
        width: '105%',
        height: '100%',
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        borderLeftWidth: 6,
        paddingLeft: 20,
    },

    //하단 그림자를 위한 껍질 컴포넌트 style
    shell: {
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        width: '95%',
        height: 50,
        borderBottomWidth: 1,
        borderColor: '#dddddd',
    },

    //컴포넌트 내 text style
    text: {
        fontSize: 16,
    },
  });

export default PostBlock;