const express = require('express');
const clc = require('cli-color')
const { createBundleRenderer } = require('vue-server-renderer')
const path = require('path')
const fs = require("fs");


const server = express();
const pathResolve = _path =>path.resolve(__dirname,_path);

const serverBundle = require(pathResolve('../dist/server/vue-ssr-server-bundle.json'));
const clientManifest = require(pathResolve('../dist/client/vue-ssr-client-manifest.json'));
const renderer = createBundleRenderer(serverBundle,{
    runInNewContext:false,
    template : fs.readFileSync(pathResolve('../public/index.temp.html'),'utf-8'),
    clientManifest
})

server.use(express.static(pathResolve('../dist/client'),{index:false}));

server.get('*',async (req,res)=>{
    try {
        const context = {
            url:req.url,
            title:'标题',
            metas:'我的页面',
        };
        const html = await renderer.renderToString(context);
        res.send(html)
    } catch (error) {
        console.log(error);
        res.status(500).send('服务出错')
    }
})

server.listen(3000, () => {
    console.log(clc.green.underline('渲染服务器启动成功'));
})