/**
 * TypeScript type definitions for Valentine's Day website
 */

export type DeviceType = 'desktop' | 'mobile' | 'tablet';

export interface DeviceInfo {
  isDesktop: boolean;
  deviceType: DeviceType;
}
