/************************************************
 * Class : 
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/


import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import PostItBlock from '../components/postItBlock';
import CouponBox from '../components/userCouponBox';
import UserInfoBox from '../components/userInfoBox';
import { AntDesign } from '@expo/vector-icons';
import SelectBtn from '../components/userSelectBtn'
import { Ionicons } from '@expo/vector-icons';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';
const ICON_COLOR = '#40E0D0';
import { PieChart } from 'react-minimal-pie-chart';

const data =[
      { title: '탄수화물', value: 80, color: '#40E0D0' },
      { title: '단백질', value: 10, color: '#7AD3FA' },
      { title: '지방', value: 10, color: '#8BAAF0' },
];
//`${Math.round(dataEntry.percentage)} %`

const Page=Animated.createAnimatedComponent(View)
class User extends Component {
    constructor(props){
        super(props);
        this.state = {
            //DB 적용시 수정 필요 (아래는 사용자 정보)
            db_user: this.props.db_user, //DB 사용자
            db_user_orders: 2, //this.props.db_user_orders, //사용자 주문 횟수
            db_user_grade: "Sliver",//this.props.db_user_grade, //사용자 등급
            coupon : [ //보유 쿠폰 목록
                "배달비 무료 쿠폰",
                "분식 메뉴 주문 시 3,000원 할인 쿠폰",
                "같이 먹어요, 배달비 무료 쿠폰",
                "기간 한정 피자 할인 쿠폰",
            ],
            point: 2000,
            db_order:[]
        }
    }

    //쿠폰 리스트 구성
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

    //버튼 리스트 구성
    btnList() {
        var btns = 
            <View>
                <SelectBtn text={"알림 ON/OFF"} iconName={"bells"}></SelectBtn>
                <SelectBtn text={"즐겨찾기 관리"} iconName={"star"}></SelectBtn>
                <SelectBtn text={"친구 관리"} iconName={"meh"}></SelectBtn>
            </View>
        ;

        return btns;
    }

    //유저 정보 내용
    userInfo() {
        var detail =

                <View style={styles.header_container}>
                    <View style={styles.textline}>
                        <Text style={{fontSize: hp('2%'), fontWeight: "bold",}}>떡볶이 좋아<Text style={styles.basicFont}>님</Text>  개인정보</Text>
                        <Text style={styles.OrderFont}>이번달 주문 횟수 <Text style={styles.point_color}>{this.state.db_user_orders}  </Text>
                        사용 가능한 쿠폰 <Text style={styles.point_color}> {this.state.coupon.length} </Text>
                        </Text>
                        <Text style={styles.basicFont}>가장 많이 주문한 메뉴: <Text style={styles.titleFont}> 떡볶이 </Text></Text>
                        <Text style={styles.basicFont}>주소: <Text style={styles.titleFont}> 경기도 성남시 분당구 서현동 맛집골목 11-7 301호 </Text></Text>
                        <Text style={styles.basicFont}>카드번호: <Text style={styles.titleFont}> 2526-1944-6367-1159 </Text></Text>
                        <TouchableOpacity
                        style={styles.cancelOrder_style}
                        >
                            <MaterialCommunityIcons name="account-circle" size={hp('2%')} color="#fff" />
                            <Text style={{color:'#fff', fontSize:hp('2%'), marginTop:-3}}> 정보 수정 </Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.piechart}>
                          <Text style={{fontSize: hp('2%')}}>나의<Text style={{fontWeight: 'bold'}}> 영양소 비율</Text></Text>
                          <PieChart
                          data={data}
                          label={({dataEntry})=>dataEntry.title}
                          labelStyle={{
                                            fill: "black",
                                            fontSize: hp('0.5%')
                                       }}
                          viewBoxSize={[100, 100]}
                          radius={30}
                          labelPosition={120}
                          lineWidth={40}
                          paddingAngle={5}
                          animate
                          />
                          <Text style={styles.basicFont}>탄수화물 비율: <Text style={styles.titleFont}> 82% </Text></Text>
                          <Text style={styles.basicFont}>단백질 비율: <Text style={styles.titleFont}> 9% </Text></Text>
                          <Text style={styles.basicFont}>지방 비율: <Text style={styles.titleFont}> 11% </Text></Text>
                          <SelectBtn text={"내가 먹은 음식들"} iconName={"meh"}></SelectBtn>
                    </View>
                </View>


        ;
        return detail;
    }

    render(){
        return(
        <Page style={this.props.style} pose={this.state.event}>

            {/*유저의 이름, 등급 표시해주는 창*/}
            {this.userInfo()}
            <View>
                 <TouchableOpacity style={styles.button_container}>
                 <MaterialCommunityIcons name="message-plus" size={hp('3%')} color="#fff" />
                 <Text style={styles.button_text}> 카드 등록</Text><Text style={styles.basicFont}>을 하시면 더 정확한 정보를 얻을 수 있어요</Text>
                 </TouchableOpacity>
            </View>
        </Page>
        );
    }
}

