import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import { HYDRATE } from 'next-redux-wrapper';

import { Block, BlockId, BlockTemplate } from '@/shared/types/block';
import type { Resume, ResumeLayout, ResumeLayoutItem, ResumeSections } from '@/shared/types/resume';

import { AppState } from './store';
import apiSlice, { resumeUpdated } from './api/slice';

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
  },
  extraReducers: (builder) => {
    builder
      .addCase(resumeUpdated, (state, action) => {

        // const { layout, sections } = action.payload;

        // if (layout && sections) {
        //   return composeBlocks_(layout, sections);
        // }
      })
      .addMatcher(apiSlice.endpoints.getResume.matchFulfilled, (state, action) => {
        const { layout, sections } = action.payload;
        return composeBlocks_(layout, sections);
      });
  }
});

export function selectBlocks(state: AppState): Block[] {
  const { idToDataMap, blockIds } = state.blocks;
  return blockIds.map((id) => idToDataMap[id]);
}

function composeBlocks_(layout: ResumeLayout, sections: ResumeSections): BlocksState {
  return layout
    .map(createBlock(sections))
    .reduce(toBlockState, { idToDataMap: {}, blockIds: [] });
}

function createBlock(sections: ResumeSections) {
  return (layoutItem: ResumeLayoutItem, idx: number): Block => {

    const block: Block = {
      id: String(idx),
      template: {
        sections: Array
          .from(new Set(layoutItem))
          .map((idx) => sections[idx] ?? 'empty'),
        slots: Block.toSlots(layoutItem),
      },
      height: 1,
    };

    return block;
  };
}

function toBlockState(state: BlocksState, block: Block): BlocksState {
  state.idToDataMap[block.id] = block;
  state.blockIds.push(block.id);
  return state;
}
