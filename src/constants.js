/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * VessertID - constants.js
 * Universal enumeration and configuration constants for the VessertID rendering engine.
 */

// Coordinate System
export const DOMCoordinateSystem = 2000;
export const GPUCoordinateSystem = 2001;

// Layering / Stacking Depth Modes (parallels DepthFunc / Stencil)
export const NeverLayering = 0;
export const AlwaysLayering = 1;
export const LessLayering = 2;
export const LessEqualLayering = 3;
export const EqualLayering = 4;
export const GreaterEqualLayering = 5;
export const GreaterLayering = 6;
export const NotEqualLayering = 7;

// Surface & Layer Visibility Sides (parallels Side / FrontFace)
export const FrontLayer = 0;
export const BackLayer = 1;
export const DoubleLayer = 2;

// Blending Modes
export const NoBlending = 0;
export const NormalBlending = 1;
export const AdditiveBlending = 2;
export const SubtractiveBlending = 3;
export const MultiplyBlending = 4;
export const CustomBlending = 5;

// Wrapping Modes
export const RepeatWrapping = 1000;
export const ClampToEdgeWrapping = 1001;
export const MirroredRepeatWrapping = 1002;

// Filter Modes
export const NearestFilter = 1003;
export const NearestMipmapNearestFilter = 1004;
export const NearestMipmapLinearFilter = 1005;
export const LinearFilter = 1006;
export const LinearMipmapNearestFilter = 1007;
export const LinearMipmapLinearFilter = 1008;

// Data Types
export const UnsignedByteType = 1009;
export const ByteType = 1010;
export const ShortType = 1011;
export const UnsignedShortType = 1012;
export const IntType = 1013;
export const UnsignedIntType = 1014;
export const FloatType = 1015;
export const HalfFloatType = 1016;

// Pixel & Media Formats
export const AlphaFormat = 1021;
export const RGBFormat = 1022;
export const RGBAFormat = 1023;
export const LuminanceFormat = 1024;
export const LuminanceAlphaFormat = 1025;
export const RedFormat = 1028;
export const RedIntegerFormat = 1029;
export const RGFormat = 1030;
export const RGIntegerFormat = 1031;
export const RGBAIntegerFormat = 1033;

// Theme Mapping (parallels ToneMapping)
export const NoThemeMapping = 0;
export const LinearThemeMapping = 1;
export const ReinhardThemeMapping = 2;
export const CineonThemeMapping = 3;
export const ACESFilmicThemeMapping = 4;
export const AgXThemeMapping = 5;
export const NeutralThemeMapping = 6;

// Interpolation Types
export const InterpolateDiscrete = 2300;
export const InterpolateLinear = 2301;
export const InterpolateSmooth = 2302;

// Signal Heat & Stacking Tiers
export const StackingTierStream = 1;
export const StackingTierElevated = 10;
export const StackingTierPinned = 25;
export const StackingTierModal = 100;
export const StackingTierSystem = 500;

export const SignalHeatIdle = 0;
export const SignalHeatWarm = 1;
export const SignalHeatHot = 2;
export const SignalHeatViral = 3;

// Loop Modes (Animation)
export const LoopOnce = 2200;
export const LoopRepeat = 2201;
export const LoopPingPong = 2202;

// Color Spaces
export const SRGBColorSpace = 'srgb';
export const LinearSRGBColorSpace = 'srgb-linear';
export const DisplayP3ColorSpace = 'display-p3';
export const LinearDisplayP3ColorSpace = 'display-p3-linear';
