import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Pressable,
  Image,
  LayoutAnimation,
  TextInput,
} from "react-native";
import React, { useRef, useState } from "react";
import { AudioStyleParams, BoardData } from "../../../types";
import EditableTextInput from "../../input/EditableTextInput";

interface Todo {
  id: string;
  title: string;
  isDone: boolean;
}

interface List {
  title: string;
  todos: Todo[];
}

export default function ListContent({
  index,
  setBoardData,
  style,
}: {
  index: number;
  setBoardData: React.Dispatch<React.SetStateAction<BoardData>>;
  style: AudioStyleParams;
}) {
  const hitSlop = { top: 40, bottom: 40, left: 40, right: 40 };

  const [list, setList] = useState<List>({
    title: "My List",
    todos: [],
  });

  const [text, setText] = useState("");

  const addTodo = () => {
    const newTodo: Todo = {
      id: `${Date.now()}`,
      title: "",
      isDone: false,
    };
    setList((prevList) => ({
      ...prevList,
      todos: [newTodo, ...prevList.todos],
    }));
  };

  const toggleTodo = (todoIndex: number) => {
    setList((prevList) => {
      const updatedTodos = [...prevList.todos];
      updatedTodos[todoIndex].isDone = !updatedTodos[todoIndex].isDone;
      return {
        ...prevList,
        todos: updatedTodos,
      };
    });
  };

  const deleteTodo = (todoId: string) => {
    setList((prevList) => {
      const updatedTodos = prevList.todos.filter((todo) => todo.id !== todoId);
      return {
        ...prevList,
        todos: updatedTodos,
      };
    });
  };

  const containerRef = useRef<View>(null);
  const animateContainer = () => {
    if (containerRef.current) {
      containerRef.current.setNativeProps({
        style: { opacity: 0 },
      });
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.linear,
        duration: 150,
      });
      containerRef.current.setNativeProps({
        style: { opacity: 1 },
      });
    }
  };

  return (
    <View
      style={styles.container}
      ref={containerRef}
      onLayout={animateContainer}
    >
      <View style={styles.title}>
        {style?.showCaption ? (
          // <EditableTextInput

          //   initialValue={style?.caption}
          //   textType="title"
          //   placeHolder="Title"
          // ></EditableTextInput>
          <TextInput
            placeholder={"List tile"}
            onChangeText={(e) => {
              setText(e);
              style.caption = e;
            }}
            autoFocus
            multiline
            // style={textStyle}
          >
            {style?.caption}
          </TextInput>
        ) : null}
      </View>

      {list.todos.map((todo, todoIndex) => (
        <View
          key={todo.id}
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginVertical: 2,
            minHeight: 30,
          }}
        >
          <Pressable
            hitSlop={hitSlop}
            pointerEvents="box-none"
            style={{ marginRight: 10 }}
            onPress={() => toggleTodo(todoIndex)}
          >
            <Image
              style={styles.toggle}
              source={
                todo.isDone
                  ? require("../../../assets/icons/check-rec.png")
                  : require("../../../assets/icons/check-box.png")
              }
            />
          </Pressable>
          <View
            style={{
              flexDirection: "row",
              alignItems: "flex-start",
              flex: 1,
            }}
          >
            <EditableTextInput
              textType="smallText"
              initialValue={todo.title}
              isDone={todo.isDone}
              placeHolder="My goal"
            ></EditableTextInput>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Pressable
              pointerEvents="box-none"
              style={styles.option}
              onPress={() => deleteTodo(todo.id)}
            >
              <Image
                source={require("../../../assets/icons/bin.png")}
                style={styles.bin}
              />
            </Pressable>
            <Pressable style={styles.option} onPress={() => {}}>
              <Image
                source={require("../../../assets/icons/select.png")}
                style={styles.bin}
              />
            </Pressable>
          </View>
        </View>
      ))}
      <TouchableOpacity onPress={addTodo}>
        <Text style={styles.addTodo}>+ Add Todo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    width: 247,
    minHeight: 60,
    backgroundColor: "white",
    shadowColor: "#D2D2D2",
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.41,
    shadowRadius: 9.11,
    elevation: 14,
    borderRadius: 7,
    position: "absolute",
  },
  title: {
    marginBottom: 5,
  },
  todoText: {
    fontSize: 14,
    marginBottom: 2,
    flexWrap: "wrap",
  },
  addTodo: {
    color: "green",
    fontSize: 14,
    marginTop: 5,
  },
  bin: { width: 13, height: 13, resizeMode: "contain" },
  option: { margin: 5 },
  toggle: { width: 15, height: 15, resizeMode: "stretch" },
});
