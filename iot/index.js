var express = require('express');
var http = require('http');

var app = express();
var path = require('path');
 
var server = http.createServer(app);
const mysql = require('mysql');

// 온도, 습도 변수
var temp = 0;
var humi = 0;
var last_temp = 0;
var last_humi = 0;

server.listen(3000);


// mysql 접속 설정
const conn = {  
    host: '127.0.0.1',
    port: '3306',
    user: 'root',
    password: 'password',
    database: 'arduino'
};

// DB 접속
let connection = mysql.createConnection(conn); // DB 커넥션 생성


// 온도, 습도 값 받는 함수
function receiveData(value) {
    if (value > 100){
        temp = value - 200;
    }
    else {
        humi = value;
    }
}

// 데이터 삽입 함수
function insertValueIntoDatabase() {   
    var sql = `INSERT INTO ArduinoTB (temperature,humidity) VALUES (${temp}, ${humi});`;
    connection.query(sql, function (err, result) {
        if (err)
            console.error(err);
        last_temp = temp;
        last_humi = humi;
        temp = 0;
        humi = 0;
    });
}




// ------------------- Serial --------------------


const { SerialPort } = require('serialport')

const serialport = new SerialPort({ path: '/dev/cu.usbmodem21101', baudRate: 9600 })

serialport.write('ROBOT POWER ON')


serialport.on('open', function () {
    console.log('open serial communication');
})

serialport.on('data', function(data) { 
    console.log(data[0]); 
    receiveData(data[0]);
    if(temp != 0 && humi != 0) {
        insertValueIntoDatabase();
    }
    
}); 




// ------------------- Server --------------------

app.get('*', (request, response) => {
    response.set({
        'temp' : last_temp,
        'humi' : last_humi
    });

    response.send(
        `<h1>온도: ${last_temp}</h1>
        <h1>습도: ${last_humi}</h1>`
    );
});


app.listen(52273, () => {
    console.log('http://127.0.0.1:52273');
});