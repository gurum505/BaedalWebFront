/************************************************
 * Class : 선택주문에 대한 상세 페이지
 * 
 * const :
 *  - TEST_IMG: 최상단 위치하는 가게 이미지(임시)
 *  - COLOR_SET: 기본 컬러 팔레트
 *  - Page: (pose) 최상위 컴포넌트 애니메이션 설정 정보
 * 
 * state :
 *  - data: 이전 mode로부터 받아온 주문 번호
 *  - member: 해당 주문의 참여한 유저 목록
 *  - total_price: 전체 주문 금액
 *  - user: 사용자 본인
 *  - order: 현재 주문 정보
 *  - store: 현재 가게 정보
 *  - event: 애니메이션을 위한 state
 *  **********여기서부터는 db************
 *  - db_user: 유저 정보들 모음
 *  - db_store: 가게 정보 모음
 *  - db_order: 전체 주문 모음
 * 
 * function :
 *  - computeTotalPrice: 전체 주문 금액 계산 후 state에 반영
 *  - computeMember: 주문에 참여한 유저 목록 state에 반영
 *  - computeGauge: 주문 금액에 따라 게이지 길이 조정하는 메소드
 *  - printOrderDetail: 상세 주문 정보 출력
 *  - printCloseButton: 주문 참여 시 주문 마감 버튼, 아닌 경우 참여 버튼 출력
 *  - printDeleteButton: 주문 참여한 경우 취소 버튼 출력
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import moment from 'moment'; 

import { AntDesign } from '@expo/vector-icons';
import TwoColorBlock from '../components/twoColorBlock';
const ICON_COLOR = '#40E0D0';

const TEST_IMG = '../images/test_store.png';
const COLOR_SET = ['#00CED1','#8BAAF0', '#7AD3FA', '#40e0d0'];
const Page=Animated.createAnimatedComponent(View)


const _db_store={
                category: 'undefined3',
                min_order: 9999999,
                name: '직영점',
                location: 'undefined4',
                menu_list:["세모떡볶이","세모라면"],
                menu_price:[3000,4000],
                store_num:1

}
const _db_store_2={
    name:"최강라면",
    category:["ramen"],//store
    menu_list:["지존라면","리얼라면"],
    menu_price:[5000,6000],
}

//store list
const _db_store_3={
    name:"어질라면",
    category:["ramen"],//store
    menu_list:["어쩔라면","고오급단무지"],
    menu_price:[7000,8000],
}
const _db_store_4={
    name:"분식조아",
    category:["ramen"],//store
    menu_list:["김치","공기밥","김치찌개"],
    menu_price:[500,1500,2500],
}



class DetailOrder extends Component {//db_store=>get menu list
    constructor(props){
        super(props);
        this.state = {
            data: this.props.data,
            db_user: [ 
                {   coupon_num: 0,
                    id: "testID",
                    name: "테스트계정",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  }
            ],
            db_store: [_db_store,_db_store_2,_db_store_3,_db_store_4],
            db_order: [],
            order_list: [],
            total_price: 0,
            member: [],
            user : this.props.db_user,
        }
    }


    _move_to_order_history() {
        var order_number = this.state.data.split(" ")[1];
        var senddata = this.state.db_order[order_number];

        return fetch(`${databaseURL}/order_list.json`, { // TODO : set table json name
            method: 'POST',
            body: JSON.stringify(senddata)
          }).then(res => {
            if(res.status != 200) {
              throw new Error(res.statusText); // throw exception
            }
            return res.json();
          });
    }

    printOrderDetail(){
            if(this.state.db_store.length == 0){
                return null;
            }
            var list=[];

            //show menu which user chose //if db.store.name==user.store.name
            var store_num=-1;

            for(let i=0; i<this.state.db_store.length; i++){
                if(this.state.db_store[i].name == this.props.data ){
                     store_num=i;
                }
            }
            var store_menu=[];
            var store_menu_price=[]
            store_menu=this.state.db_store[store_num].menu_list;
            store_menu_price=this.state.db_store[store_num].menu_price;
            var top_temp=[];

            for(let i=0; i<store_menu.length; i++){
                top_temp.push(
                    <View style={styles.top_order_history}>
                                    <Image
                                    style={styles.store_image}
                                    source={require('../images/test_image.jpg')}/>

                                        <TouchableOpacity style={styles.talk_container}>
                                        <Image source={require('../images/test_image2.jpg')} style={styles.profile_img}/>
                                        <View style={styles.talk_text_container}>
                                             <Text style={[{fontWeight: 'bold'}, styles.talk_text]} numberOfLines={1}>{store_menu[i]}</Text>
                                             <Text style={[styles.talk_text]} numberOfLines={1}>detail설명</Text>
                                        </View>
                                        <View>
                                        </View>
                                        <View>
                                             <Text style={styles.talk_date}>{store_menu_price[i]}원</Text>
                                             <Text>(총금액:개수*금액)원</Text>
                                        </View>
                                        </TouchableOpacity>

                    </View>
                )
            }//key={i+"_user"}
            list.push(<View  style={{width:wp('90%'), alignSelf:'center', marginBottom: wp('2%'), marginTop: hp('1%')}}>
                                            <TwoColorBlock
                                            top={top_temp}
                                            bottom={<View style={styles.detail_order_bottom_container}>
                                                      <Text style={styles.detail_order_menu_text}>주문 금액</Text>
                                                      <Text style={[styles.detail_order_menu_text, {fontWeight: 'bold'}]}>누르면 여기에 가격책정..예정</Text>
                                                    </View>}
                                            shadow={false}
                                            />
                                     </View>);

            //
            var user_menu=[]
            var total_price=0
            /*
            Object.keys(db_store).map(id => {//내가 선택한 메뉴, 가격총합
                if(db_store[id].store_num === this.state.db_user.id){//내가 선택한 가게의 메뉴를 볼수 있도록
                        user_menu.push(
                            <View key={id+"_user_menu"} style={styles.row_container}>
                            <Text style={styles.user_menu_text}>
                                {store_menu[id]}
                            </Text>
                        </View>);
                    }
                }
                total_price = total_price + order_detail[id].price * order_detail[id].amount;
            });*/


        return list;
    }
    //this.state.data.split(' ')[1]
    render(){
        return(
            <Page style={this.props.style} pose={this.state.event}>
                <ScrollView style={styles.scroll_container}>

                    <Image
                    source={require('../images/test_store.png')}
                    style={styles.image}/>
                    <View style={styles.main_container}>
                        <View>
                            <Text style={styles.store_name}>{this.props.data}
                            </Text>

                        </View>

                        <View style={styles.order_container}>

                            <Text style={styles.orderFont}>  NOW ORDER</Text>

                            {this.printOrderDetail()}
                        </View>

                    </View>

                {/* 화면 위치 고정 버튼 컴포넌트들 */}
                <TouchableOpacity style={styles.button_container}>
                     <Text style={styles.button_text}> 주문</Text>
                </TouchableOpacity>
                </ScrollView>

            </Page>
        );
    }


}

