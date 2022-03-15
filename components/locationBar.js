/************************************************
 * Class : 상단 고정된 위치 확인/설정 바
 * 
 * notice : 상단 고정바이므로 다른 컴포넌트에 의해 가려지지 않도록
 *          항상 이를 추가할 때 컴포넌트의 가장 아래에 추가해야함.
 * 
 * props : 
 *  - db_user: 사용자 정보
 *  - 
 * 
 * state :
 *  - db_user: 사용자 정보
 * 
 * function :
 *  - 
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { MaterialIcons } from '@expo/vector-icons';

const ICON_COLOR = '#40E0D0';

class LocationBar extends Component {
    constructor(props){
        super(props);
        this.state = {
            db_user: this.props.db_user,
        }   
    }
    render(){
        return(
            <View style={styles.container}>
                {/*클릭시 투명화를 방지하기 위한 임시 패널*/}
                <View style={styles.up_container}/>
                <TouchableOpacity style={styles.up_container}>
                <MaterialIcons
                    name="location-on"
                    size={25} 
                    color={ICON_COLOR}
                    style={styles.adress_icon}/>
                    <Text style={styles.adress_text}>{this.state.db_user.location}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    //전체 컴포넌트 style
    container: {
        position: 'absolute',
        top: hp('-3%'),
        alignItems: 'center',
        //justifyContent: 'center',
        
    },

    //위치창 style
    up_container: {
        position: 'absolute',
        flexDirection: 'row',
        alignItems: 'center',
        //justifyContent: 'center',
        backgroundColor: '#fff',
        width: wp('90%'),
        height: 50,
        borderRadius: 10,
        borderTopWidth: 1,
        borderWidth: 2,
        borderColor: '#dddddd',
    },

    //주소 설정 패널 style
    adress_text: {
        fontSize: 15,
        marginLeft: 10,
    },

    //주소창 아이콘 style
    adress_icon: {
        marginLeft: 10,
    },
  });

export default LocationBar;