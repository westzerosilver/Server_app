#include <SoftwareSerial.h>
#include <DFRobot_DHT11.h>

#define BT_RXD 2
#define BT_TXD 3
#define DHT11_PIN 10

// 온도, 습도값 저장할 변수
int temp = 0; 
int humi = 0;



DFRobot_DHT11 DHT;
SoftwareSerial bluetooth(BT_RXD, BT_TXD);   
 
void setup() {
  // 시리얼, 블루투스 통신 시작: 속도를 9600으로 설정
  Serial.begin(9600);
  bluetooth.begin(9600);
}
 
void loop() {
   
  DHT.read(DHT11_PIN);              // 온도,습도 모듈 값 읽기 

  temp = DHT.temperature + 200;      // 온도 값 받아오기 
  Serial.write(temp);                // 시리얼 통신으로 컴퓨터에 전달 
  bluetooth.println(temp);           // 블루투스를 통해 라즈베리파이로 전달 
  
  humi = DHT.humidity;              // 습도 값 받아오기
  Serial.write(humi);               
  bluetooth.println(humi);
  delay(10000);                     // 10초 대기 
}
