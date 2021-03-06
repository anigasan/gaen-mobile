import React from "react"
import { View, StyleSheet } from "react-native"
import { Trans, useTranslation } from "react-i18next"

import {
  QUESTION_KEY_AGREE,
  SCREEN_TYPE_RADIO,
  SCREEN_TYPE_EMERGENCY,
} from "./constants"
import survey_en from "./survey.en.json"
import { Info } from "./Info"
import { InfoText } from "./InfoText"
import { Button } from "./Button"
import { RTLEnabledText } from "../components/RTLEnabledText"

import { Colors } from "../styles"

/** @type {React.FunctionComponent<{}>} */
export const EmergencyAssessment = ({ navigation }) => {
  const { t } = useTranslation()
  const survey = survey_en

  console.log(survey)

  const handleAgreePress = () => {
    navigation.push(SCREEN_TYPE_EMERGENCY)
  }

  const handleDisagreePress = () => {
    // TODO: This question handling is a mess and should be refactored
    // to support dynamic questions
    navigation.push("AssessmentQuestion", {
      question: agreeQuestion,
      option: agreeOption,
    })
  }

  return (
    <Info
      backgroundColor={Colors.surveyPrimaryBackground}
      footer={
        <ChoiceButtons
          agreePress={handleAgreePress}
          agreeTitle={
            <TranslationButtonText
              translator={t}
              text={"assessment.agree_option_agree"}
            />
          }
          disagreePress={handleDisagreePress}
          disagreeTitle={
            <TranslationButtonText
              translator={t}
              text={"assessment.agree_option_disagree"}
            />
          }
        />
      }
    >
      <InfoText
        useTitleStyle="headline2"
        title={t("assessment.agree_question_text")}
        description={t("assessment.agree_question_description")}
      />
    </Info>
  )
}

//TODO: we should map these for like multi choices and stuff
const ChoiceButtons = ({
  agreeTitle,
  disagreeTitle,
  agreePress,
  disagreePress,
}) => {
  return (
    <View>
      <Button
        textStyle={styles.choiceTextStyle}
        buttonStyle={styles.choiceButtonsStyle}
        onPress={agreePress}
        title={agreeTitle}
        backgroundColor={Colors.white}
        textColor={Colors.black}
      />
      <View style={styles.disagreeButtonContainerStyle}>
        <Button
          textStyle={styles.choiceTextStyle}
          buttonStyle={styles.choiceButtonsStyle}
          onPress={disagreePress}
          title={disagreeTitle}
          backgroundColor={Colors.white}
          textColor={Colors.black}
        />
      </View>
    </View>
  )
}

const TranslationButtonText = ({ translator, text }) => (
  <Trans t={translator} i18nKey={text}>
    <RTLEnabledText />
    <RTLEnabledText style={{ fontWeight: "bold" }} />
  </Trans>
)

/** @type {SurveyQuestion} */
const agreeQuestion = {
  option_key: QUESTION_KEY_AGREE,
  //question_description: 'How old are you',
  question_key: QUESTION_KEY_AGREE,
  question_text: "How old are you?",
  question_type: "TEXT",
  required: false,
  screen_type: SCREEN_TYPE_RADIO,
}

/** @type {SurveyOption} */
const agreeOption = {
  key: QUESTION_KEY_AGREE,
  values: [
    {
      label: "< 18",
      value: "0",
    },
    {
      label: "19-29",
      value: "1",
    },
    {
      label: "30-39",
      value: "2",
    },
    {
      label: "40-49",
      value: "3",
    },
    {
      label: "50-59",
      value: "4",
    },
    {
      label: "60-69",
      value: "5",
    },
    {
      label: "70-79",
      value: "6",
    },
    {
      label: "80+",
      value: "7",
    },
    {
      label: "Choose not to answer",
      value: "8",
    },
  ],
}

const styles = StyleSheet.create({
  choiceTextStyle: {
    textAlign: "left",
    paddingHorizontal: 30,
  },
  choiceButtonsStyle: {
    borderWidth: 1,
    borderColor: Colors.steelGray,
  },
  disagreeButtonContainerStyle: {
    paddingTop: 10,
  },
})
