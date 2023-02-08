import { View, Text } from "react-native";
import AlarmButton from "./AlarmButton";
import BookmarkButton from "./BookmarkButton";
import NextBusInfo from "./NextBusInfo";
import { useTheme } from "./use-theme";

export default ({
  isBookmarked,
  onPressBookmark,
  num,
  directionDescription,
  numColor,
  process,
  processedNextBusInfos,
}) => {
  const { NEWCOLOR } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        height: 75,
        backgroundColor: NEWCOLOR.WHITE_BLACK,
      }}
    >
      <View style={{ flex: 0.85, flexDirection: "row", alignItems: "center" }}>
        {/* 북마크 */}
        <BookmarkButton
          size={20}
          NEWCOLOR={NEWCOLOR}
          isBookmarked={isBookmarked}
          onPress={onPressBookmark}
          style={{ paddingHorizontal: 10 }}
        ></BookmarkButton>
        <View style={{ flex: 1 }}>
          {/* 버스 번호와 방향 */}
          <Text style={{ color: numColor, fontSize: 20 }}>{num}</Text>
          <Text
            style={{
              color: NEWCOLOR.GRAY_3_GRAY_2,
              fontSize: 13,
              marginRight: 5,
            }}
          >
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
              NEWCOLOR={NEWCOLOR}
            />
          ))}
        </View>
      </View>
      <AlarmButton
        NEWCOLOR={NEWCOLOR}
        onPress={() => {}}
        style={{ paddingHorizontal: 15 }}
      ></AlarmButton>
    </View>
  );
};
