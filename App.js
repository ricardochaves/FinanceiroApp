import { createStackNavigator } from 'react-navigation';
import HomeScreen from './screens/home';
import MetaDiaria from './screens/metadiaria';
import Login from './screens/login';
import Category from './screens/category';

export default createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Rel1: {
      screen: MetaDiaria,
    },
    Login: {
      screen: Login,
    },
    Category: {
      screen: Category,
    },
  },
  {
    initialRouteName: 'Home',
  },
);
