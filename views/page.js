/************************************************
 * Class : 선택 모드에 따른 화면
 * 
 * state :
 *  - 
 * 
 * function :
 *  -  
 *  
 ************************************************/

import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TextInput } from 'react-native';

class Page extends Component {
    render(){
        return(
            <View style={this.props.style}>
                <Text>Page</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  });

export default Page;