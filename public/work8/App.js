import * as React from "react";
import { StatusBar } from "expo-status-bar";
import {
    StyleSheet,
    Text,
    View,
    FlatList,
    LogBox,
    Image,
    ScrollView,
} from "react-native";
import firebase from "firebase/compat/app";
import { getDatabase, ref, onValue, set } from "firebase/database";
import { getAuth } from "firebase/auth";
import {
    Provider as PaperProvider,
    Card,
    List,
    Button,
} from "react-native-paper";
import Constants from "expo-constants";
import LoginScreen from "./Login";

const firebaseConfig = {
    apiKey: "AIzaSyCx_36wPpym52H98r_l0ujZvdTtO029JVY",
    authDomain: "mobilewebdev-6a28c.firebaseapp.com",
    databaseURL:
        "https://mobilewebdev-6a28c-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "mobilewebdev-6a28c",
    storageBucket: "mobilewebdev-6a28c.appspot.com",
    messagingSenderId: "534575876002",
    appId: "1:534575876002:web:6e2f9d2ff4ac508be054fb",
    measurementId: "G-VNXKN5D6Z7",
};

LogBox.ignoreAllLogs(true);

try {
    firebase.initializeApp(firebaseConfig);
} catch (err) {
    console.log("TEST");
}

function dbListener(path, setData) {
    const tb = ref(getDatabase(), path);
    onValue(tb, (snapshot) => {
        setData(snapshot.val());
    });
}

function renderCorona(item, index, setItem) {
    var icon = (
        <Image
            style={{ width: 30, height: 20 }}
            source={{
                uri: `https://covid19.who.int/countryFlags/${item.code}.png`,
            }}
        />
    );
    var desc = (
        <View>
            <Text>{"ผู้ป่วยสะสม " + item.confirmed + " ราย"}</Text>
            <Text>{"เสียชีวิต " + item.death + " ราย"}</Text>
            <Text>{"รักษาหาย " + item.cure + " ราย"}</Text>
        </View>
    );
    return (
        <List.Item
            onPress={() => setItem(item)}
            title={item.name}
            description={desc}
            left={(props) => icon}
        ></List.Item>
    );
}

function Loading() {
    return (
        <View>
            <Text>Loading</Text>
        </View>
    );
}

function Detail(props) {
    return (
        <View style={{ marginTop: 100 }}>
            <Text>{JSON.stringify(props.item)}</Text>
            <Button onPress={() => props.setItem(null)}>Back</Button>
        </View>
    );
}

export default function App() {
    const [corona, setCorona] = React.useState([]);
    const [user, setUser] = React.useState(null);
    const [citem, setCitem] = React.useState(null);

    React.useEffect(() => {
        var auth = getAuth();
        auth.onAuthStateChanged(function (us) {
            setUser(us);
        });
        dbListener("/corona", setCorona);
    }, []);

    if (corona.length == 0) {
        return <Loading />;
    }
    if (user == null) {
        return <LoginScreen />;
    }
    if (citem != null) {
        return <Detail item={citem} setItem={setCitem} />;
    }

    return (
        <PaperProvider>
            <View style={styles.container}>
                <ScrollView>
                    <Card>
                        <Card.Cover
                            source={{
                                uri: "https://images.unsplash.com/photo-1584573062942-d46bb3aee3fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=871&q=80",
                            }}
                        />
                        <Card.Title title="Coronavirus Situation" />
                        <Card.Content>
                            <Text>Your Phone Number: {user.phoneNumber}</Text>
                            <FlatList
                                data={corona}
                                renderItem={({ item, index }) =>
                                    renderCorona(item, index, setCitem)
                                }
                            ></FlatList>
                        </Card.Content>
                    </Card>
                </ScrollView>
            </View>
            <Text> เลือก {JSON.stringify(citem)}</Text>
            <Button
                icon="logout"
                mode="contained"
                onPress={() => getAuth().signOut()}
            >
                Sign Out
            </Button>
            <Button
                icon="logout"
                mode="contained"
                onPress={() => addItem(corona.length)}
            >
                Add
            </Button>
            <StatusBar
                backgroundColor="rgba(200,0,0,0.4)"
                style="light"
                barStyle="light-content"
            />
        </PaperProvider>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingTop: Constants.statusBarHeight,
    },
});
