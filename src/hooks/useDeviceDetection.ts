import { useState, useEffect } from 'react';
import type { DeviceInfo } from '../types/index';

/**
 * useDeviceDetection - Detects device type using user agent
 * Returns desktop vs mobile/tablet information for conditional rendering
 */
export function useDeviceDetection(): DeviceInfo {
  const [deviceInfo, setDeviceInfo] = useState<DeviceInfo>(() => {
    // Check for testing override via URL parameter
    const params = new URLSearchParams(window.location.search);
    const forceDevice = params.get('device');

    if (forceDevice === 'mobile' || forceDevice === 'tablet') {
      return {
        isDesktop: false,
        deviceType: forceDevice as 'mobile' | 'tablet',
      };
    }

    // Initial detection on mount
    const userAgent = navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = mobileRegex.test(userAgent);

    // Determine device type
    let deviceType: DeviceInfo['deviceType'] = 'desktop';
    if (/iPad/i.test(userAgent)) {
      deviceType = 'tablet';
    } else if (isMobile) {
      deviceType = 'mobile';
    }

    return {
      isDesktop: !isMobile,
      deviceType,
    };
  });

  useEffect(() => {
    // Check for testing override via URL parameter
    const params = new URLSearchParams(window.location.search);
    const forceDevice = params.get('device');

    if (forceDevice === 'mobile' || forceDevice === 'tablet') {
      setDeviceInfo({
        isDesktop: false,
        deviceType: forceDevice as 'mobile' | 'tablet',
      });
      return;
    }

    // Detection logic (runs once on mount to confirm initial state)
    const userAgent = navigator.userAgent;
    const mobileRegex = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i;
    const isMobile = mobileRegex.test(userAgent);

    // Determine device type
    let deviceType: DeviceInfo['deviceType'] = 'desktop';
    if (/iPad/i.test(userAgent)) {
      deviceType = 'tablet';
    } else if (isMobile) {
      deviceType = 'mobile';
    }

    setDeviceInfo({
      isDesktop: !isMobile,
      deviceType,
    });

    // No event listeners needed - detection is static
  }, []);

  return deviceInfo;
}
