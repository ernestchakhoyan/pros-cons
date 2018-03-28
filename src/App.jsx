import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, } from 'redux';

import { Argument, } from './Components';
import allReducers from './reducers';

import './App.scss';

const store = createStore(combineReducers(allReducers), {
    cons: [
        {
            id: Math.round(Math.random() * 10e6),
            value: 'Too expensive',
        },
    ],
    pros: [
        {
            id: Math.round(Math.random() * 10e6),
            value: 'It\'s really tasty',
        },
        {
            id: Math.round(Math.random() * 10e6),
            value: 'It\'s really tasty',
        },
        {
            id: Math.round(Math.random() * 10e6),
            value: 'It\'s really tasty',
        },
        {
            id: Math.round(Math.random() * 10e6),
            value: 'It\'s really tasty',
        },
        {
            id: Math.round(Math.random() * 10e6),
            value: 'It\'s really tasty',
        },
    ],
});


class App extends React.Component {
    _storeSubscriber = null;

    storeStateToState = (storeState) => {
        this.setState({
            cons: storeState.cons,
            pros: storeState.pros,
        });
    };

    handleChange = (postfix) => {
        return (id, value) => {
            store.dispatch({
                type: `UPDATE_${postfix}`,
                id,
                value,
            });
        };
    };

    componentWillMount() {
        const storeUpdater = () => {
            this.storeStateToState(store.getState());
        };

        storeUpdater();

        this._storeSubscriber = store.subscribe(storeUpdater);
    }

    render () {
        const { cons, pros, } = this.state;


        return (
            <main>
                <header>Should I eat McDonalds?</header>
                <Argument
                    title="Pros"
                    items={pros}
                    onInputChange={this.handleChange('PROS')}
                />
                <Argument
                    title="Cons"
                    items={cons}
                    onInputChange={this.handleChange('CONS')}
                />
            </main>
        );
    }

    componentWillUnmount() {
        if (this._storeSubscriber) {
            this._storeSubscriber();
            this._storeSubscriber = null;
        }
    }
}

ReactDOM.render(<App />, document.getElementById('app'));