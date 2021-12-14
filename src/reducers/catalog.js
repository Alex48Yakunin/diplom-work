import {
  FETCH_ITEMS_REQUEST,
  FETCH_ITEMS_REFUSE,
  FETCH_ITEMS_SUCCESS,
  FETCH_CATEGORIES_REQUEST,
  FETCH_CATEGORIES_REFUSE,
  FETCH_CATEGORIES_SUCCESS,
  FETCH_MORE_REQUEST,
  FETCH_MORE_REFUSE,
  FETCH_MORE_SUCCESS,
} from "../actions/actionTypes";
import {put, take} from "redux-saga/effects"
import paths from "../paths"

const initialState = {
  items: {
    data: [],
    loading: false,
    error: null,
  },
  categories: {
    data: [],
    loading: false,
    error: null,
  },
  more: {
    error: null,
    show: true,
  },
};

export default function catalogReducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_ITEMS_REQUEST:
      return {
        ...state,
        items: {
          data: [],
          loading: true,
          error: null,
        },
        more: {
          error: null,
          show: false,
        },
      };
    case FETCH_ITEMS_REFUSE:
      const { errorItems } = action.payload;
      return {
        ...state,
        items: {
          ...state.items,
          loading: false,
          error: errorItems,
        },
      };
    case FETCH_ITEMS_SUCCESS:
      const  newItems  = action.payload;
      return {
        ...state,
        items: {
          data: newItems,
          loading: false,
          error: null,
        },
        more: {
          error: null,
          show: true,
        },
      };
    case FETCH_CATEGORIES_REQUEST:
      return {
        ...state,
        categories: {
          loading: true,
          error: null,
        },
      };
    case FETCH_CATEGORIES_REFUSE:
      const { errorCategories } = action.payload;
      return {
        ...state,
        categories: {
          loading: false,
          error: errorCategories,
        },
      };
    case FETCH_CATEGORIES_SUCCESS:
      const  categories  = action.payload;
      return {
        ...state,
        categories: {
          data: categories,
          loading: false,
          error: null,
        },
      };
    case FETCH_MORE_REQUEST:
      return {
        ...state,
        items: {
          ...state.items,
          loading: true,
        },
        more: {
          error: null,
          show: false,
        },
      };
    case FETCH_MORE_REFUSE:
      return {
        ...state,
        items: {
          ...state.items,
          loading: false,
        },
        more: {
          error: true,
          show: false,
        },
      };
    case FETCH_MORE_SUCCESS:
      const { moreItems } = action.payload;
      moreItems.forEach((o) => state.items.data.push(o));
      return {
        ...state,
        items: {
          ...state.items,
          loading: false,
        },
        more: {
          error: null,
          show: moreItems.length < 6 ? false : true,
        },
      };
    default:
      return state;
  }
}

export const fetchCategoriesSaga = function* () {
  while(true) {
    yield take(FETCH_CATEGORIES_REQUEST)
    try {
      const response = yield fetch(paths.categories, {
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = yield response.json();

      yield put({
        type: FETCH_CATEGORIES_SUCCESS,
        payload: data
      })

    } catch (error) {
      yield put({
        type: FETCH_CATEGORIES_REFUSE,
        payload: error.message
      })
    }
  }
}

export const fetchItemsSaga = function* () {
  while(true) {
    const {payload} = yield take(FETCH_ITEMS_REQUEST)
    try {
      const response = yield fetch(`${paths.items}?${payload}`, {
        mode: 'cors',
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      const data = yield response.json();

      yield put({
        type: FETCH_ITEMS_SUCCESS,
        payload: data
      })

    } catch (error) {
      yield put({
        type: FETCH_ITEMS_REFUSE,
        payload: error.message
      })
    }
  }
}