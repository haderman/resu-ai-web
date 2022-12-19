import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { AppState } from './store';

type BlockId = string;

export type BlocksState = {
  idToDataMap: Record<BlockId, Block>
  blockIds: BlockId[]
}

type Block = {
  id: BlockId
  type: 'content' | 'white-space' | 'page-break'
  height: number
}

const initialState: BlocksState = {
  idToDataMap: {},
  blockIds: [],
};

export const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {

    // setColor(state, action: PayloadAction<Color>) {
    //   state.color = action.payload;
    // },
  },
  extraReducers: {
    [HYDRATE]: (state, action) => {
      return {
        ...state,
        ...action.payload.blocks,
      };
    },
  },
});

// export function selectColor(state: AppState): Color {
//   return state.contact.color;
// }
