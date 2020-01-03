import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from './src/Screens/HomeScreen';
import OutputScreen from './src/Screens/OutputScreen';

const navigator = createStackNavigator(
	{
		Home: HomeScreen,
		Output: OutputScreen
	},
	{
		initialRouteName: 'Home',
		headerMode: 'none',
		navigationOptions: {
			headerVisible: false
		}
	}
);

export default createAppContainer(navigator);
