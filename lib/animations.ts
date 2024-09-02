import * as Animatable from "react-native-animatable";

export const zoomInAnimation = {
  "0": {
    scale: 0.9,
  },
  "1": {
    scale: 1.05,
  },
} as Animatable.CustomAnimation;

export const zoomOutAnimation = {
  "0": {
    scale: 1,
  },
  "1": {
    scale: 0.9,
  },
} as Animatable.CustomAnimation;
