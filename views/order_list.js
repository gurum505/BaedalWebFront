/************************************************
 * Class : 주문했던 목록 리스트 화면
 * 
 * state :
 *  - db_user: 유저 정보
 *  //여기부터 아래의 state는 이후 수정이 필요함!!
 *  - order_list: 임시 데이터
 * 
 * const :
 *  - MAX_MENU_NUM: 각 주문 내 표시할 최대 자신이 주문한 메뉴 개수
 *                  해당 숫자 이상의 메뉴를 주문한 경우 이후부터는 '그외 #개의 메뉴'로 대체
 * function :
 *  - orderHistory_top: 주문 컴포넌트의 상단 부분에 추가할 컴포넌트 반환
 *  - orderHistory_bottom: 주문 컴포넌트의 하단 부분에 추가할 컴포넌트 반환
 *  - showMyOrder: 주문 컴포넌트의 리스트를 반환
 *  
 ************************************************/

import React, { Component } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, Alert, Animated } from 'react-native';
import TwoColorBlock from '../components/twoColorBlock';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { AntDesign } from '@expo/vector-icons';
const databaseURL = "http://gcloud.parkmin-dev.kr:3000";
const MAX_MENU_NUM = 1;

const Page=Animated.createAnimatedComponent(View)

const _order_detail={//여러개
    user_id:"testID",
    price:[1000,2000],
    amount:[1,2],
    menu:["세모떡볶이","세모라면"],
}
const _order_list={
    //id:0,
    date:"2021-11-30-15-30",
    store_name:"test_store",
    order_detail:[_order_detail]
}
const _order_detail_2={//여러개
    user_id:"testID",
    price:[3000,4000],
    amount:[3,4],
    menu:["그대라면","세모라면"],
}
const _order_list_2={
    //id:0,
    date:"2021-11-30-15-30",
    store_name:"test_store",
    order_detail:[_order_detail_2]
}





