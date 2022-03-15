/************************************************
 * Class : NOW 주문
 * 
 * state :
 *  - db_user: 유저 정보
 *  - db_order: 임시 데이터
 * 
 * const :
 *  - MAX_MENU_NUM: 각 주문 내 표시할 최대 자신이 주문한 메뉴 개수
 *                  해당 숫자 이상의 메뉴를 주문한 경우 이후부터는 '그외 #개의 메뉴'로 대체
 * function :
 *  - orderHistory_top: 주문 컴포넌트의 상단 부분에 추가할 컴포넌트 반환
 *  - orderHistory_bottom: 주문 컴포넌트의 하단 부분에 추가할 컴포넌트 반환
 *  - orderHistoryList: 주문 컴포넌트의 리스트를 반환
 *  - searchList : 설정한 조건에 맞도록 정렬을 하여 리스트를 보여주는 역할을 한다. 리스트 정보는 DB에서 불러와 처리한다.
 *  - selectSearch : 검색을 위해 조건을 체크할 경우 검색 조건을 저장하는 동작을 처리한다.
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, Image, TouchableOpacity, TextInput, Alert, Animated } from 'react-native';
import TwoColorBlock from '../components/twoColorBlock';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons, AntDesign, Entypo } from '@expo/vector-icons';
import LocationBar from '../components/locationBar';

const Page=Animated.createAnimatedComponent(View)
const SearchPage=Animated.createAnimatedComponent(View)
const MAX_MENU_NUM = 2;

/*
const Page = posed.View({
    open: {
        y: 0,
        opacity: 1,
        transition: {
          y: { 
              type: 'spring', 
              stiffness: 500, 
              damping: 100
            },
        }
    },
    closed: {
        y: hp('5%'), 
        opacity: 0
    },
});
const SearchPage = posed.View({
    closed: {
        y: 0,
        opacity: 1,
        transition: {
            y: { 
                type: 'spring', 
                stiffness: 1000, 
                damping: 100
              },
          }
    },
    opened: {
        y: hp('18%'),
        opacity: 1,
        transition: {
            y: { 
                type: 'spring', 
                stiffness: 1000, 
                damping: 100
              },
          }
    },
});*/

const _order_detail={
    menu:"최강떡볶이",
    price:2000,
    amount:2,
}
const _db_order={
    //id:0,
    current_order:"떡볶이",
    store_num:'0',
    order_detail:[_order_detail],
    store_image:'../images/test_image.jpg',
    limit_order:5,
    location:{"name":"떡볶이파는데"},
    alone:1
}
const _db_store={
    name:"직영점",
    category:["세모떡볶이","네모라면"],
}

class NowOrder extends Component {
    constructor(props){
        super(props);
        this.orderHistory_top = this.orderHistory_top.bind(this);
        //this.IsSearchMode = this.IsSearchMode.bind(this);
        //this.selectSearch = this.selectSearch.bind(this);
        this.state = {
            btn_flag: [false, false, false, false, false, false],
            event: 'closed',
            search: '',
            search_bar: 'closed',
            search_mode : 0,
            notice: 0,
            db_user: this.props.db_user,
            db_order: [_db_order],
            db_store: [_db_store]
        }
    }

