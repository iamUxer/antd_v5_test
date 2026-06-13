import { Form } from 'antd';
import type { CSSProperties, ReactNode } from 'react';
import './SearchingCollapse.scss';

type SearchingCollapseProps = {
  children: ReactNode;
  className?: string;
  columnGrid?: 3 | 4 | 5;
  verticalLayout?: boolean;
  /**
   * vertical-layout에서 column-flow를 사용할 때 "컬럼당 아이템 몇 개씩 쌓을지"를 지정.
   * - 이 값이 있어야 다음 컬럼으로 넘어가며, 데이터 건수 변화에 맞춰 동적으로 계산해 전달한다.
   * - 예: 3컬럼에서 itemCount=12개면 Math.ceil(12 / 3) => 4
   */
  verticalRows?: number;
  scrollableHeight?: number;
  style?: CSSProperties;
};

export function SearchingCollapse({
  children,
  className,
  columnGrid,
  verticalLayout,
  verticalRows,
  scrollableHeight,
  style,
}: SearchingCollapseProps) {
  const columnGridClass =
    columnGrid != null ? `grid-${columnGrid}-columns` : 'grid-3-columns';

  const verticalRowsStyle =
    verticalRows != null
      ? // SCSS의 --vertical-rows 변수로 전달 (grid-template-rows에서 사용)
        ({ '--vertical-rows': String(verticalRows) } as CSSProperties)
      : '';
  const scrollableHeightStyle =
    scrollableHeight != null
      ? ({ height: String(scrollableHeight) + 'px' } as CSSProperties)
      : '';

  return (
    <div
      className={`search-collapse ${columnGridClass} ${verticalLayout ? 'vertical-layout' : ''} ${className ?? ''}`.trim()}
      style={{ ...verticalRowsStyle, ...scrollableHeightStyle, ...style }}
    >
      <Form>{children}</Form>
    </div>
  );
}
