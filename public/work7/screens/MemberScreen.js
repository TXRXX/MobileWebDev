import React from "react";
import { View, FlatList, StyleSheet, Text, Button, Image } from "react-native";
import Constants from "expo-constants";

export default class MemberScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = { loading: false, member: {} };
    }

    static navigationOptions = {
        title: "ข้อมูลผู้เข้าร่วม",
    };

    componentDidMount() {
        this.getMemberFromApi();
    }

    async getMemberFromApi() {
        try {
            var item = this.props.navigation.getParam("item");
            this.setState({ loading: true });
            let response = await fetch(
                "https://twachi-mobileweb.firebaseapp.com/member.json"
            );
            let json = await response.json();
            for (const m of json) {
                if (m.key == item.mid) {
                    this.setState({
                        loading: false,
                        member: m,
                    });
                    break;
                }
            }
        } catch (error) {
            console.error(error);
        }
    }

    render() {
        // const { navigate } = this.props.navigation;
        var item = this.props.navigation.getParam("item");
        return (
            <View style={styles.container}>
                <Image
                    style={styles.memberImage}
                    source={{
                        uri:
                            "https://twachi-mobileweb.firebaseapp.com/member/" +
                            item.mid +
                            ".jpg",
                    }}
                />
                <Text style={styles.name}>{this.state.member.name}</Text>
                <Text style={styles.gender}>{this.state.member.gender}</Text>
                <Text style={styles.company}>{this.state.member.company}</Text>
                <Text style={styles.email}>{this.state.member.email}</Text>
                <Text style={styles.phone}>
                    Phone:{this.state.member.phone}
                </Text>
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
    memberImage: {
        width: 300,
        height: 300,
        borderRadius: 150,
    },
});
