import { StyleSheet, Platform } from 'react-native';
// import { MKColor } from 'react-native-material-kit';

export default StyleSheet.create({
  scrollView: {
   flex: 1,
 },
 container: {
   flex: 1,
   alignItems: 'stretch',
   backgroundColor: '#F5FCFF',
   padding: 20,
   marginTop: Platform.OS === 'android' ? 56 : 0,
 },
 row: {
   flexDirection: 'row',
 },
 col: {
   flex: 1,
   flexDirection: 'column',
   alignItems: 'center',
   marginLeft: 7, marginRight: 7,
 },
 header: {
 },
 headerText: {
   fontSize: 20,
 },
 tasks: {
   flex: 1,
 }
});
