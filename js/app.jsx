import React, {Fragment, Component} from 'react';
import ReactDOM from 'react-dom';
import {
    HashRouter,
    Route,
    Link,
    Switch,
    NavLink,
} from 'react-router-dom';

import '../style.scss'

class App extends Component {
    render(){
        return <All />
    }
}

class All extends Component {
    constructor(){
        super();
        this.state = {
            models: null,
            cars: null,
            sort: null
        }
    }

    componentDidMount(){
        fetch('https://stock.ssangyong.pl/api/getHotModels/')
            .then( response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error("Bład sieci!");
            })
            .then ( data => {
                console.log(data)
                this.setState({
                    models: data
                })
            })
            .catch( err => {
                console.log("bład!", err)
            })

        fetch('https://stock.ssangyong.pl/api/getHotoffers/')
            .then( response => {
                if (response.ok)
                    return response.json();
                else
                    throw new Error("Bład sieci!");
            })
            .then ( data => {
                console.log(data)
                this.setState({
                    cars: data
                })
            })
            .catch( err => {
                console.log("bład!", err)
            })
    }

    byHotPrice = () => {
        // console.log(this.state.cars)
        if(this.state.sort === null || this.state.sort === 'up'){
            function compare(a, b) {
                const priceA = a.params.price.hot_price;
                const priceB = b.params.price.hot_price;
                let comparison = 0;

                if (priceA > priceB) {
                    comparison = 1;
                } else if (priceA < priceB) {
                    comparison = -1;
                }
                return comparison * -1;
            }
                return (
                    this.setState({
                        cars: this.state.cars.sort(compare),
                        sort: 'down'
                    })
                )
        } else if (this.state.sort === 'down') {
            function compare(a, b) {
                const priceA = a.params.price.hot_price;
                const priceB = b.params.price.hot_price;
                let comparison = 0;

                if (priceA < priceB) {
                    comparison = 1;
                } else if (priceA > priceB) {
                    comparison = -1;
                }
                return comparison * -1;
            }
                return (
                    this.setState({
                        cars: this.state.cars.sort(compare),
                        sort: 'up'
                    })
                )
        }
    }
    checked = (e) => {
        console.log(e.target.id)
    }

    render(){
        return(
            <div className='container'>
                <ModelsList models={this.state.models} checked={this.checked}/>
                <CarsList cars={this.state.cars} sort={this.byHotPrice}/>
            </div>
        )
    }
}

class ModelsList extends Component {
    render(){
        if (!this.props.models){
            return (<div>Trwa ładowanie</div>)
        }else {
            return (
                <div className="modelsList">
                    <span>modele</span>
                    <ul>

                {
                    this.props.models.map((model, index) => {
                        return(
                        <li key={model.model}>
                            <input type='checkbox' onChange={this.props.checked} id={model.model} name={model.model}/>
                            <label htmlFor={model.model}>{model.model}</label>
                        </li>
                        )
                    })
                }
                    </ul>
                </div>

            )
        }

    }
}

class CarsList extends Component{
    render(){

        if (!this.props.cars) {
            return (<div>Trwa ładowanie</div>)
        } else {
            return (<div className="carsList">
                    <span><button onClick={this.props.sort}>sortowanie</button></span>
                    <ul>
                    {
                        this.props.cars.map((car, index) => {
                            let image = {
                                backgroundImage: `url('https://www.ssangyong.pl/konfigurator-images/images/${car.params.model.toLowerCase()}/${car.params.my.toLowerCase()}/colors/cars/${car.params.color.toLowerCase().replace(" ","_")}.png')`
                            }
                            return(
                            <li key={car.id}>
                                <div className="carsListCar">
                                    <div className="picture" style={{backgroundImage: `url('https://www.ssangyong.pl/konfigurator-images/images/${car.params.model.toLowerCase()}/${car.params.my.toLowerCase()}/colors/cars/${car.params.color.toLowerCase().replace(" ","_")}.png')`}}>
                                        <span className='carTitle'>{car.params.model} </span>
                                        <span>{car.params.trim}</span>
                                        <div>{car.new_used}</div>
                                    </div>
                                    <div className="values">
                                        <div>
                                            <div className="valuesTitle">
                                                <span>{car.params.engine_capacity } {car.params.fuel_type }{car.params.transmission } {'|'} {car.params.color}</span>
                                            </div>
                                            <div className="valuesProps">
                                                <div>
                                                    <ul>
                                                        <li>Wersja:</li>
                                                        <li>Rok produkcji:</li>
                                                        <li>Rok modelowy:</li>
                                                        <li>Wyposażenie:</li>
                                                    </ul>
                                                </div>
                                                <div>
                                                    <ul>
                                                        <li>{car.params.trim}</li>
                                                        <li>{car.params.year}</li>
                                                        <li>{car.params.my}</li>
                                                        <li>{car.params.option}</li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="price">
                                            <div className="priceSrp">
                                                <span>cena bazowa: </span>
                                                <span className="srp">{ car.params.price.srp.replace('&nbsp;',' ')}</span>
                                            </div>
                                            <div className="priceDiscount">
                                                <span>rabat: </span>
                                                <span className="discount"> -{car.params.price.discount.replace('&nbsp;',' ')}</span>
                                            </div>
                                            <div className="priceHot">
                                                <span>gorąca cena: </span>
                                                <span className="hotPrice">{ car.params.price.hot_price.replace('&nbsp;',' ')}</span>
                                            </div>
                                            <div className="priceAsk">Zapytaj</div>
                                        </div>
                                </div>
                            </li>
                            )})
                    }
                    </ul>
                 </div>)
        }
    }
}

document.addEventListener('DOMContentLoaded', function(){

    ReactDOM.render(
        <App />,
        document.getElementById('app')
    );
});
