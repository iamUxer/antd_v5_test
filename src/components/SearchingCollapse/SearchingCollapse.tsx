import { Form } from 'antd';
import type { CSSProperties, ReactNode } from 'react';
import './SearchingCollapse.scss';

type SearchingCollapseProps = {
  children: ReactNode;
  className?: string;
  /**
   * vertical-layout에서 column-flow를 사용할 때 "열당 몇 개를 쌓을지"를 지정.
   * - 이 값이 있어야 다음 열로 넘어가며, 데이터 건수 변화에 맞춰 동적으로 계산해 전달한다.
   * - 예: 3열에서 itemCount=12면 Math.ceil(12 / 3) => 4
   */
  verticalRows?: number;
  style?: CSSProperties;
};

export function SearchingCollapse({
  children,
  className,
  verticalRows,
  style,
}: SearchingCollapseProps) {
  const verticalRowsStyle =
    verticalRows != null
      ? // SCSS의 --vertical-rows 변수로 전달 (grid-template-rows에서 사용)
        ({ '--vertical-rows': String(verticalRows) } as CSSProperties)
      : undefined;

  return (
    <div
      className={`search-collapse ${className ?? ''}`}
      style={{ ...verticalRowsStyle, ...style }}
    >
      <Form>{children}</Form>
    </div>
  );
}
