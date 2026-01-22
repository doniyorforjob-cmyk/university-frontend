import * as React from 'react';

// Asosiy IconType ni react-icons dan olamiz
// eslint-disable-next-line import/named
import { IconType as OriginalIconType } from 'react-icons';

declare module 'react-icons/lib' {
  export const IconContext: React.Context<{
    color?: string;
    size?: string;
    className?: string;
    attr?: React.SVGAttributes<SVGElement>;
  }>;

  export interface IconTree {
    tag: string;
    attr: { [key: string]: string };
    child: IconTree[];
  }

  export function GenIcon(data: IconTree): (props: IconBaseProps) => React.ReactElement;

  export interface IconBaseProps extends React.SVGAttributes<SVGElement> {
    children?: React.ReactNode;
    size?: string | number;
    color?: string;
    title?: string;
  }

  export type IconType = OriginalIconType; // Bu yerda OriginalIconType ishlatamiz

  export function IconBase(props: IconBaseProps & { attr?: Record<string, unknown> }): React.ReactElement;
}

// react-icons/fa uchun
declare module 'react-icons/fa' {
  export * from 'react-icons/fa/index';
  export const __esModule: true;

  // XATO: export const default: IconType;
  // TO'G'RI:
  const FaModule: {
    [key: string]: any;
    default?: any;
  };
  export default FaModule;
}

// react-icons/fa6 uchun
declare module 'react-icons/fa6' {
  export * from 'react-icons/fa6/index';
  export const __esModule: true;

  const Fa6Module: {
    [key: string]: any;
    default?: any;
  };
  export default Fa6Module;
}