import { BoardData, Friend, SelectionType } from "../types";
import enneagramData from "./enneagram.json";
import interestsData from "./interests.json";
import languagesData from "./languages.json";
import looking_forData from "./looking_for.json";
import locationData from "./location.json";
import zodiacData from "./zodiacSigns.json";

export const homeBoardData: BoardData = [
  {
    id: "8890",
    type: "text",
    content: {
      type: "text",
      data: "1. 'Home' is your \n personal workboard",
    },
    initialPos: [110, 90],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "908980",
    type: "text",
    content: {
      type: "text",
      data: "2. this is your personal board",
    },
    initialPos: [150, 180],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "90890",
    type: "image",
    content: {
      type: "image",
      data: "/assets/images/audio-placeholder.png",
    },
    initialPos: [160, 320],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "8766",
    type: "text",
    content: {
      type: "text",
      data: "3. listen to this :)",
    },
    initialPos: [110, 380],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "78678",
    type: "text",
    content: {
      type: "text",
      data: "4. this is the ‘view mode’ of \n your toolbar click \n the “+” to access ‘edit mode’",
    },
    initialPos: [150, 550],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "897897",
    type: "image",
    content: {
      type: "image",
      data: "/assets/images/scribble-1.png",
    },
    initialPos: [50, 20],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "675656",
    type: "image",
    content: {
      type: "image",
      data: "/assets/images/scribble-2.png",
    },
    initialPos: [290, 630],
    initialRot: 0,
    initialScale: 1,
  },
];

export const profileBoardData: BoardData = [
  {
    id: "1",
    type: "text",
    content: {
      type: "text",
      data: "1. welcome to enok!",
    },
    initialPos: [110, 90],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "908980",
    type: "text",
    content: {
      type: "text",
      data: "2. this is your personal board",
    },
    initialPos: [150, 180],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "90890",
    type: "image",
    content: {
      type: "image",
      data: "/assets/images/audio-placeholder.png",
    },
    initialPos: [160, 320],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "8766",
    type: "text",
    content: {
      type: "text",
      data: "3. listen to this :)",
    },
    initialPos: [110, 380],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "78678",
    type: "text",
    content: {
      type: "text",
      data: "4. this is the ‘view mode’ of \n your toolbar click \n the “+” to access ‘edit mode’",
    },
    initialPos: [150, 550],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "897897",
    type: "image",
    content: {
      type: "image",
      data: "/assets/images/scribble-3.png",
    },
    initialPos: [50, 20],
    initialRot: 0,
    initialScale: 1,
  },
  {
    id: "675656",
    type: "image",
    content: {
      type: "image",
      data: `/assets/images/scribble-4.png`,
    },
    initialPos: [290, 630],
    initialRot: 0,
    initialScale: 1,
  },
];

export const friends: Friend[] = [
  {
    name: "Emily Anderson",
    imageURL: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Liam Johnson",
    imageURL: "https://randomuser.me/api/portraits/men/2.jpg",
  },
  {
    name: "Olivia Thompson",
    imageURL: "https://randomuser.me/api/portraits/women/3.jpg",
  },
  {
    name: "Noah Davis",
    imageURL: "https://randomuser.me/api/portraits/men/4.jpg",
  },

  {
    name: "Ava Wilson",
    imageURL: "https://randomuser.me/api/portraits/women/5.jpg",
  },
  {
    name: "Ethan Moore",
    imageURL: "https://randomuser.me/api/portraits/men/6.jpg",
  },

  {
    name: "Mia Taylor",
    imageURL: "https://randomuser.me/api/portraits/women/7.jpg",
  },
  {
    name: "Jacob Anderson",
    imageURL: "https://randomuser.me/api/portraits/men/8.jpg",
  },
  {
    name: "Sophia Thompson",
    imageURL: "https://randomuser.me/api/portraits/women/9.jpg",
  },
  {
    name: "William Davis",
    imageURL: "https://randomuser.me/api/portraits/men/10.jpg",
  },
];

export function mapToObj(array: any[], keys: string[]): any[] {
  return array.map((item: any, index: number) =>
    keys.reduce(
      (obj: any, key: string) => {
        obj[key] = item[key];
        return obj;
      },
      { id: index }
    )
  );
}

export function getSelectionData(type: SelectionType) {
  switch (type) {
    case "interests":
      return mapToObj(interestsData.interests, ["name"]);
    case "looking_for":
      return mapToObj(looking_forData.looking_for, ["name"]);
    case "location":
      return mapToObj(locationData.location, ["name", "capital"]);
    case "languages":
      return mapToObj(languagesData.languages, ["name"]);
    case "zodiac":
      return mapToObj(zodiacData.zodiac_signs, [
        "name",
        "element",
        "start_date",
        "end_date",
      ]);
    case "enneagram":
      return mapToObj(enneagramData.enneagram, ["type", "name"]);
    default:
      return null;
  }
}
