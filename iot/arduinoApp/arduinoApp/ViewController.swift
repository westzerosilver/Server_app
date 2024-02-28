//
//  ViewController.swift
//  arduinoApp
//
//  Created by yeseo on 2023/08/16.
//

import UIKit
import Alamofire

class ViewController: UIViewController {
    
    @IBOutlet weak var label_temp: UILabel!
    @IBOutlet weak var label_humi: UILabel!
    
    // 온도, 습도 받아올 변수
    var temp = "";
    var humi = "";
    
    // 타이머 관련 변수
    var timer = Timer()

    override func viewDidLoad() {
        super.viewDidLoad()
        // Do any additional setup after loading the view.
        //getData();
        timer = Timer.scheduledTimer(timeInterval: 10, target: self,
                selector: #selector(getData), userInfo: nil, repeats: true)
    }
    
    

    @objc func getData(){
        
        AF.request("http://127.0.0.1:52273").response { response in
            //
            self.humi = String((response.response?.value(forHTTPHeaderField: "humi"))!);
            debugPrint(self.humi);
            self.label_humi.text = self.humi;
            self.temp = String((response.response?.value(forHTTPHeaderField: "temp"))!);
            debugPrint(self.temp);
            self.label_temp.text = self.temp;
        }
        
    }
}

