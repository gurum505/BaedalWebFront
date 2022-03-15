/************************************************
 * Class : HOT 주문 컴포넌트
 * 
 * notice : 최소 인원 이상인 경우 현재 인원 수의 색상을 타 색상으로 설정함.
 *          해당 변화 색상을 바꾸고 싶은 경우 getDerivedStateFromProps()의
 *          if문 내 반환되는 색상 변경하면 됨.
 * 
 * props :
 *  - name : 가게명
 *  - location : 주문 배달 위치
 *  - limit : 최소 인원
 *  - current : 현재 인원
 *  - color : 버튼 색상(기본 색상)
 * 
 * function :
 *  - 
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


class TouchableOrder extends Component {
    constructor(props){
        super(props);
        this.state = {
            store : this.props.store,
            amount : this.props.amount,
            current_color : '#fff',
        }
    }

    render(){
        return(
            <TouchableOpacity
            style={[styles.container, {backgroundColor: this.props.color}]}
            onPress={function(){
                if(this.props.event!==undefined){
                    this.props.event();
                    this.props.sendData(this.state.store.name);
                }
            }.bind(this)}
            >
                <Text
                style={styles.name}
                numberOfLines={2}
                >{this.state.store.name}</Text>
                <View style={styles.location}>
                    <Ionicons name="md-pin" size={hp('2.2%')} color="#fff"/>
                    <Text style={styles.location_text}> {this.state.store.location}</Text>
                </View>
                <View style={styles.amount}>
        <Text style={styles.amount_text}>대표메뉴 <Text style={{color: this.state.current_color}}>{this.state.amount}</Text>{"\n"}배달비{"\n"}평점 </Text>
                </View>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    //컨테이너 style
    container: {
        borderRadius: 20,
        marginRight: wp('3%'),
        width: hp('19%'),
        height: hp('22%'),
    },

    //가게명 style
    name: {
        marginTop: hp('1.6%'),
        marginBottom: hp('2%'),
        width: "80%",
        height: hp('8%'),
        color: '#000',
        fontWeight: 'bold',
        fontSize: hp('3%'),
        marginHorizontal: wp('3%'),
    },

    //위치 컴포넌트 style
    location: {
        flexDirection: 'row',
        height: hp('3%'),
        marginLeft: wp('2.6%'),
    },

    //위치 문자열 style
    location_text: {
        color: '#fff',
        fontSize: hp('1.6%'),
    },

    //인원표시 컴포넌트 style (화살표 포함)
    amount: {
        flexDirection: 'row',
        marginLeft: 10,
        marginRight: 20,
        alignContent: 'flex-end',
        justifyContent: 'space-between',
    },

    //인원표시 문자열 style
    amount_text: {
        color: '#fff',
        fontSize: hp('1.8%'),
    },
  });

export default TouchableOrder;