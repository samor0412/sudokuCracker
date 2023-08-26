import { describe, expect, test } from '@jest/globals';
import { SudokuCracker } from '../SudokuCracker';
import { Sudoku } from '../Sudoku';

const createTestCase = (level: string) => test(level, () => {
    const sudoku = Sudoku.getSudokuFromFile(`./test/questions/${level}.txt`)
    const sudokuCracker = new SudokuCracker(sudoku)
    console.log(`question:\n${sudoku.print()}`)
    sudokuCracker.execute();

    const answerSodoku = Sudoku.getSudokuFromFile(`./test/answers/${level}.txt`)
    console.log(`resolved answer:\n${answerSodoku.print()}`)
    expect(answerSodoku.print()).toBe(sudoku.print())
})

describe('SudokuCracker', () => {
    createTestCase('level1')
    createTestCase('level2')
    // createTestCase('level3')
})