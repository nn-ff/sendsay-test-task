import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IcalculatorState {
  items: { display: string; upperDisplay: string; operand: boolean; operandValue: string };
}

const initialState: IcalculatorState = {
  items: { display: '0', upperDisplay: '', operand: false, operandValue: '' },
};

export const calculatorSlice = createSlice({
  name: 'calculator',
  initialState,
  reducers: {
    displayAction: (state, action: PayloadAction<string>) => {
      if (action.payload === ',' && state.items.display.length < 1) return;
      if (state.items.operand) {
        state.items.display = '';
        state.items.operand = false;
      }
      if (state.items.display === '0' && action.payload !== ',') {
        state.items.display = action.payload.replace('.', ',');
      } else {
        if (action.payload === ',' && state.items.display.includes(',')) {
          state.items.display = state.items.display;
        } else if (state.items.display.length < String(Number.MAX_SAFE_INTEGER).length) {
          if (state.items.display === 'Не определено') {
            state.items.display = '';
          } else if (state.items.upperDisplay.includes('=')) {
            state.items.upperDisplay = '';
            state.items.display = '';
          }
          state.items.display += action.payload.replace('.', ',');
        }
      }
      if (['+', '-', '*', '/'].includes(state.items.upperDisplay.slice(-1))) {
        state.items.operandValue = state.items.upperDisplay.slice(-1) + ' ' + state.items.display;
      }
    },
    operandAction: (state, action: PayloadAction<string>) => {
      // if (state.items.display === '0' && action.payload === '/') {
      //   state.items.display = 'Не определено';
      //   state.items.upperDisplay = '';
      //   state.items.operand = false;
      // }
      if (state.items.display === 'Не определено') {
        return;
      }
      if (action.payload !== '=' && state.items.upperDisplay.includes('=')) {
        state.items.upperDisplay = state.items.display;
      }

      if (state.items.display.includes(',') || state.items.upperDisplay.includes(',')) {
        state.items.display = state.items.display.replace(',', '.');
        state.items.upperDisplay = state.items.upperDisplay.replace(',', '.');
      }

      if (
        ['+', '-', '*', '/', '='].includes(state.items.upperDisplay.slice(-1)) &&
        !state.items.operand
      ) {
        if (action.payload === '=') {
          if (state.items.upperDisplay.includes('=')) {
            state.items.upperDisplay = `${String(
              state.items.display + ' ' + state.items.operandValue,
            ).replaceAll('.', ',')} =`;
          } else {
            state.items.upperDisplay = `${String(
              state.items.upperDisplay.slice(0, -1) + ' ' + state.items.operandValue,
            )} =`;
          }
        } else {
          console.log('this?');
          switch (state.items.upperDisplay.slice(-1)) {
            case '+':
              state.items.upperDisplay = `${String(
                Math.round(
                  (+state.items.upperDisplay.replace('+', '') + +state.items.display) * 1e15,
                ) / 1e15,
              )} ${action.payload}`.replace('.', ',');
              break;
            case '*':
              state.items.upperDisplay = `${String(
                Math.round(
                  +state.items.upperDisplay.replace('*', '') * +state.items.display * 1e15,
                ) / 1e15,
              )} ${action.payload}`.replace('.', ',');
              break;
            case '-':
              state.items.upperDisplay = `${String(
                Math.round(
                  (+state.items.upperDisplay.slice(0, -1) - +state.items.display.replace('-', '')) *
                    1e15,
                ) / 1e15,
              )} ${action.payload}`.replace('.', ',');
              break;
            case '/':
              if (+state.items.display === 0) {
                state.items.upperDisplay = '';
                state.items.operand = false;
                state.items.display = 'Не определено';
                return;
              }
              state.items.upperDisplay = `${String(
                Math.round(
                  (+state.items.upperDisplay.replace('/', '') / +state.items.display) * 1e15,
                ) / 1e15,
              )} ${action.payload}`.replace('.', ',');
              break;
            case '=':
              state.items.operandValue = state.items.display;
              console.log('otrab');
              break;
          }
        }
        if (action.payload === '-') {
          state.items.display = state.items.upperDisplay.startsWith('-')
            ? `-${state.items.upperDisplay
                .replaceAll(state.items.upperDisplay.slice(-1), '')
                .replace('.', ',')}`
            : `${state.items.upperDisplay
                .replaceAll(state.items.upperDisplay.slice(-1), '')
                .replace('.', ',')}`;
        } else if (action.payload === '=') {
          switch (state.items.operandValue.slice(0, 1)) {
            case '/':
              if (+state.items.display === 0) {
                state.items.upperDisplay = '';
                state.items.operand = false;
                state.items.display = 'Не определено';
                return;
              }
              state.items.display = String(
                +state.items.upperDisplay
                  .replace(`${state.items.operandValue} =`, '')
                  .replaceAll(',', '.') /
                  +state.items.operandValue
                    .replace(state.items.operandValue.slice(0, 1), '')
                    .replaceAll(',', '.'),
              ).replaceAll('.', ',');
              break;
            case '*':
              state.items.display = String(
                +state.items.upperDisplay
                  .replace(`${state.items.operandValue} =`, '')
                  .replaceAll(',', '.') *
                  +state.items.operandValue
                    .replace(state.items.operandValue.slice(0, 1), '')
                    .replaceAll(',', '.'),
              ).replaceAll('.', ',');
              break;
            case '-':
              state.items.display = String(
                +state.items.upperDisplay
                  .replace(`${state.items.operandValue} =`, '')
                  .replaceAll(',', '.') -
                  +state.items.operandValue
                    .replace(state.items.operandValue.slice(0, 1), '')
                    .replaceAll(',', '.'),
              ).replaceAll('.', ',');
              break;
            case '+':
              state.items.display = String(
                +state.items.upperDisplay
                  .replace(`${state.items.operandValue} =`, '')
                  .replaceAll(',', '.') +
                  +state.items.operandValue
                    .replace(state.items.operandValue.slice(0, 1), '')
                    .replaceAll(',', '.'),
              ).replaceAll('.', ',');
              break;
          }
        } else {
          state.items.display = state.items.upperDisplay
            .replace(state.items.upperDisplay.slice(-1), '')
            .replaceAll('.', ',');
        }

        state.items.operand = true;
      } else {
        state.items.upperDisplay = `${state.items.display} ${action.payload}`.replace('.', ',');
        state.items.operand = true;
        state.items.display = state.items.display.replace('.', ',');
      }
      if (action.payload === '=') {
        state.items.operand = false;
      }
      if (
        +state.items.display > Number.MAX_SAFE_INTEGER ||
        +state.items.display < -Number.MAX_SAFE_INTEGER
      ) {
        state.items.display = 'Не определено';
        state.items.upperDisplay = '';
        state.items.operand = false;
      }
    },
    resetAction: (state) => {
      state.items.display = '0';
      state.items.upperDisplay = '';
    },
  },
});

export const { displayAction, operandAction, resetAction } = calculatorSlice.actions;

export default calculatorSlice.reducer;
