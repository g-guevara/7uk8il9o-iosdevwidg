//
//  EventLogSharing.h
//  test1
//
//  Created by Guillermo Guevara on 31-03-25.
//

import Foundation
import WidgetKit

@objc(EventLogSharing)
class EventLogSharing: NSObject {
  
  @objc(saveEventLog:resolver:rejecter:)
  func saveEventLog(_ logText: String, resolver resolve: @escaping RCTPromiseResolveBlock, rejecter reject: @escaping RCTPromiseRejectBlock) -> Void {
    
    // Guardar el texto del log en el almacenamiento compartido
    guard let userDefaults = UserDefaults(suiteName: "group.com.anonymous.test1") else {
      reject("ERROR", "No se pudo acceder al almacenamiento compartido", nil)
      return
    }
    
    userDefaults.set(logText, forKey: "eventLogText")
    userDefaults.synchronize()
    
    // Solicitar actualización del widget
    WidgetCenter.shared.reloadAllTimelines()
    
    resolve(true)
  }
  
  // Requerido para módulos nativos
  @objc
  static func requiresMainQueueSetup() -> Bool {
    return false
  }
}
