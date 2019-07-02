import React from 'react';
import { Form, Icon, Input, Button } from 'antd';
function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        this.props.form.validateFields();
    }

    handleSubmit = e => {
        const {
            props: {
                handleCreateLink,
            },
        } = this;

        e.preventDefault();

        this.props.form.validateFields((err, values) => {
            if (err) {
                handleCreateLink(values);
            }
        });
    };

    render() {
        const {
            props: {
                form: {
                    getFieldDecorator,
                    getFieldsError,
                    getFieldError,
                    isFieldTouched,
                },
            },
        } = this;

        const usernameError = isFieldTouched('username') && getFieldError('username');

        return (
            <Form
                layout="inline"
                onSubmit={this.handleSubmit}
            >
                <Form.Item
                    validateStatus={usernameError ? 'error' : ''}
                    help={usernameError || ''}
                >
                    {getFieldDecorator('username', {
                        rules: [
                            {
                                required: true,
                                message: 'Enter a valid URL',
                            }
                        ],
                    })(
                        <Input
                            prefix={(
                                <Icon
                                    type="link"
                                    style={{
                                        color: 'rgba(0,0,0,.25)',
                                    }}
                                />
                            )}
                            placeholder="Link"
                        />,
                    )}
                </Form.Item>

                <Form.Item>
                    <Button
                        type="primary"
                        htmlType="submit"
                        disabled={hasErrors(getFieldsError())}
                    >
                        Create
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const LinksForm = Form.create({ name: 'horizontal_login' })(HorizontalLoginForm);

export default LinksForm;