    _get() {
        fetch(`${databaseURL}/db_store`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
            }).then(db_store => this.setState({db_store: db_store}));
        fetch(`${databaseURL}/db_order`).then(res => {
            if(res.status != 200) {
                throw new Error(res.statusText);
            }
            return res.json();
            }).then(db_order => this.setState({db_order: db_order}));
    }

    /**
     * @method "IsChange?"
     */
    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.db_order != this.state.db_order) || (nextState.db_store != this.state.db_store) || (nextState.search != this.state.search) || (nextState.search_mode != this.state.search_mode) || (nextState.btn_flag != this.state.btn_flag);
    }

    componentDidMount() {
        this.setState({event: 'open'});
        if(this.props.data !== ''){
            this.setState({
                search: this.props.data,
                search_mode: 1,
                search_bar: 'opened',
            });
        }
        this._get();

    }

    orderHistory_top(_num) {
        if(this.state.db_store.length == 0 || this.state.db_order.length == 0){
            return null;
        }
        var store_num = this.state.db_order[_num].store_num;
        const db_store_this = this.state.db_store[store_num];

        var order_detail = this.state.db_order[_num].order_detail;
        var store_image = this.state.db_order[_num].store_image;
        var user_menu = [];
        var user_menu_amount = 0;

        var store_category = db_store_this.category;
        var total_price = 0;
        var user_price = 0;
        var current = this.state.db_order[_num].current_order;
        var limit = this.state.db_order[_num].limit_order;
        var location = this.state.db_order[_num].location.name;
        //해당 순서 데이터의 order_detail을 받아와 컴포넌트 생성
        Object.keys(order_detail).map(id => {
            user_price = user_price + order_detail[id].price*order_detail[id].amount;
            user_menu_amount = user_menu_amount + 1;
            if(user_menu.length<MAX_MENU_NUM){
                user_menu.push(
                    <View key={id+"_user_menu"} style={styles.row_container}>
                    <Text style={styles.user_menu_text}>
                        {order_detail[id].menu}
                        {' * '+order_detail[id].amount}
                    </Text>
                    <Text style={styles.user_menu_text}>{(order_detail[id].price*order_detail[id].amount).toLocaleString()}원</Text>
                </View>);
            }

            total_price = total_price + order_detail[id].price*order_detail[id].amount;
        });

        //실질적인 top 블록에 추가할 컴포넌트
        var alone_txt = ""
        let cond_alone = this.state.db_order[_num].alone;
        if(cond_alone == 0) {
            alone_txt = "같이 먹어요!";
        } else if(cond_alone == 1) {
            alone_txt = "혼자 먹어요";
        } else {
            alone_txt = "error";
        }

        var top = <View style={styles.top_order_history}>
            <Image
            style={styles.store_image}
            source={require('../images/test_image.jpg')}/>
            <View style={styles.top_text_container}>
                <View style={{flexDirection: 'row', marginTop: 6}}>
                    <Text style={{fontWeight: 'bold'}}>{store_category}</Text>
                    <Text style={{color : "#848484"}}> {alone_txt}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Entypo name="location" size={hp('2%')} color="#40e0d0" /><Text style={{marginLeft : 5, marginTop : 1, color: "#848484"}}>{location}</Text>
                </View>
                <View style={{flexDirection: 'row', marginTop: 10}}>
                    <Text style={{color : "#848484"}}>모집인원</Text><Text style={{marginLeft:20, color:"#40e0d0", fontWeight: "bold"}}>{current}명</Text><Text style={{color: "#848484"}}> / {limit}명</Text>
                </View>

            </View>
        </View>;
        return [top, user_price, total_price];
    }

    orderHistory_bottom(_num, user_price, total_price){
        return<View style={styles.bottom_order_history}>
                <Text style={styles.store_name}>
                    {this.state.db_order[_num].store_name}
                </Text>
                <View style={styles.price_container}>
                    <View style={styles.row_container}>
                        <Text style={styles.total_price_text}>전체 결제 금액</Text>
                        <Text style={styles.total_price}>{total_price.toLocaleString()}</Text>
                    </View>
                    <View style={styles.row_container}>
                        <Text style={styles.user_price_text}>모인 결제 금액</Text>
                        <Text style={styles.user_price}>{user_price.toLocaleString()}</Text>
                    </View>
                </View>
            </View>;
    }

    /**
     * @method "order list loading"
     */
    orderHistoryList(){
        if(this.state.db_store.length == 0 || this.state.db_order.length == 0){
            return null;
        }
        var list = [];
        Object.keys(this.state.db_order).map(id => {
            var top_data = this.orderHistory_top(id);
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
                        >
                            <TwoColorBlock
                                topHeight={2}
                                bottomHeight={1}
                                type={0}
                                top={top_data[0]}
                                bottom={this.orderHistory_bottom(id, top_data[1], top_data[2])}
                                shadow={false}/>
                    </TouchableOpacity>
                </View>
            );
        });
        return list;
    }
    render(){
        return(
            <Page style={[this.props.style, styles.container]} pose={this.state.event}>
                    <View style={{ marginTop:'22%', marginBottom: '2%',
                     flexDirection: 'row', width: '90%', alignSelf: 'center'}}>
                        <AntDesign
                            name="checksquare"
                            size={20}
                            color="#40e0d0" />
                        <Text style={{fontSize:hp('2%'), fontWeight: 'bold', marginLeft: '2%'}}>NOW 주문</Text>
                    </View>

                {this.orderHistoryList()}

                <LocationBar db_user={this.state.db_user}/>
            </Page>

        );
    }

}



const styles = StyleSheet.create({
    //최상위 컨테이너 style
    container: {
        alignItems: 'center',
    },
    //내용물 중 목록이 들어갈 컨테이너 style
    main_container: {
        width: wp('100%'),
        height: '100%',
    },

    //메인 스크롤 style
    main_scroll: {
        width: '90%',
        alignSelf: 'center',
        alignContent: 'center',
    },

    //주문 컴포넌트 style
    order_history_container: {
        height: hp('21%'),
        marginBottom: hp('1.5%'),
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
        justifyContent: 'space-between'
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
        fontSize: hp('1.5%'),
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
    // 방만들기
    makeOrder: {
        position: 'absolute',
        marginTop: hp('75%'),
        width: wp('90%'),
        alignSelf: 'center',
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },

    // 닫힌 검색바
    search_bar: {
        position: 'absolute',
        width: wp('90%'),
        height: hp('5%'),
        marginTop: '9%',
        alignSelf: 'center',
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        opacity: 0.9
    },

    // 열린 검색바
    search_bar_open: {
        position: 'absolute',
        width: wp('90%'),
        height: hp('23%'),
        marginTop: '9%',
        alignSelf: 'center',
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },

    // 정렬 버튼
    sort_btn_unpressed: {
        backgroundColor:'#999',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 17,
        paddingVertical: 5,
        marginRight: 7,
        marginBottom: 6,
        marginTop: 6
    },

    sort_btn_pressed: {
        backgroundColor:'#FFF',
        borderRadius: 10,
        alignItems: 'center',
        paddingHorizontal: 17,
        paddingVertical: 5,
        marginRight: 7,
        marginBottom: 6,
        marginTop: 6
    },

    //검색창 style
    search: {
        width: wp('80%'),
        height: 35,
        backgroundColor: "#FFF",
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2,
        paddingHorizontal: 10,
        marginTop: 5
    },

  });

export default NowOrder;