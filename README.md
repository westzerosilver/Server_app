# server_app

서버를 이용해 iOS앱과 라즈베리파이가 통신합니다.

1. 아두이노(iot_01)
  - 온도, 습도 값 측정
  - 블루투스로 라즈베리파이에 온도, 습도 값 전달
  - 시리얼 통신으로 pc에게 온도, 습도 값 전달

2. 서버(index.js)
  - 시리얼 통신으로 받은 온도, 습도 값을 DB에 저장
  - 온도, 습도 값을 앱에게 전달

3. 앱(arduino)
   - 서버에서 온도, 습도 값 받아옴
   - 화면에 온/습도 값 프린트


---- 참고 ----
라즈베리파이에서 블루투스 모듈 이용하기
: [https://blog.naver.com/oooiooop9988](https://blog.naver.com/oooiooop9988/223172387561)https://blog.naver.com/oooiooop9988/223172387561
