/************************************************
 * Class : 가게 사진이 포함된 버튼 컴포넌트
 * 
 * props :
 *  - height: 전체 컴포넌트 크기
 *  - topHeight: 상위 블록 부분 비율
 *  - bottomHeight: 하위 블록 부분 비율
 *  - top: 상위 블록에 넣어야하는 컴포넌트
 *  - bottom: 하위 블록에 넣어야하는 컴포넌트
 *  - type: 블록 컬러 설정
 *  - shadow: 그림자 여부 설정
 * 
 * 
 * state :
 *  - 
 * 
 * function :
 *  - topHeight: 상단 블록 높이 설정
 *  - bottomHeight: 하단 블록 높이 설정
 *  - topColor: 상단 블록 색상 설정
 *  - bottomColor: 하단 블록 색상 설정
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

const COLOR_1 = '#fff';
const COLOR_2 = '#eeeeee';

class TwoColorBlock extends Component {
    topHeight(){
        var temp = (this.props.topHeight/(this.props.topHeight+this.props.bottomHeight))*100;
        return temp+"%";
    }
    bottomHeight(){
        var temp =(this.props.bottomHeight/(this.props.topHeight+this.props.bottomHeight))*100;
        return temp+"%";
    }
    topColor(){
        if(this.props.type == 1){
            return COLOR_2;
        }
        return COLOR_1;
    }
    bottomColor(){
        if(this.props.type == 1){
            return COLOR_1;
        }
        return COLOR_2;
    }
    shadowStyle(){
        if(this.props.shadow){
            return styles.shadow;
        }
        return null;
    }
    render(){
        return(
            <View style={[styles.container,{height: this.props.height}, this.shadowStyle()]}>
                <View style={[styles.top_container,
                            {height: this.topHeight(),
                            backgroundColor: this.topColor()}]}>
                    {this.props.top}
                </View>
                <View style={[styles.bottom_container,
                            {height: this.bottomHeight(),
                            backgroundColor: this.bottomColor()}]}>
                    {this.props.bottom}
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        alignContent: 'space-around',
        borderColor: '#F2F2F2',
        borderWidth: 1,
        borderRadius: 18,
    },
    top_container: {
        width: '99.5%',
        borderTopLeftRadius: 15,
        borderTopRightRadius: 15,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    bottom_container: {
        width: '99.5%',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    shadow: {
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
    },
});

export default TwoColorBlock;