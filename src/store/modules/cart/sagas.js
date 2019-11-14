/**
 * MÉTODOS DO SAGA
 * call - Responsável por chamar ,métodos assíncroos e que retornam Promises
 * put - Dispara uma action do Redux
 * all - Serve para cadastrar diversos listeners all([ ...listeners ])
 * takeEvery listener. syntax takeLatest('Action_Name', funcName)
 * takeLast listener
 * take liestener
 * select - responsável por buscar informações dentro do estado
 * */

import { call, select, put, all, takeLatest } from 'redux-saga/effects'
import { toast } from 'react-toastify'
import api from '../../../services/api'
import history from '../../../services/history'
import { formatPrice } from '../../../util/format'
import {
  addToCartSuccess,
  updateAmountRequest,
  updateAmountSuccess
} from './actions'

function* addToCart({ id }) {
  const productExists = yield select(state => state.cart.find(p => p.id === id))

  const currentAmount = productExists ? productExists.amount : 0
  const amount = currentAmount + 1

  if (productExists) {
    yield put(updateAmountRequest(id, amount))
  } else {
    const response = yield call(api.get, `/products/${id}`)

    const data = {
      ...response.data,
      amount: 1,
      priceFormatted: formatPrice(response.data.price)
    }
    yield put(addToCartSuccess(data))
    history.push('/cart')
  }
}

function* updateAmount({ id, amount }) {
  if (amount < 1) return
  const stock = yield call(api.get, `/stock/${id}`)
  const stockAmount = stock.data.amount
  if (amount > stockAmount) {
    toast.error('Quantidade solicitada fora de estoque', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true
    })
    return
  }
  yield put(updateAmountSuccess(id, amount))
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount)
])
