import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface Message {
  id: string;
  sender: 'user' | 'bot';
  content: string;
  timestamp: number;
}

interface ChatState {
  messages: Message[];
  inputHistory: string[];
  loading: boolean;
}

const initialState: ChatState = {
  messages: [],
  inputHistory: [],
  loading: false,
};

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    addMessage: (state, action: PayloadAction<Message>) => {
      state.messages.push(action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    addToInputHistory: (state, action: PayloadAction<string>) => {
      state.inputHistory.push(action.payload);
    },
    clearChat: (state) => {
      state.messages = [];
      state.inputHistory = [];
    },
  },
});

export const { addMessage, setLoading, addToInputHistory, clearChat } = chatSlice.actions;
export default chatSlice.reducer; 