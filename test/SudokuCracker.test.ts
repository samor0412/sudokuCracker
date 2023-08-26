import { describe, expect, test } from '@jest/globals';
import { SudokuCracker } from '../SudokuCracker';
import { Sudoku } from '../Sudoku';

const EMPTY_ROW = "0,0,0,0,0,0,0,0,0"
const EMPTY_ROW_ARR = EMPTY_ROW.split(',').map(n => parseInt(n))

describe('SudokuCracker', () => {
    describe('byGrid', () => {
        describe('checkRemainingNumber', () => {
            test.only("within grid", () => {
                const sudoku = new Sudoku([
                    EMPTY_ROW_ARR,
                    EMPTY_ROW_ARR,
                    EMPTY_ROW_ARR,
                    [9, 0, 8, 0, 0, 0, 0, 0, 0],
                    [5, 6, 7, 0, 0, 0, 0, 0, 0],
                    [1, 4, 3, 0, 0, 0, 0, 0, 0],
                    EMPTY_ROW_ARR,
                    EMPTY_ROW_ARR,
                    EMPTY_ROW_ARR,
                ])
                const sudokuCracker = new SudokuCracker(sudoku)
                sudokuCracker.execute();

                expect(sudoku.print()).toBe(`${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}
9,2,8,0,0,0,0,0,0
5,6,7,0,0,0,0,0,0
1,4,3,0,0,0,0,0,0
${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}`)
            })


            test("across grid", () => {
                const sudoku = new Sudoku([
                    [0, 0, 0, 0, 0, 0, 0, 0, 2],
                    [0, 0, 0, 0, 0, 0, 0, 2, 0],
                    [0, 4, 3, 0, 0, 0, 0, 0, 0],
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

                expect(sudoku.print()).toBe(`0,0,0,0,0,0,0,0,2
0,0,0,0,0,0,0,2,0
2,4,3,0,0,0,0,0,0
${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}
${EMPTY_ROW}`)
            })
        })
    })
})