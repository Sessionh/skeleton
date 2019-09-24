const SkeletonBuilder = require('./src/skeletonCore');

const execPath = 'C:/Users/11974/AppData/Local/Google/Chrome/Application/chrome.exe'; // chrome 路径 
// const execPath = 'C:/Program Files (x86)/Google/Chrome/Application/chrome.exe'

// test code
const fs = require('fs');
let skeletonBuilder = new SkeletonBuilder({
    preview: false, // 是否调出浏览器
    isNext: true, // 预览 是否生成骨架屏
    defer: 5000,
    device: 'iPhone 6',
    loading: 'shine',
    image: {
        shape: 'rect',
        color: '#EFEFEF',
        shapeOpposite: [],
        fixedSize: true
    },
    execPath
}, console.log);



    (async () => {
        let detailPath = 'home' // 首页
        
        const baseUrl = 'http://192.168.1.166:8082/#/'
        let urlList = ['home', 'about']
       

        // const baseUrl = ' http://192.168.1.166:8090/?fMer=LYY2#/'
        // let urlList = ['index']

       
        let json = {}
      
        urlList.forEach(async (res, i) => {
            
            const result = await skeletonBuilder.build(baseUrl + res, res, detailPath);
            console.log('成功');
            let resultHtml = result.html
            resultHtml = resultHtml.replace(/\"/g, "'")
            if (res === detailPath) {
                await fs.writeFileSync(`./${res}.html`, result.html)

            } else {
                json[res] = resultHtml
                if (Object.keys(json).length === urlList.length - 1  || Object.keys(json).length === 1) {
                    fs.writeFileSync('./skeleton.js',`module.exports = ${JSON.stringify(json)}` );
                }

            }
           
            
            
        })

    
    })();



module.exports = {
    SkeletonBuilder
};
