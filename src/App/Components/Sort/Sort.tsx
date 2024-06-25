import {
   Button,
   Checkbox,
   Modal,
   Form,
   Slider,
   InputNumber,
   Typography,
   Row,
   Col,
   List,
   Divider,
} from 'antd'
import { useState } from 'react'
import { getProductCount } from '../Sort/Utils/getProductCount'
import sortButton from '@assets/sorting-filter-icon.png'
import s from './Sort.module.scss'
import { useGetTotalProductsQuery } from '../../Api/ProductsCountApi/ProductsCountApi'

type Props = {
   setUpdateFilters: (arg1: any) => void
}

export const Sort = ({ setUpdateFilters }: Props) => {
   const { data = [] } = useGetTotalProductsQuery()
   const [range, setRange] = useState([50, 450])
   const [isModalOpen, setIsModalOpen] = useState(false)
   const category = ['Mouse', 'Keyboard', 'Headset', 'Chair']

   const onFinish = (values: any) => {
      const newArr = Object.keys(values.category).filter(
         key => values.category[key] === true
      )

      setUpdateFilters({ ...values, category: newArr })
   }

   const handleRightInputChange = (value: number | null) =>
      value && setRange([range[0], value])

   const handleLeftInputChange = (value: number | null) =>
      value && setRange([value, range[1]])

   return (
      <div className={s.wrapper}>
         <img
            onClick={() => setIsModalOpen(true)}
            src={sortButton}
            width={53}
            height={48}
            alt=""
         />
         <Modal
            title="FILTER"
            width={250}
            footer={null}
            open={isModalOpen}
            onOk={() => setIsModalOpen(false)}
            onCancel={() => setIsModalOpen(false)}>
            <List className={s.drawer}>
               <Form name="filter" onFinish={onFinish}>
                  {category?.map((category, index) => (
                     <Form.Item
                        key={index}
                        name={['category', category]}
                        valuePropName="checked"
                        noStyle>
                        <List.Item className={s.checkBox}>
                           <Checkbox>{category}</Checkbox>
                           <Typography.Text className={s.productCount}>
                              {getProductCount(data, category)}
                           </Typography.Text>
                        </List.Item>
                     </Form.Item>
                  ))}

                  <Typography.Title level={5}>View More</Typography.Title>
                  <Divider />
                  <Typography.Title level={5}>Price</Typography.Title>
                  <Row>
                     <Col className={s.inputNumber}>
                        <Col className={s.inputBlock}>
                           <Form.Item>
                              <InputNumber
                                 formatter={value =>
                                    `$ ${value}`.replace(
                                       /\B(?=(\d{3})+(?!\d))/g,
                                       ','
                                    )
                                 }
                                 parser={value =>
                                    value?.replace(
                                       /\$\s?|(,*)/g,
                                       ''
                                    ) as unknown as number
                                 }
                                 step={10}
                                 value={range[0]}
                                 onChange={handleLeftInputChange}
                              />
                           </Form.Item>
                           <Form.Item>
                              <InputNumber
                                 formatter={value =>
                                    `$ ${value}`.replace(
                                       /\B(?=(\d{3})+(?!\d))/g,
                                       ','
                                    )
                                 }
                                 parser={value =>
                                    value?.replace(
                                       /\$\s?|(,*)/g,
                                       ''
                                    ) as unknown as number
                                 }
                                 step={10}
                                 value={range[1]}
                                 onChange={handleRightInputChange}
                              />
                           </Form.Item>
                        </Col>
                     </Col>
                  </Row>

                  <Col className={s.slider}>
                     <Form.Item name="searchPrice" initialValue={range}>
                        <Slider
                           range={{ draggableTrack: true }}
                           step={10}
                           min={0}
                           max={500}
                           onChange={setRange}
                           value={range}
                        />
                     </Form.Item>
                  </Col>
                  <Typography.Text className={s.count}>
                     {data.length} Products found
                  </Typography.Text>

                  <Divider />
                  <Col className={s.antButton}>
                     <Form.Item>
                        <Button
                           type="primary"
                           htmlType="submit"
                           className="login-form-button">
                           Apply Filters
                        </Button>
                     </Form.Item>
                  </Col>
               </Form>
            </List>
         </Modal>
      </div>
   )
}
