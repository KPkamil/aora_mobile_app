export const handleError = (err: unknown) => {
  if (typeof err === "string") {
    console.error(err);
    throw new Error(err);
  }

  if (err instanceof Error) {
    console.error(err.message);
    throw err;
  }
};
