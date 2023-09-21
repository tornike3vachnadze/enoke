import {
  GestureStateChangeEvent,
  PanGestureHandlerEventPayload,
  TapGestureHandlerEventPayload,
} from "react-native-gesture-handler";
import { SharedValue } from "react-native-reanimated";

export type ToolbarButtonProps = {
  onDrop?: (
    e: GestureStateChangeEvent<PanGestureHandlerEventPayload> & {
      width?: number;
      height?: number;
      startX?: number;
      startY?: number;
    }
  ) => void;
  onTouchDown?: () => void;
  onTouchUp?: () => void;
  onPress?: (e: GestureStateChangeEvent<TapGestureHandlerEventPayload>) => void;
  enabled?: boolean;
  scrollHeight: number;
  scrollOffset: SharedValue<number>;
  active?: boolean;
  draggableComponent?: JSX.Element;
  children?: JSX.Element;
};
