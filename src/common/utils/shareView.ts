import type { RefObject } from 'react';
import { Share } from 'react-native';
import type { Image, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

type CaptureTarget = RefObject<View | Image | null>;
export type ViewShareResult = 'unavailable' | 'dismissed' | 'shared';

export const captureAndShareView = async (
  target: CaptureTarget,
  message: string,
): Promise<ViewShareResult> => {
  if (!target.current) {
    return 'unavailable';
  }
  const url = await captureRef(target.current, { format: 'png' });
  const result = await Share.share({ url, message });
  return result.action === Share.dismissedAction ? 'dismissed' : 'shared';
};

export const shareResultView = async (
  target: CaptureTarget,
  message: string,
) => {
  try {
    await captureAndShareView(target, message);
  } catch {
    console.log('Failed to share the result view');
  }
};
