// eslint-disable-next-line unicorn/filename-case
import React from "react";
import {
    Button,
    Form,
    Icon,
    Input,
} from "antd";

const hasErrors = function hasErrors(fieldsError) {
    return Object.keys(fieldsError).some((field) => {
        return fieldsError[field];
    });
};

class HorizontalLoginForm extends React.Component {
    componentDidMount() {
        const {
            "props": {
                form,
            },
        } = this;

        form.validateFields();
    }

    handleSubmit = (event) => {
        const {
            "props": {
                handleCreateLink,
                form,
            },
        } = this;

        event.preventDefault();

        form.validateFields((err, values) => {
            if (err) {
                handleCreateLink(values);
            }
        });
    };

    render() {
        const {
            "props": {
                "form": {
                    getFieldDecorator,
                    getFieldsError,
                    getFieldError,
                    isFieldTouched,
                },
            },
        } = this;

        const usernameError = isFieldTouched("username") && getFieldError("username");

        return (
            <Form
                layout="inline"
                onSubmit={this.handleSubmit}
            >
                <Form.Item
                    help={usernameError || ""}
                    validateStatus={usernameError ? "error" : ""}
                >
                    {getFieldDecorator(
                        "username", {
                            "rules": [
                                {
                                    "message": "Enter a valid URL",
                                    "required": true,
                                },
                            ],
                        },
                    )((
                        <Input
                            placeholder="Link"
                            prefix={(
                                <Icon
                                    style={{
                                        "color": "rgba(0,0,0,.25)",
                                    }}
                                    type="link"
                                />
                            )}
                        />
                    ))}
                </Form.Item>

                <Form.Item>
                    <Button
                        disabled={hasErrors(getFieldsError())}
                        htmlType="submit"
                        type="primary"
                    >
                        Create
                    </Button>
                </Form.Item>
            </Form>
        );
    }
}

const LinksForm = Form.create({
    "name": "horizontal_login",
})(HorizontalLoginForm);

export default LinksForm;
