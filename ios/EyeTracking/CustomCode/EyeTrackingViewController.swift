//
//  EyeTrackingViewController.swift
//  oculo
//  Created by Krunal Panchal on 07/07/23.
//

import UIKit

@objcMembers class EyeTrackingViewController: EyeTrackViewController {
  var eyeTrackController: EyeTrackController!
  
  override func viewDidLoad() {
    // This is not working.
    print("Eye Tracking: View Did Load")
    super.viewDidLoad()
  }
  
  override func viewWillAppear(_ animated: Bool) {
    print("Eye Tracking: View Will Appear")
    // super.viewWillAppear(animated)
  }
  
  override func viewDidAppear(_ animated: Bool) {
    print("Eye Tracking: View Did Appear")
    super.viewDidAppear(animated)
  }
  
  override func viewWillDisappear(_ animated: Bool) {
    print("Eye Tracking: View Will Disappear")
    super.viewWillDisappear(animated)
  }
  
  // InitEyeTracking: This function initiates EyeTracking
  public func initEyeTracking() {
    self.eyeTrackController = EyeTrackController(device: Device(type: .iPhone11), smoothingRange: 10, blinkThreshold: .infinity, isHidden: false)
    self.eyeTrackController.onUpdate = { info in
      guard let point = info?.centerEyeLookAtPoint else { return }
      
      // Let's build the Event Data
      let eventData: [String: Any] = [
        "faceRotation": [ "x": info?.faceRotaion.x, "y": info?.faceRotaion.y, "z": info?.faceRotaion.z, "w": info?.faceRotaion.w ],
        "facePosition": [ "x": info?.facePosition.x, "y": info?.facePosition.y, "z": info?.facePosition.z ],
        "deviceRotation": [ "x": info?.deviceRotation.x, "y": info?.deviceRotation.y, "z": info?.deviceRotation.z, "w": info?.deviceRotation.w ],
        "devicePosition": [ "x": info?.devicePosition.x, "y": info?.devicePosition.y, "z": info?.devicePosition.z ],
        "rightEyePosition": [ "x": info?.rightEyePotision.x, "y": info?.rightEyePotision.y, "z": info?.rightEyePotision.z ],
        "leftEyePosition": [ "x": info?.leftEyePotision.x, "y": info?.leftEyePotision.y, "z": info?.leftEyePotision.z ],
        "rightEyeLookAtPosition": [ "x": info?.rightEyeLookAtPosition.x, "y": info?.rightEyeLookAtPosition.y, "z": info?.rightEyeLookAtPosition.z ],
        "leftEyeLookAtPosition": [ "x": info?.leftEyeLookAtPosition.x, "y": info?.leftEyeLookAtPosition.y, "z": info?.leftEyeLookAtPosition.z ],
        "rightEyeLookAtPoint": [ "x": info?.rightEyeLookAtPoint.x, "y": info?.rightEyeLookAtPoint.y ],
        "leftEyeLookAtPoint":[ "x": info?.leftEyeLookAtPoint.x, "y": info?.leftEyeLookAtPoint.y ],
        "centerEyeLookAtPoint":[ "x": info?.centerEyeLookAtPoint.x, "y": info?.centerEyeLookAtPoint.y ],
        "rightEyeBlink": info?.rightEyeBlink,
        "leftEyeBlink": info?.leftEyeBlink,
        "rightEyeDistance": info?.rightEyeDistance,
        "leftEyeDistance": info?.leftEyeDistance
      ];
      
      // Let's pass the Event Data to Javascript
      EyeTrackingEventEmitter.emitter.sendEvent(withName: "tracking", body: eventData)
    }
    self.initialize(eyeTrack: eyeTrackController.eyeTrack)
  }
  
  // To be implemented Correctly
  public func stopEyeTracking() {
    print("Stop Tracking Stop Record Called")
    self.eyeTrackController.stopRecord()
    self.stopRecord()
  }
}
