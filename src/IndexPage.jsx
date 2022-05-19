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
      setData({ ...data, ...newData });
      console.log(data);
    });
  }, []);

  const handleSubmit = (e) => {
    console.log(text);
    set(dbRef, {
      sendText: text,
      // receiveText: data.receiveText
    });
    e.preventDefault();
    setText('');
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <label>
          <input value={text} onChange={(e) => { setText(e.target.value); }} type="text" name="name" />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <h1>{data.sendText}</h1>
      {/* <h1>{data.receiveText}</h1> */}
    </>
  );
}