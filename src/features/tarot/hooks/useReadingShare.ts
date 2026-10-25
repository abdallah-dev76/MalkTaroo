import { useRef, useState } from 'react';
import { Alert } from 'react-native';
import type { Image, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { captureAndShareView } from '@common/utils/shareView';
import type { TarotReadingType } from '@store/slices/tarotSlice';
import { getReadingShareText } from '../utils/readingPresentation';

export const useReadingShare = <Target extends View | Image>(
  type: TarotReadingType,
  cardIds: string[],
  ready: boolean,
) => {
  const captureTarget = useRef<Target>(null);
  const pending = useRef(false);
  const [isSharing, setIsSharing] = useState(false);
  const { t } = useTranslation();
  const share = async () => {
    if (!ready || pending.current || !captureTarget.current) {
      return;
    }
    pending.current = true;
    setIsSharing(true);
    try {
      await captureAndShareView(
        captureTarget,
        getReadingShareText(type, cardIds, t),
      );
    } catch {
      Alert.alert(t('shareFailed'), t('shareFailedDescription'));
    } finally {
      pending.current = false;
      setIsSharing(false);
    }
  };
  return { captureTarget, isSharing, share };
};
