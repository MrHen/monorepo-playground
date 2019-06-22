import React from 'react';
import { Table } from 'antd';

class LinksList extends React.PureComponent {
    static columns = [
        {
            title: 'LinkId',
            dataIndex: 'linkId',
            key: 'linkId',
        },
        {
            title: 'Url',
            dataIndex: 'url',
            key: 'url',
            render: text => <a href={text}>{text}</a>,
        },
    ];

    render() {
        const {
            props: {
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
