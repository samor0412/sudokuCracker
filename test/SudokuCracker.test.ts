import { describe, expect, test } from '@jest/globals';
import { SudokuCracker } from '../SudokuCracker';
import { Sudoku } from '../Sudoku';

const EMPTY_ROW = "0,0,0,0,0,0,0,0,0,0"
const EMPTY_ROW_ARR = EMPTY_ROW.split(',').map(n => parseInt(n))

describe('SudokuCracker', () => {
    describe('byGrid', () => {
        test("checkRemainingNumber", () => {
            const sudoku = new Sudoku([
                [0, 0, 0, 0, 0, 0, 0, 0, 0, 2],
                [0, 0, 0, 0, 0, 0, 0, 0, 2, 0],
                [0, 4, 3, 0, 0, 0, 0, 0, 0, 0],
                EMPTY_ROW_ARR,
                EMPTY_ROW_ARR,
                EMPTY_ROW_ARR,
                EMPTY_ROW_ARR,
                EMPTY_ROW_ARR,
                EMPTY_ROW_ARR,
            ])
            const sudokuCracker = new SudokuCracker(sudoku)
            console.log(`question:\n${sudoku.print()}`)
            sudokuCracker.execute();

            expect(sudoku.print()).toBe(`0,0,0,0,0,0,0,0,0,2
0,0,0,0,0,0,0,0,2,0
2,4,3,0,0,0,0,0,0,0
${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}`)
        })
    })
})