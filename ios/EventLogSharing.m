//
//  EventLogSharing.m
//  test1
//
//  Created by Guillermo Guevara on 31-03-25.
//

#import <React/RCTBridgeModule.h>

@interface RCT_EXTERN_MODULE(EventLogSharing, NSObject)

RCT_EXTERN_METHOD(saveEventLog:(NSString *)logText
                  resolver:(RCTPromiseResolveBlock)resolve
                  rejecter:(RCTPromiseRejectBlock)reject)

@end
