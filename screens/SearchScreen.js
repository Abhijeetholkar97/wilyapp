import React from 'react';
import { Text, View ,FlatList,StyleSheet} from 'react-native';
import {SearchBar} from 'react-native-elements';
import db from '../config.js'

export default class Searchscreen extends React.Component {
  constructor(){
    super();
    this.state ={
      allTransactions:[],
      search: "",
      transactions: []
    }
  }

  componentDidMount(){
    this.retriveTransactions()
  }

  SearchFilterFunction(text) {
    //passing the inserted text in textinput
    const newData = this.state.allTransactions.filter((item)=> {
      //applying filter for the inserted text in search bar
      const itemData = item.transactionType ? item.transactionType.toUpperCase() : ''.toUpperCase();
      const textData = text.toUpperCase();
      return itemData.indexOf(textData) > -1;
    });
    this.setState({
      //setting the filtered newData on datasource
      //After setting the data it will automatically re-render the view
      transactions: newData,
      search: text,
    });
  }

  retriveTransactions=()=>{
    try {
      var allTransactions= []
      var transactions = db.collection("transactions")
        .get().then((querySnapshot)=> {
          querySnapshot.forEach((doc)=> {
              // doc.data() is never undefined for query doc snapshots
              
              allTransactions.push(doc.data())
              console.log('this are the transaction',allTransactions)
          })
          this.setState({allTransactions})
        })
    }
    catch (error) {
      console.log(error);
    }
  }

    render() {
      return (
        <View>
           <View styles ={{height:20,width:'100%'}}>
              <SearchBar
              placeholder="Type Here..."
              onChangeText={text => this.SearchFilterFunction(text)}
              onClear={text => this.SearchFilterFunction('')}
              value={this.state.search}
            />
          </View>

         <FlatList
                data={this.state.allTransactions}
                renderItem={({ item }) => (
                  <View style={styles.itemContainer}>
                    <Text>  bookId: {item.bookId}</Text>
                <Text>  studentId: {item.studentId}</Text>
                    <Text>  transactionType : {item.transactionType}</Text>
                  </View>
                )}
                keyExtractor={(item, index) => index.toString()}
                /> 
        </View>
      );
    }
  }

  const styles = StyleSheet.create({
    itemContainer: {
      height: 80,
      width:'100%',
      borderWidth: 2,
      borderColor: 'purple',
      justifyContent:'center',
      alignSelf: 'center',
    }
  })