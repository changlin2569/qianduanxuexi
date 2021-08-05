import React, { Component } from 'react'
import { BrowserRouter, Route, Link, Switch, Redirect } from 'react-router-dom'
import Movies from './pages/Movies'
import Home from './pages/Home'
import Users from './pages/Users'
import NoMatch from './pages/NoMatch'

export default class App extends Component {
  render() {
    return (
      <div>
        <BrowserRouter>
          <ul>
            <li>
              <Link to='/'>home</Link>
            </li>
            <li>
              <Link to='movies'>movies</Link>
            </li>
            <li>
              <Link to='users'>users</Link>
            </li>
          </ul>
          {/* switch表示从上到下。匹配到其中一个接下的就不再匹配 */}
          <Switch>
            {/* exact表示准确匹配 */}
            <Route exact path='/home' component={Home}></Route>
            <Route path='/movies' component={Movies}></Route>
            <Route path='/users' component={Users}></Route>
            {/* 页面404路由 */}
            <Route component={NoMatch}></Route>\
            {/* 重定向，如果上述都未匹配，则重定向到首页 */}
            <Redirect to='/home'></Redirect>
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}

