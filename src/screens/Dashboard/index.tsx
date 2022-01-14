import React, {useContext} from 'react';
import {View, Button, StyleSheet} from 'react-native';
import AuthContext from '../../contexts/auth';

const Dashboard: React.FC = () => {
  const {signOut} = useContext(AuthContext);

  function handleSignOut() {
    signOut();
  }

  return (
    <View style={styles.container}>
      <Button title="Sign out" onPress={handleSignOut} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Dashboard;
