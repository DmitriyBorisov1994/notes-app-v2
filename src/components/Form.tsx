import { Form, Input, Button } from 'antd'
import React from 'react'

interface FormProps {
   title: string,
   handleClick: (email: string, password: string) => void
}

const MyForm: React.FC<FormProps> = ({ title, handleClick }) => {

   const formItemLayout = {
      labelCol: {
         xs: { span: 24 },
         sm: { span: 8 },
      },
      wrapperCol: {
         xs: { span: 24 },
         sm: { span: 16 },
      },
   };

   const formTailLayout = {
      wrapperCol: {
         xs: {
            span: 24,
            offset: 0,
         },
         sm: {
            span: 16,
            offset: 8,
         },
      },
   };

   return (
      <Form
         size='large'
         onFinish={(values: any) => {
            const { email, password } = values
            handleClick(email, password)
         }}
      >
         <Form.Item
            {...formItemLayout}
            name="email"
            label="E-mail:"
            rules={[
               {
                  type: 'email',
                  message: 'The input is not valid E-mail!',
               },
               {
                  required: true,
                  message: 'Пожалуйста, введите e-mail!',
               },
            ]}
         >
            <Input placeholder="Введите e-mail" />
         </Form.Item>
         <Form.Item
            {...formItemLayout}
            label="Пароль:"
            name="password"
            rules={[
               {
                  required: true,
                  message: "Пожалуйста, введите пароль!",
               },
               /*{
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/,
                  message:
                     "Пароль должен содержать покрайней мере одну строчную букву, одну заглавную букву, одну цифру и один из символов: !@#$%. От 8ми до 24х символов.",
               },*/
            ]}
         >
            <Input.Password placeholder="Введите пароль" />
         </Form.Item>
         {title === 'Регистрация' &&
            <Form.Item
               {...formItemLayout}
               label="Подтвердите пароль"
               name="confirmPassword"
               dependencies={["password"]}
               hasFeedback
               rules={[
                  {
                     required: true,
                     message: "Подтвердите пароль!",
                  },
                  ({ getFieldValue }) => ({
                     validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                           return Promise.resolve();
                        }
                        return Promise.reject(new Error("Пароли не совпадают!"));
                     },
                  }),
               ]}>
               <Input.Password />
            </Form.Item>
         }
         <Form.Item
            {...formTailLayout}
         >
            <Button
               type='primary'
               htmlType="submit"
            >
               {title}
            </Button>
         </Form.Item>
      </Form >
   )
}

export default MyForm