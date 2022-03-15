/************************************************
 * Class : 쿠폰 목록을 표시하는 user 화면의 칸
 * 
 * props :
 * - title: 박스 상단바 위에 글씨 넣기
 * - func 박스 안 스크롤바 안에 들어갈 내용
 * - point: 포인트를 표시할 수 있는 칸
 * 
 * function :
 * - putBox() : 전체 기본 컴포넌트 자체
 * 
 *  
 ************************************************/
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class userCouponBox extends Component {
    putBox() {
        var Box = 
             <View style={styles.orderlist}>
                    <ScrollView style={styles.scrollView}>
                        {/*주문할 메뉴 함수로 return 받기*/}
                        {this.props.func}
                    </ScrollView>

                </View>
        return Box;
    }

    render(){
        return(
            <View>
              {this.putBox()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //포인트 강조 text
    point_text: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 15,
        marginBottom: 10,
        fontSize: wp('3%'),
        fontWeight: 'bold'
    },
    point_color: {
        alignSelf: 'flex-end',
        marginTop: 10,
        marginRight: 15,
        marginBottom: 10,
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: "#40E0D0"
    },
    //스크롤 뷰
    scrollView: {
        marginHorizontal: 7,
    },
    //총 포인트 나타내는 칸
    top_container_style: {
        width: '100%',
        height: wp('10%'),
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
    },
    orderlist: {
        borderColor: '#F2F2F2',
        borderWidth: 1,
        width: wp('90%'),
        height: wp('20%'),
        marginTop: wp('0.5%'),
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
        borderRadius: 10
    },

  });

export default userCouponBox;