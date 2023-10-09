import firebase from "firebase"

const firebaseConfig = {
    apiKey: "AIzaSyBb1nf68Rn_-AmyaucyLwWLqVGjkJkuxOM",
    authDomain: "furniture-221dc.firebaseapp.com",
    projectId: "furniture-221dc",
    storageBucket: "furniture-221dc.appspot.com",
    messagingSenderId: "1097350792815",
    appId: "1:1097350792815:web:13930264244b771ffd2f9a",
    measurementId: "G-XB7Q80TZ4J"
}; 

firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
export default storage  