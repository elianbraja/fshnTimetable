import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';

export default function SearchComponent(props, {navigation}) {

const [selectedItems, setSelectedItems] = useState([]);


  return (
    <View style={styles.viewContainer}>
      <View style={{width: "100%"}}>
        <SearchableDropdown
              multi={true}
              selectedItems={selectedItems}
              onItemSelect={(item) => {
                props.passSelectedToParent(item["name"])
                const items = props.data;
                setSelectedItems({ items });
              }}
              containerStyle={{ padding: 5 }}
              itemStyle={{
                padding: 10,
                marginTop: 2,
                backgroundColor: '#ddd',
                borderColor: '#bbb',
                borderWidth: 1,
                borderRadius: 5,
              }}
              itemTextStyle={{ color: '#222' }}
              itemsContainerStyle={{ maxHeight: 140 }}
              items={props.data}
              chip={true}
              resetValue={false}
              textInputProps={
                {
                  placeholder: props.placeholder,
                  underlineColorAndroid: "transparent",
                  style: {
                      padding: 12,
                      borderWidth: 1,
                      borderColor: '#ccc',
                      borderRadius: 5,
                  }
                }
              }
              listProps={
                {
                  nestedScrollEnabled: true,
                }
              }
            />
          </View>
    </View>
  );
}

const styles = StyleSheet.create({
  viewContainer: {
    display: "flex",
    flexDirection:"column",
    marginTop: 15,
    fontFamily: "OpenSans-Bold"
  }
});
