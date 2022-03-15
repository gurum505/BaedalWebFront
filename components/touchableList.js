/************************************************
 * Class : 클릭 가능한 세부 주문 목록 요소 컴포넌트
 * 
 * props :
 *  - order: 주문 정보
 *  - store: 가게 정보
 * 
 * function :
 *  -  computeGauge: 현재인원과 제한인원수를 통해 게이지 바 길이 조정 후 반환
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import TouchableText from './TouchableText';

class TouchableList extends Component {
    constructor(props){
        super(props);
        this.state = {
            order: this.props.order,
            store: this.props.store,
        }
    }
    computeGauge(){
        var i = this.state.order.current_order/this.state.order.limit_order;
        i = i * 100;
        if(i>= 100){
            i = 100;
        }
        return i+"%";
    }

    render(){
        return(
            <TouchableOpacity
            style={styles.container}
            onPress={function(){
                if(this.props.event!==undefined){
                    this.props.event(this.state.order, this.props.store);
                }
            }.bind(this)}
            >
                <TouchableText
                text={this.state.store.category}
                style={styles.category_container}
                style_text={styles.category_text}
                event={function(_text){
                    this.props.sendData(_text);
                    this.props.changeMode('now-order');
                }.bind(this)}
                sendData={this.props.sendData}
                changeMode={this.props.changeMode}/>
                <Text style={styles.text}>{this.state.store.name}</Text>

                <View style={styles.gaugeBar}>
                    <View style={[styles.gauge, {width: this.computeGauge()}]}/>
                </View>
                <Text style={styles.number}>{this.state.order.current_order}/{this.state.order.limit_order}</Text>
            </TouchableOpacity>
        );
    }
}

const styles = StyleSheet.create({
    //전체 컨테이너 style
    container: {
        marginHorizontal: wp('5%'),
        marginVertical: hp('0.5'),
        paddingHorizontal: wp('1%'),
        paddingVertical: hp('1.5%'),
        borderBottomWidth: hp('0.3%'),
        borderColor: '#ddd',
        flexDirection: 'row',
    },

    //카테고리 상자 style
    category_container: {
        backgroundColor: '#999',
        borderRadius: 25,
        alignContent: 'center',
        justifyContent: 'center',
        height: wp('4.5%'),
        width: wp('15%'),
        alignSelf: 'center',
    },

    //카테고리 문자 style
    category_text: {
        fontSize: hp('1.2%'),
        color: '#fff',
        textAlign: 'center',
        textAlignVertical: 'center',
        
    },

    //가게명 style
    text: {
        width: wp('40%'),
        marginLeft: wp('2%'),
        fontSize: hp('2%'),
        textAlignVertical: 'center',
    },

    //인원 수 style
    number: {
        width: wp('10%'),
        marginLeft: wp('2%'),
        fontSize: hp('2%'),
        textAlignVertical: 'center',
    },

    //게이지바 style
    gaugeBar: {
        width: wp('20%'),
        height: hp('2.5%'),
        borderColor: '#aaa',
        borderWidth: hp('0.2%'),
        borderRadius: 25,
        alignContent: 'center',
        alignSelf: 'center',
    },

    //게이지 style
    gauge: {
        height: hp('2.1%'),
        borderRadius: 25,
        backgroundColor: '#00CED1',
    },
  });

export default TouchableList;