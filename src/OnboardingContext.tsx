import React, {
  createContext,
  useState,
  useContext,
  FunctionComponent,
} from "react"

import { StorageUtils } from "./utils"

export const isOnboardingComplete = async (): Promise<boolean> => {
  return await StorageUtils.getIsOnboardingComplete()
}

interface OnboardingContextState {
  isComplete: boolean
  setOnboardingIsComplete: () => void
}

const OnboardingContext = createContext<OnboardingContextState | undefined>(
  undefined,
)

interface OnboardingProviderProps {
  onboardingIsComplete: boolean
}

export const OnboardingProvider: FunctionComponent<OnboardingProviderProps> = ({
  children,
  onboardingIsComplete,
}) => {
  const [isComplete, setIsComplete] = useState<boolean>(onboardingIsComplete)

  const setOnboardingIsComplete = () => {
    StorageUtils.setIsOnboardingComplete()
    setIsComplete(true)
  }

  return (
    <OnboardingContext.Provider value={{ isComplete, setOnboardingIsComplete }}>
      {children}
    </OnboardingContext.Provider>
  )
}

export const useOnboardingContext = (): OnboardingContextState => {
  const context = useContext(OnboardingContext)
  if (context === undefined) {
    throw new Error("OnboardingContext must be used with a provider")
  }
  return context
}