class OrderList extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: 'closed',
            db_user: this.props.db_user,
            //아래는 추후 db연동을 위해 수정해야함!!!!

            order_list: [_order_list,_order_list_2],

        }
    }
    _update() {
        this.forceUpdate();
    }

    _get() {
        fetch(`${databaseURL}/order_list`).then(res => {
          if(res.status != 200) {
            throw new Error(res.statusText);
          }
          return res.json();
        }).then(order_list => this.setState({order_list: order_list}));
    }

    _delete(id) {
        var order_number = id;
        alert(`${databaseURL}/order_list/${order_number}`);
        return fetch(`${databaseURL}/order_list/${order_number}`, { // TODO : set table json name
          method: 'DELETE',
          credentials: 'include',
        }).then(res => {
          if(res.status != 200) {
            throw new Error(res.statusText); // throw exception
          }
          return res.json();
        });
      }

    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.order_list != this.state.order_list);
    }

    componentDidMount() {
        this._get();
        this.setState({event: 'open'});
    }

    orderHistory_top(_num){
        var date = this.state.order_list[_num].date.split('-');
        var order_detail = this.state.order_list[_num].order_detail;
        var user_menu = [];
        var user_menu_amount = 0;
        var temp_menu_list=[]
        var temp_menu_price=[]
        //order_detail 연산 겸 price 연산도 함께 진행
        var total_price = 0;
        var user_price = 0;


        //해당 순서 데이터의 order_detail을 받아와 컴포넌트 생성

        Object.keys(order_detail).map(id => {
            if(order_detail[id].user_id === this.state.db_user.id){//사용자가 주문한 주문내역조회
                for(let i=0;i<order_detail[id].menu.length;i++){
                    user_price = user_price + order_detail[id].price[i] * order_detail[id].amount[i];
                    user_menu_amount = user_menu_amount + 1;
                }
                if(user_menu.length < MAX_MENU_NUM){
                    user_menu.push(
                        <View key={id+"_user_menu"} style={styles.row_container}>
                        <Text style={styles.user_menu_text}>
                            {order_detail[id].menu[0]}
                        </Text>
                        <Text style={styles.user_menu_text}>
                             {order_detail[id].amount[0]}개
                        </Text>
                        <Text style={styles.user_menu_text}>
                             {user_price}원
                        </Text>
                    </View>);
                }
            }
            total_price = total_price + user_price;//order_detail[id].price * order_detail[id].amount
        });

        //MAX_MENU_NUM 이상의 메뉴가 있을 경우 추가로 출력
        if(user_menu_amount>MAX_MENU_NUM){
            user_menu.push(<Text key="more_user_menu" style={styles.user_menu_text}>그 외 {user_menu_amount-MAX_MENU_NUM}개의 메뉴</Text>);
        }

        //실질적인 top 블록에 추가할 컴포넌트
        var top = <View style={styles.top_order_history}>
            <Image
            style={styles.store_image}
            source={require('../images/test_image.jpg')}/>
            <View style={styles.top_text_container}>
                <Text style={styles.date_text}>
                    주문 일시  {Number(date[0])}년 {Number(date[1])}월 {Number(date[2])}일 {date[3]}:{date[4]}
                </Text>
                <View style={styles.user_menu}>{user_menu}</View>
            </View>
        </View>;
        return [top, user_price, total_price];
    }

    orderHistory_bottom(_num, user_price, total_price){
        return<View style={styles.bottom_order_history}>
                <Text style={styles.store_name}>
                    전체 결제 금액
                </Text>
                <View style={styles.price_container}>
                    <View style={styles.row_container}>
                        <Text style={styles.total_price_text}></Text>
                        <Text style={styles.total_price}>{total_price.toLocaleString()}원</Text>
                    </View>
                </View>
            </View>;
    }

    showMyOrder(){
        var list = [];
        var i = 0;
        Object.keys(this.state.order_list).map(id => {
            var top_data = this.orderHistory_top(id);
            let my_order = false;
            //window.alert(this.state.order_list[id].date)
            for(var k=0; k<[this.state.order_list[id].order_detail].length; k++){
                //alert(this.state.order_list[id].order_detail[k].user_id)
                if(this.state.order_list[id].order_detail[k].user_id === this.state.db_user.id){
                    my_order = true;
                    break;
                }
            }
            if(my_order){
                list.push(
                    <View
                    key={id + "_history"}>
                        <View
                        style={{position: 'absolute', height: hp('21%'), width: '100%', zIndex: -1}}>
                            <TwoColorBlock
                                topHeight={2}
                                bottomHeight={1}
                                type={0}
                                shadow={true}/>
                        </View>
                        <TouchableOpacity
                            style={styles.order_history_container}
                            onPress={function(){
                                this.props.sendData(2+" "+id);

                            }.bind(this)}
                            >
                                <TwoColorBlock
                                    topHeight={2}
                                    bottomHeight={1}
                                    type={0}
                                    top={top_data[0]}
                                    bottom={this.orderHistory_bottom(id, top_data[1], top_data[2])}
                                    shadow={false}/>
                        </TouchableOpacity>

                        {/*리뷰 버튼*/}
                        <TouchableOpacity
                        style={styles.cancelOrder_style2}
                        onPress={function(){

                            }.bind(this)}>
                            <AntDesign name="star" size={hp('2%')} color="black" />
                            <Text style={{color:'black', fontSize:hp('1.9%')}}> 영양소 확인 </Text>
                        </TouchableOpacity>

                        {/*취소 버튼*/}
                        <TouchableOpacity
                        style={styles.cancelOrder_style}
                        >
                            <MaterialCommunityIcons name="silverware-fork-knife" size={hp('2%')} color="#fff" />
                            <Text style={{color:'#fff', fontSize:hp('1.9%')}}> 주문 취소 </Text>
                        </TouchableOpacity>

                    </View>
                );
            }
        });
        return list;
    }

    render(){
        return(
            <Page style={this.props.style} >//pose={this.state.event}//props.style
                <ScrollView style={styles.main_scroll}>
                    {this.showMyOrder()}
                </ScrollView>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    //메인 스크롤 style
    main_scroll: {
        position: 'absolute',
        width: wp('100%'),
        height: hp('85%'),
        top: hp('-3%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('3%'),
        backgroundColor: '#fff',
    },

    //주문 컴포넌트 style
    order_history_container: {
        height: hp('21%'),
        marginBottom: hp('10%'),
    },

    //주문 컴포넌트 상위 블록 style
    top_order_history: {
        margin: hp('2%'),
        flexDirection: 'row',
    },

    //주문 컴포넌트 상단 블록의 우측 text 블록 style
    top_text_container: {
        width: wp('50%'),
    },

    //주문일시 text style
    date_text: {
        fontSize: hp('1.5%'),
        marginBottom: hp('1%'),
    },

    //메뉴 text style
    user_menu_text: {
        fontSize: hp('1.8%'),
    },

    //주문 컴포넌트 하위 블록 style
    bottom_order_history: {
        margin: hp('2%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },

    //주문별 가게 image style
    store_image: {
        width: wp('20%'),
        height: hp('10%'),
        borderRadius: 10,
        marginRight: wp('3%'),
    },

    //가로 나열 배치 및 각 content 간격 최대 style
    row_container: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },


    //가게명 text style
    store_name: {
        width: '65%',
        fontSize: hp('2%'),
        fontWeight: 'bold',
        alignSelf: 'center',
    },

    //결제 금액 블록 style
    price_container:{
        width: '35%',
        justifyContent: 'space-between',
    },

    //전체 결제 금액 text style
    total_price_text: {
        fontSize: hp('1.5%'),
        color: '#555',
    },

    //전체 결제 금액 style
    total_price: {
        fontSize: hp('2%'),
        fontWeight: 'bold',
        color: '#555',
    },

    //개인 결제 금액 text style
    user_price_text: {
        fontSize: hp('1.5%'),
        fontWeight: 'bold',
        color: '#555',
    },

    //개인 결제 금액 style
    user_price: {
        fontSize: hp('1.5%'),
        fontWeight: 'bold',
        color: '#40E0D0',
    },

    cancelOrder_style: {
        position: 'absolute',
        marginTop: hp('23%'),
        width: wp('44'),
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },

    cancelOrder_style2: {
        position: 'absolute',
        marginTop: hp('23%'),
        width: wp('44'),
        alignSelf: 'flex-end',
        backgroundColor: 'white',
        borderColor: "black",
        borderWidth: wp('0.3%'),
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },
  });

export default OrderList;