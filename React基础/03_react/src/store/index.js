// 第一个方法创建store   第二个使用中间件
import { createStore, applyMiddleware } from 'redux'
import logger from 'redux-logger'
import count from './count.reducer'
import thunk from 'redux-thunk'

const store = createStore(count, applyMiddleware(logger, thunk))

export default store