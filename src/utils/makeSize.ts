export const makeSize = (sizeInBytes: number): string => {
  if (sizeInBytes >= 1000 * 1000) {
    // Convert to megabytes
    return `${(sizeInBytes / (1000 * 1000)).toFixed(2)} mB`;
  } else if (sizeInBytes >= 1000) {
    // Convert to kilobytes
    return `${(sizeInBytes / 1000).toFixed(2)} kB`;
  } else {
    // Display in bytes
    return `${sizeInBytes} Bytes`;
  }
};
