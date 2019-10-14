import React, { useState, useContext, useEffect } from 'react';
import { Modal, FlatList, StyleSheet, Text, View, Button, TextInput } from 'react-native';
import Context from './context';
import MapView from 'react-native-maps';
import axios from 'axios';


const gigsRes = [
  { name: 'gig1',
    points: [
      {latitude: 42.35089662389645, longitude: -71.06053378095498 },
      {latitude: 42.356605218314996, longitude: -71.05984713544717 },
      {latitude: 42.35755660030661, longitude: -71.04542757978311 }
    ],
    region: {
         latitude: 42.3600,
         longitude: -71.0588,
         latitudeDelta: 0.5,
         longitudeDelta: 0.5
     }
   },
   { name: 'gig2',
     points: [
       {latitude: 42.37670802680011, longitude: -71.0776999186503 },
       {latitude: 42.36637205493608, longitude: -71.08302142133584 },
       {latitude: 42.37461560539819, longitude: -71.04044939985147}
     ],
     region: {
          latitude: 42.3600,
          longitude: -71.0588,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05
      }
    },
    { name: 'gig3',
      points: [
        {latitude: 42.34709060622172, longitude: -71.0601046275126 },
        {latitude: 42.365293972193584, longitude: -71.03272463788858 },
        {latitude: 42.348295870085224, longitude: -71.08156229963174 }
      ],
      region: {
           latitude: 42.3600,
           longitude: -71.0588,
           latitudeDelta: 0.05,
           longitudeDelta: 0.05
       }
     },
]


export default function HomeScreen(props) {
  useEffect(() => {
    //fetch gigs here
    setGigs(gigsRes)
  }, [])


  const [isVisible, setVisible] = useState(false)
  const [gigs, setGigs] = useState([])

  const [activeGig, setActiveGig] = useState(null);
  const [points, setPoints] = useState([]);
  const [name, setName] = useState('');
  const [region, setRegion] = useState(null);

  const default_map = {
   region: {
         latitude: 42.3600,
         longitude: -71.0588,
         latitudeDelta: .05,
         longitudeDelta: .05
    },
    points: [],
    name: "No Name"
  }

  const setGig = (gig) => {
    setActiveGig(gig.item)
    setRegion(gig.item.region)
    setPoints(gig.item.points)
    setName(gig.item.name)
    setVisible(true)
  }

  const saveGig = () => {
    gigConfig = {
      name,
      region,
      points
    }

    console.log(gigConfig)
    //post API request here
  }

  const setMapRegion = (region) => {
    setRegion(region)
  }

  const resetMap = () => {
    setActiveGig(default_map)
    setRegion(default_map.region)
    setPoints([])
    setVisible(true)
  }

  const setNewMarker = (coord) => {
    setPoints([...points, coord])
  }

  const markerDragEnd = (coord, idx) => {
    let newArr = [...points]
    newArr[idx] = coord
    setPoints(newArr)
  }

  const removePoint = (idx) => {
    let newArr = points.filter((point, index) => index != idx )

    setPoints(newArr)
  }


  return (
    <View style={styles.container}>
    <Text>Map</Text>
    <Button
      title='Create New G'
      onPress={() => setVisible(true)}
      />
    <FlatList
       keyExtractor={(item, index) => index.toString()}
       data={gigs}
       renderItem={(gig) =>
         <Text
           style={{padding: 25}}
           onPress={() => setGig(gig)}
            >
         {gig.item.name}
        </Text> }
      />
    <Modal visible={isVisible}>
     <View>
      <MapView
         style={{width: "100%", height: "80%"}}
         initialRegion={{
                latitude: 42.3600,
                longitude: -71.0588,
                latitudeDelta: .05,
                longitudeDelta: .05
          }}
          moveOnMarkerPress={false}
          region={region ? region : null}
          onRegionChangeComplete={e => setMapRegion(e)}
          onPress={e => setNewMarker(e.nativeEvent.coordinate)}
          >
        {points.length != 0
          ? points.map((point, idx) =>
              <MapView.Marker
                key={idx}
                onDragEnd={e => markerDragEnd(e.nativeEvent.coordinate, idx)}
                draggable={true}
                coordinate={point}
                onPress={e => removePoint(idx)}
                />)
          : null }
         <MapView.Polyline
           coordinates={points}
          />
      </MapView>
      <Button
        title='Close Modal'
        onPress={() => setVisible(false)}
        />
      <Text>{name}</Text>
      <TextInput
        style={{height: 40, borderColor: 'gray', borderWidth: 1}}
        value={name}
        placeholder="Gig Name"
        onChangeText={text => setName(text)}
       />
       <Button
        title="Save Gig"
        onPress={() => saveGig()}
        />
      </View>
     </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});
