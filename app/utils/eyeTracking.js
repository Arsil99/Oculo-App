import { NativeModules } from 'react-native';
const { EyeTracking } = NativeModules;

// Init: Initiates the Eye Tracking
// Call this when you want to start trackinig the EyeGaze
export const init = () => {
  return new Promise(resolve => {
    // TODO: Adding Error Handling in Swift and JS
    EyeTracking.initTracking(result => {
      console.log('Result => ', result);
      console.log('Sym Called ===> Eye Tracking Started');
      resolve(true);
    });
  });
};

export const stopTracking = () => {
  EyeTracking.stopTracking(result => {
    console.log('Result => ', result);
  });
};

// Helper function to calculate screen X value
export const calculateScreenX = (eyeX, calibratedPositions, ViewWidth) => {
  const { TL, TR } = calibratedPositions;

  if (!TL || !TR) {
    return 0;
  }
  const minX = TL.avgX;
  const maxX = TR.avgX;
  const width = maxX - minX;
  const normalizedX = (eyeX - minX) / width;
  const screenX = normalizedX * ViewWidth;
  return screenX;
};

// Helper function to calculate screen Y value
export const calculateScreenY = (eyeY, calibratedPositions, ViewHeight) => {
  const { TL, BL } = calibratedPositions;

  if (!TL || !BL) {
    return 0;
  }
  const minY = TL.avgY;
  const maxY = BL.avgY;
  const height = maxY - minY;
  const normalizedY = (eyeY - minY) / height;
  const screenY = normalizedY * ViewHeight;
  return screenY;
};

export const calculateAveragePosition = (xArray, yArray) => {
  // Check if the arrays have the same length
  if (xArray.length !== yArray.length) {
    throw new Error('X and Y arrays must have the same length');
  }

  // Calculate the mean (average) of X and Y positions
  const meanX = xArray.reduce((acc, curr) => acc + curr, 0) / xArray.length;
  const meanY = yArray.reduce((acc, curr) => acc + curr, 0) / yArray.length;

  // Calculate the standard deviation of X and Y positions
  const stdDevX = Math.sqrt(
    xArray.reduce((acc, curr) => acc + (curr - meanX) ** 2, 0) / xArray.length,
  );
  const stdDevY = Math.sqrt(
    yArray.reduce((acc, curr) => acc + (curr - meanY) ** 2, 0) / yArray.length,
  );

  // Set the threshold for outlier removal (e.g., 2 times the standard deviation)
  const outlierThreshold = 2;

  // Remove outliers from X and Y arrays based on the threshold
  const filteredX = xArray.filter(
    x => Math.abs(x - meanX) <= outlierThreshold * stdDevX,
  );
  const filteredY = yArray.filter(
    y => Math.abs(y - meanY) <= outlierThreshold * stdDevY,
  );

  // Calculate the average X and Y positions from the filtered arrays
  const avgX =
    filteredX.reduce((acc, curr) => acc + curr, 0) / filteredX.length;
  const avgY =
    filteredY.reduce((acc, curr) => acc + curr, 0) / filteredY.length;

  // Return the average X and Y positions as an object
  return { x: avgX, y: avgY };
};
