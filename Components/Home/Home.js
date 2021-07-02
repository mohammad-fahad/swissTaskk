import { rest } from 'lodash';
import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  FlatList,
  Button,
  KeyboardAvoidingView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { addFav } from '../../Redux/Action';



const Home = () => {
const API_KEY = "fa4205f4";
    const [data, setData] = useState({});
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [q, setQuery] = useState('avengers');
    const [movie, setMovie] = useState('')   
    const [selected, setSelected] = useState({
      Title:'',
      Poster:''
    })
    const [selectedMovie, steSelectMovie] = useState([]);
    const [fav, setFave] = useState(false);
    const dispatch = useDispatch();
    const favMovie = useSelector(state => state.AddFavorite);
    console.log(favMovie);
    


    // useEffect(() => {
    //    dispatch(addFav({Title: 'avengers', Poster: '25'}));
    // },[]) 

    const handleGetItem = (e) => {
        // setFave(!fav);
      // dispatch(addFav({Title: e.Title, Poster: e.Poster}));
      const newData = {
        Title: e.Title,
        Poster: e.Poster,
      };
      steSelectMovie([...selectedMovie, newData]);
      dispatch(addFav(selectedMovie && selectedMovie))

    }


    useEffect(() => {
      setLoading(true);
      setError(null);
      setData(null);

      fetch(`https://www.omdbapi.com/?s=${q}&apikey=${API_KEY}`)
        .then(resp => resp)
        .then(resp => resp.json())
        .then(response => {
          if (response.Response === 'False') {
            setError(response.Error);
          } else {
            setData(response.Search);
          }

          setLoading(false);
        })
        .catch(({message}) => {
          setError(message);
          setLoading(false);
        });
    }, [q]);
    const search = () => {

      setQuery(movie.trim())
    }

     

    return (
      <SafeAreaProvider>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        />
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 10,
            backgroundColor: '#ff392e',
          }}>
          <TextInput
            placeholder="Search for you favorite movie"
            onChangeText={e => setMovie(e)}
            style={{backgroundColor: '#fff', width: 316, paddingHorizontal: 20}}
          />

          <TouchableOpacity
            style={{backgroundColor: '#ff392e', padding: 15}}
            onPress={search}>
            <Text style={{color: 'white', fontSize: 15, fontWeight: 'bold'}}>
              search
            </Text>
          </TouchableOpacity>
        </View>
        <ScrollView style={{backgroundColor: 'black'}}>
          {/* <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center', alignItems:'center'}}>
            {data?.map((res, i) => {
              return (
                <View key={i}>
                  <Image
                    source={{uri: res.Poster}}
                    style={{height: 350, width: 270}}
                  />
                  <Text style={{fontSize: 20}}>{res.Title}</Text>
                  <Text style={{color:'black', fontSize:20}}>{res.Released}</Text>
                </View>
              );
            })}
          </View> */}
          <FlatList
            data={data}
            style={{backgroundColor: '#263238'}}
            renderItem={({item, index}) => (
              <TouchableOpacity key={item.imdbID} style={{borderRadius: 20}}>
                <View style={{padding: 20}}>
                  <Image
                    source={{uri: item.Poster}}
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
                      {item.Title}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontWeight: 'bold',
                        color: 'white',
                        textAlign: 'center',
                        padding: 20,
                      }}>
                      {item.Genre}
                    </Text>
                    <Icon
                      name="heart"
                      size={26}
                      color={fav ? '#fff' : 'red'}                    
                      onPress={() => handleGetItem(item)}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            )}
          />
        </ScrollView>
      </SafeAreaProvider>
    );
}

export default Home

const styles = StyleSheet.create({})