const styles = StyleSheet.create({
    //info창 글자 정렬
    totalstyle: {
        marginTop: -0,

    },
    //민트색 글씨
    point_color: {
        alignSelf: 'flex-end',
        marginTop: 12,
        marginRight: 15,
        marginBottom: 10,
        fontSize: wp('4%'),
        fontWeight: 'bold',
        color: "#40E0D0"
    },
    //이미지 들어갈 곳
    circle: {   
        width: wp('18%'),
        height: wp('18%'),
        borderColor: '#F2F2F2',
        backgroundColor: '#F2F2F2',
        borderRadius: 100,
        marginTop: 12,
        marginLeft: 50
    },
    piechart: {
            width: wp('40%'),
            height: wp('40%'),
            marginTop: 0,
            marginLeft: 0
        },
    headline: {
        width: wp('90%'),
        fontSize: hp('3%'),
        marginLeft: 20,
        marginBottom: -15,
        marginTop: 5
    },
    //전체 화면 style
    container: {
        alignContent: 'center',
    },
    cancelOrder_style: {
        position: 'absolute',
        marginTop: hp('30%'),
        width: wp('44'),
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    //버튼 컨테이너 style
    button_container: {
        backgroundColor: '#40E0D0',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: hp('1.5%'),
        borderRadius: 10,
        bottom: hp('-5%'),
        width: wp('100%'),
    },

    //해당 화면의 상위 컨테이너 부분 style
    header_container: {
        width: wp('100%'),
        alignContent: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        paddingTop: hp('5%'),
    },

    //전체 화면 스크롤 style
    main_scroll: {
        width: wp('100%'),
        borderColor: '#fff',
        borderTopWidth: hp('1.5%'),
    },
    //상위 text style
    header_text: {
        fontSize: hp('1.5%'),
    },
    //알림 컴포넌트가 위치할 컨테이너 style
    coupon_container: {
        width: wp('90%'),
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginBottom: 15,
    },
    //알림 컴포넌트 테두리 style
    coupon: {
        marginBottom: 5,
    },
    //주문 횟수, 사용가능 쿠폰 표시 글씨
    OrderFont: {
        width: wp("50%"),
        marginLeft: 50,
        fontWeight: "bold",
        fontSize: 16,
        marginLeft: 10,
        marginTop: 12
    },
    titleFont: {
        width: wp("50%"),
        marginLeft: 50,
        fontWeight: "bold",
        fontSize: 17,
        marginLeft: 10,
        marginTop: 5
    },
    basicFont: {
        fontWeight: "normal",
        fontSize: 16,
        marginLeft: 10,
        marginTop: 5
    },
    //userInfo 탭에 글씨 정렬
    textline: {
        width: wp('50%'),
        fontSize: hp('3%'),
        marginLeft: 30,
        marginBottom: -15,
        marginTop: 10
    },
    //버튼 내부 text style
    button_text: {
        color: '#fff',
        fontSize: hp('2.1%'),
    },
    icon : {
        alignContent: 'flex-end',
    }
  });

export default User;