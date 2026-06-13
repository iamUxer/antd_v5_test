import { SearchingCollapse } from '@/components/SearchingCollapse/SearchingCollapse';
import { Divider, Form, Input, Select } from 'antd';

export function DisplayGrid() {
  return (
    <>
      {/* 같은 열에 같은 너비 지정을 위해,
        같은 열에 있는 요소는 같은 label너비를 가지는 클래스 지정이 가능해야 함 */}
      <h1>가로 정렬</h1>
      <h2>3열 그리드</h2>
      {/* 같은 열에 있는 요소는 같은 label너비를 가지는 클래스를 사용 */}
      {/* 3열 그리드 예시: 첫번째와 네번째 아이템이 같은열,
        두번째와 다섯번째 아이템이 같은열, 세번째와 여섯번째 아이템이 같은열
        props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-sm', 'label-md', 'label-lg']} (같은 열에 같은 label 너비 클래스를 적용)
        */}
      <SearchingCollapse className="grid-3-columns">
        <Form.Item
          className="label-sm"
          name="h3_r1_c1"
          label="H3 R1C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r1_c2"
          label="H3 R1C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r1_c3"
          label="H3 R1C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h3_r2_c1"
          label="H3 R2C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r2_c2"
          label="H3 R2C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r2_c3"
          label="H3 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h3_r3_c1"
          label="H3 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r3_c2"
          label="H3 R3C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r3_c3"
          label="H3 R3C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h3_r4_c1"
          label="H3 R4C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r4_c2"
          label="H3 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r4_c3"
          label="H3 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>

      <h2>3열 그리드 - colSpan 적용(4열/5열 그리드 공통 적용)</h2>
      {/* 3열 그리드에서 colSpan 적용 예시: 첫번째 아이템은 1칸, 두번째 아이템은 2칸 차지
        className="col-span-2" 추가
        col-span-2 적용시, Form.Item 한개가 2칸 차지함에 따라 label 너비 클래스 적용하는 계산식이 바뀔것으로 예상
        4열, 5열 그리드에서도 동일하게 적용해야함.
        */}
      <SearchingCollapse className="grid-3-columns">
        <Form.Item
          className="label-sm"
          name="h3_r1_c1"
          label="H3 R1C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md col-span-2"
          name="h3_r1_c2"
          label="H3 R1C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm col-span-2"
          name="h3_r2_c1"
          label="H3 R2C1"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r2_c3"
          label="H3 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h3_r3_c1"
          label="H3 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r3_c2"
          label="H3 R3C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r3_c3"
          label="H3 R3C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h3_r4_c1"
          label="H3 R4C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r4_c2"
          label="H3 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r4_c3"
          label="H3 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>

      <h2>3열 그리드 - Favorite 아이템 적용(4열/5열 그리드 공통 적용)</h2>
      <SearchingCollapse className="grid-3-columns">
        {/* Favorite 아이템은 추후 컴포넌트 적용 가능 */}
        <Form.Item className="label-sm" name="Favorite">
          Favorite
        </Form.Item>
        <Form.Item
          className="label-md col-span-2"
          name="h3_r1_c2"
          label="H3 R1C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm col-span-2"
          name="h3_r2_c1"
          label="H3 R2C1"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r2_c3"
          label="H3 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h3_r3_c1"
          label="H3 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r3_c2"
          label="H3 R3C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r3_c3"
          label="H3 R3C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h3_r4_c1"
          label="H3 R4C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r4_c2"
          label="H3 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r4_c3"
          label="H3 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>

      <h2>3열 그리드 - Scrollable 적용</h2>
      {/* 스크롤 영역 height 속성 인라인 스타일로 추가 */}
      <SearchingCollapse className="grid-3-columns" style={{ height: 200 }}>
        {/* Favorite 아이템은 추후 컴포넌트 적용 가능 */}
        <Form.Item className="label-sm" name="Favorite">
          Favorite
        </Form.Item>
        <Form.Item
          className="label-md col-span-2"
          name="h3_r1_c2"
          label="H3 R1C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm col-span-2"
          name="h3_r2_c1"
          label="H3 R2C1"
          rules={[{ required: true }]}
        >
          <Select
            options={[
              { label: 'Option 1', value: '1' },
              { label: 'Option 2', value: '2' },
            ]}
          />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r2_c3"
          label="H3 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h3_r3_c1"
          label="H3 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r3_c2"
          label="H3 R3C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r3_c3"
          label="H3 R3C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h3_r4_c1"
          label="H3 R4C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r4_c2"
          label="H3 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r4_c3"
          label="H3 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="h3_r5_c1"
          label="H3 R5C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r5_c2"
          label="H3 R5C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r5_c3"
          label="H3 R5C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="h3_r5_c4"
          label="H3 R5C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r5_c5"
          label="H3 R5C5"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r5_c6"
          label="H3 R5C6"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="h3_r5_c7"
          label="H3 R5C7"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h3_r5_c8"
          label="H3 R5C8"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h3_r5_c9"
          label="H3 R5C9"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>

      <h2>4열 그리드</h2>
      {/* 같은 열에 있는 요소는 같은 label너비를 가지는 클래스를 사용 */}
      {/* 4열 그리드 예시: 첫번째와 다섯번째 아이템이 같은열,
        두번째와 여섯번째 아이템이 같은열, 세번째와 일곱번째 아이템이 같은열,
        네번째와 여덟번째 아이템이 같은열
        props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-sm', 'label-md', 'label-lg', 'label-md']}
        */}
      <SearchingCollapse className="grid-4-columns">
        <Form.Item
          className="label-sm"
          name="h4_r1_c1"
          label="H4 R1C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md col-span-2"
          name="h4_r1_c2"
          label="H4 R1C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h4_r1_c4"
          label="H4 R1C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h4_r2_c1"
          label="H4 R2C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h4_r2_c2"
          label="H4 R2C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h4_r2_c3"
          label="H4 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h4_r2_c4"
          label="H4 R2C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h4_r3_c1"
          label="H4 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h4_r3_c2"
          label="H4 R3C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h4_r3_c3"
          label="H4 R3C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h4_r3_c4"
          label="H4 R3C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h4_r4_c1"
          label="H4 R4C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h4_r4_c2"
          label="H4 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h4_r4_c3"
          label="H4 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h4_r4_c4"
          label="H4 R4C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>

      <h2>5열 그리드</h2>
      {/* 같은 열에 있는 요소는 같은 label너비를 가지는 클래스를 사용 */}
      {/* 5열 그리드 예시: 첫번째와 여섯번째, 두번째와 일곱번째, 세번째와 여덟번째,
        네번째와 아홉번째, 다섯번째와 열번째 아이템이 같은열이 있음
        props 입력(columnLabelClasses는 예시임): columnLabelClasses={['label-sm', 'label-md', 'label-lg', 'label-md', 'label-sm']} (같은 열에 같은 label 너비 클래스를 적용)
        */}
      <SearchingCollapse className="grid-5-columns">
        <Form.Item
          className="label-sm"
          name="h5_r1_c1"
          label="H5 R1C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md col-span-2"
          name="h5_r1_c2"
          label="H5 R1C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h5_r1_c4"
          label="H5 R1C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="h5_r1_c5"
          label="H5 R1C5"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h5_r2_c1"
          label="H5 R2C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h5_r2_c2"
          label="H5 R2C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h5_r2_c3"
          label="H5 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h5_r2_c4"
          label="H5 R2C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="h5_r2_c5"
          label="H5 R2C5"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h5_r3_c1"
          label="H5 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h5_r3_c2"
          label="H5 R3C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h5_r3_c3"
          label="H5 R3C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h5_r3_c4"
          label="H5 R3C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="h5_r3_c5"
          label="H5 R3C5"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="h5_r4_c1"
          label="H5 R4C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h5_r4_c2"
          label="H5 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="h5_r4_c3"
          label="H5 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="h5_r4_c4"
          label="H5 R4C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="h5_r4_c5"
          label="H5 R4C5"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>

      <Divider />

      <h1>세로 정렬</h1>
      <h2>3열 그리드</h2>
      {/* 세로 정렬은 grid-auto-flow: column 방식이라 rows 제한이 있어야 다음 열로 흐른다.
          따라서 verticalRows는 "전체 item 수 / 열 수" 기반으로 계산해서 넘긴다.
          (현재 예시: 12개 아이템, 3열 => 4행)
          props 입력 예시: verticalRows={Math.ceil(itemCount / columnCount)}
        */}
      <SearchingCollapse
        className="grid-3-columns vertical-layout"
        verticalRows={Math.ceil(12 / 3)}
      >
        {/* 같은 열에 있는 요소는 같은 label너비를 가지는 클래스를 사용 */}
        {/* 세로 채움 기준으로 같은 열(c1/c2/c3)에 같은 label 클래스를 적용
            c1 -> label-sm, c2 -> label-md, c3 -> label-lg 
            props 입력 예시: columnLabelClasses={['label-sm', 'label-md', 'label-lg']}
        */}
        <Form.Item
          className="label-sm"
          name="v3_r1_c1"
          label="V3 R1C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v3_r2_c1"
          label="V3 R2C1"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v3_r3_c1"
          label="V3 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v3_r4_c1"
          label="V3 R4C1"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-md"
          name="v3_r1_c2"
          label="V3 R1C2"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v3_r2_c2"
          label="V3 R2C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v3_r3_c2"
          label="V3 R3C2"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v3_r4_c2"
          label="V3 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-lg"
          name="v3_r1_c3"
          label="V3 R1C3"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v3_r2_c3"
          label="V3 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v3_r3_c3"
          label="V3 R3C3"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v3_r4_c3"
          label="V3 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>

      <h2>3열 그리드 - rowSpan, Favorite 아이템 적용</h2>
      {/* 세로 정렬은 grid-auto-flow: column 방식이라 rows 제한이 있어야 다음 열로 흐른다.
          따라서 verticalRows는 "전체 item 수 / 열 수" 기반으로 계산해서 넘긴다.
          (현재 예시: 12개 아이템, 3열 => 4행)
          props 입력 예시: verticalRows={Math.ceil(itemCount / columnCount)}
        */}
      <SearchingCollapse
        className="grid-3-columns vertical-layout"
        verticalRows={Math.ceil(12 / 3)}
      >
        {/* 같은 열에 있는 요소는 같은 label너비를 가지는 클래스를 사용 */}
        {/* 세로 채움 기준으로 같은 열(c1/c2/c3)에 같은 label 클래스를 적용
            c1 -> label-sm, c2 -> label-md, c3 -> label-lg 
            props 입력 예시: columnLabelClasses={['label-sm', 'label-md', 'label-lg']}
        */}
        <Form.Item
          className="label-sm"
          name="Favorite"
          rules={[{ required: true }]}
        >
          Favorite
        </Form.Item>
        <Form.Item
          className="label-sm row-span-2"
          name="v3_r2_c1_group"
          label="V3 R2C1"
          rules={[{ required: false }]}
        >
          <Form.Item name="v3_r2_c1_a" noStyle>
            <Select
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
            />
          </Form.Item>

          <Form.Item name="v3_r2_c1_b" noStyle>
            <Select
              options={[
                { label: 'Option 1', value: '1' },
                { label: 'Option 2', value: '2' },
              ]}
            />
          </Form.Item>
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v3_r3_c1"
          label="V3 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-md"
          name="v3_r1_c2"
          label="V3 R1C2"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v3_r2_c2"
          label="V3 R2C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v3_r3_c2"
          label="V3 R3C2"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v3_r4_c2"
          label="V3 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-lg"
          name="v3_r1_c3"
          label="V3 R1C3"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v3_r2_c3"
          label="V3 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v3_r3_c3"
          label="V3 R3C3"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v3_r4_c3"
          label="V3 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>

      <h2>4열 그리드</h2>
      <SearchingCollapse
        className="grid-4-columns vertical-layout"
        verticalRows={Math.ceil(16 / 4)}
      >
        {/* 세로 채움 기준으로 같은 열(c1~c4)에 같은 label 클래스를 적용
            c1 -> label-sm, c2 -> label-md, c3 -> label-lg, c4 -> label-md
            props 입력 예시: columnLabelClasses={['label-sm', 'label-md', 'label-lg', 'label-md']}
        */}
        <Form.Item
          className="label-sm"
          name="v4_r1_c1"
          label="V4 R1C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v4_r2_c1"
          label="V4 R2C1"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v4_r3_c1"
          label="V4 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v4_r4_c1"
          label="V4 R4C1"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-md"
          name="v4_r1_c2"
          label="V4 R1C2"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v4_r2_c2"
          label="V4 R2C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v4_r3_c2"
          label="V4 R3C2"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v4_r4_c2"
          label="V4 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-lg"
          name="v4_r1_c3"
          label="V4 R1C3"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v4_r2_c3"
          label="V4 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v4_r3_c3"
          label="V4 R3C3"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v4_r4_c3"
          label="V4 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-md"
          name="v4_r1_c4"
          label="V4 R1C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v4_r2_c4"
          label="V4 R2C4"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v4_r3_c4"
          label="V4 R3C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v4_r4_c4"
          label="V4 R4C4"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>

      <h2>5열 그리드</h2>
      <SearchingCollapse
        className="grid-5-columns vertical-layout"
        verticalRows={Math.ceil(20 / 5)}
      >
        {/* 세로 채움 기준으로 같은 열(c1~c5)에 같은 label 클래스를 적용
            c1 -> label-sm, c2 -> label-md, c3 -> label-lg, c4 -> label-md, c5 -> label-sm
            props 입력 예시: columnLabelClasses={['label-sm', 'label-md', 'label-lg', 'label-md', 'label-sm']}
        */}
        <Form.Item
          className="label-sm"
          name="v5_r1_c1"
          label="V5 R1C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v5_r2_c1"
          label="V5 R2C1"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v5_r3_c1"
          label="V5 R3C1"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v5_r4_c1"
          label="V5 R4C1"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-md"
          name="v5_r1_c2"
          label="V5 R1C2"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v5_r2_c2"
          label="V5 R2C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v5_r3_c2"
          label="V5 R3C2"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v5_r4_c2"
          label="V5 R4C2"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-lg"
          name="v5_r1_c3"
          label="V5 R1C3"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v5_r2_c3"
          label="V5 R2C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v5_r3_c3"
          label="V5 R3C3"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-lg"
          name="v5_r4_c3"
          label="V5 R4C3"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-md"
          name="v5_r1_c4"
          label="V5 R1C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v5_r2_c4"
          label="V5 R2C4"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v5_r3_c4"
          label="V5 R3C4"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-md"
          name="v5_r4_c4"
          label="V5 R4C4"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          className="label-sm"
          name="v5_r1_c5"
          label="V5 R1C5"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v5_r2_c5"
          label="V5 R2C5"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v5_r3_c5"
          label="V5 R3C5"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          className="label-sm"
          name="v5_r4_c5"
          label="V5 R4C5"
          rules={[{ required: false }]}
        >
          <Input />
        </Form.Item>
      </SearchingCollapse>
    </>
  );
}
