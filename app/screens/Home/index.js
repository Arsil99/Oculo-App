import { View, Text, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import styles from "./styles";
import { Images } from "@config";
import TabSwitch from "@components/TabSwitch";
import Button from "@components/Button";

import CardList from "@components/CardList";
import HeaderBar from "@components/HeaderBar";
import { logout } from "@utils/CommonFunction";
import Milestones from "@components/Milestones";
export default function Home({ navigation }) {
  const switchOptions = [
    { id: "summary", name: "Summary" },
    { id: "details", name: "Details" },
  ];

  const [activeTab, setActiveTab] = useState({
    id: "summary",
    name: "Summary",
  });

  return (
    // MAIN CONTAINER
    <View style={styles.main}>
      {/* TOP HEADER  */}
      <View style={styles.topBar}>
        <View>
          <Image
            source={Images.avatar}
            style={{ height: 60, width: 60, borderRadius: 30 }}
          />
        </View>
        <View style={styles.title}>
          <Text style={styles.name}>Hi, Arsil</Text>
          <Text style={styles.welcomeText}>Welcome to Oculo</Text>
        </View>
      </View>

      {/* SWITCH TAB */}
      <TabSwitch
        tabs={switchOptions}
        activeTab={activeTab}
        onTabChange={(currentTab) => {
          setActiveTab(currentTab);
        }}
      />

      {/* ACTIVE TAB AREA */}
      {activeTab?.id === "summary" ? (
        <View style={styles.summaryArea}>
          {/* MAP IN SUMMARY */}
          <TouchableOpacity
            onPress={() => {
              logout();
            }}
          >
            <Image
              source={Images.demoSummary}
              style={{ height: 320, width: 320 }}
            />
          </TouchableOpacity>
          <View style={styles.summaryText}>
            <Text style={[styles.descText, { marginTop: 15 }]}>Baseline</Text>
            <Text style={styles.descText}>
              Comparision requires other assessments to compare with the
              baseline
            </Text>
          </View>

          <Button
            shape="round"
            title={"Request Another Baseline"}
            style={styles.requestBtn}
            // onPress={validation}
            // loading={loader}
          />
        </View>
      ) : (
        <View style={styles.detailsArea}>
          <Milestones />
        </View>
      )}
    </View>
  );
}
