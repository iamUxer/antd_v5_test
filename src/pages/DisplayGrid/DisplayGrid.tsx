import { SearchingCollapse } from '@/components/SearchingCollapse/SearchingCollapse';
import { Divider, Form, Select } from 'antd';

export function DisplayGrid() {
  return (
    <>
      {/* 같은 컬럼의 라벨에 동일한 너비 지정을 위해,
        같은 컬럼의 요소는 동일한 label 클래스를 지정할 수 있게 props 입력이 가능해야 함*/}
      <h1>가로 정렬</h1>
      <h2>3 Columns</h2>
      {/* 같은 컬럼의 요소는 동일한 label 클래스 사용 */}
      {/* 3컬럼 예시: 첫번째와 네번째 아이템이 같은 컬럼,
        두번째와 다섯번째 아이템이 같은 컬럼, 세번째와 여섯번째 아이템이 같은 컬럼
        props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-width-sm', 'label-width-md', 'label-width-lg']} (같은 열에 같은 label 너비 클래스를 적용)
        */}
      <SearchingCollapse columnGrid={3}>
        <Form.Item
          className="label-width-sm"
          name="Form1-Item1"
          label="Form1 Item1"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-md"
          name="Form1-Item2"
          label="Form1 Item2"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form1-Item3"
          label="Form1 Item3 Text Overflow Test"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>

        <Form.Item
          className="label-width-sm"
          name="Form1-Item4"
          label="Form1 Item4"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-md"
          name="Form1-Item5"
          label="Form1 Item5"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form1-Item6"
          label="Form1 Item6"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>

        <Form.Item
          className="label-width-sm"
          name="Form1-Item7"
          label="Form1 Item7"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-md"
          name="Form1-Item8"
          label="Form1 Item8"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form1-Item9"
          label="Form1 Item9"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>

        <Form.Item
          className="label-width-sm"
          name="Form1-Item10"
          label="Form1 Item10"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-md"
          name="Form1-Item11"
          label="Form1 Item11"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form1-Item12"
          label="Form1 Item12"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
      </SearchingCollapse>

      <h2>3 Columns - colSpan, Favorite Item(4 Columns/5 Columns 햐공통)</h2>
      {/* className="col-span-2" 추가
        col-span-2 적용시, Form.Item 1개가 2개 컬럼을 차지함에 따라 label 너비 클래스 적용하는 계산식이 바뀔것으로 예상
        4컬럼, 5컬럼 그리드에서도 동일하게 적용해야함.
        */}
      <SearchingCollapse columnGrid={3}>
        {/* Favorite 아이템은 추후 컴포넌트 적용 가능 */}
        <Form.Item className="label-width-lg" name="Form3-Favorite">
          Favorite
        </Form.Item>
        <Form.Item
          className="label-width-md col-span-2"
          name="Form2-Item2"
          label="Form2 Item2"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>

        <Form.Item
          className="label-width-sm col-span-2"
          name="Form2-Item3"
          label="Form2 Item3"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form2-Item4"
          label="Form2 Item4"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>

        <Form.Item
          className="label-width-sm"
          name="Form2-Item5"
          label="Form2 Item5"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-md"
          name="Form2-Item6"
          label="Form2 Item6"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form2-Item7"
          label="Form2 Item7"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>

        <Form.Item
          className="label-width-sm"
          name="Form2-Item8"
          label="Form2 Item8"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-md"
          name="Form2-Item9"
          label="Form2 Item9"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form2-Item10"
          label="Form2 Item10"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
      </SearchingCollapse>

      <h2>4 Columns</h2>
      {/* 같은 컬럼에 있는 요소는 같은 label너비를 가지는 클래스를 사용 */}
      {/* 4컬럼 그리드 예시: 첫번째와 다섯번째 아이템이 같은 컬럼,
        두번째와 여섯번째 아이템이 같은 컬럼, 세번째와 일곱번째 아이템이 같은 컬럼,
        네번째와 여덟번째 아이템이 같은 컬럼
        props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-width-sm', 'label-width-md', 'label-width-lg', 'label-width-md']}
        */}
      <SearchingCollapse columnGrid={4}>
        {Array.from({ length: 12 }, (_, idx) => idx).map((idx: number) => (
          <Form.Item
            key={idx}
            className="label-width-md"
            name={`Form4-Item${idx}`}
            label={`Form4 Item${idx}`}
            rules={[{ required: false }]}
          >
            <Select options={[]} />
          </Form.Item>
        ))}
      </SearchingCollapse>

      <h2>5 Columns</h2>
      {/* 같은 컬럼에 있는 요소는 같은 label너비를 가지는 클래스를 사용 */}
      {/* 5컬럼 그리드 예시: 첫번째와 여섯번째, 두번째와 일곱번째, 세번째와 여덟번째,
        네번째와 아홉번째, 다섯번째와 열번째 아이템이 같은 컬럼이 있음
        props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-width-sm', 'label-width-md', 'label-width-lg', 'label-width-md', 'label-width-sm']}
        */}
      <SearchingCollapse columnGrid={5}>
        {Array.from({ length: 15 }, (_, idx) => idx).map((idx: number) => (
          <Form.Item
            key={idx}
            className="label-width-sm"
            name={`Form5-Item${idx}`}
            label={`Form5 Item${idx}`}
            rules={[{ required: false }]}
          >
            <Select options={[]} />
          </Form.Item>
        ))}
      </SearchingCollapse>

      <Divider />

      <h1>세로 정렬</h1>
      <h2>3 Columns</h2>
      {/* 세로 정렬은 grid-auto-flow: column 방식이라 rows 제한이 있어야 다음 열로 흐른다.
          따라서 verticalRows는 "전체 item 수 / 열 수" 기반으로 계산해서 넘긴다.
          (현재 예시: 12개 아이템, 3열 => 4행)
          props 입력 예시: verticalRows={Math.ceil(itemCount / columnCount)}
        */}
      <SearchingCollapse
        columnGrid={3}
        verticalLayout
        verticalRows={Math.ceil(12 / 3)}
      >
        {/* 같은 열에 있는 요소는 같은 label너비를 가지는 클래스를 사용 */}
        {/* 세로 채움 기준으로 같은 열(c1/c2/c3)에 같은 label 클래스를 적용
            c1 -> label-width-sm, c2 -> label-width-md, c3 -> label-width-lg 
            props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-width-sm', 'label-width-md', 'label-width-lg']}
        */}
        <Form.Item
          className="label-width-sm"
          name="Form6-Item1"
          label="Form6 Item1"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-sm"
          name="Form6-Item2"
          label="Form6 Item2"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-sm"
          name="Form6-Item3"
          label="Form6 Item3"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-sm"
          name="Form6-Item4"
          label="Form6 Item4"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>

        <Form.Item
          className="label-width-md"
          name="Form6-Item5"
          label="Form6 Item5"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-md"
          name="Form6-Item6"
          label="Form6 Item6"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-md"
          name="Form6-Item7"
          label="Form6 Item7"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-md"
          name="Form6-Item8"
          label="Form6 Item8"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>

        <Form.Item
          className="label-width-lg"
          name="Form6-Item9"
          label="Form6 Item9"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form6-Item10"
          label="Form6 Item10"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form6-Item11"
          label="Form6 Item11"
          rules={[{ required: true }]}
        >
          <Select options={[]} />
        </Form.Item>
        <Form.Item
          className="label-width-lg"
          name="Form6-Item12"
          label="Form6 Item12"
          rules={[{ required: false }]}
        >
          <Select options={[]} />
        </Form.Item>
      </SearchingCollapse>

      <h2>3 Columns - rowSpan, Favorite Item(4 Columns/5 Columns 공통)</h2>
      <SearchingCollapse
        columnGrid={3}
        verticalLayout
        verticalRows={Math.ceil(12 / 3)}
      >
        {/* 같은 컬럼에 있는 요소는 같은 label너비를 가지는 클래스를 사용 */}
        {/* 세로 채움 기준으로 같은 컬럼(c1/c2/c3)에 같은 label 클래스를 적용
            c1 -> label-width-sm, c2 -> label-width-md, c3 -> label-width-lg 
            props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-width-sm', 'label-width-md', 'label-width-lg']}
        */}
        <Form.Item
          className="label-width-sm"
          name="Form7-Favorite"
          rules={[{ required: true }]}
        >
          Favorite
        </Form.Item>
        <Form.Item
          className="label-width-sm row-span-2"
          name="Form7-Item1"
          label="Form7 Item1"
          rules={[{ required: true }]}
        >
          <Form.Item name="Form7-Item1a" noStyle rules={[{ required: true }]}>
            <Select options={[]} />
          </Form.Item>

          <Form.Item name="Form7-Item1b" noStyle rules={[{ required: true }]}>
            <Select options={[]} />
          </Form.Item>
        </Form.Item>
        {Array.from({ length: 9 }, (_, idx) => idx).map((idx: number) => (
          <Form.Item
            key={idx}
            className="label-width-sm"
            name={`Form7-Item${idx}`}
            label={`Form7 Item${idx}`}
            rules={[{ required: false }]}
          >
            <Select options={[]} />
          </Form.Item>
        ))}
      </SearchingCollapse>

      <h2>4 Columns</h2>
      {/* 세로 정렬은 grid-auto-flow: column 방식이라 rows 제한이 있어야 다음 컬럼으로 흐른다.
          따라서 verticalRows는 "전체 item 수 / 컬럼 수" 기반으로 계산해서 넘긴다.
          (현재 예시: 16개 아이템, 4컬럼 => 4행)
          props 입력 예시: verticalRows={Math.ceil(itemCount / columnCount)}
        */}
      <SearchingCollapse
        columnGrid={4}
        verticalLayout
        verticalRows={Math.ceil(16 / 4)}
      >
        {/* 세로 채움 기준으로 같은 컬럼(c1~c4)에 같은 label 클래스를 적용
            c1 -> label-width-sm, c2 -> label-width-md, c3 -> label-width-lg, c4 -> label-width-md
            props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-width-sm', 'label-width-md', 'label-width-lg', 'label-width-md']}
        */}
        {Array.from({ length: 16 }, (_, idx) => idx).map((idx: number) => (
          <Form.Item
            key={idx}
            className="label-width-sm"
            name={`Form4-Item${idx}`}
            label={`Form4 Item${idx}`}
            rules={[{ required: false }]}
          >
            <Select options={[]} />
          </Form.Item>
        ))}
      </SearchingCollapse>

      <h2>5 Columns</h2>
      {/* 세로 정렬은 grid-auto-flow: column 방식이라 rows 제한이 있어야 다음 컬럼으로 흐른다.
          따라서 verticalRows는 "전체 item 수 / 컬럼 수" 기반으로 계산해서 넘긴다.
          (현재 예시: 20개 아이템, 5컬럼 => 4행)
          props 입력 예시: verticalRows={Math.ceil(itemCount / columnCount)}
        */}
      <SearchingCollapse
        columnGrid={5}
        verticalLayout
        verticalRows={Math.ceil(20 / 5)}
      >
        {/* 세로 채움 기준으로 같은 컬럼(c1~c5)에 같은 label 클래스를 적용
            c1 -> label-width-sm, c2 -> label-width-md, c3 -> label-width-lg, c4 -> label-width-md, c5 -> label-width-sm
            props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-width-sm', 'label-width-md', 'label-width-lg', 'label-width-md', 'label-width-sm']}
        */}
        {Array.from({ length: 20 }, (_, idx) => idx).map((idx: number) => (
          <Form.Item
            key={idx}
            className="label-width-md"
            name={`Form5-Item${idx}`}
            label={`Form5 Item${idx}`}
            rules={[{ required: false }]}
          >
            <Select options={[]} />
          </Form.Item>
        ))}
      </SearchingCollapse>

      <h2>Scrollable 적용(전체 공통 적용)</h2>
      {/*  scrollableHeight: 스크롤 영역 높이 지정*/}
      <SearchingCollapse columnGrid={3} scrollableHeight={180}>
        {/* Favorite 아이템은 추후 컴포넌트 적용 가능 */}
        <Form.Item className="label-width-sm" name="Form10-Favorite">
          Favorite
        </Form.Item>
        {Array.from({ length: 20 }, (_, idx) => idx).map((idx: number) => (
          <Form.Item
            key={idx}
            className="label-width-md"
            name={`Form10-Item${idx}`}
            label={`Form10 Item${idx}`}
            rules={[{ required: false }]}
          >
            <Select options={[]} />
          </Form.Item>
        ))}
      </SearchingCollapse>
    </>
  );
}
