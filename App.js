import * as React from 'react';
import { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, FlatList, route, Image, TextInput, Switch } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native';

function SearchScreen() {

	return (
		<Stack.Navigator initialRouteName="Recherche" style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
			<Stack.Screen
				name="Recherche"
				component={Recherche}
				options={{ title: 'Recherche personnages' }}

			/>
			<Stack.Screen name="Résultat" component={ResultScreen} />
			<Stack.Screen name="SingleImage" component={SingleImage} />
		</Stack.Navigator>
	);
}
function EpisodeScreen() {
	const ALL_EPISODES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11]
	const [data, setData] = useState(ALL_EPISODES)

	const onEpisodePress = (episodeNumber) => {
		setData(data.filter(data => data != episodeNumber))
	}
	const onResetPress = () => (
		setData(ALL_EPISODES)
	);

	const Item = ({ episodeNumber }) => (
		<View style={{ flex: 1, alignItems: 'stretch', margin: 10 }}>
			<TouchableOpacity
				style={{ flexDirection: 'row', flex: 1, justifyContent: 'space-between', borderBottomWidth: 1 }}
				onPress={() => onEpisodePress(episodeNumber)}>
				<Text> épisode {episodeNumber}</Text>
				<Ionicons name="checkmark-circle" />
			</TouchableOpacity>
		</View>
	);
	const renderItem = ({ item }) => (
		<Item episodeNumber={item} />
	);
	return (
		<View style={{ flex: 1, alignItems: 'stretch' }}>
			<FlatList
				data={data}
				renderItem={renderItem}
				keyExtractor={(item, index) => index}
			/>
			<Button title="Reset" onPress={() => onResetPress()} />

		</View>
	);
}
function Recherche({ navigation }) {
	const [inputValue, setInputValue] = useState('')
	const [onlyDeadCheck, setOnlyDeadCheck] = useState(false);

	return (
		<View style={{ padding: 10 }}>
			<View style={{ flexDirection: "column" }}>
				<TextInput
					onChangeText={(text) => {
						setInputValue(text)
					}}
					value={inputValue}
					style={{
						flexGrow: 1,
						borderWidth: 1,
						padding: 5,
						fontSize: 20,
						borderColor: "#000"
					}}
				/>
				<View>
					<TouchableOpacity style={{ flexDirection: 'row', justifyContent: "flex-end", alignContent: "center" }} onPress={() => setOnlyDeadCheck(!onlyDeadCheck)}>
						<Text>Seulement les personnages morts</Text>
						<Switch
							value={onlyDeadCheck}
							onValueChange={(value) => setOnlyDeadCheck(value)}
						>
						</Switch>
					</TouchableOpacity>

					<Button
						title="Rechercher"
						onPress={() => navigation.navigate('Résultat', { inputValue, onlyDeadCheck })}
					/>
				</View>
			</View>
		</View>

	);
}
function ResultScreen({ route, navigation }) {
	const [personnages, setPersonnages] = useState([])
	const { inputValue, onlyDeadCheck, otherParam } = route.params;
	const [resultCounter, setResultCounter] = useState(0);
	const [noResult, setNoResult] = useState(true);

	navigation.setOptions({ title: inputValue });

	useEffect(() => {
		fetch(`https://rickandmortyapi.com/api/character`).then((response) => {
			return response.json()
		}).then((json) => {
			setPersonnages(json.results)
		})
	}, [])

	const Item = ({ personnage }) => {
		// on vérifie si le nom de la personne contient la recherche, et si le switch des morts à été coché et si oui si la personne est bien morte
		if (personnage.name.includes(inputValue) && ((((personnage.status == "Dead") == onlyDeadCheck)) || (!onlyDeadCheck))) {
			//pas le temps de finir le compteur proprement
			// setResultCounter(resultCounter + 1);
			// console.log(resultCounter)
			setNoResult(false)
			return (
				<View>
					<TouchableOpacity
						onPress={() => navigation.navigate('SingleImage', { personnage })}
						style={{ flexDirection: "row", justifyContent: 'space-around' }}>
						<Text>{personnage.name}</Text>
						<Image source={{ uri: personnage.image }} style={{ width: 200, height: 200, resizeMode: "contain" }} />
					</TouchableOpacity>
				</View>
			);

		} else {
			return null
		}
	}

	const renderItem = ({ item }) => (
		<Item personnage={item} />
	);

	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
			<FlatList
				data={personnages}
				renderItem={renderItem}
				keyExtractor={(item, index) => index}
			/>
			{/* <Text>{resultCounter} résultat affichés</Text> */}
			<Text> {noResult ? "aucun résultat" : ""}</Text>
			<Button title="Go to Home" onPress={() => navigation.navigate('Recherche')} />
			<Button title="Go back" onPress={() => navigation.goBack()} />
			{/* <Button
				title="Go back to first screen in stack"
				onPress={() => navigation.popToTop()}
			/> */}
		</View>
	);
}
function SingleImage({ route, navigation }) {
	const { personnage, otherParam } = route.params;
	navigation.setOptions({ title: personnage.name })
	return (
		<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginTop: 40 }}>
			<Image source={{ uri: personnage.image }} style={{ width: 300, height: 300, resizeMode: "contain" }} />
			<View style={{ flex: 1, justifyContent: "flex-end" }}>
				<Button title="Go to Home" onPress={() => navigation.navigate('Recherche')} />
				<Button title="Go back" onPress={() => navigation.goBack()} />
			</View>
		</View>
	)

}
const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function App() {

	return (
		<NavigationContainer>
			<Tab.Navigator
				screenOptions={({ route }) => ({
					tabBarIcon: ({ focused, color, size }) => {
						let iconName;

						if (route.name === 'Home') {
							iconName = focused
								? 'ios-information-circle'
								: 'ios-information-circle-outline';
						} else if (route.name === 'Facts') {
							iconName = focused ? 'ios-list' : 'ios-list';
						}
						return <Ionicons name={iconName} size={size} color={color} />;
					},
					tabBarActiveTintColor: 'tomato',
					tabBarInactiveTintColor: 'gray',
				})}>
				<Tab.Screen name="recherche" component={SearchScreen} options={{ headerShown: false }} />
				<Tab.Screen name="episodes" component={EpisodeScreen} />
			</Tab.Navigator>
		</NavigationContainer>
	);
}
export default App;
