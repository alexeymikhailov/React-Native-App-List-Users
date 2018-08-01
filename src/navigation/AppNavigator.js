import { Navigation } from 'react-native-navigation';
import listIcon from '../../assets/icons/list.png';
import userIcon from '../../assets/icons/user.png';
import ListUsers from '../components/ListUsers';

const startTabBasedApp=() => Navigation.startTabBasedApp({
  tabs: [
		{
			label: 'Список',
      icon: listIcon,
			screen: 'ListUsers'
		},

    {
			label: 'Элемент списка',
      icon: userIcon,
			screen: 'CurrentInfoUser'
		}
	],
  animationType: 'fade',
  tabsStyle: {
    tabBarTranslucent: false
  },
  appStyle: {
  	statusBarTextColorScheme: 'light',
    navBarHidden: true,
    orientation: 'portrait',
    topBarElevationShadowEnabled: false
  }
});

export default startTabBasedApp;
