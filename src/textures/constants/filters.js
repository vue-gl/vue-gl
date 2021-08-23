import {
  LinearFilter as linear, NearestMipMapNearestFilter as nearestMipMapNearest,
  NearestMipMapLinearFilter as nearestMipMapLinear, LinearMipMapLinearFilter as linearMipMapLinear,
  LinearMipMapNearestFilter as linearMipMapNearest, NearestFilter as nearest,
} from 'three';

export default {
  nearest,
  nearestMipMapNearest,
  nearestMipMapLinear,
  linear,
  linearMipMapNearest,
  linearMipMapLinear,
};
