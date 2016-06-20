/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import <UIKit/UIKit.h>

@interface AppDelegate : UIResponder <UIApplicationDelegate>

@property (nonatomic, strong) UIWindow *window;

@end

static NSString *appKey = @"c34cdf4edb200b02eb8e6f22";     //填写appkey
static NSString *channel = @"";    //填写channel   一般为nil
static BOOL isProduction = false;  //填写isProdurion  平时测试时为false ，生产时填写true