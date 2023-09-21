import { BoardData } from "../../types";

export type ToolbarToolsProps = {
  boardData: BoardData | undefined;
  setBoardData: ((data: BoardData) => void) | undefined;
  selectedItemId: string | undefined;
};
