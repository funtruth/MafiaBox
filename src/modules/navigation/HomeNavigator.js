import { createStackNavigator } from "react-navigation";

import HomeView from '../home/HomeView'
import JoinSlide from '../home/screens/JoinSlide'
import CreateSlide from '../home/screens/CreateSlide'

import { slideLeft } from './navAnim'

const config = () => {
  return {
      // Define scene interpolation, eq. custom transition
      screenInterpolator: (sceneProps) => {
          const {position, scene} = sceneProps;
          const {index} = scene;

          return slideLeft(index, position);
      },
      transitionSpec: {
          duration: 300
      }
  }
};

const HomeNavigator = createStackNavigator(
    {
      Home: {
        screen: HomeView
      },
      Join: {
        screen: JoinSlide
      },
      Create:{
        screen: CreateSlide
      }
    },
    {
      headerMode: "none",
      initialRouteName: "Home",
      transitionConfig: config,
      cardStyle: {
        backgroundColor:'transparent'
      }
    }
);

export default HomeNavigator