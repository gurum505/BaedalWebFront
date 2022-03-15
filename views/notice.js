/************************************************
 * Class : 알림창
 * 
 * state :
 *  - db_user: 유저 정보
 * //여기부터 state는 db 변경 이후 수정이 필요!!!
 *  - notice: 알람 목록
 * 
 * function :
 *  - noticeList: notice 목록에 있는 알람을 각각 하나의 컴포넌트로 출력
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView ,Animated} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PostItBlock from '../components/postItBlock';
import { MaterialIcons } from '@expo/vector-icons';
import CouponBox from '../components/userCouponBox';

const Page=Animated.createAnimatedComponent(View)
class Notice extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: 'closed',
            db_user: this.props.db_user,
            //이 아래부터의 state는 db 변경 이후 수정해야함!!!!
            notice : [
                "리뷰를 남겨보세요! 최강분식은 어땠나요?",
                "음식이 곧 도착합니다. 맛있게 드세요!",
                "주문하신 '세모떡볶이' 배달이 시작되었습니다.",
                "음식점이 주문을 수락했어요. '세모떡볶이'가 28분 내외로 도착할 예정입니다.",
                "내 정보 알림! 승급하셨습니다",
            ],
            coupon : [ //보유 쿠폰 목록
                            "런치타임 메뉴 배달비 무료 쿠폰",
                            "11월 한정 할인 쿠폰",
                            "3000원 할인 쿠폰",
                        ],
        }
    }
    componentDidMount() {
        this.setState({event: 'open'});
    }

    noticeList(){
        var list = [];
        for(let i=0; i<this.state.notice.length; i++){
            list.push(<TouchableOpacity
            key={i+"_notice"}
            style={styles.notice}>
                <PostItBlock color_type={i} text={this.state.notice[i]}/>
            </TouchableOpacity>);
        }
        return list;
    }

    //sendPush(): 푸시 알림을 보내는 메소드
    sendPush() {

    }

    //receivePush(): 푸시 알림을 받는 메소드
    receivePush(){

    }
    couponList(){
        var list = [];
        for(let i=0; i<this.state.coupon.length; i++){
            list.push(<TouchableOpacity
            key={i+"_coupon"}
            style={styles.coupon}>
                <PostItBlock color_type={i} text={this.state.coupon[i]}/>
            </TouchableOpacity>);
        }
        return list;
    }
    render(){//props.style인지 styles인지
        return(
            <Page style={[this.props.style, styles.container]} pose={this.state.event}>
                <View style={styles.header_contanier}>
                    <MaterialIcons name="notifications-active" size={hp('3%')} color="black" />
                    <Text style={styles.header_text}> <Text style={{color: "#40E0D0",fontWeight: 'bold',}}> PUSH 알림</Text>을 설정하고 쿠폰 및 주문 정보를 받아보세요!</Text>
                </View>
                <ScrollView style={styles.main_scroll}>
                    <View style={styles.notice_container}>
                        {this.noticeList()}
                    </View>
                </ScrollView>
                <ScrollView style={styles.main_scroll}>
                     <View style={styles.coupon_container}>
                           <Text style={styles.point_color}>{"쿠폰박스"}</Text>
                           <CouponBox
                           title = "쿠폰박스"
                           func = {this.couponList()}
                           ></CouponBox>
                     </View>
                </ScrollView>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    //전체 화면 style
    container: {
        alignContent: 'center',
    },

    //해당 화면의 상위 컨테이너 부분 style
    header_contanier: {
        width: wp('100%'),
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: hp('2%'),
        paddingBottom: hp('2%'),
    },

    //전체 화면 스크롤 style
    main_scroll: {
        width: wp('100%')
    },
    //상위 text style
    header_text: {
        fontSize: hp('2.5%'),
    },
    //알림 컴포넌트가 위치할 컨테이너 style
    notice_container: {
        width: wp('90%'),
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
    },
    //알림 컴포넌트 테두리 style
    notice: {
        marginBottom: 5,
    },
    coupon_container: {
        width: wp('90%'),
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
    point_color: {
        alignSelf: 'center',
        marginTop: 12,
        marginRight: 15,
        marginBottom: 10,
        fontSize: wp('2%'),

        color: "#40E0D0"
    },
  });

export default Notice;