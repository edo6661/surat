export const errorHandler = <T>(
  message: T,
  reason?: string,
  callback?: () => T
) => {
  console.error(`${message} ${reason ? `: ${reason}` : ""}`);
  if (callback) callback();
  throw new Error(`${message} ${reason ? `: ${reason}` : ""}`);
};
