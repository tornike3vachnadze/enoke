import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
  Keyboard,
  LayoutAnimation,
} from 'react-native';
import { SelectionType } from '../../types';
import { getSelectionData } from '../../data/placeholder';

type Item = {
  id: number;
  label: string;
};

type Props = {
  selectionType: SelectionType | undefined;
  initialSelectedList: string[] | undefined;
  onClose: (selectedList: string[] | undefined) => void;
  multiSelect?: boolean;
};

const SelectionModal: React.FC<Props> = ({
  selectionType,
  initialSelectedList,
  onClose,
  multiSelect,
}) => {
  const [selectedList, setSelectedList] = useState<Item[]>(
    initialSelectedList!.map((item, index) => ({ id: index, label: item }))
  );
  const [searchText, setSearchText] = useState('');
  const [modalVisible, setModalVisible] = useState(true);
  const [dropdownData, setDropdownData] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (selectionType) {
        const data = getSelectionData(selectionType);
        if (data) {
          const mappedData = data.map((item: any, index: number) => ({
            id: index,
            label: item.name,
          }));
          setDropdownData(mappedData.map((item) => item.label));
        } else {
          setDropdownData([]);
        }
      }
    };

    fetchData();
  }, []);

  const searchRef = useRef<TextInput>(null);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setIsSearching(true);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setIsSearching(false);
    });

    if (!isSearching) searchRef.current?.blur();

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, [isSearching]);

  const handleAddItem = useCallback(
    (item: string) => {
      if (multiSelect) {
        setSelectedList((prevList) => [
          ...prevList,
          { id: prevList.length, label: item },
        ]);
      } else {
        setSelectedList([{ id: 0, label: item }]);
      }
    },
    [multiSelect]
  );

  const handleRemoveItem = (itemId: number) => {
    setSelectedList((prevList) =>
      prevList.filter((item) => item.id !== itemId)
    );
  };

  const handleClose = () => {
    setModalVisible(false);
    const selectedLabels = selectedList.map((item) => item.label);
    onClose(selectedLabels);
  };

  const handleDropdownItemPress = (item: string) => {
    handleAddItem(item);
    setSearchText('');
    if (!multiSelect) setIsSearching(false);
  };

  const filteredItems = useMemo(() => {
    return [...dropdownData].filter(
      (item) =>
        item.toLowerCase().includes(searchText.toLowerCase()) &&
        !selectedList.some((selectedItem) => selectedItem.label === item)
    );
  }, [dropdownData, searchText, selectedList]);

  const renderItem = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={styles.dropdownItem}
      onPress={() => handleDropdownItemPress(item)}
    >
      <Text style={styles.dropdownItemText}>{item}</Text>
    </TouchableOpacity>
  );

  return (
    <Modal
      visible={modalVisible}
      animationType="slide"
      onRequestClose={handleClose}
      transparent={false}
      statusBarTranslucent={false}
    >
      <View style={styles.modalContainer}>
        <TextInput
          ref={searchRef}
          placeholder="Search"
          value={searchText}
          onChangeText={(text) => setSearchText(text)}
          style={styles.searchInput}
        />

        <FlatList
          data={selectedList}
          keyExtractor={(item, index) => `${item.label}${index}`}
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <Text style={styles.itemLabel}>{item.label}</Text>
              {multiSelect && (
                <TouchableOpacity
                  style={styles.removeItemButton}
                  onPress={() => handleRemoveItem(item.id)}
                >
                  <Text style={styles.removeItemText}>x</Text>
                </TouchableOpacity>
              )}
            </View>
          )}
          ListEmptyComponent={
            <View>
              <Text className="font-light font-satoshi-light text-sm text-design-gray-4">
                No items selected
              </Text>
            </View>
          }
          keyboardShouldPersistTaps="handled"
        />

        {isSearching && (
          <FlatList
            data={filteredItems}
            keyExtractor={(item, index) => `${item}${index}`}
            renderItem={renderItem}
            style={styles.dropdownContainer}
            keyboardShouldPersistTaps={'handled'}
          />
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.cancelButton}
            onPress={() => onClose(initialSelectedList)}
          >
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.doneButton} onPress={handleClose}>
            <Text style={styles.buttonText}>Done</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    paddingTop: 40,
    paddingHorizontal: 16,
    backgroundColor: '#FFFFFF',
  },
  searchInput: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#EDEEF0',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#EDEEF0',
    fontFamily: 'Satoshi-Medium',
    fontSize: 14,
    color: 'black',
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#DDDDDD',
  },
  itemLabel: {
    flex: 1,
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
  },
  removeItemButton: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  removeItemText: {
    color: 'black',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    marginTop: 24,
    marginBottom: 20,
  },
  cancelButton: {
    width: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#595959',
    marginRight: 12,
  },
  doneButton: {
    width: 120,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 10,
    backgroundColor: '#898FD1',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
    textAlign: 'center',
  },
  dropdownContainer: {
    position: 'absolute',
    top: 90,
    left: 16,
    right: 16,
    maxHeight: 200,
    backgroundColor: '#FFFFFF',
    elevation: 20,
    borderColor: '#CCCCCC',
    borderRadius: 4,
  },
  dropdownItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomColor: '#DDDDDD',
    borderBottomWidth: 0.5,
  },
  dropdownItemText: {
    fontSize: 16,
    fontFamily: 'Satoshi-Medium',
  },
});

export default SelectionModal;
