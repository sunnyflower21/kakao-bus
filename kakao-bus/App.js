import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  RefreshControl,
  SafeAreaView,
  SectionList,
  StyleSheet,
  Switch,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { SimpleLineIcons } from "@expo/vector-icons";

import BusInfo from "./src/BusInfo";
import { COLOR } from "./src/color";
import { useTheme } from "./src/use-theme";
import Margin from "./src/Margin";
import BookmarkButton from "./src/BookmarkButton";
import {
  busStop,
  getBusNumColorByType,
  getRemainedTimeText,
  getSeatStatusText,
  getSections,
} from "./src/data";

const busStopBookmarkSize = 20;
const busStopBookmarkPadding = 6;

export default function App() {
  const sections = getSections(busStop.buses);
  const [now, setNow] = useState(dayjs());
  const [refreshing, setRefreshing] = useState(false);

  const { NEWCOLOR, isDark, toggleIsDark } = useTheme();

  useEffect(() => {
    const interval = setInterval(() => {
      const newNow = dayjs();
      setNow(newNow);
    }, 5000);
    //unmount 할 때
    return () => {
      clearInterval(interval);
    };
  }, []);
  const onPressBusStopBookmark = () => {};

  const ListHeaderComponent = () => {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: NEWCOLOR.GRAY_3_GRAY_2,
          height: 170,
        }}
      >
        <Margin height={10}></Margin>

        <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 13 }}>
          {busStop.id}
        </Text>
        <Text style={{ color: NEWCOLOR.WHITE_BLACK, fontSize: 20 }}>
          {busStop.name}
        </Text>
        <Margin height={4}></Margin>

        <Text style={{ color: NEWCOLOR.GRAY_1_GRAY_4, fontSize: 14 }}>
          {busStop.directionDescription}
        </Text>
        <Margin height={20}></Margin>
        <BookmarkButton
          NEWCOLOR={NEWCOLOR}
          size={busStopBookmarkSize}
          isBookmarked={true}
          onPress={onPressBusStopBookmark}
          style={{
            borderWidth: 0.3,
            borderColor: NEWCOLOR.GRAY_1_GRAY_4,
            borderRadius:
              busStopBookmarkSize + (busStopBookmarkPadding * 2) / 2,
            padding: busStopBookmarkPadding,
          }}
        ></BookmarkButton>
        <Margin height={25}></Margin>
        {/* <Switch value={isDark} onValueChange={(v) => toggleIsDark()}></Switch> */}
      </View>
    );
  };

  const renderSectionHeader = ({ section: { title } }) => (
    <View
      style={{
        paddingLeft: 13,
        paddingVertical: 3,
        backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
        borderTopWidth: 0.5,
        borderBottomWidth: 0.5,
        borderTopColor: NEWCOLOR.GRAY_2_GRAY_3,
        borderBottomColor: NEWCOLOR.GRAY_2_GRAY_3,
      }}
    >
      <Text style={{ color: NEWCOLOR.GRAY_4_GRAY_1, fontSize: 12 }}>
        {title}
      </Text>
    </View>
  );
  const ItemSeparatorComponent = () => {
    return (
      <View
        style={{
          width: "100%",
          height: 1,
          backgroundColor: NEWCOLOR.GRAY_1_GRAY_4,
        }}
      ></View>
    );
  };

  const ListFooterComponent = () => {
    return <Margin height={30}></Margin>;
  };

  const onRefresh = () => {
    setNow(dayjs());
    setRefreshing(true);
  };

  useEffect(() => {
    if (refreshing) {
      setTimeout(() => {
        //API refech 완료
        setRefreshing(false);
      }, 3000);
    }
  }, [refreshing]);

  const renderItem = ({ item: bus }) => {
    const numColor = getBusNumColorByType(bus.type);
    /**
     * Start
     */
    // undefined ?? null -> null
    // { ... } ?? null -> { ... }
    const firstNextBusInfo = bus.nextBusInfos?.[0] ?? null;
    const secondNextBusInfo = bus.nextBusInfos?.[1] ?? null;
    const newNextBusInfos =
      !firstNextBusInfo && !secondNextBusInfo
        ? [null]
        : [firstNextBusInfo, secondNextBusInfo];

    // if (bus.num === 2000) {
    //   console.log(bus.num, 'newNextBusInfos', newNextBusInfos); // TODO: 확인
    // }

    const processedNextBusInfos = newNextBusInfos.map((info) => {
      if (!info)
        return {
          hasInfo: false,
          remainedTimeText: "도착 정보 없음",
        };

      const { arrivalTime, numOfRemainedStops, numOfPassengers } = info;
      const remainedTimeText = getRemainedTimeText(now, arrivalTime);
      const seatStatusText = getSeatStatusText(bus.type, numOfPassengers);
      return {
        hasInfo: true,
        remainedTimeText,
        numOfRemainedStops,
        seatStatusText,
      };
    });
    /**
     * End
     */

    return (
      <BusInfo
        isBookmarked={bus.isBookmarked}
        onPressBookmark={() => {}}
        num={bus.num}
        directionDescription={bus.directionDescription}
        numColor={numColor}
        processedNextBusInfos={processedNextBusInfos}
      ></BusInfo>
    );
  };
  return (
    <View style={styles.container}>
      <View style={{ backgroundColor: NEWCOLOR.GRAY_3_GRAY_2, width: "100%" }}>
        <SafeAreaView
          style={{ flexDirection: "row", justifyContent: "space-between" }}
        >
          <TouchableOpacity style={{ padding: 10 }}>
            <SimpleLineIcons
              name="arrow-left"
              size={20}
              color={NEWCOLOR.WHITE_BLACK}
            ></SimpleLineIcons>
          </TouchableOpacity>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <TouchableOpacity style={{ padding: 10 }}>
              <SimpleLineIcons
                name="home"
                size={20}
                color={NEWCOLOR.WHITE_BLACK}
              ></SimpleLineIcons>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
        <View
          style={{
            position: "absolute",
            zIndex: -1,
            width: "100%",
            height: 400,
            backgroundColor: NEWCOLOR.GRAY_3_GRAY_2,
          }}
        ></View>
      </View>
      <SectionList
        sections={sections}
        ListHeaderComponent={ListHeaderComponent}
        renderSectionHeader={renderSectionHeader}
        ItemSeparatorComponent={ItemSeparatorComponent}
        renderItem={renderItem}
        ListFooterComponent={ListFooterComponent}
        refreshControl={
          <RefreshControl
            onRefresh={onRefresh}
            refreshing={refreshing}
          ></RefreshControl>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
});
