// eslint-disable-next-line unicorn/filename-case
import React from "react";
import {
    Table,
} from "antd";

class LinksList extends React.PureComponent {
    static columns = [
        {
            "dataIndex": "linkId",
            "key": "linkId",
            "title": "LinkId",
        },
        {
            "dataIndex": "url",
            "key": "url",
            "render": (text) => {
                return (<a href={text}>{text}</a>);
            },
            "title": "Url",
        },
    ];

    render() {
        const {
            "props": {
                data,
            },
        } = this;

        return (
            <Table
                className="hen-links-list"
                columns={LinksList.columns}
                dataSource={data}
            />
        );
    }
}

export default LinksList;
