/************************************************
 * Class : 기본 버튼 틀
 * 
 * state :
 * - check: 버튼이 눌렸는지 체크하는 여부
 * 
 * props :
 * - text: 버튼 안의 text 설정
 * 
 * function :
 * - whiteBtn() : 기본 버튼 만들어서 컴포넌트로 리턴 (하얀색, 눌리지 않았을 때)
 * - grayBtn() : 기본 버튼 만들어서 컴포넌트로 리턴 (회색, 눌렸을 때)
 * - _clickThis() : 버튼 클릭 시 회색-> 하얀색, 
 * 하얀색->회색으로 색 바뀌게 하기, state 변경
 * - checkBtn() : 버튼이 눌렸는지, 눌리지 않았는지에 따라 색 바꾸기
 *  
 ************************************************/
import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const GRAY = "#585858";
const WHITE = "#FFFFFF";

class basicBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            check: false,
        };
    }
    checkBtn() {
        if(this.props.pushBtn == false){
            return this.whiteBtn();
        } else {
            return this.grayBtn();
        }
    }
    //기본 버튼 컴포넌트
    whiteBtn() {
        var btn = 
            <TouchableOpacity style={styles.whiteBtn} onPress={this.props.clicks}>
                <Text style={styles.whiteFont}>{this.props.text}</Text>
            </TouchableOpacity>;
        return btn;
    }
    grayBtn() {
        var btn = 
            <TouchableOpacity style={styles.grayBtn} onPress={this.props.clicks}>
                <Text style={styles.grayFont}>{this.props.text}</Text>
            </TouchableOpacity>;
        return btn;
    }
    render(){
        return(
            <View>
              {this.checkBtn()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //버튼 기본 디자인
    whiteBtn: {
        borderColor: GRAY,
        backgroundColor: WHITE,
        borderWidth: 2,
        width: wp('40%'),
        height: wp('9%'),
        borderRadius: 25,
        alignSelf: 'flex-end',
        marginRight: 15,
        marginTop: 8,
    },
    //버튼 기본 폰트
    whiteFont: {
        fontWeight: 'bold',
        color: GRAY,
        alignSelf: "center",
        fontSize: 15,
        marginTop: hp('0.8%'),
    },
    //회색 버튼 디자인
    grayBtn: {
        borderColor: GRAY,
        backgroundColor: GRAY,
        borderWidth: 2,
        width: wp('40%'),
        height: wp('9%'),
        borderRadius: 25,
        alignSelf: 'flex-end',
        marginRight: 15,
        marginTop: 8,
    },
    //회색 버튼 폰트
    grayFont: {
        fontWeight: 'bold',
        color: WHITE,
        alignSelf: "center",
        fontSize: 15,
        marginTop: 5
    },
  });

export default basicBox;