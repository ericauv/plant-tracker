import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import PlantsScreen from '../screens/PlantsScreen';

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Plants: PlantsScreen
  },
  {
    initialRouteName: 'Home',
    backBehaviour: 'history',
    tabBarOptions: {
      activeBackgroundColor: 'white',
      activeTintColor: 'green',
      inactiveBackgroundColor: 'white',
      inactiveTintColor: 'black',
      showIcon: false,
      style: {
        height: 25
      },
      tabStyle: {
        borderRadius: 5
      }
    }
  }
);

const Navigation = createAppContainer(TabNavigator);

export default Navigation;
