import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import HomeScreen from '../screens/HomeScreen';
import PlantsScreen from '../screens/PlantsScreen';
import AddPlantScreen from '../screens/AddPlantScreen';
import CameraScreen from '../screens/CameraScreen';

const TabNavigator = createBottomTabNavigator(
  {
    Home: HomeScreen,
    Plants: PlantsScreen,
    Add: AddPlantScreen,
    Camera: CameraScreen,
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
        height: 25,
      },
      tabStyle: {
        borderRadius: 5,
      },
    },
  }
);

const Navigation = createAppContainer(TabNavigator);

export default Navigation;
