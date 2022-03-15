/************************************************
 * Class : 상단 우측 네비게이션 버튼 패널
 * 
 * const :
 *  - IMAGE: 네비게이션 백그라운드 이미지
 * 
 * state :
 *  - 
 * 
 * props :
 *  - mode: 상위 패널로부터 받아온 현재 모드
 * 
 * function :
 *  - headerText: 현재 모드에 따라 text 변환 기능
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Ionicons } from '@expo/vector-icons';

const IMAGE = "../images/navigation.png";

class Navigation extends Component {
    headerText(){
      switch(this.props.mode){
        case 'home':
          return <Text
                  style={styles.text}>
                    너는 밥을 제대로 먹고 있는가
                  </Text>;
        case 'talk-room':
          return <Text
                  style={styles.text}>
                    {this.props.detail}
                  </Text>;
        case 'order-list':
          return <Text
                  style={styles.text}>
                    근1달 주문 내역
                  </Text>;
        case 'now-order':
          return <Text
                  style={styles.text}>
                    Now Order
                  </Text>;
        case 'talk':
          return <Text
                  style={styles.text}>
                    커뮤니티
                  </Text>;
        case 'user':
          return <Text
                  style={styles.text}>
                    내 정보
                  </Text>;
        case 'make-room':
          return <Text
                  style={styles.text}>
                    방 만들기
                  </Text>;
        case 'notice':
          return <Text
                  style={styles.text}>
                    내 알림
                  </Text>;
        case 'check-order':
          return <Text
                  style={styles.text}>
                    주문 확인
                  </Text>;
        case 'detail-order':
          return <Text
                  style={styles.text}>
                    상세 주문
                  </Text>;
        case 'complete-order':
          return <Text
                  style={styles.text}>
                    주문 완료
                  </Text>;
        case 'choose-menu':
          return <Text
                  style={styles.text}>
                    메뉴 선택
                  </Text>;
        case 'write-review':
          return <Text
                  style={styles.text}>
                    리뷰쓰기
                  </Text>;
        case 'payment-model':
          return <Text
                  style={styles.text}>
                    결제하기
                  </Text>;
        case 'show-review':
          return <Text
                  style={styles.text}>
                    가게 리뷰
                  </Text>;
      }
      return <Text
      style={styles.text}>
        test-page
      </Text>;
    }

    render(){
        return(
            <LinearGradient
            colors={['#40E0D0', '#7AD3FA', '#8BAAF0']}
            start={{x: 0, y: 1}}
            end={{x: 1, y: 1}}
            style={styles.container}>
              <Image source={require("../images/navigation.png")} style={styles.background_image}/>
              {this.headerText()}
                <TouchableOpacity
                style={styles.header_button}
                onPress={function(){
                  this.props.changeMode('notice');
                  this.props.sendData("");
                }.bind(this)}>
                  <Ionicons name="md-notifications" size={23} color="#444"/>
                </TouchableOpacity>
            </LinearGradient>
        );
    }
}

const styles = StyleSheet.create({

    //헤더 컨테이너 style
    container: {
        width: wp('100%'),
        height: hp('12%'),
        alignItems: 'center',
        justifyContent: 'flex-start',
    },

    //백그라운드 이미지 style
    background_image: {
      position: 'absolute',
      top: 0,
      left: 0,
      flex: 1,
      width: '100%',
      height: hp('12%'),
      opacity: 0.3,
      resizeMode: 'repeat',
    },

    //상단 모드 text style
    text: {
        fontWeight: 'bold',
        fontSize: hp('2.5%'),
        marginTop: hp('4%'),
        color: '#fff',
    },

    //네비게이션 버튼 style
    header_button: {
        position: 'absolute',
        top: hp('4%'),
        left: 20,
    },
  });

export default Navigation;