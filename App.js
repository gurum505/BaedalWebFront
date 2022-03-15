import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { LinearGradient } from 'expo-linear-gradient';

import Notice from './views/notice';
import Navigation from './components/navigation';
import MenuBar from './components/menuBar';
import OrderList from './views/order_list'; //주문내역
import User from './views/user';

import Home from './views/home';//changepage
import Talk from './views/talk';

import DetailOrder from './views/detail_order';

class App extends Component {

  constructor(props){
    super(props);
    this.state = {
        seleted_mode: 'home',
        change_mode_data: '',
        db_user: {
          coupon_num: 0,
          id: "testID",
          name: "테스트계정",
          order_num: 0,
          location: "대전 유성구 궁동 99",
        },
    }
  }

  changePage(){
      switch(this.state.seleted_mode){
            case 'notice':
                    return <Notice
                    style={styles.page_component}
                    db_user={this.state.db_user}
                    changeMode={this.changeMode.bind(this)}
                    data={this.state.change_mode_data}
                    sendData={this.sendData.bind(this)}
                    />;
            case 'order-list':
                    return <OrderList
                    style={styles.page_component}
                    db_user={this.state.db_user}
                    changeMode={this.changeMode.bind(this)}
                    data={this.state.change_mode_data}
                    sendData={this.sendData.bind(this)}
                    />;
            case 'user':
                    return <User
                    style={styles.page_component}
                    db_user={this.state.db_user}
                    changeMode={this.changeMode.bind(this)}
                    data={this.state.change_mode_data}
                    sendData={this.sendData.bind(this)}
                    />;
            case 'talk':
                    return <Talk
                    style={styles.page_component}
                    db_user={this.state.db_user}
                    changeMode={this.changeMode.bind(this)}
                    data={this.state.change_mode_data}
                    sendData={this.sendData.bind(this)}
                    />;
             case 'home':
                     return <Home
                     style={styles.page_component}
                     db_user={this.state.db_user}
                     changeMode={this.changeMode.bind(this)}
                     data={this.state.change_mode_data}
                     sendData={this.sendData.bind(this)}
                     />;

            case 'detail-order':
                    return <DetailOrder
                    style={styles.page_component}
                    db_user={this.state.db_user}
                    changeMode={this.changeMode.bind(this)}
                    data={this.state.change_mode_data}
                    sendData={this.sendData.bind(this)}
                    />;
      }

  }
    changeMode(_mode){
      if(this.state.seleted_mode!==_mode){
          this.setState({
            seleted_mode: _mode,
          });
        }
    }
    sendData(_data){
      this.setState({
        change_mode_data: _data,
      });
    }

  render(){
      return(
        <LinearGradient
        colors={['#40E0D0', '#7AD3FA', '#8BAAF0']}
        start={{x: 0, y: 1}}
        end={{x: 1, y: 1}}
        style={styles.container}>
          <Navigation
          mode={this.state.seleted_mode}
          detail={this.state.change_mode_data}
          changeMode={this.changeMode.bind(this)}
          sendData={this.sendData.bind(this)}
          />
          {this.changePage()}
          <MenuBar
                  style={styles.menu_component}
                  mode={this.state.seleted_mode}
                  changeMode={this.changeMode.bind(this)}
                  sendData={this.sendData.bind(this)}
                  />
      </LinearGradient>
      );
  }
}

const styles = StyleSheet.create({
  //전체 화면 style
  container: {
    flex: 1,
    backgroundColor: '#40E0D0',
    alignContent: 'space-between',
  },

  //사용자 선택 화면 style
  page_component: {
    width: wp('100%'),
    height: hp('81%'),
    backgroundColor: '#fff',
  },

  //하단 메뉴 컴포넌트 style
  menu_component: {
    width: wp('100%'),
    height: hp('7%'),
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default App;
