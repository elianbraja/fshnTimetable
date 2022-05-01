import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import normalize from 'react-native-normalize';

export const SearchComponent = forwardRef((props, ref) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(props.items);
  const [index, setIndex] = useState(props.index);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    setItems(props.items)
    setOpen(props.active)
  }, [props.active, props.items]);

  useEffect(() => {
    if(props.defaultValue && props.defaultValue != value){
      setValue(props.defaultValue)
      props.passSelectedToParent(props.defaultValue)
    }
  }, [props.defaultValue]);


  const closeDropdown = () => {
    setOpen(false)
  }

  const nullifyValue = () => {
    setValue(null)
  }

  useImperativeHandle(ref, () => ({ closeDropdown, nullifyValue }), [ ])


  function setSelectedValue(value) {
    setValue(value)
    props.passSelectedToParent(value)
  }

  function setDropdownStatus(status) {
    setOpen(status)
    props.setActiveDropdwon(index)
  }

  function getStringValue(value) {
    props.getStringValue(value)
  }

  return (
      <View style={[styles.viewContainer, {zIndex: open ? 1: 0}]}>
        <DropDownPicker
          searchable={props.searchable}
          loading={loading}
          open={open}
          value={value}
          items={items}
          setOpen={(status) => {status==true ? setDropdownStatus(status) : null}}
          setValue={(value) => setSelectedValue(value) }
          onChangeValue={(value) => getStringValue(value)}
          placeholder = {props.placeholder}
          searchPlaceholder="Search..."
          listMode={Platform.OS === 'ios' ? "SCROLLVIEW" : "MODAL"}
          onClose={() => setOpen(false)}
          style={{height: normalize(40)}}
        />
      </View>
  );
})

const styles = StyleSheet.create({
  viewContainer: {
    display: "flex",
    flexDirection:"column",
    marginTop: 15,
    fontFamily: "OpenSans-Bold"
  }
});
