import {
  View,
  Text,
  StyleSheet,
  Platform,
  UIManager,
  LayoutAnimation,
  Pressable,
} from 'react-native';
import React, { useRef, useState } from 'react';
import { BoardData } from '../../../../types';
import EditableTextInput from '../../../input/EditableTextInput';
import ColumnCard from './ColumnCard';
import {
  GestureEvent,
  PanGestureHandler,
  PanGestureHandlerEventPayload,
  TextInput,
} from 'react-native-gesture-handler';
import Animated, {
  runOnJS,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';

if (Platform.OS === 'android') {
  if (UIManager.setLayoutAnimationEnabledExperimental) {
    UIManager.setLayoutAnimationEnabledExperimental(true);
  }
}

interface Card {
  id: string;
  text: string;
  isDone: boolean;
}

interface Column {
  title: string;
  cards: Card[];
  isCollapsed: boolean;
}

export default function ColumnContent({
  index,
  setBoardData,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
}) {
  const [column, setColumn] = useState<Column>({
    title: '',
    cards: [],
    isCollapsed: false,
  });

  const toggleColumnItems = () => {
    setColumn((prevColumn) => ({
      ...prevColumn,
      isCollapsed: !prevColumn.isCollapsed,
    }));
  };

  const [text, setText] = useState('');
  const className = `tw-inline font-bold font-satoshi-medium text-st text-design-black`;
  const hitSlop = { top: 40, bottom: 40, left: 40, right: 40 };

  const addCard = (text: string) => {
    const newCard: Card = {
      id: `${Date.now()}`,
      text,
      isDone: false,
    };
    setColumn((prevColumn) => ({
      ...prevColumn,
      cards: [newCard, ...prevColumn.cards],
    }));
  };

  const toggleCard = (cardIndex: number) => {
    setColumn((prevColumn) => {
      const updatedCards = [...prevColumn.cards];
      updatedCards[cardIndex].isDone = !updatedCards[cardIndex].isDone;
      return {
        ...prevColumn,
        cards: updatedCards,
      };
    });
  };

  const deleteCard = (cardId: string) => {
    setColumn((prevColumn) => {
      const updatedCards = prevColumn.cards.filter(
        (card) => card.id !== cardId
      );
      return {
        ...prevColumn,
        cards: updatedCards,
      };
    });
  };

  const handleAddColumn = () => {
    if (!text) return;
    addCard(text);
    setText('');
  };

  const containerRef = useRef<View>(null);
  const animateContainer = () => {
    if (containerRef.current) {
      containerRef.current.setNativeProps({
        style: { opacity: 0 },
      });
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration: 300,
      });
      containerRef.current.setNativeProps({
        style: { opacity: 1 },
      });
    }
  };

  const panGestureHandlerRef = useRef<PanGestureHandler>(null);
  const [draggingIndex, setDraggingIndex] = useState(-1);

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const panGestureEvent = useAnimatedGestureHandler<
    GestureEvent<PanGestureHandlerEventPayload>,
    Record<string, any>
  >({
    onStart: (event, context) => {
      context.translateX = translateX.value;
      context.translateY = translateY.value;
    },
    onActive: (event, context) => {
      translateX.value = event.translationX + context.translateX;
      translateY.value = event.translationY + context.translateY;
    },
    onEnd: (event, context) => {
      if (event.absoluteY > 150) {
        translateX.value = withSpring(0);
        translateY.value = withSpring(0);
      }
    },
  });
  const rStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: translateX.value,
        },
        {
          translateY: translateY.value,
        },
      ],
    };
  });

  return (
    <View
      style={styles.container}
      ref={containerRef}
      onLayout={animateContainer}
    >
      <Pressable
        hitSlop={hitSlop}
        style={{
          width: 20,
          height: 20,
          right: 0,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={toggleColumnItems}
      >
        <Text style={styles.collapseExpand}>
          {column.isCollapsed ? '+' : '-'}
        </Text>
      </Pressable>

      <View style={styles.head}>
        <EditableTextInput
          initialValue={column.title}
          textType="title"
          placeHolder="Title"
        />
        <Text style={styles.subTitle}>{column.cards.length} cards</Text>
      </View>

      <View style={[styles.content, { height: column.isCollapsed ? 0 : -1 }]}>
        {column.cards.map((card, cardIndex) => (
          <PanGestureHandler
            key={card.id}
            onGestureEvent={panGestureEvent}
            enabled={draggingIndex === cardIndex}
            ref={panGestureHandlerRef}
          >
            <Animated.View
              style={[
                {
                  ...rStyle,
                  backgroundColor:
                    draggingIndex === cardIndex ? '#F7F7F7' : 'transparent',
                },
              ]}
              onTouchStart={() => setDraggingIndex(cardIndex)}
            >
              <ColumnCard
                text={card.text}
                isDone={card.isDone}
                key={card.id}
                toggleCard={() => toggleCard(cardIndex)}
              />
            </Animated.View>
          </PanGestureHandler>
        ))}

        <View style={styles.card}>
          <TextInput
            placeholder="Start Typing..."
            placeholderTextColor={'lightgray'}
            value={text}
            onChangeText={setText}
            autoFocus
            multiline
            onBlur={handleAddColumn}
            className={className}
            style={{
              justifyContent: 'center',
              alignItems: 'center',
            }}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 247,
    minHeight: 60,
    backgroundColor: 'white',
    shadowColor: '#D2D2D2',
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    borderRadius: 7,
    position: 'absolute',
  },
  head: {
    alignItems: 'center',
  },
  subTitle: {
    color: 'gray',
  },
  content: {
    flex: 1,
    marginVertical: 5,
    height: 0,
    overflow: 'hidden',
  },
  card: {
    minHeight: 55,
    borderColor: 'lightgray',
    borderWidth: 1,
    borderRadius: 5,
    justifyContent: 'center',
    padding: 10,
  },
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 2,
    minHeight: 30,
    alignItems: 'center',
    padding: 5,
    flex: 1,
  },
  collapseExpand: {
    fontSize: 20,
  },
});
