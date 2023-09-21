import { View, Text, StyleSheet, Pressable, Image, Modal } from 'react-native';
import React, { useState } from 'react';
import { BoardData } from '../../../../types';
import PDFViewer from './PDFViewer';
import CADViewer from './CADViewer';

const FilePreview = ({
  isVisible,
  onClose,
  title,
  uri,
  fileType,
}: {
  isVisible: boolean;
  onClose: () => void;
  title: string;
  uri: string;
  fileType: string;
}) => {
  return (
    <Modal
      transparent={true}
      visible={isVisible}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.modalContainer}>
        <View
          style={{
            alignSelf: 'stretch',
            flexDirection: 'row',
            justifyContent: 'space-around',
            marginBottom: 5,
          }}
        >
          <View />
          <Text
            className={`font-bold font-satoshi-medium text-sm text-design-white`}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {title}
          </Text>
          <Pressable onPress={onClose}>
            <Text
              className={`font-bold font-satoshi-medium text-sm text-design-white`}
            >
              Done
            </Text>
          </Pressable>
        </View>

        {fileType === 'pdf' ? <PDFViewer uri={uri} /> : <CADViewer uri={uri} />}
      </View>
    </Modal>
  );
};

export default function FileContent({
  index,
  setBoardData,
  data,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  data: any;
}) {
  const [preview, setPreview] = useState<boolean>(false);

  return (
    <View style={styles.container}>
      <FilePreview
        isVisible={preview}
        onClose={() => setPreview(false)}
        uri={data?.uri}
        title={data?.name}
        fileType={data?.type}
      />

      <Pressable
        onPress={() => setPreview(true)}
        style={styles.previewContainer}
      >
        <Image
          style={styles.imagePreview}
          source={require('../../../../assets/icon.png')}
        />
      </Pressable>

      <View style={styles.titleContainer}>
        <Text
          className={`flex-1 font-bold font-satoshi-medium text-lg text-design-dark`}
          numberOfLines={1}
        >
          {data?.name}
        </Text>
        <Pressable pointerEvents="box-none" onPress={() => {}}>
          <Image
            source={require('../../../../assets/icons/file-download.png')}
          />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: 285,
    height: 224,
    borderRadius: 10,
    backgroundColor: 'white',
    elevation: 20,
    shadowColor: 'lightgray',
  },
  previewContainer: {
    flex: 1,
    paddingVertical: 10,
    marginHorizontal: 10,
    borderColor: '#C9C9C9',
    borderBottomWidth: 1,
  },
  imagePreview: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    backgroundColor: 'white',
    resizeMode: 'contain',
  },
  titleContainer: {
    borderColor: '#C9C9C9',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 10,
    alignSelf: 'stretch',
    flexShrink: 1,
    overflow: 'hidden',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000000a9',
  },
});
