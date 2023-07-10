//
//  EyeTrackingEventEmitter.swift
//  oculo
//
//  Created by Krunal Panchal on 10/07/23.
//

import Foundation


@objc(EyeTrackingEventEmitter)
open class EyeTrackingEventEmitter: RCTEventEmitter {

  public static var emitter: RCTEventEmitter!

  override init() {
    super.init()
    EyeTrackingEventEmitter.emitter = self
  }

  open override func supportedEvents() -> [String] {
    ["tracking", "onReady", "onPending", "onFailure"]      // etc.
  }
}
