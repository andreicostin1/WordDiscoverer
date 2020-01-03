import React, { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import InputSpinner from 'react-native-input-spinner';

import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity,
	TouchableWithoutFeedback,
	TextInput,
	Alert,
	Platform,
	Image,
	AsyncStorage,
	Keyboard
} from 'react-native';

var inputArr0 = require('../Arrays/Arr');
var inputArr1 = require('../Arrays/Arr1');
var inputArr2 = require('../Arrays/Arr2');
var inputArr3 = require('../Arrays/Arr3');

var inputArr = inputArr0
	.concat(inputArr2)
	.concat(inputArr1)
	.concat(inputArr3);

function getWord(input, length) {
	input = input.toLowerCase();
	var enc = encode(input, input);

	var fin = [];

	for (var i = 0; i < inputArr.length; i++) {
		var x = inputArr[i];
		if (encodeCheck(enc, x)) {
			if (!fin.includes(x) && x.length >= length) {
				fin.push(x);
			}
		}
	}

	fin.sort(function(a, b) {
		return b.length - a.length;
	});

	var arr = [];
	var count = 0;
	var len = fin[0].length;

	for (var ch = 0; ch < fin.length; ch++) {
		if (!(fin[ch].length == len)) {
			len--;
			count++;
		}
		if (typeof arr[count] == 'undefined') {
			arr[count] = '';
		}
		arr[count] += fin[ch] + '/';
	}

	return arr;
}

function encodeCheck(inp, x) {
	x = encode(x, inp);
	if (x === 'false') {
		return false;
	}

	for (var i = 0; i < x.length; i += 2) {
		var ind = inp.indexOf(x.charAt(i));
		var temp = '';
		temp += x.charAt(i);
		if (!inp.includes(temp)) {
			return false;
		} else {
			if (x.charAt(i + 1) > inp.charAt(ind + 1)) {
				return false;
			}
		}
	}
	return true;
}

function encode(str, master) {
	// A map (in JavaScript, an object) for the character=>count mappings
	var counts = {};
	var ret = '';

	// Misc vars
	var ch, index, len, count;

	// Loop through the string...
	for (index = 0, len = str.length; index < len; ++index) {
		// Get this character
		ch = String(str).charAt(index); // Not all engines support [] on strings

		if (!master.includes(ch)) {
			return 'false';
		}
		// Get the count for it, if we have one; we'll get `undefined` if we
		// don't know this character yet
		count = counts[ch];

		// If we have one, store that count plus one; if not, store one
		// We can rely on `count` being falsey if we haven't seen it before,
		// because we never store falsey numbers in the `counts` object.
		counts[ch] = count ? count + 1 : 1;
	}

	for (ch in counts) {
		ret += ch + counts[ch];
	}
	return ret;
}

function list(x) {
	var y = [];

	for (var j = 0; j < x.length; j++) {
		y.push(
			<Text key={Math.random()} style={styles.textOut}>
				{x[j]}
			</Text>
		);
	}

	return y;
}

function masterList(arr) {
	var out = [];
	for (var i = 0; i < arr.length; i++) {
		var x = arr[i].split('/');
		out.push(
			<View key={Math.random()}>
				<Text style={styles.lenHeader}>Length: {x[0].length}</Text>
				<View style={styles.listOut}>{list(x)}</View>
			</View>
		);
	}
	return out;
}

const HomeScreen = ({ navigation }) => {
	const [entry, setEntry] = useState('');
	const [length, setLength] = useState(3);

	function submit() {
		try {
			var arr = getWord(entry, length);
			var outP = masterList(arr);
			navigation.navigate('Output', {
				entry,
				outP
			});
		} catch (e) {
			Alert.alert(
				'Invalid Input',
				'Combinations of these letter do not exist in the english language',
				'OK'
			);
		}
	}
	return (
		<TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
			<LinearGradient
				colors={['#085078', '#85D8CE']}
				start={{ x: 0, y: 1 }}
				end={{ x: 1, y: 0 }}
				style={{ flex: 1, paddingHorizontal: 23 }}>
				<View style={styles.cent}>
					<Text style={styles.headerText}>Letter Unscrambler</Text>
					<TextInput
						style={styles.entry}
						placeholder='Input Letters'
						autoCorrect={false}
						autoCapitalize='none'
						multiline={false}
						onChangeText={text => setEntry(text)}
						returnKeyType='done'
						onSubmitEditing={() => {
							submit();
						}}
					/>
					<Text style={styles.lenText}>Minimum Word Length</Text>
					<InputSpinner
						style={styles.inpLen}
						max={entry.length <= 1 ? 1 : entry.length}
						min={1}
						step={1}
						editable={false}
						fontSize={26}
						color={'#C0C0C0'}
						buttonTextColor={'black'}
						value={length}
						onChange={num => {
							setLength(num);
						}}
					/>

					<TouchableOpacity
						style={{ alignSelf: 'center', paddingVertical: 30 }}
						onPress={() => {
							submit();
						}}>
						<View style={styles.entryButton}>
							<Text style={styles.entryText}>Unscramble</Text>
						</View>
					</TouchableOpacity>
				</View>
			</LinearGradient>
		</TouchableWithoutFeedback>
	);
};

const styles = StyleSheet.create({
	cent: {
		paddingHorizontal: '10%',
		paddingTop: '15%',
		flex: 1
	},
	headerText: {
		alignSelf: 'center',
		fontSize: 23,
		fontWeight: 'bold',
		paddingTop: 30,
		paddingBottom: 10
	},
	entry: {
		color: '#393939',
		paddingHorizontal: 30,
		paddingTop: 20,
		paddingVertical: 20,
		borderRadius: 5,
		backgroundColor: 'white',
		fontSize: 19
	},
	entryButton: {
		alignSelf: 'center',
		paddingVertical: 13,
		paddingHorizontal: 19,
		borderRadius: 5,
		backgroundColor: 'white',
		shadowColor: 'black',
		shadowOpacity: 0.12,
		shadowRadius: 5,
		shadowOffset: { width: 0, height: 5 },
		elevation: 3
	},
	entryText: {
		fontSize: 19,
		color: 'black',
		alignSelf: 'center'
	},
	textOut: {
		fontSize: 20,
		fontWeight: 'bold'
	},
	listOut: {
		borderColor: 'black',
		borderWidth: 4,
		paddingHorizontal: 50,
		marginBottom: 15,
		paddingTop: 15
	},
	lenHeader: {
		alignSelf: 'center',
		fontSize: 24,
		fontWeight: 'bold',
		paddingBottom: 10
	},
	inpLen: {
		paddingVertical: 20,
		alignSelf: 'center'
	},
	lenText: {
		alignSelf: 'center',
		paddingTop: 30,
		fontSize: 20,
		fontWeight: 'bold'
	}
});

export default HomeScreen;
