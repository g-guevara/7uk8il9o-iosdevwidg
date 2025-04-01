//
//  AppEventWidgetLiveActivity.swift
//  AppEventWidget
//
//  Created by Guillermo Guevara on 31-03-25.
//

import ActivityKit
import WidgetKit
import SwiftUI

struct AppEventWidgetAttributes: ActivityAttributes {
    public struct ContentState: Codable, Hashable {
        // Dynamic stateful properties about your activity go here!
        var emoji: String
    }

    // Fixed non-changing properties about your activity go here!
    var name: String
}

struct AppEventWidgetLiveActivity: Widget {
    var body: some WidgetConfiguration {
        ActivityConfiguration(for: AppEventWidgetAttributes.self) { context in
            // Lock screen/banner UI goes here
            VStack {
                Text("Hello \(context.state.emoji)")
            }
            .activityBackgroundTint(Color.cyan)
            .activitySystemActionForegroundColor(Color.black)

        } dynamicIsland: { context in
            DynamicIsland {
                // Expanded UI goes here.  Compose the expanded UI through
                // various regions, like leading/trailing/center/bottom
                DynamicIslandExpandedRegion(.leading) {
                    Text("Leading")
                }
                DynamicIslandExpandedRegion(.trailing) {
                    Text("Trailing")
                }
                DynamicIslandExpandedRegion(.bottom) {
                    Text("Bottom \(context.state.emoji)")
                    // more content
                }
            } compactLeading: {
                Text("L")
            } compactTrailing: {
                Text("T \(context.state.emoji)")
            } minimal: {
                Text(context.state.emoji)
            }
            .widgetURL(URL(string: "http://www.apple.com"))
            .keylineTint(Color.red)
        }
    }
}

extension AppEventWidgetAttributes {
    fileprivate static var preview: AppEventWidgetAttributes {
        AppEventWidgetAttributes(name: "World")
    }
}

extension AppEventWidgetAttributes.ContentState {
    fileprivate static var smiley: AppEventWidgetAttributes.ContentState {
        AppEventWidgetAttributes.ContentState(emoji: "😀")
     }
     
     fileprivate static var starEyes: AppEventWidgetAttributes.ContentState {
         AppEventWidgetAttributes.ContentState(emoji: "🤩")
     }
}

#Preview("Notification", as: .content, using: AppEventWidgetAttributes.preview) {
   AppEventWidgetLiveActivity()
} contentStates: {
    AppEventWidgetAttributes.ContentState.smiley
    AppEventWidgetAttributes.ContentState.starEyes
}
