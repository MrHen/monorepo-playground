// eslint-disable-next-line unicorn/filename-case
import React from "react";
import {
    Table,
    Divider,
    Tag,
} from "antd";

const columns = [
    {
        "dataIndex": "name",
        "key": "name",
        "render": (text) => {
            return <a href="javascript:;">{text}</a>;
        },
        "title": "Name",
    },
    {
        "dataIndex": "age",
        "key": "age",
        "title": "Age",
    },
    {
        "dataIndex": "address",
        "key": "address",
        "title": "Address",
    },
    {
        "dataIndex": "tags",
        "key": "tags",
        "render": (tags) => {
            return (
                <span>
                    {tags.map(tag => {
                        let color = tag.length > 5 ? "geekblue" : "green";
                        if (tag === "loser") {
                            color = "volcano";
                        }
                        return (
                            <Tag color={color} key={tag}>
                                {tag.toUpperCase()}
                            </Tag>
                        );
                    })}
                </span>
            )
        },
        "title": "Tags",
    },
    {
        "key": "action",
        "render": (
            text,
            record,
        ) => {
            return (
                <span>
                    <a href="javascript:;">Invite {record.name}</a>
                    <Divider type="vertical" />
                    <a href="javascript:;">Delete</a>
                </span>
            )
        },
        "title": "Action",
    },
];

const data = [
    {
        "address": "New York No. 1 Lake Park",
        // eslint-disable-next-line no-magic-numbers
        "age": 32,
        "key": "1",
        "name": "John Brown",
        "tags": ["nice", "developer"],
    },
    {
        "address": "London No. 1 Lake Park",
        // eslint-disable-next-line no-magic-numbers
        "age": 42,
        "key": "2",
        "name": "Jim Green",
        "tags": ["loser"],
    },
    {
        "address": "Sidney No. 1 Lake Park",
        // eslint-disable-next-line no-magic-numbers
        "age": 32,
        "key": "3",
        "name": "Joe Black",
        "tags": [
            "cool",
            "teacher",
        ],
    },
];

class TableDemo extends React.PureComponent {
    render() {
        return (
            <Table
                className="hen-table-demo"
                columns={columns}
                dataSource={data}
            />
        );
    }
}

export default TableDemo;
