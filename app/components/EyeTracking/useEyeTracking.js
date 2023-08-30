import React from 'react';
import { mergeIfDefined } from './utils';

export const DEFAULT_OPTIONS = {
  debug: false,
  tracking: false,
  eyePos: false,
  showDebug: () => {},
  startTracking: () => {},
  startEyePos: () => {},
  props: {},
};

export function useEyeTracking({ defaultOptions }) {
  const [isDebug, setIsDebug] = React.useState(false);
  const [isTracking, setIsTracking] = React.useState(false);
  const [isEyePosTracking, setIsEyePosTracking] = React.useState(false);
  const [debugData, setDebugData] = React.useState({});
  //   const initialOptions = mergeIfDefined(DEFAULT_OPTIONS, defaultOptions);
  //   const [options, setOptions] = React.useState(initialOptions);
  const showDebug = React.useCallback(show => {
    setIsDebug(show);
  }, []);
  const startTracking = React.useCallback(start => {
    setIsTracking(start);
  }, []);
  const startEyePos = React.useCallback(start => {
    setIsEyePosTracking(start);
  }, []);
  const setDebugInfo = React.useCallback(debugInfo => {
    setDebugData(debugInfo);
  }, []);
  return {
    isDebug,
    isTracking,
    isEyePosTracking,
    debugData,
    setDebugInfo,
    showDebug,
    startTracking,
    startEyePos,
  };
}
