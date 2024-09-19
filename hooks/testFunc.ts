'use server'

export async function testServer() {
  await new Promise((resolve) => {
    setTimeout(() => {
      console.log('server hit');
      resolve(null);
    }, 2000);
  });
  return;
}

