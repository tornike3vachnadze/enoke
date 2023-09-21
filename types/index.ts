import { TextStyle } from "react-native";

export type ItemTypes =
  | "text"
  | "image"
  | "audio"
  | "camera"
  | "video"
  | "url"
  | "line"
  | "sticker"
  | "drawing"
  | "list"
  | "column"
  | "file"
  | "board"
  | "delete"
  | "profile"
  | "showSticker"
  | "emoji";
export type ItemContentType =
  | "text"
  | "image"
  | "localimage"
  | "audio"
  | "video"
  | "url"
  | "line"
  | "sticker"
  | "drawing"
  | "list"
  | "column"
  | "board"
  | "file"
  | "profile";

export type FileTypes = "pdf" | "obj";

export interface IBoardItem {
  id: string;
  type: ItemTypes;
  content: {
    type: ItemContentType;
    data: string | number | any;
    style: ItemStyle | undefined | null;
  };
  initialPos: [number, number];
  initialRot: number;
  initialScale: number;
  isSelected: boolean;
}

export type BoardData = IBoardItem[];

export interface Friend {
  name: string;
  imageURL: string;
}

export type ChatPreview = {
  uid: string;
  friend: Friend;
  lastMessage: string;
  lastMessageTime: string;
  unreadCount: number;
};

export type SelectionType =
  | "interests"
  | "looking_for"
  | "location"
  | "languages"
  | "zodiac"
  | "enneagram";
export enum TAlignment {
  Left = "left",
  Center = "center",
  Right = "right",
  Justify = "justify",
}
export enum TStyle {
  LargeHeading = "large-heading",
  NormalHeading = "Normal-heading",
  Normal = "normal",
  Small = "small",
  Qoute = "qoute",
}

export interface TextStyleParams {
  color: string;
  backdrop: string;
  background: string;
  bullet: boolean;
  bold: boolean;
  italic: boolean;
  underline: boolean;
  alignment: TAlignment;
  textStyle: TextStyle;
}
export interface UrlStyleParams {
  caption: boolean;
  preview: boolean;
}

export interface AudioStyleParams {
  showCaption: boolean;
  caption: string;
}

export interface LineStyleParams {
  showStart: boolean;
  showEnd: boolean;
}
export type ItemStyle =
  | TextStyleParams
  | UrlStyleParams
  | AudioStyleParams
  | LineStyleParams;
