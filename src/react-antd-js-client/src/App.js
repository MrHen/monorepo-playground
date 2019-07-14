// eslint-disable-next-line unicorn/filename-case
import _ from "lodash";
import React from "react";
import {
    Spin,
} from "antd";
import {
    getList,
} from "./links";
import LinksList from "./LinksList";
import LinksForm from "./LinksForm";
import "./App.css";
import "antd/dist/antd.css";

class App extends React.PureComponent {
    state = {
        "links": null,
        "loading": true,
    };

    componentDidMount = async () => {
        const response = await getList();

        // eslint-disable-next-line react/no-did-mount-set-state
        this.setState({
            "links": _.get(response, "results"),
            "loading": false,
        });
    };

    handleCreateLink = (values) => {
        console.log({
            values,
        });
    };

    render() {
        const {
            handleCreateLink,
            "state": {
                loading,
                links,
            },
        } = this;

        const showLoading = loading;
        const showForm = !showLoading;
        const showList = !showLoading;

        return (
            <div className="App">
                <header className="App-header">
                    {showLoading && (
                        <Spin
                            size="large"
                        />
                    )}

                    {showForm && (
                        <LinksForm
                            onCreateLink={handleCreateLink}
                        />
                    )}

                    {showList && (
                        <LinksList
                            data={links}
                        />
                    )}
                </header>
            </div>
        );
    }
}

export default App;
