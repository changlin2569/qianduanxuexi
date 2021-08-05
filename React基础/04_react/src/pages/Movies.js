import React, { Component } from 'react'
import { Route, Link } from 'react-router-dom'
import MovieInfo from './MovieInfo'
import MovieIndex from './MovieIndex'

export default class Movies extends Component {
    render() {
        const { match: { path } } = this.props
        return (
            <div>
                <ul>
                    <li>
                        <Link to='/movies/vue'>Vue</Link>
                    </li>
                    <li>
                        <Link to='/movies/react'>React</Link>
                    </li>
                    <li>
                        <Link to='/movies/argular'>Argular</Link>
                    </li>
                </ul>
                <Route path='/movies/:name' component={MovieInfo}></Route>
                <Route exact path={path} component={MovieIndex}></Route>
            </div>
        )
    }
}
