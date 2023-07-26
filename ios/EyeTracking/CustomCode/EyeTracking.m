#import <Foundation/Foundation.h>
#import "React/RCTBridgeModule.h"


@interface RCT_EXTERN_MODULE(EyeTracking, NSObject)
  RCT_EXTERN_METHOD(initTracking:
    (RCTResponseSenderBlock) callback
  )
  RCT_EXTERN_METHOD(stopTracking:
    (RCTResponseSenderBlock) callback
  )
@end
