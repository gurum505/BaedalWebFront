/************************************************
 * Class : user 페이지에서 개인 설정을 할 수 있는 컴포넌트
 * 
 * props:
 * - text: 버튼 안에 들어갈 text 내용'
 * - iconName: 버튼 안에 들어갈 아이콘 정의 이름 
 * (단, AntDesign에 있는 것만 가능)
 * 
 * function :
 *  - completeOrder(): 버튼을 눌렀을 때 동작 구현
 *  - putBtn() : 버튼 컴포넌트 자체
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';


class userSelectBtn extends Component {
    //주문 완료시 
    completeOrder = () => {
        alert("Page transition!")
        //임시 화면 처리
    }
    //버튼 컴포넌트 리턴
    putBtn() {
        var btn =
        <TouchableOpacity style={styles.completeBtn} >
            <AntDesign
                name={this.props.iconName}
                size={18}
                color="#848484"
                style={styles.icon}
            />
            <Text style={styles.completeFont}>{this.props.text}</Text>
            <table>
                <tr>
                    <td> 메뉴</td><td>탄수화물(%)</td><td>단백질(%)</td>지방(%)<td>나트륨(mg)</td><td>kcal</td>
                </tr>
                    <td> 떡볶이</td><td>87</td><td>8.0</td><td>5.0</td><td>383.4</td><td>185.6</td>
                <tr>
                    <td> 라면</td><td>72</td><td>9.5</td>18.5<td>385</td><td>986</td>
                </tr>
                    <td> </td><td></td><td></td><td></td><td></td><td>출처: https:www.fatsecret.kr</td>
            </table>
        </TouchableOpacity>;
        return btn;
    }
    render(){
        return(
            <View>
                {this.putBtn()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //주문 완료 버튼
    completeBtn: {
        borderColor: '#F2F2F2',
        borderWidth: 1,
        width: wp('90%'),
        height: wp('13%'),
        alignSelf: 'flex-end',
        marginTop: wp('5%'),
        marginBottom: -15,
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
        borderRadius: 10
    },
    //주문 완료 버튼
    completeFont: {
        alignSelf: 'flex-start',
        fontWeight: 'normal',
        color: '#000000',
        fontSize: 16,
        marginTop: -20,
        marginLeft: 20,
        marginBottom:10
    },
    container: {
        alignContent: 'center',
    },
    icon: {
        alignSelf: "flex-end",
        marginRight: 20,
        marginTop: 15
    },
  });

export default userSelectBtn;