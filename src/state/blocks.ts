import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Block, BlockId } from '@/shared/types/block';

import { AppState } from './store';

export type BlocksState = {
  idToDataMap: Record<BlockId, Block>
  blockIds: BlockId[]
}

const initialState: BlocksState = {
  idToDataMap: getMockIdToDataMap(),
  blockIds: getMockBlockIds(),
};

export const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    updateBlock(state, action: PayloadAction<Pick<Block, 'id' | 'height'>>) {
      const { id, height } = action.payload;
      state.idToDataMap[id].height = height;
    },
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

export function selectBlocks(state: AppState): Block[] {
  const { idToDataMap, blockIds } = state.blocks;
  return blockIds.map((id) => idToDataMap[id]);
}

function getMockIdToDataMap(): Record<BlockId, Block> {
  return {
    '1': {
      id: '1',
      section: 'profile',
      height: 1,
    },
    '2': {
      id: '2',
      section: 'contact',
      height: 1,
    },
    '3': {
      id: '3',
      section: 'photo',
      height: 1,
    },
    '4': {
      id: '4',
      section: 'skills',
      height: 1,
    },
    '5': {
      id: '5',
      section: 'experience',
      height: 1,
    },
    '6': {
      id: '6',
      section: 'projects',
      height: 1,
    },
  };
}

function getMockBlockIds(): BlockId[] {
  return ['1', '2', '3', '4', '5', '6'];
}

