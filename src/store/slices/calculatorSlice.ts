import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MAX_NUMBERS } from '../../constants';

interface IcalculatorState {
  items: {
    display: string;
    leftValue: string;
    binaryOperatorValue: string;
    rightValue: string;
    usedStatus: boolean;
    upperDisplay: string;
    firstLoad: boolean;
    equalUsed: boolean;
  };
}

const initialState: IcalculatorState = {
  items: {
    display: '0',
    leftValue: '',
    binaryOperatorValue: '',
    rightValue: '',
    usedStatus: false,
    upperDisplay: '',
    firstLoad: true,
    equalUsed: false,
  },
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    displayAction: (state, action: PayloadAction<string>) => {
      if (state.items.equalUsed) {
        state.items.upperDisplay = '';
        state.items.leftValue = '';
        state.items.rightValue = '';
        state.items.binaryOperatorValue = '';
        state.items.equalUsed = false;
      }
      if (state.items.usedStatus) {
        state.items.display = action.payload === '.' ? '0.' : '';
        state.items.usedStatus = false;
      }
      if (state.items.firstLoad && action.payload === '0' && state.items.display === '0') {
        return;
      }
      if (
        (state.items.display.includes('.') || state.items.display === '') &&
        action.payload === '.'
      ) {
        return;
      }
      if (state.items.display === '0' && action.payload !== '.') {
        state.items.display = '';
      }
      if (state.items.display.length <= MAX_NUMBERS) {
        state.items.display += action.payload;
      }
    },
    operandAction: (state, action: PayloadAction<string>) => {
      if (state.items.display.endsWith('.')) {
        state.items.display = state.items.display.replace('.', '');
      }
      if (state.items.display === 'Не определено') {
        return;
      }
      if (action.payload === '=') {
        state.items.equalUsed = true;
      }
      if (action.payload !== '=' && state.items.equalUsed) {
        state.items.leftValue = state.items.display;
        state.items.rightValue = '';
        state.items.equalUsed = false;
      }
      if (state.items.usedStatus === true && action.payload !== '=') {
        state.items.upperDisplay = state.items.leftValue + ' ' + action.payload;
        state.items.binaryOperatorValue = action.payload;
        return;
      }
      if (['-', '+', '/', '*', '='].includes(action.payload)) {
        if (state.items.leftValue === '') {
          state.items.leftValue = state.items.display;
        } else {
          if (state.items.equalUsed && state.items.rightValue !== '') {
            /* empty */
          } else {
            state.items.rightValue = state.items.display;
          }
        }

        if (state.items.binaryOperatorValue === '') {
          state.items.binaryOperatorValue = action.payload;
        }

        state.items.usedStatus = true;

        if (state.items.leftValue !== '' && state.items.rightValue !== '') {
          switch (state.items.binaryOperatorValue) {
            case '+':
              if (state.items.equalUsed) {
                state.items.upperDisplay =
                  state.items.leftValue + ' + ' + state.items.rightValue + ' ' + '=';
                state.items.leftValue = String(+state.items.leftValue + +state.items.rightValue);
                break;
              } else {
                state.items.upperDisplay = String(
                  +state.items.leftValue + +state.items.rightValue + ' ' + action.payload,
                );
                state.items.leftValue = String(+state.items.leftValue + +state.items.rightValue);
                state.items.rightValue = '';
                break;
              }

            case '-':
              if (state.items.equalUsed) {
                state.items.upperDisplay =
                  state.items.leftValue + ' - ' + state.items.rightValue + ' ' + '=';
                state.items.leftValue = String(+state.items.leftValue - +state.items.rightValue);
                break;
              } else {
                state.items.upperDisplay = String(
                  +state.items.leftValue - +state.items.rightValue + ' ' + action.payload,
                );
                state.items.leftValue = String(+state.items.leftValue - +state.items.rightValue);
                state.items.rightValue = '';
                break;
              }
            case '*':
              if (state.items.equalUsed) {
                state.items.upperDisplay =
                  state.items.leftValue + ' * ' + state.items.rightValue + ' ' + '=';
                state.items.leftValue = String(+state.items.leftValue * +state.items.rightValue);
                break;
              } else {
                state.items.upperDisplay = String(
                  +state.items.leftValue * +state.items.rightValue + ' ' + action.payload,
                );
                state.items.leftValue = String(+state.items.leftValue * +state.items.rightValue);
                state.items.rightValue = '';
                break;
              }
            case '/':
              if (state.items.equalUsed) {
                state.items.upperDisplay =
                  state.items.leftValue + ' / ' + state.items.rightValue + ' ' + '=';
                state.items.leftValue = String(+state.items.leftValue / +state.items.rightValue);
                break;
              } else {
                state.items.upperDisplay = String(
                  +state.items.leftValue / +state.items.rightValue + ' ' + action.payload,
                );
                state.items.leftValue = String(+state.items.leftValue / +state.items.rightValue);
                state.items.rightValue = '';
                break;
              }
          }
          state.items.display = String(+state.items.leftValue);
          if (action.payload !== '=') {
            state.items.binaryOperatorValue = action.payload;
          }
        } else {
          state.items.upperDisplay = state.items.leftValue + ' ' + action.payload;
        }
      }
      if (state.items.display === 'Infinity') {
        state.items.display = 'Не определено';
        state.items.upperDisplay = '';
        state.items.leftValue = '';
        state.items.rightValue = '';
        state.items.binaryOperatorValue = '';
        return;
      }
    },
    resetAction: (state) => {
      state.items.display = '0';
      state.items.leftValue = '';
      state.items.binaryOperatorValue = '';
      state.items.rightValue = '';
      state.items.usedStatus = false;
      state.items.upperDisplay = '';
      state.items.firstLoad = true;
      state.items.equalUsed = false;
    },
  },
});

export const { displayAction, operandAction, resetAction } = calculatorSlice.actions;

export default calculatorSlice.reducer;
