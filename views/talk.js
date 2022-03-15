/************************************************
 * Class : 채팅 화면
 * 
 * state :
 *  - db_user: 유저 정보
 * //여기 아래부터는 db 변동에 따라 수정이 필요함
 *  - test_users: 전체 유저 정보
 *  - talk: 유저의 채팅 목록
 *      - user: 채팅한 유저의 유저 num
 *      - detail: 채팅 내역
 *          - text: 채팅 내용
 *          - user: 해당 채팅을 말한 유저 num
 *          - date: 보낸 시간 
 * 
 * function :
 *  - chattingList: 채팅방 출력 메소드
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import moment from 'moment';//npm install moment필요해요
import 'moment/locale/ko';


const Page=Animated.createAnimatedComponent(View)

class Talk extends Component {
    constructor(props){
        super(props);
        this.state = {
            event: 'closed',
            db_user: this.props.db_user,
            //이 아래부터는 db적용을 위해 수정이 필요한 state임!!
            test_users: [
                {   coupon_num: 0,
                    id: "testID",
                    name: "테스트계정",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
                {   coupon_num: 0,
                    id: "testID2",
                    name: "username1",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
                {   coupon_num: 1,
                    id: "testID3",
                    name: "username2",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
                {   coupon_num: 2,
                    id: "testID4",
                    name: "username3",
                    order_num: 0,
                    location: "대전 유성구 궁동 99",
                  },
            ],
            talk: [
                {user: 1,
                    detail:[
                        {text: "안녕하세요", user:0, date:"2021-08-03 09:20:32" },
                        {text: "안녕하세요!", user:1, date:"2021-08-03 09:23:01" },
                        {text: "경희대 근처 원룸 싸게 구하는법!", user:1, date:"2021-10-03 13:51:28" },
                    ]
                },
                {user: 3,
                    detail:[
                        {text: "안녕!!", user:0, date:"2021-08-03 09:20:32" },
                        {text: "안뇽", user:3, date:"2021-0ㄱ8-03 09:23:01" },
                        {text: "옆방 넘 시끄러움. 고소가능?", user:3, date:"2021-08-03 17:43:10" },
                    ]
                },
                {user: 2,
                    detail:[
                        {text: "안녕!!", user:0, date:"2020-08-03 10:20:32" },
                        {text: "안뇽", user:3, date:"2020-08-03 10:23:01" },
                        {text: "음식 좀 남았는데, 가져갈실 분 있나요?", user:0, date:"2020-08-03 19:31:00" },
                    ]
                },
            ],

            recipe: [
                {user: 1,
                    detail:[
                        {text: "라면끓이는법1", user:0, date:"2020-08-03 09:20:32" },
                        {text: "라면끓이는법2", user:1, date:"2020-08-03 09:23:01" },
                        {text: "라면끓이는법 [이것이 진리]편", user:1, date:"2021-11-03 13:51:28" },
                    ]
                },
                {user: 3,
                    detail:[
                        {text: "라면끓이는법4", user:0, date:"2020-08-03 09:20:32" },
                        {text: "라면끓이는법5", user:3, date:"2020-08-03 09:23:01" },
                        {text: "계란 요리 끝장내기", user:3, date:"2021-05-03 17:43:10" },
                    ]
                },
                {user: 2,
                    detail:[
                        {text: "라면끓이는법7", user:0, date:"2020-08-03 10:20:32" },
                        {text: "라면끓이는법8", user:3, date:"2020-08-03 10:23:01" },
                        {text: "5분 빵요리", user:0, date:"2020-08-03 19:31:00" },
                    ]
                },
            ],

        }   
    }

    componentDidMount() {
        this.setState({event: 'open'});
    }

    chattingList(){
        var list = [];
        for(let i=0; i<this.state.talk.length; i++){
            let talk = this.state.talk[i];
            let user = this.state.test_users[talk.user];
            //var now = moment().format('YYYY-MM-DD HH:mm:ss');
            let time = moment(talk.detail[talk.detail.length-1].date, 'YYYY-MM-DD HH:mm:ss', true);
            list.push(<TouchableOpacity style={styles.talk_container} key={i+"_talk"} 
            onPress={function(){
                this.props.sendData(user.name+'');
              }.bind(this)}>
                    <Image source={require('../images/unnamed.jpg')} style={styles.profile_img}/>
                    <View style={styles.talk_text_container}>
                        <Text style={[{fontWeight: 'bold'}, styles.talk_text]} numberOfLines={1}>{user.name}</Text>
                        <Text style={styles.talk_text} numberOfLines={1}>{talk.detail[talk.detail.length-1].text}</Text>
                    </View>
                    <Text style={styles.talk_date}>{time.fromNow()}</Text>
                </TouchableOpacity>);
        }
        return list;
    }
    recipelist(){
        var list = [];
        for(let i=0; i<this.state.recipe.length; i++){
            let recipe = this.state.recipe[i];
            let user = this.state.test_users[recipe.user];
            //var now = moment().format('YYYY-MM-DD HH:mm:ss');
            let time = moment(recipe.detail[recipe.detail.length-1].date, 'YYYY-MM-DD HH:mm:ss', true);
            list.push(<TouchableOpacity style={styles.talk_container} key={i+"_recipe"}
            onPress={function(){
                this.props.sendData(user.name+'');
              }.bind(this)}>
                    <Image source={require('../images/test_image2.jpg')} style={styles.profile_img}/>
                    <View style={styles.talk_text_container}>
                        <Text style={[{fontWeight: 'bold'}, styles.talk_text]} numberOfLines={1}>{user.name}</Text>
                        <Text style={styles.talk_text} numberOfLines={1}>{recipe.detail[recipe.detail.length-1].text}</Text>
                    </View>
                    <Text style={styles.talk_date}>{time.fromNow()}</Text>
                </TouchableOpacity>);
        }
        return list;


    }
    //sendMessage(): 메세지를 연결된 상대방에게 전송한다.
    sendMessage(){
        
    }

    //inviteFriend(): 친구를 주문으로 초대한다.
    inviteFriend(){

    }   

    //acceptInvite(): 친구가 채팅을 통해 보낸 초대를 수락한다.
    acceptInvite(){

    }

    //rejectInvite(): 친구가 보낸 초대를 거절한다.
    rejectInvite(){

    }

    render(){
        return(
            <Page style={this.props.style} pose={this.state.event}>
                <View style={styles.main_container}>
                    <View style={styles.header_container}>
                        <MaterialCommunityIcons name="message-processing" size={hp('3%')} color='#40E0D0' />
                        <Text style={styles.header_text}><Text style={{fontWeight: 'bold'}}>레시피</Text>를 공유해보세요!</Text>
                    </View>
                    <ScrollView style={styles.talk_scroll}>
                        {this.recipelist()}
                    </ScrollView>

                </View>
                <View style={styles.main_container}>
                    <View style={styles.header_container}>
                        <MaterialCommunityIcons name="message-processing" size={hp('3%')} color='#40E0D0' />
                        <Text style={styles.header_text}><Text style={{fontWeight: 'bold'}}> 이야기</Text>를 공유해보세요!</Text>
                    </View>
                    <ScrollView style={styles.talk_scroll}>
                        {this.chattingList()}
                    </ScrollView>
                    <TouchableOpacity style={styles.button_container}>
                    <MaterialCommunityIcons name="message-plus" size={hp('3%')} color="#fff" />
                        <Text style={styles.button_text}> 글 작성</Text>
                    </TouchableOpacity>
                </View>
            </Page>
        );
    }
}

const styles = StyleSheet.create({
    //메인 컨테이너 style
    main_container: {
        width: wp('100%'),
        height: hp('40%'),
        top: hp('3%'),
        paddingHorizontal: wp('5%'),
        paddingVertical: hp('1%'),
        backgroundColor: '#fff',
      },

    //톡방 스크롤 style
    talk_scroll: {
        alignSelf: 'center',
        width: '100%',
        height: '40%',
        //paddingVertical: hp('3%'),
        backgroundColor: '#fff',
    },

    //헤더 컨테이너 style
    header_container: {
        flexDirection: 'row',
        height: '7%',
        
    },

    //헤더 부분 text style
    header_text: {
        fontSize: hp('2%'),
    },

    //채팅 컨테이너 style
    talk_container: {
        width: '100%',
        borderColor: '#999',
        borderBottomWidth: 2,
        paddingVertical: wp('3%'),
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
    },

    //채팅 프로필 image style
    profile_img: {
        width: wp('5%'),
        height: wp('5%'),
        borderRadius: 13,
    },
    
    //채팅 최근내용 및 상대방이름 컨테이너 style
    talk_text_container: {
        width: wp('54%'),
        height: wp('5%'),
        marginHorizontal: wp('1%'),
        alignContent: 'center',
        justifyContent: 'space-evenly',
    },

    //채팅 최근내용및 상대방이름 text style
    talk_text: {
        fontSize: wp('1.5%'),
    },

    //채팅 최근날짜 text style
    talk_date: {
        textAlignVertical: 'center',
        width: wp('20%'),
        height: wp('5%'),
        fontSize: wp('1.5%'),
    },

    //버튼 컨테이너 style
    button_container: {
        backgroundColor: '#40E0D0',
        flexDirection: 'row',
        alignContent: 'center',
        justifyContent: 'center',
        paddingVertical: hp('1.5%'),
        borderRadius: 10,
        bottom: hp('3%'),
    },
    
    //버튼 내부 text style
    button_text: {
        color: '#fff',
        fontSize: hp('2.1%'),
    },
  });

export default Talk;