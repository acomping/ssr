import createApp from "./src/app";

const { app, router } = createApp();
export default context => new Promise((resolve, reject) => {
    //进入首屏
    router.push(context.url);
    router.onReady(() => {
        resolve(app);
    }, reject)
})
