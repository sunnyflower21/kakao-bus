import { View, Text } from "react-native";
import AlarmButton from "./AlarmButton";
import BookmarkButton from "./BookmarkButton";
import { COLOR } from "./color";
import NextBusInfo from "./NextBusInfo";

export default ({
  isBookmarked,
  onPressBookmark,
  num,
  directionDescription,
  numColor,
  process,
  processedNextBusInfos,
}) => {
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        {/* 북마크 */}
        <BookmarkButton
          isBookmarked={isBookmarked}
          onPress={onPressBookmark}
          style={{ paddingHorizontal: 10 }}
        ></BookmarkButton>
        <View style={{ flex: 1 }}>
          {/* 버스 번호와 방향 */}
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text style={{ color: COLOR.GRAY_3, fontSize: 13 }}>
            {directionDescription} 방향
          </Text>
        </View>
      </View>

      <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
        <View style={{ flex: 1 }}>
          {/* 볓 분 몇 초 볓번째 전 여유 */}
          {processedNextBusInfos.map((info, idx) => (
            <NextBusInfo
              key={`info-${idx}`}
              hasInfo={info.hasInfo}
              remainedTimeText={info.remainedTimeText}
              numOfRemainedStops={info.numOfRemainedStops}
              seatStatusText={info.seatStatusText}
            />
          ))}
        </View>
      </View>
      <AlarmButton
        onPress={() => {}}
        style={{ paddingHorizontal: 15 }}
      ></AlarmButton>
    </View>
  );
};
