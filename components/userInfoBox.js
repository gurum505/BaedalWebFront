/************************************************
 * Class : uer화면에서 user의 정보를 볼 수 있는 칸 컴포넌트
 * 
 * props :
 * - title: 박스 상단바 위에 글씨 넣기
 * - func 박스 안 스크롤바 안에 들어갈 내용
 * - text: 포인트를 표시할 수 있는 칸
 * 
 * function :
 * - putBox() : 전체 기본 컴포넌트 자체
 * 
 *  
 ************************************************/
import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

class userInfoBox extends Component {
    putBox() {
        var Box = 
             <View style={styles.infoBox}>
                    <View style={styles.top_container_style}>
                         {/*주문하는 가게 이름*/}
                         <Text style={styles.point_text}> {this.props.text} </Text>
                    </View>
                </View>
        return Box;
    }

    render(){
        return(
            <View style={styles.up_container}>
              {this.putBox()}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //위치창 style
    infoBox: {
        borderColor: '#F2F2F2',
        borderWidth: 1,
        width: wp('90%'),
        height: wp('55%'),
        marginTop: wp('30%'),
        backgroundColor: '#ffffff',
        shadowColor: "#000000",
        shadowOpacity: 0.1,
        shadowOffset: { width: 2, height: 4 },
        elevation: 2,
        borderRadius: 10
    },
    up_container: {
        top: hp('-3%'),
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('90%'),
        height: wp('30%'),
        marginBottom: 10,
        marginLeft: 20
    },
    //포인트 강조 text
    point_text: {
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        fontSize: 15,
        fontWeight: 'normal'
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
    //밑에 부가 설명 들어가는 칸
    top_container_style: {
        width: '100%',
        height: wp('10%'),
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        alignContent: 'center',
        justifyContent: 'center',
        backgroundColor: '#eeeeee',
    },
  });

export default userInfoBox;