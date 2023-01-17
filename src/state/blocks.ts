import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Block, BlockId } from '@/shared/types/block';
import type { Resume, ResumeLayout } from '@/shared/types/resume';

import { AppState } from './store';

export type BlocksState = {
  idToDataMap: {
    [id: BlockId]: Block
  }
  blockIds: BlockId[]
}

const initialState: BlocksState = {
  idToDataMap: {}, // getMockIdToDataMap(),
  blockIds: [], // getMockBlockIds(),
};

export const blocksSlice = createSlice({
  name: 'blocks',
  initialState,
  reducers: {
    updateBlock(state, action: PayloadAction<Pick<Block, 'id' | 'height'>>) {
      const { id, height } = action.payload;
      state.idToDataMap[id].height = height;
    },
    composeBlocks(state, action: PayloadAction<Resume>) {
      // create a BlockMap from action.payload.sections and action.payload.template
      const resume = action.payload;
      if (!resume) return;

      const { blockIds, idToDataMap } = fromResumeToBlockState(resume);
      state.blockIds = blockIds;
      state.idToDataMap = idToDataMap;
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

function getMockIdToDataMap(): BlocksState['idToDataMap'] {
  return {
    '1': {
      id: '1',
      template: {
        sections: ['photo', 'profile'],
        slots: 'child1,child2,child2',
      },
      height: 1,
    },
    '2': {
      id: '2',
      template: {
        sections: ['contact', 'skills'],
        slots: 'child1,child2,child2',
      },
      height: 1,
    },
    '3': {
      id: '3',
      template: {
        sections: ['experience'],
        slots: 'child1',
      },
      height: 1,
    },
    '4': {
      id: '4',
      template: {
        sections: ['projects'],
        slots: 'child1',
      },
      height: 1,
    },
  };
}

function getMockBlockIds(): BlockId[] {
  return ['1', '2', '3', '4'];
}

function fromResumeToBlockState(resume: Resume): BlocksState {
  const { content, layout } = resume;

  let idToDataMap: BlocksState['idToDataMap'] = {};


  return {
    idToDataMap: getMockIdToDataMap(),
    blockIds: getMockBlockIds(),
  };
}
