import React, { FunctionComponent } from "react"
import { StyleSheet, TouchableOpacity, View, ViewStyle } from "react-native"
import { SvgXml } from "react-native-svg"

import Icon from "../assets/svgs/check"
import { RTLEnabledText } from "../components/RTLEnabledText"
import {
  SCREEN_TYPE_CHECKBOX,
  SCREEN_TYPE_DATE,
  SCREEN_TYPE_RADIO,
} from "./constants"

import { Colors, Forms, Spacing, Typography } from "../styles"

interface OptionProps {
  isValidType: boolean
  isSelected: boolean
  inputType: string
  title: string
  onPress: () => void
}

const Option: FunctionComponent<OptionProps> = ({
  isValidType,
  isSelected,
  inputType,
  title,
  onPress,
}) => {
  return (
    <TouchableOpacity onPress={onPress} testID="option">
      <View style={[styles.container, isSelected && styles.containerSelected]}>
        <OptionSelect
          wrapperStyle={styles.primary}
          isValidType={isValidType}
          isSelected={isSelected}
          title={title}
          inputType={inputType}
          icon={Icon}
        />
      </View>
    </TouchableOpacity>
  )
}

interface OptionSelectProps
  extends Pick<
    OptionProps,
    "isValidType" | "isSelected" | "inputType" | "title"
  > {
  wrapperStyle: ViewStyle
  icon: string
}

const OptionSelect: FunctionComponent<OptionSelectProps> = ({
  wrapperStyle,
  isValidType,
  isSelected,
  inputType,
  icon,
  title,
}) => {
  const indicatorStyle =
    inputType === SCREEN_TYPE_CHECKBOX
      ? styles.indicatorCheck
      : styles.indicatorRadio

  return (
    <View style={wrapperStyle}>
      {isValidType && (
        <View style={[indicatorStyle, isSelected && styles.indicatorSelected]}>
          {isSelected && inputType === SCREEN_TYPE_CHECKBOX && (
            <SvgXml width={Spacing.medium} xml={icon} />
          )}
          {isSelected &&
            (inputType === SCREEN_TYPE_RADIO || inputType === SCREEN_TYPE_DATE)}
        </View>
      )}
      <RTLEnabledText style={styles.title} testID="label">
        {title}
      </RTLEnabledText>
    </View>
  )
}

const styles = StyleSheet.create({
  indicatorRadio: {
    ...Forms.inputIndicator,
    borderRadius: Spacing.medium * 2,
  },
  indicatorCheck: {
    ...Forms.inputIndicator,
    borderWidth: 2,
    borderRadius: Spacing.tiny,
  },
  indicatorSelected: {
    backgroundColor: Colors.secondaryBlue,
    borderColor: Colors.secondaryBlue,
  },
  title: {
    flex: 1,
    flexWrap: "wrap",
    ...Typography.inputLabel,
  },
  container: {
    backgroundColor: Colors.white,
    borderColor: Colors.secondaryBorder,
    borderRadius: Spacing.xxSmall,
    borderWidth: 2,
    marginBottom: Spacing.small,
    paddingHorizontal: Spacing.medium,
    paddingVertical: Spacing.medium,
  },
  containerSelected: {
    backgroundColor: Colors.secondaryBackground,
    borderColor: Colors.secondaryBlue,
  },
  primary: {
    alignItems: "flex-start",
    flexDirection: "row",
  },
})

export default Option
