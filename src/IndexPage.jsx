import * as React from "react";
import { useState, useEffect } from "react";

// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getDatabase, ref, set, onValue } from "firebase/database";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCLNyEjzNsG7hM4C0Xsa2jGLKqpNDNG95E",
  authDomain: "beat-bit-2022.firebaseapp.com",
  projectId: "beat-bit-2022",
  storageBucket: "beat-bit-2022.appspot.com",
  messagingSenderId: "234394239260",
  appId: "1:234394239260:web:e8bcbd42284f9f40477ad9"
};

// // Initialize Firebase
const app = initializeApp(firebaseConfig);

export const IndexPage = () => {

  const db = getDatabase(app);
  const dbRef = ref(db, 'db/');

  const [text, setText] = useState('');
  const [data, setData] = useState({});


  useEffect(() => {
    onValue(dbRef, (snapshot) => {
      const newData = snapshot.val();
      console.log(snapshot.val());
      setData({ ...data, ...newData });
    });
  }, []);

  const handleSubmit = (e) => {
    console.log(data.receiveText);
    console.log(text);
    set(dbRef, {
      sendText: text,
      receiveText: data.receiveText
    });
    e.preventDefault();
    setText('');
  };

  return (
    <div className="container" style={{ fontSize: "32px", textAlign: "center", marginTop: "30vh", height: "70vh" }}>
      <h1 style={{ marginBottom: "10px" }}>二人のパフォーマーのための通信規約</h1>
      <h2 style={{ marginBottom: "50px" }}>A Communication Protocol for Two Performers</h2>
      <p>送信したいテキストを入力してください(英数のみ)。</p>
      <form onSubmit={handleSubmit}>
        <label>
          <input placeholder="Hello" value={text} onChange={(e) => { setText(e.target.value); }} type="text" name="name" />
        </label>
        <input type="submit" value="Submit" style={{ marginLeft: "10px" }} />
      </form>
      {/* <h1>{data.sendText}</h1> */}
      {/* <h1>{data.receiveText}</h1> */}
      <div style={{ marginTop: "100px" }}>
        <a href="https://keitamiyashita.com">keitamiyashita.com</a>
      </div>
    </div>
  );
}