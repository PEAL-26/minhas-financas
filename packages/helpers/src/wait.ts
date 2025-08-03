export async function wait(time = 500) {
  await new Promise((resolve) => {
    setTimeout(resolve, time);
  });
}
