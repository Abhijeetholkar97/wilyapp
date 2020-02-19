import React from 'react';
import { Text, View ,FlatList,StyleSheet} from 'react-native';
import db from '../config.js'

export default class Searchscreen extends React.Component {
  constructor(){
    super();
    this.state ={
      allTransactions:[]
    }
  }

  componentDidMount(){
    this.retriveTransactions()
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
