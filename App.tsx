import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { createContext, useContext, useState } from 'react';
import { Text, View, Button } from 'react-native';

// Context API para gerenciar o carrinho
const CartContext = createContext({
  cartCount: 0,
  addToCart: () => {},
});

const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  const addToCart = () => {
    setCartCount(cartCount + 1);
  };

  return <CartContext.Provider value={{ cartCount, addToCart }}>{children}</CartContext.Provider>;
};

const ProductListScreen = ({ navigation }) => {
  const { cartCount, addToCart } = useContext(CartContext);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Contagem de produtos: {cartCount}</Text>
      <Button title="Adicionar ao carrinho" onPress={addToCart} />
    </View>
  );
};

const Stack = createStackNavigator();

function App() {
  return (
    <CartProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="ProductList"
            component={ProductListScreen}
            options={() => ({
              title: 'Produtos',
              headerRight: () => {
                const { cartCount } = useContext(CartContext);
                return <Text style={{ marginRight: 15 }}>Carrinho: {cartCount}</Text>;
              },
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </CartProvider>
  );
}

export default App;
