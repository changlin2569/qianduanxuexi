import React, { Component } from 'react'

const MyFormCreate = (Comp) => {
    return class extends Component {
        constructor(props) {
            super(props)
            this.options = {}
            this.state = {}
        }
        changeHandle = (e) => {
            const { name, value } = e.target
            this.setState({
                [name]: value
            }, () => {
                // 值变化时执行校验
                this.validateField(name)
            })
        }
        focusHandle = (e) => {
            const fieldName = e.target.name
            this.setState({
                [fieldName + 'focus']: true
            })
        }
        // 检验规则
        validateField = (fieldName) => {
            const { rules } = this.options[fieldName]
            const res = rules.some(item => {
                if (item.required) {
                    if (!this.state[fieldName]) {
                        this.setState({
                            [fieldName + 'errMsg']: item.message
                        })
                        return true
                    }
                }
                return false
            })
            if (!res) {
                this.setState({
                    [fieldName + 'errMsg']: ''
                })
            }
            return !res
        }
        // 提交时的校验
        validateFields = (cb) => {
            const resArr = Object.keys(this.options).map(item => this.validateField(item))
            const result = resArr.every(item => item === true)
            cb(result)
        }
        getFieldDecorator = (fieldName, options) => {
            this.options[fieldName] = options
            return InputComp => {
                // return (<InputComp {...this.props} name={fieldName} value={this.state[fieldName] || ''} onChange={this.changeHandle}></InputComp>)
                return <div>
                    {React.cloneElement(InputComp, {
                        name: fieldName,
                        value: this.state[fieldName] || '',
                        onChange: this.changeHandle,
                        onFocus: this.focusHandle,
                    })}
                    {

                    }
                </div>
            }
        }
        isFieldTouched = (fieldName) => {
            return !!this.state[fieldName + 'focus']
        }
        getFieldError = (filename) => {
            return this.state[filename + 'errMsg']
        }
        createMethods = () => {
            return {
                getFieldDecorator: this.getFieldDecorator,
                validateFields: this.validateFields,
                isFieldTouched: this.isFieldTouched,
                getFieldError: this.getFieldError,
            }
        }
        render() {
            return (<Comp {...this.props} form={this.createMethods()}></Comp>)
        }
    }
}

class MyFormItem extends Component {
    render() {
        return (<div>
            {this.props.children}
            {
                this.props.help && (<p style={this.props.validateStatus === 'error' && { color: 'red' }}>{this.props.help}</p>)
            }
        </div>)
    }
}

class MyForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault()
        this.props.form.validateFields(flag => {
            if (flag) {
                console.log('提交成功');
            } else {
                console.log('提交失败');
            }
        })
    }
    render() {
        const { getFieldDecorator, isFieldTouched, getFieldError } = this.props.form;
        const usernameError = isFieldTouched('username') && getFieldError('username');
        const passwordError = isFieldTouched('password') && getFieldError('password');
        return (
            <div>
                <MyFormItem validateStatus={usernameError ? 'error' : ''} help={usernameError || ''}>
                    {getFieldDecorator('username', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(<input type="text" />)}
                </MyFormItem>
                <MyFormItem validateStatus={passwordError ? 'error' : ''} help={passwordError || ''}>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(<input type="password" />)}
                </MyFormItem>
                {/* <input type="button" value="提交" onSubmit={this.handleSubmit} /> */}
                <button type="submit" onClick={this.handleSubmit}>提交</button>
            </div>
        )
    }
}

export default MyFormCreate(MyForm)