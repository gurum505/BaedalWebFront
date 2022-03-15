/************************************************
 * Class : 홈 화면 
 * 
 * props :
 *  - db_user: 사용자의 id
 * 
 * const :
 *  - ICON_COLOR : 위치설정 칸 내 아이콘 색상
 *  - COLOR_SET : HOT 주문 색상 설정용.
 *                저장된 색상들이 순서대로 반복적으로 적용됨.
 *                (hotOrderList 참고)
 * state :
 *  - db_user: 사용자 정보
 *  - hot_menu: 현재 인기 메뉴 리스트
 *  - hot_store: 현재 인기 가게
 *  - db_order: 현재 주문 리스트
 *  - db_store: 가게 리스트
 * 
 * function :
 *  - (static) getDerivedStateFromProps : db를 통해 hot_menu와 hot_store 연산
 *  - hotMenuList : hot_menu를 통해 해당 목록의 버튼들을 리스트로 출력
 *  - hotOrderList : db_order와 db_store를 통해 해당 목록의 버튼들을 리스트로 출력
 *                   또한 주문 목록 정리
 *  - searchMenu(): 선택한 버튼에 대한 메뉴를 검색 기능을 통해 검색하고 해당 페이지로 이동
 *  - selectOrder(): 선택한 주문의 상세 페이지로 이동
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput,Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TouchableText from '../components/TouchableText';
import TouchableOrder from '../components/TouchableOrder';
import TouchableList from '../components/touchableList';
import LocationBar from '../components/locationBar';

import CouponBox from '../components/userCouponBox';
import PostItBlock from '../components/postItBlock';

const COLOR_SET = ['#00CED1','#8BAAF0', '#7AD3FA', '#40e0d0'];
const Page=Animated.createAnimatedComponent(View)

const _order_detail={
    menu:"최강떡볶이",
    price:2000,
    amount:2,
}
const _db_order={
    //id:0,
    current_order:"세모떡볶이",
    store_num:'0',
    order_detail:[_order_detail],
    store_image:'../images/test_image.jpg',
    limit_order:5,
    location:{"name":"떡볶이파는데"},
    alone:1
}
const _db_store={
    name:"직영점",
    category:["bunsik"],
    min_order:5000,//배달비
    star:5.0,
}

//#2
const _order_detail_2={
    menu:"최강떡볶이",
    price:2000,
    amount:2,
}
const _db_order_2={
    //id:0,
    current_order:"nemoramen",
    store_num:'0',
    order_detail:[_order_detail_2],
    store_image:'../images/test_image2.jpg',
    limit_order:5,
    location:{"name":"떡볶이파는데"},
    alone:1
}
const _db_store_2={
    name:"최강라면",
    category:["ramen"],//store
    min_order:2000,//배달비
    star:3.5,
}

//store list
const _db_store_3={
    name:"어질라면",
    category:["ramen"],//store
    min_order:3000,//배달비
    star:3.0,
}
const _db_store_4={
    name:"분식조아",
    category:["ramen"],//store
    min_order:0,//배달비
    star:4,
}


class Home extends Component {
    constructor(props){
        super(props);
        this.IsSearchMode = this.IsSearchMode.bind(this);
        this.selectSearch = this.selectSearch.bind(this);
        this.sort_store_list= this.sort_store_list.bind(this);
        this.state = {
            db_user: this.props.db_user,
            btn_flag: [false, false, false],
            search: '',
            hot_menu: [],
            hot_store:[],
            db_order: [_db_order],
            db_store: [_db_store,_db_store_2,_db_store_3,_db_store_4],//1line only?
            event: 'closed',
            coupon : [ //보유 쿠폰 목록
                            "영양소가 너무 치우쳤어요. 내 정보를 확인해주세요",
                            "운동을 꾸준히 하기위한 추천 앱. 지금이라면 무료!",
                            "런치타임 메뉴 배달비 무료 쿠폰이 지급되었습니다.",
                            "11월 한정 할인 쿠폰이 지급되었습니다.",
                            "묻고 따지지도 않고 3000원 할인 쿠폰이 지급되었습니다.",
                        ],
        }
        this.temp_show_list=[];
        this.temp_show_list_flag=false;
    }



    shouldComponentUpdate(nextProps, nextState) {
        return (nextState.db_store != this.state.db_store) || (nextState.db_order != this.state.db_order) || (nextState.search != this.state.search);
    }



    IsSearchMode(){//버튼을 만들고 함수연결
        var unpressed = {color: "#FFF", fontWeight: "bold"};
        var pressed = {color: "#585858", fontWeight: "bold"};
        var btn_txt = ["가격 싼 순 정렬", "별점 순 정렬", "배달비 싼 순"];
        var btn_list_1 = []; // 1열 : 가격 싼순,  별점 높은 순, 배달비 싼 순

            for(let i = 0; i < 3; i++) {
                if(this.state.btn_flag[i] == false) { // 안눌림
                    btn_list_1.push(
                        <TouchableOpacity key={i + "_sort_btn"} style={styles.sort_btn_unpressed}
                            onPress={function() { this.selectSearch(i) }.bind(this)}>
                            <Text style={unpressed}>{btn_txt[i]}</Text>
                        </TouchableOpacity>
                        );
                } else if(this.state.btn_flag[i] == true) { // 눌림
                    btn_list_1.push(
                        <TouchableOpacity key={i + "_sort_btn"}
                        style={styles.sort_btn_pressed}
                        onPress={function() { this.selectSearch(i) }.bind(this)}>
                            <Text style={pressed}>{btn_txt[i]}</Text>
                        </TouchableOpacity>
                        );
                }

            }
        return(
            <TouchableOpacity
                onPress={function() {
                }.bind(this)}>
                <View style={{flex:2}}>
                    <View style={{flex:1}}>
                        <View style={{flexDirection: 'row'}}>
                            {btn_list_1}
                        </View>
                    </View>
                </View>
            </TouchableOpacity>

        )
    }
    selectSearch(id) {
        var btn_on_off = this.state.btn_flag;

        if(btn_on_off[id] == false) {
            btn_on_off[id] = true;
            // 0과 1동시 x
            if(id == 0 && (btn_on_off[1] == true)) {
                btn_on_off[1] = false;
            } else if(id == 1 && (btn_on_off[0] == true)) {
                btn_on_off[0] = false;
            }

            // 1랑 2 동시 x
            if(id == 1 && (btn_on_off[2] == true)) {
                btn_on_off[2] = false;
            } else if(id == 2 && (btn_on_off[1] == true)) {
                btn_on_off[1] = false;
            }
            //0 1
            if(id == 0 && (btn_on_off[2] == true)) {
                btn_on_off[2] = false;
            } else if(id == 2 && (btn_on_off[0] == true)) {
                btn_on_off[0] = false;
            }


            this.setState({btn_flag : btn_on_off});

        } else if(btn_on_off[id] == true) {
            btn_on_off[id] = false;
            this.setState({btn_flag : btn_on_off});

        } else {
            alert('sort btn state error! call your admin');
        }
        this.temp_show_list_flag=true;
        this.temp_show_list=this.sort_store_list(btn_on_off);
        this.forceUpdate();
    }
    sort_store_list(btn_on_off){
        var btn_on_off = btn_on_off; //[f,f,f]
        var result=[]
        let index=0
        for(let i=0; i<3;i++){
            if(btn_on_off[i]){
                index=i;
                break;
            }
        }
        var temp_db_store=[]
        temp_db_store=this.state.db_store;//[{},{},{}]
        var sortable=[];
        for(let i=0;i<temp_db_store.length;i++){
            sortable.push(temp_db_store[i])
        }

        if(index ==0){//싼순 //미구현

        }
        else if(index ==1){//별점순
            sortable=sortable.sort(function(a,b){
                return b.star-a.star;
            });
        }
        else if(index ==2){//배달비 순
            sortable=sortable.sort(function(a,b){
                return a.min_order-b.min_order;
            });
        }
        else{
            //fff
            //sortable=this.state.db_store;
        }
        result=this.showStoreList(sortable);
        return result;
    }
    showStoreList(store_list){
        if(store_list.length == 0){
            return null;
        }
        var list = [];
        var i = 0;

        while(i<store_list.length){//this.state.db_store.length
            //store_num = this.state.hot_store[i].store_num;
            //alert(this.state.db_store[i].name)
            var temp_name=store_list[i].name
            list.push(<TouchableOrder
                store={store_list[i]}
                //amount={this.state.hot_store[i].amount}
                key={i+"_hot_store"}
                color={COLOR_SET[i%COLOR_SET.length]}
                event={function(){
                    this.props.changeMode("detail-order");//"now-order","detail-order"
                    this.props.sendData(temp_name);//
                    //alert(temp_name)
                }.bind(this)}
                sendData={this.props.sendData.bind(this)}
                />);
            i = i + 1;
        }
        return list;

    }


    TopList(){
        var result=[];

        if(!this.temp_show_list_flag){
            result=this.showStoreList(this.state.db_store);
        }else{
            result=this.temp_show_list;
        }
        return result;
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

    render(){

        return(

            
            <Page style={[this.props.style, styles.container]} pose={this.state.event}>

                <ScrollView style={styles.main_scroll}>
                    {/* 지금 HOT한 주문 부분 */}
                    <Text style={styles.headline}>
                        <Text>지금</Text>
                        <Text style={{fontWeight: "bold"}}> 주문가능한 </Text>
                        <Text>가게</Text>
                    </Text>
                    <Text style={{alignSelf: 'flex-end'}}>
                    {this.IsSearchMode()}
                    </Text>
                    <ScrollView 
                    style={styles.horizontal_scroll}
                    horizontal={true} 
                    showsHorizontalScrollIndicator={false}>
                        {this.TopList()}
                    </ScrollView>
                    {/*쿠폰과 포인트 표시 창*/}
                    <View style={styles.coupon_container}>
                          <CouponBox

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
    container:{
        alignItems: 'center',
    },

    //전체 화면 스크롤 style
    main_scroll: {
        width: wp('100%'),
        borderColor: '#fff',
        borderTopWidth: hp('1.5%'),
    },

    //headline style
    headline: {
        width: wp('90%'),
        fontSize: hp('3%'),
        marginTop: 25,
        marginLeft: 20,
        //marginBottom: 10,
        flexDirection:'row',
    },

    //가로 스크롤 style
    horizontal_scroll: {
        marginTop: 10,
        paddingHorizontal: wp('5%'),
    },

    //방 만들기 버튼 style
    makeOrder: {
        marginTop: hp('-4%'),
        marginRight: wp('5%'),
        alignSelf: 'flex-end',
        backgroundColor: '#40e0d0',
        borderRadius: 10,
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'space-between',
    },
    //검색창 style
    search: {
        width: wp('90%'),
        height: 40,
        alignSelf: 'center',
        marginTop: 10,
        marginBottom: 10,
        borderRadius: 10,
        borderColor: '#ccc',
        borderWidth: 2,
        paddingHorizontal: 10,
    },
    coupon_container: {
        width: wp('90%'),
        alignSelf: 'center',
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 50,
    },
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

  });

export default Home;