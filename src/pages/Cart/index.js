import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {
  MdAddCircleOutline,
  MdRemoveCircleOutline,
  MdDelete
} from 'react-icons/md'

import { formatPrice } from '../../util/format'

import { Container, ProductTable, Total } from './styles'
import * as CartActions from '../../store/modules/cart/actions'

function Cart({ cart, total, removeFromCart, updateAmountRequest }) {
  // const totalPrice = cart.reduce((reducer, item) => reducer + item.price, 0)

  const handleRemove = id => {
    removeFromCart(id)
  }

  const increment = product => {
    updateAmountRequest(product.id, product.amount + 1)
  }

  const decrement = product => {
    updateAmountRequest(product.id, product.amount - 1)
  }

  return (
    <Container>
      <ProductTable>
        <thead>
          <tr>
            <th />
            <th>PRODUTO</th>
            <th>QTD</th>
            <th>SUBTOTAL</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {cart.map(product => (
            <tr>
              <td>
                <img src={product.image} alt={product.title} />
              </td>
              <td>
                <strong>{product.title}</strong>
                <span>{product.priceFormatted}</span>
              </td>
              <td>
                <div>
                  <button type="button">
                    <MdRemoveCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => decrement(product)}
                    />
                  </button>
                  <input type="number" readOnly value={product.amount} />
                  <button type="button">
                    <MdAddCircleOutline
                      size={20}
                      color="#7159c1"
                      onClick={() => increment(product)}
                    />
                  </button>
                </div>
              </td>
              <td>
                <strong>{product.subtotal}</strong>
              </td>
              <td>
                <button type="button">
                  <MdDelete
                    size={20}
                    color="#7159c1"
                    title="Remover produto do carrinho"
                    onClick={() => handleRemove(product.id)}
                  />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </ProductTable>
      <footer>
        <button type="button">Finalizar Pedido</button>

        <Total>
          <span>Total</span>
          <strong>{total}</strong>
        </Total>
      </footer>
    </Container>
  )
}

const mapStateToProps = state => ({
  cart: state.cart.map(product => ({
    ...product,
    subtotal: formatPrice(product.price * product.amount)
  })),
  total: formatPrice(
    state.cart.reduce(
      (total, product) => total + product.price * product.amount,
      0
    )
  )
})

const mapDispatchToProps = dispatch => bindActionCreators(CartActions, dispatch)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Cart)
