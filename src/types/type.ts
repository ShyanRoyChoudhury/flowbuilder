export type Node<T, U extends string> = {
    id: string;
    position: XYPosition;
    data: T;
    type?: U;
    sourcePosition?: Position;
    targetPosition?: Position;
    hidden?: boolean;
    selected?: boolean;
    dragging?: boolean;
    draggable?: boolean;
    selectable?: boolean;
    connectable?: boolean;
    resizing?: boolean;
    deletable?: boolean;
    dragHandle?: string;
    width?: number | null;
    height?: number | null;
    parentNode?: string;
    zIndex?: number;
    extent?: 'parent' | CoordinateExtent;
    expandParent?: boolean;
    positionAbsolute?: XYPosition;
    ariaLabel?: string;
    focusable?: boolean;
    style?: React.CSSProperties;
    className?: string;
  };
  
  export enum Position {
    Left = 'left',
    Top = 'top',
    Right = 'right',
    Bottom = 'bottom',
  }
  
  export type CoordinateExtent = [[number, number], [number, number]];
  
  export type XYPosition = {
    x: number;
    y: number;
  };