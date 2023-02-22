import React from "react";
import {
    View,
    FlatList,
    StyleSheet,
    Text,
    Button,
    ActivityIndicator,
    TouchableOpacity,
    Image,
} from "react-native";

function EventBox(props) {
    var item = props.item;
    const { navigate } = props.navigation;
    return (
        <TouchableOpacity
            onPress={() => navigate("Event", { item: item })}
            style={styles.eventBox}
        >
            <Image
                style={styles.eventImage}
                source={{
                    uri:
                        "https://twachi-mobileweb.firebaseapp.com/event/" +
                        item.key +
                        ".png",
                }}
            />
            <View>
                <Text style={styles.eventText}>{item.ename}</Text>
                <Text style={styles.eventDate}>{item.edate}</Text>
                <Text style={styles.eventAddress}>{item.address}</Text>
            </View>
        </TouchableOpacity>
    );
}

export default class HomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, eventData: [] };
    }

    componentDidMount() {
        this.getEventsFromApi();
    }

    async getEventsFromApi() {
        try {
            this.setState({ loading: true });
            let response = await fetch(
                "https://twachi-mobileweb.web.app/event.json"
            );
            let responseJson = await response.json();
            this.setState({
                loading: false,
                eventData: responseJson,
            });
            // console.log(responseJson);
        } catch (error) {
            console.error(error);
        }
    }

    static navigationOptions = {
        title: "รายการกิจกรรม",
    };

    render() {
        if (this.state.loading) {
            return (
                <View style={{ flex: 1, padding: 20 }}>
                    <ActivityIndicator />
                </View>
            );
        }
        return (
            <View>
                <FlatList
                    data={this.state.eventData}
                    renderItem={({ item }) => (
                        <EventBox
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
    eventBox: {
        flexDirection: "row",
        marginTop: 10,
    },
    eventImage: {
        width: 100,
        height: 80,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 10,
    },
    eventText: {
        color: "#00A",
    },
    eventAddress: {
        color: "#55A",
        fontSize: 11,
    },
    eventDate: {
        fontSize: 11,
    },
});