const styles = StyleSheet.create({
    existPrize_font: {
        color: ICON_COLOR,
        fontWeight: "bold",
    },
    //메인 컨테이너 style
    scroll_container: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('85%'),
        top: hp('-3%'),
        alignSelf: 'center',
        backgroundColor: '#fff',
      },
    //주문 컴포넌트 상위 블록 style
    top_order_history: {
        margin: hp('1%'),
        width: wp('90'),
        flexDirection: 'row',
    },
    talk_container: {
        borderColor: '#999',
        borderBottomWidth: 2,
        paddingVertical: wp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
    talk_text: {
        fontSize: wp('3.8%'),
    },
    talk_date: {
        textAlignVertical: 'center',
        width: wp('20%'),
        height: wp('12%'),
        fontSize: wp('3.8%'),

    },
    button_container: {
        backgroundColor: '#40E0D0',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: hp('0.7%'),
        borderRadius: 10,
        bottom: hp('3%'),
    },
      talk_text_container: {
        width: wp('54%'),
        height: wp('12%'),
        marginHorizontal: wp('2%'),
        alignContent: 'center',
        justifyContent: 'space-evenly',

      },
      profile_img: {
            width: wp('10%'),
            height: wp('10%'),
            borderRadius: 13,
      },

      //이미지 style
      image: {
        width: '100%',
        height: hp('15%'),
        resizeMode: 'cover',
        opacity: 1,
      },

      //내용 컨테이너 style
      main_container: {
        top: hp('-5%'),
        width: '100%',
        backgroundColor: '#fff',
        borderTopLeftRadius: wp('5%'),
        borderTopRightRadius: wp('5%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: wp('5%'),
        borderWidth: wp('0.2%'),
        borderBottomWidth: 0,
        borderColor: '#eeeeee',
        paddingBottom: hp('3%'),

      },


      //주문 대기 번호 및 시간 text style
      order_number: {
        fontSize: wp('3.5%'),
        marginTop: hp('-1%')
      },

      //가게명 text style
      store_name: {
        marginTop: hp('1%'),
        marginLeft: wp('1%'),
        fontWeight: 'bold',
        fontSize: wp('3%'),
      },

      //같이/혼자 먹어요 버튼 style
      eat_with_box: {
        marginTop: hp('0.8%'),
        position: 'absolute',
        alignSelf: 'flex-end',
        flexDirection: 'row',
        backgroundColor: COLOR_SET[0],
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('2%'),
        borderRadius: wp('2%'),
      },

      //같이/혼자 먹어요 버튼 style
      review_box: {
        borderWidth: wp("0.3%"),
        color: "black",
        marginTop: hp('0.8%'),
        alignSelf: 'flex-end',
        flexDirection: 'row',
        backgroundColor: "white",
        paddingHorizontal: wp('3%'),
        paddingVertical: wp('2%'),
        borderRadius: wp('2%'),
      },

      //버튼 text style
      button_text: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        textAlign: 'center',
        color: "#fff"
      },

      //버튼 text style 2 (review btn)
      button_text2: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        textAlign: 'center',
        color: "black",
        marginRight: wp("0.5%"),
        marginLeft: wp("0.5%")
      },

      //가게 정보 text style
      store_info: {
          fontSize: wp('4%'),
     
      },

      //주문 관련 text container style
      order_container:{
          marginVertical: hp('2.5%'),
          paddingTop: hp('2%'),
          borderTopWidth: 1,
          borderColor: '#ddd',
      },

      //모이는 주소가 나와있는 컴포넌트 style
      map_container: {
          flexDirection: 'row',
          marginBottom: hp('2%'),
      },

      //작은 지도 style
      mini_map: {
          backgroundColor: '#ddd',
          width: wp('40%'),
          height: wp('30%'),
          marginRight: wp('2%'),
          marginBottom: wp('2%'),
      },

      //주소 text style
      order_location: {
          fontSize: wp('4%'),
          marginBottom: wp('3%'),
      },

      //주문 내역 내용 중 각 헤더1 text
      order_header1: {
        fontWeight: 'bold',
        fontSize: wp('5.2%'),
        marginTop: wp('1%'),
      },

      //주문 내역 내용 중 각 헤더2 text
      order_header2: {
        fontWeight: 'bold',
        fontSize: wp('4%'),
        marginBottom: wp('1%'),
        color: "#585858",
        marginTop: wp('2%'),
        marginBottom: wp('2%'),
      },

      //참여하기 버튼 style
      join_button: {
          position: 'absolute',
          alignSelf: 'center',
          top: hp('72.5%'),
          width: wp('90%'),
          height: hp('7%'),
          backgroundColor: COLOR_SET[0],
          alignContent: 'center',
          justifyContent: 'center',
          borderRadius: wp('2.5%'),
      },


      //게이지바 style
    gaugeBar: {
        width: wp('90%'),
        height: hp('4.5%'),
        marginTop: hp('1%'),
        marginBottom: hp('1%'),
        borderColor: ICON_COLOR,
        borderWidth: hp('0.2%'),
        borderRadius: wp('3%'),
        alignContent: 'center',
        alignSelf: 'center',
    },

    //게이지 내부 글씨 style
    gauge_text: {
        height: hp('4.1%'),
        position: 'absolute',
        textAlign: 'center',
        alignSelf: 'center',
        textAlignVertical: 'center',
        fontSize: hp('2%'),
    },

    //게이지 style
    gauge: {
        height: hp('4.1%'),
        borderRadius: wp('2.4%'),
        backgroundColor: COLOR_SET[1],
    },
    
    //상세 주문 내역 컴포넌트 style
    detail_order_container:{
        width: wp('80%'),
        alignSelf: 'center',
        marginBottom: wp('1%'),
        paddingVertical: wp('2%'),
    },

    //상세 주문 내역 유저ID text style
    detail_order_text: {
        fontSize: wp('4%'),
        fontWeight: 'bold',
        paddingHorizontal: wp('2%'),
        textAlign: 'center',
    },

    //상세 주문 내역 메뉴 컴포넌트 style
    detail_order_menu: {
        width: '90%',
        //height: hp('10%'),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },

    //상세 주문 내역 메뉴 text style
    detail_order_menu_text: {

    },

    //상세 주문 내역 하단 style
    detail_order_bottom_container: {
        paddingVertical: wp('2%'),
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    //주문 목록 폰트
        orderFont: {
        fontWeight: "bold",
        fontSize: 18,
        marginLeft: 10,
        color: ICON_COLOR
    },
  });

export default DetailOrder;