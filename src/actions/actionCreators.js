import {
  FETCH_TOPSALES_REQUEST,
  FETCH_TOPSALES_REFUSE,
  FETCH_TOPSALES_SUCCESS,
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_REFUSE,
  FETCH_ITEMS_SUCCESS,
  FETCH_ITEM_REQUEST,
  FETCH_ITEM_REFUSE,
  FETCH_ITEM_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_REFUSE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_MORE_REQUEST,
  FETCH_MORE_REFUSE,
  FETCH_MORE_SUCCESS,
  CHANGE_SEARCH_INPUT,
  SEARCHING,
  SET_AVAILABLE_SIZES,
  SET_QUANTITY,
  SET_SIZE,
  GET_CART_ITEMS_SUCCESS,
  SET_CART_TOTAL,
  FETCH_ORDER_REQUEST,
  FETCH_ORDER_REFUSE,
  FETCH_ORDER_SUCCESS,
  CHANGE_FORM_INPUT
} from '../actions/actionTypes';
import paths from '../paths';



export const fetchTopSalesRequest = () => ({
  type: FETCH_TOPSALES_REQUEST,
});

export const fetchTopSalesRefuse = error => ({
  type: FETCH_TOPSALES_REFUSE,
  payload: {
    error,
  },
});

export const fetchTopSalesSuccess = items => ({
  type: FETCH_TOPSALES_SUCCESS,
  payload: {
    items,
  },
});

export const fetchItemsRequest = (params) => ({
  type: FETCH_ITEMS_REQUEST,
  payload: params
});

export const fetchItemsRefuse = errorItems => ({
  type: FETCH_ITEMS_REFUSE,
  payload: {
    errorItems,
  },
});

export const fetchItemsSuccess = newItems => ({
  type: FETCH_ITEMS_SUCCESS,
  payload: {
    newItems,
  },
});

export const fetchItems = item => async (dispatch) => {

  dispatch(fetchItemsRequest());

  await fetch(`${paths.items}?${item}`, {
      mode: 'cors',
    })
    .then((resp) => resp.json())
    .then((data) => dispatch(fetchItemsSuccess(data)))
    .catch((e) => {
      dispatch(fetchItemsRefuse(e.message));
    })

};


export const fetchCategoriesRequest = () => ({
  type: FETCH_CATEGORIES_REQUEST,
});

export const fetchCategoriesRefuse = errorCategories => ({
  type: FETCH_CATEGORIES_REFUSE,
  payload: {
    errorCategories,
  },
});

export const fetchCategoriesSuccess = categories => ({
  type: FETCH_CATEGORIES_SUCCESS,
  payload: {
    categories,
  },
});

export const fetchCategories = () => async (dispatch) => {
  dispatch(fetchCategoriesRequest());

  await fetch(paths.categories, {
      mode: 'cors',
    })
    .then((resp) => resp.json())
    .then((data) => dispatch(fetchCategoriesSuccess(data)))
    .catch((e) => {
      dispatch(fetchCategoriesRefuse(e.message));
    })
};


export const fetchMoreRequest = () => ({
  type: FETCH_MORE_REQUEST,
});

export const fetchMoreRefuse = () => ({
  type: FETCH_MORE_REFUSE
});

export const fetchMoreSuccess = moreItems => ({
  type: FETCH_MORE_SUCCESS,
  payload: {
    moreItems,
  },
});

export const fetchMore = item => async (dispatch) => {
  dispatch(fetchMoreRequest());

  await fetch(`${paths.items}?${item}`, {
      mode: 'cors',
    })
    .then((resp) => resp.json())
    .then((data) => dispatch(fetchMoreSuccess(data)))
    .catch((e) => {
      dispatch(fetchMoreRefuse());
    })
};


export const changeSearchInput = searchString => ({
  type: CHANGE_SEARCH_INPUT,
  payload: {
    searchString,
  },
});

export const setSearching = () => ({
  type: SEARCHING,
});


export const fetchItemRequest = (id) => ({
  type: FETCH_ITEM_REQUEST,
  payload: id
});

export const fetchItemRefuse = error => ({
  type: FETCH_ITEM_REFUSE,
  payload: {
    error,
  },
});

export const fetchItemSuccess = item => ({
  type: FETCH_ITEM_SUCCESS,
  payload: {
    item,
  },
});

export const setAvailableSizes = sizes => ({
  type: SET_AVAILABLE_SIZES,
  payload: {
    sizes,
  },
});

export const setQuantity = quantity => ({
  type: SET_QUANTITY,
  payload: {
    quantity,
  },
});

export const setSize = size => ({
  type: SET_SIZE,
  payload: {
    size,
  },
});

export const fetchItem = (id) => async (dispatch) => {
  dispatch(fetchItemRequest());

  await fetch(`${paths.items}/${id}`, {
      mode: 'cors',
    })
    .then((resp) => resp.json())
    .then((data) => {
      dispatch(fetchItemSuccess(data.sizes.filter(item => item.avalible)));
      dispatch(fetchItemSuccess(data));
    })
    .catch((e) => {
      dispatch(fetchItemRefuse(e.message));
    })
};



export const getCartItemsSuccess = cartItems => ({
  type: GET_CART_ITEMS_SUCCESS,
  payload: {
    cartItems,
  },
});

export const changeFormField = (name, value) => ({
  type: CHANGE_FORM_INPUT,
  payload: {
    name,
    value,
  },
});

export const fetchOrderRequest = () => ({
  type: FETCH_ORDER_REQUEST
});

export const fetchOrderRefuse = (error) => ({
  type: FETCH_ORDER_REFUSE,
  payload: {
    error,
  },
});

export const fetchOrderSuccess = () => ({
  type: FETCH_ORDER_SUCCESS
});

export const setCartTotal = total => ({
  type: SET_CART_TOTAL,
  payload: {
    total,
  },
});

export const getCartTotal = () => (dispatch, getState) => {
  const {
    cart: {
      cartItems
    }
  } = getState();

  if (!cartItems) {
    dispatch(setCartTotal(0));
    return;
  }

  const total = cartItems.reduce((sum, item) => {
    const itemSum = item.price * item.quantity;
    return itemSum + sum;
  }, 0);

  dispatch(setCartTotal(total));
};

export const getCartItems = () => (dispatch) => {
  const keys = Object.keys(localStorage);
  const cartItems = [];
  for (let key of keys) {
    cartItems.push(JSON.parse(localStorage.getItem(key)));
  }
  dispatch(getCartItemsSuccess(cartItems));
};

export const fetchOrder = () => async (dispatch, getState) => {
  const {
    cart: {
      cartItems,
      owner
    }
  } = getState();
  dispatch(fetchOrderRequest());

  const items = [];
  cartItems.forEach(item => {
    items.push({
      id: item.id,
      price: item.price,
      count: item.quantity
    })
  });

  const body = {
    owner: {
      phone: owner.phone,
      address: owner.address,
    },
    items: items
  }

  await fetch(`${paths.order}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(body)
    })
    .then(() => {
      localStorage.clear();
      dispatch(fetchOrderSuccess());
    })
    .catch((e) => {
      dispatch(fetchOrderRefuse(e.message));
    })

};