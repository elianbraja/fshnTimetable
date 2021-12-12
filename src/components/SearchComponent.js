import React, { useState, useEffect, forwardRef, useRef, useImperativeHandle } from 'react';
import { StyleSheet, Text, View, Button, TouchableWithoutFeedback } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import DropDownPicker from 'react-native-dropdown-picker';

export const SearchComponent = forwardRef((props, ref) => {

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(props.items);
  const [index, setIndex] = useState(props.index);


  useEffect(() => {
    setItems(props.items)
    setOpen(props.active)
  }, [props]);

  useImperativeHandle(ref, () => ({
    closeDropdown() {
      setOpen(false)
    }
  }));

  function setSelectedValue(value) {
    setValue(value)
    props.passSelectedToParent(value)
  }

  function setDropdownStatus(status) {
    setOpen(status)
    props.setActiveDropdwon(index)
  }

  function setSelectedItems(items) {
    setItems(tiems)
  }

  return (
      <View style={[styles.viewContainer, {zIndex: open ? 1: 0}]}>
        <DropDownPicker
          searchable={props.searchable}
          open={open}
          value={value}
          items={items}
          setOpen={(status) => {status==true ? setDropdownStatus(status) : null}}
          setValue={(value) => setSelectedValue(value) }
          placeholder = {props.placeholder}
          searchPlaceholder="Search..."
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
