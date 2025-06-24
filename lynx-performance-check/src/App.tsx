import { useMainThreadRef, useState } from "@lynx-js/react";
import type { MainThread, ScrollEvent } from "@lynx-js/types";

export function App() {
  const [posStyle, setPosStyle] = useState({ x: 0, y: 500 });

  const tracerMTSRef = useMainThreadRef<MainThread.Element>(null);

  let onMainScroll = (event: ScrollEvent) => {
    "main thread";
    const detail = event.detail.scrollTop;
    const newPos = {
      x: 0,
      y: 500 - detail,
    };
    tracerMTSRef.current?.setStyleProperty(
      "transform",
      `translate(${newPos.x}px, ${newPos.y}px)`
    );
  };

  let onBackgroundScroll = (event: ScrollEvent) => {
    console.log("Background thread scroll", event.detail.scrollTop);

    const detail = event.detail.scrollTop;
    const newPos = {
      x: 0,
      y: 500 - detail,
    };
    setPosStyle(newPos);
  };

  return (
    <view
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        backgroundColor: "white",
      }}
    >
      <view style="display:linear;linear-direction:row;width:100%;height:100%">
        <scroll-view
          main-thread:bindscroll={onMainScroll}
          bindscroll={onBackgroundScroll}
          scroll-y
          style="display:linear;linear-direction:row;width:50%;height:100%"
        >
          <view style="background:yellow;width:100%;height:500px" />
          <view style="background:lightskyblue;width:100%;height:100px" />
          <view style="background:yellow;width:100%;height:1000px" />
        </scroll-view>
        <view style="width:25%;height:100%;display:linear;linear-direction:row;background:whitesmoke;">
          <view
            main-thread:ref={tracerMTSRef}
            style={{
              height: "100px",
              width: "100px",
              background: "lightskyblue",
              transform: `translate(0px, 500px)`,
            }}
          >
            <text>MTDraggable</text>
          </view>
        </view>
        <view style="width:25%;height:100%;display:linear;linear-direction:row;">
          <view
            style={{
              height: "100px",
              width: "100px",
              background: "lightskyblue",
              transform: `translate(${posStyle.x}px, ${posStyle.y}px)`,
            }}
          >
            <text>BGDraggable</text>
          </view>
        </view>
      </view>
    </view>
  );
}
