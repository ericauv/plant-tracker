import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import HomeScreen from '../screens/HomeScreen';
import PlantsScreen from '../screens/PlantsScreen';

const MainNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Plants: PlantsScreen
  },
  {
    initialRouteName: 'Home'
  }
);

const Navigation = createAppContainer(MainNavigator);

export default Navigation;
