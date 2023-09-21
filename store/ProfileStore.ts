import { UserProfileServerType, UserServerType } from "server/routes/users";
import { create } from "zustand";

export const useProfileStore = create<ProfileStore>((_set) => ({
  base: {
    email: "",
    username: "",
    name: "",
    phone: "",
  },

  profile: {
    bio: "",
    url: "",
    birthday: "",
    interests: [],
    looking_for: [],
    location: [],
    languages: [],
    zodiac: "",
    enneagram: "",
    preferences: [],
    emoji: "",
  },

  followers: [],
  following: [],

  updateBase: (field, value) =>
    _set((state) => ({
      base: {
        ...state.base,
        [field]: value,
      },
    })),
  updateProfile: (field, value) =>
    _set((state) => ({
      profile: {
        ...state.profile,
        [field]: value,
      },
    })),

  updateFollowers: (value) =>
    _set((state) => ({
      followers: value,
    })),
  updateFollowing: (value) =>
    _set((state) => ({
      following: value,
    })),
}));

export interface ProfileStore {
  base: {
    email: string;
    username: string;
    name: string;
    phone: string;
  };

  profile: {
    bio: string;
    url: string;
    birthday: string;
    interests: string[];
    looking_for: string[];
    location: string[];
    languages: string[];
    zodiac: string;
    enneagram: string;
    preferences: string[];
    emoji: string;
  };

  followers: (UserServerType & UserProfileServerType)[];
  following: (UserServerType & UserProfileServerType)[];

  updateBase: (
    field: "email" | "username" | "name" | "phone",
    value: string
  ) => void;
  updateProfile: (
    field:
      | "bio"
      | "url"
      | "birthday"
      | "interests"
      | "looking_for"
      | "location"
      | "languages"
      | "zodiac"
      | "enneagram"
      | "preferences"
      | "emoji",
    value: string | string[]
  ) => void;

  updateFollowers: (value: (UserServerType & UserProfileServerType)[]) => void;
  updateFollowing: (value: (UserServerType & UserProfileServerType)[]) => void;
}
