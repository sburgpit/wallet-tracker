import { type Featuers, featuresList } from '../../config/features'

export const useFeatureToggle = (feature: Featuers) => featuresList[feature]
