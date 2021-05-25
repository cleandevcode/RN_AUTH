import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet, Image, TouchableOpacity, ActivityIndicator, Modal, Pressable, Alert} from 'react-native';
import axios from 'axios';
import navigationService from '../service/navigationService';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);

    const renderItem = (row: any)=> {
        const {item, index} = row;
        return (
            <TouchableOpacity key={index} style={styles.cardContainer}>
                <Image source={{uri: item.image}} style={styles.image} />
                <View style={{marginLeft: 10}}>
                    <Text style={styles.title}>{item.title}</Text>
                    <Text style={styles.desc}>{item.description}</Text>
                </View>
            </TouchableOpacity>
        )

    }

    const handleLogOutModal = () => {
        setShow(true);
    }

    const handleLogOutOK = () => {
        setShow(false);
        navigationService.navigate("SignIn");
    }

    const handleLogOutCancel = () => {
        setShow(false);
    }

    useEffect(()=>{
        setLoading(true);
        const url = 'https://challenge.maniak.co/api/images'
        axios.get(url).then((res: any)=>{
            if(res) {
                setLoading(false);
                setData(res.data)
            }
        }).catch(err=>{
            setLoading(false)
        })
        
    }, []);

    if(loading) {
        return (
            <View style={styles.container}>
              <ActivityIndicator size="large" color="rgb(251, 91, 90)" />
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <TouchableOpacity onPress={handleLogOutModal} style={{alignSelf: 'flex-end', marginBottom: 20}}>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>
                    LogOut
                    </Text>
                </TouchableOpacity>
                <FlatList 
                    data={data}
                    renderItem={renderItem}
                />
                <View style={styles.centeredView}>
                   <Modal
                    animationType="slide"
                    transparent={true}
                    visible={show}
                    onRequestClose={() => {
                    Alert.alert("Modal has been closed.");
                    setShow(!show);
                    }}
                >
                    <View style={styles.centeredView}>
                        <Text style={styles.logoutTxt}>You want to log out?</Text>
                    <View style={styles.modalView}>
                        <Pressable
                        style={[styles.button, styles.okBth]}
                        onPress={handleLogOutOK}
                        >
                        <Text style={styles.textStyle}>Ok</Text>
                        </Pressable>
                        <Pressable
                        style={[styles.button, styles.cancelBth]}
                        onPress={handleLogOutCancel}
                        >
                        <Text style={styles.textStyle}>Cancel</Text>
                        </Pressable>
                    </View>
                    </View>
                </Modal>
                </View>
            </View>
        )
    }
    
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        paddingTop: 50,
        backgroundColor: "#003f5c",
        color: 'white'
    },
    flatContainer: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    },
    cardContainer: {
        height: 50,
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 20
    },
    image: {
        width: 60,
        height: 60
    },
    title: {
        fontWeight: 'bold',
        fontSize: 16,
    },
    desc: {
        fontSize: 14,
    },
    cancelBth: {
        backgroundColor:'#fb5b5a',
        color: 'white',
    },
    okBth: {
        backgroundColor:'#003f5c',
        color: 'white',
    },
    modal: {
        width: 200,
        height: 200,
        backgroundColor: 'red'
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22,
        backgroundColor: 'white'
      },
      logoutTxt: {
        color: '#003f5c',
        fontSize: 18,
        fontWeight: 'bold'
      },
      modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
      },
      button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        width: 100,
        marginHorizontal: 30
      },
      textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
      },
})
export default Home;