import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import Splash from '../screens/Splash';
import UserType from '../screens/UserType';

// Supplier screens
import SupplierLogin from '../screens/supplier/Login';
import SupplierSignup from '../screens/supplier/Signup';
import SupplierHome from '../screens/supplier/Home';
import LeafWeight from '../screens/supplier/LeafWeight';
import MyPayments from '../screens/supplier/MyPayments';
import PreOrders from '../screens/supplier/PreOrders';
import TeaPacketRequest from '../screens/supplier/TeaPacketRequest';
import FertilizerRequest from '../screens/supplier/FertilizerRequest';
import TrackLorry from '../screens/supplier/TrackLorry';  
import QuickLoan from '../screens/supplier/QuickLoan';

// Driver screens
import DriverLogin from '../screens/driver/Login';
import DriverSignup from '../screens/driver/Signup';
import DriverHome from '../screens/driver/Home';
import Suppliers from '../screens/driver/Suppliers';
import OrderRequestsNotification  from '../screens/driver/OrderRequestsNotification';
import Map from '../screens/driver/Map';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Splash" component={Splash} />
      <Stack.Screen name="UserType" component={UserType} />
      
      {/* Supplier Screens */}
      <Stack.Screen name="SupplierLogin" component={SupplierLogin} />
      <Stack.Screen name="SupplierSignup" component={SupplierSignup} />
      <Stack.Screen name="SupplierHome" component={SupplierHome} />
      <Stack.Screen name="LeafWeight" component={LeafWeight} />
      <Stack.Screen name="MyPayments" component={MyPayments} />
      <Stack.Screen name="PreOrders" component={PreOrders} />
      <Stack.Screen name="TeaPacketRequest" component={TeaPacketRequest} />
      <Stack.Screen name="FertilizerRequest" component={FertilizerRequest} />
      <Stack.Screen name="TrackLorry" component={TrackLorry} />
      <Stack.Screen name="QuickLoan" component={QuickLoan} />
      
      {/* Driver Screens */}
      <Stack.Screen name="DriverLogin" component={DriverLogin} />
      <Stack.Screen name="DriverSignup" component={DriverSignup} />
      <Stack.Screen name="DriverHome" component={DriverHome} />
      <Stack.Screen name="Suppliers" component={Suppliers} /> 
      <Stack.Screen name="OrderRequestsNotification" component={OrderRequestsNotification} />
      <Stack.Screen name="Map" component={Map} />
    </Stack.Navigator>
  );
};

export default AppNavigator;