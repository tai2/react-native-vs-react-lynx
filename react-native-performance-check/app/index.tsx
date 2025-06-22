import { useState } from "react";
import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const [pos, setPos] = useState(500);

  return (
    <View
      style={{ height: "100%", flexDirection: "row", backgroundColor: "white" }}
    >
      <ScrollView
        style={{ width: "50%", height: "100%", backgroundColor: "yellow" }}
        onScroll={(e) => {
          const y = e.nativeEvent.contentOffset.y;
          setPos(500 - y);
        }}
        scrollEventThrottle={16}
      >
        <View
          style={{
            width: "100%",
            height: 500,
          }}
        />
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "lightskyblue",
          }}
        />
        <View
          style={{
            width: "100%",
            height: 1000,
          }}
        />
      </ScrollView>
      <View
        style={{
          width: "50%",
          height: "100%",
        }}
      >
        <View
          style={{
            width: "100%",
            height: 100,
            backgroundColor: "lightskyblue",
            transform: `translateY(${pos}px)`,
          }}
        />
      </View>
    </View>
  );
}
