import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../../App';
import { getCategoryBySlug, getProductsByCategory } from '../data/sampleData';

type CategoryScreenNavigationProp = StackNavigationProp<RootStackParamList, 'Category'>;
type CategoryScreenRouteProp = RouteProp<RootStackParamList, 'Category'>;

const { width } = Dimensions.get('window');

export default function CategoryScreen() {
  const navigation = useNavigation<CategoryScreenNavigationProp>();
  const route = useRoute<CategoryScreenRouteProp>();
  const { slug } = route.params;

  const category = getCategoryBySlug(slug);
  const products = category ? getProductsByCategory(category.name) : [];

  if (!category) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Category not found</Text>
      </View>
    );
  }

  const renderProduct = ({ item }: { item: any }) => (
    <TouchableOpacity
      style={styles.productCard}
      onPress={() => navigation.navigate('Product', { id: item.id })}
    >
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productDescription} numberOfLines={2}>
        {item.description}
      </Text>
      <Text style={styles.productPrice}>${item.price}</Text>
      <Text style={styles.productRating}>★ {item.rating}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.categoryName}>{category.name}</Text>
        <Text style={styles.categoryDescription}>{category.description}</Text>
        <Text style={styles.productCount}>{products.length} Products</Text>
      </View>

      <FlatList
        data={products}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id}
        numColumns={2}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: 'white',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  categoryName: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  categoryDescription: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  productCount: {
    fontSize: 14,
    color: '#007AFF',
    fontWeight: '600',
  },
  listContainer: {
    padding: 16,
  },
  productCard: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    margin: 8,
    flex: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  productDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 4,
  },
  productRating: {
    fontSize: 14,
    color: '#FF9500',
  },
  errorText: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666',
    marginTop: 100,
  },
});
