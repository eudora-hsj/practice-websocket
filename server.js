//import express 和 ws 套件
const express = require('express')
const SocketServer = require('ws').Server

const PORT = 3000 //指定 port

//創建 express 物件，綁定監聽  port , 設定開啟後在 console 中提示
const server = express()
    .listen(PORT, () => console.log(`Listening on ${PORT}`))
//將 express 交給 SocketServer 開啟 WebSocket 的服務
const wss = new SocketServer({ server })
//當 WebSocket 從外部連結時執行
wss.on('connection', ws => {
    console.log('Client connected')
    ws.on('message', data => {

        data = data.toString()  // 收回來是 Buffer 格式、需轉成字串
        /// 單一發送： ws.send(data)

        let clients = wss.clients  //取得所有連接中的 client

        clients.forEach(client => {
            client.send(data)  // 發送至每個 client
        })
        
    })
    ws.on('close', () => {
        console.log('Close connected')
    })
})