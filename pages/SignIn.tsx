import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity
} from "react-native";
import axios, { AxiosRequestConfig } from 'axios';
import navigationService from '../service/navigationService';

export default function SignIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("")
  const [error, setError] = useState(false);
  const handleLogin = () => {
    if(username !== '' && password !== '') {
      const url = 'https://challenge.maniak.co/api/login';
      // var data = JSON.stringify({
      //   "username": "challenge@maniak.co",
      //   "password": "maniak2020"
      // });

      var data = JSON.stringify({
        "username": username,
        "password": password
      });
      
      var config: AxiosRequestConfig = {
        method: 'post',
        url: url,
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
        navigationService.navigate("Home")
      })
      .catch(function (error) {
        console.log(error);
        setError(true);
      });
      
    }
  }

  return (
    <View style={styles.container}>
        <Text style={styles.logo}>Hello Maniak</Text>
        <View style={styles.inputView}>
          <TextInput
            style={styles.inputText}
            placeholder="Email..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setUsername(text)}
          />
        </View>
        <View style={styles.inputView}>
          <TextInput
            secureTextEntry
            style={styles.inputText}
            placeholder="Password..."
            placeholderTextColor="#003f5c"
            onChangeText={(text) => setPassword(text)}
          />
        </View>
        {error &&
        <Text style={styles.errorText}>Email or Password is not match.</Text>
        }
        <TouchableOpacity style={styles.loginBtn} disabled={!password || !username} onPress={handleLogin} >
          <Text style={styles.loginText}>LOGIN</Text>
        </TouchableOpacity>
        
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#003f5c",
    alignItems: "center",
    justifyContent: "center"
  },
  logo: {
    fontWeight: "bold",
    fontSize: 50,
    color: "#fb5b5a",
    marginBottom: 40
  },
  inputView: {
    width: "80%",
    backgroundColor: "#465881",
    borderRadius: 25,
    height: 50,
    marginBottom: 20,
    justifyContent: "center",
    padding: 20
  },
  inputText: {
    height: 50,
    color: "white"
  },
  forgot: {
    color: "white",
    fontSize: 11
  },
  loginBtn: {
    width: "80%",
    backgroundColor: "#fb5b5a",
    borderRadius: 25,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 40,
    marginBottom: 10
  },
  loginText: {
    color: "white"
  },
  errorText: {
    fontSize: 12,
    color: 'red'
  }
});
