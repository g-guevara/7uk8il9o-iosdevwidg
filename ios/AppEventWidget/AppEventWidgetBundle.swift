//
//  AppEventWidgetBundle.swift
//  AppEventWidget
//
//  Created by Guillermo Guevara on 31-03-25.
//

import WidgetKit
import SwiftUI

@main
struct AppEventWidgetBundle: WidgetBundle {
    var body: some Widget {
        AppEventWidget()
        AppEventWidgetControl()
        AppEventWidgetLiveActivity()
    }
}
