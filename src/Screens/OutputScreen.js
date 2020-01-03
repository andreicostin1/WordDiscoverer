import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { ScrollView } from 'react-native-gesture-handler';

import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	TextInput,
	Alert,
	Platform,
	Image,
	AsyncStorage
} from 'react-native';

const OutputScreen = ({ navigation }) => {
	const entry = navigation.state.params.entry.trim();
	var list = navigation.state.params.outP;

	return (
		<LinearGradient
			colors={['#f79d00', '#64f38c']}
			start={{ x: 1, y: 0 }}
			end={{ x: 0, y: 1 }}
			style={{ flex: 1 }}>
			<View style={styles.page}>
				<View
					style={{
						flexDirection: 'row',
						justifyContent: 'center',
						alignItems: 'center',
						marginTop: 20
					}}>
					<TouchableOpacity
						onPress={() => {
							navigation.goBack();
						}}>
						<Image
							style={styles.backBut}
							source={require('../../assets/back.png')}
						/>
					</TouchableOpacity>
					<View style={styles.headerContainer}>
						<Text style={styles.header}>"{entry}" Unscrambled:</Text>
					</View>
				</View>

				<ScrollView>
					<View style={styles.output}>{list}</View>
				</ScrollView>
			</View>
		</LinearGradient>
	);
};

const styles = StyleSheet.create({
	page: {
		flex: 1,
		paddingTop: '2%'
	},
	output: {
		paddingVertical: 20,
		alignSelf: 'center'
	},
	header: {
		alignSelf: 'center',
		fontSize: 28,
		fontWeight: 'bold',
		paddingTop: 20,
		paddingBottom: 20
	},
	headerContainer: {
		borderBottomWidth: 4,
		borderBottomColor: 'black',
		paddingLeft: 10
	},
	backBut: {
		height: 35,
		width: 35
	}
});

export default OutputScreen;
