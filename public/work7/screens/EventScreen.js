import React from "react";
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Button,
    Image,
    TouchableOpacity,
    ScrollView,
} from "react-native";
import Constants from "expo-constants";

function MemberBox(props) {
    var item = props.item;
    const { navigate } = props.navigation;
    return (
        <TouchableOpacity
            onPress={() => navigate("Member", { item: item })}
            style={styles.memberBox}
        >
            <Image
                style={styles.memberImage}
                source={{ uri:"https://twachi-mobileweb.firebaseapp.com/member/"+item.mid +".jpg",}}
            />
            <View>
                <Text style={styles.memberText}>{item.mid}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default class EventScreen extends React.Component {
    static navigationOptions = {
        title: "รายละเอียดกิจกรรม",
    };
    render() {
        // const { navigate } = this.props.navigation;
        var item = this.props.navigation.getParam("item");
        return (
            <View style={styles.eventview}>
                    <Text style={styles.eventName}>{item.ename}</Text>
                    <Text style={styles.eventAddress}>
                        <Text style={styles.eventDate}>{item.edate}</Text>
                        {item.address}
                    </Text>
                    <Image
                        style={styles.eventImage}
                        source={{
                            uri:
                                "https://twachi-mobileweb.firebaseapp.com/event/" +
                                item.key +
                                ".png",
                        }}
                    />
                    <Text style={styles.eventDetail}>{item.detail}</Text>
                    <Text style={styles.memberTitle}>Member List</Text>
                    <FlatList
                        data={item.member}
                        renderItem={({ item }) => (
                            <MemberBox
                                item={item}
                                navigation={this.props.navigation}
                            />
                        )}
                        keyExtractor={(item, index) => index.toString()}
                    />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    eventview: {
        margin: 10,
        paddingRight: 10,
    },
    eventImage: {
        width: "100%",
        height: 200,
        margin: 10,
        borderRadius: 10,
    },
    eventName: {
        color: "#00A",
        fontSize: 16,
    },
    eventAddress: {
        color: "#55A",
        fontSize: 11,
    },
    eventDate: {
        fontSize: 11,
        color: "#000",
    },
    memberImage: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    memberBox: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-around",
        margin: 10,
        padding: 10,
        borderRadius: 10,
        backgroundColor: "#ffff"
    }
});
