import React from 'react'
import { StyleSheet, Text, View, Image, ScrollView } from 'react-native'
import { useSelector } from 'react-redux';

const Favorites = () => {
     const favMovie = useSelector(state => state.AddFavorite);
     console.log("hello from fav Movie", favMovie);
    return (
      <ScrollView>
        {favMovie.favoriteItem.length &&
          favMovie.favoriteItem.map((fav, index) => {
            return (
              <View key={index} style={{borderRadius: 20}}>
                <View style={{padding: 20}}>
                  <Image
                    source={{uri: fav.Poster}}
                    style={{height: 350, width: 350}}
                  />
                  <View
                    style={{
                      backgroundColor: 'black',
                      flexDirection: 'row',
                      justifyContent: 'space-around',
                      alignItems: 'center',
                    }}>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                        padding: 20,
                      }}>
                      {fav.Title}
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
      </ScrollView>
    );
}

export default Favorites

const styles = StyleSheet.create({})
