declare module 'react-native-config' {
  export interface NativeConfig {
    GITHUB_TOKEN?: string;
  }

  export const Config: NativeConfig;
  export default Config;
}
