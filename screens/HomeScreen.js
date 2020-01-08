import * as WebBrowser from 'expo-web-browser';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import React, { Component } from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Button,
  SectionList,
  StatusBar,
  SafeAreaView
} from 'react-native';
import Axios from 'axios';
import t from 'tcomb-form-native';

import { MonoText } from '../components/StyledText';

const Form = t.form.Form;

const User = t.struct({
  bench: t.Number,
  squat: t.Number,
  deadlift: t.Number,
  shoulder_press: t.Number,
});
const Calculator = t.struct({
  weight: t.Number,
  reps: t.Number,
});

const formStyles = {
  ...Form.stylesheet,
  formGroup: {
    normal: {
      marginBottom: 10
    },
  },
  controlLabel: {
    normal: {
      color: 'blue',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    },
    // the style applied when a validation error occours
    error: {
      color: 'red',
      fontSize: 18,
      marginBottom: 7,
      fontWeight: '600'
    }
  }
}

const options = {
  fields: {
    // email: {
    //   error: 'Without an email address how are you going to reset your password when you forget it?'
    // },
    // password: {
    //   error: 'Choose something you use on a dozen other sites or something you won\'t remember'
    // },
    // terms: {
    //   label: 'Agree to Terms',
    // },
  },
  stylesheet: formStyles,
};

export default class HomeScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
        currentBench: 0,
        currentDeadlift: 0,
        currentSquat: 0,
        currentShoulderPress: 0,
        initialBench: 0,
        initialDeadlift: 0,
        initialSquat: 0,
        initialShoulderPress: 0,
        lifterID: 0,
        orm: 0,
        pounds: 0,
        reps: 0,
        tableHead: ['', 'Squat', 'Bench', 'Deadlift', 'Shoulder Press'],
        tableTitle: ['Initial', 'Current'],
        tableData: [
          ['1', '2', '3', '4'],
          ['a', 'b', 'c', 'd'],
          // ['1', '2', '3', '4'],
          // ['a', 'b', 'c', 'd']
        ]
    }
    // this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.paginate = this.paginate.bind(this);
  }

  handleSubmit = () => {
    const value = this._form.getValue();
    console.log('value: ', value);
  }

  componentDidMount(){
    this.getData()
  }

  componentDidUpdate(){
    // this.getData();
  }

  getData(){
    // const parts = document.URL.split('/');
    // const lastSegment = parts.pop() || parts.pop(); // handle potential trailing slash
    Axios
    .get(`http://71977baa.ngrok.io/api/1`)
    .then((res)=>{
      console.log(res.data[0])
      var data = res.data[0]
      this.setState({
        currentBench: data.current_bench,
        currentDeadlift: data.current_deadlift,
        currentSquat: data.current_squat,
        currentShoulderPress: data.current_shoulder_press,
        initialBench: data.initial_bench,
        initialDeadlift: data.initial_deadlift,
        initialSquat: data.initial_squat,
        initialShoulderPress: data.initial_shoulder_press,
        lifterID: data.lifter_id,
        orm: data.orm,
        pounds: data.pounds,
        reps: data.reps,
      })

    })
    .catch((err)=>{
      console.error(err)
    })
  }



  render() {
    const state = this.state;
    state.tableData = [
      [`${this.state.initialSquat}`, `${this.state.initialBench}`, `${this.state.initialDeadlift}`, `${this.state.initialShoulderPress}`],
      [`${this.state.currentSquat}`, `${this.state.currentBench}`, `${this.state.currentDeadlift}`, `${this.state.currentShoulderPress}`],
      // ['1', '2', '3', '4'],
      // ['a', 'b', 'c', 'd']
    ]
    return (
      <SafeAreaView style={styles.Container}>
        <View style={styles.Body}>
          <Text style={styles.bodyText}>Powerlifting App</Text>
        </View>
      <ScrollView>
        <View style={styles.container}>
          <Form
            ref={c => this._form = c}
            type={User}
            options={options}
          />
          <Button
            title="Run"
            onPress={this.handleSubmit}
          />
        </View>
        <View style={styles.container}>
          <Form
            ref={c => this._form = c}
            type={Calculator}
            options={options}
          />
          <Button
            title="Calculate"
            onPress={this.handleSubmit}
          />
        </View>
      <View style={styles.container}>
        <Table borderStyle={{borderWidth: 1}}>
          <Row data={state.tableHead} flexArr={[1, 1, 1, 1, 1]} style={styles.head} textStyle={styles.text}/>
          <TableWrapper style={styles.wrapper}>
            <Col data={state.tableTitle} style={styles.title} heightArr={[28,28]} textStyle={styles.text}/>
            <Rows data={state.tableData} flexArr={[1, 1, 1, 1]} style={styles.row} textStyle={styles.text}/>
          </TableWrapper>
        </Table>
      </View>
      </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 28  },
  text: { textAlign: 'center' },
  Body: {
    height: 50,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
  bodyText: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold'
  }
});
