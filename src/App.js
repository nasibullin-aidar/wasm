import React, {Component} from 'react';
import './App.css';
import data from './items.json'
import materials from './materials.json'
import CardList from './components/CardList/CardList'
import Header from './components/Header/Header';

class App extends Component {
    state = {
        data,
        materials,
        filtered: data,
        sortBy: 1,
        filterBy: null
    };

    componentDidUpdate(prevProps, prevState) {
        if (prevState.sortBy !== this.state.sortBy) {
            this.setState({
                filtered: this.state.filtered.sort((a, b) => {
                    if (this.state.sortBy === 1) {
                        return a.price.current_price - b.price.current_price
                    } else {
                        return b.price.current_price - a.price.current_price
                    }
                })
            })
        }

        if (prevState.filterBy !== this.state.filterBy && this.state.filterBy) {
            this.setState({filtered: this.state.data.filter(item => item.material === this.state.filterBy)})
        }
    }

    render() {
        return (
            <div className="App">
                <Header
                    sortBy={this.state.sortBy}
                    filterBy={this.state.filterBy}
                    onSelectSort={(sort) => this.setState({sortBy: sort})}
                    onSelectFilter={(filter) => this.setState({filterBy: filter})}
                />
                <CardList cards={this.state.filtered}/>
            </div>
        );
    }
}

export default App;
