
const imgPath = `http://3dmaas.farsee2.com/image/api/v1/images/`
const ossUrl1 = `http://3dmaas.farsee2.com/oss/v1/AUTH_`//oss模型地址线上
const ossUrl = `http://192.168.1.246/oss/v1/AUTH_`//测试oss模型地址线上


/***************************************************************/

// const testUrl = `192.168.1.197:8833/police-recognition/websocket`//图片流地址
const testUrl = `192.168.1.71:8877/police-recognition/websocket`

//const testUrl1 = `http://192.168.1.196:9088/`//公安测试swagger
 const testUrl1 = `http://192.168.1.71:9089/`
 
 const testUrl2 = `http://192.168.1.197:8877`

const roleUrl = `http://192.168.1.244:18000/`//角色接口

// const recordUrl = `http://192.168.1.197:8833`//历史记录
const recordUrl = `http://192.168.1.71:8877`;

const imgUrl = `http://192.168.1.246/image/api/v1/images/`;//图片服务器

export{
    testUrl,
    testUrl1,
    testUrl2,
    roleUrl,
    imgPath,
    ossUrl,
    ossUrl1,
    recordUrl,
    oss,
    imgUrl
}
